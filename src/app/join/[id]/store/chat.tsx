import { create } from "zustand";

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: Date;
};

export interface ChatState {
  panelOpened: boolean;
  messages: Message[];
  openPanel: () => void;
  closePanel: () => void;
  sendMessage: (message: string) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  panelOpened: false,
  messages: [],
  openPanel: () => set((state) => ({ panelOpened: true })),
  closePanel: () => set((state) => ({ panelOpened: false })),
  sendMessage: (message) => set((state) => ({
    messages: [
      ...state.messages,
      {
        id: String(state.messages.length + 1),
        user: 'Vinicius',
        content: message,
        timestamp: new Date()
      }
    ]
  }))
}));
