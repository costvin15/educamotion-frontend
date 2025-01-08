import { create } from "zustand";

import { Page, SlideElement } from "@/app/control-panel/[id]/types";

export interface PresentationState {
  userId: string;
  classroomId: string;
  presentationId: string;
  slidesIds: string[];
  currentSlide: Page;
  currentSlideIndex: number;
  elements: Record<string, SlideElement[]>;
  setUserId: (id: string) => void;
  setClassroomId: (id: string) => void;
  setPresentationId: (id: string) => void;
  setSlidesIds: (ids: string[]) => void;
  setCurrentSlide: (slide: Page) => void;
  setCurrentSlideIndex: (index: number) => void;
  setElements: (elements: Record<string, SlideElement[]>) => void;
};

const initialState: Page = {
  objectId: 'initial-slide',
  background: '',
  elements: [],
};

export const usePresentationStore = create<PresentationState>((set) => ({
  userId: '',
  classroomId: '',
  presentationId: '',
  slidesIds: [],
  currentSlide: initialState,
  currentSlideIndex: 0,
  elements: {},
  setUserId: (id) => set((state) => ({ userId: id })),
  setClassroomId: (id) => set((state) => ({ classroomId: id })),
  setPresentationId: (id) => set((state) => ({ presentationId: id })),
  setSlidesIds: (ids) => set((state) => ({ slidesIds: ids })),
  setCurrentSlide: (slide) => set((state) => ({ currentSlide: slide })),
  setCurrentSlideIndex: (index) => set((state) => ({ currentSlideIndex: index })),
  setElements: (elements) => set((state) => ({ elements: elements })),
}));
