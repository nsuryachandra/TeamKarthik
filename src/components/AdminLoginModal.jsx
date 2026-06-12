import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Lock, User, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLoginModal({ isOpen, onClose, onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onSuccess(data.token);
        setUsername("");
        setPassword("");
        onClose();
      } else {
        setError(data.error || "Authentication failed. Try again.");
      }
    } catch (err) {
      setError("Unable to connect to login service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-955/40 backdrop-blur-xs"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-md bg-white border border-slate-200 shadow-2xl rounded-3xl p-8 overflow-hidden z-10"
          >
            {/* Top accent gradient bar */}
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-accent via-rose-500 to-amber-500" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-slate-450 hover:text-slate-800 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            {/* Header */}
            <div className="text-center space-y-2 mb-8">
              <div className="w-12 h-12 bg-accent/5 rounded-2xl flex items-center justify-center text-accent mx-auto border border-accent/10">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="font-display font-extrabold text-2xl text-slate-950 uppercase tracking-tight">
                Admin Gateway
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Enter your administrative key to access the control panel.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3.5 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-xs flex items-center gap-2.5"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span className="font-medium text-left">{error}</span>
                </motion.div>
              )}

              {/* Username Input */}
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-55 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-accent/40 rounded-2xl pl-11 pr-4 py-3 text-sm transition-all focus:outline-none focus:ring-4 focus:ring-accent/5 font-sans"
                    placeholder="Enter username"
                    disabled={loading}
                    autoFocus
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5 text-left">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-55 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-accent/40 rounded-2xl pl-11 pr-4 py-3 text-sm transition-all focus:outline-none focus:ring-4 focus:ring-accent/5 font-sans"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-3.5 bg-accent hover:bg-accent-dark text-white rounded-2xl font-mono font-bold text-xs uppercase tracking-widest cursor-pointer shadow-lg shadow-accent/15 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Authorize Access</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
