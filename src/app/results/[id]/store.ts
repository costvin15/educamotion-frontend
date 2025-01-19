import { create } from "zustand";

export interface ResultsState {
  presentationId: string;
  classroomId: string;
  setPresentationId: (id: string) => void;
  setClassroomId: (id: string) => void;
};

export const useResultsStore = create<ResultsState>((set) => ({
  presentationId: '',
  classroomId: '',
  setPresentationId: (id) => set((state) => ({ presentationId: id })),
  setClassroomId: (id) => set((state) => ({ classroomId: id })),
}));
