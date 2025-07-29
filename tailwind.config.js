// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Deep Blue Theme
        'primary-dark': '#0A192F',
        'primary-blue': '#112240',
        'primary-indigo': '#1E293B',
        'midnight-blue': '#0F172A',

        // Accent Colors
        'accent-cyan': '#64FFDA',
        'accent-teal': '#2DD4BF',
        'accent-violet': '#8B5CF6',
        'accent-light-blue': '#38BDF8',

        // Text Colors
        'text-primary': '#E2E8F0',
        'text-secondary': '#94A3B8',
        'text-accent': '#64FFDA',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0A192F 0%, #112240 25%, #1E293B 50%, #0F172A 100%)',
        'gradient-accent': 'linear-gradient(135deg, #64FFDA, #8B5CF6)',
        'gradient-button': 'linear-gradient(135deg, #2DD4BF, #8B5CF6)',
        'gradient-hover': 'linear-gradient(135deg, #8B5CF6, #64FFDA)',
      },
      backdropBlur: {
        '25': '25px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.2)',
        'glass-hover': '0 20px 40px rgba(0, 0, 0, 0.3)',
        'project': '0 25px 50px rgba(0, 0, 0, 0.4)',
        'btn-primary': '0 4px 15px rgba(45, 212, 191, 0.3)',
        'btn-hover': '0 8px 25px rgba(45, 212, 191, 0.4)',
        'glow': '0 0 20px rgba(100, 255, 218, 0.5)',
      },
      animation: {
        'float': 'float 20s ease-in-out infinite',
        'fadeInUp': 'fadeInUp 0.8s ease forwards',
        'slideInLeft': 'slideInLeft 0.8s ease forwards',
        'slideInRight': 'slideInRight 0.8s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        fadeInUp: {
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInLeft: {
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideInRight: {
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        'orbitron': ['Orbitron', 'monospace'],
        'rajdhani': ['Rajdhani', 'sans-serif'],
        'audiowide': ['Audiowide', 'cursive'],
        'michroma': ['Michroma', 'sans-serif'],
        'share-tech-mono': ['Share Tech Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
