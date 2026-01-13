import React from "react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-8 lg:px-20">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-[#FF9900] hover:text-[#FF9900] transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#FF9900] mb-2">Privacy Policy</h1>
          <p className="metric-label">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF9900] mb-4">1. Information We Collect</h2>
            <p className="text-gray-300 leading-relaxed">
              We collect information you provide directly to us, such as when you register for our conference, contact us, or subscribe to our newsletter. This may include your name, email address, phone number, and other contact information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF9900] mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-300 leading-relaxed">
              We use the information we collect to provide, maintain, and improve our services, communicate with you about the conference, and send you updates and promotional materials.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF9900] mb-4">3. Information Sharing</h2>
            <p className="text-gray-300 leading-relaxed">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this privacy policy or as required by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF9900] mb-4">4. Data Security</h2>
            <p className="text-gray-300 leading-relaxed">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF9900] mb-4">5. Cookies</h2>
            <p className="text-gray-300 leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience on our website and analyze how our services are used.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF9900] mb-4">6. Contact Us</h2>
            <p className="text-gray-300 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at contact@btcindia.media
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;




