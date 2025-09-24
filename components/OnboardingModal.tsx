import React, { useState } from 'react';
import type { UserProfile } from '../types';
import { ONBOARDING_STEPS } from '../constants';
import { LockIcon, SparklesIcon } from './icons';

interface OnboardingModalProps {
  onComplete: (profile: UserProfile) => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState<Partial<UserProfile>>({});
  const [isFinishing, setIsFinishing] = useState(false);

  const step = ONBOARDING_STEPS[currentStep];
  const progress = ((currentStep + 1) / ONBOARDING_STEPS.length) * 100;

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinishing(true);
      setTimeout(() => {
        onComplete(profileData as UserProfile);
      }, 1500);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({ ...profileData, [step.key]: e.target.value });
  };
  
  const isNextDisabled = !profileData[step.key as keyof UserProfile];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isNextDisabled) {
      e.preventDefault(); // Prevents default form submission behavior
      handleNext();
    }
  };

  if (isFinishing) {
    return (
       <div className="fixed inset-0 bg-brand-blue-900 bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
        <div className="text-center text-white animate-pulse">
            <SparklesIcon className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
            <h2 className="text-3xl font-bold">Crafting your profile...</h2>
            <p className="mt-2 text-lg">Getting everything ready for you!</p>
        </div>
       </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-brand-blue-950 rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 transform transition-all duration-300 scale-100">
        <div className="w-full bg-gray-200 dark:bg-brand-blue-900 rounded-full h-2.5 mb-6">
          <div className="bg-brand-blue-600 h-2.5 rounded-full transition-[width] duration-500 ease-in-out" style={{ width: `${progress}%` }}></div>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4">{step.question}</h2>
        
        {step.type === 'textarea' ? (
          <textarea
            value={profileData[step.key as keyof UserProfile] || ''}
            onChange={handleChange}
            placeholder={step.placeholder}
            rows={4}
            className="w-full p-3 bg-gray-100 dark:bg-brand-blue-900 border-2 border-transparent focus:border-brand-blue-500 focus:ring-0 rounded-lg text-gray-800 dark:text-gray-200 transition"
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={profileData[step.key as keyof UserProfile] || ''}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={step.placeholder}
            className="w-full p-3 bg-gray-100 dark:bg-brand-blue-900 border-2 border-transparent focus:border-brand-blue-500 focus:ring-0 rounded-lg text-gray-800 dark:text-gray-200 transition"
            autoFocus
          />
        )}

        <div className="mt-8 flex justify-between items-center">
          <div>
            {currentStep > 0 && (
              <button onClick={handleBack} className="py-2 px-4 text-gray-600 dark:text-gray-400 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-brand-blue-900 transition">
                Back
              </button>
            )}
          </div>
          <button 
            onClick={handleNext} 
            disabled={isNextDisabled}
            className="bg-brand-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-brand-blue-700 disabled:bg-gray-300 dark:disabled:bg-brand-blue-800 disabled:cursor-not-allowed transform hover:scale-105 transition"
          >
            {currentStep === ONBOARDING_STEPS.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>

        {currentStep === ONBOARDING_STEPS.length - 1 && (
            <div className="mt-6 text-center text-gray-500 dark:text-gray-400 flex items-center justify-center text-sm">
                <LockIcon className="w-4 h-4 mr-2"/>
                <span>Your Data is Private & Secure. You are in control.</span>
            </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingModal;