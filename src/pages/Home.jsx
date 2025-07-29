import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const [typedSubtitle, setTypedSubtitle] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const nameText = 'ALEX CATCHICK';
  const subtitleText = 'ASPIRING FULL STACK DEVELOPER';

  useEffect(() => {
    // Typing effect for name
    const typeEffect = () => {
      let i = 0;
      const nameTyping = setInterval(() => {
        if (i < nameText.length) {
          setTypedText(nameText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(nameTyping);
          // Start subtitle typing after name is complete
          setTimeout(() => {
            let j = 0;
            const subtitleTyping = setInterval(() => {
              if (j < subtitleText.length) {
                setTypedSubtitle(subtitleText.slice(0, j + 1));
                j++;
              } else {
                clearInterval(subtitleTyping);
                // Stop cursor blinking after typing is complete
                setTimeout(() => setShowCursor(false), 2000);
              }
            }, 80); // Subtitle typing speed
          }, 500); // Delay before subtitle starts
        }
      }, 100); // Name typing speed
    };

    // Start typing effect after initial delay
    setTimeout(typeEffect, 1000);

    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    // Animate hero elements on load
    if (typeof window !== 'undefined' && window.anime) {
      const anime = window.anime;

      // Hero section fade in
      anime({
        targets: heroRef.current,
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo',
      });

      // Animate other elements after typing
      setTimeout(() => {
        anime({
          targets: ctaRef.current,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 800,
          easing: 'easeOutExpo',
        });
      }, 3500); // Start after typing completes
    }

    return () => {
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden section-spacing"
      style={{ opacity: 0 }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-gradient-to-r from-accent-cyan/20 to-accent-violet/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/6 w-48 h-48 bg-gradient-to-r from-accent-violet/20 to-accent-teal/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-accent-teal/20 to-accent-light-blue/20 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <div className="container-system text-center relative z-10">
        {/* Main Title with Typing Effect */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider uppercase mb-8"
        >
          <span
            className="block font-orbitron bg-gradient-to-r from-white via-accent-cyan to-accent-violet bg-clip-text text-transparent leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 2.5rem)' }}
          >
            {typedText}
            {showCursor && typedText.length < nameText.length && (
              <span className="animate-pulse">|</span>
            )}
          </span>
        </h1>

        {/* Subtitle with Typing Effect */}
        <div
          ref={subtitleRef}
          className="mb-12 content-spacing-large"
        >
          <p className="text-3xl md:text-4xl lg:text-5xl text-text-primary font-rajdhani font-light tracking-wide mb-6" style={{ fontSize: 'clamp(1.375rem, 3vw, 0.3rem)' }}>
            {typedSubtitle}
            {showCursor && typedSubtitle.length < subtitleText.length && typedText.length >= nameText.length && (
              <span className="animate-pulse">|</span>
            )}
          </p>
          <p className="text-lg md:text-xl lg:text-2xl text-text-primary max-w-3xl mx-auto leading-relaxed">
            Computer Science Student @NMIT | Bangalore
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-accent-cyan to-accent-violet mx-auto rounded-full mb-6"></div>
        </div>

        {/* Call to Action */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center opacity-0"
          style={{ opacity: 0 }}
        >
          <button
            data-scroll-to="projects"
            className="btn btn-primary transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-accent-cyan/25"
          >
            EXPLORE PROJECTS
          </button>

          <button
            data-scroll-to="contact"
            className="btn btn-outline transform hover:scale-105 transition-all duration-300"
          >
            GET IN TOUCH
          </button>
        </div>
      </div>

      {/* Scroll Indicator - Positioned at section bottom */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-accent-cyan/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent-cyan rounded-full animate-ping"></div>
        </div>
      </div>
    </section>
  );
}
