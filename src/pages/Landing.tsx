
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, FileText, BarChart3, Clock, TrendingUp, Database, Zap, Star, ArrowRight, CheckCircle, Phone, Calendar, Award, Facebook, Twitter, Linkedin, Instagram, Check } from 'lucide-react';
import { Navigation } from '@/components/landing/Navigation';
import { HeroSection } from '@/components/landing/HeroSection';
import { StatsSection } from '@/components/landing/StatsSection';

const Landing = () => {
  const features = [
    {
      icon: Users,
      title: "Lead Capture & Tracking",
      description: "Automatically capture leads from multiple sources and track their journey from inquiry to conversion.",
      gradient: "from-blue-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-purple-50"
    },
    {
      icon: FileText,
      title: "Instant Quotation Generation",
      description: "Create professional quotes in minutes with our intelligent pricing engine and customizable templates.",
      gradient: "from-green-500 to-teal-600",
      bgColor: "bg-gradient-to-br from-green-50 to-teal-50"
    },
    {
      icon: Clock,
      title: "Automated Follow-ups",
      description: "Never miss a follow-up with automated reminders and scheduled communications.",
      gradient: "from-orange-500 to-red-600",
      bgColor: "bg-gradient-to-br from-orange-50 to-red-50"
    },
    {
      icon: BarChart3,
      title: "Customer Database & Analytics",
      description: "Comprehensive customer profiles with detailed analytics and performance insights.",
      gradient: "from-indigo-500 to-blue-600",
      bgColor: "bg-gradient-to-br from-indigo-50 to-blue-50"
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Reduce Lead Leakage",
      description: "Capture and track every lead to prevent potential customers from slipping through the cracks.",
      stat: "35% increase in lead capture",
      gradient: "from-emerald-500 to-green-600",
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-50"
    },
    {
      icon: Database,
      title: "Increase Conversion Rates",
      description: "Convert more leads into paying customers with streamlined processes and timely follow-ups.",
      stat: "42% higher conversion rate",
      gradient: "from-blue-500 to-indigo-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50"
    },
    {
      icon: Zap,
      title: "Save Admin Time",
      description: "Automate repetitive tasks and focus on what matters most - growing your business.",
      stat: "15 hours saved per week",
      gradient: "from-yellow-500 to-orange-600",
      bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50"
    },
    {
      icon: Shield,
      title: "Built for Pest Control",
      description: "Designed specifically for pest control businesses with industry-specific features and workflows.",
      stat: "500+ pest control companies trust us",
      gradient: "from-purple-500 to-pink-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "GreenShield Pest Control",
      role: "Founder & CEO",
      quote: "PestGuard has transformed our lead management process. We've seen a 40% increase in conversions since switching.",
      rating: 5,
      avatar: "/api/placeholder/48/48"
    },
    {
      name: "Mike Rodriguez", 
      company: "Urban Pest Solutions",
      role: "Operations Manager",
      quote: "The quotation system saves us hours every week. Professional quotes in minutes, not hours.",
      rating: 5,
      avatar: "/api/placeholder/48/48"
    },
    {
      name: "Lisa Chen",
      company: "EcoSafe Exterminators", 
      role: "Sales Director",
      quote: "Finally, a CRM that understands pest control. Our team productivity has never been higher.",
      rating: 5,
      avatar: "/api/placeholder/48/48"
    }
  ];

  const companyLogos = [
    "GreenShield", "BugBusters", "EcoSafe", "PestPro", "CleanSweep", "BugOff", "SafeGuard", "PestAway"
  ];

  const pricingPlans = [
    {
      name: "Annual Plan",
      price: "$49",
      period: "/month billed annually",
      originalPrice: "$59",
      gradient: "from-blue-500 to-purple-600",
      popular: false,
      features: [
        "Unlimited leads tracking",
        "Professional quotations",
        "Basic analytics",
        "Email support",
        "Mobile app access",
        "Standard integrations"
      ]
    },
    {
      name: "Lifetime Deal",
      price: "$999",
      period: "one-time payment",
      originalPrice: "$2,999",
      gradient: "from-green-500 to-teal-600",
      popular: true,
      features: [
        "Everything in Annual",
        "Lifetime access",
        "Advanced analytics",
        "Priority support",
        "Custom integrations",
        "Team collaboration",
        "API access",
        "White-label options"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "tailored pricing",
      gradient: "from-purple-500 to-pink-600",
      popular: false,
      features: [
        "Everything in Lifetime",
        "Dedicated account manager",
        "Custom development",
        "On-premise deployment",
        "SLA guarantee",
        "Training & onboarding",
        "24/7 phone support"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <StatsSection />

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-8 sm:mb-12 lg:mb-16 animate-fade-in">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 px-2">
              Everything You Need to Manage Leads Effectively
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Our comprehensive platform streamlines your entire lead-to-customer journey
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group ${feature.bgColor} hover-scale animate-fade-in`}>
                <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className={`bg-gradient-to-r ${feature.gradient} w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-8 sm:mb-12 lg:mb-16 animate-fade-in">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 px-2">
              Drive Real Business Results
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Join hundreds of pest control businesses that have transformed their operations
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className={`flex space-x-3 sm:space-x-4 ${benefit.bgColor} rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in border-0`}>
                <div className={`bg-gradient-to-br ${benefit.gradient} w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <benefit.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="space-y-1 sm:space-y-2 min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{benefit.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{benefit.description}</p>
                  <div className="text-green-600 font-semibold text-xs sm:text-sm">{benefit.stat}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with Running Company Logos */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-8 sm:mb-12 lg:mb-16 animate-fade-in">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 px-2">
              Trusted by Pest Control Professionals
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-4">
              See what our customers have to say about their success
            </p>
          </div>

          {/* Running Company Logos */}
          <div className="mb-8 sm:mb-12 overflow-hidden">
            <div className="flex animate-[slide_20s_linear_infinite] space-x-4 sm:space-x-8">
              {[...companyLogos, ...companyLogos].map((logo, index) => (
                <div key={index} className="flex-shrink-0 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-3 sm:p-4 shadow-md">
                  <div className="text-gray-700 font-semibold text-xs sm:text-sm whitespace-nowrap">{logo}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white hover-scale animate-fade-in">
                <CardContent className="p-4 sm:p-6">
                  {/* Header with avatar and info */}
                  <div className="flex items-start space-x-3 sm:space-x-4 mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-600 leading-tight">{testimonial.role}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{testimonial.company}</p>
                    </div>
                  </div>

                  {/* Star rating */}
                  <div className="flex space-x-1 mb-3 sm:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Read more link */}
                  <div>
                    <a href="#" className="text-blue-600 text-xs sm:text-sm font-medium hover:text-blue-700 transition-colors">
                      Read the full story →
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-8 sm:mb-12 lg:mb-16 animate-fade-in">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 px-2">
              Choose Your Perfect Plan
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Select the plan that fits your business needs and start growing today
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover-scale animate-fade-in relative h-full ${plan.popular ? 'md:scale-105 z-10' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                <CardContent className={`p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 h-full flex flex-col bg-gradient-to-br ${plan.popular ? 'from-green-50 to-blue-50' : 'from-white to-gray-50'}`}>
                  <div className="text-center">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="space-y-1">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{plan.price}</span>
                        {plan.originalPrice && (
                          <span className="text-sm sm:text-base lg:text-lg text-gray-400 line-through">{plan.originalPrice}</span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-600">{plan.period}</p>
                    </div>
                  </div>
                  
                  <div className={`h-1 w-full bg-gradient-to-r ${plan.gradient} rounded-full`}></div>
                  
                  <ul className="space-y-2 sm:space-y-3 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2 sm:space-x-3">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm lg:text-base text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className={`w-full bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white text-sm sm:text-base lg:text-lg py-2 sm:py-3 mt-auto`}>
                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white px-2">
              Start Managing Your Leads Better — Book a Demo Now
            </h2>
            <p className="text-sm sm:text-base lg:text-xl text-green-100 px-4">
              Join thousands of pest control businesses that have transformed their lead management
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 hover-scale">
                Book a Demo
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4">
                Start Free Trial
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 pt-4 text-xs sm:text-sm lg:text-base px-4">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span className="text-white">Call us: (555) 123-PEST</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span className="text-white">Available 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold">PestGuard CRM</span>
              </div>
              <p className="text-sm sm:text-base text-gray-400">
                The leading CRM platform designed specifically for pest control businesses.
              </p>
              <div className="flex justify-center sm:justify-start space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
              <h4 className="font-semibold text-base sm:text-lg">Product</h4>
              <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
              <h4 className="font-semibold text-base sm:text-lg">Support</h4>
              <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Live Chat</a></li>
              </ul>
            </div>
            <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
              <h4 className="font-semibold text-base sm:text-lg">Legal</h4>
              <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-base text-gray-400">
            <p>&copy; 2024 PestGuard CRM. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 lg:hidden z-50">
        <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-sm" size="lg">
          Start Free Trial
        </Button>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        
        .hover-scale:hover {
          transform: scale(1.02);
        }
        
        @media (min-width: 1024px) {
          .hover-scale:hover {
            transform: scale(1.05);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Landing;
