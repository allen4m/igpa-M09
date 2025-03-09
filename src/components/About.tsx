import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calculator, Users, Clock, Database, Zap, Share2 } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: <Calculator className="w-6 h-6" />,
      title: "Easy-to-Use Conversion Function",
      description: "Simple, accurate GPA conversions at your fingertips (Free)"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Straightforward Academic Reports",
      description: "Clear documentation for your admissions files (Free)"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Training Tool",
      description: "Perfect for onboarding new team members and ensuring consistency (Free)"
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Educational Resources",
      description: "Comprehensive guides on international education systems (Free - coming soon)"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Time-Saving Automation",
      description: "Streamline your evaluation process with automated conversions (Premium feature - CRM integration - coming soon)"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Data Insights",
      description: "Gain valuable insights into application patterns and trends (Premium feature - coming soon)"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Calculator
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                A Letter For You
              </h1>

              <div className="prose prose-indigo max-w-none">
                <p className="text-lg text-gray-600 mb-6">
                  Dear International Admissions Colleagues,
                </p>

                <p className="mb-6">
                  I wanted to share something that has been close to my heart for quite some time now.
                </p>

                <p className="mb-6">
                  As the Director of International Admission, DSO, and ARO at a private liberal arts university, 
                  I've walked in your shoes. Each recruitment cycle, my small team and I process around 2,000 
                  applications with limited resources and an ever-tightening budget. Those hours spent with 
                  constrained eyes, meticulously deciphering international transcripts and converting GPAs? 
                  I understand that challenge deeply.
                </p>

                <p className="mb-6">
                  While I'm not a coder myself, my experiences in this field helped me envision a tool that 
                  could make our lives easier. After immersing myself in UX design research, I was fortunate 
                  to connect with the wonderful folks at the Insight Digital Agency. They are professional, 
                  friendly, polite, efficient and highly customer experience focused (that doesn't mean they 
                  won't say no to your ridiculous or unrealistic requests). Their genuine curiosity about our 
                  work and commitment to solving real problems made this collaboration truly special.
                </p>

                <p className="mb-6">
                  And so, with a lot of heart and hard work, the International GPA Calculator was born.
                </p>

                <p className="mb-6">
                  I created this tool because I understand what our days look like. Many of us manage 
                  international admissions in small teams—sometimes as the only full-time staff member, 
                  supported by amazing but temporary student workers. We juggle complex global grading systems 
                  that require specialized knowledge, and maintaining consistency can feel impossible with 
                  changing personnel. This calculator aims to standardize our processes, serve as a training 
                  resource for new team members, and build institutional knowledge that stays even as people 
                  move on.
                </p>

                <p className="mb-6">
                  About those existing GPA conversion tools... we all know they come with eye-watering price 
                  tags. And despite the cost, they often lack features that would actually make our lives 
                  easier. That's why I made a promise that our core functionality would always be free. I 
                  believe that having the right tools shouldn't depend on the size of your department's budget.
                </p>

                <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="p-6 border border-gray-200 rounded-lg hover:border-indigo-200 hover:bg-indigo-50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-indigo-600">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mb-6">
                  The free version you see today is just the beginning. We're developing an affordable premium 
                  version with advanced features that I'm truly excited about. Your feedback will be invaluable 
                  in shaping what comes next.
                </p>

                <p className="mb-6">
                  This project came from a place of genuine care for our profession and community. It's built 
                  with an understanding of the unique challenges we face when reviewing international credentials 
                  and making admissions decisions.
                </p>

                <p className="mb-12">
                  I'd love for you to try the International GPA Calculator and let me know what you think. Your 
                  insights and experiences will help make this tool even better for all of us who work in this 
                  wonderful, complex world of international admissions.
                </p>

                <div className="border-t border-gray-200 pt-8">
                  <p className="text-gray-900 font-medium">
                    With warmth and collegiality,
                  </p>
                  <p className="text-gray-900 font-bold mt-2">
                    Allen Long
                  </p>
                  <p className="text-gray-600 text-sm">
                    An International Enrollment Management Professional
                  </p>
                </div>

                <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
                  <p className="text-sm text-indigo-600">
                    <strong>P.S.</strong> The International GPA Calculator is live now with more functionality 
                    being added over time. Stay tuned!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}