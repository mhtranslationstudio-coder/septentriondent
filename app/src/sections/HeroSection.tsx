import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, scrollToSection } from '../lib/gsap';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

interface HeroSectionProps { className?: string; }

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      gsap.set(headlineRef.current?.children || [], { y: 32, opacity: 0 });
      gsap.set(ctaRef.current, { y: 20, opacity: 0 });
      tl.to(headlineRef.current?.children || [], { y: 0, opacity: 1, duration: 0.6, stagger: 0.06 }, 0.3)
        .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.5 }, 0.7);
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden min-h-screen flex flex-col items-center justify-center ${className}`}
    >
      {/* Looping background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src="/hero_bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay — dark gradient for text legibility */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(11,30,42,0.55) 0%, rgba(11,30,42,0.45) 60%, rgba(11,30,42,0.65) 100%)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-28 pb-16 w-full max-w-5xl mx-auto">

        {/* Headline */}
        <div ref={headlineRef} className="mb-10">
          <h1 className="headline-xl text-offwhite leading-tight">
            <span className="block">Your Gateway to</span>
            <span className="block">World-Class Medical</span>
            <span className="block">Care in Albania</span>
          </h1>
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-sm sm:max-w-none">
          <Link
            to="/quote"
            className="btn-primary min-h-[52px] flex items-center justify-center whitespace-nowrap"
          >
            Get a Free Quote
          </Link>
          <button
            onClick={() => scrollToSection('#medical-tourism')}
            className="min-h-[52px] flex items-center justify-center whitespace-nowrap px-8 py-4 border-2 border-offwhite text-offwhite font-body font-semibold text-sm uppercase tracking-widest rounded-md transition-all duration-300 hover:bg-offwhite hover:text-navy"
          >
            Explore Services
          </button>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
