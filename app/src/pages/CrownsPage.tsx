import BackButton from '../components/BackButton';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CrownsPage = () => {
  useSEO({
    title: 'Zirconia & Porcelain Crowns in Albania — Durable Aesthetic Restorations',
    description: 'Zirconia crowns offer exceptional aesthetics, strength and biocompatibility. Available at our partner clinics in Tirana, Albania.',
    canonicalPath: '/dentistry/crowns',
    keywords: 'dental crowns Albania, zirconia crowns Tirana, dental crowns abroad price, porcelain crowns Albania',
  });

  const benefits = [
    {
      title: 'Aesthetics',
      description:
        'Zirconia crowns are aesthetic and similar to the color of natural teeth, making them an ideal solution for those who want to create a natural smile.',
    },
    {
      title: 'Strength & Durability',
      description:
        'Zirconia is a very strong and resistant material, making zirconia crowns highly durable. They are more resistant to breakage and contamination than traditional metal-ceramic crowns.',
    },
    {
      title: 'Customisation',
      description:
        'Zirconia crowns can be shaped to perfectly fit the shape and size of the patient\'s teeth, offering a perfect and comfortable appearance.',
    },
    {
      title: 'Biocompatibility',
      description:
        'Zirconia is a biocompatible material — safe and free from negative reactions in surrounding gum tissues. This makes it ideal for patients with gum sensitivity or allergies.',
    },
    {
      title: 'Colour Stability',
      description:
        'Zirconia crowns are designed to maintain their natural colour over time, without fading or changing.',
    },
    {
      title: 'Function Restoration',
      description:
        'Zirconia crowns improve the function of damaged or lost teeth, offering an ideal solution for patients with dental deficiencies.',
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
          src="/dental_crowns.jpg"
          alt="Zirconia and porcelain crowns"
          className="w-full object-cover"
          style={{ maxHeight: '520px', objectPosition: 'center top' }}
            loading="lazy" />
        <div className="absolute inset-0 bg-navy/45" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 pb-10 w-full">
            <h1 className="headline-lg text-offwhite">Crowns (Zirconium / Porcelain)</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Intro */}
        <p className="body-text text-slate-custom mb-10 leading-relaxed">
          Zirconia crowns are dental crowns that use materials based on zirconium oxide — a strong and resistant material. These crowns offer excellent aesthetics and are a very good solution for repairing and improving the appearance of damaged or broken teeth.
        </p>

        {/* Benefits grid */}
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy mb-8">
          Benefits of Zirconia Crowns
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

        {/* Comparison */}
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy mb-6">
          Metal-Ceramic vs Zirconia Crowns
        </h2>
        <p className="body-text text-slate-custom mb-6 leading-relaxed">
          A key difference between metal-ceramic and zirconia crowns lies in the materials used to create their structure.
        </p>

        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          {/* Metal-ceramic */}
          <div className="bg-white rounded-2xl shadow-card p-6 border-t-4 border-navy/30">
            <h3 className="font-display font-bold text-navy text-lg mb-3">Metal-Ceramic Crowns</h3>
            <p className="body-text text-slate-custom text-sm leading-relaxed">
              Composed of a metal structure (such as nickel or chromium) covered with a layer of ceramic to create the aesthetic appearance of the tooth. A disadvantage is that they are not aesthetically as natural as zirconia or Emax crowns.
            </p>
          </div>
          {/* Zirconia */}
          <div className="bg-white rounded-2xl shadow-card p-6 border-t-4 border-sand">
            <h3 className="font-display font-bold text-navy text-lg mb-3">Zirconia Crowns</h3>
            <p className="body-text text-slate-custom text-sm leading-relaxed">
              Use zirconia as the basic structure — a strong and resistant material that adapts to the colour and shape of natural teeth. Zirconia crowns are more translucent and similar to natural teeth than metal-ceramic crowns.
            </p>
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

export default CrownsPage;
