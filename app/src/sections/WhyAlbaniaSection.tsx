import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../lib/gsap';
import { Check } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

interface WhyAlbaniaSectionProps { className?: string; }

const benefits = [
  'Save up to 70% on procedures vs Western Europe—without compromising quality.',
  'Accredited clinics, experienced specialists, modern equipment.',
  'Visa-free access for most Western countries; EU timezone.',
];

const WhyAlbaniaSection = ({ className = '' }: WhyAlbaniaSectionProps) => {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const panelRef      = useRef<HTMLDivElement>(null);
  const imageRef      = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(panelRef.current, { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });
      gsap.fromTo(imageRef.current, { opacity: 0, x: 30 }, {
        opacity: 1, x: 0, duration: 0.7, ease: 'power2.out', delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="why-albania" className={`${className} overflow-hidden`}>
      <div className="flex flex-col lg:flex-row min-h-[85vh]">
        {/* Panel */}
        <div ref={panelRef} className="w-full lg:w-[45%] bg-navy flex items-center px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
          <div className="max-w-[460px]">
            <h2 className="headline-lg text-offwhite mb-8">Why Albania?</h2>
            <ul className="space-y-5 mb-10">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-sand flex items-center justify-center mt-0.5">
                    <Check size={12} className="text-navy" />
                  </div>
                  <span className="body-text text-offwhite/90 text-sm sm:text-base">{benefit}</span>
                </li>
              ))}
            </ul>
            <Link to="/compare-costs" className="btn-primary">Compare costs</Link>
          </div>
        </div>
        {/* Image */}
        <div ref={imageRef} className="w-full lg:w-[55%]">
          <img src="/why_albania_riviera.jpg" alt="Albanian Riviera coastline"
            className="w-full h-[280px] lg:h-full object-cover"
            width={1200} height={1080} loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  );
};

export default WhyAlbaniaSection;
