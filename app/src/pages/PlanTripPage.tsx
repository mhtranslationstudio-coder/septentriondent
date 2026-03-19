import BackButton from '../components/BackButton';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';
import { Plane, Car, MapPin, Calendar, Languages, ArrowRight } from 'lucide-react';

const PlanTripPage = () => {

  const services = [
    {
      slug: 'flight-booking',
      image: '/travel_airport.jpg',
      icon: Plane,
      iconImg: '/icon_flight.png',
      title: 'Flight Booking',
      description: 'We help you find the best flights to Tirana International Airport (TIA) at the best price for your travel dates.',
    },
    {
      slug: 'airport-transfers',
      image: '/step_travel.jpg',
      icon: Car,
      iconImg: '/icon_taxi.png',
      iconStyle: { width: '140px', height: '140px', bottom: '-15px', right: '10px', opacity: 1, objectFit: 'contain' },
      title: 'Airport Transfers',
      description: 'Private transportation from airport to your accommodation and clinic, available around the clock.',
    },
    {
      slug: 'local-transportation',
      image: '/travel_greeting.jpg',
      icon: MapPin,
      iconImg: '/icon_location.png',
      title: 'Local Transportation',
      description: 'Getting around Tirana during your stay with ease — from clinic transfers to city tours.',
    },
    {
      slug: 'translation-services',
      image: '/process_medical_team.jpg',
      icon: Languages,
      iconImg: '/icon_translation.png',
      title: 'Translation Services',
      description: 'Professional interpreters for medical consultations and daily needs throughout your stay.',
    },
  ];

  const itinerary = [
    { day: 'Day 1', title: 'Arrival', desc: 'Airport pickup, check-in, rest' },
    { day: 'Day 2', title: 'Consultation', desc: 'Initial clinic visit and examination' },
    { day: 'Day 3-5', title: 'Treatment', desc: 'Main dental procedures' },
    { day: 'Day 6', title: 'Recovery', desc: 'Rest and light sightseeing' },
    { day: 'Day 7', title: 'Departure', desc: 'Final check, airport transfer' },
  ];

  useSEO({
    title: 'Plan Your Medical Trip to Albania',
    description: 'Flight assistance, airport transfers, local transport, and translation services — your end-to-end travel plan for medical treatment in Tirana.',
    canonicalPath: '/plan-trip',
  });

  return (
    <div className="min-h-screen bg-offwhite pt-20 sm:pt-24 pb-16">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 mb-6">
        <BackButton />
      </div>

      {/* Hero */}
      <div className="relative h-[50vh] sm:h-[60vh] mb-12 sm:mb-16">
        <img src="/travel_greeting.jpg" alt="Travel Services" className="w-full h-full object-cover"
            loading="lazy" />
        <div className="absolute inset-0 bg-navy/70 flex items-center justify-center">
          <div className="text-center px-4 sm:px-6">
            <h1 className="headline-lg text-offwhite mb-4">Plan Your Trip</h1>
            <p className="body-text text-offwhite/80 max-w-2xl mx-auto">
              We handle all travel logistics so you can focus on your treatment and recovery.
            </p>
          </div>
        </div>
      </div>

      {/* Services — treatment card style */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 mb-16">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy text-center mb-8 sm:mb-12">
          Travel Services
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={index}
                to={`/plan-trip/${service.slug}`}
                className="group bg-white rounded-2xl shadow-card overflow-hidden flex flex-row hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                style={{ minHeight: '190px' }}
              >
                {/* Left image */}
                <div className="relative flex-shrink-0 w-[90px] sm:w-[105px] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy" />
                </div>

                {/* Content */}
                <div className="relative flex flex-col flex-1 p-5 overflow-hidden">
                  {/* Icon watermark */}
                  {service.iconImg ? (
                    <img
                      src={service.iconImg}
                      aria-hidden="true"
                      className="absolute pointer-events-none z-0"
                      style={service.iconStyle || { width: '140px', height: '140px', bottom: '-15px', right: '-15px', opacity: 1, objectFit: 'contain' }}
            loading="lazy" />
                  ) : (
                    <Icon
                      size={100}
                      className="absolute text-black pointer-events-none"
                      style={{ bottom: '-15px', right: '-15px', opacity: 1 }}
                      aria-hidden="true"
                    />
                  )}

                  <div className="flex flex-col flex-1 relative z-10">
                    <h3 className="animated-underline font-display font-bold text-navy text-base leading-tight mb-2">
                      {service.title}
                    </h3>
                    <p className="font-body text-slate-500 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-2.5 mt-auto">
                      <span className="font-body text-sm text-navy/80 font-medium">Read More</span>
                      <span className="w-7 h-7 rounded-full bg-[#f5ede0] flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-sand">
                        <ArrowRight size={13} className="text-navy transition-transform duration-300 group-hover:-rotate-45" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Sample Itinerary */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 mb-16">
        <div className="bg-navy rounded-xl p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <Calendar size={28} className="text-sand" />
            <h2 className="font-display font-bold text-xl sm:text-2xl text-offwhite">Sample 7-Day Itinerary</h2>
          </div>
          <div className="space-y-4">
            {itinerary.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-16 sm:w-20 flex-shrink-0">
                  <span className="text-sand font-display font-semibold text-sm">{item.day}</span>
                </div>
                <div>
                  <h4 className="text-offwhite font-semibold text-sm sm:text-base">{item.title}</h4>
                  <p className="text-offwhite/70 text-xs sm:text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="bg-sand rounded-xl p-6 sm:p-10 text-center">
          <h2 className="font-display font-bold text-xl sm:text-2xl text-navy mb-4">Ready to Plan Your Journey?</h2>
          <p className="body-text text-navy/80 mb-6 sm:mb-8">Let us handle the logistics while you focus on your treatment.</p>
          <Link to="/quote" className="btn-secondary inline-flex items-center gap-2">
            Get Started <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlanTripPage;
