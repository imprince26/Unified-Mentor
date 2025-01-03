import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: 'fab fa-facebook', 
      url: 'https://facebook.com' 
    },
    { 
      name: 'Twitter', 
      icon: 'fab fa-twitter', 
      url: 'https://twitter.com' 
    },
    { 
      name: 'Instagram', 
      icon: 'fab fa-instagram', 
      url: 'https://instagram.com' 
    }
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white py-10">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            Sports Buddy
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Connect, Play, Compete. Your ultimate sports community platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {currentYear} Sports Buddy. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;