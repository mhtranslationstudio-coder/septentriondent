import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { useSEO } from '../hooks/useSEO';
import { gsap } from '../lib/gsap';
import { ChevronDown, ArrowRight, Search } from 'lucide-react';

/* ─── FAQ DATA ──────────────────────────────────────────────────────────── */

const categories = [
  {
    id: 'costs',
    label: 'Costs & Savings',
    questions: [
      {
        q: 'How much do dental implants cost in Albania?',
        a: `A single dental implant in Albania — including the titanium implant, abutment, and porcelain crown — costs between €360 and €500. Full-arch solutions cost significantly less than in Western Europe: an All-on-4 starts from €2,900 per arch and an All-on-6 from €3,500 per arch. For comparison, the same single implant in the UK averages £2,500–£3,500, and an All-on-4 in the UK typically costs £12,000–£18,000. Patients working with Septentrion Group save up to 86% on average, even after flights and accommodation are included.`,
      },
      {
        q: 'How much do veneers cost in Albania?',
        a: `Porcelain veneers in Albania cost €150–€220 per tooth, compared to £600–£1,000 per tooth in the UK and €700–€1,200 in Germany. A full smile makeover of 10 veneers costs approximately €1,500–€2,200 in Albania, versus €7,000–€12,000 in Western Europe. Septentrion Group coordinates treatment at partner clinics using E.max ceramic and zirconia veneers — the same materials used in top European clinics.`,
      },
      {
        q: 'How much does an All-on-4 cost in Albania?',
        a: `An All-on-4 dental implant procedure in Albania costs €2,900–€3,900 per arch, including surgery, temporary prosthesis, and final fixed bridge. Treating both arches (a full mouth) costs €5,800–€7,800 all-inclusive — compared to £25,000–£36,000 in the UK. The total cost including return flights from London (€100–€300) and one week's accommodation (€280–€490) still represents a saving of over €18,000 for most UK patients.`,
      },
      {
        q: 'Why is dental treatment cheaper in Albania than in the UK or Germany?',
        a: `The cost difference is structural, not a sign of lower quality. Albania has a significantly lower cost of living, lower labour costs, lower clinic overheads, and lower tax burden than Western European countries. Dentists trained to the same European standards simply charge less because their operating costs are lower. Materials — including Straumann, Nobel Biocare, and Zimmer implants — are imported from the same manufacturers used in UK and German clinics. You are paying less for the same inputs, not for an inferior product.`,
      },
      {
        q: 'What is the total cost of a dental trip to Albania including travel?',
        a: `A realistic all-in cost for a dental implant trip from the UK to Tirana looks like this: return flights £80–£250, accommodation for 5–7 nights €200–€490, airport transfers €40–€80, meals €100–€200, and the implant itself €360–€500. Total: approximately €850–€1,400. The same implant in the UK would cost £2,500–£3,500. You save over £2,000 even on a single implant. For larger treatments like All-on-4, the savings exceed £20,000.`,
      },
      {
        q: 'How much does a porcelain crown cost in Albania?',
        a: `A porcelain or zirconia crown in Albania costs €180–€250, compared to £800–£1,200 in the UK and €900–€1,400 in Germany. E.max lithium disilicate crowns — the gold standard in cosmetic dentistry — are available at partner clinics from €200. Most crown procedures are completed within 3–5 days.`,
      },
      {
        q: 'Are there any hidden costs I should know about?',
        a: `Reputable clinics and facilitators — including Septentrion Group — provide fully itemised treatment plans before you travel. You should always confirm that your quote includes: the initial consultation and 3D CBCT scan, all surgical procedures, anaesthesia, temporary prostheses where applicable, final restorations, and post-treatment follow-up appointments. Potential additional costs to ask about include bone grafting (€200–€400 if needed), sinus lifts (€280–€500), and any required extractions (€60–€120 each). Septentrion Group guarantees no surprise charges — your quote is your final price.`,
      },
    ],
  },
  {
    id: 'safety',
    label: 'Safety & Quality',
    questions: [
      {
        q: 'Is dental treatment in Albania safe?',
        a: `Yes. Albania's private dental sector follows EU-level clinical and sterilisation standards. Leading clinics use Class B autoclaves, single-use sterile instruments, digital 3D CBCT scanning, and internationally certified implant systems. Many Albanian dentists completed part of their specialisation in Italy, Germany, Austria, or the United States. Albania is also a safe destination for travel — it has a low crime rate, good tourist infrastructure, and is visa-free for UK, EU, US, Australian, and most other Western citizens.`,
      },
      {
        q: 'Are Albanian dentists properly qualified?',
        a: `Yes. Albanian dentists complete a 6-year university degree at the Faculty of Dentistry in Tirana or at accredited European universities, followed by mandatory registration with the Albanian Dental Association (Urdhri i Mjekut të Dhëmbëve). Specialists in implantology, orthodontics, and oral surgery complete an additional 3-year residency. Many dentists at leading clinics hold dual certifications — Albanian and Italian, German, or Austrian — and attend international continuing education programmes annually. Septentrion Group partners exclusively with clinics whose lead surgeons have verifiable international credentials.`,
      },
      {
        q: 'What implant brands do Albanian clinics use?',
        a: `Top Albanian clinics use the same CE-certified, FDA-approved implant brands as clinics in Germany, Switzerland, and the UK. These include Straumann (Switzerland), Nobel Biocare (Sweden), Zimmer Biomet (USA), Megagen (South Korea), and Osstem (South Korea). All are backed by clinical studies and carry the CE mark. You will receive an implant passport documenting the exact brand, model, and serial number of every implant placed — transferable to any dentist in the world for future reference.`,
      },
      {
        q: 'What happens if something goes wrong after I return home?',
        a: `Septentrion Group coordinates an aftercare protocol that covers you after returning home. All partner clinics provide written treatment guarantees: typically 10 years on implants and 5 years on crowns and bridges. If a complication arises, we facilitate remote consultation with your treating dentist via video call, coordinate with a recommended dentist in your home country for immediate relief, and arrange a return visit to Tirana if required — often covered under the clinic's warranty. We also provide you with complete treatment records in English to share with any dentist.`,
      },
      {
        q: 'How do I know if a clinic is accredited?',
        a: `In Albania, dental clinics are licensed by the Ministry of Health and Health Protection (Ministria e Shëndetësisë). Leading clinics also pursue ISO 9001 certification and membership in the European Dental Association. When working with Septentrion Group, you only access clinics that have been audited by our team in person — we verify licensing, equipment standards, sterilisation protocols, and surgeon credentials before entering any partnership. We provide a detailed clinic profile, including certifications and patient review history, before you make any commitment.`,
      },
      {
        q: 'Is Albania a safe country to visit?',
        a: `Albania is ranked as a safe destination by the UK Foreign Commonwealth & Development Office (FCDO), which advises standard travel precautions — the same level as France or Spain. Tirana, the capital where most clinics are located, has a low petty crime rate and a well-developed tourist infrastructure. Albania uses the Albanian Lek (ALL) but euros are widely accepted. English is spoken at most clinics and tourist establishments. The country enjoys a Mediterranean climate, with warm summers and mild winters.`,
      },
    ],
  },
  {
    id: 'process',
    label: 'The Process',
    questions: [
      {
        q: 'How does medical tourism with Septentrion Group work?',
        a: `The process has five stages. First, you submit a free online inquiry describing your dental needs — we respond within 24 hours. Second, our partner clinic reviews your case and sends a detailed treatment plan and itemised quote, usually within 48 hours. Third, once you approve the plan, we coordinate your travel: recommending flights, booking accommodation near the clinic, and arranging airport transfers. Fourth, you travel to Tirana, complete your treatment over 5–10 days depending on the procedure, and receive post-operative instructions. Fifth, we provide ongoing aftercare support and coordinate any follow-up communication between you and the clinic from home.`,
      },
      {
        q: 'How many trips to Albania will I need?',
        a: `For most implant procedures, you need two trips. The first trip (5–8 days) covers the consultation, any necessary extractions, implant placement surgery, and fitting of temporary teeth. After 3–4 months of osseointegration (the implant fusing with your jawbone), you return for a second trip (5–7 days) for the final prosthesis fitting. For purely cosmetic procedures — veneers, crowns, composite bonding — a single trip of 5–7 days is usually sufficient. Septentrion Group will advise you precisely based on your treatment plan.`,
      },
      {
        q: 'How long do I need to stay in Albania for dental treatment?',
        a: `For a single dental implant: your first visit is typically 5–6 days (consultation, surgery, temporary crown), and the second visit 4–5 days (final crown fitting). For an All-on-4 or All-on-6 full arch: first visit 7–10 days (multiple extractions, bone grafts if needed, implant placement, immediate temporary teeth), second visit 5–7 days (final zirconia bridge fitting). For veneers or crowns only: one visit of 5–6 days is usually sufficient. We schedule all appointments back-to-back so there is no wasted time.`,
      },
      {
        q: 'Do I need to send X-rays before travelling?',
        a: `Yes, and it significantly speeds up the process. Before your first visit, the clinic will request a recent panoramic X-ray (OPG) and, if available, a CBCT 3D scan. If you do not have recent X-rays, the clinic performs them on arrival — but sending them in advance allows the surgeon to plan your case in detail, prepare the correct implant sizes, and provide a more accurate quote. Your UK dentist can provide a panoramic X-ray for approximately £30–£50. Septentrion Group can advise you on exactly what to send.`,
      },
      {
        q: 'Can I get teeth in a day in Albania?',
        a: `Yes, for suitable cases. Immediate loading — commonly marketed as "Teeth in a Day" — places a temporary fixed prosthesis on the same day as implant surgery, so you never go without teeth. This is clinically appropriate for All-on-4 procedures when there is sufficient bone density. Not every patient qualifies: your suitability depends on bone quality, the number of extractions required, and whether grafting is needed. The clinic will assess your CBCT scan in advance and confirm eligibility. Septentrion Group's partner clinics perform immediate loading routinely.`,
      },
      {
        q: 'Can I combine dental treatment with a holiday?',
        a: `Absolutely — and many patients do. Tirana is a vibrant, underrated city with excellent restaurants, a lively bar scene, and easy access to the Albanian Riviera's beaches (1.5 hours by car). The recovery period between surgical appointments typically allows gentle sightseeing. Septentrion Group can recommend restaurants suitable for patients with dietary restrictions during recovery, and our local team is available for any questions during your stay.`,
      },
    ],
  },
  {
    id: 'travel',
    label: 'Travel & Logistics',
    questions: [
      {
        q: 'Do I need a visa to travel to Albania from the UK?',
        a: `No. UK citizens do not need a visa to enter Albania and can stay for up to 90 days without any visa requirements. EU citizens (all member states), US, Canadian, Australian, and New Zealand citizens also enter visa-free. Albania is not an EU member but participates in the Schengen Area for entry purposes with many passport types. You can check the full list of visa-exempt nationalities on the Albanian e-Visa portal or the FCDO website.`,
      },
      {
        q: 'How do I get from the UK to Tirana, Albania?',
        a: `Direct flights from London (Gatwick and Heathrow) to Tirana International Airport Nënë Tereza (TIA) are operated by British Airways, easyJet, Wizz Air, and Air Albania, with flight times of approximately 2 hours 40 minutes. Return flights typically cost £80–£250 depending on season and lead time. From other UK cities, connecting flights via Vienna, Rome, Istanbul, or Zürich are common. Septentrion Group recommends booking 4–6 weeks in advance for best prices and will advise on the best options for your travel dates.`,
      },
      {
        q: 'Where is Tirana International Airport and how do I get to the city?',
        a: `Tirana International Airport Nënë Tereza (IATA: TIA) is located 17 km north of Tirana city centre. The journey takes approximately 25–35 minutes by car. Septentrion Group arranges private airport transfers for all patients — a driver meets you at arrivals with a name sign and takes you directly to your accommodation. Taxi fares to the city centre are approximately €20–€25. There is no direct train or metro service from the airport, but reliable metered taxis and rideshare apps (including Bolt) are available.`,
      },
      {
        q: 'Where should I stay during dental treatment in Albania?',
        a: `Septentrion Group curates a selection of partner apartments and hotels within 10–15 minutes of our partner clinics in Tirana. Options range from comfortable studio apartments (from €40/night) to premium serviced suites (from €80/night) and family apartments sleeping 4+ (from €100/night). All properties are vetted for cleanliness, security, and recovery-friendly environments — quiet neighbourhoods, equipped kitchens for a soft-food recovery diet, and reliable WiFi. We book your accommodation as part of the coordination service.`,
      },
      {
        q: 'What currency does Albania use, and how do I pay for treatment?',
        a: `Albania's official currency is the Albanian Lek (ALL), but euros (€) are accepted almost universally in Tirana — at clinics, hotels, restaurants, and shops. UK pounds can be exchanged at banks and currency exchange offices in the city. Dental clinics typically accept cash (euros), credit and debit cards (Visa/Mastercard), and bank transfers. Some clinics accept a deposit by card with the balance in cash. Septentrion Group confirms payment methods with your specific clinic in advance.`,
      },
      {
        q: 'Do Albanian dentists speak English?',
        a: `Yes. In Tirana's leading dental clinics, English is standard — most lead dentists and coordinators are fluent. Italian is also widely spoken, reflecting the historical cultural connection between Albania and Italy. German, Greek, and French are available at some clinics. If you prefer to communicate in a specific language, Septentrion Group can match you with a clinic that has a speaker of your language, or provide a professional medical interpreter for consultations at no additional cost.`,
      },
      {
        q: 'Is it safe to drive in Albania?',
        a: `Driving in Albania has improved significantly, but road conditions outside major cities can be variable. For patients travelling to Tirana for dental treatment, we strongly recommend using Septentrion Group's arranged transfers or Tirana's reliable taxi and Bolt rideshare service rather than renting a car. Within Tirana, the city is compact and walkable for most areas around the clinic and accommodation zones.`,
      },
    ],
  },
  {
    id: 'procedures',
    label: 'Procedures & Recovery',
    questions: [
      {
        q: 'Is getting a dental implant painful?',
        a: `The implant surgery itself is performed under local anaesthesia and is not painful during the procedure. Most patients describe feeling pressure rather than pain. After the anaesthesia wears off (3–5 hours), you will experience some soreness and swelling, typically managed well with over-the-counter painkillers (ibuprofen and paracetamol). The first 2–3 days are the most uncomfortable, but most patients are comfortable eating soft foods and sightseeing gently by day 4. Severe or prolonged pain is not normal and should be reported to the clinic immediately.`,
      },
      {
        q: 'What can I eat after dental implant surgery?',
        a: `For the first 24 hours: liquids only — water, broths, smoothies, protein shakes. Days 2–7: soft foods — yoghurt, scrambled eggs, mashed potato, soup, pasta, fish. Weeks 2–6: progressively softer normal foods as comfort allows. Hard, crunchy, or chewy foods (bread crusts, raw carrots, steak) should be avoided for 6–8 weeks after implant placement. Hot liquids and alcohol should be avoided for the first 48 hours. Septentrion Group provides a full post-operative dietary guide and can recommend Tirana restaurants with suitable soft-food options.`,
      },
      {
        q: 'How long does osseointegration take for dental implants?',
        a: `Osseointegration — the process of the titanium implant fusing with the jawbone — takes 3–6 months. During this time you wear a temporary crown or prosthesis. For All-on-4 immediate loading procedures, the temporary fixed bridge is worn during osseointegration. The final zirconia or porcelain prosthesis is fitted at your second visit, once the clinic confirms full integration via X-ray. Smoking, poor oral hygiene, and uncontrolled diabetes can slow or compromise osseointegration — your dentist will advise on precautions.`,
      },
      {
        q: 'How long do dental implants last?',
        a: `With proper care, dental implants can last a lifetime. The titanium implant body — the part in your jawbone — has a clinical success rate of over 95% at 10 years and remains functional for 25+ years in the majority of cases. The crown or bridge on top typically lasts 10–15 years before it may need replacing due to normal wear, after which it can usually be replaced without removing the implant. Partner clinics provide a 10-year written guarantee on implants and a 5-year guarantee on prosthetic work.`,
      },
      {
        q: 'Can I fly home after dental implant surgery?',
        a: `Yes — flying after dental implant surgery is safe and does not affect healing. There is no clinical contraindication to flying after implant placement. Most patients travel home 4–5 days after surgery without difficulty. We recommend waiting at least 48 hours after surgery before flying to ensure initial clotting is stable and any swelling has begun to subside. Stay well hydrated on the flight and avoid alcohol. Septentrion Group schedules your return flight after the minimum recommended recovery window.`,
      },
      {
        q: 'What is the difference between All-on-4 and All-on-6?',
        a: `Both are fixed full-arch implant solutions — a permanent set of teeth supported by implants, not removable. All-on-4 uses four implants per arch, with the two rear implants placed at an angle (typically 45°) to maximise contact with available bone and often avoid the need for bone grafting. All-on-6 uses six implants per arch, providing greater stability, load distribution, and long-term durability — particularly recommended for patients with higher bite forces or those replacing a full arch in the lower jaw. All-on-6 costs approximately €600–€900 more per arch but is often the preferred option for long-term outcomes.`,
      },
      {
        q: 'Do I need a bone graft for dental implants?',
        a: `Not always — your need for bone grafting depends on the density and volume of your jawbone at the implant site. Bone loss occurs naturally after tooth extraction and accelerates over time. A CBCT 3D scan (taken on your first visit or sent in advance) determines whether grafting is required. Minor grafts are often performed simultaneously with implant placement. Significant bone deficiency may require a sinus lift procedure (for upper jaw) or a separate grafting stage before implants can be placed. Septentrion Group's partner clinics specialise in bone augmentation and can assess your case before you travel.`,
      },
    ],
  },
  {
    id: 'septentrion',
    label: 'About Septentrion',
    questions: [
      {
        q: 'What exactly does Septentrion Group do?',
        a: `Septentrion Group is a UK-registered medical tourism facilitation company operating in Albania. We are not a dental clinic — we are the bridge between international patients and accredited Albanian clinics. Our services cover the entire patient journey: free consultation and treatment assessment, clinic matching and appointment coordination, travel and flight advice, accommodation booking near your clinic, airport transfers and local transport, on-the-ground support during your stay, and aftercare coordination once you return home. For B2B partners, we also offer BPO services and digital solutions for healthcare businesses operating in Albania.`,
      },
      {
        q: 'Does Septentrion Group charge patients for its services?',
        a: `No. Septentrion Group does not charge patients a facilitation fee. Our coordination service is provided at no additional cost to you. We are able to offer this because our partner clinics pay a referral commission — this does not affect your treatment price, which is agreed directly with the clinic and fully transparent. You pay only for your treatment, accommodation, and travel — no markups, no hidden fees.`,
      },
      {
        q: 'How does Septentrion Group choose its partner clinics?',
        a: `We audit every partner clinic in person before signing any agreement. Our assessment covers: Ministry of Health licensing and legal compliance, lead surgeon credentials and international certifications, equipment standards including 3D CBCT scanning and in-house CAD/CAM milling, sterilisation protocols (Class B autoclave, single-use instrument policy), patient review history and complaint resolution processes, and quality of the patient coordinator team. We do not partner with clinics that fail any part of this assessment. Our network is small by design — we prioritise quality over volume.`,
      },
      {
        q: 'Can Septentrion Group help with treatments other than dentistry?',
        a: `Yes. While dental tourism is our primary focus, Septentrion Group also facilitates: hair transplants (FUE and DHI method), cosmetic and aesthetic surgery (rhinoplasty, liposuction, breast augmentation), and general medical check-ups at private hospitals in Tirana. Albania offers significant cost savings across all of these procedures. Contact us to discuss your specific needs and we will assess whether we can connect you with an appropriate specialist.`,
      },
      {
        q: 'What languages does Septentrion Group operate in?',
        a: `Our coordination team communicates in English, Italian, and Albanian. We serve patients primarily from the UK, Ireland, Italy, Germany, Switzerland, and the United States. For patients speaking other languages, we can arrange professional medical interpretation. All treatment plans, quotes, and clinical records are provided in English.`,
      },
      {
        q: 'How do I get started with Septentrion Group?',
        a: `The simplest first step is to fill in our free online quote form — it takes about 5 minutes. Tell us your dental concerns, your preferred timeline, and your approximate budget. We respond within 24 hours with an initial assessment and, where possible, a cost estimate. There is no obligation to proceed, and the consultation is entirely free. You can also reach us directly on WhatsApp at +44 20 4577 2065 or by email. Our team is available Monday to Saturday, 9am–7pm UK time.`,
      },
    ],
  },
];

