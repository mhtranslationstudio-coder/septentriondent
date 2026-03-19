import BackButton from '../components/BackButton';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const TeethWhiteningPage = () => {
  useSEO({
    title: 'Teeth Whitening in Albania — Professional Cosmetic Dental Treatment',
    description: 'Teeth whitening is a fast, safe cosmetic treatment to improve tooth colour. Available at our partner clinics in Tirana, Albania.',
    canonicalPath: '/dentistry/teeth-whitening',
  });

  const factors = [
    {
      number: '1',
      title: 'Age',
      description:
        'Teeth become darker over time due to consumption and accumulation of pigments.',
    },
    {
      number: '2',
      title: 'Dietary Habits',
      description:
        'Frequent consumption of coffee, red wine, tea and other beverages, as well as carrots, oranges, beets and citrus fruits in general, contributes to enamel weakening.',
    },
    {
      number: '3',
      title: 'Smoking',
      description:
        'Nicotine releases pigments that slowly deposit on the tooth surface, causing stains.',
    },
    {
      number: '4',
      title: 'Medications & Chemicals',
      description:
        'The use of tetracycline during tooth development can cause dark gray or brown stains that are difficult to remove. Excessive fluoride absorption can also cause white stains.',
    },
    {
      number: '5',
      title: 'Trauma / Injuries',
      description:
        'Falls or other damage can cause cracks in teeth that favour the accumulation of stains or debris.',
    },
    {
      number: '6',
      title: 'Impact from Falls',
      description:
        'Falls create cracks in teeth that favour the accumulation of debris or stains over time.',
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
          src="/teeth_whitening.jpg"
          alt="Professional teeth whitening treatment"
          className="w-full object-cover"
          style={{ maxHeight: '520px', objectPosition: 'center' }}
            loading="lazy" />
        <div className="absolute inset-0 bg-navy/50" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 pb-10 w-full">
            <h1 className="headline-lg text-offwhite">Teeth Whitening</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Intro */}
        <p className="body-text text-slate-custom mb-10 leading-relaxed">
          Teeth whitening is a relatively simple and painless cosmetic dental treatment that aims to improve the colour of the patient's teeth. This procedure is fast and safe, and is performed under the supervision of a trained dentist to ensure quality results.
        </p>

        {/* Factors */}
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy mb-4">
          Factors Associated with Tooth Colour Change
        </h2>
        <p className="body-text text-slate-custom mb-8 leading-relaxed">
          Understanding what causes discolouration can help you prevent it and choose the right treatment:
        </p>

        <div className="space-y-4 mb-14">
          {factors.map((f) => (
            <div key={f.number} className="flex gap-5 bg-white rounded-2xl shadow-card p-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sand flex items-center justify-center">
                <span className="font-display font-bold text-navy text-base">{f.number}</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-navy text-lg mb-1">{f.title}</h3>
                <p className="body-text text-slate-custom text-sm leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing note */}
        <div className="bg-sand/20 rounded-2xl p-8 sm:p-10 mb-10">
          <p className="body-text text-slate-custom leading-relaxed">
            Teeth whitening can be an effective solution for improving the appearance of teeth, but it is important to consult a qualified professional to determine if it is the right treatment for you.
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

export default TeethWhiteningPage;
