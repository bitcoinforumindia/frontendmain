import React from "react";
import { Link } from "react-router-dom";

const Terms = () => {
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
          <h1 className="text-3xl md:text-4xl font-bold text-[#FF9900] mb-2">Terms & Conditions</h1>
          <p className="metric-label">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF9900] mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing and using the Bitcoin Forum India website and services, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF9900] mb-4">2. Event Information</h2>
            <p className="text-gray-300 leading-relaxed">
              Bitcoin Forum India is an independent event dedicated to promoting Bitcoin education and adoption in India. All information provided is for educational purposes only and should not be considered as financial advice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF9900] mb-4">3. Registration and Tickets</h2>
            <p className="text-gray-300 leading-relaxed">
              Event registration and ticket purchases are subject to availability. We reserve the right to refuse service to anyone for any reason at any time. All sales are final unless otherwise specified.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF9900] mb-4">4. Limitation of Liability</h2>
            <p className="text-gray-300 leading-relaxed">
              Bitcoin Forum India shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF9900] mb-4">5. Privacy</h2>
            <p className="text-gray-300 leading-relaxed">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the website, to understand our practices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF9900] mb-4">6. Contact Information</h2>
            <p className="text-gray-300 leading-relaxed">
              If you have any questions about these Terms & Conditions, please contact us at contact@btcindia.media
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;




