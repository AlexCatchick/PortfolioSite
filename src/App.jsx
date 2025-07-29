import { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

export default function App() {
  const particlesRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Create custom cursor
    const createCustomCursor = () => {
      const cursor = document.createElement('div');
      cursor.className = 'custom-cursor';
      cursor.ref = cursorRef;
      document.body.appendChild(cursor);
      cursorRef.current = cursor;

      // Mouse move handler
      const handleMouseMove = (e) => {
        if (cursorRef.current) {
          cursorRef.current.style.left = e.clientX + 'px';
          cursorRef.current.style.top = e.clientY + 'px';
        }
      };

      // Mouse enter handler for interactive elements
      const handleMouseEnter = () => {
        if (cursorRef.current) {
          cursorRef.current.classList.add('hover');
        }
      };

      // Mouse leave handler for interactive elements
      const handleMouseLeave = () => {
        if (cursorRef.current) {
          cursorRef.current.classList.remove('hover');
        }
      };

      // Add event listeners
      document.addEventListener('mousemove', handleMouseMove);

      // Add hover effects to interactive elements
      const interactiveElements = document.querySelectorAll('button, a, [data-scroll-to], input, textarea, .card, .project-card');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        interactiveElements.forEach(el => {
          el.removeEventListener('mouseenter', handleMouseEnter);
          el.removeEventListener('mouseleave', handleMouseLeave);
        });
        if (cursorRef.current) {
          document.body.removeChild(cursorRef.current);
        }
      };
    };

    // Create animated particles for background
    const createParticles = () => {
      const particleContainer = particlesRef.current;
      if (!particleContainer) return;

      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 3 + 1}px;
          height: ${Math.random() * 3 + 1}px;
          background: rgba(0, 255, 255, ${Math.random() * 0.6 + 0.2});
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation: float ${Math.random() * 20 + 10}s linear infinite;
          pointer-events: none;
        `;
        particleContainer.appendChild(particle);
      }
    };

    // Smooth scroll behavior for navigation
    const handleSmoothScroll = (e) => {
      if (e.target.closest('[data-scroll-to]')) {
        e.preventDefault();
        const targetId = e.target.closest('[data-scroll-to]').getAttribute('data-scroll-to');
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Initialize everything
    const cleanupCursor = createCustomCursor();
    createParticles();
    document.addEventListener('click', handleSmoothScroll);

    return () => {
      cleanupCursor();
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 overflow-x-hidden">
      {/* Animated Particle Background */}
      <div ref={particlesRef} className="fixed inset-0 z-0 overflow-hidden"></div>

      {/* Cosmic Background Overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Home />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
