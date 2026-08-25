import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import centerImage from '../assets/hero_assets/hero_center.png';

const Hero = ({ onPreloadComplete }) => {
  const [text, setText] = useState('AYUSHMAN');
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Lock scroll during animation
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    const target = "PORTFOLIO";
    const start = "AYUSHMAN";
    let iterations = 0;
    let intervalId;
    let timeoutId;

    const imageLoadPromise = new Promise((resolve) => {
      const img = new window.Image();
      img.src = centerImage;
      if (img.complete) {
        resolve();
      } else {
        img.onload = resolve;
        img.onerror = resolve;
      }
    });

    const delayPromise = new Promise((resolve) => {
      timeoutId = setTimeout(resolve, 1000);
    });

    let isMounted = true;

    Promise.all([imageLoadPromise, delayPromise]).then(() => {
      if (!isMounted) return;

      intervalId = setInterval(() => {
        setText(() => {
          let newText = target.split("").map((letter, index) => {
            if (index < Math.floor(iterations)) {
              return target[index]; // Target letter
            }
            if (index < start.length) {
              return start[index]; // Original letter
            }
            return "";
          }).join("");
          return newText;
        });

        if (iterations >= target.length) {
          clearInterval(intervalId);

          // GSAP Animation Sequence
          const tl = gsap.timeline({
            onComplete: () => {
              document.body.style.overflow = 'auto'; // Unlock scroll
              if (onPreloadComplete) onPreloadComplete(); // Unlock rest of the website
            }
          });

          // 1. Move the central text container up from 50% to its resting place
          const isMobile = window.innerWidth < 768;
          tl.to(containerRef.current, {
            top: isMobile ? "20%" : "45%",
            duration: 1.5,
            ease: "power3.inOut"
          }, "+=0.2"); // slight delay after scramble finishes

          // 2. Fade and slide up the Subtitle and Buttons
          tl.fromTo([subtitleRef.current, buttonsRef.current],
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out" },
            "-=1.0" // start animating these while the text is still moving up
          );

          // 3. Slide the image upward to the center (no fading)
          tl.fromTo(imageRef.current,
            { y: "100vh" }, // start entirely offscreen at the bottom
            { y: 0, duration: 1.5, ease: "power3.out" },
            "-=1.2" // start sliding up around the same time
          );
        }
        iterations += 1 / 3; // Controls the speed of the letter swap
      }, 50); // 50ms per step
    });

    return () => {
      isMounted = false;
      document.body.style.overflow = 'auto';
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-end justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ background: 'radial-gradient(circle, #222222 0%, #000000 80%)' }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

      <div
        ref={containerRef}
        className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none flex flex-col items-start w-max"
      >
        <h1
          ref={textRef}
          className="text-[16vw] md:text-[10rem] lg:text-[14rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 drop-shadow-2xl pr-4 md:pr-8 leading-none uppercase"
        >
          {text}
        </h1>

        <p
          ref={subtitleRef}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 md:translate-x-0 md:-bottom-12 md:left-8 text-white text-base md:text-2xl lg:text-4xl drop-shadow-md z-10 opacity-0 w-max"
        >
          <span className="font-bold">Software</span> <span className="font-light italic text-gray-300">Developer</span>
        </p>

        <div
          ref={buttonsRef}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 md:translate-x-0 md:-bottom-12 md:left-auto md:right-20 flex items-center gap-2 md:gap-4 pointer-events-auto z-10 opacity-0 w-max"
        >
          {/* View Resume Button */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 md:px-6 md:py-2.5 rounded-full border border-[#ccff00] bg-[#ccff00] hover:bg-[#b3e600] hover:border-[#b3e600] text-black font-semibold text-xs md:text-sm tracking-wider flex items-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_25px_rgba(204,255,0,0.5)] cursor-pointer"
          >
            <span>View Resume</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>

          {/* Contact Button */}
          <a
            href="#contact"
            className="px-4 py-1.5 md:px-6 md:py-2.5 rounded-full border border-gray-400/30 flex items-center justify-center backdrop-blur-md bg-black/20 hover:bg-white/10 hover:border-gray-400/50 transition-all cursor-pointer text-gray-300 hover:text-white text-xs md:text-sm italic font-light tracking-wider"
          >
            Contact
          </a>
        </div>
      </div>

      <div
        ref={imageRef}
        className="relative z-10 text-center text-white flex flex-col items-center w-full pointer-events-auto translate-y-[100vh]"
      >
        {/* Soft Classic Studio Vignette / Backlight Blur (Subtle Monochrome) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] max-w-md h-[75%] bg-gradient-to-tr from-white/10 via-white/5 to-transparent rounded-full blur-[90px] opacity-30 pointer-events-none z-0"></div>

        {/* Static Figure Container (No 3D effect) */}
        <div className="relative z-10 flex justify-center items-center">
          <img
            src={centerImage}
            alt="Hero Center Graphic"
            className="w-full max-w-md object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]"
          />
          {/* Bottom Blend Gradient Overlay */}
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent pointer-events-none z-20"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