/* ─── JSON-LD SCHEMA ────────────────────────────────────────────────────── */

const buildSchema = () => {
  const mainEntity = categories.flatMap(cat =>
    cat.questions.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    }))
  );
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  });
};

/* ─── COMPONENT ─────────────────────────────────────────────────────────── */

const FAQPage = () => {
  const pageRef   = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState('costs');
  const [openIndex, setOpenIndex]           = useState<number | null>(0);
  const [searchQuery, setSearchQuery]       = useState('');

  /* Inject JSON-LD */
  useEffect(() => {
    const script = document.createElement('script');
    script.type  = 'application/ld+json';
    script.text  = buildSchema();
    script.id    = 'faq-schema';
    document.head.appendChild(script);
    return () => { document.getElementById('faq-schema')?.remove(); };
  }, []);

  /* GSAP header entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top bottom', toggleActions: 'play none none none' } }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  useSEO({
    title: 'FAQ — Medical & Dental Tourism in Albania',
    description: 'Everything you need to know about dental implants, veneers, All-on-4, costs, safety, and travel to Albania. Answered by Septentrion Group.',
    canonicalPath: '/faq',
    keywords: 'dental tourism Albania FAQ, is Albania safe dental, dental implants Albania questions, dental tourism questions answered',
  });

  /* ── Filter logic ── */
  const currentCategory = categories.find(c => c.id === activeCategory)!;
  const filteredQuestions = searchQuery.trim().length > 1
    ? categories.flatMap(c => c.questions).filter(
        ({ q, a }) =>
          q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentCategory.questions;

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div ref={pageRef} className="min-h-screen bg-offwhite pt-24 pb-24">

      {/* ── Back ── */}
      <div className="max-w-5xl mx-auto px-6 lg:px-12 mb-6">
        <BackButton />
      </div>

      {/* ── Header ── */}
      <div ref={headerRef} className="max-w-5xl mx-auto px-6 lg:px-12 mb-12">
        <div className="text-center">
          <p className="text-label text-sand mb-3 tracking-[0.2em]">EVERYTHING YOU NEED TO KNOW</p>
          <h1 className="headline-lg text-navy mb-5">
            Frequently Asked Questions
          </h1>
          <p className="body-text text-slate-custom max-w-2xl mx-auto">
            Honest, detailed answers to every question patients ask before choosing dental or medical
            treatment in Albania — covering costs, safety, travel, procedures, and how Septentrion
            Group works.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto mt-8">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-custom pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search questions…"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setOpenIndex(null); }}
            className="w-full min-h-[52px] pl-12 pr-5 bg-white border border-navy/10 rounded-xl text-navy text-base placeholder-slate-custom/50 focus:outline-none focus:border-sand focus:ring-2 focus:ring-sand/20 transition-all shadow-card"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-custom hover:text-navy transition-colors text-xs uppercase tracking-wider font-semibold"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Layout ── */}
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* ── Sidebar categories ── */}
          {!searchQuery && (
            <aside className="lg:w-56 flex-shrink-0">
              <nav className="sticky top-28 space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); setOpenIndex(null); }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-display font-semibold tracking-wide transition-all duration-200 ${
                      activeCategory === cat.id
                        ? 'bg-navy text-offwhite shadow-card'
                        : 'text-slate-custom hover:bg-navy/5 hover:text-navy'
                    }`}
                  >
                    {cat.label}
                    <span className={`ml-2 text-xs font-normal opacity-60`}>
                      {cat.questions.length}
                    </span>
                  </button>
                ))}

                {/* Category count summary */}
                <div className="pt-4 px-4">
                  <p className="text-xs text-slate-custom/60">
                    {categories.reduce((s, c) => s + c.questions.length, 0)} questions total
                  </p>
                </div>
              </nav>
            </aside>
          )}

          {/* ── Questions ── */}
          <div className="flex-1 min-w-0">

            {/* Search results label */}
            {searchQuery && (
              <p className="text-sm text-slate-custom mb-6">
                {filteredQuestions.length === 0
                  ? 'No questions found.'
                  : `${filteredQuestions.length} result${filteredQuestions.length !== 1 ? 's' : ''} for "${searchQuery}"`
                }
              </p>
            )}

            {/* Category heading */}
            {!searchQuery && (
              <h2 className="font-display font-bold text-2xl text-navy mb-6 pb-4 border-b border-navy/10">
                {currentCategory.label}
              </h2>
            )}

            {/* Accordion */}
            <div className="space-y-3">
              {filteredQuestions.map(({ q, a }, i) => {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={i}
                    className={`bg-white rounded-xl border transition-all duration-200 ${
                      isOpen ? 'border-sand shadow-card' : 'border-navy/8 hover:border-navy/20'
                    }`}
                  >
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className={`font-display font-semibold text-base leading-snug transition-colors ${
                        isOpen ? 'text-navy' : 'text-navy/90'
                      }`}>
                        {q}
                      </span>
                      <ChevronDown
                        size={20}
                        className={`flex-shrink-0 mt-0.5 text-sand transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Answer — CSS height transition */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 pb-6 pt-1">
                        <div className="w-8 h-0.5 bg-sand mb-4" />
                        <p className="body-text text-slate-custom leading-relaxed text-sm sm:text-base whitespace-pre-line">
                          {a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* No results CTA */}
            {searchQuery && filteredQuestions.length === 0 && (
              <div className="text-center py-16">
                <p className="text-slate-custom mb-6 body-text">
                  Can't find what you're looking for? Ask us directly.
                </p>
                <Link to="/quote" className="btn-primary inline-flex items-center gap-2">
                  Ask a Question
                  <ArrowRight size={18} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom CTA strip ── */}
      <div className="max-w-5xl mx-auto px-6 lg:px-12 mt-20">
        <div className="bg-navy rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-offwhite mb-2">
              Still have a question?
            </h2>
            <p className="text-offwhite/70 text-sm sm:text-base">
              Our team responds within 24 hours. No obligation, no pressure.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link to="/quote" className="btn-primary whitespace-nowrap inline-flex items-center gap-2">
              Get a Free Quote
              <ArrowRight size={18} />
            </Link>
            <Link to="/compare-costs" className="btn-outline-sand whitespace-nowrap">
              Compare Costs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
