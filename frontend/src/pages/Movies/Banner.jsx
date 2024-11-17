import React, { useState, useEffect, useRef } from "react";
import "../../CSS/Banner.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";
import img4 from "../../assets/img4.jpg";
import img5 from "../../assets/img5.jpg";

// Array of banner images with associated text and IDs for linking
const bannerImages = [
  { image: img1, text: "The Wild Robot", id: "6739c12831d269c52a1fca2c" },
  {
    image: img2,
    text: "Venom: The Last Dance",
    id: "6739c36d31d269c52a1fca71",
  },
  { image: img3, text: "Terrifier3", id: "6739c56531d269c52a1fca94" },
  {
    image: img4,
    text: "Apocalypse Z: The Beginning of the End",
    id: "6739c47331d269c52a1fca86",
  },
  { image: img5, text: "Deadpool & Wolverine", id: "6739c71d31d269c52a1fcab0" },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Current index of the displayed slide
  const [isTransitioning, setIsTransitioning] = useState(false); // State to manage slide transition
  const [slides, setSlides] = useState([]); // Array of slides with prepended and appended slides for looping
  const autoScrollInterval = useRef(null); // Reference for the auto-scroll interval
  const slideRef = useRef(null); // Reference to the slide container
  const lastInteractionTime = useRef(Date.now()); // Track last interaction time to reset auto-scroll

  // Initialize slides with looping elements at the beginning and end
  useEffect(() => {
    setSlides([
      bannerImages[bannerImages.length - 1],
      ...bannerImages,
      bannerImages[0],
    ]);
  }, []);

  // Start auto-scroll with a 7-second interval
  const startAutoScroll = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }

    autoScrollInterval.current = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - lastInteractionTime.current >= 7000) {
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + 1);
      }
    }, 7000);
  };

  // Start auto-scroll on mount and clean up on unmount
  useEffect(() => {
    startAutoScroll();
    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
  }, []);

  // Handle slide change based on direction (next/prev)
  const handleSlideChange = (direction) => {
    if (isTransitioning) return; // Prevent slide change during transition

    lastInteractionTime.current = Date.now(); // Reset last interaction time
    setIsTransitioning(true);

    if (direction === "next") {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => handleSlideChange("next"); // Navigate to the next slide
  const handlePrev = () => handleSlideChange("prev"); // Navigate to the previous slide

  // Handle transition end to loop slides seamlessly
  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(bannerImages.length);
    } else if (currentIndex === bannerImages.length + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else {
      setIsTransitioning(false);
    }
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-black"
      style={{ marginTop: "61px", height: "660px" }} // Adjusting margin and height to match the design
    >
      {/* Slide container */}
      <div
        ref={slideRef}
        className="relative flex h-full w-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`, // Translate based on the current index
          transition: isTransitioning ? "transform 500ms ease-in-out" : "none", // Smooth transition when sliding
        }}
        onTransitionEnd={handleTransitionEnd} // Handle end of transition for seamless looping
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative h-full w-full shrink-0 bg-cover bg-center" // Slide background styles
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            {/* Gradient overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            {/* Slide content */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center">
              <h1 className="mb-4 text-4xl md:text-6xl font-bold text-white tracking-tight">
                {slide.text}
              </h1>
              {slide.id && (
                <a
                  href={`/movies/${slide.id}`} // Link to movie details
                  className="inline-flex items-center px-6 py-3 text-sm font-medium text-black bg-white rounded-lg hover:bg-white/90 transition-colors duration-300"
                >
                  See More
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Previous button */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors duration-300 z-10"
        aria-label="Previous slide"
        disabled={isTransitioning} // Disable button during slide transition
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors duration-300 z-10"
        aria-label="Next slide"
        disabled={isTransitioning} // Disable button during slide transition
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Banner;
