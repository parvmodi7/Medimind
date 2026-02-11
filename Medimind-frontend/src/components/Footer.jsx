import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white text-black border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM18 14H14V18H10V14H6V10H10V6H14V10H18V14Z" />
              </svg>
              <span className="text-2xl font-bold tracking-tight">MediMind</span>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm">
              Empowering your health journey with comprehensive medical services, advanced mood tracking, and trusted professional connections.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all duration-300">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b-2 border-black inline-block pb-1">Services</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black hover:pl-2 transition-all duration-300">Find Doctors</a></li>
              <li><a href="#" className="hover:text-black hover:pl-2 transition-all duration-300">Symptom Checker</a></li>
              <li><a href="#" className="hover:text-black hover:pl-2 transition-all duration-300">Health Plans</a></li>
              <li><a href="#" className="hover:text-black hover:pl-2 transition-all duration-300">Pill Identifier</a></li>
              <li><a href="#" className="hover:text-black hover:pl-2 transition-all duration-300">Organ Donation</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b-2 border-black inline-block pb-1">Company</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black hover:pl-2 transition-all duration-300">About Us</a></li>
              <li><a href="#" className="hover:text-black hover:pl-2 transition-all duration-300">Careers</a></li>
              <li><a href="#" className="hover:text-black hover:pl-2 transition-all duration-300">Blog</a></li>
              <li><a href="#" className="hover:text-black hover:pl-2 transition-all duration-300">Press</a></li>
              <li><a href="#" className="hover:text-black hover:pl-2 transition-all duration-300">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b-2 border-black inline-block pb-1">Contact</h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-black" />
                <span>123 Medical Center Dr,<br />Healthcare City, HC 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0 text-black" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="flex-shrink-0 text-black" />
                <span>contact@medimind.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} MediMind. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-black transition-colors">Terms</a>
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;