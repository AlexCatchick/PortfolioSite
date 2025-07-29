import { useEffect, useRef } from 'react';

export default function About() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const skillsRef = useRef([]);

  const skills = [
    { name: 'JavaScript', level: 90, icon: '⚡' },
    { name: 'React', level: 85, icon: '⚛️' },
    { name: 'Java', level: 88, icon: '☕' },
    { name: 'Python', level: 82, icon: '🐍' },
    { name: 'Node.js', level: 80, icon: '🟢' },
    { name: 'CSS', level: 92, icon: '🎨' },
    { name: 'Git/GitHub', level: 85, icon: '📋' },
    { name: 'MongoDB', level: 75, icon: '🍃' },
    { name: 'Selenium', level: 78, icon: '🕸️' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && typeof window !== 'undefined' && window.anime) {
            const anime = window.anime;

            // Animate section entrance
            anime({
              targets: sectionRef.current,
              opacity: [0, 1],
              translateY: [50, 0],
              duration: 1000,
              easing: 'easeOutExpo',
            });

            // Animate content
            anime({
              targets: contentRef.current,
              opacity: [0, 1],
              translateX: [-100, 0],
              duration: 1200,
              delay: 300,
              easing: 'easeOutExpo',
            });

            // Animate skills with stagger
            anime({
              targets: skillsRef.current,
              opacity: [0, 1],
              translateY: [50, 0],
              scale: [0.8, 1],
              duration: 800,
              delay: anime.stagger(100, { start: 600 }),
              easing: 'easeOutBack',
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-spacing relative overflow-hidden"
      style={{ opacity: 0 }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-accent-violet/10 to-accent-cyan/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/6 w-48 h-48 bg-gradient-to-r from-accent-teal/10 to-accent-light-blue/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container-system relative z-10">
        <div className="grid lg:grid-cols-2 grid-system items-center">
          {/* Content Section */}
          <div ref={contentRef} className="content-spacing-large" style={{ opacity: 0 }}>
            <div className="section-header-spacing">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-teal bg-clip-text text-transparent mb-6 tracking-wide">
                ABOUT ME
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-accent-cyan to-accent-violet rounded-full"></div>
            </div>

            <div className="content-spacing text-base md:text-lg leading-relaxed text-primary">
              <p>
                I'm a Computer Science student at NMIT, passionate about building impactful digital solutions. My curiosity drives me to explore systems deeply and create tech that bridges ideas with real-world applications.
              </p>

              <p>
                I specialize in full-stack development, DSA, and automation. With hands-on experience in React, TailwindCSS, Node.js, and Selenium, I enjoy crafting responsive UIs, robust backends, and solving real-world challenges through code.
              </p>

              <p>
                Beyond development, I learn from tutorials or read articles/docs, and lead hackathon initiatives—mentoring peers and staying active in the evolving tech space.
              </p>

            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <span className="w-1/7  px-4 py-1 text-center bg-gradient-to-r from-accent-cyan/20 to-accent-teal/20 border border-accent-cyan/30 rounded-lg text-accent-cyan font-medium text-sm">
                Problem Solver
              </span>
              <span className="w-1/8 text-center px-9 py-2 bg-gradient-to-r from-accent-violet/20 to-accent-cyan/20 border border-accent-violet/30 rounded-lg text-accent-violet font-medium text-sm">
                Learner
              </span>
              <span className="w-1/7 text-center  px-4 py-2 bg-gradient-to-r from-accent-teal/20 to-accent-light-blue/20 border border-accent-teal/30 rounded-lg text-accent-teal font-medium text-sm">
                Tech Enthusiast
              </span>
            </div>
          </div>

          {/* Skills Section */}
          <div id="skills" className="content-spacing-large">
            <h3 className="text-xl md:text-2xl font-semibold text-text-primary mb-8 text-center lg:text-left">
              TECHNICAL XPs
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 grid-system">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  ref={(el) => (skillsRef.current[index] = el)}
                  className="card group cursor-pointer transition-all duration-300"
                  style={{ opacity: 0 }}
                >
                  <div className="text-center content-spacing">
                    <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>
                    <h4 className="text-text-primary font-semibold text-lg">
                      {skill.name}
                    </h4>

                    {/* Skill Level Bar */}
                    <div className="relative">
                      {/* <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-accent-cyan to-accent-violet h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-text-secondary mt-2 block">
                        {skill.level}%
                      </span> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 grid-system">
          {[
            { number: '20+', label: 'Leadership' },
            { number: '3+', label: 'Communication' },
            { number: '10+', label: 'Teamwork' },
            { number: '100%', label: 'Dedication' },
          ].map((stat, index) => (
            <div key={index} className="text-center content-spacing">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent-cyan to-accent-violet bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-text-secondary text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
