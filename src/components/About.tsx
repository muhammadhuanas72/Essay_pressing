import React from 'react';
import { Check, Calendar } from 'lucide-react';

interface AboutProps {
  lang: 'en' | 'ta';
}

export const About: React.FC<AboutProps> = ({ lang }) => {
  const productsList = [
    lang === 'en' ? 'Stainless Steel Components' : 'துருப்பிடிக்காத எஃகு கூறுகள்',
    lang === 'en' ? 'Metal Washers' : 'மெட்டல் வாஷர்கள்',
    lang === 'en' ? 'Rubber Washers' : 'ரப்பர் வாஷர்கள்',
    lang === 'en' ? 'MS Components' : 'எம்எஸ் கூறுகள்',
    lang === 'en' ? 'Metal Brackets' : 'மெட்டல் பிராக்கெட்ஸ்',
    lang === 'en' ? 'Closing Caps' : 'குளோசிங் கேப்ஸ்',
    lang === 'en' ? 'Jaw Couplings' : 'ஜா கப்ளிங்ஸ்',
    lang === 'en' ? 'MS Sheets' : 'எம்எஸ் தாள்கள்',
    lang === 'en' ? 'Precision Press Components' : 'துல்லியமான அழுத்த கூறுகள்',
    lang === 'en' ? 'Custom Industrial Parts' : 'தனிப்பயன் தொழில்துறை பாகங்கள்'
  ];

  const timelineSteps = [
    { year: '2005', label: lang === 'en' ? 'Company Established' : 'நிறுவனம் தொடங்கப்பட்டது' },
    { year: '2010', label: lang === 'en' ? 'Manufacturing Expansion' : 'உற்பத்தி விரிவாக்கம்' },
    { year: '2017', label: lang === 'en' ? 'GST Registration' : 'ஜிஎஸ்டி பதிவு' },
    { year: 'Today', label: lang === 'en' ? 'Trusted Manufacturing Partner' : 'நம்பகமான உற்பத்தி பங்குதாரர்' }
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="text-center">
          <p className="section-subtitle">{lang === 'en' ? 'WHO WE ARE' : 'எங்களைப் பற்றி'}</p>
          <h2 className="section-title">{lang === 'en' ? 'About Essay Pressings' : 'எஸே பிரஸ்ஸிங்ஸ் பற்றி'}</h2>
          <div style={{ width: '60px', height: '3px', backgroundColor: 'var(--accent)', margin: '0 auto 32px' }}></div>
        </div>

        {/* Layout Grid */}
        <div className="about-grid">
          {/* Left Column: Details */}
          <div className="about-content-left">
            <p className="about-intro-text">
              {lang === 'en'
                ? 'Essay Pressings was established in 2005 in Chennai, Tamil Nadu as a Sole Proprietorship manufacturing company specializing in precision sheet metal and industrial press components.'
                : 'எஸே பிரஸ்ஸிங்ஸ் 2005 இல் சென்னை, தமிழ்நாட்டில் ஒரு தனி உரிமையாளர் உற்பத்தி நிறுவனமாக நிறுவப்பட்டது. இது துல்லியமான தாள் உலோகம் மற்றும் தொழில்துறை பிரஸ் கூறுகளை தயாரிப்பதில் நிபுணத்துவம் பெற்றுள்ளது.'}
            </p>
            <p className="about-body-text">
              {lang === 'en'
                ? 'Over the years, the company has built a reputation for delivering high-quality engineering products with competitive pricing, reliable delivery, and customer-focused manufacturing solutions. Our facility operates with professional quality inspection techniques, ensuring that every batch meets standard tolerances.'
                : 'பல ஆண்டுகளாக, நிறுவனம் போட்டி விலை, நம்பகமான விநியோகம் மற்றும் வாடிக்கையாளர்களை மையமாகக் கொண்ட உற்பத்தி தீர்வுகளுடன் உயர்தர பொறியியல் தயாரிப்புகளை வழங்குவதில் நற்பெயரைக் கட்டியெழுப்பியுள்ளது. எங்களின் தரம் பகுப்பாய்வு தொழில்நுட்பங்கள் மூலம் ஒவ்வொரு தயாரிப்பும் சிறந்த தரத்துடன் தயாரிக்கப்படுகிறது.'}
            </p>

            {/* Core products section list */}
            <h3 className="about-products-title">
              {lang === 'en' ? 'Core Manufacturing Capabilities' : 'முக்கிய உற்பத்தி திறன்கள்'}
            </h3>
            <div className="about-products-grid">
              {productsList.map((prod, index) => (
                <div key={index} className="about-product-tag">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'rgba(22, 163, 74, 0.1)', color: 'var(--success)' }}>
                    <Check size={12} />
                  </div>
                  <span>{prod}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Timeline Box */}
          <div className="about-timeline-box">
            <h3 className="about-timeline-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '600' }}>
              <Calendar size={18} className="text-accent" />
              <span>{lang === 'en' ? 'Our Journey' : 'எங்கள் பயணம்'}</span>
            </h3>

            <div className="timeline-flow">
              {timelineSteps.map((step, idx) => (
                <React.Fragment key={step.year}>
                  <div className="timeline-step">
                    <div className="timeline-year">{step.year}</div>
                    <div className="timeline-connector">
                      <div className="timeline-dot"></div>
                    </div>
                    <div className="timeline-text">{step.label}</div>
                  </div>
                  
                  {idx < timelineSteps.length - 1 && (
                    <div className="timeline-step" style={{ margin: '-10px 0' }}>
                      <div className="timeline-year"></div>
                      <div className="timeline-connector" style={{ height: '30px' }}>
                        <div className="timeline-line"></div>
                      </div>
                      <div className="timeline-text"></div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px', color: 'var(--text-secondary)' }}>
              {lang === 'en' ? 'Proprietor: S Basith' : 'உரிமையாளர்: எஸ் பாசித்'}
            </div>
          </div>
        </div>

        {/* Founder Spotlight Card */}
        <div className="founder-spotlight-card">
          <div className="founder-spotlight-grid">
            {/* Image Wrapper */}
            <div className="founder-image-wrapper">
              <img 
                src="/founder.png" 
                alt="S. Basith - Founder & Proprietor" 
                className="founder-spotlight-img"
              />
            </div>

            {/* Founder Info */}
            <div className="founder-info">
              <span className="founder-leadership-badge">
                {lang === 'en' ? 'Leadership & Vision' : 'தலைமை மற்றும் தொலைநோக்கு'}
              </span>
              <div className="founder-name-title">
                <h3 className="founder-name">S. Basith</h3>
                <span className="founder-title">
                  {lang === 'en' ? 'Founder & Proprietor' : 'நிறுவனர் மற்றும் உரிமையாளர்'}
                </span>
              </div>

              <div className="founder-quote-box">
                <p className="founder-quote">
                  {lang === 'en' 
                    ? '"Committed to delivering precision, quality workmanship, and building long-term partner trust since the day we established Essay Pressings in 2005."'
                    : '"2005 இல் எஸே பிரஸ்ஸிங்ஸைத் தொடங்கிய நாள் முதல் துல்லியம், தரமான வேலைப்பாடு மற்றும் நீண்டகால கூட்டாளர் நம்பிக்கையை உருவாக்குவதில் நாங்கள் உறுதியுடன் இருக்கிறோம்."'}
                </p>
              </div>

              <div className="founder-key-values">
                <div className="founder-value-item">
                  <span className="founder-value-title">
                    {lang === 'en' ? 'Uncompromising Integrity' : 'சமரசம் செய்யாத நேர்மை'}
                  </span>
                  <p className="founder-value-desc">
                    {lang === 'en'
                      ? 'Built on transparency, honesty, and long-term business ethics.'
                      : 'வெளிப்படைத்தன்மை, நேர்மை மற்றும் நீண்ட கால வணிக நெறிமுறைகள்.'}
                  </p>
                </div>
                <div className="founder-value-item">
                  <span className="founder-value-title">
                    {lang === 'en' ? 'Engineering Precision' : 'பொறியியல் துல்லியம்'}
                  </span>
                  <p className="founder-value-desc">
                    {lang === 'en'
                      ? 'Operating within strict standard tolerances for error-free parts.'
                      : 'பிழையற்ற பாகங்களுக்கான கடுமையான சகிப்புத்தன்மை வரம்புகளுக்குள் உற்பத்தி.'}
                  </p>
                </div>
                <div className="founder-value-item">
                  <span className="founder-value-title">
                    {lang === 'en' ? 'Absolute Reliability' : 'முழுமையான நம்பகத்தன்மை'}
                  </span>
                  <p className="founder-value-desc">
                    {lang === 'en'
                      ? 'Competitive pricing paired with highly dependable supply lines.'
                      : 'போட்டி விலையுடன் கூடிய மிகவும் நம்பகமான விநியோகச் சங்கிலி.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
