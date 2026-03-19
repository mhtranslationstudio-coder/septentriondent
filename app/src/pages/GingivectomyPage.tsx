import BackButton from '../components/BackButton';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const GingivectomyPage = () => {
  useSEO({
    title: 'Gingivectomy in Albania — Gum Reshaping & Periodontal Treatment',
    description: 'Gingivectomy is a surgical procedure to remove excess gum tissue for aesthetic or health reasons. Available at our partner clinics in Tirana, Albania.',
    canonicalPath: '/dentistry/gingivectomy',
  });

  return (
    <div className="min-h-screen bg-offwhite pt-20 sm:pt-24 pb-16">

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 mb-6">
        <BackButton />
      </div>

      {/* Hero Image */}
      <div className="relative w-full mb-12 sm:mb-16" style={{ maxHeight: '520px', overflow: 'hidden' }}>
        <img
          src="/gingivectomy.jpg"
          alt="Gingivectomy procedure"
          className="w-full object-cover"
          style={{ maxHeight: '520px', objectPosition: 'center' }}
            loading="lazy" />
        <div className="absolute inset-0 bg-navy/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 pb-10 w-full">
            <h1 className="headline-lg text-offwhite">Gingivectomy</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">

        <div className="prose prose-lg max-w-none">
          <p className="body-text text-slate-custom mb-6 leading-relaxed">
            Gingivectomy is a surgical procedure used to remove excessive portions of gums around the teeth. This procedure can be performed for aesthetic reasons, to improve dental hygiene, or to treat gum diseases such as periodontitis.
          </p>

          <p className="body-text text-slate-custom mb-6 leading-relaxed">
            During gingivectomy, the surgeon removes the excess portion of the gums and shapes a new gingival profile to fit the teeth. This can be done using a surgical scalpel, laser, or other specialized instruments. After the procedure, sutures may be applied if necessary to close the treated area.
          </p>

          <p className="body-text text-slate-custom mb-10 leading-relaxed">
            Gingivectomy is a relatively simple and safe procedure, but it must be performed by a specialist in dentistry or an oral surgeon to minimize the risk of complications. After the procedure, it is necessary to follow oral hygiene instructions and visit the dentist regularly to monitor the healing process.
          </p>
        </div>

        {/* CTA */}
        <div className="border-t border-navy/10 pt-10 mt-4">
          <Link to="/quote" className="btn-primary inline-flex items-center gap-2">
            Get a Free Quote
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default GingivectomyPage;
