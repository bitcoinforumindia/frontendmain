import { useState, useEffect } from "react";

const venueeBg = "/assets/imgs/others/Venue_bg.png";
const venueHero2 = "/assets/imgs/others/venue_hero_2.png";
const venueHero3 = "/assets/imgs/others/venue_hero_3.png";
const venueHero4 = "/assets/imgs/others/venue_hero_4.png";
const venueOne = "/assets/imgs/carousels/carousel_1.JPG";
const venueTwo = "/assets/imgs/carousels/carousel_2.JPG";
const venueThree = "/assets/imgs/carousels/carousel_3.JPG";
const venueFour = "/assets/imgs/carousels/carousel_4.JPG"; // Add a fourth image

const Venue = () => {
  // Hero images carousel
  const heroImages = [venueeBg, venueHero2, venueHero3, venueHero4];
  const [currentHero, setCurrentHero] = useState(0);

  // Auto-slide hero carousel every 4 seconds (desktop only)
  useEffect(() => {
    // Check if viewport is desktop (1024px or larger)
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

    if (!isDesktop) {
      // Keep on first slide for mobile
      setCurrentHero(0);
      return;
    }

    // Auto-slide only on desktop
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Must-visit places in Hyderabad (used by the carousel) — declare BEFORE hooks
  const venues = [
    {
      id: 1,
      img: venueOne,
      alt: "Charminar Hyderabad",
      title: "Charminar",
      description: "The iconic monument and mosque located in the heart of Hyderabad",
    },
    {
      id: 2,
      img: venueTwo,
      alt: "Cyber Towers Hyderabad",
      title: "Cyber Towers",
      description: "The honeycomb-fronted landmark that marks the gateway to HITEC City.",
    },
    {
      id: 3,
      img: venueThree,
      alt: "T-Hub 2.0 Hyderabad",
      title: "The T-Hub 2.0",
      description: "The T-Hub 2.0 campus in Raidurg is a massive innovation hub that hosts startups, corporates, and programs under one roof.",
    },
    {
      id: 4,
      img: venueFour,
      alt: "Amazon Campus Hyderabad",
      title: "Amazon Campus",
      description: "The world's largest Amazon campus, spanning 9.5 acres with cutting-edge architecture and state-of-the-art facilities in the heart of Hyderabad's IT corridor.",
    },
  ];
  return (
    <div className="relative w-full z-0">
      {/* Venue Hero Image Carousel with Text Overlay */}
      <div className="relative w-full flex justify-center px-5 z-10 mt-6 sm:mt-10 md:mt-12">
        <div className="relative w-[95%] sm:w-[90%] md:w-[85%] lg:w-[78%] border border-gray-500 rounded-lg overflow-hidden">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentHero * 100}%)` }}
            >
              {heroImages.map((image, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 relative"
                >
                  <img
                    src={image}
                    alt={`Venue background ${index + 1}`}
                    className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] object-cover object-center"
                  />
                  {/* Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/60"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Text Overlay - Centered on Carousel */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6 sm:px-10 md:px-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3 sm:mb-4">
              <span className="text-white">Venue Announcement</span>
              <br />
              <span className="text-[#FF9900]">Coming Soon</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-white mb-5 sm:mb-6">
              We're securing an iconic location in Hyderabad that will perfectly complement the scale and significance of India's premier Bitcoin conference.
            </p>
            <button className="px-6 py-3 bg-transparent hover:bg-[#FF9900]/20 border-2 border-[#FF9900] rounded-full text-sm sm:text-base font-semibold gradient-text transition-all duration-300 shadow-[0_0_15px_rgba(255,153,0,0.4)] hover:shadow-[0_0_30px_rgba(255,153,0,0.7)] hover:scale-105">
              Stay tuned for the big reveal
            </button>
          </div>
        </div>
      </div>

      {/* Separation Line */}
      <div className="w-full flex justify-center mt-8 sm:mt-10 mb-8 sm:mb-10 px-5">
        <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[78%] max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#FF9900]/30 to-transparent"></div>
      </div>

      {/* Removed moving desktop carousel; static grid below shows places */}
      {/* Photo grid - All devices show all 4 cards */}

      {/* Mobile - Stacked Cards */}
      <div className="flex md:hidden flex-col gap-6 w-full px-5 py-6">
        {venues.map((venue) => (
          <div
            key={venue.id}
            className="w-full max-w-sm mx-auto rounded-lg border border-gray-500 overflow-hidden bg-black"
          >
            <div className="overflow-hidden">
              <img
                src={venue.img}
                alt={venue.alt}
                className="w-full h-[28rem] object-cover object-top"
              />
            </div>
            <div className="p-4 text-white">
              <h3 className="text-xl font-familjen mb-2">{venue.title}</h3>
              <p className="text-sm font-inter text-gray-300">{venue.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop - Grid Layout */}
      <div className="hidden md:flex flex-wrap justify-center gap-6 px-5 py-6">
        {venues.map((venue) => (
          <div
            key={venue.id}
            className="w-[calc(50%-12px)] lg:w-[calc(25%-18px)] rounded-lg border border-gray-500 overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer bg-black"
          >
            <div className="overflow-hidden">
              <img
                src={venue.img}
                alt={venue.alt}
                className="w-full h-56 lg:h-[32rem] object-cover object-top transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="p-4 text-white">
              <h3 className="text-xl font-familjen mb-2">{venue.title}</h3>
              <p className="text-sm font-inter text-gray-300">{venue.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Venue;




