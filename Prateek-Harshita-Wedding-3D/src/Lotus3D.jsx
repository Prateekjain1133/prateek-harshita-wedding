import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/*
  Real-time 3D lotus (Three.js).
  - The bud blooms open once `active` turns true (when the palace doors open).
  - Golden dust and marigold petals drift through the scene.
  - Mouse / touch-drag gently tilts the flower. Respects prefers-reduced-motion.
  - Pauses rendering when scrolled out of view.
*/

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const R = 1.6; // outer radius of the lotus in world units

function makePetal({ len = 1, wid = 0.45, curl = 0.35, cup = 0.3, c1 = '#fff', c2 = '#fff' }) {
  const g = new THREE.PlaneGeometry(2, 1, 8, 14);
  const p = g.attributes.position;
  const col = new Float32Array(p.count * 3);
  const a = new THREE.Color(c1);
  const b = new THREE.Color(c2);
  const m = new THREE.Color();
  for (let i = 0; i < p.count; i++) {
    const u = p.getX(i);
    const t = p.getY(i) + 0.5;
    const w = wid * Math.pow(Math.max(0, Math.sin(Math.PI * Math.pow(t, 0.7))), 0.85);
    p.setXYZ(i, u * w, t * len, -(curl * t * t * len) - cup * u * u * w);
    m.copy(a).lerp(b, Math.pow(t, 0.9));
    col[i * 3] = m.r; col[i * 3 + 1] = m.g; col[i * 3 + 2] = m.b;
  }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  g.computeVertexNormals();
  return g;
}

function softDot(inner = 'rgba(255,226,150,1)', outer = 'rgba(255,200,100,0)') {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const x = c.getContext('2d');
  const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, inner); g.addColorStop(0.35, 'rgba(255,214,130,.55)'); g.addColorStop(1, outer);
  x.fillStyle = g; x.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const RINGS = [
  { n: 12, open: 1.38, closed: 0.2, len: 1.55, wid: 0.5, curl: 0.28, cup: 0.22, y: 0, rot: 0, delay: 0, c1: '#B84A66', c2: '#FBE3E2', rough: 0.5 },
  { n: 10, open: 1.02, closed: 0.16, len: 1.4, wid: 0.47, curl: 0.38, cup: 0.25, y: 0.03, rot: 0.15, delay: 0.12, c1: '#CF6A82', c2: '#FFF0EA', rough: 0.5 },
  { n: 8, open: 0.68, closed: 0.12, len: 1.2, wid: 0.42, curl: 0.4, cup: 0.3, y: 0.06, rot: 0.4, delay: 0.24, c1: '#DC9560', c2: '#FFE9B8', rough: 0.45 },
  { n: 6, open: 0.34, closed: 0.07, len: 0.9, wid: 0.36, curl: 0.35, cup: 0.3, y: 0.08, rot: 0.2, delay: 0.36, c1: '#A97522', c2: '#F6D98A', rough: 0.35, metal: 0.55 },
];

