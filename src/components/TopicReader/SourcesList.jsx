import { ArrowRight } from 'lucide-react';

export default function SourcesList({ sources }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="w-full pt-16 border-t border-borderLine/30">
      <h3 className="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em] mb-6">
        Referências Oficiais Utilizadas
      </h3>
      <ul className="flex flex-col gap-4">
        {sources.map((src, i) => (
          <li key={i}>
            <a
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-textMain/60 hover:text-accent font-body text-sm transition-colors"
            >
              <ArrowRight size={14} className="opacity-50" />
              <span>{src.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
