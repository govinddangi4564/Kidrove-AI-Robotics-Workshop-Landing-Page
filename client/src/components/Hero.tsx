import React, { useState, useEffect } from 'react';
import { WORKSHOP } from '../constants/workshop';
import { CalendarDays, Clock, Laptop, Tag, AlertCircle, Share2, Check } from 'lucide-react';
import heroRobot from '../assets/hero_robotics.png';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToSection }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false
  });
  
  const [shareSuccess, setShareSuccess] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(WORKSHOP.countdownTarget) - +new Date();
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isCompleted: false
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
      // Fallback: Copy link
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } catch (err) {
        console.error('Clipboard copy failed:', err);
      }
    }
  };

  const statItems = [
    { icon: <CalendarDays className="h-6 w-6 text-brand-primary" />, label: 'Age Group', value: WORKSHOP.ageGroup },
    { icon: <Clock className="h-6 w-6 text-brand-secondary" />, label: 'Duration', value: WORKSHOP.duration },
    { icon: <Laptop className="h-6 w-6 text-emerald-500" />, label: 'Learning Mode', value: WORKSHOP.mode },
    { icon: <Tag className="h-6 w-6 text-amber-500" />, label: 'Workshop Fee', value: WORKSHOP.fee },
  ];

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-brand-primary/5 via-brand-bg to-brand-bg">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-20 left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-primary/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-[-10%] w-[40vw] h-[40vw] rounded-full bg-brand-secondary/10 blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8 text-left animate-fade-in-up">
            
            {/* Urgency Badge */}
            <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-full shadow-sm">
              <AlertCircle className="h-5 w-5 text-amber-600 animate-pulse" />
              <span className="font-semibold text-sm">
                Only {WORKSHOP.spotsLeft} spots left for the July batch!
              </span>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-brand-text leading-tight">
                {WORKSHOP.title}
              </h1>
              <p className="text-xl text-brand-muted max-w-2xl font-normal leading-relaxed">
                Join our hands-on AI & Robotics Summer Workshop designed for curious minds aged 8–14.
                Over 4 exciting weeks, your child will build robots, explore artificial intelligence,
                and develop problem-solving skills — all from home, live with expert mentors.
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="bg-brand-card p-6 rounded-2xl border border-slate-100 shadow-xl max-w-lg">
              <p className="text-sm font-semibold text-brand-muted mb-4 uppercase tracking-wider">
                {timeLeft.isCompleted ? 'Workshop Started' : 'Admissions Closing In:'}
              </p>
              
              {!timeLeft.isCompleted ? (
                <div className="grid grid-cols-4 gap-3 text-center">
                  {[
                    { val: timeLeft.days, label: 'Days' },
                    { val: timeLeft.hours, label: 'Hours' },
                    { val: timeLeft.minutes, label: 'Mins' },
                    { val: timeLeft.seconds, label: 'Secs' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col bg-brand-bg rounded-xl p-3 border border-slate-100">
                      <span className="font-display font-extrabold text-2xl sm:text-3xl text-brand-primary tabular-nums">
                        {String(item.val).padStart(2, '0')}
                      </span>
                      <span className="text-xs font-medium text-brand-muted mt-1">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-2 font-display font-bold text-xl text-brand-primary">
                  Class Starts Today!
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md">
              <button
                onClick={() => onScrollToSection('register')}
                className="bg-brand-primary hover:bg-brand-primary-dark text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 hover:shadow-xl hover:shadow-brand-primary/25 cursor-pointer transform hover:-translate-y-0.5 text-center flex justify-center items-center"
              >
                Enroll Now →
              </button>
              
              <button
                onClick={() => onScrollToSection('details')}
                className="bg-white hover:bg-brand-bg border-2 border-slate-200 text-brand-text px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 text-center"
              >
                Learn More
              </button>

              <button
                onClick={handleShare}
                className={`flex items-center justify-center space-x-2 border border-slate-200 px-5 py-4 rounded-2xl font-semibold transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 bg-white hover:bg-brand-bg ${
                  shareSuccess ? 'text-brand-success border-brand-success bg-emerald-50/20' : 'text-brand-muted'
                }`}
              >
                {shareSuccess ? (
                  <>
                    <Check className="h-5 w-5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Hero Right Media */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center animate-fade-in-up animation-delay-200">
            <div className="relative w-full max-w-[420px] aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-brand-primary/10 border-4 border-white bg-white group hover:scale-[1.02] transition-transform duration-300">
              <img
                src={heroRobot}
                alt="AI & Robotics Summer Workshop for children aged 8-14"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-text/30 to-transparent pointer-events-none"></div>
            </div>
            
            {/* Visual floaters for aesthetic excellence */}
            <div className="absolute top-10 left-4 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-lg border border-slate-100 flex items-center space-x-2 animate-bounce animation-delay-400">
              <div className="h-3 w-3 rounded-full bg-brand-primary"></div>
              <span className="text-xs font-bold text-brand-text">Coding Block Kits</span>
            </div>
            <div className="absolute bottom-10 right-4 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-lg border border-slate-100 flex items-center space-x-2 animate-bounce animation-delay-200">
              <div className="h-3 w-3 rounded-full bg-brand-secondary"></div>
              <span className="text-xs font-bold text-brand-text">AI Smart Models</span>
            </div>
          </div>

        </div>

        {/* Stats Row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-fade-in-up animation-delay-300">
          {statItems.map((stat, index) => (
            <div
              key={index}
              className="bg-brand-card p-6 rounded-2xl border border-slate-100 shadow-md flex flex-col items-center md:items-start text-center md:text-left hover:shadow-lg hover:border-slate-200 transition-all duration-200 group"
            >
              <div className="p-3 bg-brand-bg rounded-xl mb-3 group-hover:scale-110 transition-transform duration-200">
                {stat.icon}
              </div>
              <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
                {stat.label}
              </span>
              <span className="font-display font-bold text-lg text-brand-text mt-1">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
