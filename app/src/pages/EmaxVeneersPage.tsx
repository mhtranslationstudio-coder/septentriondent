import BackButton from '../components/BackButton';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const EmaxVeneersPage = () => {
  useSEO({
    title: 'Emax Veneers in Albania — Lithium Disilicate Ceramic Veneers',
    description: 'Emax veneers are thin ceramic layers placed on teeth to improve aesthetics. Extremely strong, durable and natural-looking. Available in Tirana, Albania.',
    canonicalPath: '/dentistry/emax-veneers',
    keywords: 'emax veneers Albania, porcelain veneers Tirana, veneers abroad Albania, smile makeover Albania cost',
  });

  const corrections = [
    {
      title: 'Tooth Colour',
      description:
        'Veneers can be used to change or improve tooth colour. They are effective in hiding black, yellow or other tooth discolourations.',
    },
    {
      title: 'Tooth Shape',
      description:
        'If you have irregularly shaped or deformed teeth, veneers can give them perfect shape and symmetry.',
    },
    {
      title: 'Tooth Size',
      description:
        'If you have small or short teeth, veneers can lengthen or correct them to match other teeth.',
    },
    {
      title: 'Spaces Between Teeth',
      description:
        'Veneers can be used to fill spaces between teeth and create aesthetic harmony.',
    },
    {
      title: 'Broken Teeth',
      description:
        'If you have broken or damaged teeth, veneers can correct them and give them an attractive appearance.',
    },
  ];

  const advantages = [
    {
      title: 'Natural Appearance',
      description:
        'Emax veneers closely resemble the natural structure of teeth, making them very natural and adaptable to other teeth.',
    },
    {
      title: 'Stable Colour',
      description:
        'The colour of Emax veneers is stable over time and does not change. They will maintain a beautiful appearance of your teeth for a long time.',
    },
    {
      title: 'High Resistance',
      description:
        'Emax veneers are very resistant to pressure and daily tooth wear. They are durable and can last for many years with regular care.',
    },
    {
      title: 'Minimal Preparation',
      description:
        'To place Emax veneers, only minimal preparation of the tooth structure is required, compared to traditional methods. This makes the process more comfortable and faster.',
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
          src="/emax_veneers.jpg"
          alt="Emax veneers — lithium disilicate ceramic"
          className="w-full object-cover"
          style={{ maxHeight: '520px', objectPosition: 'center' }}
            loading="lazy" />
        <div className="absolute inset-0 bg-navy/55" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 pb-10 w-full">
            <h1 className="headline-lg text-offwhite">Emax Veneers</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Intro */}
        <p className="body-text text-slate-custom mb-5 leading-relaxed">
          Emax veneers are thin layers prepared in the laboratory and placed on the surface of teeth to improve their appearance. These veneers are made with a particular type of ceramic material called lithium disilicate (Emax).
        </p>
        <p className="body-text text-slate-custom mb-5 leading-relaxed">
          Emax veneers are extremely strong and durable over time, offering excellent aesthetic results. They are suitable for correcting various tooth defects, such as colour, shape, size, spaces between teeth or to improve the appearance of broken teeth.
        </p>
        <p className="body-text text-slate-custom mb-12 leading-relaxed">
          The procedure for placing Emax veneers requires light preparation of the tooth surface, taking an impression and then applying the veneers with the corresponding adhesive. After placement, Emax veneers are suitable for permanent use and require regular oral care to extend their lifespan.
        </p>

        {/* What can be corrected */}
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy mb-8">
          What Can Emax Veneers Correct?
        </h2>

        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {corrections.map((c, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-card p-6">
              <div className="w-8 h-1 bg-sand rounded-full mb-4" />
              <h3 className="font-display font-bold text-navy text-lg mb-2">{c.title}</h3>
              <p className="body-text text-slate-custom text-sm leading-relaxed">{c.description}</p>
            </div>
          ))}
        </div>

        {/* Advantages */}
        <div className="bg-navy rounded-2xl p-8 sm:p-10 mb-10">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-offwhite mb-8">
            Advantages of Emax Veneers
          </h2>
          <div className="space-y-6">
            {advantages.map((a, i) => (
              <div key={i} className="flex gap-4">
                <CheckCircle size={20} className="text-sand flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-body font-semibold text-offwhite text-sm mb-1">{a.title}</p>
                  <p className="font-body text-offwhite/60 text-sm leading-relaxed">{a.description}</p>
                </div>
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

export default EmaxVeneersPage;
