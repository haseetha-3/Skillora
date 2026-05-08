import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

const Profile = () => {
  const { profile, fetchProfile, updateProfile, loading, error, successMessage, setError } = useApp();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', location: '', skills: [], education: [], projects: [], resume: '' });
  const [skillInput, setSkillInput] = useState('');
  const [showSkillInput, setShowSkillInput] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        location: profile.location || '',
        skills: profile.skills || [],
        education: profile.education || [],
        projects: profile.projects || [],
        resume: profile.resume || '',
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
      setSkillInput('');
      setShowSkillInput(false);
    }
  };

  const handleRemoveSkill = (index) => {
    setFormData({ ...formData, skills: formData.skills.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    await updateProfile(formData);
  };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '32px' }}>Your Profile</h1>
        {error && <div style={{ padding: '12px', backgroundColor: '#fee', color: '#c33', borderRadius: '4px', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}
        {successMessage && <div style={{ padding: '12px', backgroundColor: '#efe', color: '#3c3', borderRadius: '4px', marginBottom: '16px', fontSize: '14px' }}>{successMessage}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>Personal Information</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              {[{ name: 'name', label: 'Full Name', placeholder: 'John Doe' }, { name: 'phone', label: 'Phone', placeholder: '+91 98765 43210' }, { name: 'location', label: 'Location', placeholder: 'Bangalore, India' }].map((field) => (
                <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>{field.label}</label>
                  <input type="text" name={field.name} value={formData[field.name]} onChange={handleChange} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', fontFamily: 'inherit' }} placeholder={field.placeholder} />
                </div>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>Email</label>
                <input type="email" name="email" value={formData.email} disabled style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', fontFamily: 'inherit', backgroundColor: '#f5f5f5' }} />
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              {formData.skills.map((skill, index) => (
                <div key={index} style={{ backgroundColor: '#667eea', color: '#fff', padding: '8px 12px', borderRadius: '20px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {skill}
                  <button type="button" onClick={() => handleRemoveSkill(index)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}>×</button>
                </div>
              ))}
            </div>
            {!showSkillInput ? (
              <button type="button" onClick={() => setShowSkillInput(true)} style={{ padding: '8px 16px', backgroundColor: '#f0f0f0', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>+ Add Skill</button>
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder="e.g., JavaScript, React, Node.js" style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', fontFamily: 'inherit', flex: 1 }} onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); } }} />
                <button type="button" onClick={handleAddSkill} style={{ padding: '8px 16px', backgroundColor: '#667eea', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>Add</button>
              </div>
            )}
          </div>

          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>Resume</h2>
            <textarea name="resume" value={formData.resume} onChange={handleChange} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', fontFamily: 'monospace', resize: 'vertical', width: '100%', minHeight: '200px' }} placeholder="Paste your resume text here..." rows="10" />
          </div>

          <button type="submit" disabled={loading} style={{ padding: '12px 24px', backgroundColor: '#667eea', color: '#fff', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '16px', fontWeight: '600', marginTop: '16px', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </>
  );
};

export default Profile;