import BackButton from '../components/BackButton';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const TranslationServicesPage = () => {
  useSEO({ title: 'Translation Services — Plan Your Trip to Albania', description: 'Professional interpreters for medical consultations and daily needs throughout your stay.', canonicalPath: '/plan-trip/translation-services' });
  const features = ['Medical interpretation during all clinic consultations', 'Document translation for treatment plans and prescriptions', '24/7 phone support for urgent translation needs', 'Multilingual staff fluent in English, Italian, German and more', 'Assistance with hotel and restaurant communication', 'Post-treatment documentation translated for your home dentist'];
  return (
    <div className="min-h-screen bg-offwhite">

      {/* Single video background wrapping everything */}
      <div className="relative">
        {/* Video */}
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/translation_bg.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-navy/65" />

        {/* All page content */}
        <div className="relative z-10 pt-20 sm:pt-24 pb-16">

          {/* Back Button */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 mb-10">
            <BackButton />
          </div>

          {/* Title */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 mb-12 sm:mb-16">
            <h1 className="headline-lg text-offwhite">Translation Services</h1>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
            <p className="body-text text-offwhite/90 mb-6 leading-relaxed">Communication is at the heart of great healthcare. Our professional interpreters ensure that nothing is lost in translation during your medical consultations, giving you full confidence in every conversation with your dentist.</p>
            <p className="body-text text-offwhite/90 mb-10 leading-relaxed">Beyond the clinic, we also help with everyday needs — from ordering at a restaurant to understanding your accommodation arrangements. Our multilingual team is available around the clock to support you throughout your stay.</p>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-offwhite mb-8">What's Included</h2>
            <div className="space-y-4 mb-12">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4">
                  <CheckCircle size={20} className="text-sand flex-shrink-0 mt-0.5" />
                  <p className="font-body text-offwhite text-sm leading-relaxed">{f}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="border-t border-white/20 pt-10">
              <Link to="/quote" className="btn-primary inline-flex items-center gap-2">
                Get a Free Quote <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TranslationServicesPage;
