import { useSEO } from '../hooks/useSEO';
import HeroSection       from '../sections/HeroSection';
import BridgeSection     from '../sections/BridgeSection';
import ServiceSection    from '../sections/ServiceSection';
import ProcessSection    from '../sections/ProcessSection';
import WhyAlbaniaSection from '../sections/WhyAlbaniaSection';
import InquirySection    from '../sections/InquirySection';
import ContactSection    from '../sections/ContactSection';

const HomePage = () => {
  useSEO({
    title: 'Medical Tourism in Albania — Dental Implants & More',
    description: 'Save up to 70% on dental implants, veneers, and full-arch restorations in Tirana, Albania. End-to-end facilitation by Septentrion Group.',
    canonicalPath: '/',
    keywords: 'dental tourism Albania, dental implants Albania, veneers Albania, medical tourism Tirana, cheap dental implants Europe, teeth abroad Albania',
  });

  return (
    <div className="relative">
      <HeroSection />
      <BridgeSection />
      <ServiceSection
        id="medical-tourism"
        title="Medical Tourism Facilitation"
        description="We connect international patients with accredited Albanian clinics—handling travel, accommodation, and on-the-ground support so you can focus on recovery."
        ctaText="See how it works" ctaLink="/how-it-works"
        imageSrc="/medical_tourism_surgery.jpg" layout="image-left" panelColor="sand"
      />
      <ServiceSection
        id="travel"
        title="Travel & Logistics"
        description="Airport transfers, medical transport, interpreter services, and recovery itineraries—managed end-to-end with one point of contact."
        ctaText="Plan your trip" ctaLink="/plan-trip"
        imageSrc="/travel_airport.jpg" layout="image-right" panelColor="navy"
      />
      <ServiceSection
        id="property"
        title="Property & Accommodation"
        description="Curated apartments and recovery stays near clinics—clean, secure, and family-friendly. Optional real-estate consulting for medical tourism investors."
        ctaText="See accommodations" ctaLink="/accommodations"
        imageSrc="/property_apartment.jpg" layout="image-left" panelColor="sand"
      />
      <WhyAlbaniaSection />
      <ProcessSection />
      <InquirySection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
