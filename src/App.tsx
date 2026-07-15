import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Products } from './components/Products';
import { Process } from './components/Process';
import { Infrastructure } from './components/Infrastructure';
import { Industries } from './components/Industries';
import { Quality } from './components/Quality';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingButtons } from './components/FloatingButtons';
import { CookieConsent } from './components/CookieConsent';
import { QuoteForm } from './components/QuoteForm';
import { AdminDashboard } from './components/AdminDashboard';
import { Quote, CheckCircle2 } from 'lucide-react';
import { LoadingScreen } from './components/LoadingScreen';

function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const lang: 'en' | 'ta' = 'en';
  const [isDark, setIsDark] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [rfqCategory, setRfqCategory] = useState('Metal Washers');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);

  // Manage Dark / Light Theme
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark-theme');
    } else {
      root.classList.remove('dark-theme');
    }
  }, [isDark]);

  // Listen to hash changes for hidden admin access
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
        // Clear the hash from address bar immediately
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };
    checkHash(); // Check on initial load
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Scroll position handlers: Progress bar and Active tab tracking
  useEffect(() => {
    const handleScroll = () => {
      if (currentTab === 'products' || currentTab === 'infrastructure' || currentTab === 'industries') return;

      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Check current visible section to highlight in Navbar
      const sections = ['home', 'about', 'contact'];
      const scrollPos = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setCurrentTab(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentTab]);

  const handleToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenRFQ = (category?: string) => {
    if (category) {
      setRfqCategory(category);
    }
    setIsQuoteOpen(true);
  };

  // Testimonials content
  const testimonials = [
    {
      quote: lang === 'en'
        ? "Essay Pressings has been our primary washer supplier for over three years. Their dimensional repeatability matches our assembly line requirements perfectly."
        : "எஸே பிரஸ்ஸிங்ஸ் கடந்த மூன்று ஆண்டுகளாக எங்களின் முக்கிய வாஷர் சப்ளையராக உள்ளது. அவர்களின் தயாரிப்புகளின் தரம் மற்றும் அளவு துல்லியம் மிகவும் அருமை.",
      author: "Procurement Manager",
      industry: "Automobile Sector, Chennai"
    },
    {
      quote: lang === 'en'
        ? "Precision sheet metal brackets from S Basith & team have helped us optimize our machinery mounting. Excellent tolerances and prompt logistics support."
        : "எஸ் பாசித் மற்றும் குழுவினரின் துல்லியமான மெட்டல் பிராக்கெட்ஸ் எங்களின் இயந்திரங்களை எளிதாக பொருத்த உதவியுள்ளது. சிறந்த தயாரிப்பு மற்றும் விரைவான போக்குவரத்து சேவை.",
      author: "Quality Inspector",
      industry: "Heavy Engineering Corporation"
    },
    {
      quote: lang === 'en'
        ? "The team provides competitive B2B prices for SS press components. Highly transparent quotation sheets and reliable delivery windows by road."
        : "SS பிரஸ் உதிரிபாகங்களுக்கு நிறுவனம் போட்டித்தன்மை வாய்ந்த B2B விலைகளை வழங்குகிறது. மிகவும் வெளிப்படையான விலை மற்றும் நம்பகமான விநியோகம்.",
      author: "Sourcing Director",
      industry: "OEM Manufacturing Hub"
    }
  ];

  return (
    <>
      {/* Starting Page Loading Preloader */}
      {showLoader && <LoadingScreen onFinished={() => setShowLoader(false)} />}

      {/* Scroll Progress indicator */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      {/* Navigation Header */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        isDark={isDark}
        setIsDark={setIsDark}
        lang={lang}
      />

      {/* Conditional Multi-Page View Routing */}
      {currentTab === 'products' ? (
        <div style={{ paddingTop: '80px' }}>
          <Products onRequestQuote={handleOpenRFQ} lang={lang} />
        </div>
      ) : currentTab === 'infrastructure' ? (
        <div style={{ paddingTop: '80px' }}>
          <Infrastructure lang={lang} />
        </div>
      ) : currentTab === 'industries' ? (
        <div style={{ paddingTop: '80px' }}>
          <Industries lang={lang} setCurrentTab={setCurrentTab} onRequestQuote={handleOpenRFQ} />
        </div>
      ) : (
        <>
          {/* Main Sections */}
          <Hero 
            onExploreProducts={() => {
              setCurrentTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            onRequestQuote={() => handleOpenRFQ()} 
            lang={lang} 
          />

          <About lang={lang} />

          <WhyChooseUs lang={lang} />

          <Process lang={lang} />

          <Quality lang={lang} />

          {/* Testimonials Section */}
          <section id="testimonials" className="section-padding" style={{ backgroundColor: 'var(--bg)' }}>
            <div className="container">
              <div className="text-center">
                <p className="section-subtitle">{lang === 'en' ? 'REVIEWS' : 'வாடிக்கையாளர் கருத்து'}</p>
                <h2 className="section-title">
                  {lang === 'en' ? 'Partner Testimonials' : 'நம்பகமான வாடிக்கையாளர்கள் கருத்து'}
                </h2>
                <div style={{ width: '60px', height: '3px', backgroundColor: 'var(--accent)', margin: '0 auto 32px' }}></div>
              </div>

              <div className="grid-3">
                {testimonials.map((test, idx) => (
                  <div 
                    key={idx} 
                    className="wcu-card" 
                    style={{ 
                      position: 'relative', 
                      padding: '36px 24px', 
                      border: '1px solid var(--border-color)', 
                      background: 'var(--card-bg)' 
                    }}
                  >
                    <div style={{ position: 'absolute', top: '16px', right: '20px', color: 'rgba(37, 99, 235, 0.1)' }}>
                      <Quote size={40} />
                    </div>
                    <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>
                      "{test.quote}"
                    </p>
                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '700' }}>{test.author}</h4>
                      <p style={{ fontSize: '12px', color: 'var(--accent)' }}>{test.industry}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <FAQ lang={lang} />

          <Contact lang={lang} onToast={handleToast} />
        </>
      )}

      {/* Footer bar */}
      <Footer 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        lang={lang} 
      />

      {/* Interactive Floating Widgets */}
      <FloatingButtons lang={lang} />

      {/* Cookie banner */}
      <CookieConsent lang={lang} />

      {/* Dialog Modals */}
      <QuoteForm 
        isOpen={isQuoteOpen} 
        onClose={() => setIsQuoteOpen(false)} 
        onToast={handleToast} 
        lang={lang} 
        defaultCategory={rfqCategory}
      />

      <AdminDashboard 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        onToast={handleToast} 
        lang={lang} 
      />

      {/* Toast Alert Message Notification */}
      {toastMessage && (
        <div className="toast-msg">
          <CheckCircle2 size={16} className="text-success" />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}

export default App;
