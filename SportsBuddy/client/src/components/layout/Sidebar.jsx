import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  CalendarIcon, 
  UserIcon, 
  CogIcon, 
  LogoutIcon 
} from '@heroicons/react/24/solid';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const sidebarItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: HomeIcon
    },
    {
      name: 'Events',
      path: '/events',
      icon: CalendarIcon
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: UserIcon
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: CogIcon
    }
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    // Implement logout logic
    console.log('Logging out');
  };

  return (
    <div 
      className={`
        fixed top-0 left-0 h-full w-64 
        bg-white dark:bg-gray-800 
        shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        z-50
      `}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Sports Buddy
        </h2>
        <button 
          onClick={toggleSidebar} 
          className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
        >
          {/* Close icon */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`
                  flex items-center p-2 rounded-md transition-colors 
                  ${isActive(item.path) 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }
                `}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t dark:border-gray-700">
        <button 
          onClick={handleLogout}
          className="
            w-full flex items-center justify-center 
            bg-red-500 text-white 
            py-2 rounded-md 
            hover:bg-red-600 
            transition-colors
          "
        >
          <LogoutIcon className="h-5 w-5 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;