
import React from 'react';

const stats = [
  { number: "500+", label: "Pest Control Companies" },
  { number: "10k+", label: "Leads Managed Monthly" },
  { number: "35%", label: "Average Conversion Increase" },
  { number: "15hrs", label: "Time Saved Per Week" }
];

export const StatsSection = () => {
  return (
    <section className="py-16 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center animate-fade-in hover-scale">
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
