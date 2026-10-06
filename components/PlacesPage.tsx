'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const places = [
  {
    id: 1,
    title: 'Borra caves',
    image: '/images/Place-1.webp',
  },
  {
    id: 2,
    title: 'Araku Tribal Museum',
    image: '/images/Place-2.webp',
  },
  {
    id: 3,
    title: 'Galikonda View Point',
    image: '/images/Place-3.webp',
  },
  {
    id: 4,
    title: 'Padmapuram Botanical Garden',
    image: '/images/Place-4.webp',
  },
];

export function PlacesPage() {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setActiveMobileIndex((prev) => (prev > 0 ? prev - 1 : places.length - 1));
  };

  const handleNext = () => {
    setActiveMobileIndex((prev) => (prev < places.length - 1 ? prev + 1 : 0));
  };

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Hide the navbar when scrolling through this section
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const header = document.querySelector('header');
    if (header) {
      if (latest > 0.01 && latest < 0.98) {
        header.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
        header.style.transform = 'translateY(-100%)';
        header.style.opacity = '0';
        header.style.pointerEvents = 'none';
      } else {
        header.style.transform = '';
        header.style.opacity = '';
        header.style.pointerEvents = '';
      }
    }
  });

  useEffect(() => {
    return () => {
      const header = document.querySelector('header');
      if (header) {
        header.style.transform = '';
        header.style.opacity = '';
        header.style.pointerEvents = '';
      }
    };
  }, []);

  // Map progress directly to end exactly when the 4th card is in view
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-68%']);

  return (
    <section className="relative bg-forest">
      {/* Mobile View: Place card with Left & Right Direction icons */}
      <div className="block md:hidden px-5 py-16 sm:py-20 min-h-screen flex flex-col justify-center">
        {/* Section Header */}
        <div className="mb-6">
          <span className="eyebrow text-white/75 block mb-1">Nearby Attractions</span>
          <h2 className="text-3xl font-serif text-white">Explore the scenic beauty around us.</h2>
        </div>

        {/* Active Place Card */}
        <div className="relative h-[60vh] min-h-[420px] w-full rounded-3xl overflow-hidden shadow-2xl bg-stone-900 border-2 border-white/20">
          <motion.img
            key={places[activeMobileIndex].id}
            src={places[activeMobileIndex].image}
            alt={places[activeMobileIndex].title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* Left Direction Icon */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous place"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md border border-white/30 shadow-lg active:scale-95 transition-all"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Direction Icon */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next place"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md border border-white/30 shadow-lg active:scale-95 transition-all"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Gradient Overlay & Title */}
          <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/95 via-black/45 to-transparent p-6 flex flex-col justify-end">
            <h3 className="text-white text-2xl font-serif tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              {places[activeMobileIndex].title}
            </h3>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {places.map((place, idx) => (
            <button
              key={place.id}
              type="button"
              onClick={() => setActiveMobileIndex(idx)}
              aria-label={`Go to ${place.title}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeMobileIndex ? 'w-6 bg-white' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop View: Horizontal Card Track with Scroll */}
      <div ref={targetRef} className="hidden md:block relative h-[220vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          {/* Section Header */}
          <div className="absolute top-10 left-8 md:left-16 z-10">
            <span className="eyebrow text-white/75 block mb-1">Nearby Attractions</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white">Explore the scenic beauty around us.</h2>
          </div>

          {/* Horizontal Card Track */}
          <motion.div style={{ x }} className="flex gap-8 md:gap-10 pl-8 md:pl-16 pr-8 pt-20">
            {places.map((place) => (
              <div
                key={place.id}
                className="relative h-[65vh] min-h-[420px] w-[80vw] max-w-[850px] flex-shrink-0 rounded-3xl overflow-hidden shadow-2xl bg-stone-900 border-2 border-white/20"
              >
                <img
                  src={place.image}
                  alt={place.title}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/95 via-black/45 to-transparent p-6 sm:p-10 md:p-12 flex flex-col justify-end">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                    <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-serif tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                      {place.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
