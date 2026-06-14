import React from 'react';
import { WORKSHOP } from '../constants/workshop';
import { Users, Clock, Laptop, Tag, Calendar } from 'lucide-react';

export const WorkshopDetails: React.FC = () => {
  const details = [
    {
      icon: <Users className="h-7 w-7 text-brand-primary" />,
      title: "Age Group",
      value: WORKSHOP.ageGroup,
      bgClass: "bg-brand-primary/5 border-brand-primary/10",
      highlightText: "Perfect for budding creators",
      points: ["Structured for beginners", "Age-appropriate group cohorts", "Kid-safe online sandbox"]
    },
    {
      icon: <Clock className="h-7 w-7 text-brand-secondary" />,
      title: "Duration",
      value: WORKSHOP.duration,
      bgClass: "bg-brand-secondary/5 border-brand-secondary/10",
      highlightText: "Comprehensive & engaging",
      points: ["12 interactive sessions", "Live coding + hands-on building", "Flexibility for vacation schedules"]
    },
    {
      icon: <Laptop className="h-7 w-7 text-emerald-500" />,
      title: "Workshop Mode",
      value: WORKSHOP.mode,
      bgClass: "bg-emerald-50 border-emerald-100",
      highlightText: "Learn from home",
      points: ["Live interaction with mentors", "Doubt solving sessions", "Access recordings for 60 days"]
    },
    {
      icon: <Tag className="h-7 w-7 text-amber-500" />,
      title: "Workshop Fee",
      value: WORKSHOP.fee,
      bgClass: "bg-amber-50 border-amber-100",
      highlightText: "Affordable premium education",
      points: ["All digital kits included", "Certificate fees covered", "No hidden subscriptions"]
    },
    {
      icon: <Calendar className="h-7 w-7 text-sky-500" />,
      title: "Start Date",
      value: WORKSHOP.startDate,
      bgClass: "bg-sky-50 border-sky-100",
      highlightText: "Limited seats available",
      points: ["Starts 15 July 2026", "Weekend & weekday batches", "Pre-workshop setup guide sent"]
    }
  ];

  return (
    <section id="details" className="reveal py-16 md:py-24 bg-white border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-text">
            What's Included in the Course?
          </h2>
          <p className="text-brand-muted text-lg font-normal">
            A premium full-stack summer learning program crafted by education experts.
          </p>
          <div className="h-1 w-20 bg-brand-primary mx-auto rounded-full"></div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {details.map((detail, index) => (
            <div
              key={index}
              className={`p-8 rounded-3xl border shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${detail.bgClass} flex flex-col justify-between`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                    {detail.icon}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">
                      {detail.title}
                    </span>
                    <h3 className="font-display font-bold text-xl text-brand-text mt-0.5">
                      {detail.value}
                    </h3>
                  </div>
                </div>

                {/* Subtext */}
                <p className="text-sm font-semibold text-brand-primary/80 mb-6 bg-white/70 inline-block px-3 py-1 rounded-full">
                  {detail.highlightText}
                </p>

                {/* Bullet Points */}
                <ul className="space-y-3">
                  {detail.points.map((pt, i) => (
                    <li key={i} className="flex items-start text-sm text-brand-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-text/30 mt-2 mr-2 shrink-0"></span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
