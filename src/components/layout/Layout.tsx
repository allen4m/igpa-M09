import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageSquare, Info } from 'lucide-react';

export default function Layout() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleFeedbackClick = () => {
    window.location.href = 'mailto:feedback@internationalgpa.com?subject=Feedback%20for%20InternationalGPA&body=Hello,%0A%0AI%20would%20like%20to%20provide%20feedback%20about%20InternationalGPA:%0A%0A';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <nav className="bg-white shadow-md relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <Link 
                to="/" 
                className="group flex items-center gap-2"
                aria-label="Home"
                onClick={closeMenu}
              >
                <img
                  src="https://cdn.prod.website-files.com/67053ebfd6a29d0b3a664bfb/67c88057e6b97b14317e6b47_iGPA%20Logo.svg"
                  alt="InternationalGPA"
                  className="h-12 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/about"
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full ${
                  location.pathname === '/about'
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  About
                </span>
              </Link>
              <button
                onClick={handleFeedbackClick}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full text-gray-600 hover:bg-gray-100`}
              >
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Feedback
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">
                  {isMenuOpen ? 'Close main menu' : 'Open main menu'}
                </span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${
            isMenuOpen ? 'block' : 'hidden'
          } border-t border-gray-200 bg-white`}
        >
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/about"
              onClick={closeMenu}
              className={`flex items-center gap-3 px-4 py-3 text-base font-medium ${
                location.pathname === '/about'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Info className="w-5 h-5" />
              About
            </Link>
            <button
              onClick={handleFeedbackClick}
              className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 w-full"
            >
              <MessageSquare className="w-5 h-5" />
              Feedback
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} InternationalGPA.com. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}