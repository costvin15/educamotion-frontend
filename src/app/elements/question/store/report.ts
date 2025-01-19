import { create } from 'zustand';

import { Presentation, Report } from '@/app/elements/question/types';

export interface QuestionReportState {
  report: Report | null;
  presentation: Presentation | null;
  slidesIds: Map<string, number>;
  setReport: (report: Report) => void;
  setPresentation: (presentation: Presentation) => void;
  setSlidesIds: (slidesIds: string[]) => void;
}

export const useQuestionReportStore = create<QuestionReportState>((set) => ({
  report: null,
  presentation: null,
  slidesIds: new Map<string, number>(),
  setReport: (report) => set((state) => ({ report })),
  setPresentation: (presentation) => set((state) => ({ presentation })),
  setSlidesIds: (slidesIds: string[]) => set((state) => {
    const newSlidesIds = new Map(state.slidesIds);
    slidesIds.forEach((id, index) => newSlidesIds.set(id, index));
    return { slidesIds: newSlidesIds };
  })
}));
