import React, { useState } from 'react';
import type { Career, CareerCategory } from '../types';
import { CAREER_DATA } from '../constants';

interface CareerExplorerProps {
  onSendPrompt: (prompt: string) => void;
}

const CareerExplorer: React.FC<CareerExplorerProps> = ({ onSendPrompt }) => {
  const [selectedCategory, setSelectedCategory] = useState<CareerCategory | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);

  const handlePlanPath = (careerTitle: string) => {
    const prompt = `Please create a personalized, step-by-step learning path for a career in '${careerTitle}'. Include recommended skills, potential projects, and resources relevant for a student in India.`;
    onSendPrompt(prompt);
  };

  if (selectedCareer) {
    return (
      <div className="p-4 sm:p-6">
        <button onClick={() => setSelectedCareer(null)} className="mb-4 text-sm font-semibold text-brand-blue-600 dark:text-brand-blue-400">&larr; Back to {selectedCategory?.title}</button>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{selectedCareer.title}</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{selectedCareer.description}</p>
        <button 
          onClick={() => handlePlanPath(selectedCareer.title)} 
          className="mt-6 w-full bg-brand-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-brand-blue-700 transform hover:scale-105 transition flex items-center justify-center"
        >
          Plan a Learning Path
        </button>
      </div>
    );
  }

  if (selectedCategory) {
    return (
      <div className="p-4 sm:p-6">
        <button onClick={() => setSelectedCategory(null)} className="mb-4 text-sm font-semibold text-brand-blue-600 dark:text-brand-blue-400">&larr; Back to Categories</button>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{selectedCategory.title}</h2>
        <div className="mt-4 grid grid-cols-1 gap-4">
          {selectedCategory.subCategories.map(career => (
            <button key={career.id} onClick={() => setSelectedCareer(career)} className="text-left p-4 bg-white dark:bg-brand-blue-900 rounded-lg shadow hover:shadow-md transition">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">{career.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{career.description}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Explore Careers</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">Dive into different fields to find your passion.</p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CAREER_DATA.map(category => (
          <button key={category.id} onClick={() => setSelectedCategory(category)} className="p-6 bg-white dark:bg-brand-blue-900 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 text-left flex items-center space-x-4">
            <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-brand-blue-100 dark:bg-brand-blue-800 flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-brand-blue-600 dark:text-brand-blue-300" />
                </div>
            </div>
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{category.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{category.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CareerExplorer;
