import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../lib/gsap';
import { ArrowRight } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

interface InquirySectionProps { className?: string; }

const InquirySection = ({ className = '' }: InquirySectionProps) => {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const panelRef      = useRef<HTMLDivElement>(null);
  const imageRef      = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [panelRef.current, imageRef.current],
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom', // fires the instant top of section hits bottom of viewport
            toggleActions: 'play none none none',
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="inquiry" className={`${className} overflow-hidden`}>
      <div className="flex flex-col lg:flex-row-reverse">
        {/* Image */}
        <div ref={imageRef} className="w-full lg:w-[55%]">
          <img src="/inquiry_patient.jpg" alt="Smiling patient"
            className="w-full h-[220px] lg:h-full object-cover"
            width={1200} height={1080} loading="lazy" decoding="async" />
        </div>
        {/* Panel */}
        <div ref={panelRef} className="w-full lg:w-[45%] bg-navy flex items-center px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
          <div className="max-w-[460px]">
            <h2 className="headline-lg text-offwhite mb-5">Start Your Inquiry</h2>
            <p className="body-text text-offwhite/80 mb-8">
              Tell us what you need. We'll reply within one business day with a clear plan, timeline, and quote.
            </p>
            <Link to="/quote" className="btn-primary w-full inline-flex items-center justify-center gap-3 min-h-[56px] mb-4">
              Get a Free Quote
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquirySection;
