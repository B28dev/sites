import { Wind, Feather } from 'lucide-react';

export default function ModeToggle({ mode, setMode, readingTime }) {
  return (
    <div className="sticky top-20 md:top-24 z-50 mb-12 md:mb-16 flex justify-center overflow-visible pointer-events-none px-5">
      <div className="mode-toggle flex w-full md:w-auto bg-surface/80 backdrop-blur-md rounded-full p-1 border border-borderLine/60 shadow-[0_8px_30px_rgba(0,0,0,0.6)] pointer-events-auto" style={{ flexShrink: 0, maxWidth: '100%' }}>
        <button
          onClick={() => setMode('orbit')}
          className={`flex flex-1 md:flex-none items-center justify-center gap-2 px-4 md:px-6 py-2.5 rounded-full transition-all duration-300 font-mono text-[11px] uppercase tracking-widest ${
            mode === 'orbit' ? 'bg-white/10 text-white shadow-sm' : 'text-text-muted hover:text-white/80'
          }`}
        >
          <Wind size={14} />
          <span>Órbita</span>
          <span className="opacity-50 ml-1">({readingTime.orbit})</span>
        </button>
        <button
          onClick={() => setMode('dive')}
          className={`flex flex-1 md:flex-none items-center justify-center gap-2 px-4 md:px-6 py-2.5 rounded-full transition-all duration-300 font-mono text-[11px] uppercase tracking-widest ${
            mode === 'dive' ? 'bg-white/10 text-white shadow-sm' : 'text-text-muted hover:text-white/80'
          }`}
        >
          <Feather size={14} />
          <span>Mergulho</span>
          <span className="opacity-50 ml-1">({readingTime.dive})</span>
        </button>
      </div>
    </div>
  );
}
