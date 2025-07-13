import { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const form = useRef();
  const [status, setStatus] = useState(null);

  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

  useEffect(() => {
    if (PUBLIC_KEY) {
      emailjs.init(PUBLIC_KEY);
    } else {
      console.error('❌ VITE_EMAILJS_PUBLIC_KEY is missing in your .env file.');
    }
  }, [PUBLIC_KEY]);
  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    emailjs
      .sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        form.current,
        PUBLIC_KEY
      )
      .then(
        () => {
          setStatus('success');
          form.current.reset();
        },
        (error) => {
          console.error('EmailJS Error:', error);
          setStatus('error');
        }
      );
  };


  return (
    <div className="p-10 max-w-xl mx-auto animate__animated animate__fadeIn">
      <h2 className="text-3xl font-semibold mb-4">Contact Me</h2>
      <p className="mb-6 text-gray-600">
        I'd love to hear from you! Fill out the form below and I'll get back to you as soon as I can.
      </p>

      <form ref={form} onSubmit={sendEmail} className="space-y-4" noValidate>
        {/* Hidden field for timestamp */}
        <input type="hidden" name="time" value={new Date().toLocaleString()} />

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 block w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Subject</label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="mt-1 block w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            className="mt-1 block w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-green-800 text-white px-6 py-2 rounded hover:bg-green-900 transition"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {status === 'success' && (
        <p className="mt-4 text-green-700">✅ Your message has been sent successfully!</p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-red-600">❌ Something went wrong. Please try again later.</p>
      )}
    </div>
  );
}
