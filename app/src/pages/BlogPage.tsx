import { useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { useSEO } from '../hooks/useSEO';
import { allBlogPosts as blogPosts } from '../data/blogPosts';
import { ArrowRight, Clock, Tag } from 'lucide-react';

const categories = ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))];

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  useSEO({
    title: 'Blog — Dental Tourism in Albania',
    description:
      'Expert guides on dental implants, costs, travel, and medical tourism in Albania. Written by the Septentrion Group team.',
    canonicalPath: '/blog',
    keywords: 'dental tourism blog, Albania dental blog, dental implants abroad guide, teeth abroad articles',
  });

  const filtered =
    activeCategory === 'All'
      ? blogPosts
      : blogPosts.filter(p => p.category === activeCategory);

  const [featured, ...rest] = filtered;

  return (
    <div className="min-h-screen bg-offwhite pt-24 pb-24">
      {/* Back */}
      <div className="max-w-5xl mx-auto px-6 lg:px-12 mb-6">
        <BackButton />
      </div>

      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 lg:px-12 mb-12 text-center">
        <p className="text-label text-sand mb-3 tracking-[0.2em]">KNOWLEDGE HUB</p>
        <h1 className="headline-lg text-navy mb-4">Dental Tourism Guides</h1>
        <p className="body-text text-slate-custom max-w-2xl mx-auto">
          Practical, honest guides on costs, procedures, travel, and what to expect when
          choosing dental treatment in Albania.
        </p>
      </div>

      {/* Category filters */}
      <div className="max-w-5xl mx-auto px-6 lg:px-12 mb-10">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-display font-semibold tracking-wide transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-navy text-offwhite shadow-card'
                  : 'bg-white text-slate-custom border border-navy/10 hover:border-navy/30 hover:text-navy'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        {/* Featured article */}
        {featured && (
          <Link
            to={`/blog/${featured.slug}`}
            className="group block mb-12 bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 h-56 lg:h-auto overflow-hidden">
                <img
                  src={featured.heroImage}
                  alt={featured.heroAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="lg:w-1/2 p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-display font-semibold uppercase tracking-widest text-sand">
                    <Tag size={12} />
                    {featured.category}
                  </span>
                  <span className="text-slate-custom/40 text-xs">·</span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-custom">
                    <Clock size={12} />
                    {featured.readingTime}
                  </span>
                </div>
                <h2 className="font-display font-bold text-2xl lg:text-3xl text-navy mb-4 leading-snug group-hover:text-sand transition-colors duration-200">
                  {featured.title}
                </h2>
                <p className="body-text text-slate-custom text-sm mb-6 line-clamp-3">
                  {featured.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 font-display font-semibold text-sm uppercase tracking-widest text-navy group-hover:text-sand transition-colors duration-200">
                  Read Article
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Remaining articles grid */}
        {rest.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-6 mb-16">
            {rest.map(post => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.heroImage}
                    alt={post.heroAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-display font-semibold uppercase tracking-widest text-sand">
                      <Tag size={11} />
                      {post.category}
                    </span>
                    <span className="text-slate-custom/40 text-xs">·</span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-custom">
                      <Clock size={11} />
                      {post.readingTime}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-lg text-navy mb-3 leading-snug group-hover:text-sand transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="text-sm text-slate-custom line-clamp-3 flex-1 mb-4">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 font-display font-semibold text-xs uppercase tracking-widest text-navy group-hover:text-sand transition-colors duration-200 mt-auto">
                    Read Article
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-custom body-text">
            No articles in this category yet. Check back soon.
          </div>
        )}

        {/* Bottom CTA */}
        <div className="bg-navy rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-offwhite mb-2">
              Ready to take the next step?
            </h2>
            <p className="text-offwhite/70 text-sm">
              Get a free, no-obligation quote from our partner clinics within 24 hours.
            </p>
          </div>
          <Link
            to="/quote"
            className="btn-primary whitespace-nowrap inline-flex items-center gap-2 flex-shrink-0"
          >
            Get a Free Quote
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
