import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  ArrowLeft, 
  Mail,
  Linkedin,
  Bot,
  BarChart2,
  Lightbulb,
  Bell
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function PremiumComingSoon() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const features = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: "Smart Transcript Processing",
      items: [
        "AI-powered transcript analysis for instant, accurate results",
        "Seamless integration with Salesforce and Slate CRM platforms",
        "Comprehensive database of global education systems and grading scales"
      ]
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      title: "Advanced Analytics",
      items: [
        "Detailed regional performance metrics and trend analysis",
        "Interactive maps showing admitted student distribution",
        "Region-specific GPA benchmarking tools",
        "Comprehensive admission pattern reports with visual insights"
      ]
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Streamlined Workflow",
      items: [
        "Convenient browser extension for quick calculator access",
        "One-click transcript evaluation functionality",
        "Automated applicant notification system",
        "Real-time GPA calculation updates"
      ]
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Enhanced Communication",
      items: [
        "Instant notifications to applicants about evaluation status",
        "Automated regular status updates throughout the admission process"
      ]
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      // Simulate API call for email submission
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Send notification email to admin
      const notificationData = {
        to: 'allen4m@outlook.com',
        subject: 'New Premium Calculator Interest',
        text: `New email subscription: ${email}`
      };

      // In production, replace with actual API endpoint
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationData)
      });

      toast.success('Thank you for your interest! We\'ll be in touch soon.');
      setEmail('');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-12rem)] flex flex-col">
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-12 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Calculator
        </Link>

        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Premium Calculator
            </h1>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Streamline Your Transcript Review Process
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get ready for our advanced premium calculator, packed with powerful features to elevate your admissions process.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-16">
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for details"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 disabled:opacity-50 whitespace-nowrap"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4 animate-bounce" />
                    Sending...
                  </span>
                ) : (
                  'Tell Me More'
                )}
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              By providing your email, you consent to receive product updates and marketing communications.
            </p>
          </form>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-sm mt-0.5">
                        ✓
                      </span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm font-medium text-gray-500 mb-4 sm:mb-0">
              More from InternationalGPA.com:
            </p>
            <nav className="flex items-center gap-8">
              <a
                href="https://www.linkedin.com/in/internationalgpa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://1admission.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                1Admission.com
              </a>
              <a
                href="https://1admission.cn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                1Admission.cn
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}