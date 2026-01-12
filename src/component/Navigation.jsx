import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";

import { BorderBeam } from "./ui/BorderBeam";

// Using the same logo asset
const logo = "/assets/imgs/logo/BitLogo.png";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20); // Sensitive scroll trigger
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScrollTo = (targetY, duration = 1200) => {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    let startTime = null;
    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

    const animate = (timestamp) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, startY + distance * eased);
      if (elapsed < duration) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  const handleWinFreeTickets = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get('referralCode');
    const base = import.meta.env.VITE_DASHBOARD_URL || '#';
    const params = new URLSearchParams({
      ...(referralCode && { referralCode: referralCode })
    });
    const qs = params.toString();
    window.location.href = qs ? `${base.replace(/\/$/, '')}?${qs}` : base;
  };

  const goToId = (e, id) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        const headerOffset = 100; // Offset for centered floating nav
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        smoothScrollTo(offsetPosition);
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <>
      {/* Mobile Logo - Top Left Standalone */}
      <div className="md:hidden fixed top-6 left-6 z-50">
        <Link to="/">
          <img
            src="/assets/imgs/logo/wib.svg"
            alt="Bitcoin India Forum"
            className={`w-auto transition-all duration-300 ${isScrolled ? 'h-12' : 'h-16'}`}
          />
        </Link>
      </div>

      <div className={`fixed top-6 z-50 transition-all duration-500 ease-out right-4 left-auto translate-x-0 md:left-1/2 md:right-auto md:-translate-x-1/2 ${isScrolled ? 'w-auto md:w-[85%] lg:w-[75%]' : 'w-auto md:w-[90%] lg:w-[85%]'}`}>
        {/* Main Header Pill - Contains Logo, Nav, and Button */}
        <header
          className={`transition-all duration-500 ease-out border border-[#ff6501]/50
            ${isScrolled
              ? 'py-2 md:py-3 bg-[#0A0A0A]/80 shadow-[0_4px_30px_rgba(255,101,1,0.1)] backdrop-blur-2xl'
              : 'py-3 md:py-5 bg-[#0A0A0A]/60 backdrop-blur-md'
            } rounded-2xl w-full mx-auto`}
        >
          <div className="px-4 md:px-10 flex items-center justify-between gap-4 relative z-10 w-full">
            {/* Logo - Left (visible only on Desktop now) */}
            <div className="flex-shrink-0 hidden md:block">
              <Link to="/">
                <img
                  src="/assets/imgs/logo/wib.svg"
                  alt="Bitcoin India Forum"
                  className={`w-auto transition-all duration-300 hover:scale-105 ${isScrolled ? 'h-9 md:h-12 lg:h-14' : 'h-10 md:h-14 lg:h-16'}`}
                />
              </Link>
            </div>

            {/* Desktop Nav - Center */}
            <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
              <NavLink isScrolled={isScrolled} onClick={(e) => goToId(e, 'speakers')} href="/#speakers">Speakers</NavLink>
              <NavLink isScrolled={isScrolled} onClick={(e) => goToId(e, 'sponsors-cta')} href="/#sponsors-cta">Sponsors</NavLink>
              <NavLink isScrolled={isScrolled} to="/media">Partnerships</NavLink>
              <NavLink isScrolled={isScrolled} to="/student-volunteer">Volunteer</NavLink>
            </nav>

            {/* Get Tickets Button - Desktop Right */}
            <div className="hidden md:block flex-shrink-0">
              <Button
                label="Get Tickets"
                variant="primary"
                className={`!rounded-xl transition-all duration-300 ${isScrolled ? 'px-6 py-2 text-sm' : 'px-8 py-3 text-base'} shadow-lg shadow-[#ff6501]/20`}
                onClick={handleWinFreeTickets}
              />
            </div>

            {/* Mobile Hamburger - Right */}
            <div className="md:hidden flex-shrink-0">
              <Hamburger goToId={goToId} handleWinFreeTickets={handleWinFreeTickets} />
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

// Helper for nav links with hover effect
const NavLink = ({ children, to, href, onClick, isScrolled }) => {
  const baseClasses = `relative ${isScrolled ? 'px-3 py-2 text-base' : 'px-4 py-3 text-lg'} font-medium text-white/90 hover:text-[#ff6501] transition-all duration-300`;

  if (to) {
    return <Link to={to} className={baseClasses}>{children}</Link>;
  }
  return <a href={href} onClick={onClick} className={baseClasses}>{children}</a>;
};

const Hamburger = ({ goToId, handleWinFreeTickets }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="p-2 text-white hover:text-[#ff6501] transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"} />
        </svg>
      </button>

      {/* Floating Dropdown for Mobile */}
      {open && (
        <div className="absolute top-12 right-0 w-56 bg-[#0A0A0A]/95 border border-[#ff6501]/30 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200 backdrop-blur-xl">
          <div className="flex flex-col p-2 gap-1">
            {/* Get Tickets Button */}
            <button
              onClick={() => {
                handleWinFreeTickets();
                setOpen(false);
              }}
              className="w-full px-4 py-3 bg-[#ff6501] text-black font-bold rounded-xl hover:bg-[#e65a00] transition-colors"
            >
              Get Tickets
            </button>

            {/* Menu Items */}
            <button onClick={() => { goToId('speakers'); setOpen(false); }} className="w-full px-4 py-2.5 text-left text-gray-300 hover:text-[#ff6501] hover:bg-white/5 rounded-lg transition-colors">
              Speakers
            </button>
            <button onClick={() => { goToId('sponsors'); setOpen(false); }} className="w-full px-4 py-2.5 text-left text-gray-300 hover:text-[#ff6501] hover:bg-white/5 rounded-lg transition-colors">
              Sponsors
            </button>
            <button onClick={() => { goToId('partnerships'); setOpen(false); }} className="w-full px-4 py-2.5 text-left text-gray-300 hover:text-[#ff6501] hover:bg-white/5 rounded-lg transition-colors">
              Partnerships
            </button>
            <button onClick={() => { goToId('volunteer'); setOpen(false); }} className="w-full px-4 py-2.5 text-left text-gray-300 hover:text-[#ff6501] hover:bg-white/5 rounded-lg transition-colors">
              Volunteer
            </button>
            <button onClick={() => { goToId('contact'); setOpen(false); }} className="w-full px-4 py-2.5 text-left text-gray-300 hover:text-[#ff6501] hover:bg-white/5 rounded-lg transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const MobileLink = ({ children, to, href, onClick }) => {
  const classes = "block px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-[#ff6501] rounded-xl transition-all text-center";
  if (to) return <Link to={to} onClick={onClick} className={classes}>{children}</Link>;
  return <a href={href} onClick={onClick} className={classes}>{children}</a>;
};

export default Navigation;
