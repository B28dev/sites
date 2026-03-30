import { useEffect, useRef } from 'react';

const LAYERS = [
  { count: 30,  minR: 2,   maxR: 3,   alpha: 0.9, color: '255,255,255', parallaxMouse: 1.0, parallaxScroll: -0.3 },
  { count: 80,  minR: 1.2, maxR: 2,   alpha: 0.6, color: '212,216,255', parallaxMouse: 0.6, parallaxScroll: -0.15 },
  { count: 200, minR: 0.8, maxR: 1,   alpha: 0.4, color: '255,255,255', parallaxMouse: 0.3, parallaxScroll: 0 },
  { count: 400, minR: 0.3, maxR: 0.6, alpha: 0.2, color: '255,255,255', parallaxMouse: 0,   parallaxScroll: 0 },
];

export default function Starfield() {
  const canvasRef = useRef(null);
  const scrollYRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const layersRef = useRef([]);
  const shootingStarsRef = useRef([]);
  const nextShootingStarRef = useRef(Date.now() + 10000 + Math.random() * 5000);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const initLayers = () => {
      layersRef.current = LAYERS.map((layer) => {
        const stars = [];
        for (let i = 0; i < layer.count; i++) {
          const baseAlpha = layer.alpha * (0.5 + Math.random() * 0.5);
          stars.push({
            x: Math.random(),
            y: Math.random(),
            radius: layer.minR + Math.random() * (layer.maxR - layer.minR),
            baseAlpha,
            alpha: baseAlpha,
            twinkleSpeed: (Math.random() * 0.008 + 0.002) * (Math.random() < 0.5 ? 1 : -1),
            twinkleDir: 1,
          });
        }
        return { stars, config: layer };
      });
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initLayers();
    };

    const spawnShootingStar = () => {
      const w = canvas.width;
      const h = canvas.height;
      const fromLeft = Math.random() < 0.5;
      const startX = fromLeft ? 0 : w;
      const startY = Math.random() * (h * 0.5);
      const angle = (40 + Math.random() * 20) * (Math.PI / 180);
      const dist = 400 + Math.random() * 200;
      const dirX = fromLeft ? Math.cos(angle) : -Math.cos(angle);
      const dirY = Math.sin(angle);

      shootingStarsRef.current.push({
        startX,
        startY,
        endX: startX + dirX * dist,
        endY: startY + dirY * dist,
        startTime: Date.now(),
        duration: 800,
      });
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const scrollY = scrollYRef.current;
      const mouseOffsetX = mouseRef.current.x - 0.5;
      const mouseOffsetY = mouseRef.current.y - 0.5;

      layersRef.current.forEach(({ stars, config }) => {
        const offsetX = mouseOffsetX * config.parallaxMouse * 20;
        const offsetY = scrollY * config.parallaxScroll + mouseOffsetY * config.parallaxMouse * 15;

        stars.forEach(star => {
          // Twinkle
          if (!reducedMotion) {
            star.alpha += star.twinkleSpeed;
            if (star.alpha > star.baseAlpha + 0.2) star.twinkleSpeed = -Math.abs(star.twinkleSpeed);
            if (star.alpha < star.baseAlpha - 0.15) star.twinkleSpeed = Math.abs(star.twinkleSpeed);
          }

          const drawX = ((star.x * w + offsetX) % w + w) % w;
          const drawY = ((star.y * h + offsetY) % h + h) % h;

          ctx.beginPath();
          ctx.arc(drawX, drawY, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${config.color}, ${Math.max(0, star.alpha)})`;
          ctx.fill();
        });
      });

      // Draw shooting stars
      if (!reducedMotion) {
        const now = Date.now();

        // Spawn new shooting star
        if (now >= nextShootingStarRef.current) {
          spawnShootingStar();
          nextShootingStarRef.current = now + 10000 + Math.random() * 5000;
        }

        // Animate existing shooting stars
        shootingStarsRef.current = shootingStarsRef.current.filter(star => {
          const elapsed = now - star.startTime;
          if (elapsed >= star.duration) return false;

          const progress = elapsed / star.duration;
          const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

          const currentX = star.startX + (star.endX - star.startX) * eased;
          const currentY = star.startY + (star.endY - star.startY) * eased;

          // Trail
          const trailLen = 80;
          const dx = star.endX - star.startX;
          const dy = star.endY - star.startY;
          const len = Math.sqrt(dx * dx + dy * dy);
          const ux = dx / len;
          const uy = dy / len;

          const trailStartX = currentX - ux * trailLen;
          const trailStartY = currentY - uy * trailLen;

          const opacity = progress < 0.8 ? 1 : (1 - progress) / 0.2;
          const grad = ctx.createLinearGradient(trailStartX, trailStartY, currentX, currentY);
          grad.addColorStop(0, `rgba(255,255,255,0)`);
          grad.addColorStop(1, `rgba(255,255,255,${opacity * 0.8})`);

          ctx.beginPath();
          ctx.moveTo(trailStartX, trailStartY);
          ctx.lineTo(currentX, currentY);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Head glow
          ctx.beginPath();
          ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${opacity})`;
          ctx.fill();

          return true;
        });
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const onScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    if (!isTouch) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
    }
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      if (!isTouch) {
        window.removeEventListener('mousemove', onMouseMove);
      }
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
