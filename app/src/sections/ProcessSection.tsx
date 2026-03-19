import { useRef, useEffect } from 'react';
import { gsap } from '../lib/gsap';
import { MessageSquare, FileText, Plane, Stethoscope, HeartPulse } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

interface ProcessSectionProps { className?: string; }

const steps = [
  { icon: MessageSquare, label: 'Consultation', desc: 'Share your needs; receive a response within 24 hours.' },
  { icon: FileText,      label: 'Plan & Quote',  desc: 'Detailed treatment plan with transparent pricing.' },
  { icon: Plane,         label: 'Travel Setup',  desc: 'Flights, transfers and accommodation arranged for you.' },
  { icon: Stethoscope,   label: 'Treatment',     desc: 'World-class care at accredited partner clinics.' },
  { icon: HeartPulse,    label: 'Follow-up',     desc: 'Continuity of care and warranty support post-treatment.' },
];

const ProcessSection = ({ className = '' }: ProcessSectionProps) => {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const stepsRef      = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      const cards = stepsRef.current ? Array.from(stepsRef.current.children) : [];
      gsap.fromTo(cards, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="process" className={`${className} bg-navy py-20 lg:py-28 overflow-hidden`}>
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12">
        <h2 className="headline-lg text-offwhite text-center mb-6">Our Process</h2>
        <p className="body-text text-offwhite/70 text-center max-w-xl mx-auto mb-16">
          From first contact to follow-up care — we handle every step so you can focus on your health.
        </p>

        {/* Top image strip */}
        <div className="rounded-xl overflow-hidden mb-10" style={{ height: 'clamp(160px, 25vw, 220px)' }}>
          <img src="/process_team_meeting.jpg" alt="Team meeting" className="w-full h-full object-cover" width={1200} height={300} loading="lazy" decoding="async" />
        </div>

        {/* Step cards */}
        <div ref={stepsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flex flex-col items-center text-center bg-white/10 rounded-xl p-5 gap-3">
                <div className="w-12 h-12 rounded-full bg-sand flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-navy" />
                </div>
                <p className="font-display font-semibold text-offwhite text-sm uppercase tracking-wide">{step.label}</p>
                <p className="text-offwhite/60 text-xs leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom image strip */}
        <div className="rounded-xl overflow-hidden" style={{ height: 'clamp(160px, 25vw, 220px)' }}>
          <img src="/process_medical_team.jpg" alt="Medical team" className="w-full h-full object-cover" width={1200} height={300} loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
