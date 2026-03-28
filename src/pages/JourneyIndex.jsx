import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { topics } from '../data/topics';
import { useProgress } from '../hooks/useProgress';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Starfield from '../components/Starfield';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';

export default function JourneyIndex() {
  const { isCompleted, progressPercentage, totalTopics, completedTopics } = useProgress();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-background text-textMain selection:bg-accent/30 selection:text-white relative overflow-x-hidden">
      <Starfield />
      <Navbar />

      <main className="w-full flex-grow max-w-5xl mx-auto px-6 lg:px-12 pt-32 pb-32 relative z-10 flex flex-col mt-16">
        
        {/* Header da Jornada */}
        <div className="mb-20 text-center md:text-left flex flex-col md:flex-row gap-12 items-center md:items-end justify-between border-b border-borderLine/50 pb-16">
          <div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-light mb-4">
              Sua jornada pelo <span className="text-accent text-glow">ponto azul</span>
            </h1>
            <p className="font-body text-text-muted text-lg md:text-xl font-light">
              8 tópicos. Dois ritmos. Você decide.
            </p>
          </div>
          
          <div className="w-full md:w-64 flex flex-col items-center md:items-end p-6 bg-surface/30 rounded-xl border border-borderLine/40 backdrop-blur-sm">
            <span className="font-mono text-xs text-text-muted uppercase tracking-widest mb-3">Progresso</span>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="font-heading text-4xl text-white">{completedTopics.length}</span>
              <span className="font-mono text-text-muted">/ {totalTopics}</span>
            </div>
            <div className="w-full h-1 bg-deep rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Lista de Tópicos */}
        <div className="flex flex-col gap-6 w-full">
          {topics.map((topic, index) => {
            const read = isCompleted(topic.id);
            return (
              <Link
                key={topic.id}
                to={`/jornada/${topic.id}`}
                data-cursor="card"
                className={`topic-card-hover group relative w-full p-8 md:p-10 rounded-xl border transition-all duration-500 overflow-hidden flex flex-col md:flex-row gap-8 items-start md:items-center justify-between ${
                  read
                    ? 'bg-surface/10 border-borderLine/30 opacity-70 hover:opacity-100 hover:border-accent/30'
                    : 'bg-surface/40 border-borderLine/60 hover:border-accent/50 hover:bg-surface/60 shadow-lg'
                }`}
              >
                {/* Glow interativo */}
                <div className="absolute top-1/2 left-0 w-32 h-32 bg-accent/5 blur-[50px] -translate-y-1/2 -translate-x-1/2 group-hover:bg-accent/10 transition-colors pointer-events-none"></div>

                <div className="flex items-start gap-6 w-full relative z-10">
                  <div className="mt-1">
                    {read ? (
                      <CheckCircle2 size={24} className="text-accent/80" strokeWidth={1.5} />
                    ) : (
                      <Circle size={24} className="text-text-muted/50 group-hover:text-gold/50 transition-colors" strokeWidth={1.5} />
                    )}
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] md:text-xs text-accent/80 uppercase tracking-[0.2em] mb-3">
                      {String(index + 1).padStart(2, '0')} · {topic.tag}
                    </span>
                    <h2 className={`font-heading text-2xl md:text-3xl mb-2 transition-colors ${read ? 'text-textMain' : 'text-white'}`}>
                      {topic.title}
                    </h2>
                    <p className="font-body text-text-muted text-sm md:text-base font-light mb-6 md:mb-0">
                      {topic.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col justify-between w-full md:w-auto items-center md:items-end gap-0 md:gap-4 relative z-10 shrink-0">
                  <div className="flex gap-4 font-mono text-[10px] uppercase text-text-muted tracking-wide">
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gold/50"></span> {topic.readingTime.orbit}</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-accent/50"></span> {topic.readingTime.dive}</span>
                  </div>
                  <div className="text-text-muted group-hover:text-white transition-colors flex items-center gap-2 font-mono text-xs uppercase tracking-widest pl-4 md:pl-0 border-l border-borderLine/50 md:border-0 h-full">
                    <span>Ler</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
