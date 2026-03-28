import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const posRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const targetRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const rafRef = useRef(null);

  useEffect(() => {
    // Skip on touch/mobile devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let idleTimer = null;

    const onMouseMove = (e) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;

      // Dot follows directly
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';

      // Restore visibility on movement
      ring.style.opacity = document.body.classList.contains('reading-mode') ? '0.3' : '1';
      dot.style.opacity = '1';

      // Fade ring out after 2s of no movement
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        ring.style.opacity = '0';
        dot.style.opacity = '0.4';
      }, 2000);
    };

    const onMouseDown = () => {
      ring.classList.add('cursor-click');
      setTimeout(() => ring.classList.remove('cursor-click'), 300);
    };

    const onMouseOver = (e) => {
      const target = e.target.closest('a, button');
      if (target) {
        ring.classList.add('cursor-hover');
      } else {
        ring.classList.remove('cursor-hover');
      }

      const cardTarget = e.target.closest('[data-cursor="card"]');
      if (cardTarget) {
        ring.classList.add('cursor-card');
      } else {
        ring.classList.remove('cursor-card');
      }
    };

    const loop = () => {
      const lerpFactor = reducedMotion ? 1 : 0.25;
      posRef.current.x += (targetRef.current.x - posRef.current.x) * lerpFactor;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * lerpFactor;

      ring.style.left = posRef.current.x + 'px';
      ring.style.top = posRef.current.y + 'px';

      // Apply reading-mode subtle sizing (only when no hover/card state active)
      const isReading = document.body.classList.contains('reading-mode');
      const isHovering = ring.classList.contains('cursor-hover') || ring.classList.contains('cursor-card');

      if (!isHovering) {
        if (isReading) {
          ring.style.width = '20px';
          ring.style.height = '20px';
          dot.style.width = '3px';
          dot.style.height = '3px';
        } else {
          ring.style.width = '32px';
          ring.style.height = '32px';
          dot.style.width = '4px';
          dot.style.height = '4px';
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseover', onMouseOver);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(idleTimer);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          width: 32,
          height: 32,
          border: '1px solid rgba(74,158,255,0.6)',
          background: 'transparent',
          left: '-100px',
          top: '-100px',
          transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease, border-color 0.2s ease',
        }}
      />
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          width: 4,
          height: 4,
          background: '#4fc3f7',
          left: '-100px',
          top: '-100px',
          animation: 'cursor-dot-pulse 2s ease-in-out infinite',
        }}
      />
    </>
  );
}
