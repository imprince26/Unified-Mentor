import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const { isDarkMode } = useTheme();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Login', path: '/login' },
    { name: 'Register', path: '/register' }
  ];

  return (
    <header className={`py-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Sports Buddy
        </div>
        <ul className="flex space-x-6">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`
                  hover:text-blue-600 transition-colors
                  ${isDarkMode 
                    ? 'text-white hover:text-blue-400' 
                    : 'text-gray-800 hover:text-blue-600'
                  }
                `}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;