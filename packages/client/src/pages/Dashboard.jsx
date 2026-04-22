import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { token, user, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      return;
    }

    axios
      .get('http://localhost:3001/api/projects', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setProjects(response.data || []);
      })
      .catch((requestError) => {
        setError(requestError.response?.data?.message || 'Failed to fetch projects');
      });
  }, [token]);

  if (!token) {
    return <Redirect to="/login" />;
  }

  return (
    <div style={{ padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Dashboard</h1>
          <p>Current Role: {user?.role || 'unknown'}</p>
        </div>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </header>

      {error ? <p style={{ color: 'crimson' }}>{error}</p> : null}

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 16,
        }}
      >
        {projects.map((project) => (
          <article key={project.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16 }}>
            <h3>{project.name}</h3>
            <p>Status: {project.status}</p>
            <p>Task Count: {project.tasks?.length || 0}</p>
            <Link to={`/projects/${project.id}/tasks`}>View Tasks</Link>
          </article>
        ))}
      </section>
    </div>
  );
}
