import BackButton from '../components/BackButton';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CompositeVeneersPage = () => {
  useSEO({
    title: 'Composite Veneers in Albania — Aesthetic Tooth Correction',
    description: 'Composite veneers are thin layers of composite material placed on teeth to improve aesthetics. Available at our partner clinics in Tirana, Albania.',
    canonicalPath: '/dentistry/composite-veneers',
    keywords: 'composite veneers Albania, composite veneers Tirana price, composite veneers abroad',
  });

  const comparisons = [
    {
      aspect: 'Material',
      composite: 'Made from flexible polymeric material',
      emax: 'Made from resistant ceramic',
    },
    {
      aspect: 'Resistance',
      composite: 'Less resistant to daily pressure and use',
      emax: 'Much more resistant to pressure and daily tooth use',
    },
    {
      aspect: 'Color',
      composite: 'Color may change over time and require continuous adjustments',
      emax: 'Maintains a stable and natural color over time',
    },
    {
      aspect: 'Processing',
      composite: 'Can be processed and adjusted more easily if necessary',
      emax: 'Requires minimal processing and cannot be adjusted as easily',
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
          src="/composite_veneers.jpg"
          alt="Composite veneers procedure"
          className="w-full object-cover"
          style={{ maxHeight: '520px', objectPosition: 'center' }}
            loading="lazy" />
        <div className="absolute inset-0 bg-navy/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 pb-10 w-full">
            <h1 className="headline-lg text-offwhite">Composite Veneers</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">

        <p className="body-text text-slate-custom mb-6 leading-relaxed">
          Composite veneers are thin layers of composite material that are placed on the surface of teeth to improve their aesthetics. They are designed to correct small defects such as tooth color, shape, or spaces between them. Composite veneers are easy to apply and require relatively little time. They can be a good solution for patients who want to improve the appearance of their teeth without significant dental interventions.
        </p>

        {/* Comparison Section */}
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy mb-4 mt-10">
          Composite Veneers vs Emax Veneers
        </h2>
        <p className="body-text text-slate-custom mb-8 leading-relaxed">
          Composite veneers and Emax veneers are two different options for aesthetic tooth correction. Here are some key differences between them:
        </p>

        <div className="rounded-2xl overflow-hidden border border-navy/10 mb-10">
          {/* Table header */}
          <div className="grid grid-cols-3 bg-navy text-offwhite">
            <div className="px-5 py-4 font-display font-semibold text-sm uppercase tracking-widest"></div>
            <div className="px-5 py-4 font-display font-semibold text-sm uppercase tracking-widest border-l border-offwhite/10">Composite</div>
            <div className="px-5 py-4 font-display font-semibold text-sm uppercase tracking-widest border-l border-offwhite/10">Emax</div>
          </div>
          {/* Table rows */}
          {comparisons.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-white' : 'bg-sand/10'}`}
            >
              <div className="px-5 py-4 font-display font-semibold text-navy text-sm">{row.aspect}</div>
              <div className="px-5 py-4 body-text text-slate-custom text-sm border-l border-navy/10">{row.composite}</div>
              <div className="px-5 py-4 body-text text-slate-custom text-sm border-l border-navy/10">{row.emax}</div>
            </div>
          ))}
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

export default CompositeVeneersPage;
