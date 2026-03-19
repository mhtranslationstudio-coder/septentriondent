import BackButton from '../components/BackButton';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const TeethCleaningPage = () => {
  useSEO({
    title: 'Teeth Cleaning in Albania — Professional Dental Hygiene',
    description: 'Professional teeth cleaning removes plaque, tartar and surface stains, helping prevent cavities and gum disease. Available in Tirana, Albania.',
    canonicalPath: '/dentistry/teeth-cleaning',
  });

  const highlights = [
    'Removes plaque, tartar and surface stains for a clean, smooth finish',
    'Helps prevent cavities, gingivitis and more serious gum disease',
    'Personalised oral hygiene advice to maintain results between visits',
    'Latest technologies and methodologies used by expert dental professionals',
    'Rigorous sterilisation and hygiene protocols for a safe environment',
    'Welcoming, relaxing atmosphere designed for patient comfort',
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
          src="/teeth_cleaning.jpg"
          alt="Professional teeth cleaning treatment"
          className="w-full object-cover"
          style={{ maxHeight: '520px', objectPosition: 'center' }}
            loading="lazy" />
        <div className="absolute inset-0 bg-navy/55" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 pb-10 w-full">
            <h1 className="headline-lg text-offwhite">Teeth Cleaning</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Intro paragraphs */}
        <p className="body-text text-slate-custom mb-5 leading-relaxed">
          Teeth cleaning is an essential treatment for maintaining optimal dental health and a bright smile. Our teeth cleaning service offers a professional and comfortable experience, providing complete and effective dental hygiene.
        </p>
        <p className="body-text text-slate-custom mb-5 leading-relaxed">
          Our expert dentists are highly qualified and dedicated to ensuring that every patient receives personalised and high-quality treatment. We use the latest technologies and methodologies to remove plaque, tartar and surface stains from teeth, leaving them clean and smooth to the touch.
        </p>
        <p className="body-text text-slate-custom mb-12 leading-relaxed">
          Regular teeth cleaning not only improves the appearance of your smile, but also helps prevent a range of dental problems, such as cavities, gingivitis and more serious gum disease. During the cleaning session, our professionals offer advice and suggestions for proper oral hygiene at home, helping you maintain your dental health between visits.
        </p>

        {/* Highlights */}
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy mb-8">
          What Our Service Includes
        </h2>

        <div className="bg-white rounded-2xl shadow-card p-8 mb-10">
          <div className="space-y-5">
            {highlights.map((point, i) => (
              <div key={i} className="flex gap-4">
                <CheckCircle size={20} className="text-sand flex-shrink-0 mt-0.5" />
                <p className="body-text text-slate-custom text-sm leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing statement */}
        <div className="bg-navy rounded-2xl p-8 sm:p-10 mb-10">
          <p className="body-text text-offwhite/80 leading-relaxed mb-4">
            At our clinic, we are committed to creating a welcoming and relaxing environment for our patients, where they can feel comfortable during every stage of treatment. Your safety and well-being are our absolute priority, and we ensure we adopt rigorous sterilisation and hygiene protocols to guarantee a safe and risk-free environment.
          </p>
          <p className="font-display font-semibold text-offwhite text-lg leading-snug">
            Trust our teeth cleaning service to achieve a radiant smile and lasting dental health.
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

export default TeethCleaningPage;
