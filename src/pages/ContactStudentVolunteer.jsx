import React, { useState } from "react";
import Button from "../component/Button";
import { Link } from "react-router-dom";
import { dbHelpers } from "../lib/supabase";

const ContactStudentVolunteer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    university: "",
    city: "",
    roleInterest: "",
    availability: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'ok' | 'err' | 'validation'
  const [statusMessage, setStatusMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setStatusMessage("");

    // Basic client-side validation to prevent empty submissions
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidPhone = /^\+?[0-9\s\-()]{7,15}$/;
    const requiredFields = [
      ["name", "Full Name is required"],
      ["email", "Valid Email is required"],
      ["phone", "Valid Phone is required"],
      ["university", "University / Organization is required"],
      ["city", "City is required"],
      ["roleInterest", "Interested Role is required"],
      ["availability", "Availability is required"],
      ["message", "Message is required"],
    ];

    for (const [key, msg] of requiredFields) {
      if (!String(formData[key]).trim()) {
        setStatus("validation");
        setStatusMessage(msg);
        setLoading(false);
        return;
      }
    }
    if (!isValidEmail.test(formData.email)) {
      setStatus("validation");
      setStatusMessage("Please enter a valid email address");
      setLoading(false);
      return;
    }
    if (!isValidPhone.test(formData.phone)) {
      setStatus("validation");
      setStatusMessage("Please enter a valid phone number");
      setLoading(false);
      return;
    }
    try {
      await dbHelpers.submitStudentVolunteer(formData);
      setStatus('ok');
      setFormData({ name: "", email: "", phone: "", university: "", city: "", roleInterest: "", availability: "", message: "" });
    } catch (e1) {
      console.error(e1);
      setStatus('err');
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section className="min-h-[70vh] w-full flex items-start justify-center px-4 sm:px-8 lg:px-20 pt-36 pb-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[100px] bg-[#FF9900]/20 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="bg-black border-2 border-[#585858] rounded-2xl p-6 sm:p-8 hover:border-[#FF9900] transition-all duration-500 relative z-10">
        <div className="mb-8 p-4 relative z-10">
          <button className="w-full bg-[#FF9900] text-black font-semibold px-6 py-3 rounded-lg hover:bg-[#CC7A00] transition-colors mb-6 group">
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tighter uppercase">
              Student / <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9900] to-[#FF9900]">Volunteer</span>
            </h1>

            <div className="flex items-center justify-center gap-4 text-[#FF9900]/80 mb-4">
              <div className="h-[1px] w-12 bg-[#FF9900]"></div>
              <span className="text-sm font-mono tracking-[0.3em] uppercase">Join The Team</span>
              <div className="h-[1px] w-12 bg-[#FF9900]"></div>
            </div>
          </div>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-300">Full Name <span className="text-[#FF9900]" aria-hidden>*</span></label>
            <input required aria-required="true" className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#585858] rounded-lg" placeholder="Full Name" name="name" value={formData.name} onChange={onChange} />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-300">Email <span className="text-[#FF9900]" aria-hidden>*</span></label>
            <input required aria-required="true" className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#585858] rounded-lg" placeholder="Email" name="email" type="email" value={formData.email} onChange={onChange} />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-300">Phone <span className="text-[#FF9900]" aria-hidden>*</span></label>
            <input required aria-required="true" className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#585858] rounded-lg" placeholder="Phone" name="phone" value={formData.phone} onChange={onChange} inputMode="tel" />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-300">University / Organization <span className="text-[#FF9900]" aria-hidden>*</span></label>
            <input required aria-required="true" className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#585858] rounded-lg" placeholder="University / Organization" name="university" value={formData.university} onChange={onChange} />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-300">City <span className="text-[#FF9900]" aria-hidden>*</span></label>
            <input required aria-required="true" className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#585858] rounded-lg" placeholder="City" name="city" value={formData.city} onChange={onChange} />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-300">Interested Role <span className="text-[#FF9900]" aria-hidden>*</span></label>
            <input required aria-required="true" className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#585858] rounded-lg" placeholder="Interested Role (e.g., Registration, Stage, Ops)" name="roleInterest" value={formData.roleInterest} onChange={onChange} />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-300">Availability (dates/hours) <span className="text-[#FF9900]" aria-hidden>*</span></label>
            <input required aria-required="true" className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#585858] rounded-lg" placeholder="Availability (dates/hours)" name="availability" value={formData.availability} onChange={onChange} />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-300">Message <span className="text-[#FF9900]" aria-hidden>*</span></label>
            <textarea required aria-required="true" className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#585858] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-transparent" rows={6} name="message" value={formData.message} onChange={onChange} />
          </div>
          <Button type="submit" label={loading ? 'Submitting...' : 'Submit'} className="w-full py-3 text-lg !bg-none !bg-transparent !border-2 !border-[#FF9900] !text-[#FF9900] shadow-[0_0_10px_rgba(255,153,0,0.3)] hover:!bg-[#FF9900]/10 hover:!shadow-[0_0_20px_rgba(255,153,0,0.6)] transition-all duration-300" disabled={loading} />
          {status === 'validation' && <p className="text-yellow-400">{statusMessage}</p>}
          {status === 'ok' && <p className="text-green-400">✅ Thank you for contacting us. We will reach out to you as soon as possible.</p>}
          {status === 'err' && <p className="text-red-400">Submission failed. Try again.</p>}
        </form>
      </div>
    </section>
  );
};

export default ContactStudentVolunteer;






