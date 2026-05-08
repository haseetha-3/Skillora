import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

const Roadmap = () => {
  const { roadmaps, fetchRoadmaps, updateMilestone, loading } = useApp();
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  useEffect(() => {
    if (roadmaps.length > 0 && !selectedRoadmap) {
      setSelectedRoadmap(roadmaps[0]);
    }
  }, [roadmaps]);

  const handleMilestoneToggle = async (milestoneId, currentStatus) => {
    if (selectedRoadmap) {
      await updateMilestone(selectedRoadmap._id, milestoneId, !currentStatus);
      await fetchRoadmaps();
    }
  };

  const currentRoadmap = selectedRoadmap;
  const completionPercentage = currentRoadmap
    ? Math.round((currentRoadmap.milestones.filter((m) => m.completed).length / currentRoadmap.milestones.length) * 100)
    : 0;

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '32px' }}>Your Learning Roadmap</h1>

        {roadmaps.length === 0 ? (
          <div style={{ backgroundColor: '#fff', padding: '60px 20px', borderRadius: '8px', textAlign: 'center', color: '#999' }}>
            <p>No roadmaps available. Upload a job description to create one!</p>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', gap: '0', marginBottom: '32px', borderBottom: '1px solid #eee' }}>
              {roadmaps.map((roadmap) => (
                <button
                  key={roadmap._id}
                  onClick={() => setSelectedRoadmap(roadmap)}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderBottom: selectedRoadmap?._id === roadmap._id ? '3px solid #667eea' : '3px solid transparent',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: selectedRoadmap?._id === roadmap._id ? '#667eea' : '#999',
                    transition: 'all 0.2s',
                  }}
                >
                  {roadmap.title}
                </button>
              ))}
            </div>

            {currentRoadmap && (
              <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <div style={{ marginBottom: '32px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#333', margin: 0, marginBottom: '16px' }}>{currentRoadmap.title}</h2>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ flex: 1, height: '8px', backgroundColor: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', backgroundColor: '#4caf50', transition: 'width 0.3s', width: `${completionPercentage}%` }}></div>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#333', minWidth: '80px', textAlign: 'right' }}>{completionPercentage}% Complete</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                  {currentRoadmap.milestones.map((milestone) => (
                    <div key={milestone._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', opacity: milestone.completed ? 0.7 : 1, transition: 'all 0.2s' }}>
                      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                        <input
                          type="checkbox"
                          checked={milestone.completed}
                          onChange={() => handleMilestoneToggle(milestone._id, milestone.completed)}
                          style={{ width: '20px', height: '20px', cursor: 'pointer', marginTop: '2px' }}
                        />
                        <div>
                          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', margin: 0, textDecoration: milestone.completed ? 'line-through' : 'none' }}>{milestone.title}</h3>
                          <p style={{ fontSize: '13px', color: '#999', margin: '4px 0 0 0' }}>{milestone.date}</p>
                        </div>
                      </div>

                      {milestone.skills && milestone.skills.length > 0 && (
                        <div style={{ marginBottom: '12px' }}>
                          <p style={{ fontSize: '12px', fontWeight: '600', color: '#666', margin: 0, marginBottom: '8px' }}>Skills to Learn:</p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {milestone.skills.map((skill, i) => (
                              <span key={i} style={{ backgroundColor: '#e8f4fd', color: '#0066cc', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>{skill}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {milestone.resources && milestone.resources.length > 0 && (
                        <div style={{ marginBottom: '12px' }}>
                          <p style={{ fontSize: '12px', fontWeight: '600', color: '#666', margin: 0, marginBottom: '8px' }}>Resources:</p>
                          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', color: '#666' }}>
                            {milestone.resources.map((resource, i) => (
                              <li key={i} style={{ margin: '4px 0' }}>{resource}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {milestone.completed && (
                        <div style={{ marginTop: '12px', padding: '8px', backgroundColor: '#efe', color: '#3c3', borderRadius: '4px', fontSize: '12px', fontWeight: '600', textAlign: 'center' }}>✓ Completed</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Roadmap;