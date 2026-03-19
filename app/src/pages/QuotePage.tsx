import BackButton from '../components/BackButton';
import { useSEO } from '../hooks/useSEO';
import { useState, useRef, useEffect } from 'react';
import { gsap } from '../lib/gsap';
import { Send, User, Phone, Calendar, DollarSign, MessageSquare, CheckCircle } from 'lucide-react';

const QuotePage = () => {
  const pageRef   = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef   = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    fullName:    '',
    email:       '',
    phone:       '',
    goal:        '',
    otherGoal:   '',
    description: '',
    timeline:    '',
    budget:      '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent]               = useState(false);
  // Fix #3: JS-side validation errors
  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const ctx = gsap.context(() => {
      gsap.fromTo([headerRef.current, formRef.current],
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: headerRef.current, start: 'top bottom', toggleActions: 'play none none none' } }
      );
    }, page);
    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof typeof formData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Fix #3: validate all required fields in JS before opening WhatsApp
  const validate = (): boolean => {
    const newErrors: Partial<typeof formData> = {};
    if (!formData.fullName.trim())
      newErrors.fullName = 'Full name is required.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'A valid email address is required.';
    if (!formData.phone.trim())
      newErrors.phone = 'Phone number is required.';
    if (!formData.goal)
      newErrors.goal = 'Please select a treatment goal.';
    if (formData.goal === 'other' && !formData.otherGoal.trim())
      newErrors.otherGoal = 'Please specify your treatment goal.';
    if (!formData.timeline)
      newErrors.timeline = 'Please select a preferred timeline.';
    if (!formData.budget)
      newErrors.budget = 'Please select an estimated budget.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateWhatsAppMessage = () => {
    const goalText = formData.goal === 'other' && formData.otherGoal
      ? formData.otherGoal
      : formData.goal;

    return `Hi Septentrion Group! I am interested in traveling to Albania for dental treatment and would like a free consultation.\n\nName: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nGoal: ${goalText}\nEstimated Budget: ${formData.budget}\nTimeline: ${formData.timeline}${formData.description ? `\n\nDetails: ${formData.description}` : ''}\n\nI look forward to speaking with your team!`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;   // Fix #3: block submission on validation failure

    setIsSubmitting(true);
    const message     = encodeURIComponent(generateWhatsAppMessage());
    const whatsappUrl = `https://wa.me/442045772065?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setTimeout(() => { setIsSubmitting(false); setIsSent(true); }, 1500);
  };

  const treatmentGoals = [
    { value: '',      label: 'Select your primary goal' },
    { value: 'I need Dental Implants (missing teeth)',           label: 'I need Dental Implants (missing teeth)' },
    { value: 'I want a Smile Makeover (Veneers / Crowns)',       label: 'I want a Smile Makeover (Veneers / Crowns)' },
    { value: 'I need a Full-Mouth Restoration (All-on-4 / All-on-6)', label: 'I need a Full-Mouth Restoration (All-on-4 / All-on-6)' },
    { value: 'I need bone grafting / sinus lifting',             label: 'I need bone grafting / sinus lifting' },
    { value: 'other',                                            label: 'Other (Please specify)' },
  ];

  const timelines = [
    { value: '',                          label: 'Select your preferred timeline' },
    { value: 'As soon as possible',       label: 'As soon as possible' },
    { value: 'Within 1-3 months',         label: 'Within 1-3 months' },
    { value: 'Within 3-6 months',         label: 'Within 3-6 months' },
    { value: 'Just researching for now',  label: 'Just researching for now' },
  ];

  const budgets = [
    { value: '',            label: 'Select your estimated budget' },
    { value: 'Under €3,000',  label: 'Under €3,000' },
    { value: '€3,000 - €6,000', label: '€3,000 - €6,000' },
    { value: '€6,000 - €10,000', label: '€6,000 - €10,000' },
    { value: '€10,000+',      label: '€10,000+' },
  ];

  const chevronSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236D7A84' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`;
  const selectStyle = { backgroundImage: chevronSvg, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' };

  const fieldClass  = 'w-full min-h-[44px] px-4 py-3 bg-offwhite border rounded-md text-navy text-base placeholder-slate-custom/50 focus:outline-none transition-all';
  const okBorder    = 'border-navy/10 focus:border-sand focus:ring-2 focus:ring-sand/20';
  const errBorder   = 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-200';

  useSEO({
    title: 'Get a Free Medical Quote',
    description: 'Request a free, no-obligation dental treatment quote from our accredited partner clinics in Albania. Response within 24 hours.',
    canonicalPath: '/quote',
    keywords: 'free dental quote Albania, dental implant quote Albania, free consultation dental Albania',
  });

  if (isSent) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center px-6 py-24">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sand mb-6">
            <CheckCircle size={40} className="text-navy" />
          </div>
          <h1 className="font-display font-bold text-3xl text-navy mb-4">
            Inquiry Sent!
          </h1>
          <p className="body-text text-slate-custom mb-2">
            Your WhatsApp message has been prepared and sent to our team.
          </p>
          <p className="body-text text-slate-custom mb-8">
            We will review your case and reply within <span className="text-navy font-semibold">24 hours</span>.
          </p>
          <div className="bg-white rounded-xl shadow-card p-6 mb-8 text-left space-y-2">
            <p className="text-sm text-slate-custom"><span className="font-semibold text-navy">Name:</span> {formData.fullName}</p>
            <p className="text-sm text-slate-custom"><span className="font-semibold text-navy">Email:</span> {formData.email}</p>
            <p className="text-sm text-slate-custom"><span className="font-semibold text-navy">Goal:</span> {formData.goal === 'other' ? formData.otherGoal : formData.goal}</p>
            <p className="text-sm text-slate-custom"><span className="font-semibold text-navy">Timeline:</span> {formData.timeline}</p>
          </div>
          <button
            onClick={() => { setIsSent(false); setFormData({ fullName: '', email: '', phone: '', goal: '', otherGoal: '', description: '', timeline: '', budget: '' }); }}
            className="text-sm text-slate-custom hover:text-navy transition-colors underline underline-offset-2"
          >
            Submit another inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-offwhite pt-24 pb-16">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12 mb-6">
        <BackButton />
      </div>

      {/* Header */}
      <div ref={headerRef} className="max-w-4xl mx-auto px-6 lg:px-12 mb-12">
        <div className="text-center">
          <h1 className="headline-lg text-navy mb-4">GET A FREE MEDICAL QUOTE</h1>
          <p className="body-text text-slate-custom max-w-2xl mx-auto">
            Start your journey to a new smile. Please fill out the form below with as much detail as possible.
            Our partner clinics need this information to provide you with an accurate treatment plan and
            price quote within 24 hours.
          </p>
        </div>
      </div>

      {/* Form */}
      <div ref={formRef} className="max-w-3xl mx-auto px-6 lg:px-12">
        <form onSubmit={handleSubmit} noValidate className="bg-white rounded-xl shadow-card p-8 lg:p-12">

          {/* Section 1: Patient Information */}
          <div className="mb-10">
            <h2 className="font-display font-bold text-xl text-navy mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center flex-shrink-0">
                <User size={20} className="text-navy" />
              </div>
              Section 1: Patient Information
            </h2>
            <div className="space-y-5">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="text-label text-slate-custom block mb-2">Full Name *</label>
                <input
                  type="text" id="fullName" name="fullName"
                  value={formData.fullName} onChange={handleInputChange}
                  className={`${fieldClass} ${errors.fullName ? errBorder : okBorder}`}
                  placeholder="Enter your full name"
                  aria-describedby={errors.fullName ? 'fullName-err' : undefined}
                />
                {errors.fullName && <p id="fullName-err" className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="text-label text-slate-custom block mb-2">Email Address *</label>
                <input
                  type="email" id="email" name="email"
                  value={formData.email} onChange={handleInputChange}
                  className={`${fieldClass} ${errors.email ? errBorder : okBorder}`}
                  placeholder="your@email.com"
                  aria-describedby={errors.email ? 'email-err' : undefined}
                />
                {errors.email && <p id="email-err" className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="text-label text-slate-custom block mb-2">Phone / WhatsApp Number *</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-custom" />
                  <input
                    type="tel" id="phone" name="phone"
                    value={formData.phone} onChange={handleInputChange}
                    className={`${fieldClass} pl-12 ${errors.phone ? errBorder : okBorder}`}
                    placeholder="+44 20 4577 2065"
                    aria-describedby={errors.phone ? 'phone-err' : undefined}
                  />
                </div>
                {errors.phone
                  ? <p id="phone-err" className="text-xs text-red-500 mt-1">{errors.phone}</p>
                  : <p className="text-xs text-slate-custom mt-1">Important: Include country code (e.g., +44 for UK)</p>
                }
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-navy/10 mb-10" />

          {/* Section 2: Dental Needs */}
          <div className="mb-10">
            <h2 className="font-display font-bold text-xl text-navy mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center flex-shrink-0">
                <MessageSquare size={20} className="text-navy" />
              </div>
              Section 2: Dental Needs &amp; Chief Complaint
            </h2>
            <div className="space-y-5">
              {/* Goal */}
              <div>
                <label htmlFor="goal" className="text-label text-slate-custom block mb-2">What is your primary goal? *</label>
                <select
                  id="goal" name="goal"
                  value={formData.goal} onChange={handleInputChange}
                  className={`${fieldClass} appearance-none cursor-pointer ${errors.goal ? errBorder : okBorder}`}
                  style={selectStyle}
                  aria-describedby={errors.goal ? 'goal-err' : undefined}
                >
                  {treatmentGoals.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
                </select>
                {errors.goal && <p id="goal-err" className="text-xs text-red-500 mt-1">{errors.goal}</p>}
              </div>

              {/* Other goal */}
              {formData.goal === 'other' && (
                <div>
                  <label htmlFor="otherGoal" className="text-label text-slate-custom block mb-2">Please specify *</label>
                  <input
                    type="text" id="otherGoal" name="otherGoal"
                    value={formData.otherGoal} onChange={handleInputChange}
                    className={`${fieldClass} ${errors.otherGoal ? errBorder : okBorder}`}
                    placeholder="Describe your specific needs"
                    aria-describedby={errors.otherGoal ? 'otherGoal-err' : undefined}
                  />
                  {errors.otherGoal && <p id="otherGoal-err" className="text-xs text-red-500 mt-1">{errors.otherGoal}</p>}
                </div>
              )}


            </div>
          </div>

          <div className="w-full h-px bg-navy/10 mb-10" />

          {/* Section 3: Travel */}
          <div className="mb-10">
            <h2 className="font-display font-bold text-xl text-navy mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center flex-shrink-0">
                <Calendar size={20} className="text-navy" />
              </div>
              Section 3: Travel &amp; Logistics Preferences
            </h2>
            <div className="space-y-5">
              {/* Timeline */}
              <div>
                <label htmlFor="timeline" className="text-label text-slate-custom block mb-2">When would you like to travel? *</label>
                <select
                  id="timeline" name="timeline"
                  value={formData.timeline} onChange={handleInputChange}
                  className={`${fieldClass} appearance-none cursor-pointer ${errors.timeline ? errBorder : okBorder}`}
                  style={selectStyle}
                  aria-describedby={errors.timeline ? 'timeline-err' : undefined}
                >
                  {timelines.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
                {errors.timeline && <p id="timeline-err" className="text-xs text-red-500 mt-1">{errors.timeline}</p>}
              </div>

              {/* Budget */}
              <div>
                <label htmlFor="budget" className="text-label text-slate-custom block mb-2">Estimated budget? *</label>
                <div className="relative">
                  <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-custom" />
                  <select
                    id="budget" name="budget"
                    value={formData.budget} onChange={handleInputChange}
                    className={`${fieldClass} pl-12 appearance-none cursor-pointer ${errors.budget ? errBorder : okBorder}`}
                    style={selectStyle}
                    aria-describedby={errors.budget ? 'budget-err' : undefined}
                  >
                    {budgets.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                  </select>
                </div>
                {errors.budget && <p id="budget-err" className="text-xs text-red-500 mt-1">{errors.budget}</p>}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[56px] btn-primary flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <span>Sending…</span> : <><Send size={20} /><span>Send via WhatsApp</span></>}
            </button>
            <p className="text-center text-xs text-slate-custom mt-4">
              Clicking submit will open WhatsApp with your pre-filled message ready to send.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuotePage;
