import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ScrollTrigger } from '../lib/gsap';

// Scroll-anchor links (homepage sections)
const NAV_LINKS = [
  { label: 'Services',     href: '#medical-tourism' },
  { label: 'Process',      href: '#process' },
  { label: 'Why Albania',  href: '#why-albania' },
  { label: 'Contact',      href: '#contact' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled]           = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection]     = useState<string>('');
  const location  = useLocation();
  const navigate  = useNavigate();
  const isHomePage = location.pathname === '/';

  // Scroll-state for nav background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Escape key closes mobile menu (fix #12)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Active section tracker via ScrollTrigger (fix #10)
  useEffect(() => {
    if (!isHomePage) { setActiveSection(''); return; }

    const triggers = NAV_LINKS
      .filter(l => l.href.startsWith('#'))
      .map(link => {
        const id = link.href.slice(1);
        const el = document.getElementById(id);
        if (!el) return null;
        return ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter:      () => setActiveSection(link.href),
          onEnterBack:  () => setActiveSection(link.href),
        });
      })
      .filter(Boolean);

    return () => triggers.forEach(t => t?.kill());
  }, [isHomePage, location.pathname]);

  const scrollToSection = useCallback((href: string) => {
    setIsMobileMenuOpen(false);

    if (!isHomePage) {
      navigate('/');
      // After navigation, wait for the DOM to fully paint before scrolling.
      // Two rAF frames guarantees the new page has rendered and layout is stable.
      const doScroll = () => {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // Element not found yet — retry once more after another frame
          requestAnimationFrame(() => {
            const el2 = document.querySelector(href);
            if (el2) el2.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        }
      };
      requestAnimationFrame(() => requestAnimationFrame(doScroll));
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isHomePage, navigate]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          isScrolled || !isHomePage
            ? 'bg-offwhite/95 backdrop-blur-md shadow-sm py-3'
            : 'bg-offwhite/90 backdrop-blur-sm py-4'
        }`}
        style={{ paddingLeft: 'max(1rem, env(safe-area-inset-left))', paddingRight: 'max(1rem, env(safe-area-inset-right))' }}
      >
        <div className="w-full px-2 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 transition-colors flex-shrink-0">
            <img
              src="/logo.png"
              alt="Septentrion"
              className="h-10 sm:h-12 w-auto object-contain"
              width={300}
              height={48}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className={`inline-flex items-center font-body text-sm font-medium leading-none transition-colors hover:text-sand ${
                  activeSection === link.href ? 'text-sand' : 'text-navy'
                }`}
              >
                {link.label}
              </button>
            ))}
            {/* Dentistry — direct page link */}
            <Link
              to="/dentistry"
              className={`inline-flex items-center font-body text-sm font-medium leading-none transition-colors hover:text-sand ${
                location.pathname === '/dentistry' ? 'text-sand' : 'text-navy'
              }`}
            >
              Dentistry
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link to="/quote" className="btn-primary text-xs py-3 px-6">
              Get a Free Quote
            </Link>
          </div>

          {/* Mobile Menu Button — aria-expanded added (fix #13) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-navy min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[999] bg-navy transition-transform duration-500 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 px-6">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="font-display text-xl font-semibold text-offwhite hover:text-sand transition-colors min-h-[44px] flex items-center"
            >
              {link.label}
            </button>
          ))}
          {/* Dental Implants — direct page link */}
          <Link
            to="/dentistry"
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-display text-xl font-semibold text-sand hover:text-sand-light transition-colors min-h-[44px] flex items-center gap-2"
          >
            Dentistry
          </Link>
          <Link
            to="/quote"
            className="btn-primary mt-6 min-h-[56px] flex items-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navigation;
