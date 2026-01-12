import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../component/Button";
import { dbHelpers } from "../lib/supabase";

const ApplySponsor = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    linkedin: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [validationNotice, setValidationNotice] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.contactName.trim()) {
      newErrors.contactName = "Contact person name is required";
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Email is invalid";
    }

    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = "Phone number is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Additional information is required";
    }

    setErrors(newErrors);

    const hasErrors = Object.keys(newErrors).length > 0;
    if (hasErrors) {
      const fieldLabels = {
        companyName: "Company Name",
        contactName: "Contact Person Name",
        contactEmail: "Email",
        contactPhone: "Phone Number",
        message: "Additional Information",
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
      // Normalize URLs to accept values without protocol
      const normalizeUrl = (value) => {
        if (!value) return "";
        const trimmed = value.trim();
        if (/^https?:\/\//i.test(trimmed)) return trimmed;
        return `https://${trimmed}`;
      };

      const payload = {
        companyName: formData.companyName,
        website: normalizeUrl(formData.website),
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        linkedin: normalizeUrl(formData.linkedin),
        message: formData.message
      };

      // Submit to Supabase
      const result = await dbHelpers.submitSponsorshipInquiry(payload);
      console.log('Sponsorship inquiry submitted:', result);

      setSubmitStatus("success");
      setFormData({
        companyName: "",
        website: "",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        linkedin: "",
        message: ""
      });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen w-full px-4 sm:px-8 lg:px-20 pt-36 pb-20 bg-black relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-[#ff6501] hover:text-[#ff6501] transition-colors group"
          >
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>

        <div className="text-center mb-16 relative">
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[100px] bg-[#ff6501]/20 blur-[80px] rounded-full pointer-events-none"></div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tighter uppercase relative z-10">
            Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6501] to-[#ff6501]">Sponsor</span>
          </h1>

          <div className="flex items-center justify-center gap-4 text-[#ff6501]/80 mb-4">
            <div className="h-[1px] w-12 bg-[#ff6501]"></div>
            <span className="text-sm font-mono tracking-[0.3em] uppercase">Partner With Us</span>
            <div className="h-[1px] w-12 bg-[#ff6501]"></div>
          </div>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Partner with <span className="text-white font-semibold">Bitcoin Forum India</span> and reach a dedicated audience of crypto enthusiasts,
            investors, and industry leaders. Let's create something unforgettable together.
          </p>
        </div>

        <div className="bg-black border-2 border-[#585858] rounded-2xl p-6 sm:p-8 hover:border-[#ff6501] transition-all duration-500">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Company Information */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#ff6501] mb-4">Company Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-inter-semiBold text-white mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-[#2a2a2a] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6501] focus:border-transparent ${errors.companyName ? 'border-red-500' : 'border-[#585858]'
                      }`}
                    placeholder="Enter your company name"
                  />
                  {errors.companyName && <p className="text-red-400 text-sm mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-inter-semiBold text-white mb-2">
                    Company Website
                  </label>
                  <input
                    type="text"
                    inputMode="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#585858] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6501] focus:border-transparent"
                    placeholder="https://yourcompany.com"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#ff6501] mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-inter-semiBold text-white mb-2">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-[#2a2a2a] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6501] focus:border-transparent ${errors.contactName ? 'border-red-500' : 'border-[#585858]'
                      }`}
                    placeholder="Enter contact person's name"
                  />
                  {errors.contactName && <p className="text-red-400 text-sm mt-1">{errors.contactName}</p>}
                </div>

                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-inter-semiBold text-white mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-[#2a2a2a] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6501] focus:border-transparent ${errors.contactEmail ? 'border-red-500' : 'border-[#585858]'
                      }`}
                    placeholder="Enter contact email address"
                  />
                  {errors.contactEmail && <p className="text-red-400 text-sm mt-1">{errors.contactEmail}</p>}
                </div>

                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-inter-semiBold text-white mb-2">
                    Phone No *
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-[#2a2a2a] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6501] focus:border-transparent ${errors.contactPhone ? 'border-red-500' : 'border-[#585858]'
                      }`}
                    placeholder="Enter contact phone number"
                  />
                  {errors.contactPhone && <p className="text-red-400 text-sm mt-1">{errors.contactPhone}</p>}
                </div>

                <div>
                  <label htmlFor="linkedin" className="block text-sm font-inter-semiBold text-white mb-2">
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    inputMode="url"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#585858] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6501] focus:border-transparent"
                    placeholder="https://linkedin.com/company/yourcompany"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#ff6501] mb-4">Additional Information</h2>
              <div>
                <label htmlFor="message" className="block text-sm font-inter-semiBold text-white mb-2">
                  Additional Information *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-3 bg-[#2a2a2a] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6501] focus:border-transparent resize-vertical ${errors.message ? 'border-red-500' : 'border-[#585858]'
                    }`}
                  placeholder="Tell us more about your company, specific requirements, or any questions you have about sponsorship opportunities..."
                />
                {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
              </div>
            </div>

            {/* Submission status / validation messages above submit button */}
            {validationNotice && (
              <div className="mt-2 mb-4 p-4 bg-yellow-900/20 border border-yellow-500/50 rounded-lg">
                <p className="text-yellow-400 font-inter-semiBold">
                  ⚠️ {validationNotice}
                </p>
              </div>
            )}
            {submitStatus === "success" && (
              <div className="mt-2 mb-4 p-4 bg-green-900/20 border border-green-500/50 rounded-lg">
                <p className="text-green-400 font-inter-semiBold">
                  ✅ Thank you for your interest! Our sponsorship team will review your inquiry and get back to you within 2 business days.
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mt-2 mb-4 p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
                <p className="text-red-400 font-inter-semiBold">
                  ❌ Something went wrong. Please try again later.
                </p>
              </div>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                label={isSubmitting ? "Submitting Inquiry..." : "Submit Sponsorship Inquiry"}
                className="w-full py-4 text-lg font-semibold !bg-none !bg-transparent !border-2 !border-[#ff6501] !text-[#ff6501] shadow-[0_0_10px_rgba(255,101,1,0.3)] hover:!bg-[#ff6501]/10 hover:!shadow-[0_0_20px_rgba(255,101,1,0.6)] transition-all duration-300"
                disabled={isSubmitting}
              />
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#FFFFFF80]">
              Questions? Contact our sponsorship team at{" "}
              <a
                href="mailto:sponsors@btcindia.media"
                className="text-[#ff6501] hover:underline"
              >
                sponsors@btcindia.media
              </a>
            </p>
            <p className="text-xs text-[#FFFFFF60] mt-2">
              Custom opportunities available. Limited inventory.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplySponsor;
