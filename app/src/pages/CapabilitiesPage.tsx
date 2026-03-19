import BackButton from '../components/BackButton';
import { useSEO } from '../hooks/useSEO';
import { useEffect } from 'react';
import { Globe, Code, Megaphone, Smartphone, Database, Palette, CheckCircle, ArrowRight } from 'lucide-react';

const CapabilitiesPage = () => {

  const capabilities = [
    {
      icon: Globe,
      title: 'Website Development',
      description: 'Custom websites and web applications built for healthcare and tourism businesses.',
      features: ['Responsive design', 'CMS integration', 'SEO optimization', 'Performance tuning']
    },
    {
      icon: Code,
      title: 'Patient Portals',
      description: 'Secure patient management systems for clinics and healthcare providers.',
      features: ['Appointment booking', 'Medical records', 'Secure messaging', 'Payment integration']
    },
    {
      icon: Megaphone,
      title: 'Digital Marketing',
      description: 'Comprehensive marketing strategies to grow your healthcare business.',
      features: ['SEO & SEM', 'Social media', 'Content marketing', 'Email campaigns']
    },
    {
      icon: Smartphone,
      title: 'Mobile Solutions',
      description: 'Mobile apps and responsive solutions for on-the-go access.',
      features: ['iOS & Android apps', 'Progressive web apps', 'Push notifications', 'Offline support']
    },
    {
      icon: Database,
      title: 'CRM & Workflows',
      description: 'Customer relationship management and business process automation.',
      features: ['Lead management', 'Sales pipelines', 'Automated workflows', 'Analytics dashboards']
    },
    {
      icon: Palette,
      title: 'Brand & Design',
      description: 'Professional branding and visual design for healthcare businesses.',
      features: ['Logo design', 'Brand guidelines', 'Marketing materials', 'UI/UX design']
    },
  ];

  const process = [
    { step: '1', title: 'Discovery', desc: 'Understanding your goals and requirements' },
    { step: '2', title: 'Strategy', desc: 'Planning the optimal solution approach' },
    { step: '3', title: 'Design', desc: 'Creating beautiful, user-friendly interfaces' },
    { step: '4', title: 'Development', desc: 'Building robust, scalable solutions' },
    { step: '5', title: 'Launch', desc: 'Deploying and supporting your success' },
  ];

  useSEO({
    title: 'Digital Solutions for Healthcare & Tourism',
    description: 'Websites, patient portals, CRM workflows, mobile apps, and digital marketing built for healthcare providers and medical tourism operators.',
    canonicalPath: '/capabilities',
  });

  return (
    <div className="min-h-screen bg-offwhite pt-20 sm:pt-24 pb-16">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 mb-6">
        <BackButton />
      </div>

      {/* Hero */}
      <div className="relative h-[50vh] sm:h-[60vh] mb-12 sm:mb-16">
        <img
          src="/digital_team.jpg"
          alt="Digital Team"
          className="w-full h-full object-cover"
            loading="lazy" />
        <div className="absolute inset-0 bg-navy/70 flex items-center justify-center">
          <div className="text-center px-4 sm:px-6">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-sand mb-4 sm:mb-6">
              <Code size={28} className="text-navy" />
            </div>
            <h1 className="headline-lg text-offwhite mb-4">
              Digital Capabilities
            </h1>
            <p className="body-text text-offwhite/80 max-w-2xl mx-auto">
              End-to-end digital solutions for healthcare providers and tourism businesses. 
              From websites to marketing, we've got you covered.
            </p>
          </div>
        </div>
      </div>

      {/* Capabilities Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 mb-16">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy text-center mb-8 sm:mb-12">
          What We Offer
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-card p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-sand/20 flex items-center justify-center mb-4">
                  <Icon size={24} className="text-navy" />
                </div>
                <h3 className="font-display font-bold text-lg text-navy mb-2">
                  {cap.title}
                </h3>
                <p className="body-text text-slate-custom text-sm mb-4">
                  {cap.description}
                </p>
                <ul className="space-y-1">
                  {cap.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-custom">
                      <CheckCircle size={12} className="text-sand flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Our Process */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 mb-16">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy text-center mb-8 sm:mb-12">
          Our Development Process
        </h2>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {process.map((item, index) => (
            <div key={index} className="text-center w-28 sm:w-32">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-sand flex items-center justify-center mx-auto mb-3">
                <span className="font-display font-bold text-navy text-lg">{item.step}</span>
              </div>
              <h4 className="font-display font-semibold text-navy text-sm mb-1">{item.title}</h4>
              <p className="text-xs text-slate-custom">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="bg-navy rounded-xl p-6 sm:p-10 text-center">
          <h2 className="font-display font-bold text-xl sm:text-2xl text-offwhite mb-4">
            Let's Build Something Great
          </h2>
          <p className="body-text text-offwhite/80 mb-6 sm:mb-8">
            Tell us about your project and we'll create a custom solution for your business.
          </p>
          <a 
            href="mailto:digital@septentrion.group?subject=Project%20Inquiry"
            className="btn-primary inline-flex items-center gap-2"
          >
            Start a Project
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CapabilitiesPage;
