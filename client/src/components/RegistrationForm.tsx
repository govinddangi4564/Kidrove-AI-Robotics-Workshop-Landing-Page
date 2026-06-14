import React, { useState } from 'react';
import { User, Mail, Phone, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';

interface FormFields {
  name: string;
  email: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  general?: string;
}

export const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormFields>({
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handlePhoneKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Only allow numeric key entries (0-9)
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let sanitizedValue = value;
    if (name === 'phone') {
      // Remove any non-digits and cap at 10 characters
      sanitizedValue = value.replace(/\D/g, '').slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));

    // Clear field-specific error as user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (10 digit Indian number)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Must be a 10-digit number (starting with 6-9)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${apiUrl}/api/enquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', phone: '' });
      } else {
        // Handle server-side validation or other errors
        if (data.errors && Array.isArray(data.errors)) {
          const serverErrors: FormErrors = {};
          data.errors.forEach((err: { field: string; message: string }) => {
            serverErrors[err.field as keyof FormErrors] = err.message;
          });
          setErrors(serverErrors);
        } else {
          setErrors({ general: data.message || 'An unexpected error occurred. Please try again.' });
        }
      }
    } catch (err) {
      setErrors({ general: 'Failed to connect to the server. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register" className="reveal py-16 md:py-24 bg-brand-bg relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-brand-primary/5 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-brand-secondary/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-8 md:p-10">
          
          {/* Header */}
          <div className="text-center mb-8 space-y-2">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-text">
              Reserve Your Spot
            </h2>
            <p className="text-brand-muted text-sm sm:text-base">
              Fill out the form below. Our counselors will reach out to you within 24 hours to finalize your registration.
            </p>
          </div>

          {/* Form Content / Success Screen */}
          {submitSuccess ? (
            <div className="text-center py-8 px-4 space-y-4 animate-fade-in-up">
              <div className="inline-flex items-center justify-center p-4 bg-emerald-50 rounded-full text-brand-success mb-2 shadow-inner">
                <CheckCircle2 className="h-14 w-14" />
              </div>
              <h3 className="font-display font-bold text-2xl text-slate-800">
                Enquiry Submitted!
              </h3>
              <p className="text-brand-success font-semibold text-lg max-w-sm mx-auto">
                🎉 You're enrolled! We'll contact you shortly.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="mt-6 inline-flex items-center text-sm font-bold text-brand-primary hover:text-brand-primary-dark transition-colors cursor-pointer"
              >
                Submit another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* General Server Error Banner */}
              {errors.general && (
                <div className="flex items-start space-x-2.5 p-4 bg-red-50 border border-red-200 text-red-800 rounded-2xl">
                  <AlertTriangle className="h-5.5 w-5.5 text-red-600 shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">{errors.general}</span>
                </div>
              )}

              {/* Name Field */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-sm font-bold text-brand-text">
                  Child / Parent Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-muted">
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className={`block w-full pl-11 pr-4 py-3.5 bg-brand-bg border rounded-2xl text-brand-text placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200 font-medium ${
                      errors.name ? 'border-red-300 focus:border-red-400 focus:ring-red-200/20' : 'border-slate-200'
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs font-semibold text-red-600 mt-1 pl-2">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-bold text-brand-text">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-muted">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className={`block w-full pl-11 pr-4 py-3.5 bg-brand-bg border rounded-2xl text-brand-text placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200 font-medium ${
                      errors.email ? 'border-red-300 focus:border-red-400 focus:ring-red-200/20' : 'border-slate-200'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs font-semibold text-red-600 mt-1 pl-2">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-1.5">
                <label htmlFor="phone" className="block text-sm font-bold text-brand-text">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-muted">
                    <Phone className="h-5 w-5" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onKeyPress={handlePhoneKeyPress}
                    placeholder="10-digit mobile number"
                    className={`block w-full pl-11 pr-4 py-3.5 bg-brand-bg border rounded-2xl text-brand-text placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200 font-medium ${
                      errors.phone ? 'border-red-300 focus:border-red-400 focus:ring-red-200/20' : 'border-slate-200'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs font-semibold text-red-600 mt-1 pl-2">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center bg-brand-primary hover:bg-brand-primary-dark text-white py-4 px-6 rounded-2xl font-bold text-base md:text-lg transition-all duration-200 hover:shadow-xl hover:shadow-brand-primary/25 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5.5 w-5.5 mr-2 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Enroll Now</span>
                )}
              </button>

            </form>
          )}

        </div>
      </div>
    </section>
  );
};
