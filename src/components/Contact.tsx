import React, { useState } from 'react';
import { MapPin, Phone, Mail, User, Clock, Send } from 'lucide-react';

interface ContactProps {
  lang: 'en' | 'ta';
  onToast: (msg: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ lang, onToast }) => {
  const contactPhone = localStorage.getItem('ep_contact_phone') || '+91 80476 53363';
  const cleanPhone = contactPhone.replace(/\s+/g, '');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    setTimeout(() => {
      // Save query submission to local storage to simulate a database
      const existingInquiries = JSON.parse(localStorage.getItem('ep_inquiries') || '[]');
      const newInquiry = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        timestamp: new Date().toLocaleString(),
        status: 'Unread'
      };
      localStorage.setItem('ep_inquiries', JSON.stringify([newInquiry, ...existingInquiries]));

      // Alert notification for Admin
      alert(`[Admin Alert] New Enquiry Received!\n\nName: ${newInquiry.name}\nEmail: ${newInquiry.email}\nPhone: ${newInquiry.phone || 'N/A'}\nMessage: ${newInquiry.message}`);

      setSubmitting(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
      onToast(lang === 'en' ? 'Enquiry submitted successfully!' : 'விசாரணை வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!');
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const paymentModes = [
    lang === 'en' ? 'Cash' : 'ரொக்கம்', 
    lang === 'en' ? 'Credit Card' : 'கிரெடிட் கார்டு', 
    lang === 'en' ? 'Cheque' : 'காசோலை', 
    lang === 'en' ? 'Demand Draft (DD)' : 'டிமாண்ட் டிராப்ட்', 
    lang === 'en' ? 'Online Transfer (NEFT/UPI)' : 'ஆன்லைன் பரிமாற்றம்'
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="text-center">
          <p className="section-subtitle">{lang === 'en' ? 'GET IN TOUCH' : 'தொடர்பு கொள்ள'}</p>
          <h2 className="section-title">
            {lang === 'en' ? 'Contact Essay Pressings' : 'எங்களை தொடர்பு கொள்ள'}
          </h2>
          <p className="section-desc">
            {lang === 'en'
              ? 'Reach out to discuss custom component designs, tool setup costs, bulk order volumes, or payment pathways.'
              : 'தனிப்பயன் பாகங்கள், அச்சு வடிவமைப்பு செலவுகள், மற்றும் மொத்த கொள்முதல் பற்றி விவாதிக்க எங்களைத் தொடர்பு கொள்ளவும்.'}
          </p>
        </div>

        {/* Layout Grid */}
        <div className="contact-grid">
          {/* Left Column: Business Details */}
          <div className="contact-info-card">
            <h3 className="contact-info-title">{lang === 'en' ? 'Factory Headquarters' : 'தலைமையகம்'}</h3>
            
            <div className="contact-info-list">
              <div className="contact-info-item" style={{ cursor: 'pointer' }}>
                <a
                  href="https://www.google.com/maps/place/Essay+Pressings/data=!4m2!3m1!1s0x0:0xcf64f47ad8496c40?sa=X&ved=1t:2428&ictx=111&cshid=1784001144446871"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'inherit', textDecoration: 'none' }}
                >
                  <MapPin className="contact-info-icon" size={20} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div className="contact-info-label">{lang === 'en' ? 'Address' : 'முகவரி'}</div>
                    <div className="contact-info-value">
                      No. 15, Karpaga Vinayagar Koil Street,<br />
                      Kandanchavadi, Chennai – 600096<br />
                      Tamil Nadu, India
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--accent)', marginTop: '4px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      {lang === 'en' ? 'Get Directions' : 'வழிகாட்டல் பெறுக'}
                    </div>
                  </div>
                </a>
              </div>

              <div className="contact-info-item">
                <User className="contact-info-icon" size={20} />
                <div>
                  <div className="contact-info-label">{lang === 'en' ? 'Proprietor & Contact' : 'உரிமையாளர்'}</div>
                  <div className="contact-info-value">S Basith</div>
                </div>
              </div>

              <div className="contact-info-item" style={{ cursor: 'pointer' }}>
                <a href={`tel:${cleanPhone}`} className="contact-info-link" style={{ display: 'flex', alignItems: 'center', gap: 'inherit', color: 'inherit', textDecoration: 'none' }}>
                  <Phone className="contact-info-icon" size={20} />
                  <div>
                    <div className="contact-info-label">{lang === 'en' ? 'Call Support' : 'தொலைபேசி எண்'}</div>
                    <div className="contact-info-value" style={{ color: 'var(--accent)', fontWeight: '600' }}>
                      {contactPhone}
                    </div>
                  </div>
                </a>
              </div>

              <div className="contact-info-item">
                <Mail className="contact-info-icon" size={20} />
                <div>
                  <div className="contact-info-label">{lang === 'en' ? 'Email Support' : 'மின்னஞ்சல்'}</div>
                  <div className="contact-info-value">
                    <a href="mailto:info@essaypressings.com" className="contact-info-link">info@essaypressings.com</a>
                  </div>
                </div>
              </div>

              <div className="contact-info-item">
                <Clock className="contact-info-icon" size={20} />
                <div>
                  <div className="contact-info-label">{lang === 'en' ? 'Business Hours' : 'வேலை நேரம்'}</div>
                  <div className="contact-info-value">
                    {lang === 'en' ? 'Monday - Saturday: 9:00 AM - 6:00 PM' : 'திங்கள் - சனி: காலை 9:00 - மாலை 6:00'}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Chips */}
            <div className="payment-modes-box">
              <h4 className="payment-title">{lang === 'en' ? 'Accepted Payment Modes' : 'கட்டண முறைகள்'}</h4>
              <div className="payment-chips">
                {paymentModes.map((mode, idx) => (
                  <span key={idx} className="payment-chip">{mode}</span>
                ))}
              </div>
              <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                {lang === 'en' ? 'Shipment logistics: By Road Freight' : 'போக்குவரத்து முறை: சாலை வழியாக'}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Map & Message Form */}
          <div className="contact-visual">
            {/* Google Maps Iframe Placeholder (Chennai Guindy Industrial Area coordinates) */}
            <div className="map-placeholder">
              <iframe 
                title="Essay Pressings Chennai Location"
                src="https://maps.google.com/maps?q=Essay%20Pressings,%20Karpaga%20Vinayagar%20Koil%20Street,%20Kandanchavadi,%20Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                className="map-iframe"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Message Form */}
            <div className="contact-form-card">
              <h4 className="form-title">{lang === 'en' ? 'Send a Quick Message' : 'விசாரணை படிவம்'}</h4>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group-row">
                  <div className="form-group">
                    <label className="form-label">{lang === 'en' ? 'Full Name' : 'முழு பெயர்'}</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{lang === 'en' ? 'Phone Number' : 'தொலைபேசி எண்'}</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-control" 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{lang === 'en' ? 'Email Address' : 'மின்னஞ்சல்'}</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control" 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{lang === 'en' ? 'Your Message' : 'செய்தி'}</label>
                  <textarea 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control" 
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={submitting}
                  className="btn btn-primary" 
                  style={{ width: '100%', marginTop: '8px' }}
                >
                  {submitting ? (
                    <span>{lang === 'en' ? 'Sending...' : 'அனுப்பப்படுகிறது...'}</span>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>{lang === 'en' ? 'Submit Enquiry' : 'விசாரணையை சமர்ப்பிக்கவும்'}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
