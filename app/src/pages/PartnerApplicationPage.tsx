import BackButton from '../components/BackButton';
import { useSEO } from '../hooks/useSEO';
import { useState, useRef, useEffect } from 'react';
import { gsap } from '../lib/gsap';
import { Send, Building2, Stethoscope, CheckCircle, CheckCircle2 } from 'lucide-react';

const PHONE_RAW = '+442045772065';

const PartnerApplicationPage = () => {
  const pageRef   = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef   = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    clinicName:       '',
    contactName:      '',
    role:             '',
    email:            '',
    phone:            '',
    specialties:      [] as string[],
    yearsOperating:   '',
    comments:         '',
  });

  const [errors, setErrors]           = useState<Partial<Record<keyof typeof formData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent]               = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo([headerRef.current, formRef.current],
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: headerRef.current, start: 'top bottom', toggleActions: 'play none none none' } }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof formData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckbox = (value: string) => {
    setFormData(prev => {
      const has = prev.specialties.includes(value);
      return {
        ...prev,
        specialties: has
          ? prev.specialties.filter(s => s !== value)
          : [...prev.specialties, value],
      };
    });
    if (errors.specialties) setErrors(prev => ({ ...prev, specialties: '' }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof typeof formData, string>> = {};
    if (!formData.clinicName.trim())     e.clinicName     = 'Clinic name is required.';
    if (!formData.contactName.trim())    e.contactName    = 'Contact name is required.';
    if (!formData.role)                  e.role           = 'Please select a role.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
                                         e.email          = 'A valid email address is required.';
    if (!formData.phone.trim())          e.phone          = 'Phone number is required.';
    if (formData.specialties.length === 0) e.specialties  = 'Please select at least one specialty.';
    if (!formData.yearsOperating)        e.yearsOperating = 'Please select years of operation.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const generateWhatsAppMessage = () => {
    const specialtiesList = formData.specialties.join(', ') || 'N/A';
    return (
      `Hi Septentrion Group! We would like to apply for your partner network.\n\n` +
      `*Clinic Name:* ${formData.clinicName}\n` +
      `*Contact Person:* ${formData.contactName}\n` +
      `*Role:* ${formData.role}\n` +
      `*Email:* ${formData.email}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Medical Specialties:* ${specialtiesList}\n` +
      `*Years Operating:* ${formData.yearsOperating}\n` +
      (formData.comments ? `\n*Additional Comments:* ${formData.comments}` : '') +
      `\n\nWe look forward to discussing collaboration opportunities!`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    const message     = encodeURIComponent(generateWhatsAppMessage());
    const whatsappUrl = `https://wa.me/${PHONE_RAW}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setTimeout(() => { setIsSubmitting(false); setIsSent(true); }, 1500);
  };

  const roles = [
    { value: '',                   label: 'Select your role' },
    { value: 'Owner',              label: 'Owner' },
    { value: 'Chief Surgeon',      label: 'Chief Surgeon' },
    { value: 'Clinic Manager',     label: 'Clinic Manager' },
    { value: 'Marketing Director', label: 'Marketing Director' },
  ];

  const yearsOptions = [
    { value: '',          label: 'Select years of operation' },
    { value: '1-3 Years', label: '1–3 Years' },
    { value: '3-5 Years', label: '3–5 Years' },
    { value: '5-10 Years',label: '5–10 Years' },
    { value: '10+ Years', label: '10+ Years' },
  ];

  const specialtyOptions = [
    'Implantology & Oral Surgery',
    'Aesthetic Dentistry (Veneers / Crowns)',
    'Hair Transplants',
    'Plastic / Aesthetic Surgery',
  ];

  const chevronSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236D7A84' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`;
  const selectStyle = { backgroundImage: chevronSvg, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' };

  const fieldClass = 'w-full min-h-[44px] px-4 py-3 bg-offwhite border rounded-md text-navy text-base placeholder-slate-custom/50 focus:outline-none transition-all';
  const okBorder   = 'border-navy/10 focus:border-sand focus:ring-2 focus:ring-sand/20';
  const errBorder  = 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-200';

  useSEO({
    title: 'Partner Application — Join Our Network',
    description: 'Apply to join the Septentrion Group international patient referral network. For accredited medical and dental clinics in Albania.',
    canonicalPath: '/partner/apply',
  });

  if (isSent) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center px-6 py-24">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sand mb-6">
            <CheckCircle2 size={40} className="text-navy" />
          </div>
          <h1 className="font-display font-bold text-3xl text-navy mb-4">
            Application Sent!
          </h1>
          <p className="body-text text-slate-custom mb-2">
            Your partnership application has been sent to our B2B team via WhatsApp.
          </p>
          <p className="body-text text-slate-custom mb-8">
            We will review your credentials and reply within <span className="text-navy font-semibold">48 hours</span>.
          </p>
          <div className="bg-white rounded-xl shadow-card p-6 mb-8 text-left space-y-2">
            <p className="text-sm text-slate-custom"><span className="font-semibold text-navy">Clinic:</span> {formData.clinicName}</p>
            <p className="text-sm text-slate-custom"><span className="font-semibold text-navy">Contact:</span> {formData.contactName}</p>
            <p className="text-sm text-slate-custom"><span className="font-semibold text-navy">Email:</span> {formData.email}</p>
            <p className="text-sm text-slate-custom"><span className="font-semibold text-navy">Specialties:</span> {formData.specialties.filter(s => s !== 'other').join(', ') || '—'}</p>
          </div>
          <button
            onClick={() => { setIsSent(false); setFormData({ clinicName: '', contactName: '', role: '', email: '', phone: '', specialties: [], yearsOperating: '', comments: '' }); }}
            className="text-sm text-slate-custom hover:text-navy transition-colors underline underline-offset-2"
          >
            Submit another application
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
          {/* Icon badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sand mb-6">
            <Stethoscope size={30} className="text-navy" />
          </div>

          <h1 className="headline-lg text-navy mb-4">PARTNERSHIP INQUIRY FORM</h1>

          {/* Intro card */}
          <div className="bg-navy rounded-xl px-8 py-6 max-w-3xl mx-auto mt-6">
            <p className="body-text text-offwhite/85 leading-relaxed">
              Septentrion Group partners exclusively with top-tier, fully licensed medical and dental
              facilities in Albania. Please fill out the form below to apply for our international
              patient referral network. Our B2B team will review your credentials and contact you
              within <span className="text-sand font-semibold">48 hours</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div ref={formRef} className="max-w-3xl mx-auto px-6 lg:px-12">
        <form onSubmit={handleSubmit} noValidate className="bg-white rounded-xl shadow-card p-8 lg:p-12">

          {/* ── Section 1: Clinic Information ── */}
          <div className="mb-10">
            <h2 className="font-display font-bold text-xl text-navy mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center flex-shrink-0">
                <Building2 size={20} className="text-navy" />
              </div>
              Section 1: Clinic Information
            </h2>

            <div className="space-y-5">
              {/* Clinic Name */}
              <div>
                <label htmlFor="clinicName" className="text-label text-slate-custom block mb-2">
                  Clinic / Hospital Name *
                </label>
                <input
                  type="text" id="clinicName" name="clinicName"
                  value={formData.clinicName} onChange={handleInputChange}
                  className={`${fieldClass} ${errors.clinicName ? errBorder : okBorder}`}
                  placeholder="e.g. Smile Dental Clinic"
                  aria-describedby={errors.clinicName ? 'clinicName-err' : undefined}
                />
                {errors.clinicName && <p id="clinicName-err" className="text-xs text-red-500 mt-1">{errors.clinicName}</p>}
              </div>

              {/* Contact Person */}
              <div>
                <label htmlFor="contactName" className="text-label text-slate-custom block mb-2">
                  Contact Person Full Name *
                </label>
                <input
                  type="text" id="contactName" name="contactName"
                  value={formData.contactName} onChange={handleInputChange}
                  className={`${fieldClass} ${errors.contactName ? errBorder : okBorder}`}
                  placeholder="Enter full name"
                  aria-describedby={errors.contactName ? 'contactName-err' : undefined}
                />
                {errors.contactName && <p id="contactName-err" className="text-xs text-red-500 mt-1">{errors.contactName}</p>}
              </div>

              {/* Role */}
              <div>
                <label htmlFor="role" className="text-label text-slate-custom block mb-2">
                  Role / Position *
                </label>
                <select
                  id="role" name="role"
                  value={formData.role} onChange={handleInputChange}
                  className={`${fieldClass} appearance-none cursor-pointer ${errors.role ? errBorder : okBorder}`}
                  style={selectStyle}
                  aria-describedby={errors.role ? 'role-err' : undefined}
                >
                  {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
                {errors.role && <p id="role-err" className="text-xs text-red-500 mt-1">{errors.role}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="text-label text-slate-custom block mb-2">
                  Email Address *
                </label>
                <input
                  type="email" id="email" name="email"
                  value={formData.email} onChange={handleInputChange}
                  className={`${fieldClass} ${errors.email ? errBorder : okBorder}`}
                  placeholder="clinic@example.com"
                  aria-describedby={errors.email ? 'email-err' : undefined}
                />
                {errors.email && <p id="email-err" className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="text-label text-slate-custom block mb-2">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel" id="phone" name="phone"
                  value={formData.phone} onChange={handleInputChange}
                  className={`${fieldClass} ${errors.phone ? errBorder : okBorder}`}
                  placeholder="+355 69 123 4567"
                  aria-describedby={errors.phone ? 'phone-err' : undefined}
                />
                {errors.phone
                  ? <p id="phone-err" className="text-xs text-red-500 mt-1">{errors.phone}</p>
                  : <p className="text-xs text-slate-custom mt-1">Include country code (e.g., +355 for Albania)</p>
                }
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-navy/10 mb-10" />

          {/* ── Section 2: Medical Capabilities ── */}
          <div className="mb-10">
            <h2 className="font-display font-bold text-xl text-navy mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center flex-shrink-0">
                <Stethoscope size={20} className="text-navy" />
              </div>
              Section 2: Medical Capabilities &amp; Standards
            </h2>

            <div className="space-y-6">
              {/* Specialties checkboxes */}
              <div>
                <label className="text-label text-slate-custom block mb-3">
                  Primary Medical Specialties *
                </label>
                <div className="space-y-3">
                  {specialtyOptions.map(option => {
                    const checked = formData.specialties.includes(option);
                    return (
                      <label
                        key={option}
                        className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                          checked
                            ? 'border-sand bg-sand/10'
                            : 'border-navy/10 bg-offwhite hover:border-sand/50'
                        }`}
                      >
                        {/* Custom checkbox */}
                        <div
                          onClick={() => handleCheckbox(option)}
                          className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-all duration-200 ${
                            checked ? 'bg-sand border-sand' : 'border-navy/30 bg-white'
                          }`}
                        >
                          {checked && <CheckCircle size={13} className="text-navy" />}
                        </div>
                        <span
                          onClick={() => handleCheckbox(option)}
                          className={`text-sm font-medium transition-colors ${checked ? 'text-navy' : 'text-slate-custom'}`}
                        >
                          {option}
                        </span>
                      </label>
                    );
                  })}

                  {/* Other option with text input */}
                  <div className={`p-4 rounded-lg border transition-all duration-200 ${
                    formData.specialties.includes('other') ? 'border-sand bg-sand/10' : 'border-navy/10 bg-offwhite'
                  }`}>
                    <label className="flex items-center gap-3 cursor-pointer mb-3">
                      <div
                        onClick={() => handleCheckbox('other')}
                        className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-all duration-200 ${
                          formData.specialties.includes('other') ? 'bg-sand border-sand' : 'border-navy/30 bg-white'
                        }`}
                      >
                        {formData.specialties.includes('other') && <CheckCircle size={13} className="text-navy" />}
                      </div>
                      <span
                        onClick={() => handleCheckbox('other')}
                        className="text-sm font-medium text-slate-custom"
                      >
                        Other
                      </span>
                    </label>
                    {formData.specialties.includes('other') && (
                      <textarea
                        name="comments"
                        placeholder="Please describe your other specialty…"
                        rows={2}
                        className={`${fieldClass} resize-none ${okBorder}`}
                        onChange={handleInputChange}
                        value={formData.comments}
                      />
                    )}
                  </div>
                </div>
                {errors.specialties && <p className="text-xs text-red-500 mt-2">{errors.specialties}</p>}
              </div>

              {/* Years operating */}
              <div>
                <label htmlFor="yearsOperating" className="text-label text-slate-custom block mb-2">
                  How many years has the clinic been operating? *
                </label>
                <select
                  id="yearsOperating" name="yearsOperating"
                  value={formData.yearsOperating} onChange={handleInputChange}
                  className={`${fieldClass} appearance-none cursor-pointer ${errors.yearsOperating ? errBorder : okBorder}`}
                  style={selectStyle}
                  aria-describedby={errors.yearsOperating ? 'years-err' : undefined}
                >
                  {yearsOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                {errors.yearsOperating && <p id="years-err" className="text-xs text-red-500 mt-1">{errors.yearsOperating}</p>}
              </div>

              {/* Additional comments (only if 'other' not already using it) */}
              {!formData.specialties.includes('other') && (
                <div>
                  <label htmlFor="additionalComments" className="text-label text-slate-custom block mb-2">
                    Additional Comments or Questions for our Team
                  </label>
                  <textarea
                    id="additionalComments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Any accreditations, certifications, or details you'd like to share…"
                    className={`${fieldClass} resize-none ${okBorder}`}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[56px] btn-primary flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? <span>Sending…</span>
                : <><Send size={20} /><span>Submit Partnership Application</span></>
              }
            </button>
            <p className="text-center text-xs text-slate-custom mt-4">
              Clicking submit will open WhatsApp with your pre-filled application ready to send.
              Our B2B team will respond within 48 hours.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartnerApplicationPage;
