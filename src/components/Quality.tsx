import React from 'react';
import { ShieldCheck, ClipboardCheck, Ruler, CheckSquare } from 'lucide-react';

interface QualityProps {
  lang: 'en' | 'ta';
}

export const Quality: React.FC<QualityProps> = ({ lang }) => {
  const steps = [
    {
      icon: <ClipboardCheck size={26} />,
      title: lang === 'en' ? 'Material Verification' : 'பொருள் சரிபார்ப்பு',
      desc: lang === 'en' 
        ? 'Verifying thickness and composition of raw coils prior to production.' 
        : 'உற்பத்திக்கு முன் மூல எஃகு சுருள்களின் தடிமன் மற்றும் தரத்தை சரிபார்த்தல்.'
    },
    {
      icon: <Ruler size={26} />,
      title: lang === 'en' ? 'Dimensional Audit' : 'அளவியல் தணிக்கை',
      desc: lang === 'en' 
        ? 'Verifying inner/outer diameters and thickness against drawing tolerances.' 
        : 'வரைபட அளவுகளுக்கு ஏற்ப உள்/வெளி விட்டம் மற்றும் தடிமன் ஆகியவற்றை சரிபார்த்தல்.'
    },
    {
      icon: <ShieldCheck size={26} />,
      title: lang === 'en' ? 'In-Process Monitoring' : 'செயல்முறை கண்காணிப்பு',
      desc: lang === 'en' 
        ? 'Periodic checks of stamping presses and tool surfaces during runs.' 
        : 'உற்பத்தியின் போது பிரஸ் கருவிகள் மற்றும் அச்சு மேற்பரப்புகளை சரிபார்த்தல்.'
    },
    {
      icon: <CheckSquare size={26} />,
      title: lang === 'en' ? 'Final Clearance' : 'இறுதி அனுமதி',
      desc: lang === 'en' 
        ? 'Statistical batch testing using micro-gauges prior to shipping.' 
        : 'சரக்குகளை அனுப்புவதற்கு முன் நுண் அளவீடுகள் மூலம் இறுதி தரம் சோதனை.'
    }
  ];

  return (
    <section id="quality" className="section-padding" style={{ backgroundColor: 'var(--card-bg)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center">
          <p className="section-subtitle">{lang === 'en' ? 'COMPLIANCE' : 'தரக் கட்டுப்பாடு'}</p>
          <h2 className="section-title">
            {lang === 'en' ? 'Quality Assurance Workflow' : 'தரக் கட்டுப்பாட்டு செயல்முறை'}
          </h2>
          <p className="section-desc">
            {lang === 'en'
              ? 'Our quality monitoring checkpoints ensure every custom metal washer and bracket matches your engineering specifications.'
              : 'எங்கள் தர கண்காணிப்பு சோதனைச் சாவடிகள் ஒவ்வொரு மெட்டல் வாஷர் மற்றும் பிராக்கெட்டும் உங்கள் பொறியியல் விவரக்குறிப்புகளுடன் பொருந்துவதை உறுதி செய்கின்றன.'}
          </p>
        </div>

        {/* Quality Steps Layout */}
        <div className="quality-box" style={{ backgroundColor: 'var(--bg)' }}>
          <div className="quality-grid">
            {steps.map((step, idx) => (
              <div key={idx} className="quality-item">
                <div className="quality-item-header">
                  <div className="quality-icon">{step.icon}</div>
                  <span className="quality-num">
                    0{idx + 1}
                  </span>
                </div>
                
                <div className="quality-details">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* QA Note */}
          <div style={{ marginTop: '32px', textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
            <span className="payment-chip" style={{ background: 'var(--card-bg)', fontSize: '13px', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontWeight: '500' }}>
              {lang === 'en' 
                ? 'Note: All manufacturing runs adhere to strict internal quality guidelines calibrated to commercial precision tolerances.' 
                : 'குறிப்பு: அனைத்து உற்பத்தி பணிகளும் வணிக துல்லியமான சகிப்புத்தன்மைக்கு அளவீடு செய்யப்பட்ட கடுமையான உள் தர வழிகாட்டுதல்களைப் பின்பற்றுகின்றன.'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
