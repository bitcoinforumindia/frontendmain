import React from 'react';
import { FaVideo, FaCalendarAlt, FaHandshake, FaUsers, FaMicrophone, FaBuilding } from 'react-icons/fa';
import { useCountUpOnScroll } from '../hooks/useCountUp';
import { useStaggeredScrollAnimation } from '../hooks/useScrollAnimation';

const MetricItem = ({ icon, value, label, index }) => {
  const { ref, count } = useCountUpOnScroll(value, { duration: 2000, delay: index * 100 });

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center card-hover-lift"
      role="img"
      aria-label={`${value} ${label} for Bitcoin Forum India 2026`}
    >
      {/* Icon */}
      <div className="text-white mb-4 icon-hover-pulse" aria-hidden="true">
        {icon}
      </div>

      {/* Value with count-up animation */}
      <div className="text-3xl md:text-4xl font-bold text-white mb-2 font-familjen">
        {count}
      </div>

      {/* Label */}
      <div className="text-sm md:text-base text-white/80 font-medium">
        {label}
      </div>
    </div>
  );
};

const ConferenceMetrics = () => {
  const metrics = [
    {
      icon: <FaVideo className="w-8 h-8" />,
      value: "150+",
      label: "Media & Press"
    },
    {
      icon: <FaCalendarAlt className="w-8 h-8" />,
      value: "2 days",
      label: "of Content"
    },
    {
      icon: <FaHandshake className="w-8 h-8" />,
      value: "200+",
      label: "Partners"
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      value: "50k+",
      label: "Attendees"
    },
    {
      icon: <FaMicrophone className="w-8 h-8" />,
      value: "150+",
      label: "Speakers"
    },
    {
      icon: <FaBuilding className="w-8 h-8" />,
      value: "100+",
      label: "Sponsors"
    }
  ];

  const { containerRef, getItemProps } = useStaggeredScrollAnimation(metrics.length, { staggerDelay: 100 });

  return (
    <div className="max-w-7xl mx-auto">
      {/* SEO-friendly heading */}
      <h2 id="conference-metrics" className="sr-only">Bitcoin Forum India 2026 Statistics and Metrics</h2>

      {/* Metrics Container with Elegant Glowing Border */}
      <div className="relative bg-black border-2 border-[#FF9900] rounded-2xl p-8 shadow-2xl card-hover-lift">
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF9900] via-[#FF9900] to-[#FF9900] rounded-2xl opacity-20 blur-sm"></div>

        {/* Content */}
        <div className="relative z-10" ref={containerRef}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} {...getItemProps(index)}>
                <MetricItem
                  icon={metric.icon}
                  value={metric.value}
                  label={metric.label}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceMetrics;




