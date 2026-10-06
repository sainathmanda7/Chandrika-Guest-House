'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const places = [
  {
    id: 1,
    title: 'Raja Seat Garden',
    distance: '800 m to 1 km',
    image: '/images/Place-1.jpg',
  },
  {
    id: 2,
    title: 'Abbi Waterfall',
    distance: '1.3 to 1.5 km',
    image: '/images/Place-2.jpg',
  },
  {
    id: 3,
    title: 'Madikeri Fort',
    distance: '6 to 7 km',
    image: '/images/Place-3.jpg',
  },
  {
    id: 4,
    title: 'Mandalpatti Peak',
    distance: '20 to 22 km',
    image: '/images/Place-4.jpg',
  },
];

export function PlacesPage() {
  const targetRef = useRef<HTMLDivElement>(null);

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
    <section ref={targetRef} className="relative h-[220vh] bg-forest">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Section Header */}
        <div className="absolute top-10 left-8 md:left-16 z-10">
          <span className="eyebrow text-white/75 block mb-1">Nearby Attractions</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white">Places worth the drive.</h2>
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
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase drop-shadow">
                    {place.distance}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
