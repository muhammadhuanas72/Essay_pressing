import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQProps {
  lang: 'en' | 'ta';
}

export const FAQ: React.FC<FAQProps> = ({ lang }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: lang === 'en' 
        ? 'Do you manufacture custom parts?' 
        : 'நீங்கள் தனிப்பயனாக்கப்பட்ட உதிரிபாகங்களை உற்பத்தி செய்கிறீர்களா?',
      a: lang === 'en'
        ? 'Yes, we specialize in custom press parts and stamping components. You can submit your drawing files (PDF, DWG, or JPEG) with dimensions, tolerances, material type, and thickness using our Request Quote form, and we will build tools matching your designs.'
        : 'ஆம், நாங்கள் தனிப்பயன் பிரஸ் பாகங்கள் மற்றும் ஸ்டாம்பிங் தயாரிப்பதில் நிபுணத்துவம் பெற்றுள்ளோம். உங்கள் வரைபடக் கோப்புகளை (PDF, DWG, அல்லது JPEG) எங்கள் கட்டண விவரம் படிவத்தில் சமர்ப்பிக்கலாம்.'
    },
    {
      q: lang === 'en' 
        ? 'Can I place bulk orders? What is the minimum quantity?' 
        : 'நான் மொத்தமாக ஆர்டர் செய்யலாமா? குறைந்தபட்ச அளவு என்ன?',
      a: lang === 'en'
        ? 'Yes, we specialize in high-volume production runs. The Minimum Order Quantity (MOQ) depends on the size, material, and complexity of the component (usually starting from 5,000 to 10,000 units for standard washers, or lower for complex brackets).'
        : 'ஆம், நாங்கள் அதிக அளவிலான உற்பத்திப் பணிகளில் ஈடுபடுகிறோம். குறைந்தபட்ச ஆர்டர் அளவு (MOQ) உதிரிபாகத்தின் அளவு, பொருள் மற்றும் சிக்கலான தன்மையைப் பொறுத்தது (வழக்கமாக 5,000 முதல் 10,000 அலகுகள்).'
    },
    {
      q: lang === 'en' 
        ? 'Which materials do you manufacture components with?' 
        : 'தயாரிப்புகளுக்கு நீங்கள் எந்த வகையான மூலப்பொருட்களைப் பயன்படுத்துகிறீர்கள்?',
      a: lang === 'en'
        ? 'We manufacture components using Stainless Steel (SS 202, 304, 316), Mild Steel (MS), Brass, Copper, Aluminum, and various industrial grade Rubbers (EPDM, Silicone, Nitrile) for custom washers.'
        : 'நாங்கள் துருப்பிடிக்காத எஃகு (SS 202, 304, 316), மெல்டு ஸ்டீல் (MS), பித்தளை, செம்பு, அலுமினியம் மற்றும் பல்வேறு தொழில்துறை ரப்பர்களைப் பயன்படுத்துகிறோம்.'
    },
    {
      q: lang === 'en' 
        ? 'Do you supply components throughout India?' 
        : 'இந்தியா முழுவதும் உதிரிபாகங்களை விநியோகம் செய்கிறீர்களா?',
      a: lang === 'en'
        ? 'Yes. Headquartered in Chennai, Tamil Nadu, we supply sheet metal components and washers to industrial hubs across India. All shipments are packaged securely in heavy duty wooden crates or cartons and dispatched by road logistics.'
        : 'ஆம். சென்னையில் தலைமையகத்தைக் கொண்டுள்ள நாங்கள், இந்தியா முழுவதும் உள்ள தொழில்துறை மையங்களுக்கு பாகங்களை விநியோகம் செய்கிறோம். அனைத்து பொருட்களும் பாதுகாப்பாக பேக் செய்யப்பட்டு அனுப்பப்படுகின்றன.'
    },
    {
      q: lang === 'en' 
        ? 'How do I request a quotation and how long does it take?' 
        : 'நான் எவ்வாறு கட்டண விவரங்களை கோருவது? அதற்கு எவ்வளவு நேரம் ஆகும்?',
      a: lang === 'en'
        ? 'You can request a quote by clicking the "Request Quote" button in our header or products cards. Fill in your contact info, product category, dimensions, and drawing sheets. We typically reply with a detailed quotation within 24 to 48 hours.'
        : 'எங்கள் இணையதளத்தில் உள்ள "Request Quote" பொத்தானை கிளிக் செய்வதன் மூலம் நீங்கள் கட்டண விவரங்களை கோரலாம். நாங்கள் வழக்கமாக 24 முதல் 48 மணி நேரத்திற்குள் விரிவான விவரங்களுடன் பதிலளிப்போம்.'
    }
  ];

  const handleToggle = (idx: number) => {
    if (activeIndex === idx) {
      setActiveIndex(null);
    } else {
      setActiveIndex(idx);
    }
  };

  return (
    <section id="faq" className="section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="text-center">
          <p className="section-subtitle">{lang === 'en' ? 'QUESTIONS' : 'கேள்விகள்'}</p>
          <h2 className="section-title">
            {lang === 'en' ? 'Frequently Asked Questions' : 'அடிக்கடி கேட்கப்படும் கேள்விகள்'}
          </h2>
          <p className="section-desc">
            {lang === 'en'
              ? 'Find quick answers regarding our custom metal fabrication capabilities, materials, lead times, and shipping terms.'
              : 'எங்கள் தனிப்பயன் உலோக தயாரிப்பு திறன்கள், பொருட்கள் மற்றும் விநியோக விதிமுறைகள் பற்றிய விரைவான பதில்களை இங்கே கண்டறியவும்.'}
          </p>
        </div>

        {/* Accordions */}
        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`faq-item ${activeIndex === idx ? 'active' : ''}`}
            >
              <button 
                className="faq-trigger" 
                onClick={() => handleToggle(idx)}
              >
                <span>{faq.q}</span>
                {activeIndex === idx ? <ChevronUp size={18} className="text-accent" /> : <ChevronDown size={18} />}
              </button>
              <div className="faq-answer">
                <div className="faq-answer-content">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
