import BackButton from '../components/BackButton';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const DentalImplantsPage = () => {
  useSEO({
    title: 'Dental Implants in Albania — Implantology & Full Arch Restoration',
    description: 'Dental implants are artificial tooth roots placed in the jaw to support prosthetic teeth. Available at our partner clinics in Tirana, Albania.',
    canonicalPath: '/dentistry/dental-implants',
    keywords: 'dental implants Albania price, dental implants Tirana, cheap dental implants Albania, All-on-4 Albania, dental implants abroad',
  });

  const cases = [
    {
      number: '1',
      title: 'Single Tooth Replacement',
      description:
        'If you have lost a tooth, the implantologist can place a dental implant in the bone and place a custom dental crown on top of it. This offers a permanent, functional and aesthetic solution to replace the lost tooth.',
    },
    {
      number: '2',
      title: 'Multiple Tooth Replacement',
      description:
        'If you have lost multiple teeth, implants can be placed to support a fixed dental bridge. Dental bridges are a series of crowns connected together and supported by implants, which replace a group of lost teeth.',
    },
    {
      number: '3',
      title: 'Full Tooth Replacement',
      description:
        'In cases where all teeth in an arch are lost, the best option is to place several implants (usually 6 to 8 implants per arch) and apply a full denture on top. The implants will support and hold the full denture in place, offering a stable and functional solution for the patient.',
    },
  ];

  const tips = [
    {
      title: 'Consult a Specialist',
      description:
        'Before starting implant treatment, it is important to consult a professional implantologist. They will make a comprehensive assessment of your dental situation and provide appropriate treatment recommendations.',
    },
    {
      title: 'Maintain Good Oral Hygiene',
      description:
        'After implant placement, it is important to maintain good oral hygiene to prevent gum inflammation and infections. Brush your teeth twice a day, use mouthwash and visit your dentist for professional cleaning.',
    },
    {
      title: 'Avoid Smoking',
      description:
        'Smoking should be avoided after implant placement, as smoking can affect bone and gum healing and cause complications. It is also important to limit alcohol consumption and maintain a balanced and healthy diet to support healing.',
    },
    {
      title: 'Have Regular Dental Check-ups',
      description:
        'Regular visits to your dentist are essential to monitor the health of your implants and surrounding tissue, ensuring long-term success.',
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
          src="/dental_implants.jpg"
          alt="Dental implant procedure"
          className="w-full object-cover"
          style={{ maxHeight: '520px', objectPosition: 'center' }}
            loading="lazy" />
        <div className="absolute inset-0 bg-navy/50" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 pb-10 w-full">
            <h1 className="headline-lg text-offwhite">Dental Implants</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Intro */}
        <p className="body-text text-slate-custom mb-10 leading-relaxed">
          Implantology is a branch of dentistry that focuses on the placement and reconstruction of dental implants. Dental implants are artificial tooth roots that are placed in the bone (jaw and maxilla) to support prosthetic teeth or dental bridges. They are a very effective solution for replacing lost teeth, as they provide a stable base for missing teeth, appearing, feeling and functioning like natural teeth. Implantology requires specialized training and expertise to ensure successful implant placement and long-term results.
        </p>

        {/* When are implants placed */}
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy mb-6">
          When Are Dental Implants Placed?
        </h2>
        <p className="body-text text-slate-custom mb-8 leading-relaxed">
          There are several different cases to consider. Here are some of them:
        </p>

        <div className="space-y-5 mb-14">
          {cases.map((c) => (
            <div key={c.number} className="flex gap-5 bg-white rounded-2xl shadow-card p-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sand flex items-center justify-center">
                <span className="font-display font-bold text-navy text-base">{c.number}</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-navy text-lg mb-2">{c.title}</h3>
                <p className="body-text text-slate-custom text-sm leading-relaxed">{c.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="bg-navy rounded-2xl p-8 sm:p-10 mb-10">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-offwhite mb-8">
            Useful Tips for Dental Implants
          </h2>
          <div className="space-y-6">
            {tips.map((tip, i) => (
              <div key={i} className="flex gap-4">
                <CheckCircle size={20} className="text-sand flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-body font-semibold text-offwhite text-sm mb-1">{tip.title}</p>
                  <p className="font-body text-offwhite/60 text-sm leading-relaxed">{tip.description}</p>
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

export default DentalImplantsPage;
