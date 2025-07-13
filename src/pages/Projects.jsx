const projects = [
  {
    title: "Heart Disease Predictor",
    description:
      "Built using Python, scikit-learn, and neural networks. Achieved 90%+ accuracy using Random Forest, feature engineering, and hyperparameter tuning.",
    link: "https://github.com/AlexCatchick/HeartDiseasePredictor",
  },
  {
    title: "Hackathon Website (NMIT HACKS 2025)",
    description:
      "Responsive ReactJS + TailwindCSS website for event registration, updates, and schedules. Achieved ~4.35K clicks and ~32.9K impressions.",
    link: "https://github.com/AlexCatchick/nh25",
  },
  {
    title: "Amazon E-commerce Testing",
    description:
      "Automated testing workflows (login, search, cart, checkout) using Java, Selenium WebDriver, Maven, and Eclipse.",
    link: "https://github.com/AlexCatchick/AutomationTesting-Amazon-ecommerce-website",
  },
//   {
//     title: "Portfolio Website (this one!)",
//     description:
//       "Developed using ReactJS, TailwindCSS, React Router, EmailJS, and Animate.css to showcase projects and contact information.",
//     link: "#",
//   },
];

export default function Projects() {
  return (
    <div className="p-10 max-w-4xl mx-auto animate__animated animate__fadeInUp">
      <h2 className="text-3xl font-semibold mb-6">Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">{proj.title}</h3>
            <p className="text-[#004030] mb-4">{proj.description}</p>
            {proj.link && (
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#004030] hover:underline"
              >
                View Project →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
