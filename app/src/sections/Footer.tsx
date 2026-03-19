import { Link } from 'react-router-dom';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) { setSent(true); setEmail(''); }
  };

  const navGroups = [
    {
      label: 'Useful Pages',
      links: [
        { label: 'Home',          href: '/'              },
        { label: 'Dentistry',     href: '/dentistry'     },
        { label: 'How It Works',  href: '/how-it-works'  },
        { label: 'Compare Costs', href: '/compare-costs' },
      ],
    },
    {
      label: 'Information',
      links: [
        { label: 'Plan Your Trip',   href: '/plan-trip'      },
        { label: 'Accommodations',   href: '/accommodations' },
        { label: 'FAQ',              href: '/faq'            },
        { label: 'Blog',             href: '/blog'           },
      ],
    },
    {
      label: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms',          href: '/terms'   },
        { label: 'Cookies',        href: '/cookies' },
      ],
    },
  ];

  const socialLinks = [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/septentriongroup',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/septentrion-group/',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      label: 'Email',
      href: 'mailto:info@septentriondent.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
    },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/442045772065',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-offwhite border-t border-navy/10 pt-12 pb-8 animate-footer-fade">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Main footer grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-10">

          {/* LEFT — Nav groups */}
          <div className="space-y-6">
            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-2 mb-2">
              <img src="/logo.png" alt="Septentrion" className="h-14 w-auto" width={300} height={56} loading="lazy" decoding="async" />
            </Link>

            {navGroups.map((group) => (
              <div key={group.label} className="flex flex-wrap items-baseline gap-x-1">
                <span className="font-display font-bold text-xs uppercase tracking-widest text-navy/40 mr-2 whitespace-nowrap">
                  {group.label}:
                </span>
                {group.links.map((link, i) => (
                  <span key={link.label} className="flex items-center">
                    <Link
                      to={link.href}
                      className="font-body text-sm text-slate-custom hover:text-navy transition-colors whitespace-nowrap py-0.5"
                    >
                      {link.label}
                    </Link>
                    {i < group.links.length - 1 && (
                      <span className="text-navy/25 mx-1.5 text-sm select-none">/</span>
                    )}
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* RIGHT — Newsletter + Hours + Socials */}
          <div className="space-y-7">

            {/* Newsletter */}
            <div>
              <p className="font-display font-bold text-xs uppercase tracking-widest text-navy/40 mb-3">
                Stay Informed
              </p>
              {sent ? (
                <p className="text-sm text-sand font-body font-medium">Thank you for subscribing!</p>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-1 text-sm font-body px-4 py-2.5 rounded-md border border-navy/20 bg-white text-navy placeholder-slate-custom/50 focus:outline-none focus:border-sand transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-navy text-offwhite text-xs font-body font-semibold uppercase tracking-widest rounded-md hover:bg-sand hover:text-navy transition-all duration-300 whitespace-nowrap"
                  >
                    Send
                  </button>
                </form>
              )}
            </div>

            {/* Working Hours */}
            <div>
              <p className="font-display font-bold text-xs uppercase tracking-widest text-navy/40 mb-3">
                Working Hours
              </p>
              <div className="space-y-1.5">
                {[
                  { day: 'Mon – Fri', hours: '9:00 AM – 6:00 PM' },
                  { day: 'Saturday',  hours: '9:00 AM – 2:00 PM' },
                  { day: 'Sunday',    hours: 'Closed'             },
                ].map(({ day, hours }) => (
                  <div key={day} className="flex items-center gap-3">
                    <span className="font-body text-sm text-navy/60 w-24 flex-shrink-0">{day}</span>
                    <span className={`font-body text-sm ${hours === 'Closed' ? 'text-slate-custom/50' : 'text-navy font-medium'}`}>
                      {hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div>
              <p className="font-display font-bold text-xs uppercase tracking-widest text-navy/40 mb-3">
                Follow Us
              </p>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full bg-navy text-offwhite flex items-center justify-center transition-all duration-300 hover:bg-sand hover:text-navy hover:scale-110"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-navy/10 mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-custom/60 font-body">
          <p>© {new Date().getFullYear()} Septentrion Group. All rights reserved.</p>
          <p>
            All personal data processed in accordance with GDPR. See our{' '}
            <Link to="/terms" className="text-sand hover:text-sand-dark transition-colors">Terms &amp; Conditions</Link>.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
