import { useEffect, useRef } from 'react';

const projects = [
  {
    title: "Heart Disease Predictor",
    description:
      "Built using Python, scikit-learn, and neural networks. Achieved 90%+ accuracy using Random Forest, feature engineering, and hyperparameter tuning.",
    techStack: ["Python", "Scikit-learn", "Neural Networks", "Random Forest"],
    link: "https://github.com/AlexCatchick/HeartDiseasePredictor",
    demoLink: null,
  },
  {
    title: "Hackathon Website (NMIT HACKS 2025)",
    description:
      "Responsive ReactJS + TailwindCSS website for event registration, updates, and schedules. Achieved ~4.35K clicks and ~32.9K impressions.",
    techStack: ["ReactJS", "TailwindCSS", "JavaScript", "Responsive Design"],
    link: "https://github.com/AlexCatchick/nh25",
    demoLink: null,
  },
  {
    title: "Amazon E-commerce Testing",
    description:
      "Automated testing workflows (login, search, cart, checkout) using Java, Selenium WebDriver, Maven, and Eclipse.",
    techStack: ["Java", "Selenium WebDriver", "Maven", "Eclipse"],
    link: "https://github.com/AlexCatchick/AutomationTesting-Amazon-ecommerce-website",
    demoLink: null,
  },
  {
    title: "Portfolio Website",
    description:
      "Futuristic space-themed portfolio built with ReactJS, TailwindCSS, React Router, EmailJS, and Anime.js featuring smooth animations and responsive design.",
    techStack: ["ReactJS", "TailwindCSS", "Anime.js", "EmailJS"],
    link: "https://github.com/AlexCatchick/PortfolioSite",
    demoLink: "#",
  },
];

export default function Projects() {
  const projectsRef = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Check if anime is available from CDN
    if (typeof window !== 'undefined' && window.anime) {
      const anime = window.anime;

      // Animate section entrance
      anime({
        targets: sectionRef.current,
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1000,
        easing: 'easeOutExpo',
      });

      // Animate project cards with staggered entrance
      anime({
        targets: projectsRef.current,
        opacity: [0, 1],
        translateY: [100, 0],
        scale: [0.8, 1],
        duration: 800,
        delay: anime.stagger(200),
        easing: 'easeOutBack',
      });

      // Add draggable functionality to project cards
      projectsRef.current.forEach((card, index) => {
        if (card) {
          let isDragging = false;
          let startX, startY, initialX, initialY;

          const handleMouseDown = (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            const rect = card.getBoundingClientRect();
            initialX = rect.left;
            initialY = rect.top;
            card.style.cursor = 'grabbing';
            card.style.zIndex = '1000';
          };

          const handleMouseMove = (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            anime({
              targets: card,
              translateX: deltaX,
              translateY: deltaY,
              duration: 0,
            });
          };

          const handleMouseUp = () => {
            if (!isDragging) return;
            isDragging = false;
            card.style.cursor = 'grab';
            card.style.zIndex = 'auto';

            // Bounce back to original position
            anime({
              targets: card,
              translateX: 0,
              translateY: 0,
              duration: 600,
              easing: 'easeOutElastic(1, .6)',
            });
          };

          card.addEventListener('mousedown', handleMouseDown);
          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);

          // Add hover animations
          card.addEventListener('mouseenter', () => {
            if (!isDragging) {
              anime({
                targets: card,
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
                duration: 300,
                easing: 'easeOutQuad',
              });
            }
          });

          card.addEventListener('mouseleave', () => {
            if (!isDragging) {
              anime({
                targets: card,
                scale: 1,
                rotateY: 0,
                rotateX: 0,
                duration: 300,
                easing: 'easeOutQuad',
              });
            }
          });
        }
      });
    } else {
      console.warn('Anime.js not loaded from CDN');
    }
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-spacing bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 relative overflow-hidden"
      style={{ opacity: 0 }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent-cyan rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-accent-violet rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-accent-teal rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/6 w-1 h-1 bg-accent-light-blue rounded-full animate-pulse"></div>
      </div>

      <div className="container-system relative z-10">
        {/* Section Title */}
        <div className="flex flex-col items-center justify-center text-center section-header-spacing">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-teal bg-clip-text text-transparent mb-6 tracking-wide">
            PROJECTS
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-accent-cyan to-accent-violet rounded-full mb-6"></div>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Explore my latest creations in the digital realm
          </p>
        </div>
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 grid-system">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => (projectsRef.current[index] = el)}
              className="project-card group cursor-grab hover:border-accent-violet/40 transition-all duration-300"
              style={{ opacity: 0 }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/5 via-transparent to-accent-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

              {/* Content */}
              <div className="relative z-10 content-spacing-large flex flex-col items-center text-center">
                {/* Project Title */}
                <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-accent-cyan transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-sm bg-gradient-to-r from-accent-cyan/20 to-accent-violet/20 border border-accent-cyan/30 rounded-lg text-accent-cyan font-medium hover:bg-accent-cyan/30 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary inline-flex items-center justify-center shadow-lg hover:shadow-accent-cyan/25"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                      </svg>
                      Code
                    </a>
                  )}
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline inline-flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent-cyan/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 content-spacing-large">
          <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-6">
            Want to see more? Check out my GitHub for additional projects and contributions.
          </p>
          <a
            href="https://github.com/AlexCatchick"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary inline-flex items-center shadow-2xl hover:shadow-accent-violet/25"
          >
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            Explore All Projects
          </a>
        </div>
      </div>
    </section>
  );
}
