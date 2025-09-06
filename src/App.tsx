import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { BasicConcepts } from './components/sections/BasicConcepts';
import { ARModels } from './components/sections/ARModels';
import { MAModels } from './components/sections/MAModels';
import { ARIMAModels } from './components/sections/ARIMAModels';
import { CaseStudies } from './components/sections/CaseStudies';
import { AdvancedTopics } from './components/sections/AdvancedTopics';

function App() {
  const [activeSection, setActiveSection] = useState('basics');

  const renderSection = () => {
    switch (activeSection) {
      case 'basics':
        return <BasicConcepts />;
      case 'ar':
        return <ARModels />;
      case 'ma':
        return <MAModels />;
      case 'arima':
        return <ARIMAModels />;
      case 'cases':
        return <CaseStudies />;
      case 'advanced':
        return <AdvancedTopics />;
      default:
        return <BasicConcepts />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderSection()}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              Interactive Time Series Learning Platform • Built for Understanding Complex Concepts
            </p>
            <p className="text-xs mt-2">
              Explore AR, MA, and ARIMA models through hands-on experimentation and real-world applications
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;