import React from 'react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

interface Custom404Props {
  onBackToHome: () => void;
  lang: 'en' | 'ta';
}

export const Custom404: React.FC<Custom404Props> = ({ onBackToHome, lang }) => {
  return (
    <div className="container custom-404">
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <AlertTriangle size={80} className="text-cta" />
      </div>
      
      <div className="custom-404-title">404</div>
      <h2 className="custom-404-sub">
        {lang === 'en' ? 'Page Not Found' : 'பக்கம் கண்டறியப்படவில்லை'}
      </h2>
      <p className="custom-404-text">
        {lang === 'en'
          ? 'The specification sheet or sub-folder you requested does not exist or has been relocated.'
          : 'நீங்கள் கோரிய பக்கம் அல்லது வரைபடம் தற்காலிகமாக மாற்றப்பட்டுள்ளது அல்லது நீக்கப்பட்டுள்ளது.'}
      </p>
      
      <button onClick={onBackToHome} className="btn btn-primary">
        <ArrowLeft size={16} />
        <span>{lang === 'en' ? 'Back to Homepage' : 'முகப்பு பக்கத்திற்கு திரும்புக'}</span>
      </button>
    </div>
  );
};
