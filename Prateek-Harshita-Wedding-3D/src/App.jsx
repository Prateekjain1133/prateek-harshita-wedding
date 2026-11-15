import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import {
  Menu, X, MapPin, Navigation, Calendar, Clock, ChevronDown, Heart, Flower2, Sparkles, Sun, Gem, Music, BookOpen,
  Users, Utensils, Landmark, Volume2, VolumeX, Share2, CalendarPlus, Instagram, Phone, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { wedding as w } from './config.js';
import { Lotus, Divider, Section, Img, Petals, MangalKalash, Toran, Mandala } from './ui.jsx';
import ScratchDate from './ScratchDate.jsx';
import Lotus3D from './Lotus3D.jsx';


const nav = [['home', 'Home'], ['scratch', 'Reveal Date'], ['invite', 'Invitation'], ['couple', 'Couple'], ['story', 'Our Story'], ['events', 'Schedule'], ['countdown', 'Countdown'], ['venue', 'Venue'], ['gallery', 'Gallery']];
const icons = { 'विधान': Landmark, 'ज्वारा बाना': Flower2, 'मेहंदी': Sparkles, 'हल्दी': Sun, 'जिनेंद्र दर्शन': Landmark, 'मोसारा': Gem, 'भक्तामर पाठ': BookOpen, 'बारात': Music, 'तोरण': Flower2, 'परिग्रहण संस्कार': Users };

/* ---------- Navigation ---------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  useEffect(() => {
    const onScroll = () => {
      const marker = window.scrollY + 150;
      let current = 'home';
      nav.forEach(([id]) => { const el = document.getElementById(id); if (el && el.offsetTop <= marker) current = id; });
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className="wedding-nav fixed top-0 inset-x-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-[76px] md:h-[88px] flex items-center justify-between">
        <a href="#home" aria-label="Prateek and Harshita wedding home" className="flex items-center shrink-0">
          <img src="/images/ph-logo.png" alt="Prateek and Harshita monogram" className="h-[66px] w-[108px] md:h-[78px] md:w-[132px] object-contain" />
        </a>
        <nav className="hidden lg:flex items-center gap-1">
          {nav.map(([id, label]) => (
            <a key={id} href={'#' + id} aria-current={active === id ? 'page' : undefined} className={`wedding-nav-link ${active === id ? 'is-active' : ''}`}>{label}</a>
          ))}
        </nav>
        <button className="lg:hidden w-10 h-10 rounded-full border border-gold/40 text-brown flex items-center justify-center hover:bg-gold/10 transition" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="lg:hidden wedding-mobile-menu px-5 pt-2 pb-5 flex flex-col items-center gap-1">
            {nav.map(([id, label]) => (
              <a key={id} href={'#' + id} onClick={() => setOpen(false)} className={`w-full max-w-sm text-center py-3 rounded-xl wedding-mobile-link ${active === id ? 'is-active' : ''}`}>{label}</a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------- 3D palace doors (entrance) ---------- */
function Door({ side, open }) {
  const left = side === 'left';
  return (
    <motion.div
      className={`door ${left ? 'door-left' : 'door-right'}`}
      style={{ transformOrigin: left ? '0% 50%' : '100% 50%', [left ? 'left' : 'right']: 0 }}
      animate={{ rotateY: open ? (left ? -112 : 112) : 0 }}
      transition={{ duration: 1.9, ease: [0.7, 0, 0.2, 1] }}
    >
      <div className="door-arch">
        <div className="door-arch-inner">
          <Lotus className="w-14 h-14 mx-auto mt-8 opacity-90" />
          <div className="door-studs" />
        </div>
      </div>
      <span className={`door-knob ${left ? 'right-3' : 'left-3'}`} />
    </motion.div>
  );
}

function PalaceDoors({ onOpen }) {
  const [phase, setPhase] = useState('closed');
  useEffect(() => {
    document.body.style.overflow = phase === 'gone' ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [phase]);
  const enter = (music) => {
    if (phase !== 'closed') return;
    setPhase('opening');
    onOpen(music);
    setTimeout(() => setPhase('gone'), 2300);
  };
  if (phase === 'gone') return null;
  const open = phase === 'opening';
  return (
    <div className="fixed inset-0 z-[120] overflow-hidden" style={{ perspective: '1700px' }} role="dialog" aria-label="Wedding invitation entrance">
      <motion.div className="absolute inset-0 bg-[#1b0a0e]" animate={{ opacity: open ? 0 : 1 }} transition={{ duration: 1.3, delay: 0.5 }} />
      <Door side="left" open={open} />
      <Door side="right" open={open} />
      <motion.div className="absolute inset-0 z-10 flex items-center justify-center p-5 pointer-events-none" animate={{ opacity: open ? 0 : 1, scale: open ? 1.12 : 1 }} transition={{ duration: 0.7 }}>
        <div className="door-seal pointer-events-auto">
          <Lotus className="w-14 h-14 mx-auto" />
          <p className="font-hindi text-goldlight mt-2">{w.greeting}</p>
          <p className="italic text-ivory/75 mt-4">Together with our families</p>
          <h2 className="font-script text-5xl md:text-6xl text-ivory mt-1 leading-tight">{w.groom} ❤️ {w.bride}</h2>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => enter(true)} className="seal-btn seal-btn-primary"><Volume2 size={16} /> Enter with music</button>
            <button onClick={() => enter(false)} className="seal-btn">Enter silently</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero({ opened }) {
  return (
    <section id="home" className="hero-night relative min-h-[100svh] flex flex-col items-center justify-between text-center px-5 pt-[112px] md:pt-[128px] pb-16 overflow-hidden">
      <Mandala className="hero-mandala" />
      <Lotus3D active={opened} />
      <Toran />
      <div className="relative z-10 flex flex-col items-center">
        <Img id="mahavir" src={w.images.mahavir} label="Mahavir Swami" bare rounded="rounded-full" className="w-[72px] h-[72px] md:w-24 md:h-24 ring-2 ring-goldlight ring-offset-4 ring-offset-maroon shadow-lg" />
<p className="hero-greeting font-hindi text-lg md:text-xl mt-3">{w.greeting}</p>        <div className="flex items-center gap-2 md:gap-5 mt-1">
          <MangalKalash className="w-11 h-11 md:w-[72px] md:h-[72px] shrink-0" />
          <h1 className="font-hindi text-3xl sm:text-4xl md:text-6xl text-ivory hero-text-shadow">{w.title}</h1>
          <MangalKalash className="w-11 h-11 md:w-[72px] md:h-[72px] shrink-0 -scale-x-100" />
        </div>
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="font-script text-[2.9rem] sm:text-6xl md:text-8xl text-ivory hero-text-shadow leading-none">
          {w.groom} <span className="text-goldlight">&amp;</span> {w.bride}
        </h2>
        <p className="font-serif text-xl md:text-3xl text-ivory/95 mt-4 hero-text-shadow">{w.dayLabel}, {w.dateLabel}</p>
        <p className="font-hindi text-goldlight/95 mt-1 text-sm md:text-base">{w.venue.name}, Modi</p>
        <a href="#invite" className="hero-cta mt-6">Explore our wedding <ChevronDown size={18} /></a>
      </div>
      <div className="scallop" aria-hidden="true" />
    </section>
  );
}

/* ---------- Invitation ---------- */
const Invitation = () => (
  <Section id="invite" title={w.invitation.heading}  sub="The beginning of forever" className="invite-section">
    <Mandala className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(120vw,900px)] text-gold/20 spin-slow pointer-events-none" />
    <div className="relative max-w-3xl mx-auto invite-card text-center px-6 py-12 md:px-16 md:py-16">
      <Lotus className="w-14 h-14 mx-auto mb-6" />
      <div className="font-hindi text-[#513c3d] text-xl md:text-3xl leading-[2.05] font-medium">
        <p>मंगलम भगवान वीरो,</p><p>मंगलम गौतमो गणी।</p><p>मंगलम कुंदकुंदाद्यो,</p><p>जैन धर्मोस्तु मंगलम ॥</p>
      </div>
      <div className="flex items-center justify-center gap-3 my-8 text-[#bd9859]"><span className="w-12 h-px bg-current opacity-60" /><span>✦</span><span className="w-12 h-px bg-current opacity-60" /></div>
      <p className="text-lg md:text-xl text-[#6c5550] leading-relaxed max-w-2xl mx-auto">
        Two hearts, two families, and one beautiful journey. Your presence will make the wedding celebration of Prateek &amp; Harshita even more special.
      </p>
      <p className="font-hindi text-2xl md:text-3xl text-[#b18b4d] mt-8">{w.family}</p>
    </div>
  </Section>
);

/* ---------- 3D tilt wrapper ---------- */
function Tilt({ children, className = '', max = 10, rounded = 'rounded-3xl' }) {
  const ref = useRef(null);
  const rx = useMotionValue(0); const ry = useMotionValue(0);
  const gx = useMotionValue(50); const gy = useMotionValue(30);
  const srx = useSpring(rx, { stiffness: 140, damping: 16 });
  const sry = useSpring(ry, { stiffness: 140, damping: 16 });
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,243,206,.38), transparent 55%)`;
  const move = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 2 * max); rx.set(-(py - 0.5) * 2 * max); gx.set(px * 100); gy.set(py * 100);
  };
  const reset = () => { rx.set(0); ry.set(0); };
  return (
    <div style={{ perspective: 1000 }} className={className}>
      <motion.div ref={ref} onPointerMove={move} onPointerLeave={reset} onPointerUp={reset} onPointerCancel={reset} style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }} className={`relative ${rounded}`}>
        {children}
        <motion.div className={`pointer-events-none absolute inset-0 ${rounded}`} style={{ background: glare }} />
      </motion.div>
    </div>
  );
}

const Profile = ({ id, name, label, hi, src }) => (
  <Tilt className="w-full max-w-[290px]" max={9} rounded="rounded-[1.6rem]">
    <div className="profile-card" style={{ transformStyle: 'preserve-3d' }}>
      <Img id={id} src={src} label={label} className="aspect-[3/4] w-full" rounded="rounded-[1.1rem]" />
      <h3 className="font-script text-5xl mt-4 text-brown" style={{ transform: 'translateZ(42px)' }}>{name}</h3>
      <p className="font-hindi text-gold" style={{ transform: 'translateZ(24px)' }}>{hi} · {label}</p>
    </div>
  </Tilt>
);

const Couple = () => (
  <Section id="couple" title="The Groom & The Bride" sub="Two families, one beautiful beginning" className="couple-section">
    <Tilt className="mx-auto w-[min(78vw,340px)] mb-16" max={7} rounded="rounded-t-[999px] rounded-b-[2rem]">
      <div className="arch-frame" style={{ transformStyle: 'preserve-3d' }}>
        <Img id="couple" src={w.images.couple} label="Couple Photo" rounded="rounded-t-[999px] rounded-b-[1.4rem]" className="aspect-[3/4.3] w-full" />
        <p className="font-script text-4xl text-center text-brown mt-3 pb-1" style={{ transform: 'translateZ(36px)' }}>{w.groom} &amp; {w.bride}</p>
      </div>
    </Tilt>
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10">
      <Profile id="groom" name={w.groom} label="The Groom"  src={w.images.groom} />
      <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 2.4 }} className="relative shrink-0">
        <Heart className="w-12 h-12 text-[#d98b94] fill-[#e9b3b8]" /><Flower2 className="w-5 h-5 text-brown absolute inset-0 m-auto" />
      </motion.div>
      <Profile id="bride" name={w.bride} label="The Bride" src={w.images.bride} />
    </div>
  </Section>
);

/* ---------- Our story ---------- */
function OurStory() {
  return (
    <Section id="story" title="Our Story"  sub="A journey blessed with love" className="section-wine" dark>
      <div className="max-w-3xl mx-auto relative" style={{ perspective: 1300 }}>
        <div className="absolute left-5 md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-goldlight/60 to-transparent" />
        {w.story.map((item, i) => (
          <motion.article
            key={item.date}
            initial={{ opacity: 0, rotateY: i % 2 ? 32 : -32, y: 20 }} whileInView={{ opacity: 1, rotateY: 0, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{ transformOrigin: i % 2 ? '0% 50%' : '100% 50%' }}
            className={`relative pl-14 md:pl-0 mb-8 md:w-1/2 ${i % 2 ? 'md:ml-auto md:pl-10' : 'md:pr-10'}`}
          >
            <span className={`absolute left-[13px] md:left-auto ${i % 2 ? 'md:-left-[7px]' : 'md:-right-[7px]'} top-6 w-3.5 h-3.5 rounded-full bg-goldlight ring-4 ring-goldlight/25`} />
            <div className="story-card p-6 md:p-7">
              <p className="text-goldlight italic text-lg">{item.date}</p>
              <h3 className="font-script text-4xl text-ivory mt-1">{item.title}</h3>
              <p className="mt-3 leading-7 text-ivory/80 text-lg">{item.text}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Events: date coins + 3D flipping card ---------- */
function Events() {
  const [i, setI] = useState(0);
  const d = w.events[i];
  return (
    <Section id="events" title="Wedding Functions"  sub="Five days of celebration · December 2026">
      <div className="flex justify-center gap-2 sm:gap-4 mb-10" role="tablist" aria-label="Wedding days">
        {w.events.map((e, n) => (
          <button key={e.date} role="tab" aria-selected={n === i} onClick={() => setI(n)} className={`coin ${n === i ? 'is-on' : ''} ${e.main ? 'is-main' : ''}`}>
            <span className="coin-num">{e.date.split(' ')[0]}</span>
            <span className="coin-day">{e.dayEn.slice(0, 3)}</span>
          </button>
        ))}
      </div>
      <div style={{ perspective: 1500 }} className="max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={d.date} role="tabpanel"
            initial={{ rotateY: -85, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: 85, opacity: 0 }} transition={{ duration: 0.5, ease: 'easeInOut' }}
            className={`event-card ${d.main ? 'is-main' : ''}`}
          >
            <div className="flex items-center gap-2 text-gold"><Calendar size={17} /><b className="font-serif text-xl">{d.date}</b></div>
            <p className="font-hindi text-sm mb-3 text-brown/80">{d.day} · {d.dayEn}{d.main && ' · ✦ Main wedding day'}</p>
            {d.items.map(([t, n, e]) => {
              const I = icons[n] || (n.startsWith('आशीर्वाद') ? Utensils : Flower2);
              return (
                <div key={n} className="flex gap-3 items-start py-3 border-t border-gold/25 first:border-0">
                  <span className="mt-1 w-9 h-9 shrink-0 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold"><I size={17} /></span>
                  <div>
                    <p className="font-hindi text-lg leading-snug text-brown">{n}</p>
                    <p className="italic text-gold">{e}</p>
                    <p className="text-sm flex items-center gap-1 text-brown/70"><Clock size={12} />{t}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}

/* ---------- Countdown with flipping digits ---------- */
function FlipUnit({ value, label }) {
  const v = String(value).padStart(2, '0');
  return (
    <div className="text-center">
      <div className="flip-card" style={{ perspective: 600 }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={v} initial={{ rotateX: -90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} exit={{ rotateX: 90, opacity: 0 }} transition={{ duration: 0.45, ease: 'easeOut' }} className="flip-num">{v}</motion.span>
        </AnimatePresence>
        <span className="flip-line" />
      </div>
      <p className="mt-3 italic text-lg text-ivory/75">{label}</p>
    </div>
  );
}

function Countdown() {
  const target = new Date(w.countdownTarget).getTime();
  const calc = () => Math.max(0, target - Date.now());
  const [ms, setMs] = useState(calc);
  useEffect(() => { const t = setInterval(() => setMs(calc()), 1000); return () => clearInterval(t); }, []);
  const s = Math.floor(ms / 1000);
  const u = [['Days', Math.floor(s / 86400)], ['Hours', Math.floor(s / 3600) % 24], ['Minutes', Math.floor(s / 60) % 60], ['Seconds', s % 60]];
  return (
    <Section id="countdown" title="Countdown"  sub="to the big day" className="section-emerald" dark>
      <Mandala className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(130vw,980px)] text-goldlight/[.10] spin-slow pointer-events-none" />
      {ms > 0 ? (
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-2xl mx-auto">
          {u.map(([l, v]) => <FlipUnit key={l} label={l} value={v} />)}
        </div>
      ) : (
        <div className="relative text-center">
          <p className="font-hindi text-2xl md:text-3xl text-goldlight">{w.afterMessage}</p>
          <p className="italic mt-2 text-ivory/80">{w.afterMessageEn}</p>
        </div>
      )}
    </Section>
  );
}

/* ---------- Venue ---------- */
const Venue = () => (
  <Section id="venue" title="Wedding Venue" sub="Come celebrate with us">
    <div className="grid lg:grid-cols-[.85fr_1.15fr] gap-7 lg:gap-10 items-stretch">
      <div className="venue-card relative overflow-hidden p-7 md:p-9 flex flex-col justify-center">
        <div className="absolute -top-16 -right-12 w-48 h-48 rounded-full border border-gold/25" />
        <div className="absolute -top-10 -right-6 w-36 h-36 rounded-full border border-gold/25" />
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-white/80 border border-gold/40 flex items-center justify-center text-gold mb-5"><MapPin size={23} /></div>
          <h3 className="font-hindi text-3xl md:text-4xl text-brown leading-tight">{w.venue.name}</h3>
          <p className="font-hindi text-lg text-brown/70 mt-3 flex items-start gap-2"><MapPin size={18} className="text-gold shrink-0 mt-1" />{w.venue.address}</p>
          <div className="h-px bg-gradient-to-r from-gold/60 via-gold/20 to-transparent my-6" />
          <a href={w.venue.directionsUrl} target="_blank" rel="noreferrer" className="hero-cta w-fit"><Navigation size={18} />Get directions</a>
        </div>
      </div>
      <div className="relative min-h-[340px] md:min-h-[440px] rounded-[2rem] overflow-hidden border border-gold/50 bg-[#eee3d5] shadow-[0_22px_65px_rgba(91,61,42,.2)] isolate">
        <iframe title="Wedding venue location map" src={w.venue.embedUrl} loading="lazy" className="absolute inset-0 w-full h-full border-0" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        <div className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-[78%] flex flex-col items-center pointer-events-none">
          <motion.div animate={{ y: [0, -9, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} className="flex flex-col items-center">
            <div className="w-[62px] h-[62px] rounded-[22px] rotate-45 bg-gradient-to-br from-[#fff4d5] via-[#d6b16d] to-[#8e642d] p-[3px] shadow-[0_12px_24px_rgba(72,48,23,.35)]">
              <div className="w-full h-full rounded-[19px] bg-gradient-to-br from-[#fffdf5] via-[#f1d99e] to-[#b78b43] flex items-center justify-center">
                <MapPin size={26} className="-rotate-45 text-[#805a2d]" />
              </div>
            </div>
          </motion.div>
          <div className="w-12 h-3 rounded-[50%] bg-[#39271d]/30 blur-[4px] mt-3" />
          <div className="mt-2 rounded-full border border-[#d6bd8e] bg-[#fffdf7]/95 px-4 py-1.5 shadow-lg text-center whitespace-nowrap">
            <p className="font-hindi text-[13px] md:text-sm font-semibold text-[#76552f]">{w.venue.name}</p>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

/* ---------- Gallery: 3D coverflow ---------- */
function Gallery() {
  const items = w.gallery;
  const n = items.length;
  const [a, setA] = useState(0);
  const [lb, setLb] = useState(null);
  const [hover, setHover] = useState(false);
  const go = (dir) => setA((x) => (x + dir + n) % n);
  useEffect(() => {
    if (hover || lb !== null || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => go(1), 4800);
    return () => clearInterval(t);
  }, [hover, lb]);
  useEffect(() => {
    const k = (e) => {
      if (lb === null) return;
      if (e.key === 'Escape') setLb(null);
      if (e.key === 'ArrowRight') setLb((lb + 1) % n);
      if (e.key === 'ArrowLeft') setLb((lb - 1 + n) % n);
    };
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, [lb, n]);
  const off = (i) => { let d = (((i - a) % n) + n) % n; if (d > n / 2) d -= n; return d; };
  return (
    <Section id="gallery" title="Photo Gallery" sub="Moments we will treasure" className="section-wine" dark>
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <motion.div
          drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2}
          onDragEnd={(_, info) => { if (info.offset.x < -50) go(1); else if (info.offset.x > 50) go(-1); }}
          className="relative h-[430px] md:h-[560px] cursor-grab active:cursor-grabbing touch-pan-y" style={{ perspective: 1500 }}
        >
          {items.map((g, i) => {
            const d = off(i);
            return (
              <motion.button
                key={g.src} type="button" aria-label={g.label}
                onClick={() => (d === 0 ? setLb(i) : setA(i))}
                animate={{ x: `${d * 62}%`, z: -Math.abs(d) * 240, rotateY: -d * 36, scale: d === 0 ? 1 : 0.86, opacity: Math.abs(d) > 1 ? 0 : 1, zIndex: 10 - Math.abs(d) }}
                transition={{ duration: 0.8, ease: [0.22, 0.8, 0.3, 1] }}
                className="absolute top-0 bottom-10 left-0 right-0 mx-auto w-[min(66vw,320px)] md:w-[360px] gallery-frame"
                style={{ pointerEvents: Math.abs(d) > 1 ? 'none' : 'auto' }}
              >
                <Img id={'g' + i} src={g.src} label={g.label} className="w-full h-full pointer-events-none" rounded="rounded-[0.9rem]" />
              </motion.button>
            );
          })}
        </motion.div>
        <div className="flex items-center justify-center gap-5 mt-2">
          <button onClick={() => go(-1)} className="round-btn" aria-label="Previous photo"><ChevronLeft size={20} /></button>
          <p className="font-script text-3xl text-goldlight min-w-[220px] text-center">{items[a].label}</p>
          <button onClick={() => go(1)} className="round-btn" aria-label="Next photo"><ChevronRight size={20} /></button>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {items.map((g, i) => <button key={i} onClick={() => setA(i)} aria-label={`Show photo ${i + 1}`} className={`h-1.5 rounded-full transition-all ${i === a ? 'w-8 bg-goldlight' : 'w-3 bg-ivory/30'}`} />)}
        </div>
      </div>
      <AnimatePresence>
        {lb !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLb(null)} className="fixed inset-0 z-[90] bg-[#1b0a0e]/95 flex items-center justify-center p-4">
            <button className="absolute top-4 right-4 text-white" aria-label="Close"><X size={28} /></button>
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md">
              <Img id={'g' + lb} src={items[lb].src} label={items[lb].label} className="aspect-[3/4.2] w-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

/* ---------- Social + footer ---------- */
function SocialLinks() {
  const entries = [['groom', `The Groom · ${w.groom}`], ['bride', `The Bride · ${w.bride}`], ['couple', 'Together · Prateek & Harshita'], ['photographer', 'Photography']].filter(([key]) => w.social?.[key]?.trim());
  if (!entries.length) return null;
  return (
    <Section id="social" title="Follow our journey" hi="">
      <div className="flex flex-wrap justify-center gap-4">
        {entries.map(([key, label]) => (
          <a key={key} href={`https://www.instagram.com/${w.social[key].replace(/^@/, '')}/`} target="_blank" rel="noreferrer" className="royal-card min-w-48 px-6 py-5 flex items-center gap-3 hover:-translate-y-1 transition">
            <Instagram className="text-gold" size={23} />
            <span><b className="block text-brown">{label}</b><small className="text-gold">@{w.social[key].replace(/^@/, '')}</small></span>
          </a>
        ))}
      </div>
    </Section>
  );
}

