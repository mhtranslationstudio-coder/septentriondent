import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { useEffect, useLayoutEffect } from 'react';
import { ScrollTrigger } from './lib/gsap';
import Navigation from './sections/Navigation';
import Footer from './sections/Footer';
import ScrollProgress from './components/ScrollProgress';
import CookieConsent from './components/CookieConsent';
import WhatsAppButton from './components/WhatsAppButton';
import './App.css';

declare global {
  interface Window { __scrollPositions?: Record<string, number>; }
}

// Let browser handle back/forward scroll natively
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'auto';
}

// Simple scroll position store for Back button restoration only
const scrollPositions: Record<string, number> = {};
window.__scrollPositions = scrollPositions;

function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  // useLayoutEffect fires synchronously BEFORE the browser paints —
  // the user never sees the old scroll position on the new page
  useLayoutEffect(() => {
    if (window.location.hash) return;

    if (navType === 'POP') {
      // Back button — restore saved position
      const saved = scrollPositions[pathname] ?? 0;
      window.scrollTo(0, saved);
      document.documentElement.scrollTop = saved;
      document.body.scrollTop = saved;
    } else {
      // Any forward navigation — reset to top immediately
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

    ScrollTrigger.refresh();
  }, [pathname, navType]);

  // Save position when leaving a page (for Back button)
  useEffect(() => {
    return () => {
      if (window.scrollY > 50) {
        scrollPositions[pathname] = window.scrollY;
      }
    };
  }, [pathname]);

  return null;
}

// Eagerly load the home page (primary landing); lazy-load everything else
import HomePage from './pages/HomePage';

const QuotePage               = lazy(() => import('./pages/QuotePage'));
const TermsPage               = lazy(() => import('./pages/TermsPage'));
const PrivacyPage             = lazy(() => import('./pages/PrivacyPage'));
const CookiesPage             = lazy(() => import('./pages/CookiesPage'));
const PartnerPage             = lazy(() => import('./pages/PartnerPage'));
const PartnerApplicationPage  = lazy(() => import('./pages/PartnerApplicationPage'));
const DentistryPage           = lazy(() => import('./pages/DentistryPage'));
const GingivectomyPage        = lazy(() => import('./pages/GingivectomyPage'));
const CompositeVeneersPage    = lazy(() => import('./pages/CompositeVeneersPage'));
const DentalImplantsPage      = lazy(() => import('./pages/DentalImplantsPage'));
const DentalTherapyPage       = lazy(() => import('./pages/DentalTherapyPage'));
const CrownsPage              = lazy(() => import('./pages/CrownsPage'));
const TeethWhiteningPage      = lazy(() => import('./pages/TeethWhiteningPage'));
const EmaxVeneersPage         = lazy(() => import('./pages/EmaxVeneersPage'));
const DentalAlignersPage      = lazy(() => import('./pages/DentalAlignersPage'));
const TeethCleaningPage       = lazy(() => import('./pages/TeethCleaningPage'));
const FlightBookingPage       = lazy(() => import('./pages/FlightBookingPage'));
const AirportTransfersPage    = lazy(() => import('./pages/AirportTransfersPage'));
const LocalTransportationPage = lazy(() => import('./pages/LocalTransportationPage'));
const TranslationServicesPage = lazy(() => import('./pages/TranslationServicesPage'));
const HowItWorksPage          = lazy(() => import('./pages/HowItWorksPage'));
const OutsourcingPage         = lazy(() => import('./pages/OutsourcingPage'));
const CapabilitiesPage        = lazy(() => import('./pages/CapabilitiesPage'));
const PlanTripPage            = lazy(() => import('./pages/PlanTripPage'));
const AccommodationsPage      = lazy(() => import('./pages/AccommodationsPage'));
const CompareCostsPage        = lazy(() => import('./pages/CompareCostsPage'));
const FAQPage                 = lazy(() => import('./pages/FAQPage'));
const BlogPage                = lazy(() => import('./pages/BlogPage'));
const BlogArticlePage         = lazy(() => import('./pages/BlogArticlePage'));
const NotFoundPage            = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ScrollProgress />
      <div className="relative">
        <div className="grain-overlay" />
        <Navigation />
        <main className="relative">
          <Suspense fallback={
            <div className="min-h-screen bg-offwhite flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-sand border-t-transparent animate-spin" />
            </div>
          }>
            <Routes>
              <Route path="/"                                    element={<HomePage />} />
              <Route path="/quote"                               element={<QuotePage />} />
              <Route path="/terms"                               element={<TermsPage />} />
              <Route path="/privacy"                             element={<PrivacyPage />} />
              <Route path="/cookies"                             element={<CookiesPage />} />
              <Route path="/partner"                             element={<PartnerPage />} />
              <Route path="/partner/apply"                       element={<PartnerApplicationPage />} />
              <Route path="/dentistry"                           element={<DentistryPage />} />
              <Route path="/dentistry/gingivectomy"              element={<GingivectomyPage />} />
              <Route path="/dentistry/composite-veneers"         element={<CompositeVeneersPage />} />
              <Route path="/dentistry/dental-implants"           element={<DentalImplantsPage />} />
              <Route path="/dentistry/therapy"                   element={<DentalTherapyPage />} />
              <Route path="/dentistry/crowns"                    element={<CrownsPage />} />
              <Route path="/dentistry/teeth-whitening"           element={<TeethWhiteningPage />} />
              <Route path="/dentistry/emax-veneers"              element={<EmaxVeneersPage />} />
              <Route path="/dentistry/dental-aligners"           element={<DentalAlignersPage />} />
              <Route path="/dentistry/teeth-cleaning"            element={<TeethCleaningPage />} />
              <Route path="/how-it-works"                        element={<HowItWorksPage />} />
              <Route path="/outsourcing"                         element={<OutsourcingPage />} />
              <Route path="/capabilities"                        element={<CapabilitiesPage />} />
              <Route path="/plan-trip"                           element={<PlanTripPage />} />
              <Route path="/plan-trip/flight-booking"            element={<FlightBookingPage />} />
              <Route path="/plan-trip/airport-transfers"         element={<AirportTransfersPage />} />
              <Route path="/plan-trip/local-transportation"      element={<LocalTransportationPage />} />
              <Route path="/plan-trip/translation-services"      element={<TranslationServicesPage />} />
              <Route path="/accommodations"                      element={<AccommodationsPage />} />
              <Route path="/compare-costs"                       element={<CompareCostsPage />} />
              <Route path="/faq"                                 element={<FAQPage />} />
              <Route path="/blog"                                element={<BlogPage />} />
              <Route path="/blog/:slug"                          element={<BlogArticlePage />} />
              <Route path="*"                                    element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <CookieConsent />
        <WhatsAppButton />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
