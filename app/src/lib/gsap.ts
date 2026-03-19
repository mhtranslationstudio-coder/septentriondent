// Centralized GSAP registration — import this once at app entry, never call
// gsap.registerPlugin elsewhere.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Pin removed — sections now use standard document flow (position: static/relative)
// Animations are simple fade-in-up on scroll, no pinning or scrubbing
export const PINNED_ST_CONFIG = {
  start: 'top top',
  end: '+=130%',
  pin: false,
  scrub: 0,
} as const;

// Shared scroll utility used by Navigation and HeroSection
export function scrollToSection(href: string) {
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

export { gsap, ScrollTrigger };
