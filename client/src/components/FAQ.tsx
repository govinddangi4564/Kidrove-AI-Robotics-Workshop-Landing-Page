import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const faqs: FAQItem[] = [
    {
      question: "Do I need any prior coding experience?",
      answer: "No prior experience is needed at all! The workshop starts from absolute scratch. Our mentors guide children using visual block-based programming before introducing intermediate concepts, making it easy and fun for beginners to follow."
    },
    {
      question: "What equipment does my child need?",
      answer: "Your child only needs a laptop, computer, or tablet with a stable internet connection. All the coding software and simulators we use are 100% free and web browser-based, meaning there are no complex software installations required."
    },
    {
      question: "Will sessions be recorded if my child misses one?",
      answer: "Yes, absolutely! All live interactive sessions are recorded. The recorded videos along with class notes, source codes, and project tasks will be uploaded to our student portal and remain accessible for 60 days after the workshop ends."
    },
    {
      question: "Is there a refund policy?",
      answer: "We stand behind the quality of our workshops. We offer a full 100% refund within the first 7 days of the workshop starting if your child is unsatisfied or feels it isn't the right fit."
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="reveal py-16 md:py-24 bg-white border-y border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-text">
            Frequently Asked Questions
          </h2>
          <p className="text-brand-muted text-lg font-normal">
            Have questions? We've got answers to help you get started.
          </p>
          <div className="h-1 w-20 bg-brand-primary mx-auto rounded-full"></div>
        </div>

        {/* FAQs Accordion Container */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? 'border-brand-primary/30 bg-brand-primary/5 shadow-md shadow-brand-primary/5'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none cursor-pointer group"
                >
                  <div className="flex items-center space-x-3.5 pr-4">
                    <HelpCircle className={`h-5.5 w-5.5 shrink-0 transition-colors ${
                      isOpen ? 'text-brand-primary' : 'text-brand-muted group-hover:text-brand-primary'
                    }`} />
                    <span className="font-display font-bold text-base md:text-lg text-brand-text">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-5.5 w-5.5 shrink-0 text-brand-muted transition-transform duration-300 ${
                      isOpen ? 'transform rotate-180 text-brand-primary' : ''
                    }`}
                  />
                </button>

                {/* Accordion Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[500px] border-t border-brand-primary/10' : 'max-h-0'
                  }`}
                >
                  <div className="p-5 md:p-6 text-brand-muted text-sm md:text-base leading-relaxed bg-white/50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
