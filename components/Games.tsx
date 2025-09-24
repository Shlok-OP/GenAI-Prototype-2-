import React, { useState } from 'react';
import { PuzzlePieceIcon, SparklesIcon, HeartIcon, XMarkIcon } from './icons';
import { SKILL_SWIPE_CARDS } from '../constants';

interface GamesProps {
  onSendPrompt: (prompt: string) => void;
}

type GameState = 'start' | 'playing' | 'results';

const Games: React.FC<GamesProps> = ({ onSendPrompt }) => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [likedCards, setLikedCards] = useState<typeof SKILL_SWIPE_CARDS[0][]>([]);
  const [topSkills, setTopSkills] = useState<string[]>([]);
  const [cardAnimation, setCardAnimation] = useState('');

  const totalCards = SKILL_SWIPE_CARDS.length;

  const calculateResults = (finalLikedCards: typeof SKILL_SWIPE_CARDS[0][]) => {
    const skillCounts = finalLikedCards
      .flatMap(card => card.skills)
      .reduce((acc, skill) => {
        acc[skill] = (acc[skill] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    const sortedSkills = Object.entries(skillCounts)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);

    setTopSkills(sortedSkills.slice(0, 3));
    setGameState('results');
  };

  const handleAnswer = (liked: boolean) => {
    const currentCard = SKILL_SWIPE_CARDS[currentCardIndex];
    const newLikedCards = liked ? [...likedCards, currentCard] : likedCards;
    
    setCardAnimation(liked ? 'animate-swipe-out-right' : 'animate-swipe-out-left');

    setTimeout(() => {
        if (currentCardIndex < totalCards - 1) {
            setLikedCards(newLikedCards);
            setCurrentCardIndex(currentCardIndex + 1);
            setCardAnimation('animate-swipe-in');
        } else {
            calculateResults(newLikedCards);
        }
    }, 300);
  };
  
  const handlePlayAgain = () => {
    setGameState('playing');
    setCurrentCardIndex(0);
    setLikedCards([]);
    setTopSkills([]);
    setCardAnimation('animate-swipe-in');
  };
  
  const handleDiscussResults = () => {
    const prompt = `I played the Skill Swipe game and it suggested my top skills are: ${topSkills.join(', ')}. Can you tell me about some careers that use these skills?`;
    onSendPrompt(prompt);
  };

  if (gameState === 'start') {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-gray-50 dark:bg-brand-blue-950">
        <PuzzlePieceIcon className="w-16 h-16 mb-4 text-brand-blue-400" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Skill Swipe</h1>
        <p className="mt-2 max-w-md text-gray-600 dark:text-gray-300">
          Discover your hidden talents! Swipe right on activities you enjoy and we'll reveal your top skills.
        </p>
        <button onClick={handlePlayAgain} className="mt-8 bg-brand-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-brand-blue-700 transform hover:scale-105 transition">
          Start Playing
        </button>
      </div>
    );
  }

  if (gameState === 'results') {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-gray-50 dark:bg-brand-blue-950">
        <SparklesIcon className="w-16 h-16 mb-4 text-yellow-400" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Your Top Skills!</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Based on your choices, here are some skills you might have:</p>
        <div className="flex flex-wrap justify-center gap-3 my-6">
            {topSkills.map(skill => (
                <span key={skill} className="bg-brand-blue-100 dark:bg-brand-blue-800 text-brand-blue-800 dark:text-brand-blue-200 text-sm font-semibold capitalize px-4 py-2 rounded-full">
                    {skill}
                </span>
            ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={handleDiscussResults} className="bg-brand-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-brand-blue-700 transform hover:scale-105 transition">
                Discuss with Disha
            </button>
            <button onClick={handlePlayAgain} className="py-3 px-6 text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:bg-gray-200 dark:hover:bg-brand-blue-800 transition">
                Play Again
            </button>
        </div>
      </div>
    );
  }

  const currentCard = SKILL_SWIPE_CARDS[currentCardIndex];
  const progress = ((currentCardIndex + 1) / totalCards) * 100;

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-brand-blue-900 p-4 justify-between">
      {/* Progress Bar */}
      <div>
        <div className="w-full bg-gray-200 dark:bg-brand-blue-800 rounded-full h-2">
            <div className="bg-brand-blue-500 h-2 rounded-full transition-[width] duration-300" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400 mt-2">{currentCardIndex + 1} / {totalCards}</p>
      </div>

      {/* Card */}
      <div className="flex-grow flex items-center justify-center">
        <style>{`
          @keyframes swipe-out-right { 0% { opacity: 1; transform: translateX(0) rotate(0); } 100% { opacity: 0; transform: translateX(200%) rotate(15deg); } }
          @keyframes swipe-out-left { 0% { opacity: 1; transform: translateX(0) rotate(0); } 100% { opacity: 0; transform: translateX(-200%) rotate(-15deg); } }
          @keyframes swipe-in { 0% { opacity: 0; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1); } }
          .animate-swipe-out-right { animation: swipe-out-right 0.3s forwards ease-in; }
          .animate-swipe-out-left { animation: swipe-out-left 0.3s forwards ease-in; }
          .animate-swipe-in { animation: swipe-in 0.3s forwards ease-out; }
        `}</style>
        <div key={currentCard.id} className={`w-full max-w-sm h-72 bg-white dark:bg-brand-blue-950 rounded-2xl shadow-xl flex flex-col items-center justify-center p-6 text-center ${cardAnimation}`}>
            <span className="text-5xl mb-4">{currentCard.emoji}</span>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">{currentCard.text}</p>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-center items-center gap-6 pb-4">
        <button onClick={() => handleAnswer(false)} aria-label="Dislike" className="w-20 h-20 bg-white dark:bg-brand-blue-800 text-red-500 rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform">
            <XMarkIcon className="w-10 h-10" />
        </button>
        <button onClick={() => handleAnswer(true)} aria-label="Like" className="w-20 h-20 bg-white dark:bg-brand-blue-800 text-green-500 rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform">
            <HeartIcon className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
};

export default Games;
