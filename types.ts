
export interface UserProfile {
  name: string;
  interests: string;
  skills: string;
  personality: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  isGenerating?: boolean;
}

export interface CareerCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  subCategories: Career[];
}

export interface Career {
  id: string;
  title: string;
  description: string;
}

export enum ActiveTab {
  CHAT = 'chat',
  CAREERS = 'careers',
  GAMES = 'games',
}
