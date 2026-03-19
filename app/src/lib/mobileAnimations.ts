import { gsap } from './gsap';

/**
 * Attaches a simple scroll-triggered fade-up animation to elements on mobile.
 * Uses IntersectionObserver — no GSAP ScrollTrigger overhead on mobile.
 * Respects prefers-reduced-motion.
 * Returns a cleanup function.
 */
export function attachMobileFadeIn(
  targets: (Element | null)[],
  options: { stagger?: number; duration?: number; y?: number } = {}
): () => void {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const validTargets = targets.filter(Boolean) as Element[];
  if (!validTargets.length) return () => {};

  const { stagger = 0.08, duration = 0.5, y = 28 } = options;

  if (prefersReduced) {
    // Just make them visible instantly
    validTargets.forEach(el => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.transform = 'none';
    });
    return () => {};
  }

  // Set initial hidden state
  validTargets.forEach(el => {
    gsap.set(el, { opacity: 0, y });
  });

  let animated = false;
  const obs = new IntersectionObserver(
    (entries) => {
      if (animated) return;
      const isVisible = entries.some(e => e.isIntersecting);
      if (!isVisible) return;
      animated = true;
      gsap.to(validTargets, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: 'power2.out',
        clearProps: 'transform',
      });
      obs.disconnect();
    },
    { threshold: 0.12 }
  );

  // Observe the first target as sentinel
  obs.observe(validTargets[0]);

  return () => obs.disconnect();
}
