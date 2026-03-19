import { useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { useSEO } from '../hooks/useSEO';
import { allBlogPosts as blogPosts, type Section } from '../data/blogPosts';
import { gsap } from '../lib/gsap';
import { ArrowRight, Clock, Tag, ChevronRight } from 'lucide-react';

/* ── JSON-LD Article schema ─────────────────────────────────────────────── */
const buildArticleSchema = (post: (typeof blogPosts)[number]) =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.metaTitle,
    description: post.metaDescription,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    author: {
      '@type': 'Organization',
      name: 'Septentrion Group',
      url: 'https://septentrion.group',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Septentrion Group',
      logo: { '@type': 'ImageObject', url: 'https://septentrion.group/logo.png' },
    },
    image: `https://septentrion.group${post.heroImage}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://septentrion.group/blog/${post.slug}` },
  });

/* ── JSON-LD FAQ schema — extracts h2 questions + their answer text ──────── */
const buildFAQSchema = (post: (typeof blogPosts)[number]): string | null => {
  const faqs: { question: string; answer: string }[] = [];

  post.body.forEach((section, i) => {
    if (section.type !== 'h2' || !section.content) return;

    // Collect answer from all sections that follow this h2 until the next h2 or cta
    const answerParts: string[] = [];
    for (let j = i + 1; j < post.body.length; j++) {
      const next = post.body[j];
      if (next.type === 'h2' || next.type === 'cta') break;
      if (next.type === 'p' && next.content) answerParts.push(next.content);
      if (next.type === 'ul' && next.items) answerParts.push(next.items.join(' '));
      if (next.type === 'table' && next.rows) {
        const rows = next.rows.map(r => r.cells.join(': ')).join('. ');
        answerParts.push(rows);
      }
    }

    const answer = answerParts.join(' ').trim();
    // Only include if there's a meaningful answer (at least 30 chars)
    if (answer.length > 30) {
      faqs.push({ question: section.content, answer: answer.slice(0, 600) });
    }
  });

  if (faqs.length === 0) return null;

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  });
};

