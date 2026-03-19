import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Thin sand-coloured progress bar at the very top of the viewport,
 * fills as the user scrolls down the page — like YouTube's red bar.
 * Only visible on the home page (where the deep scroll journey lives).
 */
const ScrollProgress = () => {
  const barRef   = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number>(0);
  const location = useLocation();
  const isHome   = location.pathname === '/';

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    // Reset on route change
    bar.style.transform = 'scaleX(0)';

    if (!isHome) return;

    const update = () => {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      const progress   = docHeight > 0 ? scrollTop / docHeight : 0;
      bar.style.transform = `scaleX(${Math.min(progress, 1)})`;
      rafRef.current = 0;
    };

    const onScroll = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update(); // run once on mount

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isHome]);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[2000] h-[3px] pointer-events-none"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left"
        style={{
          background: 'linear-gradient(90deg, #D4A27F 0%, #c49070 60%, #D4A27F 100%)',
          transform: 'scaleX(0)',
          transition: 'transform 0.05s linear',
          boxShadow: '0 0 8px rgba(212,162,127,0.6)',
        }}
      />
    </div>
  );
};

export default ScrollProgress;
