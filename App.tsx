import React, { useState, useEffect } from 'react';
import OnboardingModal from './components/OnboardingModal';
import BottomNav from './components/BottomNav';
import ChatWindow from './components/ChatWindow';
import CareerExplorer from './components/CareerExplorer';
import Games from './components/Games';
import Header from './components/Header';
import { ActiveTab, UserProfile } from './types';
import { startChat } from './services/geminiService';
import { SparklesIcon } from './components/icons';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.CHAT);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<Theme>('light');
  const [promptForChat, setPromptForChat] = useState<string | null>(null);

  // Theme management effect
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (userPrefersDark) {
        setTheme('dark');
    }
  }, []);
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // Profile loading effect
  useEffect(() => {
    // Check local storage for saved profile
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUserProfile(profile);
      startChat(profile);
      setIsProfileComplete(true);
    }
    setIsLoading(false);
  }, []);

  const handleOnboardingComplete = (profile: UserProfile) => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setUserProfile(profile);
    startChat(profile);
    setIsProfileComplete(true);
  };
  
  const handleToggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleSendPromptToChat = (prompt: string) => {
    setPromptForChat(prompt);
    setActiveTab(ActiveTab.CHAT);
  };

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-screen bg-white dark:bg-brand-blue-950">
            <SparklesIcon className="w-12 h-12 text-brand-blue-500 animate-pulse" />
        </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col font-sans antialiased bg-gray-50 dark:bg-brand-blue-950">
      {!isProfileComplete && <OnboardingModal onComplete={handleOnboardingComplete} />}
      
      {isProfileComplete && userProfile && (
        <>
          <Header theme={theme} onToggleTheme={handleToggleTheme} />
          <main className="flex-1 relative overflow-hidden">
            <div className={`absolute inset-0 pt-16 pb-16 h-full transition-opacity duration-300 ease-in-out ${activeTab === ActiveTab.CHAT ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <ChatWindow 
                userProfile={userProfile} 
                initialPrompt={promptForChat} 
                onPromptHandled={() => setPromptForChat(null)} 
              />
            </div>
            
            <div className={`absolute inset-0 pt-16 pb-16 h-full transition-opacity duration-300 ease-in-out ${activeTab === ActiveTab.CAREERS ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <div className="h-full overflow-y-auto">
                <CareerExplorer onSendPrompt={handleSendPromptToChat} />
              </div>
            </div>

            <div className={`absolute inset-0 pt-16 pb-16 h-full transition-opacity duration-300 ease-in-out ${activeTab === ActiveTab.GAMES ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <div className="h-full overflow-y-auto">
                <Games onSendPrompt={handleSendPromptToChat} />
              </div>
            </div>
          </main>
          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
      )}
    </div>
  );
};

export default App;
