import { useRef, useEffect } from 'react';
import { gsap } from '../lib/gsap';
import { Mail, MapPin, ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PHONE, PHONE_RAW } from '../hooks/useSEO';

interface ContactSectionProps {
  className?: string;
}

const ContactSection = ({ className = '' }: ContactSectionProps) => {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);
  const ctaBarRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Trigger as soon as the top of the section hits the bottom of viewport
      gsap.fromTo(
        [headingRef.current, gridRef.current, ctaBarRef.current],
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom', // fires the instant any part enters viewport
            toggleActions: 'play none none none',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className={`relative bg-navy py-12 lg:py-16 ${className}`}>
      {/* Heading */}
      <div ref={headingRef} className="text-center px-6 mb-10">
        <h2 className="headline-lg text-offwhite mb-4">Contact Septentrion Group</h2>
        <p className="body-text text-offwhite/70 max-w-xl mx-auto">
          Ready to build a partnership or plan a medical journey? Reach out—we respond fast.
        </p>
      </div>

      {/* Contact Grid */}
      <div ref={gridRef} className="max-w-4xl mx-auto px-6 lg:px-12 mb-10">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div>
            <h3 className="font-display font-semibold text-lg text-sand mb-6 uppercase tracking-widest">
              Get in Touch
            </h3>
            <div className="space-y-4">
              {/* Phone / WhatsApp */}
              <a
                href={`tel:${PHONE_RAW}`}
                className="flex items-center gap-4 text-offwhite hover:text-sand transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-offwhite/10 flex items-center justify-center group-hover:bg-sand/20 transition-colors flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-sm text-offwhite/60">Phone / WhatsApp</p>
                  <p className="font-medium">{PHONE}</p>
                </div>
              </a>
              <a
                href="mailto:info@septentriondent.com"
                className="flex items-center gap-4 text-offwhite hover:text-sand transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-offwhite/10 flex items-center justify-center group-hover:bg-sand/20 transition-colors flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm text-offwhite/60">General Inquiries</p>
                  <p className="font-medium">info@septentriondent.com</p>
                </div>
              </a>
            </div>
          </div>

          {/* Offices */}
          <div>
            <h3 className="font-display font-semibold text-lg text-sand mb-6 uppercase tracking-widest">
              Our Offices
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 text-offwhite">
                <div className="w-10 h-10 rounded-full bg-offwhite/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="font-medium">Tirana, Albania</p>
                  <p className="text-sm text-offwhite/60">Headquarters</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Bar */}
      <div ref={ctaBarRef} className="bg-sand py-10">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-navy font-display font-medium text-center md:text-left">
            Prefer to call or message? We're on WhatsApp at <span className="font-bold">{PHONE}</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/${PHONE_RAW}?text=Hi%20Septentrion%20Group!%20I%27d%20like%20to%20enquire%20about%20medical%20tourism.`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-6 py-3 bg-[#25D366] text-white font-display font-semibold text-sm uppercase tracking-widest rounded-md hover:bg-[#1ebe5d] transition-colors"
            >
              WhatsApp Us
            </a>
            <a
              href="mailto:info@septentriondent.com"
              className="group inline-flex items-center gap-3 px-6 py-3 bg-navy text-offwhite font-display font-semibold text-sm uppercase tracking-widest rounded-md hover:bg-navy/80 transition-colors"
            >
              Email us
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
