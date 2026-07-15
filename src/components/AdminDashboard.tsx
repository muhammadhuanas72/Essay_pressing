import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, LogIn, LayoutDashboard, FileSpreadsheet, MessageSquare, 
  Settings, CheckCircle2, Trash2, LogOut, Save
} from 'lucide-react';
import { supabase } from '../utils/supabaseClient';


interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
  lang: 'en' | 'ta';
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose, onToast, lang }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Change credentials form fields state
  const [isChangingCredentials, setIsChangingCredentials] = useState(false);
  const [currentUsernameInput, setCurrentUsernameInput] = useState('');
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newUsernameInput, setNewUsernameInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  
  // Local storage loaded lists
  const [quotes, setQuotes] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [adminCreds, setAdminCreds] = useState({ user: 'admin', pass: 'password123' });

  // Landing Page editable values
  const [heroTitle, setHeroTitle] = useState(
    localStorage.getItem('ep_hero_title') || 'Precision Engineered. Reliably Manufactured.'
  );
  const [contactPhone, setContactPhone] = useState(
    localStorage.getItem('ep_contact_phone') || '+91 80476 53363'
  );
  const [contactEmail, setContactEmail] = useState(
    localStorage.getItem('ep_contact_email') || 'info@essaypressings.com'
  );

  useEffect(() => {
    if (isAuthenticated) {
      loadLocalStorageData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Load credentials from database if available
  useEffect(() => {
    const fetchDbCredentials = async () => {
      if (!supabase || !isOpen) return;
      try {
        const { data, error } = await supabase
          .from('admin_settings')
          .select('value')
          .eq('key', 'admin_credentials')
          .maybeSingle();

        if (error) {
          console.error('Error fetching admin credentials:', error);
          return;
        }

        if (data && data.value) {
          setAdminCreds({ user: data.value.user, pass: data.value.pass });
        } else if (!data) {
          // Initialize/seed settings table with default credentials
          await supabase
            .from('admin_settings')
            .insert({ key: 'admin_credentials', value: { user: 'admin', pass: 'password123' } });
        }
      } catch (err) {
        console.error('Failed to load database credentials:', err);
      }
    };
    fetchDbCredentials();
  }, [isOpen]);

  const loadLocalStorageData = () => {
    const localQuotes = JSON.parse(localStorage.getItem('ep_quotes') || '[]');
    const localInquiries = JSON.parse(localStorage.getItem('ep_inquiries') || '[]');
    setQuotes(localQuotes);
    setInquiries(localInquiries);
  };

  const getStoredCredentials = () => {
    if (supabase) {
      return adminCreds;
    }
    const storedUser = localStorage.getItem('ep_admin_user') || 'admin';
    const storedPass = localStorage.getItem('ep_admin_pass') || 'password123';
    return { user: storedUser, pass: storedPass };
  };

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const creds = getStoredCredentials();
    if (username === creds.user && password === creds.pass) {
      setIsAuthenticated(true);
      onToast('Successfully authenticated admin session.');
    } else {
      onToast('Invalid credentials. Access Denied.');
    }
  };

  const handleChangeCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const creds = getStoredCredentials();
    if (currentUsernameInput === creds.user && currentPasswordInput === creds.pass) {
      if (!newUsernameInput || !newPasswordInput) {
        onToast('New username and password cannot be empty.');
        return;
      }
      
      if (supabase) {
        try {
          const { error } = await supabase
            .from('admin_settings')
            .upsert({ key: 'admin_credentials', value: { user: newUsernameInput, pass: newPasswordInput } });

          if (error) {
            onToast('Database error: Failed to update credentials.');
            console.error(error);
            return;
          }
          setAdminCreds({ user: newUsernameInput, pass: newPasswordInput });
        } catch (err) {
          onToast('Failed to update credentials in backend database.');
          console.error(err);
          return;
        }
      } else {
        localStorage.setItem('ep_admin_user', newUsernameInput);
        localStorage.setItem('ep_admin_pass', newPasswordInput);
      }
      
      onToast('Admin credentials updated successfully!');
      
      setCurrentUsernameInput('');
      setCurrentPasswordInput('');
      setNewUsernameInput('');
      setNewPasswordInput('');
      setIsChangingCredentials(false);
      
      setUsername(newUsernameInput);
      setPassword(newPasswordInput);
    } else {
      onToast('Current credentials do not match.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setActiveTab('dashboard');
  };

  const handleUpdateStatusQuote = (id: string) => {
    const updated = quotes.map(q => q.id === id ? { ...q, status: 'Completed' } : q);
    localStorage.setItem('ep_quotes', JSON.stringify(updated));
    setQuotes(updated);
    onToast('Status updated to Completed.');
  };

  const handleDeleteQuote = (id: string) => {
    const filtered = quotes.filter(q => q.id !== id);
    localStorage.setItem('ep_quotes', JSON.stringify(filtered));
    setQuotes(filtered);
    onToast('Quote Request deleted.');
  };

  const handleMarkInquiryRead = (id: string) => {
    const updated = inquiries.map(i => i.id === id ? { ...i, status: 'Read' } : i);
    localStorage.setItem('ep_inquiries', JSON.stringify(updated));
    setInquiries(updated);
    onToast('Inquiry marked as read.');
  };

  const handleDeleteInquiry = (id: string) => {
    const filtered = inquiries.filter(i => i.id !== id);
    localStorage.setItem('ep_inquiries', JSON.stringify(filtered));
    setInquiries(filtered);
    onToast('Inquiry deleted.');
  };

  const handleSavePageSettings = () => {
    localStorage.setItem('ep_hero_title', heroTitle);
    localStorage.setItem('ep_contact_phone', contactPhone);
    localStorage.setItem('ep_contact_email', contactEmail);
    onToast('Homepage settings saved! Reload the page to view changes.');
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose} 
      style={{ 
        zIndex: '999', 
        cursor: 'pointer',
        padding: '16px',
        overflow: 'hidden'
      }}
    >
      {!isAuthenticated ? (
        <div 
          onClick={(e) => e.stopPropagation()} 
          style={{ 
            width: '100%', 
            maxWidth: '400px', 
            cursor: 'default',
            margin: 'auto'
          }}
        >
          {isChangingCredentials ? (
            <form onSubmit={handleChangeCredentialsSubmit} className="admin-login-card" style={{ padding: '24px', borderRadius: '16px', overflow: 'hidden' }}>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <ShieldAlert size={36} className="text-accent" style={{ marginBottom: '8px' }} />
                <h4 style={{ fontSize: '16px', fontWeight: '700' }}>Change Admin Credentials</h4>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Verify current details to set a new key</p>
              </div>

              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label className="form-label" style={{ fontSize: '12px' }}>Current Username</label>
                <input 
                  type="text" 
                  value={currentUsernameInput} 
                  onChange={(e) => setCurrentUsernameInput(e.target.value)} 
                  className="form-control" 
                  placeholder="Enter current username"
                  style={{ padding: '8px 12px', fontSize: '13px' }}
                  required 
                />
              </div>

              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label className="form-label" style={{ fontSize: '12px' }}>Current Password</label>
                <input 
                  type="password" 
                  value={currentPasswordInput} 
                  onChange={(e) => setCurrentPasswordInput(e.target.value)} 
                  className="form-control" 
                  placeholder="Enter current password"
                  style={{ padding: '8px 12px', fontSize: '13px' }}
                  required 
                />
              </div>

              <div style={{ borderTop: '1px dashed var(--border-color)', margin: '14px 0' }}></div>

              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label className="form-label" style={{ fontSize: '12px' }}>New Username</label>
                <input 
                  type="text" 
                  value={newUsernameInput} 
                  onChange={(e) => setNewUsernameInput(e.target.value)} 
                  className="form-control" 
                  placeholder="Enter new username"
                  style={{ padding: '8px 12px', fontSize: '13px' }}
                  required 
                />
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label" style={{ fontSize: '12px' }}>New Password</label>
                <input 
                  type="password" 
                  value={newPasswordInput} 
                  onChange={(e) => setNewPasswordInput(e.target.value)} 
                  className="form-control" 
                  placeholder="Enter new password"
                  style={{ padding: '8px 12px', fontSize: '13px' }}
                  required 
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => {
                    setIsChangingCredentials(false);
                    setCurrentUsernameInput('');
                    setCurrentPasswordInput('');
                    setNewUsernameInput('');
                    setNewPasswordInput('');
                  }} 
                  className="btn btn-secondary" 
                  style={{ flex: 1, padding: '8px', fontSize: '13px' }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1.5, padding: '8px', fontSize: '13px' }}>
                  <Save size={14} />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="admin-login-card" style={{ padding: '24px', borderRadius: '16px', overflow: 'hidden' }}>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <ShieldAlert size={36} className="text-accent" style={{ marginBottom: '8px' }} />
                <h4 style={{ fontSize: '16px', fontWeight: '700' }}>Secure Admin Access</h4>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Provide login credentials to access RFQs</p>
              </div>

              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label className="form-label" style={{ fontSize: '12px' }}>Username</label>
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  className="form-control" 
                  placeholder="Enter Username"
                  style={{ padding: '8px 12px', fontSize: '13px' }}
                  required 
                />
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label" style={{ fontSize: '12px' }}>Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="form-control" 
                  placeholder="Enter Password"
                  style={{ padding: '8px 12px', fontSize: '13px' }}
                  required 
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px', fontSize: '13px' }}>
                <LogIn size={14} />
                <span>Log In</span>
              </button>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '14px', alignItems: 'center' }}>
                <button 
                  type="button" 
                  onClick={() => setIsChangingCredentials(true)} 
                  style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: '11.5px', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Change Admin Username / Password
                </button>

              </div>
            </form>
          )}
        </div>
      ) : (
        <div 
          className="modal-content" 
          onClick={(e) => e.stopPropagation()} 
          style={{ 
            maxWidth: '1000px', 
            height: '90vh', 
            display: 'flex', 
            flexDirection: 'column', 
            cursor: 'default',
            margin: 'auto'
          }}
        >
          {/* Header bar */}
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--primary)', color: '#FFFFFF' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', color: '#FFFFFF' }}>
              <ShieldAlert size={18} />
              <span>{lang === 'en' ? 'Essay Pressings - Admin Portal' : 'எஸே பிரஸ்ஸிங்ஸ் - நிர்வாகி பக்கம்'}</span>
            </h3>
          </div>

          <div className="admin-container" style={{ paddingTop: '0', flexGrow: 1, height: 'calc(100% - 60px)' }}>
            {/* Sidebar */}
            <aside className="admin-sidebar">
              <button 
                onClick={() => setActiveTab('dashboard')} 
                className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              >
                <LayoutDashboard size={16} />
                <span>{lang === 'en' ? 'Dashboard' : 'டாஷ்போர்டு'}</span>
              </button>
              <button 
                onClick={() => setActiveTab('rfqs')} 
                className={`admin-nav-item ${activeTab === 'rfqs' ? 'active' : ''}`}
              >
                <FileSpreadsheet size={16} />
                <span>{lang === 'en' ? 'Quote Requests' : 'விண்ணப்பங்கள்'}</span>
                {quotes.filter(q => q.status === 'Pending').length > 0 && (
                  <span className="badge badge-error">{quotes.filter(q => q.status === 'Pending').length}</span>
                )}
              </button>
              <button 
                onClick={() => setActiveTab('inquiries')} 
                className={`admin-nav-item ${activeTab === 'inquiries' ? 'active' : ''}`}
              >
                <MessageSquare size={16} />
                <span>{lang === 'en' ? 'Inquiries' : 'விசாரணைகள்'}</span>
                {inquiries.filter(i => i.status === 'Unread').length > 0 && (
                  <span className="badge badge-error">{inquiries.filter(i => i.status === 'Unread').length}</span>
                )}
              </button>
              <button 
                onClick={() => setActiveTab('settings')} 
                className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              >
                <Settings size={16} />
                <span>{lang === 'en' ? 'Settings' : 'அமைப்புகள்'}</span>
              </button>
              
              <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                <button onClick={handleLogout} className="admin-nav-item" style={{ color: 'var(--cta)', width: '100%' }}>
                  <LogOut size={16} />
                  <span>{lang === 'en' ? 'Log Out' : 'வெளியேறு'}</span>
                </button>
              </div>
            </aside>

            {/* Main view area */}
            <main className="admin-main">
              {activeTab === 'dashboard' && (
                <div>
                  <div className="admin-header">
                    <div className="admin-title-box">
                      <h2>Admin Metrics</h2>
                      <p>Active submissions stored in local database files</p>
                    </div>
                  </div>

                  {/* Metrics Cards */}
                  <div className="admin-metrics">
                    <div className="metric-card">
                      <div className="metric-icon-box"><FileSpreadsheet size={20} /></div>
                      <div className="metric-details">
                        <span className="metric-val">{quotes.length}</span>
                        <span className="metric-lbl">Total RFQs</span>
                      </div>
                    </div>

                    <div className="metric-card">
                      <div className="metric-icon-box"><MessageSquare size={20} /></div>
                      <div className="metric-details">
                        <span className="metric-val">{inquiries.length}</span>
                        <span className="metric-lbl">Total Enquiries</span>
                      </div>
                    </div>

                    <div className="metric-card">
                      <div className="metric-icon-box"><Settings size={20} /></div>
                      <div className="metric-details">
                        <span className="metric-val">9</span>
                        <span className="metric-lbl">Active Products</span>
                      </div>
                    </div>

                    <div className="metric-card">
                      <div className="metric-icon-box"><CheckCircle2 size={20} /></div>
                      <div className="metric-details">
                        <span className="metric-val">100%</span>
                        <span className="metric-lbl">System Status</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary lists */}
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Recent Quotation Requests</h3>
                  {quotes.length === 0 ? (
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', padding: '20px 0' }}>No RFQs received yet.</p>
                  ) : (
                    <div style={{ overflowX: 'auto' }}>
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>RFQ ID</th>
                            <th>Customer</th>
                            <th>Category</th>
                            <th>Qty</th>
                            <th>Date</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {quotes.slice(0, 3).map(q => (
                            <tr key={q.id}>
                              <td>{q.id}</td>
                              <td>{q.name} ({q.company || 'N/A'})</td>
                              <td>{q.category}</td>
                              <td>{q.quantity}</td>
                              <td>{q.timestamp.split(',')[0]}</td>
                              <td>
                                <span className={`status-badge ${q.status === 'Completed' ? 'status-completed' : 'status-pending'}`}>
                                  {q.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Quote Requests */}
              {activeTab === 'rfqs' && (
                <div>
                  <div className="admin-header">
                    <div className="admin-title-box">
                      <h2>RFQ Submissions</h2>
                      <p>View client drawings and pricing details</p>
                    </div>
                  </div>

                  {quotes.length === 0 ? (
                    <p style={{ textAlign: 'center', padding: '48px', color: 'var(--text-secondary)' }}>No RFQs received yet.</p>
                  ) : (
                    <div style={{ overflowX: 'auto' }}>
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Contact Info</th>
                            <th>Category / Material</th>
                            <th>Qty / Specs</th>
                            <th>Drawing</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {quotes.map(q => (
                            <tr key={q.id}>
                              <td>
                                <strong>{q.id}</strong><br />
                                <span style={{ fontSize: '11px' }}>{q.timestamp}</span>
                              </td>
                              <td>
                                <strong>{q.name}</strong><br />
                                {q.company && <span style={{ fontSize: '11px' }}>{q.company}<br /></span>}
                                <span style={{ fontSize: '11px' }}>{q.email} | {q.phone || 'N/A'}</span>
                              </td>
                              <td>
                                <strong>{q.category}</strong><br />
                                <span style={{ fontSize: '11px' }}>{q.material}</span>
                              </td>
                              <td>
                                <strong>{q.quantity} pcs</strong><br />
                                <span style={{ fontSize: '11px' }}>{q.specifications || 'N/A'}</span>
                              </td>
                              <td style={{ color: 'var(--accent)', fontWeight: '500' }}>
                                {q.fileName}
                              </td>
                              <td>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                  {q.status === 'Pending' && (
                                    <button 
                                      onClick={() => handleUpdateStatusQuote(q.id)} 
                                      className="icon-btn" 
                                      style={{ color: 'var(--success)', width: '30px', height: '30px' }}
                                      title="Mark Completed"
                                    >
                                      <CheckCircle2 size={14} />
                                    </button>
                                  )}
                                  <button 
                                    onClick={() => handleDeleteQuote(q.id)} 
                                    className="icon-btn" 
                                    style={{ color: 'var(--cta)', width: '30px', height: '30px' }}
                                    title="Delete"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Enquiries */}
              {activeTab === 'inquiries' && (
                <div>
                  <div className="admin-header">
                    <div className="admin-title-box">
                      <h2>Contact Inquiries</h2>
                      <p>View general inquiries from B2B buyers</p>
                    </div>
                  </div>

                  {inquiries.length === 0 ? (
                    <p style={{ textAlign: 'center', padding: '48px', color: 'var(--text-secondary)' }}>No enquiries received yet.</p>
                  ) : (
                    <div style={{ overflowX: 'auto' }}>
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Sender</th>
                            <th>Contact Details</th>
                            <th>Message</th>
                            <th>Received At</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inquiries.map(i => (
                            <tr key={i.id}>
                              <td>
                                <strong>{i.name}</strong><br />
                                <span className={`status-badge ${i.status === 'Read' ? 'status-completed' : 'status-pending'}`}>
                                  {i.status}
                                </span>
                              </td>
                              <td>{i.email} <br /> {i.phone || 'N/A'}</td>
                              <td style={{ maxWidth: '300px', whiteSpace: 'normal', color: 'var(--text-primary)' }}>
                                {i.message}
                              </td>
                              <td>{i.timestamp}</td>
                              <td>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                  {i.status === 'Unread' && (
                                    <button 
                                      onClick={() => handleMarkInquiryRead(i.id)} 
                                      className="icon-btn" 
                                      style={{ color: 'var(--success)', width: '30px', height: '30px' }}
                                      title="Mark Read"
                                    >
                                      <CheckCircle2 size={14} />
                                    </button>
                                  )}
                                  <button 
                                    onClick={() => handleDeleteInquiry(i.id)} 
                                    className="icon-btn" 
                                    style={{ color: 'var(--cta)', width: '30px', height: '30px' }}
                                    title="Delete"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 4: Homepage Editor */}
              {activeTab === 'settings' && (
                <div>
                  <div className="admin-header">
                    <div className="admin-title-box">
                      <h2>Website Content Editor</h2>
                      <p>Modify key text parameters without editing source code files</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
                    <div className="form-group">
                      <label className="form-label">Hero Title Headline</label>
                      <input 
                        type="text" 
                        value={heroTitle} 
                        onChange={(e) => setHeroTitle(e.target.value)} 
                        className="form-control" 
                      />
                    </div>

                    <div className="form-group-row">
                      <div className="form-group">
                        <label className="form-label">Contact Phone Number</label>
                        <input 
                          type="text" 
                          value={contactPhone} 
                          onChange={(e) => setContactPhone(e.target.value)} 
                          className="form-control" 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Contact Email Address</label>
                        <input 
                          type="email" 
                          value={contactEmail} 
                          onChange={(e) => setContactEmail(e.target.value)} 
                          className="form-control" 
                        />
                      </div>
                    </div>

                    <button 
                      onClick={handleSavePageSettings} 
                      className="btn btn-primary" 
                      style={{ marginTop: '12px', width: 'fit-content' }}
                    >
                      <Save size={16} />
                      <span>Save Config Settings</span>
                    </button>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      )}
    </div>
  );
};
