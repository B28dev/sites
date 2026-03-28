import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function ScaleSection() {
  const container = useRef();
  const solRef = useRef();

  useGSAP(() => {
    gsap.fromTo('.scale-element',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1.5, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: container.current, start: 'top 75%' }
      }
    );

    const solTargetSize = window.innerWidth < 768 ? 80 : 160;
    gsap.fromTo(solRef.current,
      { width: 0, height: 0, opacity: 0 },
      {
        width: solTargetSize, height: solTargetSize, opacity: 1,
        duration: 2.0, ease: 'power3.out',
        scrollTrigger: { trigger: solRef.current, start: 'top 80%' }
      }
    );
  }, { scope: container });

  return (
    <section ref={container} id="scale" className="w-full min-h-screen py-32 flex flex-col items-center justify-center relative px-6 z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-deep via-transparent to-transparent opacity-80 pointer-events-none" />

      <div className="max-w-5xl text-center relative z-10 w-full">
        <h2 className="scale-element font-heading text-4xl md:text-5xl lg:text-6xl mb-24 text-textMain leading-tight">
          Para entender o ponto azul,<br/>
          <span className="text-text-muted italic">primeiro entenda o vazio.</span>
        </h2>

        {/* Visualização 80vw — Terra, Lua, Sol com espaçamento real */}
        <div className="scale-element w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between mb-4 gap-10 md:gap-0 py-8 md:py-0">

          {/* Terra */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="rounded-full"
              style={{
                width: 8, height: 8,
                background: '#4A9EFF',
                boxShadow: '0 0 8px rgba(74,158,255,0.7)',
              }}
            />
            <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color: '#D4D8E8' }}>Terra</span>
            <span className="font-mono text-[9px]" style={{ color: '#8B92B0' }}>você está aqui</span>
          </div>

          {/* Lua */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="rounded-full"
              style={{
                width: 24, height: 24,
                background: 'rgba(210,210,230,0.35)',
                boxShadow: '0 0 12px rgba(210,210,230,0.2)',
              }}
            />
            <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color: '#D4D8E8' }}>Lua</span>
            <span className="font-mono text-[9px]" style={{ color: '#8B92B0' }}>384.400 km</span>
          </div>

          {/* Sol */}
          <div className="flex flex-col items-center gap-3">
            <div
              ref={solRef}
              className="rounded-full"
              style={{
                width: 0, height: 0,
                background: 'radial-gradient(circle at 40% 35%, #e8c878 0%, #C8A96E 60%, #a07840 100%)',
                boxShadow: '0 0 40px rgba(200,169,110,0.6), 0 0 80px rgba(200,169,110,0.25)',
              }}
            />
            <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color: '#C8A96E' }}>Sol</span>
            <span className="font-mono text-[9px]" style={{ color: '#8B92B0' }}>109 Terras</span>
          </div>
        </div>

        {/* Via Láctea — não cabe na tela */}
        <div className="scale-element w-full max-w-5xl mx-auto flex items-center gap-2 mt-8 mb-3">
          <div className="flex-1 border-t border-dashed border-accent/20" />
          <span className="font-mono text-[10px] whitespace-nowrap px-3" style={{ color: '#8B92B0' }}>
            [&nbsp;←————&nbsp;&nbsp;VIA LÁCTEA&nbsp;&nbsp;————→&nbsp;]
          </span>
          <div className="flex-1 border-t border-dashed border-accent/20" />
        </div>
        <p className="scale-element font-mono text-[10px] tracking-widest uppercase mb-16" style={{ color: '#8B92B0' }}>
          100.000 anos-luz · não cabe nesta tela
        </p>

        <div className="scale-element font-body text-textMain/80 font-light max-w-2xl mx-auto leading-relaxed px-4 text-center" style={{ fontSize: 'clamp(14px, 3.5vw, 19px)' }}>
          <p className="mb-6">
            Imagine que o Sol fosse do tamanho de uma porta.<br/>
            A Terra seria uma pequena moeda, a <span className="text-white">26 metros</span> de distância.
          </p>
          <p style={{ color: '#8B92B0' }}>
            Nesta escala, você seria completamente invisível a olho nu.
          </p>
        </div>
      </div>
    </section>
  );
}