/* ── Section renderer ───────────────────────────────────────────────────── */
const RenderSection = ({ section }: { section: Section }) => {
  switch (section.type) {
    case 'h2':
      return (
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy mt-12 mb-5 leading-snug">
          {section.content}
        </h2>
      );
    case 'h3':
      return (
        <h3 className="font-display font-bold text-lg sm:text-xl text-navy mt-8 mb-3">
          {section.content}
        </h3>
      );
    case 'p':
      return (
        <p className="body-text text-slate-custom leading-relaxed mb-5 text-base sm:text-lg">
          {section.content}
        </p>
      );
    case 'ul':
      return (
        <ul className="mb-6 space-y-3">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-sand flex-shrink-0" />
              <span className="body-text text-slate-custom text-base">{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <div className="overflow-x-auto mb-8 rounded-xl border border-navy/10 shadow-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy">
                {section.header?.map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left font-display font-semibold text-offwhite text-xs uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows?.map((row, i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? 'bg-white' : 'bg-offwhite'}
                >
                  {row.cells.map((cell, j) => (
                    <td
                      key={j}
                      className={`px-4 py-3 text-slate-custom ${
                        j === 0 ? 'font-semibold text-navy' : ''
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'cta':
      return (
        <div className="my-10 bg-navy rounded-2xl p-8 sm:p-10 text-center">
          <Link
            to={section.ctaLink || '/quote'}
            className="btn-primary inline-flex items-center gap-2 mb-3"
          >
            {section.ctaText}
            <ArrowRight size={18} />
          </Link>
          {section.ctaSubtext && (
            <p className="text-offwhite/60 text-sm mt-3">{section.ctaSubtext}</p>
          )}
        </div>
      );
    default:
      return null;
  }
};

/* ── Main component ─────────────────────────────────────────────────────── */
const BlogArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const pageRef   = useRef<HTMLDivElement>(null);
  const heroRef   = useRef<HTMLDivElement>(null);

  const post = blogPosts.find(p => p.slug === slug);

  // Redirect to /blog if slug not found
  useEffect(() => {
    if (!post) navigate('/blog', { replace: true });
  }, [post, navigate]);

  // Inject Article + FAQ JSON-LD
  useEffect(() => {
    if (!post) return;

    // Article schema
    const articleScript = document.createElement('script');
    articleScript.type = 'application/ld+json';
    articleScript.text = buildArticleSchema(post);
    articleScript.id   = 'article-schema';
    document.head.appendChild(articleScript);

    // FAQ schema — only injected if the post has h2 sections with answers
    const faqJson = buildFAQSchema(post);
    if (faqJson) {
      const faqScript = document.createElement('script');
      faqScript.type = 'application/ld+json';
      faqScript.text = faqJson;
      faqScript.id   = 'faq-schema';
      document.head.appendChild(faqScript);
    }

    return () => {
      document.getElementById('article-schema')?.remove();
      document.getElementById('faq-schema')?.remove();
    };
  }, [post]);

  // Hero entrance animation
  useEffect(() => {
    if (!post) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.1 }
      );
    }, pageRef);
    return () => ctx.revert();
  }, [post]);

  useSEO({
    title: post?.metaTitle ?? 'Blog',
    description: post?.metaDescription ?? '',
    canonicalPath: `/blog/${slug}`,
  });

  if (!post) return null;

  // Other articles (excluding current)
  const related = blogPosts.filter(p => p.slug !== slug).slice(0, 2);

  return (
    <div ref={pageRef} className="min-h-screen bg-offwhite pt-24 pb-24">

      {/* Breadcrumb */}
      <div className="max-w-3xl mx-auto px-6 lg:px-12 mb-6 flex items-center gap-2 text-xs text-slate-custom">
        <Link to="/" className="hover:text-navy transition-colors">Home</Link>
        <ChevronRight size={12} className="text-slate-custom/40" />
        <Link to="/blog" className="hover:text-navy transition-colors">Blog</Link>
        <ChevronRight size={12} className="text-slate-custom/40" />
        <span className="text-navy font-medium truncate max-w-[200px]">{post.title}</span>
      </div>

      {/* Back */}
      <div className="max-w-3xl mx-auto px-6 lg:px-12 mb-8">
        <BackButton />
      </div>

      {/* Article header */}
      <div ref={heroRef} className="max-w-3xl mx-auto px-6 lg:px-12 mb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="inline-flex items-center gap-1.5 text-xs font-display font-semibold uppercase tracking-widest text-sand">
            <Tag size={12} />
            {post.category}
          </span>
          <span className="text-slate-custom/40 text-xs">·</span>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-custom">
            <Clock size={12} />
            {post.readingTime}
          </span>
          <span className="text-slate-custom/40 text-xs">·</span>
          <span className="text-xs text-slate-custom">
            {new Date(post.publishDate).toLocaleDateString('en-GB', {
              day: 'numeric', month: 'long', year: 'numeric',
            })}
          </span>
        </div>

        <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-navy leading-tight mb-6">
          {post.title}
        </h1>

        <p className="body-text text-slate-custom text-lg leading-relaxed border-l-4 border-sand pl-5 py-1">
          {post.excerpt}
        </p>
      </div>

      {/* Hero image */}
      <div className="max-w-5xl mx-auto px-6 lg:px-12 mb-12">
        <div className="rounded-2xl overflow-hidden shadow-card h-64 sm:h-80 lg:h-96">
          <img
            src={post.heroImage}
            alt={post.heroAlt}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      </div>

      {/* Article body */}
      <article className="max-w-3xl mx-auto px-6 lg:px-12">
        {post.body.map((section, i) => (
          <RenderSection key={i} section={section} />
        ))}
      </article>

      {/* Author / source strip */}
      <div className="max-w-3xl mx-auto px-6 lg:px-12 mt-14">
        <div className="flex items-center gap-4 p-6 bg-white rounded-xl border border-navy/10">
          <img src="/logo.png" alt="Septentrion Group" className="h-10 w-10 object-contain flex-shrink-0"
            loading="lazy" />
          <div>
            <p className="font-display font-bold text-sm text-navy">Septentrion Group</p>
            <p className="text-xs text-slate-custom mt-0.5">
              Medical tourism facilitation specialists based in Tirana, Albania. All content is reviewed
              by our clinical coordinators and updated regularly.
            </p>
          </div>
        </div>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 lg:px-12 mt-20">
          <h2 className="font-display font-bold text-2xl text-navy mb-8">Related Articles</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {related.map(rp => (
              <Link
                key={rp.slug}
                to={`/blog/${rp.slug}`}
                className="group bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="h-44 overflow-hidden">
                  <img
                    src={rp.heroImage}
                    alt={rp.heroAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-display font-semibold uppercase tracking-widest text-sand mb-2">
                    {rp.category}
                  </span>
                  <h3 className="font-display font-bold text-base text-navy mb-3 leading-snug group-hover:text-sand transition-colors duration-200">
                    {rp.title}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-xs font-display font-semibold uppercase tracking-wider text-navy group-hover:text-sand transition-colors duration-200 mt-auto">
                    Read Article
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="max-w-5xl mx-auto px-6 lg:px-12 mt-16">
        <div className="bg-sand rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy mb-4">
            Ready to Get a Free Quote?
          </h2>
          <p className="body-text text-navy/70 mb-8 max-w-xl mx-auto">
            Fill in our form in 5 minutes. We respond within 24 hours with a personalised
            treatment plan and transparent pricing.
          </p>
          <Link to="/quote" className="btn-primary inline-flex items-center gap-2">
            Get a Free Quote
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogArticlePage;
