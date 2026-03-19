import BackButton from '../components/BackButton';
import { useSEO } from '../hooks/useSEO';

import { Headphones, Users, Phone, Mail, MessageCircle, BarChart3, CheckCircle, ArrowRight } from 'lucide-react';

const OutsourcingPage = () => {

  const services = [
    {
      icon: Phone,
      title: 'Inbound Support',
      description: 'Professional customer service handling inquiries, complaints, and support requests.',
      features: ['24/7 availability', 'Multilingual agents', 'CRM integration', 'Quality monitoring']
    },
    {
      icon: MessageCircle,
      title: 'Outbound Campaigns',
      description: 'Sales, lead generation, and customer outreach campaigns.',
      features: ['Lead qualification', 'Appointment setting', 'Survey conducting', 'Follow-up calls']
    },
    {
      icon: Mail,
      title: 'Email & Chat Support',
      description: 'Digital customer service through email, live chat, and messaging platforms.',
      features: ['Fast response times', 'Template management', 'Escalation protocols', 'Analytics reporting']
    },
    {
      icon: BarChart3,
      title: 'Back Office Operations',
      description: 'Data entry, processing, and administrative support services.',
      features: ['Data processing', 'Document management', 'Quality assurance', 'Scalable teams']
    },
  ];

  const advantages = [
    'Cost savings up to 60% compared to Western Europe',
    'EU timezone alignment for European clients',
    'Multilingual workforce (English, Italian, Greek, Albanian)',
    'Highly educated talent pool',
    'Modern infrastructure and technology',
    'Cultural affinity with European markets'
  ];

  useSEO({
    title: 'BPO & Call Center Outsourcing in Albania',
    description: 'Nearshore BPO services from Albania. Inbound support, outbound campaigns, email & chat, and back-office operations. Save up to 60% vs Western Europe.',
    canonicalPath: '/outsourcing',
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
          src="/bpo_team.jpg"
          alt="BPO Team"
          className="w-full h-full object-cover"
            loading="lazy" />
        <div className="absolute inset-0 bg-navy/70 flex items-center justify-center">
          <div className="text-center px-4 sm:px-6">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-sand mb-4 sm:mb-6">
              <Headphones size={28} className="text-navy" />
            </div>
            <h1 className="headline-lg text-offwhite mb-4">
              BPO & Outsourcing
            </h1>
            <p className="body-text text-offwhite/80 max-w-2xl mx-auto">
              Nearshore business process outsourcing from Albania. Quality service, 
              competitive costs, European timezone.
            </p>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 mb-16">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy text-center mb-8 sm:mb-12">
          Our Services
        </h2>
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-card p-6 sm:p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-sand/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={24} className="text-navy" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-navy mb-2">
                      {service.title}
                    </h3>
                    <p className="body-text text-slate-custom text-sm sm:text-base">
                      {service.description}
                    </p>
                  </div>
                </div>
                <ul className="grid grid-cols-2 gap-2 ml-16">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-custom">
                      <CheckCircle size={14} className="text-sand flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why Albania */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 mb-16">
        <div className="bg-navy rounded-xl p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <Users size={28} className="text-sand" />
            <h2 className="font-display font-bold text-xl sm:text-2xl text-offwhite">
              Why Outsource to Albania?
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {advantages.map((advantage, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle size={18} className="text-sand flex-shrink-0 mt-0.5" />
                <span className="text-offwhite/90 text-sm sm:text-base">{advantage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="bg-sand rounded-xl p-6 sm:p-10 text-center">
          <h2 className="font-display font-bold text-xl sm:text-2xl text-navy mb-4">
            Ready to Reduce Your Costs?
          </h2>
          <p className="body-text text-navy/80 mb-6 sm:mb-8">
            Let's discuss how our BPO services can help your business grow.
          </p>
          <a 
            href="mailto:business@septentrion.group?subject=BPO%20Inquiry"
            className="btn-secondary inline-flex items-center gap-2"
          >
            Request a Consultation
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default OutsourcingPage;
