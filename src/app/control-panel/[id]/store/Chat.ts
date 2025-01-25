import { create } from "zustand";

interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
};

export interface ChatState {
  messages: Message[];
  addMessage: (message: string, userId: string) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (message, userId) => set((state) => ({
    messages: [
      {
        id: Math.random().toString(36).substr(2, 9),
        userId,
        content: message,
        timestamp: new Date()
      },
      ...state.messages
    ]
  }))
}));
