import React, { useState } from 'react';
import { Car, Hammer, Wrench, Zap, Cog, Factory, Package, Sprout, X, Check, FileText } from 'lucide-react';

interface IndustriesProps {
  lang: 'en' | 'ta';
  setCurrentTab: (tab: string) => void;
  onRequestQuote: (category?: string) => void;
}

interface IndustryItem {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  extendedDesc: string;
  applications: string[];
  materials: string[];
  tolerances: string;
  defaultProductCategory?: string;
}

export const Industries: React.FC<IndustriesProps> = ({ lang, setCurrentTab, onRequestQuote }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryItem | null>(null);

  const industries: IndustryItem[] = [
    {
      id: 'automobile',
      title: lang === 'en' ? 'Automobile' : 'ஆட்டோமொபைல்',
      desc: lang === 'en' 
        ? 'Washers and brackets for engine blocks and chassis assembly.' 
        : 'என்ஜின் மற்றும் சேஸ் அசெம்பிளிக்கான வாஷர்கள் மற்றும் பிராக்கெட்ஸ்.',
      icon: <Car size={24} />,
      extendedDesc: lang === 'en'
        ? 'We manufacture high-precision structural clamping brackets, spacer shims, and heavy-duty washers tailored to meet the dynamic load requirements of vehicle engine compartments and under-chassis components.'
        : 'வாகன என்ஜின் பிரிவுகள் மற்றும் சேஸ் பாகங்களின் மாறும் சுமை தேவைகளைப் பூர்த்தி செய்ய வடிவமைக்கப்பட்ட உயர் துல்லியமான கட்டமைப்பு கிளாம்பிங் அடைப்புக்குறிகள், ஸ்பேசர் ஷிம்கள் மற்றும் கனரக வாஷர்களை நாங்கள் உற்பத்தி செய்கிறோம்.',
      applications: lang === 'en' 
        ? [
            'Engine block spacer washers',
            'Chassis assembly brackets',
            'Gearbox and transmission shims',
            'Exhaust system clamp plates'
          ]
        : [
            'என்ஜின் பிளாக் ஸ்பேசர் வாஷர்கள்',
            'சேஸ் அசெம்பிளி அடைப்புகள்',
            'கியர்பாக்ஸ் மற்றும் டிரான்ஸ்மிஷன் ஷிம்கள்',
            'வெளியேற்ற அமைப்பு கிளாம்ப் தகடுகள்'
          ],
      materials: lang === 'en'
        ? ['High Tensile Carbon Steel', 'Spring Steel Grade EN47 / C80', 'Stainless Steel SS304 & SS316']
        : ['ஹை டென்சைல் கார்பன் ஸ்டீல்', 'ஸ்பிரிங் ஸ்டீல் தரம் EN47 / C80', 'ஸ்டெயின்லெஸ் ஸ்டீல் SS304 & SS316'],
      tolerances: lang === 'en' ? 'Automotive standard tolerance down to ±0.02 mm' : 'ஆட்டோமொபைல் தர அளவு ±0.02 மிமீ வரை',
      defaultProductCategory: 'Metal Washers'
    },
    {
      id: 'construction',
      title: lang === 'en' ? 'Construction' : 'கட்டுமான துறை',
      desc: lang === 'en'
        ? 'Heavy duty sheets, plates, and anchor structural clamps.'
        : 'ஹெவி டியூட்டி தாள்கள், தட்டுகள் மற்றும் அசெம்பிளி கிளாம்புகள்.',
      icon: <Hammer size={24} />,
      extendedDesc: lang === 'en'
        ? 'Our construction-grade components provide high structural integrity and weathering resistance, ensuring secure load distribution in concrete anchors, pre-fabricated frameworks, and structural joinery.'
        : 'எங்கள் கான்கிரீட் நங்கூரங்கள், முன்கூட்டியே தயாரிக்கப்பட்ட கட்டமைப்புகள் மற்றும் கட்டமைப்பு இணைப்புகளில் பாதுகாப்பான சுமை விநியோகத்தை உறுதி செய்வதன் மூலம், கட்டுமான-தர கூறுகள் சிறந்த கட்டமைப்பு ஒருமைப்பாடு மற்றும் வானிலை எதிர்ப்பை வழங்குகின்றன.',
      applications: lang === 'en'
        ? [
            'Foundation structural anchor plates',
            'Heavy-duty U-bolts and clamp brackets',
            'Wall cladding backing plates',
            'Scaffolding coupler washers'
          ]
        : [
            'அடித்தள கட்டமைப்பு நங்கூரம் தகடுகள்',
            'ஹெவி-டியூட்டி U-போல்ட்கள் மற்றும் கிளாம்ப் அடைப்புகள்',
            'சுவர் கிளாடிங் ஆதரவு தகடுகள்',
            'சாரக்கட்டு இணைப்பான் வாஷர்கள்'
          ],
      materials: lang === 'en'
        ? ['Mild Steel (HR / CR)', 'Galvanized Iron (GI)', 'Heavy Gauge Structural Steel']
        : ['மைல்டு ஸ்டீல் (HR / CR)', 'கால்வனைஸ்டு இரும்பு (GI)', 'ஹெவி கேஜ் கட்டமைப்பு ஸ்டீல்'],
      tolerances: lang === 'en' ? 'Structural engineering standard ±0.10 mm' : 'கட்டமைப்பு பொறியியல் தரம் ±0.10 மிமீ',
      defaultProductCategory: 'Metal Brackets'
    },
    {
      id: 'heavy-engineering',
      title: lang === 'en' ? 'Heavy Engineering' : 'கனரக பொறியியல்',
      desc: lang === 'en'
        ? 'Custom jaw couplings and spacer components for drivetrains.'
        : 'மோட்டார் அச்சுகளுக்கான தனிப்பயன் ஜா கப்ளிங்ஸ் மற்றும் ஸ்பேசர்கள்.',
      icon: <Wrench size={24} />,
      extendedDesc: lang === 'en'
        ? 'Designed for extreme heavy-duty environments. S Basith & team supply reliable drivetrain spacer components and customized jaw couplings engineered to withstand high torque, minimizing mechanical stress and maintenance downtime.'
        : 'தீவிர ஹெவி-டியூட்டி சூழல்களுக்காக வடிவமைக்கப்பட்டது. எஸ் பாசித் & குழுவினர் அதிக முறுக்குவிசையைத் தாங்கக்கூடிய நம்பகமான டிரைவ்டிரெயின் ஸ்பேசர் பாகங்கள் மற்றும் தனிப்பயனாக்கப்பட்ட ஜா கப்ளிங்ஸ்களை வழங்குகிறார்கள்.',
      applications: lang === 'en'
        ? [
            'Drivetrain shaft alignment shims',
            'Custom metal jaw coupling inserts',
            'High-torque machinery spacer pads',
            'Vibration damping press components'
          ]
        : [
            'டிரைவ்டிரெயின் ஷாஃப்ட் சீரமைப்பு ஷிம்கள்',
            'தனிப்பயன் உலோக ஜா கப்ளிங் இன்செர்ட்ஸ்',
            'அதி-முறுக்கு இயந்திர ஸ்பேசர் பேடுகள்',
            'அதிர்வு தணிக்கும் அழுத்த பாகங்கள்'
          ],
      materials: lang === 'en'
        ? ['Alloy Steel (Grade 4140 / 8620)', 'High-Tensile Carbon Steel', 'Phosphor Bronze']
        : ['அலாய் ஸ்டீல் (Grade 4140 / 8620)', 'ஹை-டென்சைல் கார்பன் ஸ்டீல்', 'பாஸ்பர் வெண்கலம்'],
      tolerances: lang === 'en' ? 'Precision drivetrain tolerances ±0.03 mm' : 'துல்லியமான டிரைவ்டிரெயின் அளவு ±0.03 மிமீ',
      defaultProductCategory: 'Jaw Couplings'
    },
    {
      id: 'electrical',
      title: lang === 'en' ? 'Electrical' : 'மின்சார துறை',
      desc: lang === 'en'
        ? 'Brass washers, busbar casings, and terminal contact caps.'
        : 'பித்தளை வாஷர்கள், மவுண்டிங் கேஸ்கள் மற்றும் டெர்மினல் மூடிகள்.',
      icon: <Zap size={24} />,
      extendedDesc: lang === 'en'
        ? 'Conductivity and thermal stability are key. We stamp and form copper grounding clips, conductive brass washers, and casing caps that prevent power loss and ensure excellent terminal connectivity.'
        : 'மின் கடத்துத்திறன் மற்றும் வெப்ப நிலைத்தன்மை ஆகியவை முக்கியம். மின் இழப்பைத் தடுக்கும் மற்றும் சிறந்த டெர்மினல் இணைப்பை உறுதி செய்யும் செம்பு கிரவுண்டிங் கிளிப்புகள், கடத்தும் பித்தளை வாஷர்கள் மற்றும் கேசிங் மூடிகளை நாங்கள் தயாரிக்கிறோம்.',
      applications: lang === 'en'
        ? [
            'Busbar connection contact washers',
            'Conductive brass grounding clips',
            'Transformer switchgear spacer rings',
            'Electrical terminal protective caps'
          ]
        : [
            'பஸ்பார் இணைப்பு தொடர்பு வாஷர்கள்',
            'கடத்தும் பித்தளை கிரவுண்டிங் கிளிப்புகள்',
            'மின்மாற்றி சுவிட்ச்கியர் ஸ்பேசர் வளையங்கள்',
            'மின் முனைய பாதுகாப்பு மூடிகள்'
          ],
      materials: lang === 'en'
        ? ['Electrolytic Tough Pitch Copper', 'High Brass Grade 65/35', 'Pure Aluminum Sheet']
        : ['எலக்ட்ரோலிடிக் டஃப் பிட்ச் செம்பு', 'உயர் பித்தளை தரம் 65/35', 'தூய அலுமினிய தாள்'],
      tolerances: lang === 'en' ? 'Electrical assembly standard ±0.05 mm' : 'மின்சார அசெம்பிளி தரம் ±0.05 மிமீ',
      defaultProductCategory: 'Metal Washers'
    },
    {
      id: 'mechanical',
      title: lang === 'en' ? 'Mechanical' : 'மெக்கானிக்கல்',
      desc: lang === 'en'
        ? 'General industrial pins, blanking shims, and gaskets.'
        : 'பொதுவான தொழில்துறை பின்கள், ஷிம்கள் மற்றும் கேஸ்கெட்டுகள்.',
      icon: <Cog size={24} />,
      extendedDesc: lang === 'en'
        ? 'Our mechanical engineering parts offer versatility and reliable performance, acting as essential components in gearboxes, pumps, valves, and generic tooling setups requiring precision alignment.'
        : 'எங்கள் மெக்கானிக்கல் இன்ஜினியரிங் பாகங்கள் பன்முகத்தன்மை மற்றும் நம்பகமான செயல்திறனை வழங்குகின்றன, கியர்பாக்ஸ்கள், பம்புகள், வால்வுகள் மற்றும் துல்லியமான சீரமைப்பு தேவைப்படும் பொதுவான கருவி அமைப்புகளில் அத்தியாவசிய கூறுகளாக செயல்படுகின்றன.',
      applications: lang === 'en'
        ? [
            'Gear spacing and alignment shims',
            'Industrial guide locating pins',
            'Precision metal sealing gaskets',
            'Machine fixture press plates'
          ]
        : [
            'கியர் ஸ்பேசிங் மற்றும் சீரமைப்பு ஷிம்கள்',
            'தொழில்துறை வழிகாட்டி பின்கள்',
            'துல்லியமான உலோக சீல் கேஸ்கெட்டுகள்',
            'இயந்திர பொருத்துதல் அழுத்த தட்டுகள்'
          ],
      materials: lang === 'en'
        ? ['Stainless Steel (SS301, SS304)', 'Hardened Spring Steel', 'Bainitic / Martensitic Steel']
        : ['ஸ்டெயின்லெஸ் ஸ்டீல் (SS301, SS304)', 'கடினப்படுத்தப்பட்ட ஸ்பிரிங் ஸ்டீல்', 'பயினிடிக் / மார்டென்சிடிக் ஸ்டீல்'],
      tolerances: lang === 'en' ? 'Mechanical engineering standard ±0.04 mm' : 'மெக்கானிக்கல் பொறியியல் தரம் ±0.04 மிமீ',
      defaultProductCategory: 'Metal Washers'
    },
    {
      id: 'oem-manufacturing',
      title: lang === 'en' ? 'OEM Manufacturing' : 'ஓஇஎம் உற்பத்தி',
      desc: lang === 'en'
        ? 'Repeatable stamping components for machinery suppliers.'
        : 'இயந்திர சப்ளையர்களுக்கான அச்சு உதிரிபாகங்கள்.',
      icon: <Factory size={24} />,
      extendedDesc: lang === 'en'
        ? 'High repeatability is vital in original equipment manufacturing. S Basith & team fabricate dimensional stamping components based on exact CAD drawings to keep manufacturing lines flowing smoothly.'
        : 'ஒரிஜினல் உபகரண தயாரிப்பில் (OEM) உயர் மீண்டும் நிகழும் துல்லியம் இன்றியமையாதது. எஸ் பாசித் மற்றும் குழுவினர் துல்லியமான CAD வரைபடங்களின் அடிப்படையில் ஸ்டாம்பிங் உதிரிபாகங்களை உற்பத்தி செய்கிறார்கள்.',
      applications: lang === 'en'
        ? [
            'Custom high-volume stamped plates',
            'Sub-assembly mounting brackets',
            'Machinery housing sheet components',
            'Specialty spacers for component integrations'
          ]
        : [
            'தனிப்பயன் அதிக அளவு அச்சிடப்பட்ட தகடுகள்',
            'துணை அசெம்பிளி மவுண்டிங் அடைப்புகள்',
            'இயந்திர உறை தாள் கூறுகள்',
            'பாகங்கள் ஒருங்கிணைப்பிற்கான சிறப்பு ஸ்பேசர்கள்'
          ],
      materials: lang === 'en'
        ? ['CRCA Steel Sheet', 'Hot Rolled Steel (HR4)', 'Stainless Steel Grade 430 / 304']
        : ['சிஆர்டிஏ (CRCA) ஸ்டீல் தாள்', 'ஹாட் ரோல்டு ஸ்டீல் (HR4)', 'ஸ்டெயின்லெஸ் ஸ்டீல் தரம் 430 / 304'],
      tolerances: lang === 'en' ? 'CAD drawing specific, down to ±0.03 mm' : 'CAD வரைபட அளவின்படி ±0.03 மிமீ வரை',
      defaultProductCategory: 'MS Components'
    },
    {
      id: 'industrial-equipment',
      title: lang === 'en' ? 'Industrial Equipment' : 'தொழில்துறை உபகரணங்கள்',
      desc: lang === 'en'
        ? 'Machined caps, closing caps, and support frames.'
        : 'இயந்திர மூடிகள், குளோசிங் கேப்ஸ் மற்றும் ஆதரவு சட்டங்கள்.',
      icon: <Package size={24} />,
      extendedDesc: lang === 'en'
        ? 'We fabricate heavy metal frames, end caps, and custom enclosures built to safeguard internal hydraulics, bearings, and heavy-duty drive shafts from outer contamination and mechanical wear.'
        : 'உள் ஹைட்ராலிக்ஸ், தாங்கு உருளைகள் மற்றும் கனரக டிரைவ் ஷாஃப்ட்களை வெளிப்புற மாசு மற்றும் மெக்கானிக்கல் தேய்மானத்திலிருந்து பாதுகாக்க வடிவமைக்கப்பட்ட கனரக மெட்டல் பிரேம்கள், எண்ட் கேப்கள் மற்றும் தனிப்பயன் உறைகளை நாங்கள் தயாரிக்கிறோம்.',
      applications: lang === 'en'
        ? [
            'Hydraulic cylinder closing caps',
            'Heavy-duty industrial pump frames',
            'Bearing housing seals and brackets',
            'Protective pressure release cover plates'
          ]
        : [
            'ஹைட்ராலிக் சிலிண்டர் குளோசிங் மூடிகள்',
            'ஹெவி-டியூட்டி தொழில்துறை பம்ப் பிரேம்கள்',
            'தாங்கி வீட்டு முத்திரைகள் மற்றும் அடைப்புகள்',
            'பாதுகாப்பு பிரஷர் ரிலீஸ் கவர் தகடுகள்'
          ],
      materials: lang === 'en'
        ? ['Medium Carbon Steel', 'Structural Mild Steel (IS 2062)', 'Stainless Steel SS316']
        : ['மீடியம் கார்பன் ஸ்டீல்', 'கட்டமைப்பு மைல்டு ஸ்டீல் (IS 2062)', 'ஸ்டெயின்லெஸ் ஸ்டீல் SS316'],
      tolerances: lang === 'en' ? 'Industrial standard tolerances ±0.05 mm' : 'தொழில்துறை தர அளவு ±0.05 மிமீ',
      defaultProductCategory: 'Closing Caps'
    },
    {
      id: 'agriculture',
      title: lang === 'en' ? 'Agriculture' : 'வேளாண் துறை',
      desc: lang === 'en'
        ? 'Friction washers, brackets, and shear sheets for harvesters.'
        : 'அரிவாள் இயந்திரங்களுக்கான உராய்வு வாஷர்கள் மற்றும் பிராக்கெட்ஸ்.',
      icon: <Sprout size={24} />,
      extendedDesc: lang === 'en'
        ? 'Agricultural environments demand exceptional toughness. S Basith & team supply highly durable friction discs and structural mounting brackets built to handle extreme vibration, soil friction, and weather elements.'
        : 'விவசாய சூழல்களுக்கு விதிவிலக்கான வலிமை தேவைப்படுகிறது. எஸ் பாசித் மற்றும் குழுவினர் தீவிர அதிர்வு, மண் உராய்வு மற்றும் வானிலை கூறுகளைக் கையாளக்கூடிய அதிக நீடித்த உராய்வு தகடுகள் மற்றும் கட்டமைப்பு அடைப்புகளை வழங்குகிறார்கள்.',
      applications: lang === 'en'
        ? [
            'Harvester rotary cutting blade brackets',
            'Tractor hitch and linkage spacer washers',
            'Rotator friction plates and clutches',
            'Agricultural implement shear sheets'
          ]
        : [
            'அறுவடை இயந்திர பிளேடு அடைப்புகள்',
            'டிராக்டர் ஹிட்ச் மற்றும் லிங்கேஜ் ஸ்பேசர் வாஷர்கள்',
            'ரோட்டேட்டர் உராய்வு தகடுகள் மற்றும் கிளட்ச்கள்',
            'விவசாய உபகரண ஷியர் தாள்கள்'
          ],
      materials: lang === 'en'
        ? ['High carbon spring steel (hardened)', 'Hardox equivalent wear-resistant steel', 'Heavy Galvanized Iron']
        : ['ஹை கார்பன் ஸ்பிரிங் ஸ்டீல் (கடினப்படுத்தப்பட்டது)', 'ஹார்டாக்ஸ் நிகரான தேய்மான-எதிர்ப்பு ஸ்டீல்', 'ஹெவி கால்வனைஸ்டு இரும்பு'],
      tolerances: lang === 'en' ? 'High vibration structural tolerance ±0.08 mm' : 'அதிர்வு தாங்கும் கட்டமைப்பு தரம் ±0.08 மிமீ',
      defaultProductCategory: 'Metal Washers'
    }
  ];

  return (
    <section id="industries" className="section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="text-center">
          <p className="section-subtitle">{lang === 'en' ? 'OUR MARKETS' : 'தொழில்துறைகள்'}</p>
          <h2 className="section-title">
            {lang === 'en' ? 'Industries We Serve' : 'நாங்கள் சேவை செய்யும் துறைகள்'}
          </h2>
          <div style={{ width: '60px', height: '3px', backgroundColor: 'var(--accent)', margin: '0 auto 16px' }}></div>
          <p className="section-desc">
            {lang === 'en'
              ? 'Manufacturing customized precision metal products tailored to meet technical frameworks across multiple fields.'
              : 'பல்வேறு துறைகளுக்கான தொழில்நுட்ப தேவைகளை பூர்த்தி செய்ய தனிப்பயனாக்கப்பட்ட துல்லியமான உலோக பாகங்களை உற்பத்தி செய்கிறோம்.'}
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid-4" style={{ display: 'grid', gap: '24px', marginTop: '48px' }}>
          {industries.map((ind, idx) => (
            <div 
              key={idx} 
              className="industry-card" 
              onClick={() => setSelectedIndustry(ind)}
              style={{ cursor: 'pointer' }}
            >
              <div className="industry-icon">
                {ind.icon}
              </div>
              <h3 className="industry-name">{ind.title}</h3>
              <p className="industry-desc">{ind.desc}</p>
              <span 
                style={{ 
                  fontSize: '11px', 
                  color: 'var(--accent)', 
                  fontWeight: '600', 
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {lang === 'en' ? 'Learn More' : 'மேலும் அறிய'} &rarr;
              </span>
            </div>
          ))}
        </div>

        {/* Detailed Industry Modal */}
        {selectedIndustry && (
          <div className="modal-overlay" onClick={() => setSelectedIndustry(null)}>
            <div 
              className="modal-content" 
              style={{ maxWidth: '700px' }} 
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close-btn" 
                onClick={() => setSelectedIndustry(null)}
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

              <div style={{ padding: '36px 30px' }}>
                {/* Header inside modal */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div className="industry-icon" style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'var(--accent)', color: '#FFFFFF' }}>
                    {selectedIndustry.icon}
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '1px' }}>
                      {lang === 'en' ? 'Industry Detail' : 'துறை விவரம்'}
                    </span>
                    <h3 style={{ fontSize: '24px', fontWeight: '700', marginTop: '2px' }}>{selectedIndustry.title}</h3>
                  </div>
                </div>

                {/* Description */}
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
                  {selectedIndustry.extendedDesc}
                </p>

                {/* Technical Specifications Table */}
                <div style={{ marginBottom: '24px' }}>
                  <h4 className="modal-section-title" style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                    {lang === 'en' ? 'Technical Specifications' : 'தொழில்நுட்ப விவரக்குறிப்புகள்'}
                  </h4>
                  <table className="specs-table" style={{ width: '100%', fontSize: '13px' }}>
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: '600', padding: '8px 0', width: '35%' }}>
                          {lang === 'en' ? 'Common Materials' : 'பொதுவான பொருட்கள்'}
                        </td>
                        <td style={{ color: 'var(--text-secondary)', padding: '8px 0' }}>
                          {selectedIndustry.materials.join(', ')}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: '600', padding: '8px 0' }}>
                          {lang === 'en' ? 'Tolerances Offered' : 'வழங்கப்படும் துல்லியம்'}
                        </td>
                        <td style={{ color: 'var(--text-secondary)', padding: '8px 0' }}>
                          {selectedIndustry.tolerances}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Applications list */}
                <div style={{ marginBottom: '32px' }}>
                  <h4 className="modal-section-title" style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                    {lang === 'en' ? 'Key Applications' : 'முக்கிய பயன்பாடுகள்'}
                  </h4>
                  <ul className="modal-list">
                    {selectedIndustry.applications.map((app, i) => (
                      <li key={i} className="modal-list-item" style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                        <div className="modal-list-bullet" style={{ flexShrink: 0, width: '18px', height: '18px', background: 'rgba(26, 123, 143, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                          <Check size={10} />
                        </div>
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                  <button 
                    onClick={() => {
                      setSelectedIndustry(null);
                      setCurrentTab('products');
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }, 100);
                    }} 
                    className="btn"
                    style={{ 
                      flex: 1, 
                      padding: '12px 24px', 
                      backgroundColor: 'transparent', 
                      border: '1px solid var(--accent)', 
                      color: 'var(--accent)',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>{lang === 'en' ? 'Explore Related Products' : 'தொடர்புடைய தயாரிப்புகள்'}</span>
                  </button>

                  <button 
                    onClick={() => {
                      setSelectedIndustry(null);
                      onRequestQuote(selectedIndustry.defaultProductCategory || 'Metal Washers');
                    }}
                    className="btn btn-cta"
                    style={{ 
                      flex: 1, 
                      padding: '12px 24px', 
                      backgroundColor: 'var(--cta)', 
                      border: 'none', 
                      color: '#FFFFFF',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <FileText size={16} />
                    <span>{lang === 'en' ? 'Get a B2B Quote' : 'விலைப்புள்ளி கேட்க'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