export default function Lotus3D({ active = false }) {
  const hostRef = useRef(null);
  const activeRef = useRef(active);
  const openedAt = useRef(null);

  useEffect(() => {
    activeRef.current = active;
    if (active && openedAt.current === null) openedAt.current = performance.now() / 1000;
  }, [active]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (e) {
      return undefined; // no WebGL: the CSS mandala backdrop still shows
    }
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    canvas.style.cssText = 'width:100%;height:100%;display:block';
    host.appendChild(canvas);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    // lights
    const key = new THREE.DirectionalLight(0xffe2b0, 1.7);
    key.position.set(2.5, 4, 3.5);
    const rim = new THREE.PointLight(0xff8aa0, 14, 12, 2);
    rim.position.set(-3, 1.5, -1.5);
    const warm = new THREE.PointLight(0xffc870, 9, 9, 2);
    warm.position.set(0, 1.2, 1.8);
    scene.add(key, rim, warm);

    // halo behind the flower
    const haloTex = softDot();
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloTex, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending }));
    halo.scale.set(8, 8, 1);
    halo.position.set(0, 0, -1.2);
    scene.add(halo);

    // lotus
    const tiltGroup = new THREE.Group();
    const spin = new THREE.Group();
    tiltGroup.add(spin);
    scene.add(tiltGroup);

    const petals = [];
    const disposables = [];
    RINGS.forEach((r, ri) => {
      const geo = makePetal(r);
      const mat = new THREE.MeshPhysicalMaterial({
        vertexColors: true, side: THREE.DoubleSide, roughness: r.rough, metalness: r.metal || 0,
        clearcoat: 0.25, clearcoatRoughness: 0.5, envMapIntensity: 0.9,
      });
      disposables.push(geo, mat);
      for (let k = 0; k < r.n; k++) {
        const pivot = new THREE.Group();
        pivot.rotation.y = (k / r.n) * Math.PI * 2 + r.rot;
        pivot.position.y = r.y;
        const tilt = new THREE.Group();
        tilt.rotation.x = r.closed;
        tilt.add(new THREE.Mesh(geo, mat));
        pivot.add(tilt);
        spin.add(pivot);
        petals.push({ tilt, r, k, ri });
      }
    });

    // seed pod and stamens
    const gold = new THREE.MeshStandardMaterial({ color: '#C9A24E', metalness: 0.65, roughness: 0.32 });
    const pod = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.15, 0.1, 28), gold);
    pod.position.y = 0.14;
    spin.add(pod);
    const stamenGeo = new THREE.CylinderGeometry(0.006, 0.014, 0.38, 6);
    const stamenMat = new THREE.MeshStandardMaterial({ color: '#F2C14E', emissive: '#7a4d00', emissiveIntensity: 0.5, roughness: 0.5 });
    disposables.push(pod.geometry, gold, stamenGeo, stamenMat);
    for (let i = 0; i < 34; i++) {
      const piv = new THREE.Group();
      piv.rotation.y = (i / 34) * Math.PI * 2;
      const s = new THREE.Mesh(stamenGeo, stamenMat);
      s.position.set(0, 0.3, 0.2);
      s.rotation.x = 0.35;
      piv.add(s);
      spin.add(piv);
    }

    // golden dust (normalised positions, scaled to the view on resize)
    const N = 300;
    const dp = new Float32Array(N * 3);
    const dspd = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      dp[i * 3] = Math.random() - 0.5; dp[i * 3 + 1] = Math.random() - 0.5; dp[i * 3 + 2] = (Math.random() - 0.5) * 3;
      dspd[i] = 0.012 + Math.random() * 0.03;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dp, 3));
    const dustTex = softDot('rgba(255,236,180,1)');
    const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
      size: 0.09, map: dustTex, color: 0xf0cf8a, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending,
    }));
    dust.frustumCulled = false;
    scene.add(dust);

    // drifting marigold petals
    const fallGeo = makePetal({ len: 0.26, wid: 0.1, curl: 0.2, cup: 0.4, c1: '#E0701F', c2: '#FFC247' });
    const fallMats = ['#F29A2E', '#E8642B', '#F7C873', '#D63C52'].map((c) => new THREE.MeshStandardMaterial({
      color: c, side: THREE.DoubleSide, roughness: 0.6, vertexColors: false,
    }));
    disposables.push(fallGeo, ...fallMats);
    const fallers = [];
    for (let i = 0; i < 22; i++) {
      const m = new THREE.Mesh(fallGeo, fallMats[i % fallMats.length]);
      m.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
      scene.add(m);
      fallers.push({
        m, nx: Math.random() - 0.5, ny: Math.random() - 0.5, z: (Math.random() - 0.3) * 2.2,
        v: 0.025 + Math.random() * 0.03, ph: Math.random() * 6, sp: 0.6 + Math.random() * 1.4,
      });
    }

    // sizing: keep the flower inside the gap between the heading and the names
    let visW = 6, visH = 4;
    const fit = () => {
      const W = host.clientWidth, H = host.clientHeight;
      if (!W || !H) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      const mobile = W < 768;
      const top = mobile ? 0.36 : 0.27;
      const bottom = mobile ? 0.3 : 0.24;
      const regionH = H * (1 - top - bottom);
      const diam = Math.min(W * 0.9, regionH * 1.35);
      const tanH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const d = (R * H) / (diam * tanH);
      camera.position.z = d;
      const delta = H * ((1 + top - bottom) / 2) - H / 2;
      camera.setViewOffset(W, H, 0, -delta, W, H);
      camera.updateProjectionMatrix();
      visH = 2 * d * tanH * 1.15;
      visW = visH * camera.aspect;
      dust.scale.set(visW, visH, 1);
    };

    let mx = 0, my = 0, tx = 0, ty = 0;
    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { threshold: 0 });
    io.observe(host);
    const ro = new ResizeObserver(() => { fit(); if (reduced) renderer.render(scene, camera); });
    ro.observe(host);

    const update = (dt, time) => {
      const since = reduced ? 99 : openedAt.current === null ? -1 : performance.now() / 1000 - openedAt.current;
      petals.forEach(({ tilt, r, k }) => {
        const rb = since < 0 ? 0 : easeOut(clamp((since - r.delay * 1.6) / 2.8));
        const breathe = Math.sin(time * 1.1 + k) * 0.014 * rb;
        tilt.rotation.x = r.closed + (r.open - r.closed) * rb + breathe;
      });
      spin.rotation.y += dt * 0.12;
      mx += (tx - mx) * Math.min(1, dt * 3);
      my += (ty - my) * Math.min(1, dt * 3);
      tiltGroup.rotation.set(0.95 + my * 0.1, 0, -mx * 0.09);
      tiltGroup.position.y = Math.sin(time * 0.8) * 0.05;
      camera.position.x = mx * 0.3;
      camera.lookAt(0, 0, 0);
      halo.material.opacity = 0.42 + Math.sin(time * 1.3) * 0.08 + (since > 0 ? Math.min(0.2, since * 0.06) : 0);

      const a = dust.geometry.attributes.position;
      for (let i = 0; i < N; i++) {
        let y = a.getY(i) + dspd[i] * dt;
        if (y > 0.5) y -= 1;
        a.setY(i, y);
        a.setX(i, a.getX(i) + Math.sin(time * 0.5 + i) * 0.00025);
      }
      a.needsUpdate = true;

      fallers.forEach((f) => {
        f.ny -= f.v * dt;
        if (f.ny < -0.56) { f.ny = 0.56; f.nx = Math.random() - 0.5; }
        f.nx += Math.sin(time * 0.6 + f.ph) * 0.0004;
        f.m.position.set(f.nx * visW, f.ny * visH, f.z);
        f.m.rotation.x += dt * f.sp * 0.7;
        f.m.rotation.y += dt * f.sp;
      });
    };

    fit();
    let raf = 0;
    let last = performance.now();
    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible || document.hidden) return;
      update(dt, now / 1000);
      renderer.render(scene, camera);
    };
    if (reduced) { update(0, 0); renderer.render(scene, camera); } else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      io.disconnect(); ro.disconnect();
      disposables.forEach((d) => d.dispose());
      [haloTex, dustTex, envTex, dustGeo, dust.material, halo.material].forEach((d) => d.dispose());
      pmrem.dispose();
      renderer.dispose();
      if (canvas.parentNode === host) host.removeChild(canvas);
    };
  }, []);

  return <div ref={hostRef} className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true" />;
}
