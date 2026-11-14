import {useState,useEffect,useRef} from 'react';
import {motion,AnimatePresence} from 'framer-motion';
import {Sparkles} from 'lucide-react';
import {Section} from './ui.jsx';

function ScratchDate(){
  const canvasRef=useRef(null);
  const [revealed,setRevealed]=useState(false);
  const drawing=useRef(false);
  const last=useRef(null);
  const distance=useRef(0);

  useEffect(()=>{
    const canvas=canvasRef.current;
    if(!canvas)return;

    const paint=()=>{
      const rect=canvas.getBoundingClientRect();
      if(!rect.width||!rect.height)return;

      const dpr=Math.min(2,window.devicePixelRatio||1);
      canvas.width=Math.round(rect.width*dpr);
      canvas.height=Math.round(rect.height*dpr);

      const ctx=canvas.getContext('2d');
      ctx.setTransform(dpr,0,0,dpr,0,0);

      const g=ctx.createLinearGradient(0,0,rect.width,rect.height);
      g.addColorStop(0,'#fff0c9');
      g.addColorStop(.2,'#c69a50');
      g.addColorStop(.4,'#f9e8bd');
      g.addColorStop(.65,'#a97936');
      g.addColorStop(.85,'#efd6a0');
      g.addColorStop(1,'#9a6d32');

      ctx.fillStyle=g;
      ctx.fillRect(0,0,rect.width,rect.height);

      ctx.save();
      ctx.globalAlpha=.18;
      for(let x=-rect.height;x<rect.width;x+=12){
        ctx.strokeStyle='#fff';
        ctx.lineWidth=1;
        ctx.beginPath();
        ctx.moveTo(x,0);
        ctx.lineTo(x+rect.height,rect.height);
        ctx.stroke();
      }
      ctx.restore();

      const glow=ctx.createRadialGradient(
        rect.width/2,rect.height/2,5,
        rect.width/2,rect.height/2,rect.width*.65
      );
      glow.addColorStop(0,'rgba(255,255,255,.35)');
      glow.addColorStop(1,'rgba(80,45,12,.12)');
      ctx.fillStyle=glow;
      ctx.fillRect(0,0,rect.width,rect.height);

      ctx.strokeStyle='rgba(255,250,230,.9)';
      ctx.lineWidth=1.5;
      ctx.strokeRect(13,13,rect.width-26,rect.height-26);

      ctx.strokeStyle='rgba(103,67,29,.55)';
      ctx.strokeRect(19,19,rect.width-38,rect.height-38);

      ctx.textAlign='center';
      ctx.textBaseline='middle';
      ctx.fillStyle='#604322';
      ctx.font='20px Georgia,serif';
      ctx.fillText('✦',rect.width/2,rect.height/2-48);

      ctx.font='600 12px Georgia,serif';
      ctx.letterSpacing='3px';
      ctx.fillText('A SECRET WORTH KEEPING',rect.width/2,rect.height/2-12);

      ctx.font='11px Georgia,serif';
      ctx.letterSpacing='2px';
      ctx.fillText('UNVEIL THE GOLDEN SECRET',rect.width/2,rect.height/2+19);

      ctx.font='20px Georgia,serif';
      ctx.fillText('✧',rect.width/2,rect.height/2+55);
    };

    paint();
    const observer=new ResizeObserver(paint);
    observer.observe(canvas);
    return()=>observer.disconnect();
  },[]);

  const point=e=>{
    const r=canvasRef.current.getBoundingClientRect();
    return{x:e.clientX-r.left,y:e.clientY-r.top};
  };

  const start=e=>{
    if(revealed)return;
    drawing.current=true;
    last.current=point(e);
    e.currentTarget.setPointerCapture?.(e.pointerId);
    scratch(e);
  };

  const scratch=e=>{
    if(!drawing.current||revealed)return;

    const c=canvasRef.current;
    const ctx=c.getContext('2d');
    const p=point(e);

    ctx.save();
    ctx.globalCompositeOperation='destination-out';
    ctx.lineCap='round';
    ctx.lineJoin='round';
    ctx.lineWidth=48;
    ctx.beginPath();

    if(last.current){
      ctx.moveTo(last.current.x,last.current.y);
      ctx.lineTo(p.x,p.y);
      distance.current+=Math.hypot(
        p.x-last.current.x,
        p.y-last.current.y
      );
    }else{
      ctx.arc(p.x,p.y,24,0,Math.PI*2);
    }

    ctx.stroke();
    ctx.restore();
    last.current=p;

    if(distance.current>1050){
      setRevealed(true);
    }
  };

  const stop=()=>{
    drawing.current=false;
    last.current=null;
  };

  return(
    <Section
      id="scratch"
      title="A little golden surprise" 
      sub="A little surprise, waiting just beneath the surface"
      className="scratch-section"
    >
      <div className="max-w-2xl mx-auto text-center">

        <p className="font-serif italic text-brown/70 text-base md:text-lg mb-10 leading-relaxed">
          Some moments are too precious to be revealed at first glance.
          A little golden mystery awaits you.
        </p>

        <div className="relative mx-auto max-w-[490px]"
          style={{perspective:'1200px'}}>

          <motion.div
            initial={{opacity:0,y:35,rotateX:12}}
            whileInView={{opacity:1,y:0,rotateX:0}}
            viewport={{once:true}}
            transition={{duration:1,ease:'easeOut'}}
            whileHover={{rotateX:3,rotateY:-2,scale:1.015}}
            style={{transformStyle:'preserve-3d'}}
            className="relative rounded-[30px] p-[9px] bg-gradient-to-br from-[#fff0c5] via-[#a77b3c] to-[#f1d69b] shadow-[0_30px_60px_rgba(75,48,20,.3),0_10px_20px_rgba(75,48,20,.18)]"
          >

            <div className="relative min-h-[310px] md:min-h-[340px] overflow-hidden rounded-[23px] border border-[#fff4d8] bg-gradient-to-br from-[#fffdf7] via-[#f8eddb] to-[#e9d7b9]">

              <div className="absolute inset-3 rounded-[18px] border border-[#c5a36d]/50 pointer-events-none"/>
              <div className="absolute inset-5 rounded-[14px] border border-dashed border-[#c5a36d]/35 pointer-events-none"/>

              <div className="absolute top-6 left-7 text-[#b9975b] text-2xl">❧</div>
              <div className="absolute top-6 right-7 text-[#b9975b] text-2xl -scale-x-100">❧</div>
              <div className="absolute bottom-6 left-7 text-[#b9975b] text-2xl -scale-y-100">❧</div>
              <div className="absolute bottom-6 right-7 text-[#b9975b] text-2xl scale-[-1]">❧</div>

              <motion.div
                initial={{opacity:0,scale:.9}}
                whileInView={{opacity:1,scale:1}}
                viewport={{once:true}}
                className="relative z-[1] flex min-h-[310px] md:min-h-[340px] flex-col items-center justify-center px-5 py-10"
              >
                <span className="font-hindi text-[#a17c45] text-xl">A Beautiful Beginning</span>

                <div className="flex items-center gap-3 my-4 text-[#b9975b]">
                  <span className="w-10 h-px bg-current"/>
                  <span>✦</span>
                  <span className="w-10 h-px bg-current"/>
                </div>

                <p className="font-script text-4xl md:text-5xl text-[#542b32]">
                  Prateek <span className="text-[#b9975b]">&</span> Harshita
                </p>

                <AnimatePresence mode="wait">
                  {revealed?(
                    <motion.div
                      key="revealed"
                      initial={{opacity:0,y:25,scale:.8}}
                      animate={{opacity:1,y:0,scale:1}}
                      transition={{duration:.8,ease:'easeOut'}}
                      className="text-center"
                    >
                      <p className="font-serif text-3xl md:text-4xl tracking-wide text-[#76512e] mt-5">
                        11 · 12 · 2026
                      </p>
                      <p className="text-[11px] tracking-[.28em] text-[#a17c45] mt-2">
                        FRIDAY · THE BIG DAY
                      </p>
                      <p className="font-serif italic text-sm text-[#765d4a] mt-5">
                        And just like that, forever found its date.
                      </p>
                    </motion.div>
                  ):(
                    <motion.div
                      key="hidden"
                      initial={{opacity:0}}
                      animate={{opacity:1}}
                      className="text-center"
                    >
                      <p className="font-serif italic text-lg text-[#8d704e] mt-5">
                        A beautiful beginning is waiting...
                      </p>
                      <p className="text-[10px] tracking-[.25em] text-[#a17c45] mt-3">
                        11 DECEMBER 2026
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>


              </motion.div>

              {!revealed&&(
                <motion.div
                  initial={{opacity:0}}
                  animate={{opacity:[.8,1,.8]}}
                  transition={{duration:2.5,repeat:Infinity}}
                  className="absolute inset-0 z-10"
                >
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full touch-none cursor-crosshair"
                    onPointerDown={start}
                    onPointerMove={scratch}
                    onPointerUp={stop}
                    onPointerCancel={stop}
                    onPointerLeave={stop}
                    aria-label="Scratch to reveal the wedding date"
                  />
                </motion.div>
              )}

              {revealed&&(
                <motion.div
                  initial={{opacity:0}}
                  animate={{opacity:1}}
                  className="absolute inset-0 z-[2] pointer-events-none"
                >
                  <motion.div
                    animate={{scale:[.8,1.4],opacity:[.4,0]}}
                    transition={{duration:1.5}}
                    className="absolute inset-0 rounded-full bg-[#e7c982]/30 blur-2xl"
                  />
                </motion.div>
              )}

            </div>
          </motion.div>
        </div>

        <motion.div
          key={revealed?'done':'hint'}
          initial={{opacity:0,y:8}}
          animate={{opacity:1,y:0}}
          className="mt-8 flex flex-col items-center gap-2 text-[#9a7544]"
        >
          <Sparkles size={20}/>
          <p className="text-sm md:text-base tracking-wide">
            {revealed
              ? 'A new chapter begins — we look forward to celebrating together.'
              : 'Unveil the golden secret with a gentle touch'}
          </p>
        </motion.div>

      </div>
    </Section>
  );
}

export default ScratchDate;
