import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

const JobDescription = () => {
  const { jdAnalyses, fetchJDAnalyses, uploadJD, loading, error, successMessage } = useApp();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchJDAnalyses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      alert('Please fill all fields');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    await uploadJD(formData);
    setFile(null);
    setTitle('');
  };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '32px' }}>Job Description Analysis</h1>

        <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '24px' }}>Upload Job Description</h2>
          {error && <div style={{ padding: '12px', backgroundColor: '#fee', color: '#c33', borderRadius: '4px', marginBottom: '16px' }}>{error}</div>}
          {successMessage && <div style={{ padding: '12px', backgroundColor: '#efe', color: '#3c3', borderRadius: '4px', marginBottom: '16px' }}>{successMessage}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>Job Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }} placeholder="e.g., Senior React Developer" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>Upload PDF/Document</label>
              <div style={{ position: 'relative', border: '2px dashed #ddd', borderRadius: '4px', padding: '32px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} accept=".pdf,.doc,.docx,.txt" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, opacity: 0, cursor: 'pointer' }} />
                <span style={{ color: '#666', fontSize: '14px', display: 'block' }}>{file ? file.name : 'Choose file or drag and drop'}</span>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{ padding: '12px 24px', backgroundColor: '#667eea', color: '#fff', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '16px', fontWeight: '600', marginTop: '16px', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Analyzing...' : 'Analyze Job Description'}
            </button>
          </form>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '24px' }}>Your Job Descriptions</h2>
          {jdAnalyses.length === 0 ? (
            <p style={{ color: '#999', fontSize: '14px', textAlign: 'center', padding: '40px' }}>No job descriptions uploaded yet</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {jdAnalyses.map((jd) => (
                <div key={jd._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', margin: 0, marginBottom: '12px' }}>{jd.title}</h3>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#666', marginBottom: '12px' }}>
                    <span>📅 {new Date(jd.createdAt).toLocaleDateString()}</span>
                    {jd.deadline && <span>⏰ Deadline: {new Date(jd.deadline).toLocaleDateString()}</span>}
                  </div>
                  {jd.parsedData && (
                    <div style={{ fontSize: '13px', color: '#666' }}>
                      <p><strong>Required Skills:</strong></p>
                      <ul style={{ marginLeft: '20px', fontSize: '13px' }}>
                        {(jd.parsedData.skills || []).slice(0, 5).map((skill, i) => (
                          <li key={i}>{skill}</li>
                        ))}
                      </ul>
                      {jd.parsedData.experience && <p><strong>Experience:</strong> {jd.parsedData.experience}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default JobDescription;