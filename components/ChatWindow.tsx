import React, { useState, useEffect, useRef } from 'react';
import type { ChatMessage, UserProfile } from '../types';
import { getChatInstance } from '../services/geminiService';
import { SendIcon, SparklesIcon, UserIcon } from './icons';
import type { Chat, GenerateContentResponse } from '@google/genai';

interface ChatWindowProps {
  userProfile: UserProfile;
  initialPrompt: string | null;
  onPromptHandled: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ userProfile, initialPrompt, onPromptHandled }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initChat = async () => {
      setIsLoading(true);
      const chat = getChatInstance();
      if (chat) {
        chatRef.current = chat;
        // Generate initial welcome message if there are no existing messages
        if (messages.length === 0) {
            const welcomeMessageId = Date.now().toString();
            setMessages([{ id: welcomeMessageId, sender: 'ai', text: '', isGenerating: true }]);
            
            try {
              const result: GenerateContentResponse = await chat.sendMessage({ message: `Hello!` });
              setMessages([{ id: welcomeMessageId, sender: 'ai', text: result.text, isGenerating: false }]);
            } catch (error) {
              console.error("Error sending initial message:", error);
              setMessages([{ id: welcomeMessageId, sender: 'ai', text: "Hello! I'm having a little trouble connecting right now, but I'm here to help.", isGenerating: false }]);
            }
        }
      }
      setIsLoading(false);
    };
    initChat();
  }, []);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSend = async (promptOverride?: string) => {
    const messageText = promptOverride || input;
    if (messageText.trim() === '' || !chatRef.current) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), sender: 'user', text: messageText };
    const aiMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, userMessage, { id: aiMessageId, sender: 'ai', text: '', isGenerating: true }]);
    
    if (!promptOverride) {
        setInput('');
    }

    try {
      const stream = await chatRef.current.sendMessageStream({ message: messageText });
      let fullText = "";
      for await (const chunk of stream) {
        fullText += chunk.text;
        setMessages(prev => prev.map(msg => msg.id === aiMessageId ? { ...msg, text: fullText } : msg));
      }
      setMessages(prev => prev.map(msg => msg.id === aiMessageId ? { ...msg, isGenerating: false } : msg));
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => prev.map(msg => msg.id === aiMessageId ? { ...msg, text: "Sorry, something went wrong. Please try again.", isGenerating: false } : msg));
    }
  };
  
  useEffect(() => {
    if (initialPrompt && chatRef.current) {
        handleSend(initialPrompt);
        onPromptHandled();
    }
  }, [initialPrompt]);


  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-brand-blue-900">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-brand-blue-500 flex items-center justify-center flex-shrink-0">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
            )}
            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${message.sender === 'user' ? 'bg-brand-blue-600 text-white rounded-br-none' : 'bg-white dark:bg-brand-blue-800 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
              {message.isGenerating && message.text.length === 0 ? (
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-0"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
                </div>
              ) : (
                <p className="text-sm" dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br />') }} />
              )}
            </div>
             {message.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                <UserIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white dark:bg-brand-blue-950 border-t border-gray-200 dark:border-brand-blue-900">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 w-full p-3 bg-gray-100 dark:bg-brand-blue-900 border-2 border-transparent focus:border-brand-blue-500 focus:ring-0 rounded-full text-gray-800 dark:text-gray-200 transition"
          />
          <button onClick={() => handleSend()} className="w-12 h-12 flex items-center justify-center bg-brand-blue-600 text-white rounded-full hover:bg-brand-blue-700 disabled:bg-gray-400 transition transform hover:scale-105">
            <SendIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
