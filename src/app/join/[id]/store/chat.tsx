import { create } from "zustand";

export interface ChatState {
  panelOpened: boolean;
  openPanel: () => void;
  closePanel: () => void;
};

export const useChatStore = create<ChatState>((set) => ({
  panelOpened: false,
  openPanel: () => set((state) => ({ panelOpened: true })),
  closePanel: () => set((state) => ({ panelOpened: false })),
}));
