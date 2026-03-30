import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Info, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PaleBlueDot from './PaleBlueDot';

gsap.registerPlugin(ScrollTrigger);

function spawnParticles(e) {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const cx = e.clientX - rect.left;
  const cy = e.clientY - rect.top;

  const angles = [45, 135, 225, 315];
  const dist = 28;

  angles.forEach((angleDeg) => {
    const rad = (angleDeg * Math.PI) / 180;
    const dx = Math.cos(rad) * dist;
    const dy = Math.sin(rad) * dist;

    const span = document.createElement('span');
    span.className = 'star-particle';
    span.style.left = cx + 'px';
    span.style.top = cy + 'px';
    span.style.setProperty('--dx', dx + 'px');
    span.style.setProperty('--dy', dy + 'px');
    btn.appendChild(span);

    setTimeout(() => span.remove(), 650);
  });
}

export default function CTASection() {
  const container = useRef();

  useGSAP(() => {
    gsap.fromTo('.cta-fade',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1.4, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: container.current, start: 'top 75%' }
      }
    );
  }, { scope: container });

  return (
    <section
      ref={container}
      className="w-full py-40 px-6 flex flex-col items-center text-center relative z-10 border-t border-borderLine/30"
      style={{
        background: 'linear-gradient(to bottom, #03030A 0%, rgba(74,158,255,0.04) 100%)',
      }}
    >
      {/* Pale Blue Dot */}
      <div className="cta-fade mb-12">
        <PaleBlueDot />
      </div>

      {/* Heading */}
      <h2 className="cta-fade font-heading text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-8 max-w-3xl">
        Você chegou ao fim desta página.<br/>
        <span className="italic text-text-muted">Mas a jornada está apenas começando.</span>
      </h2>

      {/* Paragraph */}
      <p className="cta-fade font-body text-lg md:text-xl font-light max-w-2xl leading-relaxed mb-16" style={{ color: '#8B92B0' }}>
        Tudo que você leu aconteceu aqui — neste ponto azul pálido suspenso no vazio.
        Agora que você sabe o tamanho do universo e o tamanho de nós dentro dele,
        há apenas uma pergunta que importa: o que você vai fazer com o tempo que tem aqui?
      </p>

      {/* CTAs */}
      <div className="cta-fade flex flex-col sm:flex-row justify-center items-center gap-4 w-full mx-auto">
        <Link
          to="/jornada"
          onClick={spawnParticles}
          className="btn-primary w-full sm:w-auto text-center px-8 py-4 rounded-full font-mono text-[12px] tracking-widest uppercase font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(74,158,255,0.4)] hover:scale-[1.04]"
          style={{ background: '#4A9EFF', color: '#03030A' }}
        >
          Começar a Jornada →
        </Link>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full sm:w-auto text-center px-8 py-4 rounded-full font-mono text-[12px] tracking-widest uppercase border transition-all duration-300 hover:bg-accent/5"
          style={{ borderColor: 'rgba(74,158,255,0.3)', color: '#4A9EFF' }}
        >
          Voltar ao início ↑
        </button>
      </div>

      {/* Sobre link */}
      <div className="cta-fade flex justify-center w-full" style={{ marginTop: 24 }}>
        <Link to="/sobre" className="sobre-link" style={{ marginTop: 0 }}>
          <Info size={13} strokeWidth={1.5} />
          <span>Sobre este projeto</span>
          <ArrowRight size={13} strokeWidth={1.5} className="sobre-link-arrow" />
        </Link>
      </div>
    </section>
  );
}
