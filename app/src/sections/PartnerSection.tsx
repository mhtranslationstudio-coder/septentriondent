import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../lib/gsap';
import { ArrowRight, Building2, Plane, Hotel, Stethoscope } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

interface PartnerSectionProps { className?: string; }

const partners = [
  { icon: Stethoscope, name: 'Clinics'   },
  { icon: Plane,       name: 'Travel'    },
  { icon: Hotel,       name: 'Hotels'    },
  { icon: Building2,   name: 'Insurance' },
];

const PartnerSection = ({ className = '' }: PartnerSectionProps) => {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const imageRef      = useRef<HTMLDivElement>(null);
  const panelRef      = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current, { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });
      gsap.fromTo(panelRef.current, { opacity: 0, x: 30 }, {
        opacity: 1, x: 0, duration: 0.7, ease: 'power2.out', delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="partners" className={`${className} overflow-hidden`}>
      <div className="flex flex-col lg:flex-row min-h-[85vh]">
        {/* Image */}
        <div ref={imageRef} className="w-full lg:w-[62%]">
          <img src="/partner_clinic.jpg" alt="Partner clinic reception"
            className="w-full h-[280px] lg:h-full object-cover"
            width={1200} height={1080} loading="lazy" decoding="async" />
        </div>
        {/* Panel */}
        <div ref={panelRef} className="w-full lg:w-[38%] bg-sand flex items-center px-6 py-12 sm:px-10 lg:px-12 lg:py-20">
          <div className="max-w-[380px]">
            <h2 className="headline-md text-navy mb-5">Partner Network</h2>
            <p className="body-text text-navy/80 mb-8">
              We work with accredited clinics, travel providers, and hospitality operators—so patients get consistent, high-quality care at every step.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {partners.map((partner, i) => {
                const Icon = partner.icon;
                return (
                  <div key={i} className="w-14 h-14 rounded-xl bg-navy/10 hover:bg-navy/20 flex items-center justify-center transition-colors cursor-pointer" title={partner.name} role="img" aria-label={partner.name}>
                    <Icon size={22} className="text-navy" />
                  </div>
                );
              })}
            </div>
            <Link to="/partner" className="group inline-flex items-center gap-2 font-display font-semibold text-sm uppercase tracking-widest text-navy hover:text-navy/70 transition-colors min-h-[44px]">
              Become a partner
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
