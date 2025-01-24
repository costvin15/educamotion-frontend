import { InteractionLog } from "@/app/control-panel/[id]/types/Interaction";
import { create } from "zustand";

export interface InteractionLogsState {
  logs: InteractionLog[];
  messagesProcessed: Record<string, boolean>;
  addLog: (log: InteractionLog) => void;
  addMessageProcessed: (messageId: string) => void;
};

export const useInteractionLogsStore = create<InteractionLogsState>((set) => ({
  logs: [],
  messagesProcessed: {},
  addLog: (log) => set((state) => ({ logs: [log, ...state.logs] })),
  addMessageProcessed: (messageId) => set((state) => ({ messagesProcessed: { ...state.messagesProcessed, [messageId]: true } })),
}));
