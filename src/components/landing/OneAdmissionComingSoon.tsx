import React, { useState } from 'react';
import { School, ArrowLeft, Mail, Twitter, Linkedin, Facebook } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function OneAdmissionComingSoon() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Thank you for your interest! We\'ll notify you when we launch.');
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-[calc(100vh-12rem)] flex flex-col">
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 sm:px-6 lg:px-8">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Calculator
        </a>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-navy-500 to-amber-500 rounded-lg">
                <School className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-navy-600 to-amber-600 bg-clip-text text-transparent">
                1Admission
              </h1>
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Connecting with Your Future Students
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              Streamline your admissions process and connect with qualified international students 
              through our comprehensive platform.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Get Early Access
                </label>
                <div className="flex gap-3">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your institutional email"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-gradient-to-r from-navy-600 to-amber-600 text-white rounded-lg hover:from-navy-700 hover:to-amber-700 transition-all duration-200 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Mail className="w-4 h-4 animate-bounce" />
                        Sending...
                      </span>
                    ) : (
                      'Request Access'
                    )}
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates.
                </p>
              </div>
            </form>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Platform Features:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-navy-100 text-navy-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-gray-600">Automated application processing and tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-gray-600">Direct communication with prospective students</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-navy-100 text-navy-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-gray-600">Advanced analytics and reporting tools</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000"
              alt="University campus"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              Share with your colleagues:
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 text-gray-400 hover:text-blue-700 transition-colors"
                aria-label="Share on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}