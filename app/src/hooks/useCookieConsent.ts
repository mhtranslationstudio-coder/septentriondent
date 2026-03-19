/**
 * useCookieConsent
 * ─────────────────────────────────────────────────────────────────────────
 * Single source of truth for cookie consent state.
 *
 * Consent is stored in localStorage under the key "sept_cookie_consent"
 * as a JSON object: { analytics: boolean, marketing: boolean, ts: number }
 *
 * "necessary" cookies are always true and not stored — they need no consent.
 *
 * Usage:
 *   const { consent, hasDecided, saveConsent } = useCookieConsent();
 */

import { useState, useEffect, useCallback } from 'react';

export const CONSENT_KEY = 'sept_cookie_consent';

export interface ConsentPreferences {
  analytics: boolean;
  marketing: boolean;
  ts: number; // unix timestamp of decision
}

const DEFAULT_PREFS: ConsentPreferences = {
  analytics: false,
  marketing: false,
  ts: 0,
};

function readStorage(): ConsentPreferences | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentPreferences;
  } catch {
    return null;
  }
}

export function useCookieConsent() {
  const [consent, setConsent]     = useState<ConsentPreferences>(DEFAULT_PREFS);
  const [hasDecided, setHasDecided] = useState(false);

  // Initialise from storage on mount
  useEffect(() => {
    const stored = readStorage();
    if (stored && stored.ts > 0) {
      setConsent(stored);
      setHasDecided(true);
    }
  }, []);

  const saveConsent = useCallback((prefs: Omit<ConsentPreferences, 'ts'>) => {
    const full: ConsentPreferences = { ...prefs, ts: Date.now() };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(full));
    setConsent(full);
    setHasDecided(true);

    // If analytics consented, load GA4 now (replace G-XXXXXXXX with your ID)
    if (prefs.analytics && typeof window !== 'undefined') {
      loadGoogleAnalytics('G-XXXXXXXX');
    }
  }, []);

  const resetConsent = useCallback(() => {
    localStorage.removeItem(CONSENT_KEY);
    setConsent(DEFAULT_PREFS);
    setHasDecided(false);
  }, []);

  return { consent, hasDecided, saveConsent, resetConsent };
}

// ── GA4 dynamic loader ────────────────────────────────────────────────────
// Called only after explicit analytics consent. Idempotent — safe to call
// multiple times (checks if already loaded).
export function loadGoogleAnalytics(measurementId: string) {
  if (document.getElementById('ga4-script')) return; // already loaded

  const script1 = document.createElement('script');
  script1.id    = 'ga4-script';
  script1.async = true;
  script1.src   = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.text = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}', { anonymize_ip: true });
  `;
  document.head.appendChild(script2);
}
