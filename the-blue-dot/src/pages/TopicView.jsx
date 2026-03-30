import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { topics } from '../data/topics';
import { useProgress } from '../hooks/useProgress';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Starfield from '../components/Starfield';
import PaleBlueFloat from '../components/PaleBlueFloat';
import ModeToggle from '../components/TopicReader/ModeToggle';
import StatsGrid from '../components/TopicReader/StatsGrid';
import TopicTimeline from '../components/TopicReader/TopicTimeline';
import ReflectionBlock from '../components/TopicReader/ReflectionBlock';
import SourcesList from '../components/TopicReader/SourcesList';
import ProgressBar from '../components/TopicReader/ProgressBar';
import { ArrowLeft, Check, Eye } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TopicView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const topic = topics.find(t => t.id === id);
  const [mode, setMode] = useState('orbit');
  const { markAsRead, isCompleted } = useProgress();

  // Immersive mode state
  const [immersiveMode, setImmersiveMode] = useState(false);
  const [focusToggle, setFocusToggle] = useState(false);
  const immersiveTimerRef = useRef(null);

  // Reset on topic / mode change
  useEffect(() => {
    setImmersiveMode(false);
    setFocusToggle(false);
  }, [mode, id]);

  // Scroll to top on topic change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, mode]);

  // Auto-immersive in dive mode (desktop only)
  useEffect(() => {
    if (mode !== 'dive') {
      clearTimeout(immersiveTimerRef.current);
      return;
    }
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const startTimer = () => {
      clearTimeout(immersiveTimerRef.current);
      immersiveTimerRef.current = setTimeout(() => {
        if (!focusToggle) setImmersiveMode(true);
      }, 3000);
    };

    const onMouseMove = () => {
      setImmersiveMode(false);
      startTimer();
    };

    startTimer();
    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      clearTimeout(immersiveTimerRef.current);
    };
  }, [mode, id, focusToggle]);

  // focusToggle overrides auto-immersive
  useEffect(() => {
    setImmersiveMode(focusToggle);
  }, [focusToggle]);

  // GSAP navbar hide/show on immersive change
  useEffect(() => {
    const navbar = document.querySelector('.navbar-fixed');
    if (!navbar) return;
    gsap.to(navbar, {
      opacity: immersiveMode ? 0 : 1,
      pointerEvents: immersiveMode ? 'none' : 'auto',
      duration: 0.8,
      ease: 'power2.out',
    });
  }, [immersiveMode]);

  // Topic title + toggle entrance — once per topic navigation
  useGSAP(() => {
    gsap.fromTo(
      '.topic-title',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );
    gsap.fromTo(
      '.mode-toggle',
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.3, ease: 'power2.out' }
    );
  }, [id]);

  // Orbit mode: animate non-paragraph elements on mount
  useGSAP(() => {
    if (mode !== 'orbit') return;
    gsap.fromTo(
      '.content-fade',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.08 }
    );
  }, [mode, id]);

  // Sync reading-mode body class for custom cursor
  useEffect(() => {
    if (mode === 'dive') {
      document.body.classList.add('reading-mode');
    } else {
      document.body.classList.remove('reading-mode');
    }
    return () => document.body.classList.remove('reading-mode');
  }, [mode]);

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-white">
        <p className="font-mono">Tópico perdido no espaço.</p>
        <button
          onClick={() => navigate('/jornada')}
          className="ml-4 text-accent border border-accent/30 p-2 rounded"
        >
          Voltar
        </button>
      </div>
    );
  }

  const read = isCompleted(topic.id);
  const nextTopics = topic.nextLinks
    .map(linkId => topics.find(t => t.id === linkId))
    .filter(Boolean);

  return (
    <div
      className={`immersive-wrapper w-full min-h-screen flex flex-col items-center bg-background text-textMain selection:bg-accent/30 selection:text-white relative overflow-x-hidden ${
        immersiveMode ? 'immersive' : ''
      }`}
    >
      <Starfield />
      <PaleBlueFloat />
      <Navbar />

      {/* Vignette overlay for immersive mode */}
      <div
        className={`fixed inset-0 pointer-events-none z-20 transition-opacity duration-[800ms] ${
          immersiveMode ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(3,3,10,0.9) 100%)',
        }}
      />

      <main className="immersive-content w-full flex-grow max-w-[800px] mx-auto px-5 md:px-6 lg:px-12 pt-28 md:pt-40 pb-32 relative z-10 flex flex-col">

        {/* Back nav */}
        <Link
          to="/jornada"
          className="mb-8 inline-flex flex-row items-center gap-3 text-text-muted hover:text-white transition-colors duration-300 w-fit group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-[10px] uppercase tracking-widest">
            Voltar para a Jornada
          </span>
        </Link>

        {/* Progress bar */}
        <ProgressBar />

        {/* Header */}
        <header className="mb-16 pb-12 border-b border-borderLine/40">
          <div className="inline-block px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent font-mono text-[10px] uppercase tracking-widest mb-6">
            {topic.tag}
          </div>
          <h1
            className="topic-title font-heading text-white font-light mb-6 leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 6vw, 3.5rem)' }}
          >
            {topic.title}
          </h1>
          <p className="font-heading text-xl md:text-2xl text-text-muted font-light italic">
            "{topic.subtitle}"
          </p>
        </header>

        {/* Mode Toggle */}
        <ModeToggle mode={mode} setMode={setMode} readingTime={topic.readingTime} />

        {/* ── CONTENT ──────────────────────────────────────────────────────── */}
        <article
          className="min-h-[50vh] font-body font-light text-textMain/90 leading-relaxed md:leading-[1.8]"
          style={{ fontSize: 'clamp(15px, 3.5vw, 19px)' }}
        >

          {/* ORBIT MODE */}
          {mode === 'orbit' && (
            <div className="flex flex-col gap-8 content-fade">

              {topic.impactPhrase && (
                <blockquote className="content-fade mb-4 pl-6 border-l-2 border-accent/60">
                  <p className="font-heading text-2xl md:text-3xl italic text-accent/90 leading-snug">
                    "{topic.impactPhrase}"
                  </p>
                </blockquote>
              )}

              <ul className="flex flex-col gap-6">
                {topic.orbitMode.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-6 items-start content-fade">
                    <span className="font-mono text-accent/60 mt-1 select-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-white/80">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12 p-8 md:p-10 rounded-xl bg-accent/5 border border-accent/10 relative overflow-hidden group content-fade">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[40px] pointer-events-none" />
                <div className="font-mono text-[10px] text-accent/60 uppercase tracking-[0.2em] mb-4">
                  A Lente Feynman (Analogia)
                </div>
                <p className="font-heading text-2xl md:text-3xl italic text-white/90 relative z-10 leading-snug">
                  "{topic.orbitMode.analogy}"
                </p>
              </div>

            </div>
          )}

          {/* DIVE MODE */}
          {mode === 'dive' && (
            <div className="flex flex-col gap-12">

              {topic.diveMode.sections.map((section, si) => (
                <div key={si} className="flex flex-col gap-5">
                  <h2
                    className="font-heading text-2xl md:text-3xl text-white font-normal pl-4 border-l-2 border-accent/70 leading-snug"
                    style={{ marginBottom: 12 }}
                  >
                    {section.heading}
                  </h2>

                  {section.content.split('\n\n').map((para, pi) => (
                    <p
                      key={pi}
                      className="dive-paragraph text-textMain/80"
                      style={{ textAlign: 'justify' }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              ))}

              <ReflectionBlock
                reflection={topic.diveMode.reflection}
                question={topic.diveMode.question}
              />

            </div>
          )}

        </article>

        {/* Stats + Timeline */}
        <StatsGrid stats={topic.stats} />
        <TopicTimeline timeline={topic.timeline} />

        {/* Mark as read */}
        <div className="mt-32 mb-16 flex justify-center">
          <button
            onClick={() => markAsRead(topic.id)}
            className={`group relative px-10 py-5 rounded-xl border transition-all duration-500 flex items-center gap-4 overflow-hidden shadow-2xl ${
              read
                ? 'bg-accent/10 border-accent/40 text-accent cursor-default'
                : 'bg-surface/80 border-borderLine text-white hover:border-accent hover:bg-surface'
            }`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ${
                read ? 'hidden' : ''
              }`}
            />
            {read && <Check size={20} strokeWidth={2} />}
            <span className="font-mono text-sm uppercase tracking-widest relative z-10">
              {read ? 'Registrado em sua jornada' : 'Marcar tópico como lido'}
            </span>
          </button>
        </div>

        <SourcesList sources={topic.sources} />

      </main>

      {/* Next topics */}
      <section className="w-full py-24 bg-surface/20 border-t border-borderLine/30 relative z-10 px-6">
        <div className="max-w-5xl mx-auto">
          <h3 className="font-heading text-3xl text-white mb-12 text-center md:text-left">
            Continue a jornada
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nextTopics.map(nextTopic => (
              <Link
                key={nextTopic.id}
                to={`/jornada/${nextTopic.id}`}
                data-cursor="card"
                className="topic-card-hover group p-8 rounded-xl bg-surface/40 border border-borderLine hover:border-accent/40 hover:bg-surface/80 transition-all duration-300 flex flex-col items-start gap-4"
              >
                <div className="font-mono text-[10px] text-accent/70 uppercase tracking-widest px-3 py-1 bg-accent/5 border border-accent/20 rounded-full">
                  {nextTopic.tag}
                </div>
                <h4 className="font-heading text-xl md:text-2xl text-white/90 group-hover:text-white mb-2 leading-snug">
                  {nextTopic.title}
                </h4>
                <div className="w-8 h-[1px] bg-borderLine group-hover:w-16 group-hover:bg-accent transition-all duration-500 mt-auto" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Focus toggle button (dive mode only) */}
      {mode === 'dive' && (
        <button
          onClick={() => setFocusToggle(!focusToggle)}
          title={focusToggle ? 'Desativar modo foco' : 'Ativar modo foco'}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-surface/80 border border-borderLine/50 text-text-muted hover:text-white transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_15px_rgba(74,158,255,0.2)] backdrop-blur-sm"
        >
          <Eye size={16} />
        </button>
      )}
    </div>
  );
}
