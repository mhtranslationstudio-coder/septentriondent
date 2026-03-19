import BackButton from '../components/BackButton';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const FlightBookingPage = () => {
  useSEO({ title: 'Flight Booking — Plan Your Trip to Albania', description: 'We help you find the best flights to Tirana International Airport.', canonicalPath: '/plan-trip/flight-booking' });
  const features = ['Flight recommendations tailored to your treatment dates', 'Flexible date options to match your schedule', 'Best price searches across major airlines', 'Full booking assistance from start to finish', 'Connections via major European hubs', 'Support for group bookings and companions'];
  return (
    <div className="min-h-screen bg-offwhite">

      {/* Single video background wrapping everything */}
      <div className="relative">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/flight_bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-navy/65" />

        <div className="relative z-10 pt-20 sm:pt-24 pb-16">

          {/* Back Button */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 mb-10">
            <BackButton />
          </div>

          {/* Title */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 mb-12 sm:mb-16">
            <h1 className="headline-lg text-offwhite">Flight Booking</h1>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
            <p className="body-text text-offwhite/90 mb-6 leading-relaxed">We help you find the best flights to Tirana International Airport (TIA). Our team searches across major carriers and routes to get you the most convenient and cost-effective options for your travel dates.</p>
            <p className="body-text text-offwhite/90 mb-10 leading-relaxed">Whether you're travelling alone or with a companion, we coordinate your flights around your treatment schedule to ensure a stress-free journey from the moment you leave home.</p>
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
export default FlightBookingPage;
