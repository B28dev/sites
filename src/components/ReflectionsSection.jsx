import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Swords, Crown, Heart } from 'lucide-react';

const cards = [
  {
    icon: Swords,
    iconColor: 'text-accent',
    iconBg: 'rgba(74,158,255,0.08)',
    title: 'Todas as guerras,\nem um pixel',
    text: 'Seis bilhões de quilômetros daqui, a Terra some. Não existe rastro de nenhuma bandeira, nenhuma trincheira, nenhum muro. Toda a violência da história humana — cada batalha, cada império, cada ódio cuidadosamente cultivado — aconteceu ali. Num ponto que você não consegue ver sem ampliação.',
  },
  {
    icon: Crown,
    iconColor: 'text-gold',
    iconBg: 'rgba(200,169,110,0.08)',
    title: 'Imperadores\ndo nada',
    text: 'Alexandre. Gengis. Napoleão. Cada um acreditou, com toda a certeza do mundo, que dominava algo que importava. Do espaço, conquistaram uma fração de um pixel. Por um instante. E então desapareceram — como todos nós desapareceremos. A questão é o que fazemos com esse instante.',
  },
  {
    icon: Heart,
    iconColor: 'text-white/70',
    iconBg: 'rgba(255,255,255,0.05)',
    title: 'O único lar\nque temos',
    text: 'Não existe plano B. Não há nenhuma sonda a caminho de um segundo lar. Nenhuma civilização aguardando para nos receber. Este ponto azul é tudo que temos, tudo que somos, tudo que podemos perder. Isso não é motivo de desespero — é o maior argumento para o cuidado que já foi dado à humanidade.',
  },
];

export default function ReflectionsSection() {
  const container = useRef();

  useGSAP(() => {
    gsap.fromTo('.reflection-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 70%',
        }
      }
    );
  }, { scope: container });

  return (
    <section ref={container} id="reflections" className="w-full py-32 px-6 lg:px-12 z-10 bg-surface/30 backdrop-blur-sm border-t border-b border-borderLine/50 relative">

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="font-heading text-4xl md:text-5xl text-glow mb-6">O Que Carl Sagan Viu</h2>
          <p className="font-mono text-xs tracking-widest uppercase text-text-muted">
            Três pilares de uma perspectiva cósmica
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {cards.map(({ icon: Icon, iconColor, iconBg, title, text }, i) => (
            <div
              key={i}
              className="reflection-card flex flex-col items-start text-left p-8 transition-transform duration-500 hover:-translate-y-2"
              style={{
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 16,
                border: '1px solid rgba(74,158,255,0.08)',
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: iconBg }}
              >
                <Icon className={`w-4 h-4 ${iconColor}`} strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-2xl text-white mb-5 whitespace-pre-line leading-snug">
                {title}
              </h3>
              <p
                className="font-body font-light text-text-muted text-[15px]"
                style={{ lineHeight: 1.9 }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
