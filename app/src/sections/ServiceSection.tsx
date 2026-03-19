import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../lib/gsap';
import { ArrowRight } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

interface ServiceSectionProps {
  className?: string;
  id?: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  imageSrc: string;
  layout: 'image-left' | 'image-right';
  panelColor: 'sand' | 'navy';
}

const ServiceSection = ({ className = '', id, title, description, ctaText, ctaLink, imageSrc, layout, panelColor }: ServiceSectionProps) => {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const imageRef      = useRef<HTMLDivElement>(null);
  const panelRef      = useRef<HTMLDivElement>(null);
  const isImageLeft   = layout === 'image-left';
  const isSandPanel   = panelColor === 'sand';
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current, { opacity: 0, x: isImageLeft ? -30 : 30 }, {
        opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });
      gsap.fromTo(panelRef.current, { opacity: 0, x: isImageLeft ? 30 : -30 }, {
        opacity: 1, x: 0, duration: 0.7, ease: 'power2.out', delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [isImageLeft, reducedMotion]);

  const textColor   = isSandPanel ? 'text-navy'    : 'text-offwhite';
  const subColor    = isSandPanel ? 'text-navy/80'  : 'text-offwhite/80';
  const linkColor   = isSandPanel ? 'text-navy hover:text-navy/70' : 'text-sand hover:text-sand/80';
  const bgColor     = isSandPanel ? 'bg-sand'  : 'bg-navy';

  return (
    <section ref={sectionRef} id={id} className={`${className} overflow-hidden`}>
      <div className={`flex flex-col ${isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} min-h-[85vh]`}>
        {/* Image */}
        <div ref={imageRef} className="w-full lg:w-[60%]">
          <img src={imageSrc} alt={title}
            className="w-full h-[280px] lg:h-full object-cover"
            width={1200} height={1080} loading="lazy" decoding="async" />
        </div>
        {/* Panel */}
        <div ref={panelRef} className={`w-full lg:w-[40%] ${bgColor} flex items-center px-6 py-12 sm:px-10 lg:px-14 lg:py-20`}>
          <div className="max-w-[420px]">
            <h2 className={`headline-md ${textColor} mb-5`}>{title}</h2>
            <p className={`body-text ${subColor} mb-10`}>{description}</p>
            <Link to={ctaLink} className={`group inline-flex items-center gap-2 font-display font-semibold text-sm uppercase tracking-widest transition-all duration-300 min-h-[44px] ${linkColor}`}>
              {ctaText}
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
