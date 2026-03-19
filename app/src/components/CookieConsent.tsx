/**
 * CookieConsent banner
 * ─────────────────────────────────────────────────────────────────────────
 * Appears on first visit (bottom of screen) until the user makes a choice.
 * Three actions: Accept All · Reject Non-Essential · Customise
 * "Customise" expands granular toggles for analytics / marketing.
 * Decision is persisted via useCookieConsent → localStorage.
 * Fully keyboard-navigable and screen-reader labelled.
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useCookieConsent } from '../hooks/useCookieConsent';

const CookieConsent = () => {
  const { hasDecided, saveConsent } = useCookieConsent();

  const [visible, setVisible]     = useState(false);
  const [expanded, setExpanded]     = useState(false);
  const [analytics, setAnalytics]   = useState(false);
  const [marketing, setMarketing]   = useState(false);

  // Don't render if user has already decided
  useEffect(() => {
    if (hasDecided) return;
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, [hasDecided]);

  if (hasDecided || !visible) return null;

  const acceptAll = () => saveConsent({ analytics: true,  marketing: true  });
  const rejectAll = () => saveConsent({ analytics: false, marketing: false });
  const saveCustom = () => saveConsent({ analytics, marketing });

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[9000] p-4 sm:p-6 animate-[cookieslide_0.4s_ease-out_both]"
    >
      <div className="max-w-4xl mx-auto bg-navy rounded-2xl shadow-2xl border border-white/10 overflow-hidden">

        {/* ── Main bar ── */}
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sand/20 flex items-center justify-center mt-0.5">
              <Cookie size={20} className="text-sand" />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-offwhite text-sm sm:text-base mb-1">
                We use cookies
              </p>
              <p className="text-offwhite/65 text-xs sm:text-sm leading-relaxed">
                We use strictly necessary cookies to make the site work. With your consent, we'd also
                like to set optional analytics cookies to understand how you use it.{' '}
                <Link
                  to="/cookies"
                  className="text-sand underline underline-offset-2 hover:text-sand-light transition-colors"
                >
                  Cookie Policy
                </Link>
              </p>
            </div>

            {/* Customise toggle — desktop inline */}
            <button
              onClick={() => setExpanded(e => !e)}
              className="hidden sm:flex flex-shrink-0 items-center gap-1 text-xs text-offwhite/60 hover:text-offwhite transition-colors font-semibold uppercase tracking-wider"
              aria-expanded={expanded}
            >
              Customise
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>

          {/* ── Granular toggles (expanded) ── */}
          {expanded && (
            <div className="mt-5 pt-5 border-t border-white/10 space-y-4">
              {/* Necessary — always on */}
              <Toggle
                label="Strictly Necessary"
                description="Required for the site to function. Cannot be disabled."
                checked={true}
                disabled={true}
                onChange={() => {}}
              />
              {/* Analytics */}
              <Toggle
                label="Analytics"
                description="Helps us understand how visitors use the site (e.g. Google Analytics). No personal data is sold."
                checked={analytics}
                disabled={false}
                onChange={setAnalytics}
              />
              {/* Marketing */}
              <Toggle
                label="Marketing"
                description="Used to show relevant ads on other platforms. We currently run no paid advertising."
                checked={marketing}
                disabled={false}
                onChange={setMarketing}
              />
            </div>
          )}

          {/* ── Buttons ── */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {/* Customise toggle — mobile */}
            <button
              onClick={() => setExpanded(e => !e)}
              className="sm:hidden text-xs text-offwhite/60 hover:text-offwhite transition-colors font-semibold uppercase tracking-wider flex items-center gap-1"
              aria-expanded={expanded}
            >
              Customise
              {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>

            <div className="flex flex-wrap gap-3 ml-auto">
              <button
                onClick={rejectAll}
                className="px-4 py-2.5 text-xs sm:text-sm font-display font-semibold uppercase tracking-wider text-offwhite/70 hover:text-offwhite border border-white/20 hover:border-white/40 rounded-lg transition-all duration-200"
              >
                Reject Non-Essential
              </button>

              {expanded ? (
                <button
                  onClick={saveCustom}
                  className="px-5 py-2.5 text-xs sm:text-sm font-display font-semibold uppercase tracking-wider bg-sand text-navy rounded-lg hover:bg-sand-light transition-all duration-200"
                >
                  Save Preferences
                </button>
              ) : (
                <button
                  onClick={acceptAll}
                  className="px-5 py-2.5 text-xs sm:text-sm font-display font-semibold uppercase tracking-wider bg-sand text-navy rounded-lg hover:bg-sand-light transition-all duration-200"
                >
                  Accept All
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Toggle sub-component ── */
interface ToggleProps {
  label: string;
  description: string;
  checked: boolean;
  disabled: boolean;
  onChange: (v: boolean) => void;
}

const Toggle = ({ label, description, checked, disabled, onChange }: ToggleProps) => (
  <div className="flex items-start gap-4">
    <div className="flex-1">
      <p className="text-offwhite text-sm font-semibold">{label}</p>
      <p className="text-offwhite/50 text-xs mt-0.5 leading-relaxed">{description}</p>
    </div>
    {/* Toggle switch */}
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative flex-shrink-0 mt-0.5 w-10 h-6 rounded-full transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 focus-visible:ring-offset-navy
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${checked ? 'bg-sand' : 'bg-white/20'}
      `}
      aria-label={`${label} cookies`}
    >
      <span
        className={`
          absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200
          ${checked ? 'translate-x-4' : 'translate-x-0'}
        `}
      />
    </button>
  </div>
);

export default CookieConsent;
