/**
 * CookiesPage
 * ─────────────────────────────────────────────────────────────────────────
 * Explains exactly which cookies are used (truthfully), shows the user's
 * current consent state, and lets them change it live.
 * Uses the same useCookieConsent hook as the banner — one source of truth.
 */

import { useSEO } from '../hooks/useSEO';
import { useCookieConsent } from '../hooks/useCookieConsent';
import { Cookie, HelpCircle, ShieldCheck, BarChart3, Target, RotateCcw, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import BackButton from '../components/BackButton';

const CookiesPage = () => {
  const { consent, hasDecided, saveConsent, resetConsent } = useCookieConsent();

  // Local draft state — only committed when user clicks "Save"
  const [draft, setDraft] = useState({
    analytics: consent.analytics,
    marketing: consent.marketing,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saveConsent(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    resetConsent();
    setDraft({ analytics: false, marketing: false });
  };

  useSEO({
    title: 'Cookie Policy & Preferences',
    description: 'Manage your cookie preferences for Septentrion Group. We only use strictly necessary cookies by default — analytics and marketing require your consent.',
    canonicalPath: '/cookies',
  });

  const cookieTypes = [
    {
      icon: ShieldCheck,
      title: 'Strictly Necessary Cookies',
      key: 'necessary' as const,
      alwaysOn: true,
      description:
        'These cookies are essential for the website to function. They store your cookie consent preference so we do not ask you again, and enable core navigation. No personal data is tracked. These cannot be disabled.',
      examples: [
        { name: 'sept_cookie_consent', purpose: 'Stores your cookie preferences', duration: '1 year', provider: 'Septentrion Group' },
      ],
    },
    {
      icon: BarChart3,
      title: 'Analytics Cookies',
      key: 'analytics' as const,
      alwaysOn: false,
      description:
        'If you consent, we use Google Analytics 4 (GA4) to understand how visitors use the site — which pages are most visited, how long people stay, and where they come from. This helps us improve the site. All data is anonymised (IP anonymisation enabled) and is never sold.',
      examples: [
        { name: '_ga', purpose: 'Distinguishes unique users', duration: '2 years', provider: 'Google Analytics' },
        { name: '_ga_*', purpose: 'Session state', duration: '2 years', provider: 'Google Analytics' },
      ],
    },
    {
      icon: Target,
      title: 'Marketing Cookies',
      key: 'marketing' as const,
      alwaysOn: false,
      description:
        'We do not currently run paid advertising campaigns and no marketing cookies are active on this site. If we introduce advertising in the future, we will request your consent at that time and update this policy.',
      examples: [],
    },
  ];

  return (
    <div className="min-h-screen bg-offwhite pt-20 sm:pt-24 pb-16">

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 mb-6">
        <BackButton />
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 mb-8 sm:mb-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-sand mb-4 sm:mb-6">
            <Cookie size={28} className="text-navy" />
          </div>
          <h1 className="headline-lg text-navy mb-4">Cookie Policy &amp; Preferences</h1>
          <p className="body-text text-slate-custom max-w-2xl mx-auto">
            We believe in being completely transparent about how we use cookies. Below you will find
            exactly which cookies are set, what they do, and your current consent status — which
            you can change at any time.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 space-y-6">

        {/* ── Live preferences panel ── */}
        <div className="bg-navy rounded-xl p-6 sm:p-8">
          <h2 className="font-display font-bold text-lg text-offwhite mb-1 flex items-center gap-2">
            Your Current Preferences
            {hasDecided && (
              <span className="text-xs font-normal text-sand bg-sand/10 px-2 py-0.5 rounded-full">
                Saved
              </span>
            )}
          </h2>
          <p className="text-offwhite/60 text-sm mb-6">
            {hasDecided
              ? `Last updated ${new Date(consent.ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`
              : "You haven't made a choice yet — only strictly necessary cookies are active."}
          </p>

          <div className="space-y-5">
            <PreferenceRow
              label="Strictly Necessary"
              checked={true}
              disabled={true}
              onChange={() => {}}
              description="Always active — required for the site to work."
            />
            <PreferenceRow
              label="Analytics (Google Analytics 4)"
              checked={draft.analytics}
              disabled={false}
              onChange={v => setDraft(d => ({ ...d, analytics: v }))}
              description="Anonymised usage data to help us improve the site."
            />
            <PreferenceRow
              label="Marketing"
              checked={draft.marketing}
              disabled={false}
              onChange={v => setDraft(d => ({ ...d, marketing: v }))}
              description="No marketing cookies are currently in use."
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={handleSave}
              className="btn-primary flex items-center gap-2 text-sm px-6 py-3 min-h-0"
            >
              {saved ? <><CheckCircle2 size={16} /> Saved!</> : 'Save Preferences'}
            </button>
            {hasDecided && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-xs text-offwhite/50 hover:text-offwhite transition-colors"
              >
                <RotateCcw size={13} />
                Reset &amp; show banner again
              </button>
            )}
          </div>
        </div>

        {/* ── Cookie detail cards ── */}
        <div className="bg-white rounded-xl shadow-card p-6 sm:p-8 lg:p-10">

          {/* What are cookies */}
          <div className="mb-8 pb-8 border-b border-navy/10">
            <div className="flex items-start gap-4 mb-3">
              <div className="w-10 h-10 rounded-full bg-sand/20 flex items-center justify-center flex-shrink-0">
                <HelpCircle size={18} className="text-navy" />
              </div>
              <h2 className="font-display font-bold text-lg text-navy pt-1">What are Cookies?</h2>
            </div>
            <p className="body-text text-slate-custom text-sm sm:text-base pl-14">
              Cookies are small text files placed on your device when you visit a website. They are
              used to remember your preferences, understand how the site is used, and — with your
              consent — help us improve. You can control and delete cookies via your browser settings
              at any time.
            </p>
          </div>

          {/* Cookie type sections */}
          <div className="space-y-10">
            {cookieTypes.map((type) => {
              const Icon = type.icon;
              const isActive = type.alwaysOn
                ? true
                : type.key === 'analytics'
                ? consent.analytics
                : consent.marketing;

              return (
                <div key={type.key}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-sand/20 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-navy" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display font-bold text-base sm:text-lg text-navy">
                          {type.title}
                        </h3>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          type.alwaysOn
                            ? 'bg-navy text-offwhite'
                            : isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-navy/8 text-slate-custom'
                        }`}>
                          {type.alwaysOn ? 'Always On' : isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="body-text text-slate-custom text-sm sm:text-base pl-14 mb-4">
                    {type.description}
                  </p>

                  {type.examples.length > 0 ? (
                    <div className="pl-14">
                      <div className="overflow-x-auto rounded-lg border border-navy/10">
                        <table className="w-full text-xs">
                          <thead className="bg-navy/5">
                            <tr>
                              {['Cookie Name', 'Purpose', 'Duration', 'Provider'].map(h => (
                                <th key={h} className="text-left px-3 py-2 font-display font-semibold text-navy/70 uppercase tracking-wider text-[10px]">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {type.examples.map((ex, i) => (
                              <tr key={i} className="border-t border-navy/5">
                                <td className="px-3 py-2.5 font-mono text-navy text-[11px]">{ex.name}</td>
                                <td className="px-3 py-2.5 text-slate-custom">{ex.purpose}</td>
                                <td className="px-3 py-2.5 text-slate-custom">{ex.duration}</td>
                                <td className="px-3 py-2.5 text-slate-custom">{ex.provider}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <p className="pl-14 text-xs text-slate-custom/60 italic">
                      No cookies of this type are currently set.
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Browser management */}
          <div className="mt-10 pt-8 border-t border-navy/10">
            <h2 className="font-display font-bold text-lg text-navy mb-3">Managing via Your Browser</h2>
            <p className="body-text text-slate-custom text-sm sm:text-base mb-4">
              You can also control cookies directly through your browser settings.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Chrome',  href: 'https://support.google.com/chrome/answer/95647' },
                { label: 'Firefox', href: 'https://support.mozilla.org/kb/cookies-information-websites-store-on-your-computer' },
                { label: 'Safari',  href: 'https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac' },
                { label: 'Edge',    href: 'https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
              ].map(b => (
                <a
                  key={b.label}
                  href={b.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 border border-navy/20 rounded-lg text-slate-custom hover:text-navy hover:border-navy/40 transition-colors font-display font-semibold text-xs uppercase tracking-wide"
                >
                  {b.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-custom">
              Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Shared preference toggle row ── */
interface PrefRowProps {
  label: string;
  description: string;
  checked: boolean;
  disabled: boolean;
  onChange: (v: boolean) => void;
}

const PreferenceRow = ({ label, description, checked, disabled, onChange }: PrefRowProps) => (
  <div className="flex items-center gap-4">
    <div className="flex-1">
      <p className="text-offwhite text-sm font-semibold">{label}</p>
      <p className="text-offwhite/50 text-xs mt-0.5">{description}</p>
    </div>
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative flex-shrink-0 w-11 h-6 rounded-full transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 focus-visible:ring-offset-navy
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${checked ? 'bg-sand' : 'bg-white/20'}
      `}
      aria-label={`Toggle ${label}`}
    >
      <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  </div>
);

export default CookiesPage;
