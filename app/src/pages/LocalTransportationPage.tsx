import BackButton from '../components/BackButton';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const LocalTransportationPage = () => {
  useSEO({ title: 'Local Transportation — Plan Your Trip to Albania', description: 'Getting around Tirana during your stay with ease.', canonicalPath: '/plan-trip/local-transportation' });
  const features = ['Daily clinic transfer service', 'City tours during recovery days', 'Shopping trips to local markets and malls', 'Restaurant reservations and evening transport', 'Flexible scheduling around your treatment', 'English-speaking drivers available'];
  return (
    <div className="min-h-screen bg-offwhite">

      {/* Single video background wrapping everything */}
      <div className="relative">
        {/* Video */}
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/local_transport_bg.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-navy/65" />

        {/* All page content */}
        <div className="relative z-10 pt-20 sm:pt-24 pb-16">

          {/* Back Button */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 mb-10">
            <BackButton />
          </div>

          {/* Title */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 mb-12 sm:mb-16">
            <h1 className="headline-lg text-offwhite">Local Transportation</h1>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
            <p className="body-text text-offwhite/90 mb-6 leading-relaxed">Getting around Tirana during your stay doesn't have to be a challenge. We provide dedicated local transport for all your needs — from daily clinic visits to city exploration on your recovery days.</p>
            <p className="body-text text-offwhite/90 mb-10 leading-relaxed">Tirana is a vibrant city with plenty to see and do. We make sure you can make the most of your time here, whether that's visiting a local restaurant, exploring the city centre, or simply getting to your next appointment on time.</p>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-offwhite mb-8">What's Included</h2>
            <div className="space-y-4 mb-12">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4">
                  <CheckCircle size={20} className="text-sand flex-shrink-0 mt-0.5" />
                  <p className="font-body text-offwhite text-sm leading-relaxed">{f}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="border-t border-white/20 pt-10">
              <Link to="/quote" className="btn-primary inline-flex items-center gap-2">
                Get a Free Quote <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LocalTransportationPage;
