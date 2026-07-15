import React, { useState, useEffect } from 'react';
import { X, Upload, Send, FileText } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';


interface QuoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
  lang: 'en' | 'ta';
  defaultCategory?: string;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({ isOpen, onClose, onToast, lang, defaultCategory }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    category: 'Metal Washers',
    quantity: '',
    material: 'Stainless Steel 304',
    specifications: '',
    message: ''
  });

  useEffect(() => {
    if (isOpen && defaultCategory) {
      setFormData(prev => ({ ...prev, category: defaultCategory }));
    }
  }, [isOpen, defaultCategory]);
  
  const [fileName, setFileName] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.quantity) return;

    setSubmitting(true);
    
    const newQuote = {
      id: 'RFQ-' + Math.floor(100000 + Math.random() * 900000).toString(),
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      category: formData.category,
      quantity: formData.quantity,
      material: formData.material,
      specifications: formData.specifications,
      message: formData.message,
      fileName: fileName || 'None attached',
      timestamp: new Date().toLocaleString(),
      status: 'Pending'
    };

    if (supabase) {
      try {
        const { error } = await supabase
          .from('ep_quotes')
          .insert({
            id: newQuote.id,
            name: newQuote.name,
            company: newQuote.company,
            email: newQuote.email,
            phone: newQuote.phone,
            category: newQuote.category,
            quantity: newQuote.quantity,
            material: newQuote.material,
            specifications: newQuote.specifications,
            message: newQuote.message,
            file_name: newQuote.fileName,
            timestamp: newQuote.timestamp,
            status: newQuote.status
          });

        if (error) {
          console.error('Error inserting quote to Supabase:', error);
          onToast('Database error: Failed to save quote request.');
          setSubmitting(false);
          return;
        }
      } catch (err) {
        console.error('Failed to submit quote request to database:', err);
        onToast('Failed to save quote request to backend database.');
        setSubmitting(false);
        return;
      }
    }

    // Save quotation request submission to local storage to simulate a database
    const existingQuotes = JSON.parse(localStorage.getItem('ep_quotes') || '[]');
    localStorage.setItem('ep_quotes', JSON.stringify([newQuote, ...existingQuotes]));

    // Alert notification for Admin
    if (!supabase) {
      alert(`[Admin Alert] New RFQ/Quote Request Received!\n\nID: ${newQuote.id}\nName: ${newQuote.name}\nCompany: ${newQuote.company || 'N/A'}\nCategory: ${newQuote.category}\nQuantity: ${newQuote.quantity} units\nMaterial: ${newQuote.material}`);
    }

    setSubmitting(false);
    setFileName('');
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      category: 'Metal Washers',
      quantity: '',
      material: 'Stainless Steel 304',
      specifications: '',
      message: ''
    });
    onToast(lang === 'en' ? 'Quote Request submitted successfully!' : 'விலைப்புள்ளி கோரிக்கை சமர்ப்பிக்கப்பட்டது!');
    onClose();
  };

  const categories = [
    'Metal Washers',
    'Stainless Steel Components',
    'Metal Brackets',
    'MS Components',
    'MS Sheets',
    'Rubber Washers',
    'Closing Caps',
    'Jaw Couplings',
    'Seal Pressure Plate',
    'Others',
    'Custom Press Parts'
  ];

  const materials = [
    'Stainless Steel 304',
    'Stainless Steel 316',
    'Stainless Steel 202',
    'Mild Steel (MS)',
    'Brass / Copper',
    'Aluminum',
    'Nitrile Rubber',
    'Silicone Rubber',
    'EPDM Rubber'
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '650px' }}>
        {/* Header */}
        <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700' }}>
            {lang === 'en' ? 'Request Quotation (RFQ)' : 'விலைப்புள்ளி கோரிக்கை'}
          </h3>
          <button onClick={onClose} className="modal-close-btn" style={{ top: '16px', right: '16px' }} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '32px' }}>
          {/* Customer Core details */}
          <div className="form-group-row">
            <div className="form-group">
              <label className="form-label">{lang === 'en' ? 'Full Name' : 'முழு பெயர்'} *</label>
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
              <label className="form-label">{lang === 'en' ? 'Company Name' : 'நிறுவனத்தின் பெயர்'}</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label className="form-label">{lang === 'en' ? 'Email Address' : 'மின்னஞ்சல்'} *</label>
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

          {/* Component specifics */}
          <div className="form-group-row">
            <div className="form-group">
              <label className="form-label">{lang === 'en' ? 'Product Category' : 'தயாரிப்பு வகை'}</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-control"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">{lang === 'en' ? 'Order Quantity (Units)' : 'ஆர்டர் அளவு (அலகுகள்)'} *</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="form-control"
                required
                min="100"
                placeholder="Min: 100"
              />
            </div>
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label className="form-label">{lang === 'en' ? 'Material Grade' : 'மூலப்பொருள் வகை'}</label>
              <select
                name="material"
                value={formData.material}
                onChange={handleChange}
                className="form-control"
              >
                {materials.map(mat => (
                  <option key={mat} value={mat}>{mat}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">{lang === 'en' ? 'Dimensions / Specs' : 'அளவுகள் / விவரக்குறிப்புகள்'}</label>
              <input
                type="text"
                name="specifications"
                value={formData.specifications}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. ID: 10mm, OD: 24mm, Thk: 2mm"
              />
            </div>
          </div>

          {/* Message */}
          <div className="form-group">
            <label className="form-label">{lang === 'en' ? 'Custom Requirements' : 'கூடுதல் தேவைகள்'}</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="form-control"
              placeholder={lang === 'en' ? 'Describe secondary machining, finishing, or packaging constraints...' : 'கூடுதல் விவரங்களை இங்கே குறிப்பிடவும்...'}
            />
          </div>

          {/* File Upload zone */}
          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label">{lang === 'en' ? 'Upload Technical Drawing (PDF/DWG/IMG)' : 'வரைபடங்களை பதிவேற்றவும்'}</label>
            <label className="file-upload-box">
              <input
                type="file"
                accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <Upload size={20} className="file-upload-icon" style={{ margin: '0 auto 8px' }} />
              <div className="file-upload-text">
                {lang === 'en' 
                  ? 'Drag & Drop or Click to browse drawing files' 
                  : 'கோப்புகளைத் தேர்ந்தெடுக்க இங்கே கிளிக் செய்யவும்'}
              </div>
              {fileName && (
                <div className="file-upload-filename" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <FileText size={14} />
                  <span>{fileName}</span>
                </div>
              )}
            </label>
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              {lang === 'en' ? 'Cancel' : 'ரத்துசெய்'}
            </button>
            <button type="submit" disabled={submitting} className="btn btn-cta">
              {submitting ? (
                <span>{lang === 'en' ? 'Submitting...' : 'சமர்ப்பிக்கப்படுகிறது...'}</span>
              ) : (
                <>
                  <Send size={16} />
                  <span>{lang === 'en' ? 'Submit RFQ' : 'அனுப்பவும்'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