const Footer = () => (
  <footer className="footer-night relative text-center px-5 py-20 text-ivory">
    <Lotus className="w-16 h-16 mx-auto" />
    <p className="font-hindi text-goldlight mt-3">{w.greeting}</p>
    <p className="font-hindi text-xl md:text-2xl max-w-xl mx-auto mt-6 leading-loose">{w.closing.line1}</p>
    <p className="italic text-ivory/75 max-w-xl mx-auto mt-2 text-lg">{w.closing.en}</p>
    <Divider />
    <p className="font-hindi text-lg">{w.closing.line2}</p>
    <p className="font-hindi text-2xl text-goldlight mt-1">{w.family}</p>
    <p className="font-script text-4xl mt-8">{w.closing.signoff}</p>
    <div className="mt-10 pt-5 border-t border-goldlight/25 text-sm text-ivory/70">
      <p>Website crafted with love by <strong className="text-ivory">{w.websiteCredit.name}</strong></p>
      <a className="inline-flex items-center gap-2 mt-2 text-goldlight hover:text-ivory" href={`tel:${w.websiteCredit.phone}`}><Phone size={14} />{w.websiteCredit.phone}</a>
    </div>
  </footer>
);

/* ---------- Floating tools ---------- */
function WeddingTools({ audioRef, playing, setPlaying }) {
  const [musicError, setMusicError] = useState(false);
  const toggleMusic = async () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) { el.pause(); setPlaying(false); return; }
    try { await el.play(); setPlaying(true); setMusicError(false); } catch { setMusicError(true); }
  };
  const addCalendar = () => {
    const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');
    const months = { January: '01', February: '02', March: '03', April: '04', May: '05', June: '06', July: '07', August: '08', September: '09', October: '10', November: '11', December: '12' };
    const stamp = (date, time) => {
      const [d, m, y] = date.split(' ');
      const [hh, mm] = time.replace(/ (AM|PM)/, '').split(':');
      const h = (Number(hh) % 12) + (time.slice(-2) === 'PM' ? 12 : 0);
      return `${y}${months[m]}${d.padStart(2, '0')}T${String(h).padStart(2, '0')}${mm}00`;
    };
    const events = w.events.flatMap((day) => day.items.map(([time, name]) => `BEGIN:VEVENT\r\nDTSTART:${stamp(day.date, time)}\r\nSUMMARY:${esc(name + ' · ' + w.groom + ' & ' + w.bride)}\r\nLOCATION:${esc(w.venue.name + ', ' + w.venue.address)}\r\nDESCRIPTION:${esc('Wedding celebration of ' + w.groom + ' and ' + w.bride + ' · ' + w.family)}\r\nEND:VEVENT`)).join('\r\n');
    const ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Prateek and Harshita//Wedding//EN\r\nCALSCALE:GREGORIAN\r\n${events}\r\nEND:VCALENDAR`;
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url; a.download = 'Prateek-Harshita-Wedding-Calendar.ics'; a.click();
    URL.revokeObjectURL(url);
  };
  const share = () => {
    const text = `With the blessings of Jinendra Bhagwan, you are warmly invited to the wedding of ${w.groom} & ${w.bride} on 11 December 2026. Venue: ${w.venue.name}, ${w.venue.address}. ${location.href}`;
    window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank', 'noopener,noreferrer');
  };
  return (
    <div className="fixed bottom-5 right-4 md:right-7 z-40 flex flex-col gap-2 items-end">
      {musicError && <span className="music-hint">Add your royalty-free track at public/audio/wedding-instrumental.mp3</span>}
      <button onClick={toggleMusic} className="royal-fab" aria-label={playing ? 'Pause wedding music' : 'Play wedding music'} title="Wedding music">
        {playing ? <Volume2 size={19} /> : <VolumeX size={19} />}<span>{playing ? 'Music on' : 'Music'}</span>
      </button>
      <button onClick={addCalendar} className="royal-fab" title="Add wedding functions to calendar"><CalendarPlus size={19} /><span>Save dates</span></button>
      <button onClick={share} className="royal-fab" title="Share invitation on WhatsApp"><Share2 size={19} /><span>Share</span></button>
    </div>
  );
}

/* ---------- App ---------- */
export default function App() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const onOpen = (withMusic) => {
    setOpened(true);
    if (withMusic && audioRef.current) audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
  };
  return (
    <>
      <div className="wedding-video-bg" aria-hidden="true">
        <video autoPlay muted loop playsInline preload="metadata" poster="/video/poster.jpg"><source src="/video/background-video.mp4" type="video/mp4" /></video>
        <div className="wedding-video-overlay" />
      </div>
      <audio ref={audioRef} src={w.music.src} loop preload="none" onEnded={() => setPlaying(false)} />
      <Petals />
      <Nav />
      <main className="relative z-10">
        <Hero opened={opened} />
        <ScratchDate />
        <Invitation />
        <Couple />
        <OurStory />
        <Events />
        <Countdown />
        <Venue />
        <Gallery />
        <SocialLinks />
      </main>
      <div className="relative z-10"><Footer /></div>
      <WeddingTools audioRef={audioRef} playing={playing} setPlaying={setPlaying} />
      <PalaceDoors onOpen={onOpen} />
    </>
  );
}
