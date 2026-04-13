import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = onLogin(email, password);
    if (!result.success) {
      setError(result.error || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#030308] via-[#0a0a12] to-[#0f0f1a]">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00D4FF] rounded-full blur-[128px] opacity-30 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#7B2FFF] rounded-full blur-[128px] opacity-30 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF3B5C] rounded-full blur-[128px] opacity-20" />
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side */}
          <div className="hidden lg:block space-y-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-[#00D4FF] blur-xl opacity-50 animate-pulse" />
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00D4FF] to-[#7B2FFF] flex items-center justify-center">
                  <Activity size={32} className="text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold">
                  <span className="gradient-text">DisasterAI</span>
                </h1>
                <p className="text-gray-500 text-sm">Unified Disaster Response System</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-6xl font-bold leading-tight">
                <span className="gradient-text">AI-Powered</span>
                <br />
                <span className="text-white">Disaster Prediction</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Real-time earthquake, rainfall, and flood predictions powered by advanced machine learning.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Earthquake', value: '94.7%', subtitle: 'Accuracy', color: '#FF3B5C' },
                { title: 'Rainfall', value: 'Real-time', subtitle: 'Updates', color: '#00D4FF' },
                { title: 'Flood', value: 'Early', subtitle: 'Warning', color: '#7B2FFF' },
                { title: 'Alerts', value: 'Instant', subtitle: 'Notifications', color: '#FFB020' },
              ].map((item, i) => (
                <div key={i} className="glass-card rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                    <span className="text-white font-semibold">{item.title}</span>
                  </div>
                  <p className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</p>
                  <p className="text-gray-500 text-xs">{item.subtitle}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-6 pt-4 border-t border-white/10">
              <div><p className="text-2xl font-bold text-white">94.7%</p><p className="text-gray-500 text-xs">Accuracy</p></div>
              <div><p className="text-2xl font-bold text-white">&lt;100ms</p><p className="text-gray-500 text-xs">Response</p></div>
              <div><p className="text-2xl font-bold text-white">24/7</p><p className="text-gray-500 text-xs">Monitoring</p></div>
            </div>
          </div>

          {/* Login Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF]/20 to-[#7B2FFF]/20 rounded-2xl blur-xl" />
              <div className="relative bg-white/5 backdrop-blur-2xl rounded-2xl p-8 border border-white/10">
                <div className="text-center mb-8">
                  <div className="lg:hidden flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#7B2FFF] flex items-center justify-center">
                      <Activity size={28} className="text-white" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
                  <p className="text-gray-400 text-sm mt-2">Sign in to access the system</p>
                </div>

                {error && (
                  <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/20 transition-all"
                        placeholder="admin@disaster.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/20 transition-all"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-[#00D4FF] to-[#7B2FFF] text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50"
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-[#00D4FF] hover:underline">Register here</Link>
                  </p>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-[#00D4FF]" />
                    <p className="text-xs text-gray-400">Demo Credentials</p>
                  </div>
                  <div className="space-y-1 text-xs">
                    <p className="text-gray-500"><span className="text-[#00D4FF]">Admin:</span> admin@disaster.com / admin123</p>
                    <p className="text-gray-500"><span className="text-[#00D4FF]">User:</span> user@example.com / user123</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-xs text-gray-600">© 2024 DisasterAI - Protecting Lives with Technology</p>
      </div>
    </div>
  );
}