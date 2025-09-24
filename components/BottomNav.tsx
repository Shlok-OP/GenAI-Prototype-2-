import React from 'react';
import { ActiveTab } from '../types';
import { ChatBubbleIcon, BriefcaseIcon, PuzzlePieceIcon } from './icons';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

const NavItem: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon: Icon, label, isActive, onClick }) => {
  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center w-full h-16 transition-colors duration-200">
      <Icon className={`w-6 h-6 mb-1 ${isActive ? 'text-brand-blue-500' : 'text-gray-400'}`} />
      <span className={`text-xs font-medium ${isActive ? 'text-brand-blue-600 dark:text-brand-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
        {label}
      </span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: ActiveTab.CHAT, label: 'Chat', icon: ChatBubbleIcon },
    { id: ActiveTab.CAREERS, label: 'Careers', icon: BriefcaseIcon },
    { id: ActiveTab.GAMES, label: 'Games', icon: PuzzlePieceIcon },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-brand-blue-950 border-t border-gray-200 dark:border-brand-blue-900 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_-2px_10px_rgba(0,0,0,0.2)]">
      <div className="flex justify-around items-center h-full max-w-lg mx-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeTab === item.id}
            onClick={() => setActiveTab(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default BottomNav;