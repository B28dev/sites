import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Feather, BookOpen, Heart,
  Search, Filter, Pencil, Eye,
  Shield, ExternalLink,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Starfield from '../components/Starfield';
import PaleBlueDot from '../components/PaleBlueDot';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const philosophyCards = [
  {
    icon: Feather,
    title: 'Simples por respeito',
    text: 'Conceitos complexos merecem explicações simples. Não porque o leitor não seja capaz — mas porque clareza é uma forma de respeito. Usamos o Método Feynman: se não dá pra explicar para uma criança de 12 anos, não entendemos bem o suficiente.',
  },
  {
    icon: BookOpen,
    title: 'Real por princípio',
    text: 'Nenhum número é inventado. Nenhuma citação é fabricada. Cada dado tem fonte verificável. Quando não temos certeza, dizemos que não temos certeza. A honestidade intelectual é o único compromisso que não negociamos.',
  },
  {
    icon: Heart,
    title: 'Humano por escolha',
    text: 'Astronomia pode ser fria — números imensos, distâncias incompreensíveis, destinos sombrios. Escolhemos sempre perguntar: o que isso significa para nós? Como isso muda o que fazemos com o tempo que temos aqui?',
  },
];

const methodologySteps = [
  {
    icon: Search,
    step: '01',
    title: 'Pesquisa em fontes primárias',
    text: 'NASA, ESA, artigos revisados por pares, livros de divulgação científica. Nunca fontes secundárias sem verificação.',
  },
  {
    icon: Filter,
    step: '02',
    title: 'Filtragem e seleção',
    text: 'Do que foi pesquisado, selecionamos apenas o que é verificável, relevante e capaz de provocar reflexão.',
  },
  {
    icon: Pencil,
    step: '03',
    title: 'Reescrita com voz própria',
    text: 'Todo conteúdo é reescrito com linguagem original. Nenhum trecho é copiado. Ideias de outros autores são sempre atribuídas explicitamente.',
  },
  {
    icon: Eye,
    step: '04',
    title: 'Revisão de tom',
    text: 'Antes de publicar, cada texto passa por uma pergunta: isso faz alguém sentir algo ou apenas informa? Se só informa, reescrevemos.',
  },
];

const sources = [
  { name: 'NASA', desc: 'Dados sobre o sistema solar, missões espaciais e astronomia geral', url: 'https://nasa.gov' },
  { name: 'NASA/JPL', desc: 'Missões Voyager, imagens planetárias e dados de exploração espacial', url: 'https://jpl.nasa.gov' },
  { name: 'Voyager em tempo real', desc: 'Posição atual da Voyager 1 e dados da missão em tempo real', url: 'https://voyager.jpl.nasa.gov' },
  { name: 'ESA', desc: 'Missões europeias, dados do telescópio Planck e observações do universo', url: 'https://esa.int' },
  { name: 'James Webb', desc: 'Imagens e descobertas do JWST, galáxias primordiais e exoplanetas', url: 'https://webbtelescope.org' },
  { name: 'NASA Astrobiology', desc: 'Origem da vida, astrobiologia e busca por vida extraterrestre', url: 'https://astrobiology.nasa.gov' },
  { name: 'Overview Institute', desc: 'Pesquisa sobre o Overview Effect e relatos de astronautas', url: 'https://overviewinstitute.org' },
  { name: 'Planetary Society', desc: 'Discurso original Pale Blue Dot e arquivo de Carl Sagan', url: 'https://planetary.org' },
  { name: 'The Pale Blue Dot — Wikipedia PT', desc: 'História da foto e contexto histórico', url: 'https://pt.wikipedia.org/wiki/P%C3%A1lido_Ponto_Azul' },
];

