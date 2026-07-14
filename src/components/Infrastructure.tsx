import React, { useState } from 'react';
import { Zap, Settings, Eye, Container, Check, Hammer } from 'lucide-react';

interface InfrastructureProps {
  lang: 'en' | 'ta';
}

interface InfraTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  features: string[];
  blueprint?: React.ReactNode;
  image?: string;
  images?: string[];
}

export const Infrastructure: React.FC<InfrastructureProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState('production');

  const tabs: InfraTab[] = [
    {
      id: 'production',
      label: lang === 'en' ? 'Production Unit' : 'உற்பத்தி பிரிவு',
      icon: <Zap size={16} />,
      title: lang === 'en' ? 'Heavy Duty Pressing & Stamping Unit' : 'ஹெவி டியூட்டி பிரஸ்ஸிங் பிரிவு',
      desc: lang === 'en' 
        ? 'Our core production facility houses high-tonnage mechanical power presses, hydraulic pressing systems, and automatic strip feeding attachments. We run high-speed stamping operations optimized for high output rates.'
        : 'எங்கள் முக்கிய உற்பத்தி பிரிவில் அதிக எடை திறன் கொண்ட மெக்கானிக்கல் பிரஸ்கள், ஹைட்ராலிக் பிரஸ் அமைப்புகள் மற்றும் தானியங்கி சாதனங்கள் உள்ளன.',
      features: [
        lang === 'en' ? '10T to 100T Power Presses' : '10T முதல் 100T பவர் பிரஸ்கள்',
        lang === 'en' ? 'High Output Stamping Coils' : 'அதிவேக ஸ்டாம்பிங் சுருள்கள்',
        lang === 'en' ? 'Automatic Feeding Systems' : 'தானியங்கி தீடிங் அமைப்புகள்',
        lang === 'en' ? 'Pneumatic Safety Controls' : 'நியூமேடிக் பாதுகாப்பு கட்டுப்பாடுகள்'
      ],
      image: '/production_enhanced.png',
      blueprint: (
        <svg viewBox="0 0 200 200" className="infra-visual-svg">
          <rect x="20" y="20" width="160" height="160" rx="12" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="100" cy="100" r="30" fill="currentColor" opacity="0.1" />
          <rect x="70" y="90" width="60" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        </svg>
      )
    },
    {
      id: 'machine-shop',
      label: lang === 'en' ? 'Machine Shop' : 'இயந்திர கடை',
      icon: <Settings size={16} />,
      title: lang === 'en' ? 'Secondary Machining & Edging Shop' : 'இயந்திரம் மற்றும் விளிம்பு பணி கடை',
      desc: lang === 'en'
        ? 'Equipped for finishing, grinding, slotting, tapping, and deburring of metal components. Our machine shop ensures all metal edges are smooth and fit precision specifications requested by B2B clients.'
        : 'உலோக பாகங்களை மெருகூட்டுதல், அரைத்தல் மற்றும் துளையிடுதல் ஆகியவற்றிற்காக வடிவமைக்கப்பட்டுள்ளது. எங்கள் இயந்திர கடை வாடிக்கையாளர்களின் துல்லியமான அளவுகளை பூர்த்தி செய்கிறது.',
      features: [
        lang === 'en' ? 'Heavy Duty Grinding Machines' : 'ஹெவி டியூட்டி கிரைண்டிங் இயந்திரங்கள்',
        lang === 'en' ? 'Tapping & Threading Setups' : 'டேப்பிங் மற்றும் த்ரெடிங் அமைப்புகள்',
        lang === 'en' ? 'Vibratory Deburring Bowls' : 'வைபிரேட்டரி டிபரரிங் பவுல்ஸ்',
        lang === 'en' ? 'Custom Slotting Equipment' : 'தனிப்பயன் ஸ்லாட்டிங் சாதனங்கள்'
      ],
      image: '/machine_shop_enhanced.png',
      blueprint: (
        <svg viewBox="0 0 200 200" className="infra-visual-svg">
          <rect x="20" y="20" width="160" height="160" rx="12" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          <rect x="40" y="40" width="40" height="40" rx="6" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
          <rect x="120" y="40" width="40" height="40" rx="6" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect x="40" y="120" width="40" height="40" rx="6" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect x="120" y="120" width="40" height="40" rx="6" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
          <line x1="80" y1="60" x2="120" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="60" y1="80" x2="60" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      )
    },
    {
      id: 'tool-room',
      label: lang === 'en' ? 'Tool Room' : 'அச்சு வடிவமைப்பு அறை',
      icon: <Hammer size={16} />,
      title: lang === 'en' ? 'Die Manufacturing & Maintenance Room' : 'அச்சு தயாரிப்பு மற்றும் பராமரிப்பு அறை',
      desc: lang === 'en'
        ? 'Where custom press tools, blanking dies, and forming punches are designed and serviced. Regular inspection of tooling surfaces ensures batch consistency and prevents dimensional drift during production.'
        : 'தனிப்பயன் பிரஸ் கருவிகள் மற்றும் அச்சுகள் வடிவமைக்கப்பட்டு பராமரிக்கப்படும் இடம். கருவிகளை தொடர்ந்து சரிபார்ப்பது உற்பத்தி நிலைத்தன்மையை உறுதி செய்கிறது.',
      features: [
        lang === 'en' ? 'Die Refurbishment Station' : 'அச்சு புதுப்பித்தல் நிலையம்',
        lang === 'en' ? 'Hardened Punch Maintenance' : 'பஞ்ச் முனைகள் பராமரிப்பு',
        lang === 'en' ? 'Precision Tool Makers' : 'துல்லியமான அச்சு தயாரிப்பாளர்கள்',
        lang === 'en' ? 'Jig & Fixture Fabrication' : 'ஜிக் மற்றும் ஃபிக்சர் தயாரிப்பு'
      ],
      image: '/tool_room_photo.png',
      blueprint: (
        <svg viewBox="0 0 200 200" className="infra-visual-svg">
          <rect x="20" y="20" width="160" height="160" rx="12" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 50 100 L 90 60 L 150 120 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="90" cy="60" r="6" fill="currentColor" />
          <circle cx="50" cy="100" r="6" fill="currentColor" />
          <circle cx="150" cy="120" r="6" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'quality',
      label: lang === 'en' ? 'Quality Inspection' : 'தர ஆய்வு பிரிவு',
      icon: <Eye size={16} />,
      title: lang === 'en' ? 'Micro-Metrology Measurement Lab' : 'அளவீட்டு மற்றும் தர சோதனை ஆய்வகம்',
      desc: lang === 'en'
        ? 'Equipped with calibrated vernier calipers, micrometers, thread gauges, height gauges, and visual inspection templates. We check batches against tolerances before marking them ready for storage.'
        : 'அளவீடு செய்யப்பட்ட வெர்னியர் காலிப்பர்கள், மைக்ரோமீட்டர்கள் மற்றும் அளவீட்டு கருவிகள் பொருத்தப்பட்ட ஆய்வகம். தயாரிப்புகளை விநியோகிப்பதற்கு முன் பரிசோதிக்கிறோம்.',
      features: [
        lang === 'en' ? 'Digital Calipers & Gauges' : 'டிஜிட்டல் காலிப்பர்கள் மற்றும் கேஜ்கள்',
        lang === 'en' ? 'Surface Roughness Check' : 'மேற்பரப்பு கடினத்தன்மை சோதனை',
        lang === 'en' ? 'Thickness Micro-Gauges' : 'தடிமன் மைக்ரோ-கேஜ்கள்',
        lang === 'en' ? 'Detailed Batch Records' : 'தொகுதி வாரியான தர பதிவுகள்'
      ],
      image: '/quality_photo.png',
      blueprint: (
        <svg viewBox="0 0 200 200" className="infra-visual-svg">
          <rect x="20" y="20" width="160" height="160" rx="12" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="60" y1="100" x2="140" y2="100" stroke="currentColor" strokeWidth="2" />
          <line x1="100" y1="60" x2="100" y2="140" stroke="currentColor" strokeWidth="2" />
          <rect x="90" y="70" width="20" height="10" fill="currentColor" />
          <rect x="90" y="120" width="20" height="10" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'storage',
      label: lang === 'en' ? 'Storage & Dispatch' : 'கிடங்கு மற்றும் விநியோகம்',
      icon: <Container size={16} />,
      title: lang === 'en' ? 'Finished Goods Storage & Heavy Packaging' : 'முடிக்கப்பட்ட பொருட்கள் சேமிப்பு & பேக்கேஜிங்',
      desc: lang === 'en'
        ? 'Our storage warehouse is configured for raw steel coils and finished pallets. Heavy duty dispatch staging allows efficient loading onto road logistics vehicles for dispatch across South India.'
        : 'எங்கள் கிடங்கு மூலப்பொருட்கள் மற்றும் முடிக்கப்பட்ட தயாரிப்புகளை பாதுகாப்பாக சேமிக்க வடிவமைக்கப்பட்டுள்ளது. தென்னிந்தியா முழுவதும் எளிதான போக்குவரத்து விநியோகத்தை உறுதி செய்கிறது.',
      features: [
        lang === 'en' ? 'Moisture-Controlled Racks' : 'ஈரப்பதம் கட்டுப்படுத்தப்பட்ட ரேக்குகள்',
        lang === 'en' ? 'Corrosion Protection Wrap' : 'அரிப்பு பாதுகாப்பு உறைகள்',
        lang === 'en' ? 'palletized Dispatch Yards' : 'பல்லடைஸ் செய்யப்பட்ட விநியோக தளம்',
        lang === 'en' ? 'Road Freight Staging Area' : 'போக்குவரத்து வாகன ஏற்றுதல் பகுதி'
      ],
      images: ['/storage_photo1.png', '/storage_photo2.png', '/storage_photo3.png'],
      blueprint: (
        <svg viewBox="0 0 200 200" className="infra-visual-svg">
          <rect x="20" y="20" width="160" height="160" rx="12" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          <rect x="35" y="40" width="30" height="120" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect x="85" y="40" width="30" height="120" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect x="135" y="40" width="30" height="120" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="35" y1="80" x2="65" y2="80" stroke="currentColor" strokeWidth="1" />
          <line x1="35" y1="120" x2="65" y2="120" stroke="currentColor" strokeWidth="1" />
          <line x1="85" y1="80" x2="115" y2="80" stroke="currentColor" strokeWidth="1" />
          <line x1="85" y1="120" x2="115" y2="120" stroke="currentColor" strokeWidth="1" />
          <line x1="135" y1="80" x2="165" y2="80" stroke="currentColor" strokeWidth="1" />
          <line x1="135" y1="120" x2="165" y2="120" stroke="currentColor" strokeWidth="1" />
        </svg>
      )
    }
  ];

  const currentData = tabs.find(t => t.id === activeTab) || tabs[0];

  return (
    <section id="infrastructure" className="section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="text-center">
          <p className="section-subtitle">{lang === 'en' ? 'CAPABILITIES' : 'உற்பத்தித் திறன்'}</p>
          <h2 className="section-title">
            {lang === 'en' ? 'Manufacturing Infrastructure' : 'உற்பத்தி கட்டமைப்பு'}
          </h2>
          <p className="section-desc">
            {lang === 'en'
              ? 'Our manufacturing infrastructure is calibrated to meet precision industrial tolerances and scale capacity demands.'
              : 'எங்கள் உற்பத்தி கட்டமைப்பு துல்லியமான தொழில்துறை விவரக்குறிப்புகள் மற்றும் தேவைகளை பூர்த்தி செய்ய வடிவமைக்கப்பட்டுள்ளது.'}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="infra-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`infra-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Box */}
        <div className="infra-content">
          <div className="infra-grid">
            {/* Left: Info */}
            <div className="infra-info">
              <h3>{currentData.title}</h3>
              <p>{currentData.desc}</p>
              
              <div className="infra-features">
                {currentData.features.map((feat, idx) => (
                  <div key={idx} className="infra-feat-item">
                    <Check size={16} className="text-success" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Technical Blueprint Graphic */}
            <div className="infra-image-container">
              {currentData.images ? (
                <div style={{ display: 'grid', gridTemplateColumns: currentData.images.length >= 3 ? '1fr 1fr 1fr' : '1fr 1fr', gap: '8px', width: '100%', height: '100%' }}>
                  {currentData.images.map((imgUrl, i) => (
                    <img 
                      key={i}
                      src={imgUrl} 
                      alt={`${currentData.title} ${i + 1}`} 
                      className="infra-img"
                    />
                  ))}
                </div>
              ) : currentData.image ? (
                <img 
                  src={currentData.image} 
                  alt={currentData.title} 
                  className="infra-img"
                />
              ) : (
                currentData.blueprint
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
