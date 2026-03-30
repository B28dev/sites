import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import PaleBlueDot from './PaleBlueDot';

const smallQuotes = [
  {
    text: 'A astronomia é uma experiência humilhante e construtora de caráter.',
    author: 'Carl Sagan',
    hoverBorder: 'hover:border-accent/40',
  },
  {
    text: 'O universo não é obrigado a fazer sentido para você.',
    author: 'Neil deGrasse Tyson',
    hoverBorder: 'hover:border-gold/40',
  },
  {
    text: 'Somos feitos de poeira de estrelas.',
    author: 'Lawrence Krauss',
    hoverBorder: 'hover:border-accent/40',
  },
  {
    text: 'O homem é uma cana, a mais frágil da natureza — mas é uma cana que pensa.',
    author: 'Blaise Pascal',
    hoverBorder: 'hover:border-gold/40',
  },
];

export default function CardsSection() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.quote-card',
      { opacity: 0, y: 40, scale: 0.98 },
      {
        opacity: 1, y: 0, scale: 1, duration: 1.5, stagger: 0.3, ease: 'power3.out',
        scrollTrigger: { trigger: '.quote-cards-container', start: 'top 65%' }
      }
    );
    gsap.fromTo('.small-quote',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power2.out',
        scrollTrigger: { trigger: '.small-quotes-container', start: 'top 75%' }
      }
    );
  }, { scope: container });

  return (
    <section ref={container} id="cards" className="w-full py-40 px-6 lg:px-12 relative z-10 bg-deep/50 border-t border-borderLine">
      <div className="max-w-7xl mx-auto flex flex-col gap-24 quote-cards-container mb-40">

        {/* Card 1 */}
        <div className="quote-card card-hover w-full max-w-4xl mx-auto md:mr-auto md:ml-0 p-8 md:p-12 lg:p-16 rounded-[12px] bg-surface/40 backdrop-blur-md border border-borderLine shadow-2xl relative overflow-hidden group hover:border-accent/30 transition-colors duration-300">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-colors duration-1000 pointer-events-none" />
          {/* Aspas decorativas */}
          <span className="absolute top-4 left-6 font-heading text-[120px] leading-none text-accent/10 select-none pointer-events-none" aria-hidden="true">"</span>
          <p className="font-heading text-2xl md:text-3xl lg:text-4xl text-white/90 leading-snug md:leading-relaxed relative z-10 italic">
            "Você não é o centro do universo. E essa é a notícia mais libertadora que a ciência já entregou."
          </p>
        </div>

        {/* Card 2 */}
        <div className="quote-card card-hover w-full max-w-4xl mx-auto md:ml-auto md:mr-0 p-8 md:p-12 lg:p-16 rounded-[12px] bg-surface/40 backdrop-blur-md border border-borderLine shadow-2xl relative overflow-hidden group hover:border-gold/30 transition-colors duration-300">
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 group-hover:bg-gold/10 transition-colors duration-1000 pointer-events-none" />
          <span className="absolute top-4 left-6 font-heading text-[120px] leading-none text-gold/10 select-none pointer-events-none" aria-hidden="true">"</span>
          <p className="font-heading text-2xl md:text-3xl lg:text-4xl text-white/90 leading-snug md:leading-relaxed relative z-10 italic">
            "Seis bilhões de quilômetros de distância, a Terra some num pixel. Todas as guerras, todos os amores, todos os medos — num pixel.{' '}
            <span className="text-gold">Respire.</span>"
          </p>
        </div>

        {/* Card 3 */}
        <div className="quote-card card-hover w-full max-w-4xl mx-auto md:mr-auto md:ml-0 p-8 md:p-12 lg:p-16 rounded-[12px] bg-surface/40 backdrop-blur-md border border-borderLine shadow-2xl relative overflow-hidden group text-center md:text-left hover:border-accent/30 transition-colors duration-300">
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 group-hover:bg-accent/10 transition-colors duration-1000 pointer-events-none" />
          <span className="absolute top-4 left-6 font-heading text-[120px] leading-none text-accent/10 select-none pointer-events-none" aria-hidden="true">"</span>
          <p className="font-heading text-2xl md:text-3xl lg:text-4xl text-white/90 leading-snug md:leading-relaxed relative z-10 italic">
            "A humildade não é fraqueza. É o que acontece quando você realmente{' '}
            <span className="text-accent text-glow">olha para o céu.</span>{' '}
            Nenhuma fronteira desenhada pelo homem aparece do espaço. Só existe o azul. Só existe o ponto."
          </p>
        </div>
      </div>

      {/* Grid de citações dos pioneiros */}
      <div className="max-w-7xl mx-auto small-quotes-container">
        <div className="text-center mb-16">
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-gold/30 mx-auto mb-10" />
          <p className="font-mono text-xs tracking-widest uppercase" style={{ color: '#8B92B0' }}>A Perspectiva dos Pioneiros</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {smallQuotes.map(({ text, author, hoverBorder }, i) => (
            <div key={i} className={`small-quote card-hover p-8 bg-background/40 border border-borderLine rounded-lg ${hoverBorder} hover:border-opacity-100 transition-all duration-300 relative overflow-hidden`}>
              <span className="absolute top-2 left-4 font-heading text-6xl leading-none text-accent/10 select-none pointer-events-none" aria-hidden="true">"</span>
              <p className="font-heading text-xl text-white/85 mb-6 italic leading-relaxed relative z-10">
                "{text}"
              </p>
              <p className="font-mono text-xs tracking-widest" style={{ color: '#C8A96E' }}>— {author}</p>
            </div>
          ))}
        </div>

        {/* Citação central destacada de Sagan com Pale Blue Dot */}
        <div className="flex justify-center mt-12">
          <div className="small-quote p-10 bg-background/40 border border-borderLine rounded-xl w-full max-w-2xl text-center hover:border-accent/40 transition-all duration-300 relative overflow-hidden">
            <span className="absolute top-3 left-6 font-heading text-[80px] leading-none text-accent/10 select-none pointer-events-none" aria-hidden="true">"</span>
            <div className="flex items-center justify-center gap-4 mb-6">
              <PaleBlueDot />
            </div>
            <p className="font-heading text-3xl md:text-4xl text-white/95 mb-6 italic leading-relaxed relative z-10">
              "Nós somos uma maneira do cosmos se conhecer."
            </p>
            <p className="font-mono text-xs tracking-widest" style={{ color: '#C8A96E' }}>— Carl Sagan, Cosmos (1980)</p>
          </div>
        </div>

        <div className="text-center mt-16">
          <Link
            to="/jornada"
            className="inline-flex items-center gap-3 font-mono text-[11px] tracking-widest uppercase px-8 py-4 rounded-full border border-accent/30 text-accent hover:bg-accent/10 transition-all duration-300"
          >
            Explorar a Jornada Completa
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
