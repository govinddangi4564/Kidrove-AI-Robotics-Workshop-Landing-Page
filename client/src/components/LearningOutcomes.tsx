import React from 'react';
import { Cpu, Brain, Terminal, Users, Trophy, Award, CheckCircle } from 'lucide-react';

export const LearningOutcomes: React.FC = () => {
  const outcomes = [
    {
      icon: <Cpu className="h-7 w-7 text-brand-primary" />,
      title: "Block-Based Coding",
      description: "Build and program interactive robots. Kids learn variables, loops, and logic blocks easily.",
      bg: "bg-blue-50/50 border-blue-100"
    },
    {
      icon: <Brain className="h-7 w-7 text-brand-secondary" />,
      title: "AI Concepts",
      description: "Understand machine learning models, training data, and pattern recognition systems.",
      bg: "bg-coral-50/10 border-brand-secondary/10"
    },
    {
      icon: <Terminal className="h-7 w-7 text-emerald-500" />,
      title: "Computational Thinking",
      description: "Deconstruct complex problems, spot patterns, and design systematic algorithms.",
      bg: "bg-emerald-50/50 border-emerald-100"
    },
    {
      icon: <Users className="h-7 w-7 text-indigo-500" />,
      title: "Peer Collaboration",
      description: "Work on exciting class-wide tasks and build strong connections with peers across India.",
      bg: "bg-indigo-50/50 border-indigo-100"
    },
    {
      icon: <Trophy className="h-7 w-7 text-amber-500" />,
      title: "Project Showcase",
      description: "Design and build a custom project. Present it to parents and receive expert mentor feedback.",
      bg: "bg-amber-50/50 border-amber-100"
    },
    {
      icon: <Award className="h-7 w-7 text-sky-500" />,
      title: "Kidrove Certificate",
      description: "Earn a certified course completion credential validating their achievements.",
      bg: "bg-sky-50/50 border-sky-100"
    }
  ];

  return (
    <section id="outcomes" className="reveal py-16 md:py-24 bg-brand-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-text">
            What Your Child Will Learn
          </h2>
          <p className="text-brand-muted text-lg font-normal">
            Equipping children with future-ready skills through hands-on, live-action projects.
          </p>
          <div className="h-1 w-20 bg-brand-primary mx-auto rounded-full"></div>
        </div>

        {/* Outcomes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {outcomes.map((outcome, index) => (
            <div
              key={index}
              className={`p-6 rounded-3xl border bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex flex-col items-start text-left relative group overflow-hidden ${outcome.bg}`}
            >
              {/* Top border decoration */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex items-center justify-between w-full mb-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                  {outcome.icon}
                </div>
                <CheckCircle className="h-6 w-6 text-brand-success/80 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>

              <h3 className="font-display font-bold text-lg text-brand-text mb-2 flex items-center">
                {outcome.title}
              </h3>
              
              <p className="text-sm text-brand-muted leading-relaxed">
                {outcome.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
