import Home from "./Home";
import SponsorsSection from "../component/SponsorsSection";
import TicketTiersSection from "../component/TicketTiersSection";
import Speakers from "./Speakers";
import WhyAttend from "./WhyAttend";
import IndianStatesSection from "../component/IndianStatesSection";


import Footer from "./Footer";
import Button from "../component/Button";
import LiveRegistrationCounter from "../component/LiveRegistrationCounter";
import FAQSection from "../component/FAQSection";

const Index = () => {
  const handleWinFreeTickets = () => {
    // Get referral code from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get('referralCode');

    // Direct redirect to dashboard with referral code
    const base = import.meta.env.VITE_DASHBOARD_URL;
    const params = new URLSearchParams({
      ...(referralCode && { referralCode: referralCode })
    });

    window.location.href = `${base.replace(/\/$/, '')}?${params.toString()}`;
  };

  return (
    <div className="space-y-16 md:space-y-20 w-full overflow-x-hidden relative">
      <Home />
      {/* Get Free Tickets CTA above Ticket Tiers */}

      <LiveRegistrationCounter />
      <TicketTiersSection />
      <Speakers />
      <div className="w-full max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#FF9900]/30 to-transparent"></div>
      <WhyAttend />
      {/* Separation Line */}
      <div className="w-full max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#FF9900]/30 to-transparent"></div>
      <IndianStatesSection />
      {/* Separation Line */}
      <div className="w-full max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#FF9900]/30 to-transparent"></div>
      <SponsorsSection />
      {/* Separation Line */}
      <div className="w-full max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#FF9900]/30 to-transparent"></div>
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;




