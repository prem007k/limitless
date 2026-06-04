// frontend/src/App.tsx
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './components/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowRegister(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setShowRegister(false);
  };

  if (loading) {
    return <div className="min-h-screen bg-dark-900 flex items-center justify-center text-white">Loading Limitless...</div>;
  }

  if (!isAuthenticated) {
    return (
      <Provider store={store}>
        {showRegister ? (
          <Register onSuccess={handleAuthSuccess} />
        ) : (
          <Login onSuccess={handleAuthSuccess} onSwitchToRegister={() => setShowRegister(true)} />
        )}
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <div className="h-screen bg-dark-900 text-white overflow-hidden">
        <Dashboard onLogout={handleLogout} />
      </div>
    </Provider>
  );
}

export default App;