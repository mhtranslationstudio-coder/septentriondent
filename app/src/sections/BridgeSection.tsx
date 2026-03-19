import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../lib/gsap';
import { ArrowRight } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

interface BridgeSectionProps { className?: string; }

const BridgeSection = ({ className = '' }: BridgeSectionProps) => {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const imageRef     = useRef<HTMLDivElement>(null);
  const textRef      = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current, { x: -40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });
      gsap.fromTo(textRef.current, { x: 40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className={`${className} bg-offwhite py-20 lg:py-0 overflow-hidden`}>
      <div className="flex flex-col lg:flex-row min-h-[80vh]">
        {/* Image */}
        <div ref={imageRef} className="w-full lg:w-1/2">
          <img src="/dental_consultation.jpg" alt="Doctor consulting with patient"
            className="w-full h-[300px] lg:h-full object-cover" width={800} height={600} loading="lazy" decoding="async" />
        </div>
        {/* Text */}
        <div ref={textRef} className="w-full lg:w-1/2 bg-offwhite flex items-center px-6 py-12 sm:px-10 lg:px-16 lg:py-20">
          <div className="max-w-[520px]">
            <div className="w-[3px] h-12 bg-sand mb-8" />
            <h2 className="headline-lg text-navy mb-6">We Bridge Healthcare &amp; Hospitality</h2>
            <p className="body-text text-slate-custom mb-10">
              Septentrion Group is a hybrid service conglomerate: medical tourism facilitation, BPO, and digital infrastructure—designed to remove friction for patients and providers.
            </p>
            <Link to="/dentistry" className="group inline-flex items-center gap-2 font-display font-semibold text-sm uppercase tracking-widest text-navy hover:text-sand transition-all duration-300 min-h-[44px]">
              Our Dental Services
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BridgeSection;
