import React, { useState, useEffect } from 'react';
import { Search, Eye, FileText, X, Check } from 'lucide-react';

interface ProductsProps {
  onRequestQuote: (category?: string) => void;
  lang: 'en' | 'ta';
}

interface ProductItem {
  id: string;
  name: string;
  category: string;
  desc: string;
  image: string;
  price?: string;
  specs: {
    dimensionSize: string;
    material: string;
    size: string;
    color?: string;
    shape?: string;
    feature?: string;
  };
  applications: string[];
  industries: string[];
  features: string[];
  blueprint: React.ReactNode;
}

export const Products: React.FC<ProductsProps> = ({ onRequestQuote, lang }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    setVisibleCount(6);
  }, [selectedCategory, searchQuery]);

  const products: ProductItem[] = [
    {
      id: 'prod-washer-thick-flat',
      name: lang === 'en' ? 'Thick Flat Washer' : 'தடிமனான பிளாட் வாஷர்',
      category: 'Metal Washers',
      desc: lang === 'en' ? 'Heavy-duty flat washer with thick cross-section for distributing massive structural clamping loads.' : 'அதிக சுமை விநியோகத்திற்கான தடிமனான பிளாட் வாஷர்.',
      image: '/washers/thick_flat.png',
      specs: {
        dimensionSize: 'Customized',
        material: 'Mild Steel / High Tensile Carbon Steel',
        size: 'As per customer need'
      },
      applications: [
        lang === 'en' ? 'Heavy Machinery assemblies' : 'கனரக இயந்திரங்கள் கூட்டமைப்பு',
        lang === 'en' ? 'Structural bolting joints' : 'கட்டமைப்பு போல்டிங் மூட்டுகள்'
      ],
      industries: ['Construction', 'Mining', 'Heavy Infrastructure'],
      features: [
        lang === 'en' ? 'Extra thick cross-section for safety' : 'பாதுகாப்பிற்காக கூடுதல் தடிமனான குறுக்குவெட்டு',
        lang === 'en' ? 'Strict load-bearing compliance' : 'கடுமையான சுமை தாங்கும் இணக்கம்'
      ],
      blueprint: (
        <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100px', color: 'var(--accent)' }}>
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="6" />
          <circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="3" />
          <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.4" />
          <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.4" />
        </svg>
      )
    },
    {
      id: 'prod-washer-thrust',
      name: lang === 'en' ? 'Thrust Washer' : 'த்ரஸ்ட் வாஷர்',
      category: 'Metal Washers',
      desc: lang === 'en' ? 'Engineered washer designed to support axial loads and prevent wear in rotating assemblies.' : 'சுழலும் அச்சு சுமைகளை தாங்கி மேற்பரப்பு தேய்மானத்தை தடுக்கும் வாஷர்.',
      image: '/washers/thrust.png',
      specs: {
        dimensionSize: 'Customized',
        material: 'Hardened Steel / Bronze Alloy',
        size: 'As per customer need'
      },
      applications: [
        lang === 'en' ? 'Rotary shafts alignment' : 'சுழலும் தண்டுகள் சீரமைப்பு',
        lang === 'en' ? 'Gearbox assembly shims' : 'கியர்பாக்ஸ் அசெம்பிளி ஷிம்கள்'
      ],
      industries: ['Automotive', 'Aerospace', 'Power Transmission'],
      features: [
        lang === 'en' ? 'Supports high axial pressure' : 'அதிக அச்சு அழுத்தத்தைத் தாங்கும்',
        lang === 'en' ? 'Extremely low friction surface' : 'மிகக் குறைந்த உராய்வு மேற்பரப்பு'
      ],
      blueprint: (
        <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100px', color: 'var(--accent)' }}>
          <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
        </svg>
      )
    },
    {
      id: 'prod-washer-thin',
      name: lang === 'en' ? 'Thin Washer' : 'மெல்லிய வாஷர்',
      category: 'Metal Washers',
      desc: lang === 'en' ? 'Ultra-thin precision washer for spacing, shim adjustments, and alignment in compact hardware.' : 'சிறிய சாதனங்களில் சீரமைப்பு மற்றும் இடைவெளி சரிசெய்தலுக்கான மெல்லிய வாஷர்.',
      image: '/washers/thin.png?v=2',
      specs: {
        dimensionSize: 'Customized',
        material: 'Stainless Steel 304 / Brass',
        size: 'As per customer need'
      },
      applications: [
        lang === 'en' ? 'Micro-mechanisms spacing' : 'மைக்ரோ மெக்கானிசம்ஸ் இடைவெளி',
        lang === 'en' ? 'Electronic casing alignments' : 'மின்னணு உறைகள் சீரமைப்புகள்'
      ],
      industries: ['Electronics', 'Precision Instruments', 'Medical Devices'],
      features: [
        lang === 'en' ? 'Ultra-precise thickness control' : 'அல்ட்ரா-துல்லியமான தடிமன் கட்டுப்பாடு',
        lang === 'en' ? 'Burr-free punching edges' : 'விளிம்புகளில் கூடுதல் உலோகம் இல்லாத துல்லியம்'
      ],
      blueprint: (
        <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100px', color: 'var(--accent)' }}>
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" opacity="0.3" />
          <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" opacity="0.3" />
        </svg>
      )
    },
    {
      id: 'prod-washer-ss',
      name: lang === 'en' ? 'SS Washer' : 'துருப்பிடிக்காத எஃகு வாஷர்',
      category: 'Metal Washers',
      desc: lang === 'en' ? 'High-grade stainless steel washer offering outstanding rust and chemical resistance in harsh environments.' : 'அரிப்பைத் தடுக்கும் உயர்தர துருப்பிடிக்காத எஃகு வாஷர்.',
      image: '/washers/ss.png',
      specs: {
        dimensionSize: 'Customized',
        material: 'Stainless Steel 316 / 304',
        size: 'As per customer need'
      },
      applications: [
        lang === 'en' ? 'Chemical processing systems' : 'இரசாயன செயலாக்க அமைப்புகள்',
        lang === 'en' ? 'Marine machinery components' : 'கடல்சார் இயந்திர கூறுகள்'
      ],
      industries: ['Chemical', 'Marine', 'Food Processing', 'Oil & Gas'],
      features: [
        lang === 'en' ? 'Outstanding rust prevention' : 'சிறந்த துரு தடுப்பு',
        lang === 'en' ? 'Highly chemical resilient' : 'அதிக இரசாயன எதிர்ப்பு திறன்'
      ],
      blueprint: (
        <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100px', color: 'var(--accent)' }}>
          <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="4" />
          <circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="3" />
          <line x1="10" y1="10" x2="90" y2="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" opacity="0.3" />
        </svg>
      )
    },
    {
      id: 'prod-washer-ms',
      name: lang === 'en' ? 'MS Washer' : 'எம்எஸ் வாஷர்',
      category: 'Metal Washers',
      desc: lang === 'en' ? 'Economical mild steel washer for general purpose fastening, load distribution, and spacing.' : 'பொதுவான கட்டுதல் மற்றும் சுமை விநியோகத்திற்கான சிக்கனமான எம்எஸ் வாஷர்.',
      image: '/washers/ms.png',
      specs: {
        dimensionSize: 'Customized',
        material: 'Mild Steel (Grade DD11 / HR4)',
        size: 'As per customer need'
      },
      applications: [
        lang === 'en' ? 'General mechanical fastening' : 'பொதுவான மெக்கானிக்கல் கட்டுதல்',
        lang === 'en' ? 'Wood framing assemblies' : 'மர சட்ட கூட்டங்கள்'
      ],
      industries: ['Construction', 'OEM Manufacturing', 'General Engineering'],
      features: [
        lang === 'en' ? 'High cost-effectiveness' : 'அதிக செலவு திறன்',
        lang === 'en' ? 'Excellent structural rigidity' : 'சிறந்த கட்டமைப்பு விறைப்பு'
      ],
      blueprint: (
        <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100px', color: 'var(--accent)' }}>
          <circle cx="50" cy="50" r="39" fill="none" stroke="currentColor" strokeWidth="5" />
          <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="4" />
          <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
        </svg>
      )
    },

    {
      id: 'prod-ss-end-plug',
      name: lang === 'en' ? 'SS End Plug' : 'எஸ்எஸ் எண்ட் பிளக்',
      category: 'SS Components',
      desc: lang === 'en' ? 'Precision-engineered stainless steel end plugs for sealing pipe and tube terminations.' : 'குழாய்களின் முனைகளை மூடுவதற்கு பயன்படும் துருப்பிடிக்காத எஃகு பிளக்.',
      image: '/ss_components/ss_end_plug.png?v=4',
      specs: {
        dimensionSize: 'Customized',
        material: 'Stainless Steel 304 / 316',
        size: 'As per customer need'
      },
      applications: [
        lang === 'en' ? 'Sealing structural tubular frames' : 'கட்டமைப்பு குழாய் பிரேம்களை மூடுதல்',
        lang === 'en' ? 'End cap closures for pipelines' : 'குழாய்வழிகளுக்கான எண்ட் கேப் மூடிகள்'
      ],
      industries: ['Construction', 'Plumbing', 'Decorative Infrastructure'],
      features: [
        lang === 'en' ? 'Perfect pressure-seal fit' : 'சரியான அழுத்தம்-சீல் பொருத்தம்',
        lang === 'en' ? 'Corrosion-resistant premium finish' : 'அரிப்பைத் தடுக்கும் பிரீமியம் பூச்சு'
      ],
      blueprint: (
        <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100px', color: 'var(--accent)' }}>
          <path d="M 15 75 A 35 35 0 0 1 85 75" fill="none" stroke="currentColor" strokeWidth="3" />
          <line x1="15" y1="75" x2="85" y2="75" stroke="currentColor" strokeWidth="3" />
          <rect x="25" y="75" width="50" height="8" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 'prod-ss-bracket',
      name: lang === 'en' ? 'SS Bracket' : 'எஸ்எஸ் அடைப்புக்குறி (பிராக்கெட்)',
      category: 'SS Components',
      desc: lang === 'en' ? 'Durable U-shaped stainless steel mounting bracket for structural pipe fastening and load support.' : 'குழாய்கள் மற்றும் கம்பிகளை சுவரில் பொருத்த பயன்படும் U-வடிவ எஸ்எஸ் பிராக்கெட்.',
      image: '/ss_components/ss_bracket.png?v=4',
      specs: {
        dimensionSize: 'Customized',
        material: 'Stainless Steel 304',
        size: 'As per customer need'
      },
      applications: [
        lang === 'en' ? 'Wall mounting of conduits and tubes' : 'குழாய்களை சுவரில் ஏற்றுதல்',
        lang === 'en' ? 'Machinery structural support framing' : 'இயந்திர கட்டமைப்பு ஆதரவு சட்டகம்'
      ],
      industries: ['Industrial Manufacturing', 'Heavy Infrastructure', 'Construction'],
      features: [
        lang === 'en' ? 'High structural load bearing' : 'அதிக கட்டமைப்பு சுமை தாங்கும் திறன்',
        lang === 'en' ? 'Pre-drilled clean bolt alignments' : 'முன்பே துளையிடப்பட்ட போல்ட் துளைகள்'
      ],
      blueprint: (
        <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100px', color: 'var(--accent)' }}>
          <path d="M 10 75 H 25 A 25 25 0 0 1 75 75 H 90" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M 20 75 H 35 A 15 15 0 0 1 65 75 H 80" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="17" cy="75" r="3" fill="currentColor" />
          <circle cx="83" cy="75" r="3" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'prod-ss-retainer',
      name: lang === 'en' ? 'SS Retainer' : 'எஸ்எஸ் ரிடெய்னர் பிளேட்',
      category: 'SS Components',
      desc: lang === 'en' ? 'Octagonal-shaped stainless steel retainer plate with a central rectangular cutout for hardware positioning.' : 'துல்லியமான வடிவமைப்பு மற்றும் பொருத்துதலுக்கான எஸ்எஸ் ரிடெய்னர் பிளேட்.',
      image: '/ss_components/ss_retainer.png?v=4',
      specs: {
        dimensionSize: 'Customized',
        material: 'Stainless Steel 316',
        size: 'As per customer need'
      },
      applications: [
        lang === 'en' ? 'Locking plate alignment fixtures' : 'பூட்டுதல் தகடு சீரமைப்பு சாதனங்கள்',
        lang === 'en' ? 'Structural spacer indexing' : 'கட்டமைப்பு ஸ்பேசர் குறியீட்டு முறை'
      ],
      industries: ['Automotive OEM', 'Medical Devices', 'Process Piping'],
      features: [
        lang === 'en' ? 'Extremely flat tolerances' : 'மிகவும் தட்டையான சகிப்புத்தன்மை வரம்புகள்',
        lang === 'en' ? 'Anti-slip indexing design' : 'நழுவாத குறியீட்டு வடிவமைப்பு'
      ],
      blueprint: (
        <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100px', color: 'var(--accent)' }}>
          <polygon points="30,15 70,15 85,30 85,70 70,85 30,85 15,70 15,30" fill="none" stroke="currentColor" strokeWidth="3" />
          <rect x="35" y="35" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="22" r="3" fill="currentColor" />
          <circle cx="50" cy="78" r="3" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'prod-ss-clamp',
      name: lang === 'en' ? 'SS Clamp' : 'எஸ்எஸ் கிளாம்ப்',
      category: 'SS Components',
      desc: lang === 'en' ? 'Heavy-duty stainless steel clamp ring for pipe joining, leak prevention, and secure high-vibration fastening.' : 'அரிப்பு மற்றும் அதிர்வுகளைத் தாங்கும் தொழில்துறை எஸ்எஸ் கிளாம்ப்.',
      image: '/ss_components/ss_clamp.png?v=7',
      specs: {
        dimensionSize: 'Customized',
        material: 'Stainless Steel 304 / 316',
        size: 'As per customer need'
      },
      applications: [
        lang === 'en' ? 'High-pressure hose clamping' : 'உயர் அழுத்த குழாய் கிளாம்பிங்',
        lang === 'en' ? 'Exhaust pipe joint fastening' : 'வெளியேற்ற குழாய் கூட்டு கட்டுதல்'
      ],
      industries: ['Automotive', 'Marine', 'Food & Chemical Processing'],
      features: [
        lang === 'en' ? 'High clamping force distribution' : 'அதிக கிளாம்பிங் விசை விநியோகம்',
        lang === 'en' ? 'Rust-free and chemical resistant' : 'துரு இல்லாத மற்றும் வேதியியல் எதிர்ப்பு திறன்'
      ],
      blueprint: (
        <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100px', color: 'var(--accent)' }}>
          <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect x="42" y="8" width="16" height="12" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="50" y1="8" x2="50" y2="20" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 'prod-flat-angle-bracket',
      name: lang === 'en' ? 'Flat Angle Bracket' : 'பிளாட் ஆங்கிள் பிராக்கெட்',
      category: 'Metal Brackets',
      desc: lang === 'en' ? 'Heavy-duty flat angle bracket with precision drilled mounting holes for structural and general purpose fastening.' : 'கட்டமைப்பு பொருத்துதலுக்கான தட்டையான கோண பிராக்கெட்.',
      image: '/brackets/flat_angle_bracket.png?v=1',
      specs: {
        dimensionSize: 'Customized',
        material: 'Mild Steel / Zinc Plated Steel',
        size: 'As per customer need'
      },
      applications: [
        lang === 'en' ? 'General structural mounting' : 'பொது கட்டமைப்பு பொருத்துதல்',
        lang === 'en' ? 'Panel and frame assembly' : 'பேனல் மற்றும் சட்டக கட்டமைப்பு'
      ],
      industries: ['Construction', 'Electrical', 'Automobile'],
      features: [
        lang === 'en' ? 'Precision drilled holes for accurate fitment' : 'துல்லியமான துளைகள்',
        lang === 'en' ? 'Corrosion-resistant zinc coating' : 'துருவிரோத ஜிங்க் பூச்சு'
      ],
      blueprint: (
        <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100px', color: 'var(--accent)' }}>
          <rect x="10" y="42" width="80" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="28" cy="50" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="72" cy="50" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 'prod-u-bracket',
      name: lang === 'en' ? 'U Bracket' : 'யு பிராக்கெட்',
      category: 'Metal Brackets',
      desc: lang === 'en' ? 'U-shaped metal bracket for pipe clamping, wire harness retention, and cable management in automotive and industrial assemblies.' : 'குழாய் மற்றும் கம்பி கட்டுதலுக்கான U-வடிவ பிராக்கெட்.',
      image: '/brackets/u_bracket.png?v=1',
      specs: {
        dimensionSize: 'Customized',
        material: 'Mild Steel / CRCA Sheet',
        size: 'As per customer need'
      },
      applications: [
        lang === 'en' ? 'Wire harness retention clips' : 'கம்பி கட்டுப்பட்டை தக்கவைப்பு கிளிப்',
        lang === 'en' ? 'Small pipe and tube mounting' : 'சிறிய குழாய் மவுண்டிங்'
      ],
      industries: ['Automotive', 'Electronics', 'HVAC'],
      features: [
        lang === 'en' ? 'Strong U-form retention design' : 'வலுவான U-வடிவ தக்கவைப்பு வடிவமைப்பு',
        lang === 'en' ? 'Compact footprint for tight spaces' : 'குறைந்த இடத்தில் பொருந்தும் வடிவமைப்பு'
      ],
      blueprint: (
        <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100px', color: 'var(--accent)' }}>
          <path d="M 25 20 V 70 A 25 25 0 0 0 75 70 V 20" fill="none" stroke="currentColor" strokeWidth="3" />
        </svg>
      )
    },
    {
      id: 'prod-harness-bracket',
      name: lang === 'en' ? 'Harness Bracket' : 'ஹார்னஸ் பிராக்கெட்',
      category: 'Metal Brackets',
      desc: lang === 'en' ? 'Custom-formed harness mounting bracket used to route and secure wire looms in automotive and heavy equipment assemblies.' : 'வாகன மின் கம்பி அமைப்புகளை பொருத்துவதற்கான ஹார்னஸ் பிராக்கெட்.',
      image: '/brackets/harness_bracket.png?v=1',
      specs: {
        dimensionSize: 'Customized',
        material: 'Mild Steel / Galvanized Sheet',
        size: 'As per customer need'
      },
      applications: [
        lang === 'en' ? 'Automotive wire harness routing' : 'வாகன கம்பி ஹார்னஸ் திசைமாற்றம்',
        lang === 'en' ? 'Heavy equipment cable management' : 'கனரக உபகரண கேபிள் நிர்வாகம்'
      ],
      industries: ['Automotive OEM', 'Commercial Vehicles', 'Heavy Machinery'],
      features: [
        lang === 'en' ? 'Custom bend profiles for exact routing paths' : 'சரியான திசைமாற்றுவதற்கான தனிப்பயன் வளைவுகள்',
        lang === 'en' ? 'Corrosion-resistant finish for longevity' : 'நீண்ட ஆயுளுக்கான அரிப்பு தடுப்பு பூச்சு'
      ],
      blueprint: (
        <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100px', color: 'var(--accent)' }}>
          <path d="M 15 20 H 60 V 50 H 85 V 80 H 60 V 65 H 15 Z" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="35" cy="30" r="4" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'prod-ms-boot-ring',
      name: lang === 'en' ? 'MS Boot Ring' : 'எம்எஸ் பூட் ரிங்',
      category: 'MS Components',
      desc: lang === 'en' ? 'Mild steel boot ring manufactured by precision stamping for secure sealing and fitting applications.' : 'பாதுகாப்பான சீலிங் மற்றும் பொருத்தும் பயன்பாடுகளுக்கான துல்லியமான ஸ்டாம்பிங் மூலம் தயாரிக்கப்பட்ட எம்எஸ் பூட் ரிங்.',
      image: '/ms_components/ms_boot_ring.png',
      specs: {
        dimensionSize: 'Customized',
        material: 'Mild Steel',
        size: 'As per customer need'
      },
      applications: [
        lang === 'en' ? 'Boot and seal retaining joints' : 'பூட் மற்றும் சீல் தக்கவைப்பு மூட்டுகள்',
        lang === 'en' ? 'Automotive drive shaft assemblies' : 'வாகன டிரைவ் ஷாஃப்ட் கட்டமைப்புகள்'
      ],
      industries: ['Automobile', 'Mechanical'],
      features: [
        lang === 'en' ? 'Precision ring diameter tolerance' : 'துல்லியமான ரிங் விட்ட சகிப்புத்தன்மை',
        lang === 'en' ? 'Rust-resistant oiled finish' : 'துருவை எதிர்க்கும் எண்ணெய் முலாம்'
      ],
      blueprint: (
        <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100px', color: 'var(--accent)' }}>
          <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="7" />
          <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.4" />
          <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.4" />
        </svg>
      )
    },
    {
      id: 'prod-ms-hook',
      name: lang === 'en' ? 'MS Hook' : 'எம்எஸ் கொக்கி',
      category: 'MS Components',
      desc: lang === 'en' ? 'Heavy-duty mild steel hook stamped and formed for reliable load-bearing and fastening applications.' : 'நம்பகமான சுமை தாங்கும் மற்றும் இணைப்பு பயன்பாடுகளுக்கான தடிமனான எம்எஸ் கொக்கி.',
      image: '/ms_components/ms_hook.png',
      specs: {
        dimensionSize: 'Customized',
        material: 'Mild Steel',
        size: 'As per customer need'
      },
      applications: [
        lang === 'en' ? 'Industrial hanging and rigging' : 'தொழில்துறை தொங்கல் மற்றும் ரிக்கிங்',
        lang === 'en' ? 'Agricultural equipment linkages' : 'விவசாய உபகரண இணைப்புகள்'
      ],
      industries: ['Agriculture', 'Automobile', 'Mechanical'],
      features: [
        lang === 'en' ? 'High load-bearing strength' : 'உயர் சுமை தாங்கும் வலிமை',
        lang === 'en' ? 'Smooth formed hook profile' : 'சுத்தமான உருவாக்கப்பட்ட கொக்கி வடிவம்'
      ],
      blueprint: (
        <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100px', color: 'var(--accent)' }}>
          <path d="M 50 10 L 50 50 Q 50 80 30 80 Q 10 80 10 60 Q 10 45 25 45" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <circle cx="50" cy="10" r="5" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'prod-ms-base-plate',
      name: lang === 'en' ? 'MS Base Plate' : 'எம்எஸ் அடி தட்டு',
      category: 'MS Components',
      desc: lang === 'en' ? 'Flat mild steel base plate stamped to precise dimensions for mounting, anchoring, and structural support.' : 'நிறுவுதல், நங்கூரமிடுதல் மற்றும் கட்டமைப்பு ஆதரவிற்கான துல்லியமான பரிமாணங்களில் ஸ்டாம்ப் செய்யப்பட்ட எம்எஸ் அடி தட்டு.',
      image: '/ms_components/ms_base_plate.png',
      specs: {
        dimensionSize: 'Customized',
        material: 'Mild Steel',
        size: 'As per customer need'
      },
      applications: [
        lang === 'en' ? 'Machinery base mounting' : 'இயந்திர அடி நிறுவல்',
        lang === 'en' ? 'Structural column anchor plates' : 'கட்டமைப்பு தூண் நங்கூர தட்டுகள்'
      ],
      industries: ['Construction', 'Automobile', 'Heavy Engineering'],
      features: [
        lang === 'en' ? 'Flat surface with drilled bolt holes' : 'துளையிடப்பட்ட போல்ட் துளைகளுடன் தட்டையான மேற்பரப்பு',
        lang === 'en' ? 'Precise sheared edges' : 'துல்லியமான வெட்டப்பட்ட விளிம்புகள்'
      ],
      blueprint: (
        <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100px', color: 'var(--accent)' }}>
          <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="50" cy="50" r="5" fill="currentColor" />
          <circle cx="25" cy="50" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="75" cy="50" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="25" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="75" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 'prod-seal-pressure-plate',
      name: lang === 'en' ? 'Seal Pressure Plate' : 'சீல் பிரஷர் பிளேட்',
      category: 'Seal Pressure Plate',
      desc: lang === 'en' ? 'Due to our enormous understanding and massive knowledge of this business, we are involved in offering Seal Pressure Plate.' : 'எங்கள் நிறுவனம் சிறந்த தரமான சீல் பிரஷர் பிளேட் தயாரிப்புகளை வழங்கி வருகிறது.',
      image: '/ms_components/seal_pressure_plate.png',
      specs: {
        dimensionSize: 'As per client need',
        material: 'Mild Steel / Zinc Plated',
        size: 'Available in different size'
      },
      applications: [
        lang === 'en' ? 'High pressure joint sealing' : 'உயர் அழுத்த கூட்டு சீல்',
        lang === 'en' ? 'Structural gasket clamping' : 'கட்டமைப்பு கேஸ்கெட் கிளாம்பிங்'
      ],
      industries: ['Mechanical', 'Automobile', 'Industrial Equipment'],
      features: [
        lang === 'en' ? 'Strong body construction' : 'வலுவான வடிவமைப்பு',
        lang === 'en' ? 'Available in different size options' : 'வெவ்வேறு அளவுகளில் கிடைக்கிறது',
        lang === 'en' ? 'Weather resistant finish' : 'வானிலை எதிர்ப்பு பூச்சு'
      ],
      blueprint: (
        <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100px', color: 'var(--accent)' }}>
          <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" strokeWidth="4" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      )
    },
    {
      id: 'prod-6',
      name: lang === 'en' ? 'MS Sheet' : 'எம்எஸ் தாள்',
      category: 'MS Sheets',
      price: '₹600/kg',
      desc: lang === 'en' ? 'Custom sheared flat mild steel plates cut precisely to design requirements for industrial and structural applications.' : 'வடிவமைப்புத் தேவைகளுக்கு ஏற்ப துல்லியமாக வெட்டப்பட்ட தனிப்பயன் தட்டையான எம்எஸ் தாள்கள்.',
      image: '/ms_sheets/ms_sheet.png',
      specs: {
        dimensionSize: 'Customized',
        material: 'Mild Steel',
        size: 'As per customer need'
      },
      applications: [
        lang === 'en' ? 'Base plates for frameworks' : 'கட்டமைப்புகளுக்கான அடிப்படை தாள்கள்',
        lang === 'en' ? 'Protective engine coverings' : 'என்ஜின்களுக்கான பாதுகாப்பு கவசங்கள்'
      ],
      industries: ['Construction', 'Heavy Engineering'],
      features: [
        lang === 'en' ? 'Perfect square corners' : 'சரியான சதுர விளிம்புகள்',
        lang === 'en' ? 'Clean sheared edge bounds' : 'சுத்தமாக வெட்டப்பட்ட விளிம்பு எல்லைகள்'
      ],
      blueprint: (
        <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100px', color: 'var(--accent)' }}>
          <rect x="15" y="15" width="70" height="70" fill="none" stroke="currentColor" strokeWidth="3" />
          <line x1="15" y1="15" x2="85" y2="85" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          <line x1="85" y1="15" x2="15" y2="85" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        </svg>
      )
    },
    {
      id: 'prod-ms-steel-work',
      name: lang === 'en' ? 'MS Steel Work' : 'எம்எஸ் ஸ்டீல் வொர்க்',
      category: 'MS Sheets',
      price: '₹600/kg',
      desc: lang === 'en' ? 'Precision stamped and formed mild steel structural work components, bulk-packed and ready for assembly in construction and industrial projects.' : 'கட்டுமான மற்றும் தொழில்துறை திட்டங்களுக்காக துல்லியமாக ஸ்டாம்ப் செய்யப்பட்ட எம்எஸ் ஸ்டீல் பாகங்கள்.',
      image: '/ms_sheets/ms_steel_work.png',
      specs: {
        dimensionSize: 'Customized',
        material: 'Mild Steel',
        size: 'As per customer need'
      },
      applications: [
        lang === 'en' ? 'Structural steel fabrication' : 'கட்டமைப்பு எஃகு உற்பத்தி',
        lang === 'en' ? 'Industrial assembly components' : 'தொழில்துறை அசெம்பிளி பாகங்கள்'
      ],
      industries: ['Construction', 'Heavy Engineering', 'Manufacturing'],
      features: [
        lang === 'en' ? 'Bulk-ready packed components' : 'மொத்த பேக்கிங் தயாரான பாகங்கள்',
        lang === 'en' ? 'High-strength structural grade steel' : 'உயர் வலிமையான கட்டமைப்பு தர எஃகு'
      ],
      blueprint: (
        <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100px', color: 'var(--accent)' }}>
          <rect x="10" y="30" width="80" height="12" fill="none" stroke="currentColor" strokeWidth="3" />
          <rect x="10" y="50" width="80" height="12" fill="none" stroke="currentColor" strokeWidth="3" />
          <rect x="10" y="70" width="80" height="12" fill="none" stroke="currentColor" strokeWidth="3" />
          <line x1="20" y1="30" x2="20" y2="82" stroke="currentColor" strokeWidth="2" opacity="0.4" />
          <line x1="80" y1="30" x2="80" y2="82" stroke="currentColor" strokeWidth="2" opacity="0.4" />
        </svg>
      )
    },
    {
      id: 'prod-round-rubber-washer',
      name: lang === 'en' ? 'Round Rubber Washer' : 'வட்ட ரப்பர் வாஷர்',
      category: 'Rubber Washers',
      desc: lang === 'en' ? 'We have carved a niche amongst the most trusted names in this business, engaged in offering a comprehensive range of Round Rubber Washer.' : 'எங்கள் நிறுவனம் வட்ட ரப்பர் வாஷர் உற்பத்தியில் நம்பகமான பெயரைப் பெற்றுள்ளது.',
      image: '/rubber_washers/round_rubber_washer.png',
      specs: {
        dimensionSize: 'Customized',
        material: 'Rubber',
        size: 'As per customer need',
        color: 'Black',
        shape: 'Round'
      },
      applications: [
        lang === 'en' ? 'Pipe joint sealing' : 'குழாய் மூட்டு சீல்',
        lang === 'en' ? 'Bolt & nut load distribution' : 'போல்ட் மற்றும் நட் சுமை விநியோகம்'
      ],
      industries: ['Automobile', 'Plumbing', 'Industrial Equipment'],
      features: [
        lang === 'en' ? 'High chemical resistance' : 'வேதியியல் எதிர்ப்புக் குணம்',
        lang === 'en' ? 'Flexible and durable seal' : 'நெகிழ்வான மற்றும் நீடித்த சீல்'
      ],
      blueprint: (
        <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100px', color: 'var(--accent)' }}>
          <circle cx="50" cy="50" r="40" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="6" />
          <circle cx="50" cy="50" r="22" fill="var(--bg)" stroke="currentColor" strokeWidth="3" />
        </svg>
      )
    },
    {
      id: 'prod-rubber-o-rings-washer',
      name: lang === 'en' ? 'Rubber O Rings Washer' : 'ரப்பர் ஓ ரிங்ஸ் வாஷர்',
      category: 'Rubber Washers',
      desc: lang === 'en' ? 'Precision rubber O-ring washer providing a tight radial seal in hydraulic, pneumatic and fluid systems.' : 'ஹைட்ராலிக், நியூமேடிக் மற்றும் திரவ அமைப்புகளில் இறுக்கமான சீல் வழங்கும் ரப்பர் ஓ ரிங் வாஷர்.',
      image: '/rubber_washers/rubber_o_rings_washer.png',
      specs: {
        dimensionSize: 'Customized',
        material: 'Nitrile / Silicone / Viton',
        size: 'As per customer need'
      },
      applications: [
        lang === 'en' ? 'Hydraulic cylinder sealing' : 'ஹைட்ராலிக் சிலிண்டர் சீல்',
        lang === 'en' ? 'Pneumatic valve sealing' : 'நியூமேடிக் வால்வு சீல்'
      ],
      industries: ['Automobile', 'Electrical', 'Agricultural'],
      features: [
        lang === 'en' ? 'Tight radial leak-proof fit' : 'இறுக்கமான கசிவு இல்லாத பொருத்தம்',
        lang === 'en' ? 'Outstanding seal elasticity' : 'சிறந்த சீல் நெகிழ்ச்சித்தன்மை'
      ],
      blueprint: (
        <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100px', color: 'var(--accent)' }}>
          <circle cx="50" cy="50" r="38" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="8" />
          <circle cx="50" cy="50" r="25" fill="var(--bg)" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },

    {
      id: 'prod-8',
      name: lang === 'en' ? 'Closing Cap' : 'குளோசிங் கேப்',
      category: 'Closing Caps',
      desc: lang === 'en' ? 'We have been counted amongst the most trusted names in this domain, engaged in offering a standard quality range of Closing Cap.' : 'எங்கள் நிறுவனம் சிறந்த தரமான குளோசிங் கேப் தயாரிப்புகளை வழங்கி வருகிறது.',
      image: '/closing_caps/closing_cap.png',
      specs: {
        dimensionSize: 'As per client need',
        material: 'Stainless Steel',
        size: 'As per client need',
        feature: 'High Strength'
      },
      applications: [
        lang === 'en' ? 'Sanitary fittings and clamp caps' : 'சுகாதார பொருத்துதல்கள் மற்றும் கிளாம்ப் மூடிகள்',
        lang === 'en' ? 'Tanks and process pipelines closure' : 'தொட்டிகள் மற்றும் செயல்முறை குழாய்கள் மூடுதல்'
      ],
      industries: ['Food Processing', 'Pharmaceutical', 'Chemical', 'Beverage'],
      features: [
        lang === 'en' ? 'High strength construction' : 'அதிக வலிமை கொண்ட வடிவமைப்பு',
        lang === 'en' ? 'Leak-proof clamp seating' : 'கசிவு இல்லாத கிளாம்ப் பொருத்தம்'
      ],
      blueprint: (
        <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100px', color: 'var(--accent)' }}>
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="4" />
          <circle cx="50" cy="50" r="30" fill="currentColor" opacity="0.1" />
          <rect x="42" y="8" width="16" height="6" rx="2" fill="currentColor" />
          <path d="M 46 8 L 46 2 H 54 V 8 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 'prod-9',
      name: lang === 'en' ? 'Industrial Jaw Coupling' : 'ஜா கப்ளிங்',
      category: 'Jaw Couplings',
      desc: lang === 'en' ? 'Power transmission coupling protecting motor axles.' : 'மோட்டார் அச்சுகளைப் பாதுகாக்கும் சக்தி பரிமாற்ற இணைப்பு சாதனங்கள்.',
      image: '',
      specs: {
        dimensionSize: 'Customized',
        material: 'Cast Iron / Sintered Steel / PU spider',
        size: 'As per customer need'
      },
      applications: [
        lang === 'en' ? 'Pump motor power axles' : 'பம்ப் மோட்டார் சக்தி அச்சுகள்',
        lang === 'en' ? 'Assembly conveyor gearings' : 'கன்வேயர் பெல்ட் கியர்கள்'
      ],
      industries: ['Heavy Engineering', 'Industrial Equipment', 'OEM Manufacturing'],
      features: [
        lang === 'en' ? 'Absorbs angular misalignment' : 'கோண சீரற்ற தன்மையைத் தாங்கும் குணம்',
        lang === 'en' ? 'Dampens high shock spikes' : 'மோட்டார் அதிர்வுகளைக் குறைக்கும் திறன்'
      ],
      blueprint: (
        <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100px', color: 'var(--accent)' }}>
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M 50 8 A 42 42 0 0 1 92 50 L 72 50 A 22 22 0 0 0 50 28 Z" fill="currentColor" opacity="0.15" />
          <path d="M 50 92 A 42 42 0 0 1 8 50 L 28 50 A 22 22 0 0 0 50 72 Z" fill="currentColor" opacity="0.15" />
          <circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 'prod-frp-sheets',
      name: lang === 'en' ? 'FRP Sheets' : 'எஃப்ஆர்பி தாள்கள்',
      category: 'Others',
      desc: lang === 'en' ? 'High-strength, durable, and corrosion-resistant fibre-reinforced plastic (FRP) sheets cut to custom sizes for industrial cladding and roofing.' : 'தொழில்துறை கூரை அமைப்புகளுக்கான உயர்தர அரிப்பு எதிர்ப்பு எஃப்ஆர்பி தாள்கள்.',
      image: '',
      specs: {
        dimensionSize: 'Customized',
        material: 'Fibre-reinforced Plastic (FRP)',
        size: 'As per customer need'
      },
      applications: [
        lang === 'en' ? 'Industrial roof cladding' : 'தொழில்துறை கூரை கவசம்',
        lang === 'en' ? 'Chemical plant wall panels' : 'இரசாயன ஆலை சுவர் பேனல்கள்'
      ],
      industries: ['Construction', 'Chemical', 'Infrastructure'],
      features: [
        lang === 'en' ? 'Corrosion resistant' : 'அரிப்பு எதிர்ப்பு தன்மை',
        lang === 'en' ? 'High strength-to-weight ratio' : 'அதிக எடை தாங்கும் விகிதம்',
        lang === 'en' ? 'Weatherproof and durable' : 'வானிலை எதிர்ப்பு மற்றும் நீடித்து உழைக்கும்'
      ],
      blueprint: (
        <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100px', color: 'var(--accent)' }}>
          <path d="M 10 30 Q 25 15 40 30 T 70 30 T 100 30 M 10 50 Q 25 35 40 50 T 70 50 T 100 50 M 10 70 Q 25 55 40 70 T 70 70 T 100 70" fill="none" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      )
    }
  ];

  const categories = ['All', 'Metal Washers', 'SS Components', 'Metal Brackets', 'MS Components', 'MS Sheets', 'Rubber Washers', 'Closing Caps', 'Jaw Couplings', 'Seal Pressure Plate', 'Others'];

  const filteredProducts = products.filter(prod => {
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.desc.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.specs.material.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || prod.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const displayedProducts = selectedCategory === 'All' ? filteredProducts.slice(0, visibleCount) : filteredProducts;


  return (
    <section id="products" className="section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="text-center">
          <p className="section-subtitle">{lang === 'en' ? 'OUR CATALOG' : 'தயாரிப்புகள் அட்டவணை'}</p>
          <h2 className="section-title">
            {lang === 'en' ? 'Precision Component Catalog' : 'உதிரிபாகங்கள் அட்டவணை'}
          </h2>
          <p className="section-desc">
            {lang === 'en'
              ? 'Explore our core line of stamped and formed industrial fasteners. Click on any item for technical specs or related guidelines.'
              : 'எங்கள் முக்கிய தொழில்துறை தயாரிப்புகளை ஆராயுங்கள். கூடுதல் விவரக்குறிப்புகளைக் காண ஏதேனும் தயாரிப்பைத் தேர்ந்தெடுக்கவும்.'}
          </p>
        </div>

        {/* Catalog Layout */}
        <div className="products-wrapper">
          {/* Desktop Sidebar */}
          <aside className="filter-sidebar">
            <div className="search-box">
              <Search className="search-icon" size={16} />
              <input
                type="text"
                placeholder={lang === 'en' ? "Search products..." : "தயாரிப்புகளை தேடுக..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            <h4 className="filter-title">{lang === 'en' ? 'Categories' : 'வகைகள்'}</h4>
            <div className="category-filters">
              {categories.map(cat => {
                const count = cat === 'All' 
                  ? products.length 
                  : products.filter(p => p.category === cat).length;
                
                // Helper to translate category names for Tamil UI
                const displayCategoryName = (name: string) => {
                  if (lang === 'en') return name;
                  const tamilMap: Record<string, string> = {
                    'All': 'அனைத்தும்',
                    'Metal Washers': 'மெட்டல் வாஷர்',
                    'SS Components': 'எஸ்எஸ் உதிரிபாகங்கள்',
                    'Metal Brackets': 'மெட்டல் பிராக்கெட்ஸ்',
                    'MS Components': 'எம்எஸ் உதிரிபாகங்கள்',
                    'MS Sheets': 'எம்எஸ் தாள்கள்',
                    'Rubber Washers': 'ரப்பர் வாஷர்',
                    'Closing Caps': 'குளோசிங் கேப்',
                    'Jaw Couplings': 'ஜா கப்ளிங்',
                    'Seal Pressure Plate': 'சீல் பிரஷர் பிளேட்',
                    'Others': 'மற்றவை'
                  };
                  return tamilMap[name] || name;
                };

                return (
                  <button
                    key={cat}
                    className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <span>{displayCategoryName(cat)}</span>
                    <span className="filter-count">{count}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Mobile-only filter bar: search + category select */}
          <div className="mobile-filter-bar">
            <div className="search-box" style={{ marginBottom: 0, flex: 1 }}>
              <Search className="search-icon" size={16} />
              <input
                type="text"
                placeholder={lang === 'en' ? "Search products..." : "தயாரிப்புகளை தேடுக..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <select
              className="mobile-category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label={lang === 'en' ? 'Filter by category' : 'வகையால் வடிகட்டு'}
            >
              {categories.map(cat => {
                const count = cat === 'All' ? products.length : products.filter(p => p.category === cat).length;
                const tamilMap: Record<string, string> = {
                  'All': 'அனைத்தும்', 'Metal Washers': 'மெட்டல் வாஷர்',
                  'SS Components': 'எஸ்எஸ் உதிரிபாகங்கள்', 'Metal Brackets': 'மெட்டல் பிராக்கெட்ஸ்',
                  'MS Components': 'எம்எஸ் உதிரிபாகங்கள்', 'MS Sheets': 'எம்எஸ் தாள்கள்',
                  'Rubber Washers': 'ரப்பர் வாஷர்', 'Closing Caps': 'குளோசிங் கேப்',
                  'Jaw Couplings': 'ஜா கப்ளிங்', 'Seal Pressure Plate': 'சீல் பிரஷர் பிளேட்', 'Others': 'மற்றவை'
                };
                const label = lang === 'en' ? `${cat} (${count})` : `${tamilMap[cat] || cat} (${count})`;
                return <option key={cat} value={cat}>{label}</option>;
              })}
            </select>
          </div>

          {/* Main Grid */}
          <main>
            {displayedProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-secondary)' }}>
                {lang === 'en' ? 'No products match your filters.' : 'தேடலுக்கு பொருந்தும் தயாரிப்புகள் எதுவும் இல்லை.'}
              </div>
            ) : (
              <>
                <div className="products-grid">
                  {displayedProducts.map((prod) => (
                    <div key={prod.id} className="product-card">
                      {/* Image box with backup SVG / Blueprint if no image */}
                      <div className="product-image-box" style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        height: '200px', 
                        background: 'var(--bg-muted)', 
                        borderRadius: '8px 8px 0 0',
                        overflow: 'hidden'
                      }}>
                        {prod.image ? (
                          <img 
                            src={prod.image} 
                            alt={prod.name} 
                            className="product-img" 
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div style={{ transform: 'scale(1.2)', opacity: 0.8 }}>
                            {prod.blueprint}
                          </div>
                        )}
                      </div>

                      {/* Information */}
                      <div className="product-info">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span className="product-cat-tag">{prod.category}</span>
                          {prod.price && (
                            <span style={{
                              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                              color: '#fff',
                              fontSize: '11px',
                              fontWeight: '700',
                              padding: '3px 9px',
                              borderRadius: '20px',
                              letterSpacing: '0.3px'
                            }}>{prod.price}</span>
                          )}
                        </div>
                        <h3 className="product-name">{prod.name}</h3>
                        <p className="product-desc">{prod.desc}</p>
                        
                        <div className="product-spec-preview">
                          <span className="spec-pill">{prod.specs.material.split('/')[0]}</span>
                        </div>

                        <div className="product-card-footer">
                          <button 
                            onClick={() => setSelectedProduct(prod)} 
                            className="btn btn-secondary" 
                            style={{ flexGrow: 1, padding: '10px', fontSize: '13px' }}
                          >
                            <Eye size={14} />
                            <span>{lang === 'en' ? 'Specifications' : 'விவரக்குறிப்பு'}</span>
                          </button>
                          <button 
                            onClick={() => onRequestQuote(prod.category)} 
                            className="btn btn-primary" 
                            style={{ padding: '10px 14px', fontSize: '13px' }}
                          >
                            {lang === 'en' ? 'Get Quote' : 'கேட்க'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* See More Button */}
                {filteredProducts.length > displayedProducts.length && (
                  <div className="see-more-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                    <button 
                      onClick={() => setVisibleCount(prev => prev + 6)} 
                      className="btn btn-secondary see-more-btn"
                      style={{ gap: '8px', padding: '12px 32px', borderRadius: '100px', fontWeight: '600' }}
                    >
                      <span>{lang === 'en' ? 'See More Products' : 'மேலும் பல தயாரிப்புகள்'}</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '800px' }}>
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="modal-close-btn"
              aria-label="Close details"
            >
              <X size={18} />
            </button>

            <div className="modal-grid">
              {/* Left Column: Product Image or Blueprint */}
              <div className="modal-visual-column">
                {selectedProduct.image ? (
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    style={{
                      width: '100%',
                      maxWidth: '220px',
                      height: '220px',
                      objectFit: 'contain',
                      borderRadius: '12px',
                      background: 'var(--bg-card)',
                      padding: '12px',
                      marginBottom: '16px',
                      display: 'block',
                      margin: '0 auto 16px'
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    maxWidth: '220px',
                    height: '220px',
                    borderRadius: '12px',
                    background: 'var(--bg-card)',
                    padding: '12px',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}>
                    <div style={{ transform: 'scale(1.4)', opacity: 0.8 }}>
                      {selectedProduct.blueprint}
                    </div>
                  </div>
                )}
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'center' }}>
                  {selectedProduct.name}
                </div>
              </div>

              {/* Right Column: Spec Table and Details */}
              <div className="modal-details-column">
                <span className="modal-cat">{selectedProduct.category}</span>
                <h3 className="modal-title">{selectedProduct.name}</h3>
                <p className="modal-desc">{selectedProduct.desc}</p>

                {/* Specs Table */}
                <h4 className="modal-section-title">{lang === 'en' ? 'Technical Specs' : 'தொழில்நுட்ப விவரங்கள்'}</h4>
                <table className="specs-table">
                  <tbody>
                    <tr>
                      <td>{lang === 'en' ? 'Dimension/Size' : 'பரிமாணம்/அளவு'}</td>
                      <td>{selectedProduct.specs.dimensionSize}</td>
                    </tr>
                    <tr>
                      <td>{lang === 'en' ? 'Material' : 'மூலப்பொருள்'}</td>
                      <td>{selectedProduct.specs.material}</td>
                    </tr>
                    <tr>
                      <td>{lang === 'en' ? 'Size' : 'அளவு'}</td>
                      <td>{selectedProduct.specs.size}</td>
                    </tr>
                    {selectedProduct.specs.color && (
                      <tr>
                        <td>{lang === 'en' ? 'Color' : 'நிறம்'}</td>
                        <td>{selectedProduct.specs.color}</td>
                      </tr>
                    )}
                    {selectedProduct.specs.shape && (
                      <tr>
                        <td>{lang === 'en' ? 'Shape' : 'வடிவம்'}</td>
                        <td>{selectedProduct.specs.shape}</td>
                      </tr>
                    )}
                    {selectedProduct.specs.feature && (
                      <tr>
                        <td>{lang === 'en' ? 'Feature' : 'அம்சம்'}</td>
                        <td>{selectedProduct.specs.feature}</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Applications and Features list */}
                <h4 className="modal-section-title">{lang === 'en' ? 'Standard Applications' : 'பயன்பாடுகள்'}</h4>
                <ul className="modal-list">
                  {selectedProduct.applications.map((app, i) => (
                    <li key={i} className="modal-list-item">
                      <div className="modal-list-bullet"><Check size={12} /></div>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="modal-section-title">{lang === 'en' ? 'Features & Parameters' : 'அம்சங்கள்'}</h4>
                <ul className="modal-list">
                  {selectedProduct.features.map((feat, i) => (
                    <li key={i} className="modal-list-item">
                      <div className="modal-list-bullet"><Check size={12} /></div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Modal Footer RFQ button */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                  <button 
                    onClick={() => { setSelectedProduct(null); onRequestQuote(selectedProduct.category); }} 
                    className="btn btn-cta"
                    style={{ width: '100%' }}
                  >
                    <FileText size={16} />
                    <span>{lang === 'en' ? 'Request Quote for this Product' : 'விலைப்புள்ளி கேட்க'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
