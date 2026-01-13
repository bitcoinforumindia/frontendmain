import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import Background from "./Background";

const GA_MEASUREMENT_ID = "G-X5FR6VSP9X";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Load Google Analytics once for the entire app shell
    if (typeof window === "undefined") return;

    // Prevent duplicate injections on fast refresh / remounts
    if (window.gtagInitialized) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }

    window.gtag = gtag;
    window.gtagInitialized = true;

    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID);

    return () => {
      // Keep script in DOM during lifecycle, but avoid multiple init flags
      window.gtagInitialized = true;
    };
  }, []);

  useEffect(() => {
    // Prevent browser from restoring scroll position automatically
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Smooth scroll to hash targets when present
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        // slight delay to ensure layout is stable
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      // No hash: scroll to top INSTANTLY on route changes/refresh to prevent jumpiness
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <Background />
      <Navigation />
      <main className="relative z-10">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;




