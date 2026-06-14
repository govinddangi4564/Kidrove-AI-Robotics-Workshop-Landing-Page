import React, { useState } from 'react';
import { WORKSHOP } from '../constants/workshop';
import { Bot, Mail, Share2, Check } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection }) => {
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: WORKSHOP.title,
      text: `${WORKSHOP.title} - ${WORKSHOP.tagline} Starting ${WORKSHOP.startDate}. Enroll now!`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } catch (err) {
        console.error('Clipboard copy failed:', err);
      }
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start">
          
          {/* Column 1: Logo and Tagline */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onScrollToSection('home')}>
              <div className="bg-brand-primary p-2 rounded-xl text-white shadow-md shadow-brand-primary/10">
                <Bot className="h-6 w-6" />
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-white">
                Kid<span className="text-brand-primary">rove</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Kidrove provides hands-on, expert-led artificial intelligence and robotics courses that turn screen time into build time for children aged 8–14.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-4 text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Home', target: 'home' },
                { label: 'Workshop Details', target: 'details' },
                { label: 'What You Learn', target: 'outcomes' },
                { label: 'FAQs', target: 'faq' },
                { label: 'Reserve Spot', target: 'register' }
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onScrollToSection(link.target)}
                    className="hover:text-brand-primary transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact and Share */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Get in Touch
            </h4>
            <div className="flex items-center space-x-2.5 text-sm">
              <Mail className="h-5 w-5 text-brand-primary shrink-0" />
              <a href="mailto:hello@kidrove.com" className="hover:text-brand-primary transition-colors font-medium">
                hello@kidrove.com
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={handleShare}
                className={`flex items-center space-x-2 text-sm border px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 cursor-pointer ${
                  shareSuccess
                    ? 'text-brand-success border-brand-success bg-emerald-950/20'
                    : 'border-slate-700 hover:border-brand-primary hover:text-white bg-slate-800 text-slate-300'
                }`}
              >
                {shareSuccess ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied URL!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4" />
                    <span>Share This Workshop</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-10"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Kidrove. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
