import BackButton from '../components/BackButton';
import { useSEO } from '../hooks/useSEO';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingDown, Euro, Calculator, ArrowRight, CheckCircle, Info } from 'lucide-react';

const CompareCostsPage = () => {

  const comparisons = [
    {
      procedure: 'Single Dental Implant',
      uk: '£2,500 - £3,500',
      germany: '€2,800 - €4,000',
      albania: '€360 - €500',
      savings: 'Up to 86%'
    },
    {
      procedure: 'All-on-4 (Full Arch)',
      uk: '£12,000 - £18,000',
      germany: '€14,000 - €20,000',
      albania: '€2,900 - €3,900',
      savings: 'Up to 78%'
    },
    {
      procedure: 'Zirconia Crown',
      uk: '£800 - £1,200',
      germany: '€900 - €1,400',
      albania: '€180 - €250',
      savings: 'Up to 78%'
    },
    {
      procedure: 'Veneers (per tooth)',
      uk: '£600 - £1,000',
      germany: '€700 - €1,200',
      albania: '€150 - €220',
      savings: 'Up to 75%'
    },
    {
      procedure: 'Root Canal Treatment',
      uk: '£400 - £700',
      germany: '€450 - €800',
      albania: '€80 - €140',
      savings: 'Up to 80%'
    },
  ];

  const included = [
    'Initial consultation and X-rays',
    'All dental procedures',
    'Local anesthesia',
    'Post-treatment medications',
    'Follow-up appointments'
  ];

  const additionalCosts = [
    { item: 'Flights (round trip)', cost: '€100 - €400' },
    { item: 'Accommodation (7 nights)', cost: '€280 - €700' },
    { item: 'Airport transfers', cost: '€40 - €80' },
    { item: 'Meals & local transport', cost: '€150 - €300' },
  ];

  useSEO({
    title: 'Compare Dental Costs — Albania vs UK & Europe',
    description: 'See exactly how much you save on dental implants, crowns, veneers, and full-arch restorations in Albania compared to the UK and Germany.',
    canonicalPath: '/compare-costs',
    keywords: 'dental prices Albania, Albania vs UK dental cost, how much dental implants Albania, cheapest dental implants Europe 2026',
  });

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }, 0);
  }, []);

  return (
    <div className="min-h-screen bg-offwhite pt-20 sm:pt-24 pb-16">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 mb-6">
        <BackButton />
      </div>

      {/* Hero */}
      <div className="relative h-[40vh] sm:h-[50vh] mb-12 sm:mb-16">
        <img
          src="/cost_comparison.jpg"
          alt="Cost Comparison"
          className="w-full h-full object-cover"
            loading="lazy" />
        <div className="absolute inset-0 bg-navy/70 flex items-center justify-center">
          <div className="text-center px-4 sm:px-6">
            <h1 className="headline-lg text-offwhite mb-4">
              Compare Costs
            </h1>
            <p className="body-text text-offwhite/80 max-w-2xl mx-auto">
              See how much you can save by choosing Albania for your dental treatment.
            </p>
          </div>
        </div>
      </div>

      {/* Cost Comparison Table */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 mb-16">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy text-center mb-8 sm:mb-12">
          Dental Procedure Cost Comparison
        </h2>
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-navy">
                <tr>
                  <th className="text-left text-offwhite font-display font-semibold p-4 text-sm">Procedure</th>
                  <th className="text-right text-offwhite font-display font-semibold p-4 text-sm">UK</th>
                  <th className="text-right text-offwhite font-display font-semibold p-4 text-sm">Germany</th>
                  <th className="text-right text-sand font-display font-semibold p-4 text-sm">Albania</th>
                  <th className="text-right text-offwhite font-display font-semibold p-4 text-sm">Savings</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((item, index) => (
                  <tr key={index} className="border-b border-navy/10 last:border-0">
                    <td className="p-4 text-navy font-medium text-sm">{item.procedure}</td>
                    <td className="p-4 text-right text-slate-custom text-sm">{item.uk}</td>
                    <td className="p-4 text-right text-slate-custom text-sm">{item.germany}</td>
                    <td className="p-4 text-right text-sand font-bold text-sm">{item.albania}</td>
                    <td className="p-4 text-right text-green-600 font-semibold text-sm">{item.savings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 mb-16">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Included */}
          <div className="bg-white rounded-xl shadow-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle size={24} className="text-sand" />
              <h3 className="font-display font-bold text-lg sm:text-xl text-navy">
                What's Included
              </h3>
            </div>
            <ul className="space-y-3">
              {included.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-sm text-slate-custom">
                  <div className="w-5 h-5 rounded-full bg-sand/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={12} className="text-sand" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Costs */}
          <div className="bg-white rounded-xl shadow-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Euro size={24} className="text-sand" />
              <h3 className="font-display font-bold text-lg sm:text-xl text-navy">
                Estimated Travel Costs
              </h3>
            </div>
            <ul className="space-y-3">
              {additionalCosts.map((item, index) => (
                <li key={index} className="flex items-center justify-between text-sm">
                  <span className="text-slate-custom">{item.item}</span>
                  <span className="text-navy font-semibold">{item.cost}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Total Savings Example */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 mb-16">
        <div className="bg-navy rounded-xl p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <Calculator size={28} className="text-sand" />
            <h2 className="font-display font-bold text-xl sm:text-2xl text-offwhite">
              Example: All-on-4 Treatment
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-offwhite/70 text-sm mb-2">In the UK</p>
              <p className="text-2xl sm:text-3xl font-display font-bold text-offwhite">£15,000</p>
              <p className="text-offwhite/50 text-xs">Average cost</p>
            </div>
            <div className="text-center">
              <p className="text-offwhite/70 text-sm mb-2">In Albania</p>
              <p className="text-2xl sm:text-3xl font-display font-bold text-sand">€3,900</p>
              <p className="text-offwhite/50 text-xs">Treatment + travel</p>
            </div>
            <div className="text-center">
              <p className="text-offwhite/70 text-sm mb-2">Your Savings</p>
              <p className="text-2xl sm:text-3xl font-display font-bold text-green-400">~60%</p>
              <p className="text-offwhite/50 text-xs">Plus a vacation!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 mb-12">
        <div className="flex items-start gap-3 p-4 bg-sand/10 rounded-lg">
          <Info size={20} className="text-sand flex-shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-slate-custom">
            Prices are estimates and may vary based on individual cases. 
            Final quotes are provided after consultation with our partner clinics. 
            All prices include VAT where applicable.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="bg-sand rounded-xl p-6 sm:p-10 text-center">
          <h2 className="font-display font-bold text-xl sm:text-2xl text-navy mb-4">
            Get Your Personalized Quote
          </h2>
          <p className="body-text text-navy/80 mb-6 sm:mb-8">
            Find out exactly how much you can save on your specific treatment needs.
          </p>
          <Link 
            to="/quote"
            className="btn-secondary inline-flex items-center gap-2"
          >
            Request a Quote
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompareCostsPage;
