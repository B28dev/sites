import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, x: -16 });

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
          delay: index * 0.04,
        });
      },
    });

    return () => st.kill();
  }, [index]);

  return (
    <div ref={ref} className="flex items-start gap-6 py-3 group">
      <span className="font-mono text-[11px] text-accent/70 w-16 shrink-0 text-right pt-0.5 leading-tight">
        {item.year}
      </span>
      <div className="relative flex-shrink-0 w-3 h-3 mt-1">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent/50 group-hover:bg-accent transition-colors duration-300 group-hover:shadow-[0_0_8px_rgba(79,195,247,0.6)]" />
      </div>
      <span className="font-body text-textMain/75 text-base leading-snug pt-0.5 group-hover:text-white/90 transition-colors duration-200">
        {item.event}
      </span>
    </div>
  );
}

export default function TopicTimeline({ timeline }) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <section className="mt-20">
      <h3 className="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em] mb-8">
        Linha do Tempo
      </h3>
      <div className="relative pl-4">
        <div className="absolute left-[72px] top-0 bottom-0 w-px bg-borderLine/40" />
        <div className="flex flex-col gap-0">
          {timeline.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
