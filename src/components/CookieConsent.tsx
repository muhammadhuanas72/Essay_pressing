import React, { useState, useEffect } from 'react';

interface CookieConsentProps {
  lang: 'en' | 'ta';
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ lang }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('ep_cookie_consent');
    if (!consent) {
      // Show banner after a slight delay
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('ep_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('ep_cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner">
      <h4 style={{ fontSize: '14px', fontWeight: '700' }}>
        {lang === 'en' ? 'Cookie Consent Notice' : 'குக்கீ ஒப்புதல் அறிவிப்பு'}
      </h4>
      <p className="cookie-text">
        {lang === 'en'
          ? 'We use analytical tools to monitor landing page performance and customize the inquiry dashboard structure. By browsing, you accept our standard cookie terms.'
          : 'உங்களுக்கு சிறந்த சேவை வழங்க நாங்கள் குக்கீகளைப் பயன்படுத்துகிறோம். எங்களை தொடர்ந்து பயன்படுத்துவதன் மூலம், எங்கள் விதிமுறைகளை ஏற்கிறீர்கள்.'}
      </p>
      
      <div className="cookie-buttons">
        <button 
          onClick={handleDecline} 
          className="btn btn-secondary" 
          style={{ fontSize: '11px', padding: '6px 12px', borderRadius: '6px' }}
        >
          {lang === 'en' ? 'Decline' : 'நிராகரி'}
        </button>
        <button 
          onClick={handleAccept} 
          className="btn btn-primary" 
          style={{ fontSize: '11px', padding: '6px 12px', borderRadius: '6px' }}
        >
          {lang === 'en' ? 'Accept All' : 'அனைத்தையும் ஏற்றுக்கொள்'}
        </button>
      </div>
    </div>
  );
};
