import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function StatsGridAnimator({ children }) {
  const sectionRef = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const cards = el.querySelectorAll('.stat-card');
    gsap.set(cards, { opacity: 0, y: 20 });

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div ref={sectionRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {children}
    </div>
  );
}

function AnimatedStat({ label, value }) {
  const ref = useRef(null);
  const triggered = useRef(false);

  const parseNum = (v) => {
    const clean = v.replace(/[.,]/g, m => (m === ',' ? '.' : ''));
    const match = clean.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : null;
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const num = parseNum(value);

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;

        if (num !== null && num > 0) {
          const suffix = value.replace(/^[\d.,\s]+/, '');
          gsap.fromTo(
            { val: 0 },
            { val: num },
            {
              duration: 1.6,
              ease: 'power2.out',
              onUpdate: function () {
                const v = this.targets()[0].val;
                const formatted =
                  v % 1 === 0
                    ? Math.round(v).toLocaleString('pt-BR')
                    : v.toFixed(2).replace('.', ',');
                el.textContent = formatted + (suffix || '');
              },
              onComplete: () => {
                el.textContent = value;
              },
            }
          );
        }
      },
    });

    return () => st.kill();
  }, [value]);

  return (
    <div className="stat-card group p-6 rounded-xl bg-surface/30 border border-borderLine/40 hover:border-accent/40 hover:shadow-[0_0_20px_rgba(79,195,247,0.08)] transition-all duration-300 flex flex-col gap-2">
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">{label}</span>
      <span ref={ref} className="stat-value font-heading text-3xl md:text-4xl text-accent leading-none">
        {value}
      </span>
    </div>
  );
}

export default function StatsGrid({ stats }) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="mt-24">
      <h3 className="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em] mb-8">
        Dados & Escala
      </h3>
      <StatsGridAnimator>
        {stats.map((stat, i) => (
          <AnimatedStat key={i} label={stat.label} value={stat.value} />
        ))}
      </StatsGridAnimator>
    </section>
  );
}
