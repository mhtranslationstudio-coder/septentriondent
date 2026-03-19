import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleBack = () => {
    // Save current scroll position before going back
    if (window.__scrollPositions) {
      window.__scrollPositions[pathname] = window.scrollY;
    }
    navigate(-1);
  };

  return (
    <button
      onClick={handleBack}
      className="inline-flex items-center gap-2 text-navy hover:text-sand transition-colors duration-200 font-display font-semibold text-sm uppercase tracking-widest group"
    >
      <span className="w-9 h-9 rounded-full border-2 border-current flex items-center justify-center group-hover:bg-sand group-hover:border-sand transition-all duration-200">
        <ArrowLeft size={16} className="group-hover:text-navy transition-colors duration-200" />
      </span>
      Back
    </button>
  );
};

export default BackButton;
