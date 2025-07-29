import { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const form = useRef();
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

  useEffect(() => {
    if (PUBLIC_KEY) {
      emailjs.init(PUBLIC_KEY);
    } else {
      console.error('❌ VITE_EMAILJS_PUBLIC_KEY is missing in your .env file.');
    }

    // Intersection Observer for animations
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

            // Animate form
            anime({
              targets: formRef.current,
              opacity: [0, 1],
              translateX: [100, 0],
              duration: 1200,
              delay: 300,
              easing: 'easeOutExpo',
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
  }, [PUBLIC_KEY]);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (value.trim().length > 50) return 'Name must be less than 50 characters';
        return '';

      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!validateEmail(value)) return 'Please enter a valid email address';
        return '';

      case 'title':
        if (!value.trim()) return 'Subject is required';
        if (value.trim().length < 3) return 'Subject must be at least 3 characters';
        if (value.trim().length > 100) return 'Subject must be less than 100 characters';
        return '';

      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        if (value.trim().length > 1000) return 'Message must be less than 1000 characters';
        return '';

      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      title: true,
      message: true
    });

    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Validate form before sending
    if (!validateForm()) {
      setStatus('validation-error');

      // Animate error state
      if (typeof window !== 'undefined' && window.anime) {
        const anime = window.anime;
        anime({
          targets: '.validation-error-message',
          scale: [0, 1],
          opacity: [0, 1],
          duration: 500,
          easing: 'easeOutBack',
        });
      }
      return;
    }

    setStatus('sending');

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(
        () => {
          setStatus('success');
          form.current.reset();
          setFormData({ name: '', email: '', title: '', message: '' });
          setErrors({});
          setTouched({});

          // Success animation
          if (typeof window !== 'undefined' && window.anime) {
            const anime = window.anime;
            anime({
              targets: '.success-message',
              scale: [0, 1],
              opacity: [0, 1],
              duration: 500,
              easing: 'easeOutBack',
            });
          }
        },
        (error) => {
          console.error('EmailJS Error:', error);
          setStatus('error');
        }
      );
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-spacing relative overflow-hidden"
      style={{ opacity: 0 }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-accent-cyan/10 to-accent-violet/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-accent-teal/10 to-accent-light-blue/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container-system relative z-10">
        <div className="grid lg:grid-cols-2 grid-system items-center">
          {/* Contact Info */}
          <div className="content-spacing-large">
            <div className="section-header-spacing">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-teal bg-clip-text text-transparent mb-6 tracking-wide">
                LET'S CONNECT
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-accent-cyan to-accent-violet rounded-full"></div>
            </div>

            <p className="text-primary text-base md:text-lg leading-relaxed max-w-xl mb-8">
              Feel free to reach out to me!
            </p>

            {/* Contact Methods */}
            <div className="content-spacing">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-r from-accent-cyan/20 to-accent-teal/20 border border-accent-cyan/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-text-primary font-medium text-base">Email</p>
                  <p className="text-text-secondary text-sm">catchickalex@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-r from-accent-violet/20 to-accent-cyan/20 border border-accent-violet/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-accent-violet" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </div>
                <div>
                  <p className="text-text-primary font-medium text-base">Twitter</p>
                  <p className="text-text-secondary text-sm">@alexcatchick</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-r from-accent-teal/20 to-accent-light-blue/20 border border-accent-teal/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-accent-teal" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <div>
                  <p className="text-text-primary font-medium text-base">LinkedIn</p>
                  <p className="text-text-secondary text-sm">alex-catchick</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef} className="content-spacing-large" style={{ opacity: 0 }}>
            <div className="card">
              <h3 className="text-xl md:text-2xl font-semibold text-text-primary mb-6">
                Send Message
              </h3>

              <form ref={form} onSubmit={sendEmail} className="content-spacing" noValidate>
                <input type="hidden" name="time" value={new Date().toLocaleString()} />

                <div className="grid md:grid-cols-2 grid-system">
                  <div>
                    <label htmlFor="name" className="block text-text-secondary font-medium mb-2 text-sm">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full ${errors.name && touched.name ? 'border-red-500 focus:border-red-500' : ''}`}
                      placeholder="Name"
                    />
                    {errors.name && touched.name && (
                      <p className="mt-1 text-red-400 text-xs">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-text-secondary font-medium mb-2 text-sm">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full ${errors.email && touched.email ? 'border-red-500 focus:border-red-500' : ''}`}
                      placeholder="mr.robot@fsociety.com"
                    />
                    {errors.email && touched.email && (
                      <p className="mt-1 text-red-400 text-xs">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="title" className="block text-text-secondary font-medium mb-2 text-sm">
                    Subject
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full ${errors.title && touched.title ? 'border-red-500 focus:border-red-500' : ''}`}
                    placeholder="Your concern?"
                  />
                  {errors.title && touched.title && (
                    <p className="mt-1 text-red-400 text-xs">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-text-secondary font-medium mb-2 text-sm">
                    Message
                    <span className="text-xs text-text-secondary ml-2">
                      ({formData.message.length}/1000 characters)
                    </span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full resize-none ${errors.message && touched.message ? 'border-red-500 focus:border-red-500' : ''}`}
                    placeholder="Write your message... (minimum 10 characters)"
                  ></textarea>
                  {errors.message && touched.message && (
                    <p className="mt-1 text-red-400 text-xs">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'TRANSMITTING...' : 'SEND MESSAGE'}
                </button>
              </form>

              {/* Status Messages */}
              {status === 'validation-error' && (
                <div className="validation-error-message mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 font-medium text-sm">
                    ⚠️ Please fill in all required fields correctly before sending.
                  </p>
                </div>
              )}

              {status === 'success' && (
                <div className="success-message mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <p className="text-green-400 font-medium text-sm">
                    ✅ Message transmitted successfully! I'll respond within 24 hours.
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 font-medium text-sm">
                    ❌ Transmission failed. Please check your connection and try again.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
