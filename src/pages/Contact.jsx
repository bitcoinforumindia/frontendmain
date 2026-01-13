import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../component/Button";
import { dbHelpers } from "../lib/supabase";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [validationNotice, setValidationNotice] = useState("");

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

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Phone number is invalid";
    }

    setErrors(newErrors);

    const hasErrors = Object.keys(newErrors).length > 0;
    if (hasErrors) {
      const fieldLabels = {
        name: "Full Name",
        email: "Email Address",
        subject: "Subject",
        message: "Message",
        phone: "Phone Number",
      };

      const firstErrorKey = Object.keys(newErrors)[0];
      const label = fieldLabels[firstErrorKey] || firstErrorKey;
      setValidationNotice(`Please update the ${label} field.`);

      const el = document.getElementById(firstErrorKey);
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (typeof el.focus === 'function') {
          try { el.focus({ preventScroll: true }); } catch { }
        }
      }
    } else {
      setValidationNotice("");
    }

    return !hasErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }

    if (validationNotice) {
      setValidationNotice("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setValidationNotice("");

    try {
      // Submit to Supabase
      const result = await dbHelpers.submitContactQuery(formData);
      console.log('Contact query submitted:', result);

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        phone: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-[70vh] w-full px-4 sm:px-8 lg:px-20 pt-36 pb-20 text-white bg-black relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-[#FF9900] hover:text-[#FF9900] transition-colors group"
          >
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>

        <div className="text-center mb-16 relative">
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[100px] bg-[#FF9900]/20 blur-[80px] rounded-full pointer-events-none"></div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tighter uppercase relative z-10">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9900] to-[#FF9900]">Us</span>
          </h1>

          <div className="flex items-center justify-center gap-4 text-[#FF9900]/80 mb-4">
            <div className="h-[1px] w-12 bg-[#FF9900]"></div>
            <span className="text-sm font-mono tracking-[0.3em] uppercase">Get In Touch</span>
            <div className="h-[1px] w-12 bg-[#FF9900]"></div>
          </div>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-8">
            Reach us directly or fill the form.
          </p>

          {/* Unified cards: email first, then CTA */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-black border-2 border-[#585858] rounded-xl p-6 flex flex-col min-h-[260px] hover:border-[#FF9900] transition-all duration-500">
              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-[#FF9900] transition-colors">General Inquiries</h2>
              <div className="metric-label mb-4">
                Reach us directly at <a href="mailto:contact@btcindia.media" className="text-[#FF9900] hover:underline">contact@btcindia.media</a>
              </div>
              <p className="metric-label mb-4">Ask us anything about the conference.</p>
              <button onClick={() => window.location.href = '/contact/general'} className="w-full bg-transparent border-2 border-[#FF9900] text-[#FF9900] font-semibold py-2 rounded-md mt-auto shadow-[0_0_10px_rgba(255,153,0,0.3)] hover:bg-[#FF9900]/10 hover:shadow-[0_0_20px_rgba(255,153,0,0.6)] transition-all duration-300">Fill the form</button>
            </div>
            <div className="bg-black border-2 border-[#585858] rounded-xl p-6 flex flex-col min-h-[260px] hover:border-[#FF9900] transition-all duration-500">
              <h3 className="text-xl md:text-2xl font-bold text-[#FF9900] mb-2">Speaker Applications</h3>
              <div className="metric-label mb-4">
                Reach us directly at <a href="mailto:speakers@btcindia.media" className="text-[#FF9900] hover:underline">speakers@btcindia.media</a>
              </div>
              <p className="metric-label mb-4">Apply to speak at the conference and share your expertise.</p>
              <button onClick={() => window.location.href = '/apply/speaker'} className="w-full bg-transparent border-2 border-[#FF9900] text-[#FF9900] font-semibold py-2 rounded-md mt-auto shadow-[0_0_10px_rgba(255,153,0,0.3)] hover:bg-[#FF9900]/10 hover:shadow-[0_0_20px_rgba(255,153,0,0.6)] transition-all duration-300">Apply to Speak</button>
            </div>
            <div className="bg-black border-2 border-[#585858] rounded-xl p-6 flex flex-col min-h-[260px] hover:border-[#FF9900] transition-all duration-500">
              <h3 className="text-xl md:text-2xl font-bold text-[#FF9900] mb-2">Sponsor Inquiries</h3>
              <div className="metric-label mb-4">
                Reach us directly at <a href="mailto:sponsors@btcindia.media" className="text-[#FF9900] hover:underline">sponsors@btcindia.media</a>
              </div>
              <p className="metric-label mb-4">Partner with us and reach the Bitcoin community.</p>
              <button onClick={() => window.location.href = '/apply/sponsor'} className="w-full bg-transparent border-2 border-[#FF9900] text-[#FF9900] font-semibold py-2 rounded-lg mt-auto shadow-[0_0_10px_rgba(255,153,0,0.3)] hover:bg-[#FF9900]/10 hover:shadow-[0_0_20px_rgba(255,153,0,0.6)] transition-all duration-300">Become a Sponsor</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;






