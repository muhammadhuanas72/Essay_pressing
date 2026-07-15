import React from 'react';
import { ArrowUp, Phone, Mail, MapPin, Clock } from 'lucide-react';

interface FooterProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: 'en' | 'ta';
}

export const Footer: React.FC<FooterProps> = ({ currentTab, setCurrentTab, lang }) => {



  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }, 80);
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-branding" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <img src="/logo.png" alt="Essay Pressings" className="footer-logo" style={{ marginBottom: '8px' }} />
            <p className="footer-about-text">
              {lang === 'en' 
                ? 'Precision metal component manufacturer established in 2005 in Chennai, Tamil Nadu. Committed to engineering excellence and manufacturing precision.' 
                : '2005 இல் சென்னை, தமிழ்நாட்டில் நிறுவப்பட்ட துல்லிய உலோக பாகங்கள் தயாரிப்பாளர். பொறியியல் சிறப்பு மற்றும் உற்பத்தி துல்லியத்திற்கு அர்ப்பணிக்கப்பட்டது.'}
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <span className="payment-chip" style={{ color: '#E2E8F0', border: '1px solid rgba(255, 255, 255, 0.1)', background: 'transparent' }}>
                Est. 2005
              </span>
              <span className="payment-chip" style={{ color: '#E2E8F0', border: '1px solid rgba(255, 255, 255, 0.1)', background: 'transparent' }}>
                Chennai
              </span>
            </div>
          </div>

          {/* Quick Menu Links */}
          <div>
            <h4 className="footer-title">{lang === 'en' ? 'Quick Links' : 'குறுக்குவழிகள்'}</h4>
            <ul className="footer-links">
              {['home', 'about', 'products', 'infrastructure', 'industries', 'contact'].map((item) => (
                <li key={item}>
                  <span 
                    className="footer-link" 
                    onClick={() => handleNavClick(item)}
                    style={{ textTransform: 'capitalize', color: currentTab === item ? '#3B82F6' : 'inherit' }}
                  >
                    {item === 'home' && lang === 'ta' ? 'முகப்பு' : 
                     item === 'about' && lang === 'ta' ? 'பற்றி' :
                     item === 'products' && lang === 'ta' ? 'தயாரிப்புகள்' :
                     item === 'infrastructure' && lang === 'ta' ? 'கட்டமைப்பு' :
                     item === 'industries' && lang === 'ta' ? 'தொழில்துறைகள்' :
                     item === 'contact' && lang === 'ta' ? 'தொடர்பு' : item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Categories Links */}
          <div>
            <h4 className="footer-title">{lang === 'en' ? 'Products' : 'தயாரிப்புகள்'}</h4>
            <ul className="footer-links">
              {['Metal Washers', 'Stainless Steel', 'Metal Brackets', 'MS Components', 'MS Sheets', 'Closing Caps', 'Jaw Couplings'].map((cat) => (
                <li key={cat}>
                  <span 
                    className="footer-link"
                    onClick={() => handleNavClick('products')}
                  >
                    {cat}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="footer-title">{lang === 'en' ? 'Contact Us' : 'தொடர்பு கொள்ளவும்'}</h4>
            <ul className="footer-links" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li>
                <a
                  href="tel:+918047653363"
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'inherit', textDecoration: 'none' }}
                  className="footer-link"
                >
                  <Phone size={14} style={{ flexShrink: 0, opacity: 0.7 }} />
                  <span>+91 80476 53363</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@essaypressings.com"
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'inherit', textDecoration: 'none' }}
                  className="footer-link"
                >
                  <Mail size={14} style={{ flexShrink: 0, opacity: 0.7 }} />
                  <span>info@essaypressings.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/place/Essay+Pressings/data=!4m2!3m1!1s0x0:0xcf64f47ad8496c40?sa=X&ved=1t:2428&ictx=111&cshid=1784001144446871"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'inherit', textDecoration: 'none' }}
                  className="footer-link"
                >
                  <MapPin size={14} style={{ flexShrink: 0, opacity: 0.7, marginTop: '3px' }} />
                  <span>No. 15, Karpaga Vinayagar Koil St,<br />Kandanchavadi, Chennai – 600096</span>
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.7 }}>
                <Clock size={14} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '13px' }}>{lang === 'en' ? 'Mon – Sat: 9 AM – 6 PM' : 'திங்கள் – சனி: காலை 9 – மாலை 6'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Info */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Essay Pressings. All rights reserved. Precision Made in Chennai.</p>
          
          <div className="footer-bottom-links">
            <span onClick={() => alert('Minimalist Luxury Industrial Design system implemented.')} style={{ cursor: 'pointer' }} className="footer-link">
              Cookie Policy
            </span>
          </div>
        </div>

        {/* Back to top button inside footer */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <button 
            onClick={handleBackToTop} 
            className="icon-btn back-to-top" 
            style={{ width: '40px', height: '40px', background: 'rgba(255, 255, 255, 0.05)', color: '#FFFFFF', border: '1px solid rgba(255, 255, 255, 0.1)' }}
            aria-label="Back to Top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};
