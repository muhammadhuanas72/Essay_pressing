import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onRequestQuote: () => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  lang: 'en' | 'ta';
  setLang: (lang: 'en' | 'ta') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onRequestQuote,
  isDark,
  setIsDark,
  lang,
  setLang,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: lang === 'en' ? 'Home' : 'முகப்பு' },
    { id: 'about', label: lang === 'en' ? 'About' : 'பற்றி' },
    { id: 'products', label: lang === 'en' ? 'Products' : 'தயாரிப்புகள்' },
    { id: 'infrastructure', label: lang === 'en' ? 'Infrastructure' : 'கட்டமைப்பு' },
    { id: 'industries', label: lang === 'en' ? 'Industries' : 'தொழில்துறைகள்' },
    { id: 'contact', label: lang === 'en' ? 'Contact' : 'தொடர்பு' },
  ];

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    setCurrentTab(id);
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
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Logo and Brand */}
        <a href="#home" className="logo-link" onClick={() => handleNavClick('home')}>
          <img 
            src="/logo.png" 
            alt="Essay Pressings" 
            className="logo-image" 
            onError={(e) => {
              // fallback if logo is missing or loading fails
              e.currentTarget.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&fit=crop&q=80';
            }}
          />
        </a>

        {/* Desktop Navigation Links */}
        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`} style={{ marginLeft: 'auto', marginRight: '40px' }}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${currentTab === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Action buttons (Dark mode, Language selector, Request quote) */}
        <div className="nav-actions">
          {/* Language Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Globe size={16} className="text-secondary" />
            <select
              className="lang-select"
              value={lang}
              onChange={(e) => setLang(e.target.value as 'en' | 'ta')}
            >
              <option value="en">EN</option>
              <option value="ta">தமிழ்</option>
            </select>
          </div>

          {/* Dark Mode Toggle */}
          <button 
            className="icon-btn" 
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* CTA Button */}
          <button 
            className="btn btn-primary" 
            onClick={onRequestQuote}
            style={{ fontSize: '13px', padding: '10px 18px' }}
          >
            {lang === 'en' ? 'Request Quote' : 'விண்ணப்பம்'}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="icon-btn menu-toggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};
