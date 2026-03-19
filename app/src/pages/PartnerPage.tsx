import BackButton from '../components/BackButton';
import { useSEO } from '../hooks/useSEO';

import { Link } from 'react-router-dom';
import { Handshake, Building2, Plane, Hotel, Stethoscope, ArrowRight, CheckCircle } from 'lucide-react';

const PartnerPage = () => {

  const partnerTypes = [
    {
      icon: Stethoscope,
      title: 'Medical Clinics',
      description: 'Join our network of accredited dental, cosmetic, and medical clinics serving international patients.',
      benefits: ['Increased patient volume', 'Marketing support', 'Translation services', 'Logistics coordination']
    },
    {
      icon: Hotel,
      title: 'Hotels & Accommodation',
      description: 'Provide comfortable recovery stays for medical tourists visiting Albania.',
      benefits: ['Steady booking stream', 'Longer average stays', 'Premium pricing', 'International exposure']
    },
    {
      icon: Plane,
      title: 'Transportation Services',
      description: 'Airport transfers, medical transport, and patient mobility solutions.',
      benefits: ['Regular client base', 'Scheduled bookings', 'Professional network', 'Growth opportunities']
    },
    {
      icon: Building2,
      title: 'Insurance Providers',
      description: 'Partner with us to offer medical tourism coverage to your clients.',
      benefits: ['New product offerings', 'Risk assessment support', 'Claims coordination', 'Market expansion']
    },
  ];

  useSEO({
    title: 'Become a Partner',
    description: 'Join the Septentrion Group partner network. We connect clinics, hotels, transport providers, and insurers with international medical tourists in Albania.',
    canonicalPath: '/partner',
  });

  return (
    <div className="min-h-screen bg-offwhite pt-20 sm:pt-24 pb-16">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 mb-6">
        <BackButton />
      </div>

      {/* Hero Section */}
      <div className="relative h-[50vh] sm:h-[60vh] mb-12 sm:mb-16">
        <img
          src="/partnership.jpg"
          alt="Partnership"
          className="w-full h-full object-cover"
            loading="lazy" />
        <div className="absolute inset-0 bg-navy/60 flex items-center justify-center">
          <div className="text-center px-4 sm:px-6">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-sand mb-4 sm:mb-6">
              <Handshake size={28} className="text-navy" />
            </div>
            <h1 className="headline-lg text-offwhite mb-4">
              Become a Partner
            </h1>
            <p className="body-text text-offwhite/80 max-w-2xl mx-auto">
              Join Septentrion Group's network of trusted providers and grow your business 
              with international medical tourism.
            </p>
          </div>
        </div>
      </div>

      {/* Partner Types */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 mb-16">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {partnerTypes.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <div 
                key={index} 
                className="group bg-white rounded-xl shadow-card p-6 sm:p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-sand/20 flex items-center justify-center flex-shrink-0 group-hover:bg-sand transition-colors">
                    <Icon size={24} className="text-navy" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-navy mb-2">
                      {partner.title}
                    </h3>
                    <p className="body-text text-slate-custom text-sm sm:text-base">
                      {partner.description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 ml-16">
                  {partner.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-custom">
                      <CheckCircle size={14} className="text-sand flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="bg-navy rounded-xl p-6 sm:p-10 text-center">
          <h2 className="font-display font-bold text-xl sm:text-2xl text-offwhite mb-4">
            Ready to Partner With Us?
          </h2>
          <p className="body-text text-offwhite/80 mb-6 sm:mb-8">
            Fill out our partnership inquiry form and our team will contact you within 48 hours 
            to discuss collaboration opportunities.
          </p>
          <Link
            to="/partner/apply"
            className="btn-primary inline-flex items-center gap-2"
          >
            Apply Now
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PartnerPage;
