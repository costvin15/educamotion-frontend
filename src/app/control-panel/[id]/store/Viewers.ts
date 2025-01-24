import { PresenceMessage } from "ably";
import { create } from "zustand";

export interface ViewersState {
  viewers: PresenceMessage[];
  addViewer: (viewer: PresenceMessage) => void;
  reset: () => void;
}

export const useViewersStore = create<ViewersState>((set) => ({
  viewers: [],
  addViewer: (viewer) => set((state) => ({ viewers: [...state.viewers, viewer] })),
  reset: () => set((state) => ({ viewers: [] })),
}));
