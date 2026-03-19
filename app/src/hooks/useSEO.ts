import { useEffect } from 'react';

interface SEOMeta {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: string;
  canonicalPath?: string;
  keywords?: string;
  noIndex?: boolean;
}

const SITE_NAME = 'Septentrion Group';
const SITE_URL  = 'https://septentrion.group';
const DEFAULT_IMG = `${SITE_URL}/og-cover.jpg`;
const PHONE     = '+44 20 4577 2065';
const PHONE_RAW = '+442045772065';

export { PHONE, PHONE_RAW };

function setMeta(name: string, content: string, property = false) {
  const attr = property ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string, extra?: Record<string, string>) {
  // Use a unique selector per rel+hreflang combo
  const hreflang = extra?.hreflang ?? '';
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]`;
  let el = document.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (extra) Object.entries(extra).forEach(([k, v]) => el!.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function useSEO({
  title,
  description,
  ogImage = DEFAULT_IMG,
  ogType = 'website',
  canonicalPath = '',
  keywords,
  noIndex = false,
}: SEOMeta) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const canonical = `${SITE_URL}${canonicalPath}`;

    document.title = fullTitle;

    // ── Robots ───────────────────────────────────────────────────────────
    setMeta('robots', noIndex ? 'noindex,nofollow' : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1');
    setMeta('googlebot', noIndex ? 'noindex,nofollow' : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1');

    // ── Standard meta ────────────────────────────────────────────────────
    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);

    // ── Geo targeting — tells Google this site serves international English speakers ──
    setMeta('geo.region', 'AL');
    setMeta('geo.placename', 'Tirana, Albania');
    setMeta('geo.position', '41.3275;19.8187');
    setMeta('ICBM', '41.3275, 19.8187');

    // ── Open Graph ───────────────────────────────────────────────────────
    setMeta('og:title',       fullTitle,   true);
    setMeta('og:description', description, true);
    setMeta('og:image',       ogImage,     true);
    setMeta('og:image:width',  '1200',     true);
    setMeta('og:image:height', '630',      true);
    setMeta('og:url',         canonical,   true);
    setMeta('og:type',        ogType,      true);
    setMeta('og:site_name',   SITE_NAME,   true);
    setMeta('og:locale',      'en_GB',     true);

    // ── Twitter / X card ─────────────────────────────────────────────────
    setMeta('twitter:card',        'summary_large_image');
    setMeta('twitter:title',       fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image',       ogImage);
    setMeta('twitter:site',        '@SeptentrionGroup');

    // ── Canonical ────────────────────────────────────────────────────────
    setLink('canonical', canonical);

    // ── hreflang per-page — critical for international ranking ───────────
    const regions = ['en', 'en-gb', 'en-us', 'en-ie', 'en-au', 'en-ca'];
    regions.forEach(lang => setLink('alternate', canonical, { hreflang: lang }));
    setLink('alternate', canonical, { hreflang: 'x-default' });

    // ── BreadcrumbList schema — helps Google show breadcrumbs in results ─
    const pathParts = canonicalPath.replace(/^\//, '').split('/').filter(Boolean);
    if (pathParts.length > 0) {
      const breadcrumbs = [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        ...pathParts.map((part, i) => ({
          '@type': 'ListItem',
          position: i + 2,
          name: part.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          item: `${SITE_URL}/${pathParts.slice(0, i + 1).join('/')}`,
        })),
      ];
      const breadcrumbSchema = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs,
      });
      let bcScript = document.getElementById('breadcrumb-schema') as HTMLScriptElement | null;
      if (!bcScript) {
        bcScript = document.createElement('script');
        bcScript.type = 'application/ld+json';
        bcScript.id = 'breadcrumb-schema';
        document.head.appendChild(bcScript);
      }
      bcScript.text = breadcrumbSchema;
    }

  }, [title, description, ogImage, ogType, canonicalPath, keywords, noIndex]);
}
