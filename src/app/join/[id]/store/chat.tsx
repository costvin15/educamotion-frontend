import { create } from "zustand";

interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
};

export interface ChatState {
  panelOpened: boolean;
  messages: Message[];
  openPanel: () => void;
  closePanel: () => void;
  addMessage: (message: string, userId: string) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  panelOpened: false,
  messages: [],
  openPanel: () => set((state) => ({ panelOpened: true })),
  closePanel: () => set((state) => ({ panelOpened: false })),
  addMessage: (message, userId) => set((state) => ({
    messages: [
      ...state.messages,
      {
        id: Math.random().toString(36).substr(2, 9),
        userId,
        content: message,
        timestamp: new Date()
      }
    ]
  }))
}));
