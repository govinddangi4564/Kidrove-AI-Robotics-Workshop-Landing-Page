import React, { useState, useEffect } from 'react';
import { Bot, Menu, X } from 'lucide-react';

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', target: 'home' },
    { label: 'Workshops', target: 'details' },
    { label: 'Outcomes', target: 'outcomes' },
    { label: 'FAQs', target: 'faq' },
  ];

  const handleNavClick = (target: string) => {
    setIsOpen(false);
    onScrollToSection(target);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-card/90 backdrop-blur-md shadow-md py-4'
          : 'bg-brand-card py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="bg-brand-primary p-2 rounded-xl text-white group-hover:scale-105 transition-transform duration-200 shadow-md shadow-brand-primary/20">
              <Bot className="h-6 w-6" />
            </div>
            <span className="font-display font-black text-2xl tracking-tight text-brand-text">
              Kid<span className="text-brand-primary">rove</span>
              <span className="inline-block h-2 w-2 rounded-full bg-brand-secondary ml-0.5 animate-bounce"></span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.target)}
                className="text-brand-text hover:text-brand-primary font-medium transition-colors duration-200 cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('register')}
              className="bg-brand-primary hover:bg-brand-primary-dark text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-brand-primary/25 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Enroll Now
            </button>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-text hover:text-brand-primary focus:outline-none p-1.5 rounded-lg hover:bg-brand-bg transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute left-0 right-0 bg-brand-card shadow-xl border-t border-brand-bg transition-all duration-300 ease-in-out origin-top ${
          isOpen
            ? 'opacity-100 translate-y-0 scale-y-100 visible'
            : 'opacity-0 -translate-y-4 scale-y-0 invisible h-0'
        }`}
      >
        <div className="px-4 pt-3 pb-6 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.target)}
              className="block w-full text-left px-4 py-2.5 text-brand-text hover:text-brand-primary hover:bg-brand-bg rounded-xl font-medium transition-all duration-200 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 px-4">
            <button
              onClick={() => handleNavClick('register')}
              className="block w-full text-center bg-brand-primary hover:bg-brand-primary-dark text-white py-3 rounded-xl font-semibold shadow-md shadow-brand-primary/20 transition-all duration-200 cursor-pointer"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
