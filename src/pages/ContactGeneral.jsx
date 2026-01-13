import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../component/Button";
import { dbHelpers } from "../lib/supabase";

const ContactGeneral = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [validationNotice, setValidationNotice] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters";
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ""))) newErrors.phone = "Phone number is invalid";
    setErrors(newErrors);
    const hasErrors = Object.keys(newErrors).length > 0;
    setValidationNotice(hasErrors ? "Please correct the highlighted fields." : "");
    return !hasErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (validationNotice) setValidationNotice("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await dbHelpers.submitContactQuery(formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "", phone: "" });
    } catch (err) {
      console.error(err);
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
            to="/contact"
            className="inline-flex items-center text-[#FF9900] hover:text-[#FF9900] transition-colors group"
          >
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
        </div>

        <div className="text-center mb-16 relative">
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[100px] bg-[#FF9900]/20 blur-[80px] rounded-full pointer-events-none"></div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tighter uppercase relative z-10">
            General <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9900] to-[#FF9900]">Queries</span>
          </h1>

          <div className="flex items-center justify-center gap-4 text-[#FF9900]/80 mb-4">
            <div className="h-[1px] w-12 bg-[#FF9900]"></div>
            <span className="text-sm font-mono tracking-[0.3em] uppercase">We Are Here To Help</span>
            <div className="h-[1px] w-12 bg-[#FF9900]"></div>
          </div>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Have a question or inquiry? We're here to help. Fill out the form below and our team will get back to you as soon as possible.
          </p>
        </div>

        <div className="bg-black border-2 border-[#585858] rounded-2xl p-6 sm:p-8 hover:border-[#FF9900] transition-all duration-500">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#FF9900] mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-inter-semiBold text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-[#2a2a2a] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-transparent ${errors.name ? 'border-red-500' : 'border-[#585858]'
                      }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-inter-semiBold text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-[#2a2a2a] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-transparent ${errors.email ? 'border-red-500' : 'border-[#585858]'
                      }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-inter-semiBold text-white mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-[#2a2a2a] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-[#585858]'
                      }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Query Details */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#FF9900] mb-4">Query Details</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="subject" className="block text-sm font-inter-semiBold text-white mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-[#2a2a2a] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-transparent ${errors.subject ? 'border-red-500' : 'border-[#585858]'
                      }`}
                    placeholder="What is this about?"
                  />
                  {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-inter-semiBold text-white mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-3 bg-[#2a2a2a] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-transparent resize-vertical ${errors.message ? 'border-red-500' : 'border-[#585858]'
                      }`}
                    placeholder="Tell us more about your inquiry..."
                  />
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                </div>
              </div>
            </div>

            {/* Submission status / validation messages */}
            {validationNotice && (
              <div className="mt-2 mb-4 p-4 bg-yellow-900/20 border border-yellow-500/50 rounded-lg">
                <p className="text-yellow-400 font-inter-semiBold">⚠️ {validationNotice}</p>
              </div>
            )}
            {submitStatus === "success" && (
              <div className="mt-2 mb-4 p-4 bg-green-900/20 border border-green-500/50 rounded-lg">
                <p className="text-green-400 font-inter-semiBold">✅ Thank you for contacting us. We will reach out to you as soon as possible.</p>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="mt-2 mb-4 p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
                <p className="text-red-400 font-inter-semiBold">❌ Something went wrong. Please try again later.</p>
              </div>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                label={isSubmitting ? "Sending..." : "Send Message"}
                className="w-full py-4 text-lg font-semibold !bg-transparent !border-2 !border-[#FF9900] !text-[#FF9900] shadow-[0_0_10px_rgba(255,153,0,0.3)] hover:!bg-[#FF9900]/10 hover:!shadow-[0_0_20px_rgba(255,153,0,0.6)] transition-all duration-300"
                disabled={isSubmitting}
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactGeneral;






