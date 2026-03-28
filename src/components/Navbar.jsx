import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Rocket, Menu, X } from 'lucide-react';

export default function Navbar({ hidden = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    setMenuOpen(false);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`navbar-fixed fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          scrolled ? 'bg-background/90 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6 md:py-8'
        } ${hidden ? 'navbar-immersive-hidden' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">

          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="group flex items-center gap-1.5 font-mono tracking-[0.2em] uppercase cursor-pointer"
            style={{ color: '#D4D8E8', fontSize: 'clamp(10px, 2.8vw, 13px)' }}
          >
            <span
              className="transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(74,158,255,0.9)]"
              style={{ color: '#4A9EFF' }}
            >
              ✦
            </span>
            <span className="opacity-90 group-hover:opacity-100 transition-opacity">
              pale blue dot
            </span>
          </button>

          {/* Desktop Nav links */}
          <div className="hidden md:flex gap-8 lg:gap-10 items-center" style={{ fontSize: 13 }}>
            {[
              { label: 'Início', href: '/#hero' },
              { label: 'Discurso', href: '/#discourse' },
              { label: 'Escala', href: '/#scale' },
              { label: 'Reflexões', href: '/#reflections' },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="relative group font-mono tracking-widest uppercase transition-colors duration-300"
                style={{ color: '#D4D8E8', letterSpacing: '0.12em' }}
              >
                <span className="group-hover:text-accent transition-colors duration-300">{label}</span>
                <span
                  className="absolute left-0 -bottom-0.5 h-[1px] w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: '#4A9EFF' }}
                />
              </a>
            ))}

            <Link
              to="/jornada"
              className="btn-primary flex items-center gap-2 px-5 py-2.5 font-mono text-[12px] tracking-widest uppercase font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(74,158,255,0.5)] hover:scale-[1.05] active:scale-95"
              style={{ background: '#4A9EFF', color: '#03030A', borderRadius: 20 }}
            >
              <Rocket size={13} strokeWidth={2} />
              A Jornada
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-8 h-8 z-[60] relative"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuOpen
              ? <X size={22} color="#4A9EFF" />
              : <Menu size={22} color="#4A9EFF" />
            }
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 md:hidden transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(3,3,10,0.97)', backdropFilter: 'blur(16px)' }}
      >
        {[
          { label: 'Início', href: '/#hero' },
          { label: 'Discurso', href: '/#discourse' },
          { label: 'Escala', href: '/#scale' },
          { label: 'Reflexões', href: '/#reflections' },
        ].map(({ label, href }) => (
          <a
            key={href}
            href={href}
            onClick={() => setMenuOpen(false)}
            className="font-heading text-white/90 hover:text-accent transition-colors duration-300"
            style={{ fontSize: 26 }}
          >
            {label}
          </a>
        ))}
        <Link
          to="/jornada"
          onClick={() => setMenuOpen(false)}
          className="btn-primary flex items-center gap-2 px-8 py-3 font-mono text-[13px] tracking-widest uppercase font-semibold mt-4"
          style={{ background: '#4A9EFF', color: '#03030A', borderRadius: 24 }}
        >
          <Rocket size={14} strokeWidth={2} />
          A Jornada
        </Link>
      </div>
    </>
  );
}
