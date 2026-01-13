import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Button from "../component/Button";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [phase, setPhase] = useState("request"); // 'request' | 'verify'
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0); // seconds until resend allowed

  // Add noindex meta for admin pages
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => { try { document.head.removeChild(meta); } catch { } };
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  const handleRequest = async (e) => {
    e.preventDefault();
    setStatus(null);
    setMessage("");

    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your work email address.");
      return;
    }

    // DB allowlist check via RPC (boolean)
    try {
      const { data: allowed, error: rpcErr } = await supabase.rpc('is_allowed_admin', {
        email_input: email.trim().toLowerCase()
      });
      if (rpcErr) throw rpcErr;
      if (!allowed) {
        setStatus("error");
        setMessage("This email is not authorized. Contact the site administrator.");
        return;
      }
    } catch (err) {
      console.error('Allowlist check failed', err);
      setStatus('error');
      setMessage('Unable to verify authorization. Please try again later.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { shouldCreateUser: false }
      });
      if (error) throw error;
      setPhase("verify");
      setStatus("success");
      setMessage("OTP sent to your email. Enter the 6-digit code.");
      setCooldown(60);
    } catch (err) {
      console.error("OTP request error", err);
      setStatus("error");
      setMessage("Could not send OTP. Verify the email and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setStatus(null);
    setMessage("");

    const token = otp.trim();
    if (!token || token.length < 6) {
      setStatus("error");
      setMessage("Enter the 6-digit OTP from your email.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token,
        type: 'email'
      });
      if (error) throw error;
      // Signed in; go to /admin
      window.location.assign('/admin');
    } catch (err) {
      console.error("OTP verify error", err);
      setStatus("error");
      setMessage("Invalid or expired OTP. Request a new code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[70vh] w-full flex items-center justify-center px-4 sm:px-8 lg:px-20 py-20">
      <div className="max-w-md w-full bg-[#1F1F1F] border border-[#2a2a2a] rounded-2xl p-6 sm:p-8 text-white">
        <h1 className="text-3xl font-familjen mb-6 text-center">Admin Login</h1>

        {status === "success" && (
          <div className="mb-4 p-4 bg-green-900/20 border border-green-500/50 rounded-lg">
            <p className="text-green-400 font-inter-semiBold">{message}</p>
          </div>
        )}

        {status === "error" && (
          <div className="mb-4 p-4 bg-yellow-900/20 border border-yellow-500/50 rounded-lg">
            <p className="text-yellow-400 font-inter-semiBold">{message}</p>
          </div>
        )}

        {phase === 'request' && (
          <form onSubmit={handleRequest} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-inter-semiBold text-white mb-2">Work Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#585858] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-transparent"
                placeholder="you@company.com"
              />
            </div>
            <Button
              type="submit"
              label={loading ? "Sending..." : "Send OTP"}
              className="w-full py-3 text-lg font-semibold"
              disabled={loading}
            />
          </form>
        )}

        {phase === 'verify' && (
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-inter-semiBold text-white mb-2">Enter OTP</label>
              <input
                id="otp"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#585858] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-transparent"
                placeholder="6-digit code"
              />
            </div>
            <div className="flex gap-3 items-center">
              <Button
                type="submit"
                label={loading ? "Verifying..." : "Verify & Sign In"}
                className="w-full py-3 text-lg font-semibold"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => { setPhase('request'); setOtp(''); setStatus(null); setMessage(''); }}
                className="px-4 rounded-lg border border-[#585858] text-[#FFFFFFCC] hover:bg-[#2a2a2a]"
              >
                Change email
              </button>
              <button
                type="button"
                disabled={cooldown > 0 || loading}
                onClick={handleRequest}
                className={`px-4 py-2 rounded-lg border ${cooldown > 0 ? 'border-[#3a3a3a] text-[#777]' : 'border-[#585858] text-[#FFFFFFCC] hover:bg-[#2a2a2a]'}`}
              >
                {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default AdminLogin;






