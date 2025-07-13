import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <nav className="bg-[#004030] shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-5">
        <h1 className="text-xl font-bold text-[#fff] mr-10 ml-10">Alex Catchick</h1>
        <ul className="flex gap-10  text-[#fff]">
          <li><Link to="/" className="hover:text-[#DCD0A8] px-2 py-1">Home</Link></li>
          <li><Link to="/about" className="hover:text-[#DCD0A8] px-2 py-1">About</Link></li>
          <li><Link to="/projects" className="hover:text-[#DCD0A8] px-2 py-1">Projects</Link></li>
          <li><Link to="/contact" className="hover:text-[#DCD0A8] px-2 py-1">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}
