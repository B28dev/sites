import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import PaleBlueDot from './PaleBlueDot';

const line1Words = 'Um grão de poeira'.split(' ');
const line2Words = 'suspenso num raio de luz.'.split(' ');

export default function Hero() {
  const container = useRef();

  useGSAP(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      gsap.set('.dot-container', { opacity: 1, scale: 1 });
      gsap.set('.hero-text-1', { opacity: 1, y: 0 });
      gsap.set('.hero-word', { opacity: 1, y: 0 });
      gsap.set('.hero-text-3', { opacity: 1, y: 0 });
      gsap.set('.scroll-indicator', { opacity: 1 });
      return;
    }

    // PaleBlueDot entrance with elastic spring
    gsap.fromTo(
      '.dot-container',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, delay: 1.0, ease: 'elastic.out(1, 0.5)' }
    );

    // Badge appears at 1.8s
    gsap.fromTo(
      '.hero-text-1',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1.2, delay: 1.8, ease: 'power3.out' }
    );

    // Word-by-word headline at 1.8s with stagger
    gsap.fromTo(
      '.hero-word',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 1.8, stagger: 0.15, ease: 'power3.out' }
    );

    // Subtitle paragraph
    gsap.fromTo(
      '.hero-text-3',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1.4, delay: 2.8, ease: 'power3.out' }
    );

    // Scroll indicator at 3.5s
    gsap.fromTo(
      '.scroll-indicator',
      { opacity: 0 },
      { opacity: 1, duration: 1.5, delay: 3.5, ease: 'power2.out' }
    );
  }, { scope: container });

  return (
    <section ref={container} id="hero" className="w-full h-screen flex flex-col items-center justify-center relative px-6">

      {/* The Point itself */}
      <div className="dot-container opacity-0 absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2">
        <PaleBlueDot />
      </div>

      {/* Texts Container */}
      <div className="text-center mt-40 max-w-4xl border-t border-transparent z-10">
        <div className="hero-text-1 opacity-0 font-mono text-gold tracking-[0.18em] uppercase mb-8 md:mb-10 px-4" style={{ fontSize: 'clamp(10px, 2.5vw, 14px)' }}>
          Voyager 1 · 14 de fevereiro de 1990<br/>
          <span className="mt-3 block tracking-[0.18em]">6.054.558.968 km do Sol</span>
        </div>

        <h1 className="hero-text-2 font-heading leading-[1.1] mb-6 md:mb-8 text-glow" style={{ fontSize: 'clamp(2rem, 8vw, 5rem)' }}>
          {line1Words.map((word, i) => (
            <span key={i} className="hero-word inline-block mr-[0.25em] opacity-0">{word}</span>
          ))}
          <span className="italic text-text-muted block mt-3 drop-shadow-none" style={{ fontSize: 'clamp(1.5rem, 6vw, 3.5rem)' }}>
            {line2Words.map((word, i) => (
              <span key={i} className="hero-word inline-block mr-[0.25em] opacity-0">{word}</span>
            ))}
          </span>
        </h1>

        <p className="hero-text-3 opacity-0 font-body text-text-muted max-w-xl mx-auto tracking-wide leading-relaxed px-6" style={{ fontSize: 'clamp(13px, 3.5vw, 16px)' }}>
          A Terra. Nossa casa. O único lar que a humanidade já conheceu.
        </p>
      </div>

      <div className="scroll-indicator opacity-0 absolute bottom-12 font-mono text-[10px] tracking-[0.3em] uppercase text-text-muted flex flex-col items-center gap-4 pulse">
        <span>contemplar</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-text-muted/60 to-transparent"></div>
      </div>
    </section>
  );
}
