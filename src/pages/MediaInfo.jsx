import React from "react";
import { Link } from "react-router-dom";

const MediaInfo = () => {
  return (
    <section className="min-h-[70vh] w-full px-4 sm:px-8 lg:px-20 pt-36 pb-16 text-white bg-black relative overflow-hidden">
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
            Media & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9900] to-[#FF9900]">Partnerships</span>
          </h1>

          <div className="flex items-center justify-center gap-4 text-[#FF9900]/80 mb-4">
            <div className="h-[1px] w-12 bg-[#FF9900]"></div>
            <span className="text-sm font-mono tracking-[0.3em] uppercase">Collaborate</span>
            <div className="h-[1px] w-12 bg-[#FF9900]"></div>
          </div>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Be part of the official event coverage and collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-black border-2 border-[#585858] rounded-xl p-6 hover:border-[#FF9900] transition-all duration-500">
            <div className="text-xl md:text-2xl font-bold text-[#FF9900] mb-2">Priority Access</div>
            <p className="metric-label">Press lounge, scheduled interview slots, and stage-side access for approved crews.</p>
          </div>
          <div className="bg-black border-2 border-[#585858] rounded-xl p-6 hover:border-[#FF9900] transition-all duration-500">
            <div className="text-xl md:text-2xl font-bold text-[#FF9900] mb-2">Co‑Branded Moments</div>
            <p className="metric-label">Partner segments, on‑ground activations, and content integrations amplified on our channels.</p>
          </div>
          <div className="bg-black border-2 border-[#585858] rounded-xl p-6 hover:border-[#FF9900] transition-all duration-500">
            <div className="text-xl md:text-2xl font-bold text-[#FF9900] mb-2">Content Support</div>
            <p className="metric-label">Access to media kits, speaker quotes, and highlight reels for fast turnarounds.</p>
          </div>
        </div>

        <div className="text-center">
          <a href="/contact/media-partnership">
            <button className="bg-transparent border-2 border-[#FF9900] text-[#FF9900] font-semibold px-6 py-3 rounded-lg shadow-[0_0_10px_rgba(255,153,0,0.3)] hover:bg-[#FF9900]/10 hover:shadow-[0_0_20px_rgba(255,153,0,0.6)] transition-all duration-300">Apply for Media & Partnerships</button>
          </a>
        </div>

        {/* Email support */}
        <div className="mt-8 text-center">
          <p className="metric-label">
            Prefer email? Reach us at {" "}
            <a href="mailto:partnerships@btcindia.media" className="text-[#FF9900] hover:underline">partnerships@btcindia.media</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MediaInfo;






