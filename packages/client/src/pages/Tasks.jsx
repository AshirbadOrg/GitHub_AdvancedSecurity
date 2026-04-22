import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useParams, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const columns = [
  { key: 'todo', title: 'Todo' },
  { key: 'in_progress', title: 'In Progress' },
  { key: 'done', title: 'Done' },
];

function formatDate(value) {
  if (!value) {
    return 'No due date';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'No due date';
  }
  return date.toLocaleDateString();
}

export default function Tasks() {
  const { id: projectId } = useParams();
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      return;
    }

    axios
      .get(`http://localhost:3001/api/tasks?projectId=${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setTasks(response.data || []);
      })
      .catch((requestError) => {
        setError(requestError.response?.data?.message || 'Failed to fetch tasks');
      });
  }, [projectId, token]);

  const grouped = useMemo(() => {
    return columns.reduce((accumulator, column) => {
      accumulator[column.key] = tasks.filter((task) => task.status === column.key);
      return accumulator;
    }, {});
  }, [tasks]);

  if (!token) {
    return <Redirect to="/login" />;
  }

  return (
    <div style={{ padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1>Project Tasks</h1>
      {error ? <p style={{ color: 'crimson' }}>{error}</p> : null}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(200px, 1fr))', gap: 16 }}>
        {columns.map((column) => (
          <div key={column.key} style={{ background: '#f5f5f5', borderRadius: 8, padding: 12 }}>
            <h3>{column.title}</h3>
            {(grouped[column.key] || []).map((task) => (
              <article key={task.id} style={{ background: '#fff', borderRadius: 6, padding: 10, marginBottom: 10 }}>
                <h4 style={{ margin: 0 }}>{task.title}</h4>
                <p style={{ margin: '6px 0' }}>
                  Priority:{' '}
                  <strong>
                    {task.priority}
                  </strong>
                </p>
                <p style={{ margin: '6px 0' }}>Assignee: {task.assignee?.name || 'Unassigned'}</p>
                <p style={{ margin: '6px 0' }}>Due: {formatDate(task.dueDate)}</p>
              </article>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}
