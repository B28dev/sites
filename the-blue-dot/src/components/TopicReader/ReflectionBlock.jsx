import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ReflectionBlock({ reflection, question }) {
  const reflectionRef = useRef(null);
  const questionRef = useRef(null);
  const triggeredR = useRef(false);
  const triggeredQ = useRef(false);

  useEffect(() => {
    const r = reflectionRef.current;
    const q = questionRef.current;

    if (r) {
      gsap.set(r, { opacity: 0, y: 30 });
      const st1 = ScrollTrigger.create({
        trigger: r,
        start: 'top 80%',
        onEnter: () => {
          if (triggeredR.current) return;
          triggeredR.current = true;
          gsap.to(r, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
        },
      });

      // reset on topic change (component reuse)
      return () => {
        st1.kill();
        triggeredQ.current = false;
        triggeredR.current = false;
      };
    }
  }, []);

  useEffect(() => {
    const q = questionRef.current;
    if (!q) return;

    gsap.set(q, { opacity: 0 });
    const st2 = ScrollTrigger.create({
      trigger: q,
      start: 'top 85%',
      onEnter: () => {
        if (triggeredQ.current) return;
        triggeredQ.current = true;
        gsap.to(q, { opacity: 1, duration: 1, ease: 'power2.out' });
      },
    });

    return () => st2.kill();
  }, []);

  return (
    <div>
      {/* Reflection quote — animates on scroll */}
      <div
        ref={reflectionRef}
        className="reflection-block py-14 my-4 border-y border-borderLine/30 text-center relative overflow-hidden group"
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gold/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-gold/10 transition-colors duration-1000" />
        <p className="font-heading text-2xl md:text-3xl italic text-white/90 relative z-10 mx-auto max-w-2xl leading-snug">
          "{reflection}"
        </p>
      </div>

      {/* Final question — animates separately, slightly later */}
      <div
        ref={questionRef}
        className="final-question bg-surface/30 p-8 md:p-10 rounded-xl border border-borderLine/50 mt-4"
      >
        <p className="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em] mb-4">
          Reflexão Estendida
        </p>
        <p className="font-heading text-2xl text-white/90 leading-relaxed">
          {question}
        </p>
      </div>
    </div>
  );
}
