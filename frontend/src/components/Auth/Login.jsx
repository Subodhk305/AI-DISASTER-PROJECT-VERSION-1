import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import { Activity, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass rounded-2xl p-8 border border-[#00D4FF]/30"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[rgba(0,212,255,0.1)] flex items-center justify-center mx-auto mb-4 border border-[#00D4FF]/30">
            <Activity size={32} className="text-[#00D4FF]" />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 text-sm mt-2">Sign in to access disaster prediction system</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[rgba(14,20,36,0.8)] border border-[#1A2540] rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF] transition-colors"
                placeholder="admin@disaster.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[rgba(14,20,36,0.8)] border border-[#1A2540] rounded-lg pl-10 pr-12 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF] transition-colors"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-[#1A2540] bg-[#0E1424] text-[#00D4FF]" />
              <span className="text-xs text-gray-500">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-xs text-[#00D4FF] hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#00D4FF] text-gray-900 rounded-lg font-medium hover:bg-[#00D4FF]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#00D4FF] hover:underline">
              Register here
            </Link>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-3 rounded-lg bg-[rgba(0,212,255,0.05)] border border-[#00D4FF]/20">
          <p className="text-xs text-gray-500 text-center">Demo Credentials:</p>
          <p className="text-xs text-gray-400 text-center mt-1">
            admin@disaster.com / admin123<br/>
            user@example.com / user123
          </p>
        </div>
      </motion.div>
    </div>
  );
}