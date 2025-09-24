import React from 'react';
import { SunIcon, MoonIcon, SparklesIcon } from './icons';

interface HeaderProps {
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
    return (
        <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-white/80 dark:bg-brand-blue-950/80 backdrop-blur-sm border-b border-gray-200 dark:border-brand-blue-900">
            <div className="flex items-center gap-2">
                <SparklesIcon className="w-7 h-7 text-brand-blue-500" />
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">Disha</h1>
            </div>
            <button
                onClick={onToggleTheme}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-brand-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500"
                aria-label="Toggle theme"
            >
                {theme === 'light' ? (
                    <MoonIcon className="w-6 h-6" />
                ) : (
                    <SunIcon className="w-6 h-6" />
                )}
            </button>
        </header>
    );
};

export default Header;