import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

type NavbarProps = {
  activeTab: 'gpa' | 'finder';
  onTabChange: (tab: 'gpa' | 'finder') => void;
};

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
  return (
    <nav className="bg-white shadow-md relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/" 
              className="group relative overflow-hidden"
              aria-label="Home"
            >
              <img
                src="https://cdn.prod.website-files.com/673d04a68c435af83c59b97a/67520579b527ce80e7018409_1Admission%20Horizontal%20v6b.svg"
                alt="iGPA"
                className="h-10 w-auto transform transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-lg ring-2 ring-indigo-500/0 transition-all duration-300 group-hover:ring-indigo-500/20" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:space-x-8 sm:items-center">
            <Link
              to="/"
              onClick={() => onTabChange('gpa')}
              className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200
                ${activeTab === 'gpa' 
                  ? 'text-indigo-600' 
                  : 'text-gray-500 hover:text-gray-900'
                }`}
            >
              GPA Calculator
              {activeTab === 'gpa' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform origin-left transition-transform duration-200" />
              )}
            </Link>
            <Link
              to="/blog"
              onClick={() => onTabChange('finder')}
              className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200
                ${activeTab === 'finder'
                  ? 'text-indigo-600'
                  : 'text-gray-500 hover:text-gray-900'
                }`}
            >
              Blog
              {activeTab === 'finder' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform origin-left transition-transform duration-200" />
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            onClick={() => onTabChange('gpa')}
            className={`block px-3 py-2 text-base font-medium ${
              activeTab === 'gpa'
                ? 'text-indigo-600 bg-indigo-50'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            GPA Calculator
          </Link>
          <Link
            to="/blog"
            onClick={() => onTabChange('finder')}
            className={`block px-3 py-2 text-base font-medium ${
              activeTab === 'finder'
                ? 'text-indigo-600 bg-indigo-50'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
}