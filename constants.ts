import { CareerCategory } from './types';
import { BriefcaseIcon, PuzzlePieceIcon, ChatBubbleIcon } from './components/icons'; // Assuming icons are exported from a single file

export const ONBOARDING_STEPS = [
  {
    question: "First, what's your name?",
    key: 'name',
    placeholder: 'e.g., Priya',
    type: 'text',
  },
  {
    question: 'What are some topics or activities you are passionate about?',
    key: 'interests',
    placeholder: 'e.g., painting, video games, biology, helping people',
    type: 'textarea',
  },
  {
    question: 'What are you good at? Think about school subjects or hobbies.',
    key: 'skills',
    placeholder: 'e.g., good in math, creative writing, leading teams',
    type: 'textarea',
  },
  {
    question: 'How would you describe your personality in a few words?',
    key: 'personality',
    placeholder: 'e.g., curious, organized, enjoy working in teams',
    type: 'textarea',
  },
];

export const CAREER_DATA: CareerCategory[] = [
  {
    id: 'tech',
    title: 'Technology & IT',
    description: 'Build the future with code, data, and design.',
    icon: PuzzlePieceIcon, // Placeholder
    subCategories: [
      { id: 'swe', title: 'Software Engineering', description: 'Create applications, websites, and systems.' },
      { id: 'data', title: 'Data Science & Analytics', description: 'Find insights and stories in data.' },
      { id: 'uiux', title: 'UI/UX Design', description: 'Design user-friendly and beautiful digital products.' },
      { id: 'cyber', title: 'Cybersecurity', description: 'Protect digital systems from threats.' },
    ],
  },
  {
    id: 'creative',
    title: 'Creative Arts & Design',
    description: 'Express ideas through visuals, words, and sounds.',
    icon: PuzzlePieceIcon, // Placeholder
    subCategories: [
      { id: 'gfx', title: 'Graphic Design', description: 'Create visual concepts for brands and media.' },
      { id: 'content', title: 'Content Creation & Writing', description: 'Craft compelling stories for various platforms.' },
      { id: 'anim', title: 'Animation & VFX', description: 'Bring characters and worlds to life.' },
    ],
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Medicine',
    description: 'Help people live healthier lives.',
    icon: BriefcaseIcon, // Placeholder
    subCategories: [
      { id: 'doctor', title: 'Medical Doctor', description: 'Diagnose and treat illnesses.' },
      { id: 'nursing', title: 'Nursing', description: 'Provide patient care and support.' },
      { id: 'research', title: 'Medical Research', description: 'Discover new treatments and cures.' },
    ],
  },
   {
    id: 'business',
    title: 'Business & Finance',
    description: 'Lead, manage, and grow organizations.',
    icon: ChatBubbleIcon, // Placeholder
    subCategories: [
      { id: 'marketing', title: 'Marketing & Sales', description: 'Promote and sell products or services.' },
      { id: 'finance', title: 'Finance & Accounting', description: 'Manage money and financial records.' },
      { id: 'hr', title: 'Human Resources', description: 'Support and develop a company\'s people.' },
    ],
  },
];


export const SKILL_SWIPE_CARDS = [
  { id: 1, text: 'Organizing a fun event for your friends', emoji: '🎉', skills: ['organization', 'planning', 'social skills'] },
  { id: 2, text: 'Writing a short story or poem', emoji: '✍️', skills: ['creativity', 'writing', 'communication'] },
  { id: 3, text: 'Solving a complex math puzzle', emoji: '🧩', skills: ['problem-solving', 'analytical skills', 'mathematics'] },
  { id: 4, text: 'Building something with LEGOs or a model kit', emoji: '🧱', skills: ['creativity', 'engineering', 'patience'] },
  { id: 5, text: 'Helping a friend understand a difficult topic', emoji: '🤝', skills: ['communication', 'empathy', 'teaching'] },
  { id: 6, text: 'Designing a poster for a school club', emoji: '🎨', skills: ['creativity', 'design', 'visual communication'] },
  { id: 7, text: 'Learning a new programming language online', emoji: '💻', skills: ['problem-solving', 'technical skills', 'self-learning'] },
  { id: 8, text: 'Leading a team in a group project', emoji: '🏆', skills: ['leadership', 'teamwork', 'organization'] },
  { id: 9, text: 'Analyzing data to find a pattern', emoji: '📊', skills: ['analytical skills', 'data analysis', 'attention to detail'] },
  { id: 10, text: 'Comforting someone who is upset', emoji: '🤗', skills: ['empathy', 'social skills', 'communication'] },
  { id: 11, text: 'Debating a topic you are passionate about', emoji: '🗣️', skills: ['communication', 'critical thinking', 'persuasion'] },
  { id: 12, text: 'Creating a budget to save for something you want', emoji: '💰', skills: ['planning', 'financial literacy', 'organization'] },
];
