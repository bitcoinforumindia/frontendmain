import React from "react";
import Button from "./Button";

const ConferenceForm = ({ onClose, isModal = false }) => {

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get referral code from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get('referralCode');

    // Direct redirect to dashboard with referral code (env-based for Vercel)
    const base = import.meta.env.VITE_DASHBOARD_URL;
    const params = new URLSearchParams({
      ...(referralCode && { referralCode: referralCode })
    });

    window.location.href = `${base.replace(/\/$/, '')}?${params.toString()}`;
  };

  const formContent = (
    <div className={`${isModal ? 'bg-black p-6 rounded-lg max-w-2xl mx-auto' : 'w-full'}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#FF9900] font-familjen">
          Sign Up & Get Free Tickets!
        </h2>
        {isModal && onClose && (
          <button
            onClick={onClose}
            className="text-white hover:text-[#FF9900] text-2xl font-bold"
          >
            ×
          </button>
        )}
      </div>

      <div className="text-center space-y-6">
        <div className="mb-8">
          <h3 className="text-xl text-white font-semibold mb-4">
            🎟️ Win FREE GA Pass Tickets + Exclusive Bitcoin Merchandise!
          </h3>
          <p className="text-gray-300 text-lg">
            Join India's Premier Bitcoin conference!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            type="button"
            label="🎟️ Claim Your FREE Tickets!"
            variant="primary"
            onClick={handleSubmit}
            className="flex-1 py-4 text-xl font-bold"
          />
          {isModal && onClose && (
            <Button
              type="button"
              label="Cancel"
              variant="secondary"
              onClick={onClose}
              className="flex-1 py-3 text-lg"
            />
          )}
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-black rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {formContent}
        </div>
      </div>
    );
  }

  return formContent;
};

export default ConferenceForm;



