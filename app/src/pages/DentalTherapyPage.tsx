import BackButton from '../components/BackButton';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const DentalTherapyPage = () => {
  useSEO({
    title: 'Dental Therapy in Albania — Fillings, Crowns, Endodontics & More',
    description: 'Dental therapy covers a wide range of non-surgical treatments to restore teeth compromised by cavities, fractures, or other dental problems.',
    canonicalPath: '/dentistry/therapy',
  });

  const treatments = [
    {
      number: '1',
      title: 'Dental Fillings',
      description:
        'We use safe and durable materials to fill cavities caused by decay, restoring the shape and function of the damaged tooth.',
    },
    {
      number: '2',
      title: 'Dental Crowns',
      description:
        'Crowns are prostheses that cover and protect a damaged or weakened tooth, restoring its aesthetic appearance and functionality.',
    },
    {
      number: '3',
      title: 'Dental Bridges',
      description:
        'Dental bridges replace one or more missing teeth, restoring the harmony of the smile and the ability to chew properly.',
    },
    {
      number: '4',
      title: 'Endodontics (Root Canal Treatment)',
      description:
        'This treatment is aimed at removing infection from the soft tissue inside the tooth, preserving its structure and preventing extraction.',
    },
    {
      number: '5',
      title: 'Teeth Whitening',
      description:
        'We offer professional whitening treatments to remove stains and discoloration from teeth, restoring their bright and uniform appearance.',
    },
    {
      number: '6',
      title: 'Treatments for Tooth Sensitivity',
      description:
        'We use various techniques and materials to reduce tooth sensitivity caused by root exposure, cavities, or other factors.',
    },
  ];

  return (
    <div className="min-h-screen bg-offwhite pt-20 sm:pt-24 pb-16">

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 mb-6">
        <BackButton />
      </div>

      {/* Hero Image */}
      <div className="relative w-full mb-12 sm:mb-16" style={{ maxHeight: '520px', overflow: 'hidden' }}>
        <img
          src="/bridge_consultation.jpg"
          alt="Dental therapy"
          className="w-full object-cover"
          style={{ maxHeight: '520px', objectPosition: 'center' }}
            loading="lazy" />
        <div className="absolute inset-0 bg-navy/50" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 pb-10 w-full">
            <h1 className="headline-lg text-offwhite">Dental Therapy</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Intro */}
        <p className="body-text text-slate-custom mb-6 leading-relaxed">
          Dental therapy represents a set of non-surgical treatments aimed at restoring the health and functionality of teeth compromised by cavities, fractures, or other dental problems. In our clinic, we offer a wide range of dental therapies, performed with care and precision by experienced professionals to ensure lasting and satisfactory results.
        </p>
        <p className="body-text text-slate-custom mb-10 leading-relaxed">
          Our qualified dentists carefully assess each patient's needs and develop a personalized treatment plan to address their specific dental conditions. We use state-of-the-art materials and innovative techniques to provide effective and lasting therapies, while ensuring maximum comfort during treatment.
        </p>

        {/* Treatments list */}
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy mb-8">
          Treatments We Offer
        </h2>

        <div className="space-y-5 mb-14">
          {treatments.map((t) => (
            <div key={t.number} className="flex gap-5 bg-white rounded-2xl shadow-card p-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sand flex items-center justify-center">
                <span className="font-display font-bold text-navy text-base">{t.number}</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-navy text-lg mb-2">{t.title}</h3>
                <p className="body-text text-slate-custom text-sm leading-relaxed">{t.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <div className="bg-sand/20 rounded-2xl p-8 sm:p-10 mb-10">
          <p className="body-text text-slate-custom leading-relaxed mb-4">
            We are committed to providing a welcoming and relaxing environment for our patients, where they can feel comfortable during every phase of treatment. Your health and well-being are our absolute priority, and we strive to ensure a positive and stress-free experience at every visit.
          </p>
          <p className="body-text text-slate-custom leading-relaxed">
            Trust our dental therapy to restore the health and beauty of your smile. Book a visit to our clinic today and take the first step towards better dental health and a radiant smile.
          </p>
        </div>

        {/* CTA */}
        <div className="border-t border-navy/10 pt-10">
          <Link to="/quote" className="btn-primary inline-flex items-center gap-2">
            Get a Free Quote
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default DentalTherapyPage;
