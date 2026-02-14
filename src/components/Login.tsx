import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Lock, User } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      onLogin(username);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card w-full max-w-md p-8 shadow-2xl"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            className="inline-flex p-4 bg-primary/20 rounded-full mb-4"
          >
            <Droplets className="w-12 h-12 text-primary" />
          </motion.div>
          <h1 className="text-4xl font-black mb-2 tracking-tighter">
            Sip<span className="text-primary">Buddy</span>
          </h1>
          <p className="text-text-muted font-medium tracking-wide">Your Smart Hydration Sidekick</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted flex items-center gap-2">
              <User size={16} /> Username
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted flex items-center gap-2">
              <Lock size={16} /> Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
          >
            Start Your Shift
          </motion.button>
        </form>

        <p className="text-center mt-6 text-sm text-text-muted">
          Your hydration is our priority.
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
