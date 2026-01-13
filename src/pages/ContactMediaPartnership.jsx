import React, { useState } from "react";
import Button from "../component/Button";
import { Link } from "react-router-dom";
import { dbHelpers } from "../lib/supabase";

const ContactMediaPartnership = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    website: "",
    partnershipType: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.organization.trim()) {
      newErrors.organization = "Organization is required";
    }

    if (!formData.partnershipType.trim()) {
      newErrors.partnershipType = "Partnership type is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus('validation');
      return;
    }

    setLoading(true);
    setStatus(null);
    setErrors({});

    try {
      await dbHelpers.submitMediaPartnership(formData);
      setStatus('ok');
      setFormData({ name: "", email: "", organization: "", website: "", partnershipType: "", phone: "", message: "" });
    } catch (e1) {
      console.error(e1);
      setStatus('err');
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  return (
    <section className="min-h-[70vh] w-full flex items-start justify-center px-4 sm:px-8 lg:px-20 pt-36 pb-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[100px] bg-[#FF9900]/20 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="max-w-2xl w-full bg-black border-2 border-[#585858] rounded-2xl p-6 sm:p-8 text-white hover:border-[#FF9900] transition-all duration-500 relative z-10">
        <div className="mb-8 p-4 relative z-10">
          <Link to="/contact" className="inline-flex items-center text-[#FF9900] hover:text-[#FF9900] transition-colors mb-6 group">
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tighter uppercase">
              Media & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9900] to-[#FF9900]">Partnerships</span>
            </h1>

            <div className="flex items-center justify-center gap-4 text-[#FF9900]/80 mb-4">
              <div className="h-[1px] w-8 bg-[#FF9900]"></div>
              <span className="text-xs font-mono tracking-[0.3em] uppercase">Collaborate</span>
              <div className="h-[1px] w-8 bg-[#FF9900]"></div>
            </div>

            <p className="text-gray-400 text-base md:text-lg font-light">
              Be part of the official event coverage and collaborations.
            </p>
          </div>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <input
              className={`w-full px-4 py-3 bg-[#2a2a2a] border rounded-lg ${errors.name ? 'border-red-500' : 'border-[#585858]'}`}
              placeholder="Full Name *"
              name="name"
              value={formData.name}
              onChange={onChange}
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
              className={`w-full px-4 py-3 bg-[#2a2a2a] border rounded-lg ${errors.email ? 'border-red-500' : 'border-[#585858]'}`}
              placeholder="Email *"
              name="email"
              type="email"
              value={formData.email}
              onChange={onChange}
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              className={`w-full px-4 py-3 bg-[#2a2a2a] border rounded-lg ${errors.organization ? 'border-red-500' : 'border-[#585858]'}`}
              placeholder="Organization *"
              name="organization"
              value={formData.organization}
              onChange={onChange}
            />
            {errors.organization && <p className="text-red-400 text-sm mt-1">{errors.organization}</p>}
          </div>

          <div>
            <input
              className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#585858] rounded-lg"
              placeholder="Website"
              name="website"
              value={formData.website}
              onChange={onChange}
            />
          </div>

          <div>
            <input
              className={`w-full px-4 py-3 bg-[#2a2a2a] border rounded-lg ${errors.partnershipType ? 'border-red-500' : 'border-[#585858]'}`}
              placeholder="Partnership Type (Media, Community, Brand, etc.) *"
              name="partnershipType"
              value={formData.partnershipType}
              onChange={onChange}
            />
            {errors.partnershipType && <p className="text-red-400 text-sm mt-1">{errors.partnershipType}</p>}
          </div>

          <div>
            <input
              className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#585858] rounded-lg"
              placeholder="Phone (optional)"
              name="phone"
              value={formData.phone}
              onChange={onChange}
            />
          </div>

          <div>
            <textarea
              className={`w-full px-4 py-3 bg-[#2a2a2a] border rounded-lg ${errors.message ? 'border-red-500' : 'border-[#585858]'}`}
              placeholder="Message *"
              rows={6}
              name="message"
              value={formData.message}
              onChange={onChange}
            />
            {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
          </div>

          <Button type="submit" label={loading ? 'Submitting...' : 'Submit'} className="w-full py-3 text-lg !bg-none !bg-transparent !border-2 !border-[#FF9900] !text-[#FF9900] shadow-[0_0_10px_rgba(255,153,0,0.3)] hover:!bg-[#FF9900]/10 hover:!shadow-[0_0_20px_rgba(255,153,0,0.6)] transition-all duration-300" disabled={loading} />

          {status === 'validation' && <p className="text-yellow-400">⚠️ Please fill in all required fields.</p>}
          {status === 'ok' && <p className="text-green-400">✅ Thank you for contacting us. We will reach out to you as soon as possible.</p>}
          {status === 'err' && <p className="text-red-400">❌ Submission failed. Try again.</p>}
        </form>
      </div>
    </section>
  );
};

export default ContactMediaPartnership;






