import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiLinkedin, FiMail, FiPhone, FiGlobe } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-base-900 to-base-950 text-base-content/80 border-t border-base-800">
      {/* Main Content */}
      <div className="container mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          
          {/* Brand & Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                <span className="text-white font-black text-2xl italic">V</span>
              </div>
              <span className="text-3xl font-black text-white tracking-tight">
                Veridium
              </span>
            </div>
            <p className="text-base leading-relaxed opacity-80 max-w-xs">
              Empowering businesses with intelligent asset lifecycle management and seamless HR integration.
            </p>
            <div className="flex items-center gap-5">
              <a
                href="#"
                className="text-xl text-base-content/60 hover:text-primary transition-colors duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <FiFacebook />
              </a>
              <a
                href="#"
                className="text-xl text-base-content/60 hover:text-primary transition-colors duration-300 transform hover:scale-110"
                aria-label="Twitter"
              >
                <FiTwitter />
              </a>
              <a
                href="#"
                className="text-xl text-base-content/60 hover:text-primary transition-colors duration-300 transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <FiLinkedin />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 tracking-wide">Product</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition-colors duration-300">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-primary transition-colors duration-300">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-primary transition-colors duration-300">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/join-hr" className="hover:text-primary transition-colors duration-300">
                  For HR Managers
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 tracking-wide">Resources</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/faq" className="hover:text-primary transition-colors duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors duration-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors duration-300">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors duration-300">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 tracking-wide">Get in Touch</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <FiMail className="text-primary" />
                  <span>support@veridium.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <FiPhone className="text-primary" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <FiGlobe className="text-primary" />
                  <span>www.veridium.com</span>
                </li>
              </ul>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-base-800/50 backdrop-blur-sm border border-base-700 rounded-2xl p-6">
              <p className="text-white font-medium mb-3">Stay Updated</p>
              <p className="text-xs opacity-80 mb-4">
                Weekly insights on asset management trends.
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered bg-base-900 border-base-700 text-white placeholder-base-content/50 focus:border-primary w-full"
                />
                <button
                  type="submit"
                  className="btn btn-primary btn-md rounded-lg"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-800 bg-base-950/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <p className="text-base-content/70">
            © {currentYear} Veridium. All rights reserved.
          </p>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-medium text-green-400">System Status: Operational</span>
            </div>

            <div className="flex gap-6 text-base-content/60">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="/cookies" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;