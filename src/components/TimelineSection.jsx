import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    time: "13,8 bi anos",
    title: "Big Bang",
    desc: "O início de tudo",
    trivia: "temperatura: 10³² °C",
    align: "left",
  },
  {
    time: "13,6 bi anos",
    title: "Primeiras estrelas",
    desc: "A escuridão termina",
    trivia: "200M anos de escuridão antes",
    align: "right",
  },
  {
    time: "4,6 bi anos",
    title: "Formação da Terra",
    desc: "Nosso ponto surge",
    trivia: "feita de poeira de supernovas",
    align: "left",
  },
  {
    time: "3,8 bi anos",
    title: "Sinais de vida",
    desc: "A centelha biológica em oceanos primevos",
    trivia: "apenas química, por enquanto",
    align: "right",
  },
  {
    time: "300k anos",
    title: "Homo sapiens",
    desc: "Aparecemos no palco",
    trivia: "há menos de 0,002% da história",
    align: "left",
  },
  {
    time: "5k anos",
    title: "História registrada",
    desc: "Tudo o que aprendemos na escola",
    trivia: "um piscar de olhos cósmico",
    align: "right",
  },
  {
    time: "agora",
    title: "Você. Aqui. Agora.",
    desc: "Este momento",
    trivia: "agora",
    align: "center",
    isCurrent: true,
  },
];

export default function TimelineSection() {
  const container = useRef(null);

  useGSAP(() => {
    // Linha cresce com scrub
    gsap.fromTo('.timeline-line',
      { height: '0%' },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 70%',
          end: 'bottom 80%',
          scrub: 1,
        }
      }
    );

    // Cada evento desliza da esquerda ou direita com stagger
    gsap.utils.toArray('.timeline-event').forEach((el, i) => {
      const align = events[i].align;
      const isMobile = window.innerWidth < 768;
      const xOffset = isMobile ? 0 : (align === 'left' ? -40 : align === 'right' ? 40 : 0);
      const yOffset = (isMobile || align === 'center') ? 20 : 0;

      gsap.fromTo(el,
        { opacity: 0, x: xOffset, y: yOffset },
        {
          opacity: 1, x: 0, y: 0,
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
          },
          delay: i * 0.05,
        }
      );
    });
  }, { scope: container });

  return (
    <section ref={container} id="timeline" className="w-full py-40 px-6 relative z-10 flex flex-col items-center">
      <div className="text-center mb-32 max-w-2xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-textMain mb-6 drop-shadow-sm">
          13,8 bilhões de anos.<br/>
          <span className="italic text-text-muted">Você está aqui.</span>
        </h2>
        <p className="font-body text-text-muted leading-relaxed font-light">
          A escala de tempo do cosmos é tão imensa que desafia nossa compreensão intuitiva. Para o universo, toda a história humana é menos que um piscar de olhos.
        </p>
      </div>

      <div className="timeline-container relative w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Linha vertical — gradiente ciano topo → dourado final */}
        <div className="absolute top-0 bottom-0 left-6 md:left-1/2 md:-translate-x-1/2 w-[1px] bg-borderLine/20">
          <div
            className="timeline-line w-full"
            style={{
              background: 'linear-gradient(to bottom, #4fc3f7 0%, #C8A96E 100%)',
              boxShadow: '0 0 8px rgba(79,195,247,0.3)',
            }}
          />
        </div>

        {events.map((ev, idx) => {
          if (ev.align === 'center') {
            return (
              <div key={idx} className="timeline-event relative w-full flex flex-col items-start pl-14 md:pl-0 md:items-center mt-16 md:mt-32 text-left md:text-center pb-20">
                {/* Mobile: absolute dot aligned to timeline line */}
                <div
                  className="md:hidden absolute left-6 top-2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-accent z-10 animate-pulse"
                  style={{
                    background: '#4fc3f7',
                    boxShadow: '0 0 16px rgba(79,195,247,0.8), 0 0 30px rgba(79,195,247,0.4)',
                  }}
                />
                {/* Desktop: dual dots centered */}
                <div className="hidden md:flex items-center gap-3 mb-6">
                  <div
                    className="w-3 h-3 rounded-full border-2 border-accent z-10 animate-pulse"
                    style={{
                      background: '#4fc3f7',
                      boxShadow: '0 0 16px rgba(79,195,247,0.8), 0 0 30px rgba(79,195,247,0.4)',
                    }}
                  />
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{
                      background: '#4fc3f7',
                      boxShadow: '0 0 8px rgba(79,195,247,0.9)',
                      animationDelay: '0.5s',
                    }}
                  />
                </div>
                <div className="font-mono md:text-xl md:text-2xl text-accent mb-2 tracking-widest bg-background/80 px-3 py-1 rounded backdrop-blur-sm" style={{ fontSize: 'clamp(14px, 4vw, 20px)' }}>
                  {ev.time}
                </div>
                <h3 className="font-heading text-3xl md:text-4xl text-white mb-2">{ev.title}</h3>
                <p className="font-body italic text-text-muted text-sm tracking-widest">{ev.desc}</p>
                <p className="font-mono text-[10px] text-text-muted/50 mt-2">{ev.trivia}</p>
              </div>
            );
          }

          const isLeft = ev.align === 'left';
          return (
            <div key={idx} className={`timeline-event relative w-full flex justify-start pl-14 md:pl-0 mb-16 md:mb-32 ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>

              {/* Ponto na linha — 12px com glow pulsante */}
              <div
                className="absolute left-6 md:left-1/2 top-2 -translate-x-1/2 w-3 h-3 rounded-full z-10"
                style={{ background: 'rgba(79,195,247,0.6)', border: '1.5px solid rgba(79,195,247,0.8)', boxShadow: '0 0 10px rgba(79,195,247,0.5)', animation: 'pulse 2.5s ease-in-out infinite' }}
              />

              {/* Conteúdo */}
              <div className={`w-full text-left md:w-5/12 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16'} relative pt-1`}>
                <div
                  className="font-mono text-gold tracking-widest drop-shadow-sm mb-2"
                  style={{ fontSize: 13 }}
                >
                  {ev.time}
                </div>
                <h3 className="font-heading text-2xl md:text-3xl text-white mb-1 leading-snug">
                  {ev.title}
                </h3>
                <p className="font-body italic text-text-muted text-sm font-light mb-1">{ev.desc}</p>
                <p
                  className="font-mono text-text-muted/50 mt-1"
                  style={{ fontSize: 10 }}
                >
                  {ev.trivia}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
