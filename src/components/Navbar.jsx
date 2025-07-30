import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuItemClick = (target) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { name: 'Home', target: 'home' },
    { name: 'About', target: 'about' },
    { name: 'Skills', target: 'skills' },
    { name: 'Projects', target: 'projects' },
    { name: 'Contact', target: 'contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-xl border-b border-accent-cyan/20 shadow-2xl z-40' : 'bg-transparent z-30'}`}
      >
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20 w-full">
            {/* Logo / Title */}
            <div className="lg:w-1/5 md:w-1/5 flex-shrink-0">
              <h3 className="text-center lg:text-2xl md:text-2xl text-sm font-bold text-gradient tracking-widest">
                ALEX.CATCHICK
              </h3>
            </div>

            {/* Desktop Navigation Links */}
            <ul className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleMenuItemClick(item.target)}
                    className="nav-link text-base lg:text-lg"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white hover:text-accent-cyan transition"
                aria-label="Toggle mobile menu"
              >
                <svg
                  className={`w-6 h-6 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-md z-50 transition-opacity duration-300 md:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-slate-900/95 backdrop-blur-xl border-l border-accent-cyan/20 shadow-2xl z-60 transform transition-transform duration-300 ease-in-out md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-accent-cyan/20">
          <h2 className="text-xl font-bold text-white tracking-wider">
            <span className="text-accent-cyan">MENU</span>
          </h2>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-accent-cyan transition-colors duration-300 p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="p-6">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={item.name}>
                <button
                  onClick={() => handleMenuItemClick(item.target)}
                  className="w-full text-left py-4 px-4 text-white font-medium text-lg tracking-wide transition-all duration-300 hover:text-accent-cyan hover:bg-accent-cyan/10 rounded-lg border border-transparent hover:border-accent-cyan/20 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="flex items-center justify-between">
                    {item.name}
                    <svg
                      className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="text-center text-accent-cyan/60 text-sm">
            © 2025 Alex Catchick
          </div>
        </div>
      </div>
    </>
  );
}
