import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { LayoutGrid, AlignCenter } from 'lucide-react';

const blocks = [
  "A seis bilhões de quilômetros de distância, não há continentes, cidades ou glórias. Somos apenas um pixel solitário capturado num frágil feixe de luz solar.",
  "Desse ponto de vista incontestável, o espaço não reconhece mapas. Nenhuma fronteira nacional, nenhum muro erguido pelo orgulho resiste à imensidão do escuro.",
  "Tudo o que chamamos de natureza é uma fina película biológica agarrada a uma rocha minúscula, vagando em silêncio pela noite gélida e eterna.",
  "Pense na totalidade do triunfo, no ápice do desespero humano. Cada santo e pecador, cada mãe e herói que já pisou no mundo espremeu sua narrativa inteira nesse grão de poeira iluminado.",
  "Rios de sangue foram derramados por generais de rostos esquecidos... para quê? Apenas para que pudessem clamar o domínio passageiro sobre uma fração microscópica dessa poeira imperceptível.",
  "Em nossa profunda obscuridade, dentro dessa vastidão esmagadora, não fiquem esperando resgate celestial. Somos nós os únicos responsáveis por proteger e cultivar as cinzas desse santuário.",
  "A astronomia é uma senhora impiedosa. Nenhum espelho estilhaça tanto a embófia humana quanto olhar para as profundezas e perceber a escala monumental da nossa insignificância.",
  "Para onde quer que você queira escapar, a realidade o puxa pelos calcanhares. Até onde fomos capazes de sondar, além desse pálido cintilar, não existe nenhum outro refúgio absoluto."
];

export default function DiscourseSection() {
  const [view, setView] = useState('meditative');
  const container = useRef(null);

  useGSAP(() => {
    if (view === 'meditative') {
      const items = gsap.utils.toArray('.discourse-block');
      items.forEach(item => {
        gsap.fromTo(item, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 2, 
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 65%',
              end: 'bottom 35%',
              toggleActions: "play reverse play reverse", 
            }
          }
        );
      });
    } else {
      gsap.fromTo('.discourse-mosaic-item', 
        { opacity: 0, scale: 0.98, y: 20 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          duration: 1.2, 
          stagger: 0.15, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container.current,
            start: 'top 75%',
          }
        }
      );
    }
  }, { scope: container, dependencies: [view] });

  return (
    <section ref={container} id="discourse" className="w-full relative z-10 py-12 px-6 lg:px-12 bg-deep/40 border-t border-borderLine/30">
      
      {/* View Toggle */}
      <div className="flex justify-center md:justify-end max-w-7xl mx-auto mb-16 md:mb-0 md:sticky top-32 z-50 pointer-events-none">
        <div className="flex bg-surface/80 backdrop-blur-md rounded-full p-1 border border-borderLine/50 pointer-events-auto shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300">
          <button 
            onClick={() => setView('meditative')}
            className={`p-2.5 rounded-full transition-colors duration-300 ${view === 'meditative' ? 'bg-white/10 text-white drop-shadow-md' : 'text-text-muted hover:text-white'}`}
            title="Sopro Meditativo"
          >
            <AlignCenter size={18} strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => setView('mosaic')}
            className={`p-2.5 rounded-full transition-colors duration-300 ${view === 'mosaic' ? 'bg-white/10 text-white drop-shadow-md' : 'text-text-muted hover:text-white'}`}
            title="Mosaico Distribuído"
          >
            <LayoutGrid size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {view === 'meditative' ? (
          <div className="flex flex-col items-center">
            {blocks.map((text, idx) => (
              <div key={idx} className="discourse-block w-full min-h-[100svh] flex items-center justify-center text-center px-4 md:px-12 max-w-4xl opacity-0">
                <p className="font-heading text-3xl md:text-5xl lg:text-5xl/relaxed text-textMain/90 font-light text-glow">
                  {text}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 py-24 md:py-32">
            {blocks.map((text, idx) => (
              <div key={idx} className="discourse-mosaic-item opacity-0 p-8 md:p-12 rounded-[12px] bg-surface/30 backdrop-blur-sm border border-borderLine/40 hover:bg-surface/50 transition-all duration-500 shadow-xl">
                <p className="font-heading text-2xl md:text-3xl lg:text-[34px] text-textMain/90 leading-relaxed font-light">
                  {text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-center pb-24 font-mono text-[11px] sm:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase" style={{ color: '#8B92B0' }}>
        Inspirado no discurso Pale Blue Dot, Carl Sagan (1994)
      </div>
    </section>
  );
}
