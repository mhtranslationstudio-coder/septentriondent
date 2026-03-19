import BackButton from '../components/BackButton';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const DentalAlignersPage = () => {
  useSEO({
    title: 'Invisalign & Dental Aligners in Albania — Clear Orthodontic Treatment',
    description: 'Invisalign uses a series of transparent aligners to correct malocclusions discreetly. Available at our partner clinics in Tirana, Albania.',
    canonicalPath: '/dentistry/dental-aligners',
  });

  const benefits = [
    {
      title: 'Virtually Invisible',
      description:
        'The aligners are virtually invisible, making them ideal for adults and teenagers who want to straighten their teeth without the aesthetic concerns associated with traditional metallic braces.',
    },
    {
      title: 'Removable & Convenient',
      description:
        'Designed to be easily removable, making them suitable for maintaining good oral hygiene. Regular removal for cleaning and repositioning promotes dental and gum health.',
    },
    {
      title: 'High-Quality Material',
      description:
        'Carefully made from high-quality polyethylene, offering an almost invisible appearance when worn — a solution that fits your lifestyle and personal preferences.',
    },
    {
      title: 'Custom-Made Fit',
      description:
        'Each aligner is custom-made to fit your teeth precisely, applying gentle and controlled pressure to guide teeth into their optimal positions.',
    },
    {
      title: 'Effective Retention',
      description:
        'Beyond straightening, the aligners maintain the correct positions of your teeth after orthodontic treatment, ensuring lasting results for years to come.',
    },
    {
      title: 'Patient Comfort',
      description:
        'The smooth, flexible plastic construction eliminates the discomfort of metal brackets and wires, offering a comfortable orthodontic experience throughout treatment.',
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
          src="/dental_aligners.jpg"
          alt="Invisalign clear dental aligners"
          className="w-full object-cover"
          style={{ maxHeight: '520px', objectPosition: 'center' }}
            loading="lazy" />
        <div className="absolute inset-0 bg-navy/55" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 pb-10 w-full">
            <h1 className="headline-lg text-offwhite">Dental Aligners</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Intro */}
        <p className="body-text text-slate-custom mb-5 leading-relaxed">
          Invisalign is a form of orthodontic treatment that works to correct various types of malocclusions through the use of a series of transparent plastic aligners. In many cases, it offers an excellent alternative for treating orthodontic problems.
        </p>
        <p className="body-text text-slate-custom mb-5 leading-relaxed">
          The aligners are virtually invisible and removable, making them ideal for adults and teenagers who want to straighten their teeth without the aesthetic concerns associated with traditional metallic braces. With Invisalign aligners, orthodontic treatment is practically "invisible".
        </p>
        <p className="body-text text-slate-custom mb-5 leading-relaxed">
          Retainers are custom-made orthodontic devices designed to maintain the correct positions of your teeth after orthodontic treatment. They apply gentle pressure, ensuring that your teeth remain in their optimal position, allowing you to enjoy the results of your orthodontic journey for years to come.
        </p>
        <p className="body-text text-slate-custom mb-12 leading-relaxed">
          The transparent aligners are carefully made from high-quality polyethylene, offering an almost invisible appearance when worn. We understand the importance of aesthetics in the modern world and aim to offer a solution that fits your lifestyle and personal preferences.
        </p>

        {/* Benefits */}
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy mb-8">
          Why Choose Invisalign?
        </h2>

        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {benefits.map((b, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-card p-6">
              <div className="w-8 h-1 bg-sand rounded-full mb-4" />
              <h3 className="font-display font-bold text-navy text-lg mb-2">{b.title}</h3>
              <p className="body-text text-slate-custom text-sm leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>

        {/* How it works summary */}
        <div className="bg-navy rounded-2xl p-8 sm:p-10 mb-10">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-offwhite mb-6">
            Comfort & Oral Hygiene
          </h2>
          <div className="space-y-5">
            {[
              'The transparent aligners are designed to be easily removable, making them suitable for maintaining good oral hygiene.',
              'Regular removal for cleaning and subsequent repositioning promotes dental and gum health, also offering patient comfort.',
              'Beyond the aesthetic aspect, these aligners are extremely effective in maintaining the correct positions of your teeth after orthodontic treatment.',
              'They apply gentle pressure, ensuring that your teeth remain in their optimal position, allowing you to enjoy the results of your orthodontic journey for years to come.',
            ].map((point, i) => (
              <div key={i} className="flex gap-4">
                <CheckCircle size={20} className="text-sand flex-shrink-0 mt-0.5" />
                <p className="font-body text-offwhite/70 text-sm leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
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

export default DentalAlignersPage;
