import BackButton from '../components/BackButton';
import { useSEO } from '../hooks/useSEO';

import { Link } from 'react-router-dom';
import { MessageSquare, FileText, Plane, Stethoscope, HeartPulse, ArrowRight, CheckCircle } from 'lucide-react';

const HowItWorksPage = () => {

  const steps = [
    {
      icon: MessageSquare,
      title: '1. Free Consultation',
      description: 'Share your dental needs and medical history with us. Upload X-rays and photos for our partner clinics to review.',
      bgImage: '/step_consultation.jpg',
      details: [
        'Fill out our online form',
        'Upload panoramic X-rays',
        'Describe your dental concerns',
        'Receive response within 24 hours'
      ]
    },
    {
      icon: FileText,
      title: '2. Treatment Plan & Quote',
      description: 'Our partner clinics evaluate your case and provide a detailed treatment plan with transparent pricing.',
      bgImage: '/step_treatment_plan.jpg',
      details: [
        'Comprehensive dental assessment',
        'Detailed treatment timeline',
        'Transparent cost breakdown',
        'No hidden fees guaranteed'
      ]
    },
    {
      icon: Plane,
      title: '3. Travel Arrangements',
      description: 'We handle all logistics - flights, accommodation, airport transfers, and clinic appointments.',
      bgImage: '/step_travel.jpg',
      details: [
        'Flight booking assistance',
        'Premium accommodation selection',
        'Airport pickup service',
        '24/7 local support'
      ]
    },
    {
      icon: Stethoscope,
      title: '4. Treatment & Recovery',
      description: 'Receive world-class dental care at our accredited partner clinics in Tirana.',
      bgImage: '/step_recovery.jpg',
      details: [
        'English-speaking dentists',
        'Modern facilities & equipment',
        'Comfortable recovery accommodation',
        'Translation services included'
      ]
    },
    {
      icon: HeartPulse,
      title: '5. Follow-up Care',
      description: 'We ensure continuity of care with follow-up consultations and warranty support.',
      bgImage: '/step_followup.jpg',
      details: [
        'Post-treatment checkups',
        'Warranty documentation',
        'Home country dentist coordination',
        'Ongoing support access'
      ]
    },
  ];

  useSEO({
    title: 'How Medical Tourism Works',
    description: 'A step-by-step guide to your dental journey in Albania — from free consultation and treatment plan to travel, care, and follow-up.',
    canonicalPath: '/how-it-works',
    keywords: 'how dental tourism works, dental tourism process, medical tourism Albania steps, dental tourism coordinator Albania',
  });

  return (
    <div className="min-h-screen bg-offwhite pt-20 sm:pt-24 pb-16">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 mb-6">
        <BackButton />
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 mb-12 sm:mb-16 text-center">
        <h1 className="headline-lg text-navy mb-4">
          How Medical Tourism Works
        </h1>
        <p className="body-text text-slate-custom max-w-2xl mx-auto">
          Your journey to a new smile is simpler than you think. Here's how we guide you 
          through every step of the process.
        </p>
      </div>

      {/* Steps */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="space-y-8 sm:space-y-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative rounded-xl shadow-card overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Background image */}
                {step.bgImage && (
                  <>
                    <img
                      src={step.bgImage}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover"
            loading="lazy" />
                    <div className="absolute inset-0 bg-navy/70" />
                  </>
                )}

                {/* Card content */}
                <div className={`relative z-10 p-6 sm:p-8 ${step.bgImage ? '' : 'bg-white'}`}>
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-sand flex items-center justify-center flex-shrink-0">
                      <Icon size={28} className="text-navy" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-display font-bold text-xl sm:text-2xl mb-2 sm:mb-3 ${step.bgImage ? 'text-offwhite' : 'text-navy'}`}>
                        {step.title}
                      </h3>
                      <p className={`body-text mb-4 sm:mb-6 ${step.bgImage ? 'text-offwhite/80' : 'text-slate-custom'}`}>
                        {step.description}
                      </p>
                      <ul className="grid sm:grid-cols-2 gap-2 sm:gap-3">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className={`flex items-center gap-2 text-sm ${step.bgImage ? 'text-offwhite/70' : 'text-slate-custom'}`}>
                            <CheckCircle size={16} className="text-sand flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 mt-12 sm:mt-16">
        <div className="bg-navy rounded-xl p-6 sm:p-10 text-center">
          <h2 className="font-display font-bold text-xl sm:text-2xl text-offwhite mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="body-text text-offwhite/80 mb-6 sm:mb-8">
            Get your free consultation and treatment quote today.
          </p>
          <Link 
            to="/quote"
            className="btn-primary inline-flex items-center gap-2"
          >
            Get a Free Quote
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
