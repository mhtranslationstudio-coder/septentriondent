import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, Home } from 'lucide-react';

const NotFoundPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-screen bg-offwhite flex flex-col items-center justify-center px-6 pt-24 pb-16">
      {/* Large 404 */}
      <div className="relative mb-8 select-none">
        <span
          className="font-display font-bold text-[clamp(120px,20vw,220px)] leading-none text-navy/06"
          aria-hidden="true"
        >
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-sand flex items-center justify-center shadow-lg">
            <span className="font-display font-bold text-navy text-2xl">?</span>
          </div>
        </div>
      </div>

      {/* Heading */}
      <h1 className="font-display font-bold text-3xl sm:text-4xl text-navy text-center mb-4">
        Page Not Found
      </h1>
      <p className="body-text text-slate-custom text-center max-w-md mb-10">
        The page you're looking for doesn't exist or has been moved. Let us help you find what you need.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <Home size={16} />
          Back to Homepage
        </Link>
        <Link to="/quote" className="btn-secondary inline-flex items-center gap-2">
          Get a Free Quote
        </Link>
      </div>

      {/* Helpful links */}
      <div className="w-full max-w-lg">
        <p className="font-display font-semibold text-xs uppercase tracking-widest text-navy/40 text-center mb-5">
          Popular Pages
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'Dentistry',     href: '/dentistry'      },
            { label: 'How It Works',  href: '/how-it-works'   },
            { label: 'Compare Costs', href: '/compare-costs'  },
            { label: 'Accommodations',href: '/accommodations' },
            { label: 'FAQ',           href: '/faq'            },
            { label: 'Blog',          href: '/blog'           },
          ].map(link => (
            <Link
              key={link.href}
              to={link.href}
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white shadow-sm border border-navy/08 text-sm font-body text-slate-custom hover:text-navy hover:border-sand transition-all duration-200"
            >
              <ArrowLeft size={12} className="text-sand rotate-180 flex-shrink-0" />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
