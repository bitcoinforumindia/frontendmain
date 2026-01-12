import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTelegram,
  FaYoutube,
  FaLinkedin,
  FaDiscord,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full border-t border-[#ff6501]/30 bg-[#050505]/90 backdrop-blur-sm pt-8 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        {/* Main Footer Content */}
        <div className="flex flex-row-reverse md:flex-row flex-wrap justify-between items-end md:items-center gap-4 md:gap-8 mb-6">

          {/* Left: Links (Stacked) */}
          <div className="flex flex-col items-end md:items-start self-end md:self-auto gap-1">
            <Link to="/contact" className="text-[#ff6501] text-xs font-medium hover:opacity-80 uppercase tracking-widest">Contact Us</Link>
            <Link to="/privacy" className="text-[#ff6501] text-xs font-medium hover:opacity-80 uppercase tracking-widest">Privacy Policy</Link>
            <Link to="/terms" className="text-[#ff6501] text-xs font-medium hover:opacity-80 uppercase tracking-widest">Terms & Conditions</Link>
          </div>

          {/* Right: Social Icons (Grid 3x2) */}
          <div className="grid grid-cols-3 gap-x-6 gap-y-3">
            <a href="https://t.me/BitcoinConfIND" target="_blank" rel="noreferrer" className="text-[#ff6501] text-xl hover:opacity-80 transition-opacity flex justify-center"><FaTelegram /></a>
            <a href="https://x.com/BitcoinConfIND" target="_blank" rel="noreferrer" className="text-[#ff6501] text-xl hover:opacity-80 transition-opacity flex justify-center"><FaXTwitter /></a>
            <a href="https://www.instagram.com/bitcoinconfind" target="_blank" rel="noreferrer" className="text-[#ff6501] text-xl hover:opacity-80 transition-opacity flex justify-center"><FaInstagram /></a>
            <a href="https://youtube.com/@bitcoinconferenceindia" target="_blank" rel="noreferrer" className="text-[#ff6501] text-xl hover:opacity-80 transition-opacity flex justify-center"><FaYoutube /></a>
            <a href="https://www.linkedin.com/company/bitcoinconfind/" target="_blank" rel="noreferrer" className="text-[#ff6501] text-xl hover:opacity-80 transition-opacity flex justify-center"><FaLinkedin /></a>
            <a href="https://discord.gg/UNsh7qhXs5" target="_blank" rel="noreferrer" className="text-[#ff6501] text-xl hover:opacity-80 transition-opacity flex justify-center"><FaDiscord /></a>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="flex flex-col items-center text-center border-t border-[#ff6501]/10 pt-8">
          <h4 className="text-[#ff6501] text-xs font-bold uppercase tracking-[0.2em] mb-4">Disclaimer</h4>
          <p className="text-gray-400 text-xs md:text-sm font-light max-w-3xl leading-relaxed">
            Bitcoin Forum India is an independent event dedicated to
            promoting Bitcoin education and adoption in India. We are not
            affiliated with any specific Bitcoin company or organization. All
            information provided is for educational purposes only and should not
            be considered as financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
