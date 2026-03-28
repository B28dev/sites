import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PaleBlueFloat() {
  const dotRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    // Pulse animation
    gsap.to(dot, {
      scale: 1.6,
      opacity: 0.4,
      duration: 1.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Parallax on scroll — subtle vertical movement
    const onScroll = () => {
      const scrollY = window.scrollY;
      gsap.to(dot, {
        y: scrollY * 0.06,
        duration: 0.4,
        ease: 'power1.out',
        overwrite: 'auto',
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-50 pointer-events-none"
      style={{ willChange: 'transform' }}
    >
      {/* Outer glow ring */}
      <div
        className="rounded-full"
        style={{
          width: 28,
          height: 28,
          background: 'radial-gradient(circle, rgba(79,195,247,0.18) 0%, rgba(79,195,247,0) 70%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* The dot itself */}
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: '#4fc3f7',
            boxShadow: '0 0 10px 3px rgba(79,195,247,0.55)',
          }}
        />
      </div>
    </div>
  );
}
