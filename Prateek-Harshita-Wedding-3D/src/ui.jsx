import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

export const Lotus = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" stroke="#C5A46D" strokeWidth="1.5" aria-hidden="true">
    {[-50, -25, 0, 25, 50].map((a) => (
      <path key={a} transform={`rotate(${a} 32 52)`} d="M32 52C22 40 24 22 32 10c8 12 10 30 0 42z" fill={a === 0 ? '#F2D6C9' : '#FFF9F0'} />
    ))}
    <path d="M12 54h40" />
  </svg>
);

export const Divider = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 my-5 ${className}`} aria-hidden>
    <span className="h-px w-20 bg-gradient-to-r from-transparent to-gold" />
    <Lotus className="w-9 h-9" />
    <span className="h-px w-20 bg-gradient-to-l from-transparent to-gold" />
  </div>
);

// Large rangoli-style mandala (draws with currentColor)
export const Mandala = ({ className = '' }) => (
  <svg viewBox="-200 -200 400 400" className={className} fill="none" stroke="currentColor" strokeWidth=".8" aria-hidden="true">
    {[192, 172, 120, 72, 30].map((r) => (
      <circle key={r} r={r} strokeDasharray={r === 172 ? '2 5' : undefined} />
    ))}
    {Array.from({ length: 24 }, (_, i) => i * 15).map((a) => (
      <path key={'a' + a} transform={`rotate(${a})`} d="M0 -120C14 -142 14 -162 0 -186C-14 -162 -14 -142 0 -120z" />
    ))}
    {Array.from({ length: 12 }, (_, i) => i * 30 + 15).map((a) => (
      <path key={'b' + a} transform={`rotate(${a})`} d="M0 -32C9 -48 9 -60 0 -76C-9 -60 -9 -48 0 -32z" />
    ))}
    {Array.from({ length: 36 }, (_, i) => i * 10).map((a) => (
      <circle key={'c' + a} transform={`rotate(${a}) translate(0 -182)`} r="1.6" fill="currentColor" />
    ))}
  </svg>
);

export const Section = ({ id, title, hi, sub, children, className = '', dark = false }) => (
  <section id={id} className={`relative px-5 py-20 md:py-28 ${className}`}>
    <motion.div
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9 }}
      className="relative max-w-5xl mx-auto"
    >
      {title && (
        <header className="text-center">
          {hi && <p className={`font-hindi text-lg md:text-xl ${dark ? 'text-goldlight' : 'text-gold'}`}>{hi}</p>}
          <h2 className={`font-serif font-medium text-4xl md:text-6xl leading-tight ${dark ? 'text-ivory' : 'text-brown'}`}>{title}</h2>
          {sub && <p className={`italic mt-2 text-lg md:text-xl ${dark ? 'text-ivory/70' : 'text-brown/65'}`}>{sub}</p>}
          <Divider />
        </header>
      )}
      {children}
    </motion.div>
  </section>
);

const editMode = typeof location !== 'undefined' && location.search.includes('edit');
// Image slot: shows config image, or uploaded override, or a placeholder.
export function Img({ src, id, label, className = '', rounded = 'rounded-2xl', bare = false }) {
  const [bad, setBad] = useState(false);
  const [local, setLocal] = useState(null);
  useEffect(() => { try { setLocal(localStorage.getItem('img:' + id)); } catch { /* storage blocked */ } }, [id]);
  const url = local || src;
  const upload = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try { localStorage.setItem('img:' + id, r.result); } catch { alert('Image too large to store; use /public/images instead.'); }
      setLocal(r.result); setBad(false);
    };
    r.readAsDataURL(f);
  };
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-peach to-blush ${rounded} ${className}`}>
      {url && !bad ? (
        <img src={url} alt={label} loading="lazy" decoding="async" onError={() => setBad(true)} className="w-full h-full object-cover" />
      ) : (
        <div className={`w-full h-full flex flex-col items-center justify-center text-gold/90 ${bare ? '' : 'min-h-[8rem]'}`}>
          {bare ? <Lotus className="w-3/5 h-3/5" /> : (<><Lotus className="w-14 h-14" /><span className="mt-2 text-sm tracking-widest uppercase">{label}</span></>)}
        </div>
      )}
      {editMode && (
        <label className="absolute bottom-2 right-2 bg-ivory/90 p-2 rounded-full cursor-pointer shadow">
          <Camera size={16} /><input type="file" accept="image/*" hidden onChange={upload} />
        </label>
      )}
    </div>
  );
}

export const Petals = () => (
  <>
    {Array.from({ length: 8 }).map((_, i) => (
      <span key={i} className="petal" style={{ left: `${(i * 13 + 5) % 100}%`, animationDuration: `${18 + i * 2}s`, animationDelay: `${i * 2.6}s`, background: i % 3 ? '#EBCBCB' : '#F2D6C9' }} />
    ))}
  </>
);

// Royal Jain wedding mangal-kalash ornament used beside the hero title.
export const MangalKalash = ({ className = '' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
    <g stroke="#C9A24E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 30C39 19 38 9 43 5c7 2 10 9 7 18C54 12 61 7 67 9c1 8-5 16-15 22" fill="#A9B89E" stroke="#8FA486" />
      <path d="M48 28C34 15 23 15 19 21c5 9 15 13 29 12M52 28C66 15 77 15 81 21c-5 9-15 13-29 12" fill="#C6D0B5" stroke="#8FA486" />
      <path d="M50 26v13" />
      <path d="M37 37h26l-3 10H40z" fill="#E6C77E" />
      <path d="M34 46h32" strokeWidth="3" />
      <path d="M39 47c-1 8-10 13-10 24 0 13 9 20 21 20s21-7 21-20c0-11-9-16-10-24z" fill="#E6C77E" fillOpacity=".8" />
      <path d="M35 61c9 5 21 5 30 0M32 73c11 6 25 6 36 0M39 84c7 3 15 3 22 0" stroke="#9A6C36" />
      <path d="M50 55l4 8-4 8-4-8z" fill="#9B3A48" stroke="#9B3A48" />
      <path d="M50 93v4M44 97h12" />
    </g>
    <g fill="#E6C77E"><circle cx="20" cy="35" r="2.5" /><circle cx="80" cy="35" r="2.5" /><path d="M15 45l2 3 3 1-3 2-2 3-1-3-3-2 3-1zM85 45l-2 3-3 1 3 2 2 3 1-3 3-2-3-1z" /></g>
  </svg>
);

export const Toran = ({ className = 'top-[78px] md:top-[90px]' }) => (
  <svg viewBox="0 0 1400 90" preserveAspectRatio="xMidYMin slice" className={`absolute inset-x-0 w-full h-20 pointer-events-none opacity-80 ${className}`} aria-hidden="true">
    <path d="M0 8Q700 40 1400 8" stroke="#C9A24E" strokeWidth="2" fill="none" />
    {Array.from({ length: 15 }).map((_, i) => {
      const x = 40 + i * 95;
      const y = 8 + 32 * Math.sin((Math.PI * x) / 1400) * 0.9;
      return (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d="M0 0c-10 14-10 34 0 48 10-14 10-34 0-48z" fill="#7FA08A" opacity=".9" />
          <path d="M0 4v40" stroke="#5E7F6A" />
          <circle cx="48" cy="-2" r="6" fill={i % 2 ? '#F29A2E' : '#E8642B'} stroke="#E6C77E" />
        </g>
      );
    })}
  </svg>
);
