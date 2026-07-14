import React from 'react';
import { 
  Award, Target, CircleDollarSign, Factory, Users, 
  Clock, ShieldCheck, HeartHandshake, CreditCard, Smile 
} from 'lucide-react';

interface WhyChooseUsProps {
  lang: 'en' | 'ta';
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ lang }) => {
  const cards = [
    {
      icon: <Award size={20} />,
      title: lang === 'en' ? '15+ Years Experience' : '15+ வருட அனுபவம்',
      desc: lang === 'en' ? 'Deep industry expertise in pressing, stamping, and manufacturing sheet metal parts since 2005.' : '2005 முதல் தாள் உலோக பாகங்கள் தயாரிப்பதில் ஆழமான தொழில்துறை நிபுணத்துவம்.'
    },
    {
      icon: <Target size={20} />,
      title: lang === 'en' ? 'Precision Engineering' : 'துல்லியமான பொறியியல்',
      desc: lang === 'en' ? 'Accurate dimensional tolerances matching client drawings and technical specifications.' : 'வாடிக்கையாளர் வரைபடங்கள் மற்றும் தொழில்நுட்ப விவரக்குறிப்புகளுக்கு ஏற்ற துல்லியமான அளவுகள்.'
    },
    {
      icon: <CircleDollarSign size={20} />,
      title: lang === 'en' ? 'Competitive Pricing' : 'சரியான விலை நிர்ணயம்',
      desc: lang === 'en' ? 'Cost-effective component stamping and forming solutions tailored for bulk B2B purchase orders.' : 'தொகுதியான B2B ஆர்டர்களுக்காக வடிவமைக்கப்பட்ட செலவு குறைந்த தயாரிப்புகள்.'
    },
    {
      icon: <Factory size={20} />,
      title: lang === 'en' ? 'Modern Infrastructure' : 'நவீன உள்கட்டமைப்பு',
      desc: lang === 'en' ? 'Equipped machine shop, tool room, and stamping presses configured for high-volume manufacturing runs.' : 'உயர் தொகுதி உற்பத்திக்காக வடிவமைக்கப்பட்ட இயந்திர கடை மற்றும் பிரஸ் வசதிகள்.'
    },
    {
      icon: <Users size={20} />,
      title: lang === 'en' ? 'Skilled Workforce' : 'திறமையான தொழிலாளர்கள்',
      desc: lang === 'en' ? 'Highly trained technicians and press operators monitoring process consistency at every step.' : 'ஒவ்வொரு அடியிலும் செயல்முறை நிலைத்தன்மையை கண்காணிக்கும் பயிற்சி பெற்ற தொழில்நுட்ப வல்லுநர்கள்.'
    },
    {
      icon: <Clock size={20} />,
      title: lang === 'en' ? 'Timely Delivery' : 'சரியான நேரத்தில் விநியோகம்',
      desc: lang === 'en' ? 'Efficient production scheduling ensuring your supply chain runs seamlessly without assembly pauses.' : 'உங்கள் விநியோகச் சங்கிலி தடையின்றி இயங்குவதை உறுதி செய்யும் திறமையான உற்பத்தி.'
    },
    {
      icon: <ShieldCheck size={20} />,
      title: lang === 'en' ? 'Quality Assured' : 'தர உத்தரவாதம்',
      desc: lang === 'en' ? 'Strict dimensional and materials verification from raw steel sheet coils to packaged boxes.' : 'மூலப்பொருள் முதல் பேக்கேஜிங் வரை கண்டிப்பான தரம் மற்றும் அளவுகள் சரிபார்ப்பு.'
    },
    {
      icon: <HeartHandshake size={20} />,
      title: lang === 'en' ? 'Transparent Practices' : 'வெளிப்படையான நடைமுறைகள்',
      desc: lang === 'en' ? 'Honest business terms, precise quotes, and reliable order updates from design sign-off to shipment.' : 'வடிவமைப்பு ஒப்புதல் முதல் ஏற்றுமதி வரை நேர்மையான வணிக விதிமுறைகள் மற்றும் நம்பகமான தகவல்கள்.'
    },
    {
      icon: <CreditCard size={20} />,
      title: lang === 'en' ? 'Easy Payment Methods' : 'எளிதான கட்டண முறைகள்',
      desc: lang === 'en' ? 'Supports multiple payment pathways including cash, credit cards, cheques, DD, and online transfers.' : 'ரொக்கம், செக், டிடி மற்றும் ஆன்லைன் இடமாற்றங்கள் உட்பட பல கட்டண முறைகளை ஆதரிக்கிறது.'
    },
    {
      icon: <Smile size={20} />,
      title: lang === 'en' ? 'Customer Satisfaction' : 'வாடிக்கையாளர் திருப்தி',
      desc: lang === 'en' ? 'Dedicated support helping resolve questions on custom dimensions or delivery schedules.' : 'வாடிக்கையாளர்களின் தேவைகளை பூர்த்தி செய்வதில் சிறந்த சேவை ஆதரவு.'
    }
  ];

  return (
    <section id="why-choose-us" className="section-padding" style={{ backgroundColor: 'var(--card-bg)' }}>
      <div className="container">
        {/* Section Title */}
        <div className="text-center">
          <p className="section-subtitle">{lang === 'en' ? 'OUR EDGE' : 'எங்கள் தனிச்சிறப்பு'}</p>
          <h2 className="section-title">
            {lang === 'en' ? 'Why Choose Essay Pressings' : 'ஏன் எஸே பிரஸ்ஸிங்ஸை தேர்வு செய்ய வேண்டும்?'}
          </h2>
          <p className="section-desc">
            {lang === 'en' 
              ? 'Combining traditional craftsmanship with modern manufacturing technology to deliver world-class metal components.' 
              : 'உலகத்தரம் வாய்ந்த உலோக பாகங்களை வழங்க பாரம்பரிய கைவினைத்திறனை நவீன உற்பத்தி தொழில்நுட்பத்துடன் இணைக்கிறோம்.'}
          </p>
        </div>

        {/* Grid of cards */}
        <div className="grid-3" style={{ display: 'grid', gap: '24px' }}>
          {cards.map((card, idx) => (
            <div key={idx} className="wcu-card">
              <div className="wcu-icon-box">
                {card.icon}
              </div>
              <h3 className="wcu-card-title">{card.title}</h3>
              <p className="wcu-card-desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
