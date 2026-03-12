import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API_URL}/api/todos`);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error('Backend not connected yet');
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!input.trim()) return;
    try {
      const res = await fetch(`${API_URL}/api/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: input }),
      });
      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
      setInput('');
    } catch (err) {
      console.error('Error adding todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/api/todos/${id}`, { method: 'DELETE' });
      setTodos(todos.filter(t => t._id !== id));
    } catch (err) {
      console.error('Error deleting todo');
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>📝 Todo App</h1>
        <p className="subtitle">Three-Tier App on Azure Kubernetes Service</p>
        <div className="input-row">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && addTodo()}
            placeholder="Ajoute une tâche..."
          />
          <button onClick={addTodo}>Ajouter</button>
        </div>
        {loading ? (
          <p className="loading">Chargement...</p>
        ) : todos.length === 0 ? (
          <p className="empty">Aucune tâche pour l'instant 🎉</p>
        ) : (
          <ul>
            {todos.map(todo => (
              <li key={todo._id}>
                <span>{todo.title}</span>
                <button className="delete" onClick={() => deleteTodo(todo._id)}>✕</button>
              </li>
            ))}
          </ul>
        )}
        <div className="badge">🚀 Deployed on AKS</div>
      </div>
    </div>
  );
}

export default App;