const bibliography = [
  { title: 'Carl Sagan — Cosmos (1980)', url: 'https://www.amazon.com.br/Cosmos-Carl-Sagan/dp/8535929886' },
  { title: 'Carl Sagan — Pale Blue Dot (1994)', url: 'https://www.amazon.com.br/Pale-Blue-Dot-Vision-Future/dp/0345376595' },
  { title: 'Carl Sagan — The Demon-Haunted World (1995)', url: 'https://www.amazon.com.br/Demon-Haunted-World-Science-Candle-Dark/dp/0345409469' },
  { title: 'Frank White — The Overview Effect (1987)', url: null },
  { title: 'Ron Garan — The Orbital Perspective (2015)', url: null },
];

export default function SobrePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Hero entrance
  useEffect(() => {
    gsap.fromTo('.sobre-badge', { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: 'power2.out' });
    gsap.fromTo('.sobre-hero-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: 'power2.out' });
    gsap.fromTo('.sobre-hero-sub', { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 1.0, ease: 'power2.out' });
  }, []);

  // Scroll-triggered animations
  useEffect(() => {
    // Section titles
    gsap.utils.toArray('.sobre-section-title').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
    });

    // Philosophy cards
    gsap.fromTo('.sobre-philosophy-card',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: '.sobre-philosophy-grid', start: 'top 80%', toggleActions: 'play none none none' },
      }
    );

    // Stats
    gsap.fromTo('.sobre-stat',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.sobre-stats-grid', start: 'top 80%', toggleActions: 'play none none none' },
      }
    );

    // Methodology steps
    gsap.fromTo('.sobre-step',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: '.sobre-steps-container', start: 'top 75%', toggleActions: 'play none none none' },
      }
    );

    // Copyright block
    gsap.fromTo('.sobre-copyright-block',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.sobre-copyright-block', start: 'top 80%', toggleActions: 'play none none none' },
      }
    );

    // Sources grid
    gsap.fromTo('.sobre-source-card',
      { opacity: 0, y: 15 },
      {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out',
        scrollTrigger: { trigger: '.sobre-sources-grid', start: 'top 75%', toggleActions: 'play none none none' },
      }
    );

    // Final quote
    gsap.fromTo('.sobre-final-quote',
      { opacity: 0 },
      {
        opacity: 1, duration: 1.2, ease: 'power2.out',
        scrollTrigger: { trigger: '.sobre-final-quote', start: 'top 80%', toggleActions: 'play none none none' },
      }
    );

    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-background text-textMain selection:bg-accent/30 selection:text-white relative overflow-x-hidden">
      <Starfield />
      <Navbar />

      {/* ── SEÇÃO 1 — HERO ──────────────────────────────────────────── */}
      <section className="w-full min-h-[65vh] flex flex-col items-center justify-center pt-36 pb-28 px-6 relative z-10 text-center">
        <div className="sobre-badge opacity-0 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent font-mono text-[11px] uppercase tracking-widest mb-10">
          <span>✦</span>
          <span>sobre o projeto</span>
        </div>
        <h1
          className="sobre-hero-title opacity-0 font-heading text-white font-light leading-tight mb-8 max-w-3xl"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
        >
          Por que esse site existe.
        </h1>
        <p
          className="sobre-hero-sub opacity-0 font-body text-text-muted max-w-lg leading-relaxed"
          style={{ fontSize: 'clamp(15px, 3vw, 18px)' }}
        >
          Uma história sobre um pixel azul,<br />
          um astrônomo teimoso e um entusiasta<br />
          que não conseguia parar de pensar nisso tudo.
        </p>
      </section>

      {/* ── SEÇÃO 2 — ORIGEM ────────────────────────────────────────── */}
      <section className="w-full py-24 px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="sobre-section-title opacity-0 font-heading text-4xl md:text-5xl text-white font-light mb-16">
            De onde isso veio
          </h2>
          <div
            className="flex flex-col gap-8 font-body font-light text-textMain/80"
            style={{ fontSize: 'clamp(15px, 3.5vw, 18px)', lineHeight: 2 }}
          >
            <p>
              Em algum momento você assiste ao discurso do Carl Sagan sobre o Pale Blue Dot e
              algo muda. Não sei explicar exatamente o quê. Talvez seja a combinação de se sentir
              imensamente pequeno e, ao mesmo tempo, perceber que esse fato não diminui nada —
              pelo contrário, torna cada coisa mais preciosa.
            </p>
            <p>
              Esse site nasceu da necessidade de organizar essas ideias. De criar um lugar onde
              qualquer pessoa pudesse chegar e, em alguns minutos ou algumas horas dependendo da
              disposição, sentir o peso e a beleza de existir nesse ponto azul.
            </p>
            <p>
              Não sou astrônomo. Não sou cientista. Sou apenas alguém que um dia olhou para
              o céu com atenção e não conseguiu parar.
            </p>
          </div>

          {/* Stats */}
          <div className="sobre-stats-grid grid grid-cols-1 sm:grid-cols-3 gap-4 mt-20">
            {[
              { value: '8 tópicos', label: 'sobre o universo e nós' },
              { value: '0 fins lucrativos', label: 'projeto independente' },
              { value: '1 pixel azul', label: 'nossa casa' },
            ].map(({ value, label }, i) => (
              <div
                key={i}
                className="sobre-stat opacity-0 p-6 rounded-xl bg-surface/30 border border-borderLine/40 text-center"
              >
                <div className="font-heading text-2xl md:text-3xl text-accent mb-2">{value}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEÇÃO 3 — FILOSOFIA ─────────────────────────────────────── */}
      <section className="w-full py-24 px-6 bg-surface/20 border-t border-b border-borderLine/30 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="sobre-section-title opacity-0 font-heading text-4xl md:text-5xl text-white font-light mb-16 text-center">
            Como pensamos o conteúdo
          </h2>
          <div className="sobre-philosophy-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophyCards.map(({ icon: Icon, title, text }, i) => (
              <div
                key={i}
                className="sobre-philosophy-card opacity-0 p-8 rounded-xl bg-background/40 border border-borderLine/50 hover:border-accent/30 transition-colors duration-300 flex flex-col"
              >
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-6 shrink-0">
                  <Icon size={18} className="text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-xl text-white mb-4">{title}</h3>
                <p className="font-body text-text-muted font-light leading-[1.9]" style={{ fontSize: 15 }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEÇÃO 4 — METODOLOGIA ───────────────────────────────────── */}
      <section className="w-full py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="sobre-section-title opacity-0 font-heading text-4xl md:text-5xl text-white font-light mb-20 text-center">
            Como o conteúdo é criado
          </h2>

          <div className="sobre-steps-container relative flex flex-col md:flex-row gap-12 md:gap-6">
            {/* Horizontal connector on desktop */}
            <div className="hidden md:block absolute top-8 left-8 right-8 h-px bg-borderLine/30" />

            {methodologySteps.map(({ icon: Icon, step, title, text }, i) => (
              <div
                key={i}
                className="sobre-step opacity-0 flex-1 flex flex-col md:items-center gap-4 relative"
              >
                {/* Step icon circle */}
                <div className="w-16 h-16 rounded-full bg-surface border border-borderLine/60 flex items-center justify-center z-10 shrink-0">
                  <Icon size={20} className="text-accent" strokeWidth={1.5} />
                </div>
                <div className="font-mono text-[10px] text-accent/50 tracking-widest md:text-center">
                  {step}
                </div>
                <h3 className="font-heading text-lg text-white leading-snug md:text-center">
                  {title}
                </h3>
                <p className="font-body text-text-muted font-light leading-[1.8] md:text-center" style={{ fontSize: 14 }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEÇÃO 5 — DIREITOS AUTORAIS ─────────────────────────────── */}
      <section className="w-full py-24 px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div
            className="sobre-copyright-block opacity-0 p-10 md:p-12 rounded-2xl border"
            style={{
              background: 'rgba(74,158,255,0.03)',
              borderColor: 'rgba(74,158,255,0.08)',
            }}
          >
            <div className="flex justify-center mb-8">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Shield size={22} className="text-accent" strokeWidth={1.5} />
              </div>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl text-white font-light mb-8 text-center">
              Sobre direitos autorais
            </h2>
            <div
              className="flex flex-col gap-5 font-body text-textMain/75 font-light"
              style={{ fontSize: 15, lineHeight: 1.9 }}
            >
              <p>Todo o conteúdo escrito neste site é original e de autoria própria.</p>
              <p>
                As ideias de Carl Sagan são referenciadas com atribuição explícita e tratadas com
                o respeito que merecem. Nenhum trecho dos livros ou discursos de Sagan foi
                reproduzido — apenas suas ideias foram parafraseadas e atribuídas.
              </p>
              <p>
                As imagens da NASA utilizadas são de domínio público conforme política da agência.
                Crédito: NASA/JPL-Caltech onde aplicável.
              </p>
              <p>
                Citações de outros autores (Neil deGrasse Tyson, Lawrence Krauss, Blaise Pascal,
                etc.) são atribuídas com nome, obra e ano.
              </p>
              <p>
                Este é um projeto educacional sem fins lucrativos. Não há publicidade, não há
                monetização, não há uso comercial.
              </p>
              <p
                className="font-mono tracking-wide pt-4 border-t border-borderLine/30 text-textMain/50"
                style={{ fontSize: 12 }}
              >
                © 2026 The Blue Dot — Todos os direitos reservados ao conteúdo original.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEÇÃO 6 — FONTES ────────────────────────────────────────── */}
      <section className="w-full py-24 px-6 bg-surface/20 border-t border-borderLine/30 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="sobre-section-title opacity-0 font-heading text-4xl md:text-5xl text-white font-light mb-4">
              Fontes que usamos
            </h2>
            <p className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
              Todo dado deste site pode ser verificado nestas fontes primárias.
            </p>
          </div>

          <div className="sobre-sources-grid grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {sources.map(({ name, desc, url }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="sobre-source-card opacity-0 group flex items-start gap-4 p-5 rounded-xl bg-background/40 border border-borderLine/40 hover:border-accent/40 transition-colors duration-300"
              >
                <ExternalLink
                  size={14}
                  className="text-accent/40 group-hover:text-accent transition-colors mt-0.5 shrink-0"
                />
                <div>
                  <div className="font-body text-[14px] text-white/85 group-hover:text-white transition-colors mb-1">
                    {name}
                  </div>
                  <div className="font-body text-[12px] text-text-muted font-light">{desc}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Bibliography */}
          <div className="border-t border-borderLine/30 pt-12">
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-8">
              Referências Bibliográficas
            </p>
            <div className="flex flex-col gap-3">
              {bibliography.map(({ title, url }, i) =>
                url ? (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 font-body text-[13px] text-textMain/60 hover:text-accent transition-colors duration-200 w-fit"
                  >
                    <ExternalLink size={11} className="opacity-50 group-hover:opacity-100 shrink-0" />
                    {title}
                  </a>
                ) : (
                  <span key={i} className="font-body text-[13px] text-textMain/35">
                    {title}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── SEÇÃO 7 — FRASE FINAL ───────────────────────────────────── */}
      <section className="w-full py-40 px-6 flex flex-col items-center justify-center text-center relative z-10">
        <div className="mb-12">
          <PaleBlueDot />
        </div>

        <blockquote
          className="sobre-final-quote opacity-0 font-heading italic text-white/90 max-w-2xl leading-snug mb-6"
          style={{ fontSize: 'clamp(1.6rem, 5vw, 3rem)' }}
        >
          "Você não precisa ser cientista para olhar para cima com honestidade."
        </blockquote>

        <p className="font-mono text-[11px] uppercase tracking-widest text-text-muted mb-16">
          — The Blue Dot, 2026
        </p>

        <Link
          to="/"
          className="font-mono text-[11px] uppercase tracking-widest text-accent hover:text-accent/60 transition-colors duration-200 flex items-center gap-2"
        >
          ← Voltar ao início
        </Link>
      </section>

      <Footer />
    </div>
  );
}
