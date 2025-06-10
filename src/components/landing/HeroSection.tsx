
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Award } from 'lucide-react';
import { DashboardPreview } from './DashboardPreview';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-12 lg:py-16 bg-gray-900">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      
      {/* Pest-themed background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-8 h-8 text-green-500">🐜</div>
        <div className="absolute top-32 right-20 w-6 h-6 text-blue-400">🦗</div>
        <div className="absolute bottom-20 left-1/4 w-7 h-7 text-green-400">🕷️</div>
        <div className="absolute top-48 left-1/3 w-5 h-5 text-yellow-400">🐛</div>
        <div className="absolute bottom-32 right-1/3 w-6 h-6 text-red-400">🦟</div>
        <div className="absolute top-20 right-1/4 w-8 h-8 text-green-500">🪲</div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="space-y-4">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 text-green-400 rounded-full text-sm font-medium mb-4">
              <Award className="w-4 h-4 mr-2" />
              #1 CRM for Pest Control Businesses
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight max-w-4xl mx-auto">
              <span className="whitespace-nowrap">Manage Pest Control Leads</span>
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"> 5x Faster</span>
              <br />
              <span className="text-2xl lg:text-4xl">With PestGuard CRM</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Automate tracking, speed up reviews, remove bottlenecks, and stay fully aligned in one streamlined workspace.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-lg px-8 py-4">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
              Watch Demo →
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>14-day free trial</span>
            </div>
          </div>

          <DashboardPreview />
        </div>
      </div>
    </section>
  );
};
