// frontend/src/components/auth/Register.tsx
import React, { useState } from 'react';
import api from '../../services/api';

const Register: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/register', { name, email, password });
      localStorage.setItem('token', res.data.token);
      alert('✅ Account created successfully! Welcome to Limitless.');
      onSuccess();
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      setError(message);
      alert(`❌ ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900">
      <div className="bg-dark-800 p-8 rounded-2xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-8 text-emerald-400">Create Account</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-dark-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-dark-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-dark-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 py-3 rounded-lg font-semibold text-lg disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Already have an account? <span className="text-emerald-400 cursor-pointer hover:underline" onClick={() => window.location.href = '/login'}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;