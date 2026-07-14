import React, { useState } from 'react';
import { 
  Database, Edit, Cpu, Hammer, Eye, ShieldCheck, Box, Truck 
} from 'lucide-react';

interface ProcessProps {
  lang: 'en' | 'ta';
}

export const Process: React.FC<ProcessProps> = ({ lang }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      icon: <Database size={24} />,
      name: lang === 'en' ? 'Raw Material' : 'மூலப்பொருள்',
      desc: lang === 'en' ? 'Sourcing premium steel sheets, brass, and rubber coils.' : 'உயர்தர எஃகு தாள்கள், பித்தளை மற்றும் ரப்பர் சுருள்களைப் பெறுதல்.'
    },
    {
      icon: <Edit size={24} />,
      name: lang === 'en' ? 'Tool Design' : 'கருவி வடிவமைப்பு',
      desc: lang === 'en' ? 'Custom CAD tool & die making matching specifications.' : 'வாடிக்கையாளர் வரைபடங்களுக்கு ஏற்ப தனிப்பயன் அச்சு வடிவமைப்பு.'
    },
    {
      icon: <Cpu size={24} />,
      name: lang === 'en' ? 'Precision Pressing' : 'துல்லியமான அழுத்தம்',
      desc: lang === 'en' ? 'High-speed stamping presses forming components.' : 'உயர் வேக மெட்டல் ஸ்டாம்பிங் அழுத்தங்கள் மூலம் பாகங்களை உருவாக்குதல்.'
    },
    {
      icon: <Hammer size={24} />,
      name: lang === 'en' ? 'Machining' : 'இயந்திரப் பணி',
      desc: lang === 'en' ? 'Fine edging, deburring, and slot cutting finishes.' : 'நுண்ணிய விளிம்பு தயாரித்தல் மற்றும் கூடுதல் உலோக நீக்கம்.'
    },
    {
      icon: <Eye size={24} />,
      name: lang === 'en' ? 'Inspection' : 'ஆரம்ப ஆய்வு',
      desc: lang === 'en' ? 'Micro-dimension checks using digital calipers.' : 'டிஜிட்டல் காலிப்பர்களைப் பயன்படுத்தி அளவுகளை சரிபார்த்தல்.'
    },
    {
      icon: <ShieldCheck size={24} />,
      name: lang === 'en' ? 'Quality Control' : 'தரக் கட்டுப்பாடு',
      desc: lang === 'en' ? 'Batch testing ensuring zero structural weaknesses.' : 'தயாரிப்புகளின் தரம் மற்றும் வலிமை பற்றிய இறுதி சோதனை.'
    },
    {
      icon: <Box size={24} />,
      name: lang === 'en' ? 'Packaging' : 'பேக்கேஜிங்',
      desc: lang === 'en' ? 'Corrosion-proof wrapping and secure heavy boxing.' : 'அரிப்பைத் தடுக்கும் பாதுகாப்பு உறைகள் மற்றும் பெட்டிகளில் அடைத்தல்.'
    },
    {
      icon: <Truck size={24} />,
      name: lang === 'en' ? 'Delivery' : 'விநியோகம்',
      desc: lang === 'en' ? 'Timely dispatch via reliable road freight.' : 'நம்பகமான சாலை போக்குவரத்து மூலம் வாடிக்கையாளர்களுக்கு அனுப்புதல்.'
    }
  ];

  return (
    <section id="process" className="section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="text-center">
          <p className="section-subtitle">{lang === 'en' ? 'WORKFLOW' : 'செயல்முறை ஓட்டம்'}</p>
          <h2 className="section-title">
            {lang === 'en' ? 'Manufacturing Process' : 'உற்பத்தி செயல்முறை'}
          </h2>
          <p className="section-desc">
            {lang === 'en'
              ? 'Our end-to-end precision sheet metal fabrication stages ensure maximum consistency from batch to batch.'
              : 'எங்கள் இறுதி முதல் இறுதி வரையிலான துல்லியமான தாள் உலோக தயாரிப்பு நிலைகள் ஒவ்வொரு தொகுதிக்கும் அதிகபட்ச தரத்தை உறுதி செய்கின்றன.'}
          </p>
        </div>

        {/* Horizontal timeline */}
        <div className="process-flow">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className={`process-step ${activeStep === idx ? 'active' : ''}`}
              onMouseEnter={() => setActiveStep(idx)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className="process-icon-outer">
                {step.icon}
                <div className="process-number">{idx + 1}</div>
              </div>
              <div className="process-text-box">
                <h3 className="process-name">{step.name}</h3>
                <p className="process-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
