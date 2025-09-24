
import { GoogleGenAI, Chat } from "@google/genai";
import type { UserProfile } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chatInstance: Chat | null = null;

const getSystemInstruction = (userProfile: UserProfile): string => {
  return `You are Disha, a friendly, modern, and encouraging AI career advisor for students in India.
Your primary goal is to provide personalized, insightful, and actionable career guidance based on the user's profile.
Always be positive and empowering. Keep your responses concise and easy to read, using formatting like lists and bold text where helpful.
You are aware of the Indian job market and educational landscape.

User Profile:
- Name: ${userProfile.name}
- Interests: ${userProfile.interests}
- Skills: ${userProfile.skills}
- Personality: ${userProfile.personality}

Based on this profile, tailor every response to be as relevant as possible to ${userProfile.name}. Do not just repeat the profile information; use it to make inferences and connections. Start your first message with a warm welcome to the user by their name.`;
};


export const startChat = (userProfile: UserProfile): Chat => {
  if (chatInstance) {
    return chatInstance;
  }
  
  chatInstance = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: getSystemInstruction(userProfile),
    },
  });
  return chatInstance;
};


export const getChatInstance = (): Chat | null => {
  return chatInstance;
};

export const generateContent = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    return "I'm having a little trouble thinking right now. Please try again in a moment.";
  }
};
