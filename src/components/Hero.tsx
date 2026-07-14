import React, { useEffect, useState } from 'react';
import { ArrowRight, FileText } from 'lucide-react';

interface HeroProps {
  onExploreProducts: () => void;
  onRequestQuote: () => void;
  lang: 'en' | 'ta';
}

export const Hero: React.FC<HeroProps> = ({ onExploreProducts, onRequestQuote, lang }) => {
  // Counters states
  const [experience, setExperience] = useState(0);
  const [established, setEstablished] = useState(1990);
  const [employees, setEmployees] = useState(0);
  const [partnerScore, setPartnerScore] = useState(0);

  useEffect(() => {
    // Experience animation: 0 -> 15
    const expInterval = setInterval(() => {
      setExperience((prev) => {
        if (prev >= 15) {
          clearInterval(expInterval);
          return 15;
        }
        return prev + 1;
      });
    }, 80);

    // Established animation: 1990 -> 2005
    const estInterval = setInterval(() => {
      setEstablished((prev) => {
        if (prev >= 2005) {
          clearInterval(estInterval);
          return 2005;
        }
        return prev + 1;
      });
    }, 20);

    // Employees animation: 0 -> 25
    const empInterval = setInterval(() => {
      setEmployees((prev) => {
        if (prev >= 25) {
          clearInterval(empInterval);
          return 25;
        }
        return prev + 1;
      });
    }, 50);

    // Partner score: 0 -> 100
    const partnerInterval = setInterval(() => {
      setPartnerScore((prev) => {
        if (prev >= 100) {
          clearInterval(partnerInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 15);

    return () => {
      clearInterval(expInterval);
      clearInterval(estInterval);
      clearInterval(empInterval);
      clearInterval(partnerInterval);
    };
  }, []);

  return (
    <section id="home" className="hero">
      {/* Background Visual Overlay Gradient */}
      <div className="hero-overlay-gradient"></div>
      
      {/* Blended Background Image positioned on the right */}
      <div 
        className="hero-background-image" 
        style={{ backgroundImage: "url('/production_enhanced.png')" }}
      ></div>

      {/* Floating abstract technical geometries */}
      <div className="hero-shapes">
        <div className="hero-shape hero-shape-1"></div>
        <div className="hero-shape hero-shape-2"></div>
      </div>

      <div className="container">
        <div className="hero-content-left">
          {/* Headline */}
          <h1 className="hero-title">
            {lang === 'en' 
              ? (localStorage.getItem('ep_hero_title') || 'Precision Engineered. Reliably Manufactured.') 
              : 'துல்லியமான பொறியியல். நம்பகமான உற்பத்தி.'}
          </h1>

          {/* Subheadline */}
          <p className="hero-subtitle">
            {lang === 'en'
              ? 'Essay Pressings manufactures precision-engineered metal components, washers, brackets, SS components, MS components, rubber washers, and custom press parts for industrial applications across India.'
              : 'எஸே பிரஸ்ஸிங்ஸ் நிறுவனம் துல்லியமாக வடிவமைக்கப்பட்ட மெட்டல் பாகங்கள், வாஷர்கள், பிராக்கெட்ஸ், எஸெஸ் மற்றும் எம்எஸ் கூறுகள், ரப்பர் வாஷர்கள் மற்றும் தனிப்பயனாக்கப்பட்ட பிரஸ் உதிரிபாகங்களை இந்தியா முழுவதும் உள்ள தொழில்துறை பயன்பாடுகளுக்காக உற்பத்தி செய்கிறது.'}
          </p>

          {/* Buttons */}
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={onExploreProducts}>
              <span>{lang === 'en' ? 'Explore Products' : 'தயாரிப்புகளை ஆராய்க'}</span>
              <ArrowRight size={16} />
            </button>
            <button className="btn btn-secondary" onClick={onRequestQuote}>
              <FileText size={16} />
              <span>{lang === 'en' ? 'Request a Quote' : 'கட்டண விவரம் கேட்கவும்'}</span>
            </button>
          </div>

          {/* Counters Grid */}
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">{experience}+</div>
              <div className="stat-label">
                {lang === 'en' ? 'Years Experience' : 'ஆண்டுகள் அனுபவம்'}
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-number">{established}</div>
              <div className="stat-label">
                {lang === 'en' ? 'Manufacturer Established' : 'துவங்கப்பட்ட ஆண்டு'}
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-number">{employees}+</div>
              <div className="stat-label">
                {lang === 'en' ? 'Skilled Employees' : 'பயிற்சி பெற்ற ஊழியர்கள்'}
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-number">{partnerScore}%</div>
              <div className="stat-label">
                {lang === 'en' ? 'Quality & Trust Score' : 'தரம் மற்றும் மதிப்பு'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
