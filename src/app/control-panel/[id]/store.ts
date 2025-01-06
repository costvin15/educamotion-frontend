import { create } from "zustand";

import { Page } from "@/app/edit/[id]/types/pages";
import { SlideElement } from "@/app/control-panel/[id]/types";

export interface ControlPanelState {
  presentationId: string;
  classroomId: string;
  numberOfPages: number;
  currentSlide: Page;
  currentSlideIndex: number;
  slidesIds: string[];
  elements: Record<string, SlideElement[]>;
  setPresentationId: (id: string) => void;
  setClassroomId: (id: string) => void;
  setNumberOfPages: (number: number) => void;
  setCurrentSlide: (slide: Page) => void;
  setCurrentSlideIndex: (index: number) => void;
  setSlidesIds: (ids: string[]) => void;
  setElements: (elements: Record<string, SlideElement[]>) => void;
  reset: () => void;
};

const initialState: Page = {
  objectId: 'initial-slide',
  background: '',
  elements: [],
};

export const useControlPanelStore = create<ControlPanelState>((set) => ({
  presentationId: '',
  classroomId: '',
  numberOfPages: 0,
  currentSlide: initialState,
  currentSlideIndex: 0,
  slidesIds: [],
  elements: {},
  setPresentationId: (id) => set((state) => ({ presentationId: id })),
  setClassroomId: (id) => set((state) => ({ classroomId: id })),
  setNumberOfPages: (number) => set((state) => ({ numberOfPages: number })),
  setCurrentSlide: (slide) => set((state) => ({ currentSlide: slide })),
  setCurrentSlideIndex: (index) => set((state) => ({ currentSlideIndex: index })),
  setSlidesIds: (ids) => set((state) => ({ slidesIds: ids })),
  setElements: (elements) => set((state) => ({ elements: elements })),
  reset: () => set((state) => ({
    presentationId: '',
    classroomId: '',
    numberOfPages: 0,
    currentSlide: initialState,
    currentSlideIndex: 0,
    slidesIds: [],
    elements: {},
  })),
}));
