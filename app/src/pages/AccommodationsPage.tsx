import BackButton from '../components/BackButton';
import { useSEO } from '../hooks/useSEO';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Hotel, Wifi, Coffee, Shield, MapPin, Star, CheckCircle, ArrowRight } from 'lucide-react';

const AccommodationsPage = () => {
  const features = [
    { icon: MapPin,  title: 'Prime Locations',   description: 'All properties are within 15 minutes of partner clinics' },
    { icon: Wifi,    title: 'Modern Amenities',  description: 'High-speed WiFi, air conditioning, and fully equipped kitchens' },
    { icon: Shield,  title: 'Safe & Secure',     description: '24/7 security, safe neighborhoods, and emergency support' },
    { icon: Coffee,  title: 'Recovery-Friendly', description: 'Quiet environments designed for rest and recovery' },
  ];

  const accommodationTypes = [
    {
      title: 'Standard Apartments',
      description: 'Comfortable 1-2 bedroom apartments perfect for solo travelers or couples.',
      price: 'From €40/night',
      features: ['1-2 bedrooms', 'Kitchen', 'WiFi', 'Near clinics'],
      highlight: '#C9A66B',
    },
    {
      title: 'Premium Suites',
      description: 'Luxury accommodations with additional space and premium amenities.',
      price: 'From €80/night',
      features: ['2-3 bedrooms', 'Living room', 'Balcony', 'City views'],
      highlight: '#8BB8D4',
    },
    {
      title: 'Family Options',
      description: 'Spacious apartments for patients traveling with family members.',
      price: 'From €100/night',
      features: ['3+ bedrooms', 'Multiple bathrooms', 'Full kitchen', 'Laundry'],
      highlight: '#7DBD8A',
    },
  ];

  const pageRef = useRef<HTMLDivElement>(null);
  const imgRef  = useRef<HTMLImageElement>(null);

  useSEO({
    title: 'Accommodation & Recovery Stays in Tirana',
    description: 'Curated apartments and recovery stays near partner clinics in Tirana. Standard, premium, and family options from €40/night.',
    canonicalPath: '/accommodations',
    keywords: 'accommodation Albania dental tourism, apartments Tirana dental patients, recovery accommodation Albania',
  });

  useEffect(() => {
    const scrollTimer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }, 0);

    const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isMobile) return () => clearTimeout(scrollTimer);

    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (!pageRef.current || !imgRef.current) return;
        const rect = pageRef.current.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const offset = (rect.top + rect.height / 2) - window.innerHeight / 2;
        imgRef.current!.style.transform = `translate3d(0, ${offset * 0.3}px, 0)`;
      });
    };

    const listenerTimer = setTimeout(() => {
      window.addEventListener('scroll', onScroll, { passive: true });
    }, 50);

    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(listenerTimer);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={pageRef} className="relative min-h-screen overflow-hidden">
      {/* Parallax background */}
      <picture>
        <source srcSet="/accommodation_room.webp" type="image/webp" />
        <img
          ref={imgRef}
          src="/accommodation_room.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover will-change-transform pointer-events-none"
          style={{ transform: 'translate3d(0, 0, 0)', scale: '1.3' }}
          loading="lazy"
        />
      </picture>
      <div className="absolute inset-0 bg-navy/70 pointer-events-none" />

      <div className="relative z-10 pt-20 sm:pt-24 pb-16">
        {/* Back */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 mb-6">
          <BackButton />
        </div>

        {/* Hero */}
        <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 sm:py-24">
          <h1 className="headline-lg text-offwhite mb-4">Accommodations</h1>
          <p className="body-text text-offwhite/80 max-w-2xl mx-auto">
            Curated recovery stays near clinics—clean, secure, and designed for your comfort.
          </p>
        </div>

        {/* Feature cards */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 mb-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-sand/30 flex items-center justify-center mx-auto mb-4">
                    <Icon size={26} className="text-sand" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-offwhite mb-2">{feature.title}</h3>
                  <p className="body-text text-offwhite/70 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Accommodation cards — static, not clickable */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 mb-16">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-offwhite text-center mb-8 sm:mb-12">
            Our Accommodation Options
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {accommodationTypes.map((type, index) => (
              <div
                key={index}
                className="relative rounded-xl p-6 sm:p-8 overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(8px)',
                  border: `1px solid ${type.highlight}55`,
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Star size={20} style={{ color: type.highlight }} />
                  <h3 className="font-display font-bold text-lg sm:text-xl text-offwhite">{type.title}</h3>
                </div>
                <p className="body-text text-offwhite/70 text-sm mb-4">{type.description}</p>
                <p className="font-display font-bold text-lg mb-4" style={{ color: type.highlight }}>{type.price}</p>
                <ul className="space-y-2">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-offwhite/80">
                      <CheckCircle size={14} className="flex-shrink-0" style={{ color: type.highlight }} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 sm:p-10 text-center">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-offwhite mb-4">Find Your Perfect Stay</h2>
            <p className="body-text text-offwhite/80 mb-6 sm:mb-8">
              Let us recommend the best accommodation based on your treatment plan and preferences.
            </p>
            <Link to="/quote" className="btn-primary inline-flex items-center gap-2">
              Request Accommodation <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationsPage;
