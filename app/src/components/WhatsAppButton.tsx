import { useState, useEffect } from 'react';
import { PHONE_RAW } from '../hooks/useSEO';

const WHATSAPP_URL = `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent("Hi Septentrion Group! I'd like to enquire about medical tourism in Albania.")}`;

const WhatsAppButton = () => {
  const [visible, setVisible] = useState(false);
  const [pulsing, setPulsing] = useState(false);

  useEffect(() => {
    // Appear after 10 seconds
    const showTimer = setTimeout(() => {
      setVisible(true);
      // Pulse once after appearing to draw attention
      setTimeout(() => setPulsing(true), 300);
      setTimeout(() => setPulsing(false), 2300);
    }, 10000);

    return () => clearTimeout(showTimer);
  }, []);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`
        fixed bottom-6 right-6 z-[9999]
        w-14 h-14 rounded-full shadow-2xl
        flex items-center justify-center
        transition-all duration-500
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}
        ${pulsing ? 'scale-110' : 'scale-100'}
        hover:scale-110 active:scale-95
      `}
      style={{ background: '#25D366' }}
    >
      {/* Ripple ring */}
      {visible && (
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{ background: '#25D366', opacity: 0.35 }}
        />
      )}

      {/* WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-7 h-7 relative z-10"
        fill="white"
      >
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.471 2.027 7.774L0 32l8.476-2.004A15.934 15.934 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.747-1.832l-.484-.287-5.027 1.188 1.212-4.91-.316-.503A13.267 13.267 0 012.667 16C2.667 8.637 8.637 2.667 16 2.667S29.333 8.637 29.333 16 23.363 29.333 16 29.333zm7.27-9.688c-.398-.199-2.352-1.16-2.716-1.292-.364-.133-.629-.199-.894.199-.265.398-1.028 1.292-1.26 1.558-.232.265-.464.298-.862.1-.398-.2-1.681-.619-3.202-1.977-1.184-1.057-1.983-2.362-2.215-2.76-.232-.398-.025-.613.174-.812.179-.178.398-.464.597-.696.199-.232.265-.398.398-.663.133-.265.066-.497-.033-.696-.1-.199-.894-2.154-1.226-2.95-.322-.774-.649-.669-.894-.681l-.762-.013c-.265 0-.696.1-1.061.497-.364.398-1.392 1.36-1.392 3.315s1.425 3.845 1.624 4.11c.199.265 2.803 4.277 6.79 5.997.949.41 1.69.655 2.268.839.953.303 1.82.26 2.505.158.764-.114 2.352-.961 2.683-1.889.332-.928.332-1.724.232-1.889-.1-.166-.364-.265-.762-.464z" />
      </svg>

      {/* Tooltip */}
      <span
        className="
          absolute right-16 bg-navy text-offwhite text-xs font-body font-medium
          whitespace-nowrap px-3 py-1.5 rounded-lg shadow-lg
          opacity-0 group-hover:opacity-100 pointer-events-none
          transition-opacity duration-200
        "
      >
        Chat with us
      </span>
    </a>
  );
};

export default WhatsAppButton;
