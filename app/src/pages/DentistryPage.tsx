import { useRef, useState, useCallback, useEffect } from 'react';
import BackButton from '../components/BackButton';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';
import {
  Smile, ShieldCheck, Clock, Euro, CheckCircle,
  ArrowRight,
} from 'lucide-react';

/* ── Before / After Slider ──────────────────────────────────────────────── */
const BeforeAfterSlider = ({
  before,
  after,
  beforeAlt = 'Before treatment',
  afterAlt  = 'After treatment',
}: {
  before: string;
  after: string;
  beforeAlt?: string;
  afterAlt?: string;
}) => {
  const [position, setPosition]   = useState(50);
  const [dragging, setDragging]   = useState(false);
  const containerRef              = useRef<HTMLDivElement>(null);

  const getPercent = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return 50;
    return Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onMouseDown = () => setDragging(true);
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setPosition(getPercent(e.clientX));
  };
  const onMouseUp = () => setDragging(false);

  const onTouchMove = (e: React.TouchEvent) => {
    setPosition(getPercent(e.touches[0].clientX));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl shadow-card select-none"
      style={{ aspectRatio: '4/3', cursor: dragging ? 'grabbing' : 'grab' }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
    >
      {/* AFTER (full width, underneath) */}
      <img
        src={after}
        alt={afterAlt}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
            loading="lazy" />

      {/* BEFORE (clipped to left side) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={before}
          alt={beforeAlt}
          className="absolute inset-0 h-full object-cover"
          style={{ width: containerRef.current?.offsetWidth ?? '100%' }}
          draggable={false}
            loading="lazy" />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none"
        style={{ left: `${position}%` }}
      />

      {/* Drag handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center z-10 pointer-events-none"
        style={{ left: `${position}%` }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 4L3 10L7 16" stroke="#0B1E2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 4L17 10L13 16" stroke="#0B1E2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Drag handle (interactive, on top) */}
      <div
        className="absolute top-0 bottom-0 w-10 -translate-x-1/2 z-20 cursor-grab active:cursor-grabbing"
        style={{ left: `${position}%` }}
        onMouseDown={onMouseDown}
        onTouchStart={() => setDragging(true)}
        onTouchEnd={() => setDragging(false)}
      />

      {/* Labels */}
      <span className="absolute bottom-4 left-4 bg-black/50 text-white text-xs font-display font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full pointer-events-none">
        Before
      </span>
      <span className="absolute bottom-4 right-4 bg-sand text-navy text-xs font-display font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full pointer-events-none">
        After
      </span>
    </div>
  );
};


/* ── Animated Counter ───────────────────────────────────────────────────── */
const useCountUp = (target: number, duration = 1600, started = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
};

const StatRow = ({
  value,
  suffix,
  label,
  description,
  started,
  isLast,
}: {
  value: number;
  suffix: string;
  label: string;
  description: string;
  started: boolean;
  isLast: boolean;
}) => {
  const count = useCountUp(value, 1600, started);
  return (
    <div>
      <div className="flex items-center gap-6 sm:gap-10 py-8 sm:py-10">
        <div className="flex-shrink-0 w-36 sm:w-48">
          <span
            className="font-display font-bold text-offwhite leading-none"
            style={{ fontSize: 'clamp(52px, 7vw, 88px)' }}
          >
            {count}{suffix}
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="font-body font-semibold text-offwhite text-base sm:text-lg leading-tight">
            {label}
          </span>
          <span className="font-body text-offwhite/50 text-sm sm:text-base leading-snug">
            {description}
          </span>
        </div>
      </div>
      {!isLast && <div className="h-px bg-offwhite/15" />}
    </div>
  );
};

