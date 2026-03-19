import BackButton from '../components/BackButton';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const AirportTransfersPage = () => {
  useSEO({ title: 'Airport Transfers — Plan Your Trip to Albania', description: 'Private transportation from Tirana airport to your accommodation and clinic.', canonicalPath: '/plan-trip/airport-transfers' });
  const features = ['Meet & greet service upon arrival', 'Private vehicles for comfort and privacy', 'Wheelchair accessible transport available', '24/7 availability including late-night arrivals', 'Return transfer to airport on departure', 'Experienced local drivers familiar with clinic locations'];
  return (
    <div className="min-h-screen bg-offwhite">

      {/* Single video background wrapping everything */}
      <div className="relative">
        {/* Video */}
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/airport_transfer_bg.mp4" type="video/mp4" />
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
            <h1 className="headline-lg text-offwhite">Airport Transfers</h1>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
            <p className="body-text text-offwhite/90 mb-6 leading-relaxed">We provide private transportation from Tirana International Airport directly to your accommodation and clinic. Our drivers are punctual, professional, and familiar with all our partner clinic locations across the city.</p>
            <p className="body-text text-offwhite/90 mb-10 leading-relaxed">From the moment you land, you won't need to worry about navigating public transport or finding a taxi. We take care of every transfer so your journey is seamless from start to finish.</p>
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
export default AirportTransfersPage;
