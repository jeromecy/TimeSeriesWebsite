import React from 'react';
import { NavigationItem } from '../types';
import { BookOpen, TrendingUp, Activity, BarChart3, Briefcase, Zap } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems: NavigationItem[] = [
  { id: 'basics', title: 'Basic Concepts', description: 'Time series fundamentals' },
  { id: 'ar', title: 'AR Models', description: 'Autoregressive models' },
  { id: 'ma', title: 'MA Models', description: 'Moving average models' },
  { id: 'arima', title: 'ARIMA Models', description: 'Combined ARIMA models' },
  { id: 'cases', title: 'Case Studies', description: 'Real-world applications' },
  { id: 'advanced', title: 'Advanced Topics', description: 'Diagnostics & extensions' }
];

const getIcon = (id: string) => {
  switch (id) {
    case 'basics': return BookOpen;
    case 'ar': return TrendingUp;
    case 'ma': return Activity;
    case 'arima': return BarChart3;
    case 'cases': return Briefcase;
    case 'advanced': return Zap;
    default: return BookOpen;
  }
};

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">TimeSeries Learn</h1>
          </div>
          
          <div className="hidden md:flex space-x-1">
            {navigationItems.map((item) => {
              const Icon = getIcon(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <select
              value={activeSection}
              onChange={(e) => onSectionChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              {navigationItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}