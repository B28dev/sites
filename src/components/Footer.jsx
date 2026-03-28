import { ExternalLink } from 'lucide-react';
import PaleBlueDot from './PaleBlueDot';

const sources = [
  { label: 'Imagem Original da Voyager 1', sub: 'NASA/JPL-Caltech', url: 'https://photojournal.jpl.nasa.gov/catalog/PIA00452', hover: 'group-hover:text-accent' },
  { label: 'O Discurso Original', sub: 'The Planetary Society', url: 'https://www.planetary.org/video/planetary-post-carl-sagan-pale-blue-dot', hover: 'group-hover:text-gold' },
  { label: 'Discurso em PT-BR', sub: 'Vídeo Dublado (YouTube)', url: 'https://www.youtube.com/watch?v=4_tiv9v964k', hover: 'group-hover:text-accent' },
  { label: 'A História da Foto', sub: 'Pálido Ponto Azul (Wikipedia)', url: 'https://pt.wikipedia.org/wiki/P%C3%A1lido_Ponto_Azul', hover: 'group-hover:text-gold' },
  { label: 'NASA Astrobiology', sub: 'astrobiology.nasa.gov', url: 'https://astrobiology.nasa.gov', hover: 'group-hover:text-accent' },
  { label: 'James Webb Space Telescope', sub: 'webbtelescope.org', url: 'https://webbtelescope.org', hover: 'group-hover:text-gold' },
  { label: 'ESA — Agência Espacial Europeia', sub: 'esa.int', url: 'https://esa.int', hover: 'group-hover:text-accent' },
  { label: 'Voyager em Tempo Real', sub: 'voyager.jpl.nasa.gov', url: 'https://voyager.jpl.nasa.gov', hover: 'group-hover:text-gold' },
  { label: 'Overview Institute', sub: 'overviewinstitute.org', url: 'https://overviewinstitute.org', hover: 'group-hover:text-accent' },
  { label: 'Carl Sagan — Cosmos (1980)', sub: 'Livro — referência bibliográfica', url: 'https://www.amazon.com.br/Cosmos-Carl-Sagan/dp/8535929886', hover: 'group-hover:text-gold' },
  { label: 'Carl Sagan — The Demon-Haunted World (1995)', sub: 'Livro — referência bibliográfica', url: 'https://www.amazon.com.br/Demon-Haunted-World-Science-Candle-Dark/dp/0345409469', hover: 'group-hover:text-accent' },
];

export default function Footer() {
  return (
    <footer className="w-full pt-32 pb-16 flex flex-col items-center justify-center relative z-10 bg-background border-t border-borderLine/30 px-6 overflow-hidden">

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[200px] bg-accent/5 blur-[100px] rounded-[100%] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl">
        <PaleBlueDot className="mb-10" />

        <div className="font-mono text-sm tracking-[0.3em] uppercase mb-6 cursor-default hover:text-white transition-colors" style={{ color: '#D4D8E8' }}>
          · the blue dot ·
        </div>

        <p className="font-body text-sm font-light mb-16 cursor-default" style={{ color: '#8B92B0' }}>
          Um projeto poético sobre perspectiva. {new Date().getFullYear()}.
        </p>

        {/* References */}
        <div className="w-full flex flex-col items-center border-t border-borderLine/30 pt-16 mb-20">
          <p className="font-mono text-xs uppercase tracking-widest mb-10 text-glow" style={{ color: '#D4D8E8' }}>
            Fontes &amp; Conhecimento
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12 text-center w-full">
            {sources.map(({ label, sub, url, hover }, i) => {
              const inner = (
                <>
                  <span className={`font-body text-[13px] mb-1 transition-colors duration-300 inline-flex items-center gap-1 ${hover}`} style={{ color: '#D4D8E8' }}>
                    {label}
                    {url && <ExternalLink size={11} className="opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex-shrink-0" />}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: '#8B92B0' }}>
                    {sub}
                  </span>
                </>
              );
              return url ? (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center cursor-pointer">
                  {inner}
                </a>
              ) : (
                <div key={i} className="group flex flex-col items-center cursor-default">
                  {inner}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-8 mb-16 font-mono text-[11px] tracking-widest uppercase">
          <a href="https://github.com/B28dev/the-blue-dot" target="_blank" rel="noopener noreferrer" style={{ color: '#8B92B0' }} className="hover:text-accent transition-colors duration-300">GitHub</a>
          <a href="#" style={{ color: '#8B92B0' }} className="hover:text-accent transition-colors duration-300">Instagram</a>
        </div>

        <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.4em] uppercase cursor-default text-center px-4 leading-loose mb-12" style={{ color: '#8B92B0' }}>
          Terra <span className="mx-2 text-accent/50">·</span> 3ª posição <span className="mx-2 text-accent/50">·</span> Via Láctea <span className="mx-2 text-accent/50">·</span> Grupo Local <span className="mx-2 text-accent/50">·</span> Universo
        </div>

        {/* Aviso legal */}
        <div className="w-full max-w-3xl border-t pt-8 text-center flex flex-col gap-3" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          {[
            'Projeto educacional sem fins lucrativos. Todo o conteúdo foi criado exclusivamente por um entusiasta e amante do espaço. Inspirado em obras de domínio público e divulgação científica.',
            'As ideias de Carl Sagan são referenciadas com atribuição. Nenhum trecho protegido por direitos autorais foi reproduzido. Todo conteúdo escrito é original.',
            '© 2026 The Blue Dot · Todos os direitos reservados ao conteúdo original deste projeto.',
          ].map((line, i) => (
            <p key={i} className="font-mono text-[10px] leading-relaxed cursor-default" style={{ color: 'rgba(212,216,232,0.40)' }}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
}