const DentistryPage = () => {
  useSEO({
    title: 'Dental Treatments in Albania — Implants, Veneers & More',
    description: 'Save up to 70% on world-class dental treatment in Albania. Septentrion Group connects you with accredited clinics in Tirana for implants, veneers, crowns, and full-arch restorations.',
    canonicalPath: '/dentistry',
    keywords: 'dentistry Albania, dental treatment Albania, dental clinic Tirana, implants veneers crowns Albania, affordable dental care Europe',
  });

  const treatments = [
    {
      slug: 'dental-implants',
      image: '/dental_implants.jpg',
      icon: '/icon_implant.png',
      title: 'Dental Implants',
      description: 'Implantology is a branch of dentistry that focuses on the placement of titanium fixtures to replace missing teeth permanently.',
    },
    {
      slug: 'crowns',
      image: '/dental_crowns.jpg',
      icon: '/icon_crowns.png',
      title: 'Crowns (Zirconium/Porcelain)',
      description: 'Zirconium crowns are dental crowns that use materials combining exceptional durability with a natural, translucent appearance.',
    },
    {
      slug: 'emax-veneers',
      image: '/emax_veneers.jpg',
      icon: '/icon_emax_veneers.png',
      title: 'Emax Veneers',
      description: 'Emax veneers are thin laboratory-prepared layers of lithium disilicate ceramic bonded to the front surface of your teeth.',
    },
    {
      slug: 'composite-veneers',
      image: '/composite_veneers.jpg',
      icon: '/icon_composite_veneers.png',
      title: 'Composite Veneers',
      description: 'Composite veneers are thin layers of composite material that are applied directly to the tooth surface to improve aesthetics.',
    },
    {
      slug: 'therapy',
      image: '/bridge_consultation.jpg',
      icon: '/icon_therapy.png',
      title: 'Therapy',
      description: 'Dental therapy represents a set of non-surgical treatments designed to maintain and restore oral health and function.',
    },
    {
      slug: 'dental-aligners',
      image: '/dental_aligners.jpg',
      icon: '/icon_dental_aligners.png',
      title: 'Dental Aligners',
      description: 'Invisalign is a form of orthodontic treatment that works for mild to moderate alignment issues using clear removable trays.',
    },
    {
      slug: 'gingivectomy',
      image: '/gingivectomy.jpg',
      icon: '/icon_gingivectomy.png',
      title: 'Gingivectomy',
      description: 'Gingivectomy is a surgical procedure used to remove excessive or diseased gum tissue to improve oral health and aesthetics.',
    },
    {
      slug: 'teeth-whitening',
      image: '/teeth_whitening.jpg',
      icon: '/icon_teeth_whitening.png',
      title: 'Teeth Whitening',
      description: 'Teeth whitening is a relatively cosmetic dental treatment that lightens the natural colour of your teeth safely and effectively.',
    },
    {
      slug: 'teeth-cleaning',
      image: '/teeth_cleaning.jpg',
      icon: '/icon_teeth_cleaning.png',
      title: 'Teeth Cleaning',
      description: 'Teeth cleaning is an essential treatment for maintaining good oral health by removing plaque and tartar build-up professionally.',
    },
  ];

  const clinicStandards = [
    'Ministry of Health licensed and legally registered in Albania',
    'ISO 9001 certified quality management systems',
    'Nobel Biocare, Straumann, and Osstem implant systems',
    '3D CBCT scanning for precision treatment planning',
    'In-house CAD/CAM milling for same-day restorations',
    'Class B autoclave sterilisation — single-use instrument policy',
    'English-speaking dental coordinators on site',
    'Full patient records and X-rays provided digitally',
  ];

  const statsRef = useRef<HTMLDivElement>(null);
  const [statsStarted, setStatsStarted] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const statRows = [
    { value: 70, suffix: '%', label: 'Average Saving', description: 'vs Western European clinic prices' },
    { value: 2000, suffix: '+', label: 'Patients Treated', description: 'Coordinated through our partner network' },
    { value: 10, suffix: '+', label: 'Years Experience', description: 'Average surgeon tenure at partner clinics' },
    { value: 100, suffix: '%', label: 'Clinics Audited', description: 'Every partner personally vetted by us' },
  ];

  return (
    <div className="min-h-screen bg-offwhite pb-16">

      {/* Hero — flush to navbar, back button floats over image */}
      <div className="relative h-[calc(50vh+80px)] sm:h-[calc(60vh+96px)]">
        <img
          src="/dental_consultation.jpg"
          alt="Dental clinic in Albania"
          className="w-full h-full object-cover"
            loading="lazy" />
        <div className="absolute inset-0 bg-navy/65 flex items-end justify-center pb-10 sm:pb-14">
          <div className="absolute top-24 sm:top-28 left-4 sm:left-6 lg:left-12 max-w-6xl w-full mx-auto">
            <BackButton />
          </div>
          <div className="text-center px-4 sm:px-6 max-w-3xl">
            <h1 className="headline-lg text-offwhite mb-4">
              World-Class Dentistry in Albania
            </h1>
            <p className="body-text text-offwhite/80 max-w-2xl mx-auto">
              Premium dental care at a fraction of Western European costs — fully coordinated by Septentrion Group from first contact to final crown.
            </p>
          </div>
        </div>
      </div>

      {/* Stats — animated counters */}
      <div ref={statsRef} className="bg-navy mb-16 sm:mb-20">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12">
          {statRows.map((row, i) => (
            <StatRow
              key={i}
              value={row.value}
              suffix={row.suffix}
              label={row.label}
              description={row.description}
              started={statsStarted}
              isLast={i === statRows.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Treatments */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 mb-16 sm:mb-20">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="headline-md text-navy mb-4">Treatments We Coordinate</h2>
          <p className="body-text text-slate-custom max-w-2xl mx-auto">
            Every treatment below is available through our vetted clinic partners in Tirana. We handle all logistics — you focus on your care.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {treatments.map((t, i) => (
            <Link
              key={i}
              to={`/dentistry/${t.slug}`}
              className="group bg-white rounded-2xl shadow-card overflow-hidden flex flex-row hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              style={{ minHeight: '190px' }}
            >
              {/* Tall left image */}
              <div className="relative flex-shrink-0 w-[90px] sm:w-[105px] overflow-hidden">
                <img
                  src={t.image}
                  alt={t.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy" />
              </div>

              {/* Content */}
              <div className="relative flex flex-col flex-1 p-5 overflow-hidden">
                {/* Watermark icon — per-card or default implant icon */}
                <img
                  src={t.icon || '/icon_implant.png'}
                  aria-hidden="true"
                  className="absolute pointer-events-none z-0"
                  style={{ width: '90px', height: '90px', bottom: '-10px', right: '-10px', opacity: 1, objectFit: 'contain' }}
            loading="lazy" />

                <div className="flex flex-col flex-1 relative z-10">
                  <h3 className="animated-underline font-display font-bold text-navy text-base leading-tight mb-2">
                    {t.title}
                  </h3>
                  <p className="font-body text-slate-500 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
                    {t.description}
                  </p>

                  {/* Read More */}
                  <div className="flex items-center gap-2.5 mt-auto">
                    <span className="font-body text-sm text-navy/80 font-medium">Read More</span>
                    <span className="w-7 h-7 rounded-full bg-[#f5ede0] flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-sand">
                      <ArrowRight size={13} className="text-navy transition-transform duration-300 group-hover:-rotate-45" />
                    </span>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Before / After Slider */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 mb-16 sm:mb-20">
        <div className="text-center mb-10">
          <p className="text-label text-sand mb-3 tracking-[0.2em]">REAL PATIENT RESULTS</p>
          <h2 className="headline-md text-navy mb-4">See the Difference</h2>
          <p className="body-text text-slate-custom max-w-xl mx-auto">
            Drag the slider to compare before and after. Results achieved at our partner clinics in Tirana.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <BeforeAfterSlider
            before="/before_veneers.jpg"
            after="/after_veneers.jpg"
            beforeAlt="Patient before veneer treatment"
            afterAlt="Patient after veneer treatment in Albania"
          />
          <p className="text-center text-xs text-slate-custom mt-3 font-display uppercase tracking-widest">
            Veneers from 100€ per tooth
          </p>
        </div>

        {/* CTA under slider */}
        <div className="text-center mt-10">
          <Link to="/quote" className="btn-primary inline-flex items-center gap-2">
            Get Your Free Treatment Plan
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Clinic Standards */}
      <div className="bg-sand/20 py-14 sm:py-20 mb-16 sm:mb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <ShieldCheck size={28} className="text-sand" />
                <h2 className="headline-md text-navy">Our Clinic Standards</h2>
              </div>
              <p className="body-text text-slate-custom mb-8">
                We personally audit every clinic before listing them on our network. No exceptions. If a clinic doesn't meet every standard below, we don't work with them.
              </p>
              <ul className="space-y-3">
                {clinicStandards.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-sand flex-shrink-0 mt-0.5" />
                    <span className="body-text text-slate-custom text-sm">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-card">
              <img
                src="/partner_clinic.jpg"
                alt="Accredited dental clinic"
                className="w-full h-full object-cover"
                style={{ minHeight: '320px' }}
            loading="lazy" />
            </div>
          </div>
        </div>
      </div>

      {/* Cost Comparison Callout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 mb-16 sm:mb-20">
        <div className="bg-navy rounded-2xl p-8 sm:p-12">
          <div className="grid sm:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Euro size={26} className="text-sand" />
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-offwhite">
                  How Much Can You Save?
                </h2>
              </div>
              <p className="body-text text-offwhite/70 mb-6">
                A full set of 20 dental implants in the UK can exceed £30,000. The same treatment in Albania — with the same implant brands — typically costs under £8,000, including flights and accommodation.
              </p>
              <Link to="/compare-costs" className="btn-outline-sand inline-flex items-center gap-2">
                See Full Cost Comparison
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="space-y-4">
              {[
                { treatment: 'Single Implant', uk: '£2,500', albania: '€360' },
                { treatment: 'Zirconia Crown', uk: '£900', albania: '€180' },
                { treatment: 'Veneer', uk: '£800', albania: '€150' },
                { treatment: 'All-on-4 (per arch)', uk: '£12,000', albania: '€2,900' },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3">
                  <span className="text-offwhite/80 text-sm font-medium">{row.treatment}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-offwhite/40 text-sm line-through">{row.uk}</span>
                    <span className="text-sand font-bold text-sm">{row.albania}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="bg-sand rounded-2xl p-8 sm:p-12 text-center">
          <Clock size={32} className="text-navy mx-auto mb-4" />
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy mb-4">
            Ready to Get Started?
          </h2>
          <p className="body-text text-navy/70 mb-8 max-w-xl mx-auto">
            Fill in our free quote form in 5 minutes. We respond within 24 hours with a personalised treatment plan and transparent pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quote" className="btn-primary inline-flex items-center gap-2 justify-center">
              Get a Free Quote
              <ArrowRight size={16} />
            </Link>
            <Link to="/how-it-works" className="btn-secondary inline-flex items-center gap-2 justify-center">
              How It Works
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DentistryPage;
