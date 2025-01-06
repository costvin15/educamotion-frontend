import { create } from 'zustand';

import { Question, QuestionType } from '@/app/elements/question/types';

export interface QuestionState {
  question: Question;
  setQuestion: (question: Question) => void;
};

const initialState: Question = {
  id: '',
  title: '',
  description: '',
  type: QuestionType.DISCURSIVE,
  options: [],
  correctOption: '',
};

export const useQuestionStore = create<QuestionState>((set) => ({
  question: initialState,
  setQuestion: (question) => set((state) => ({ question, title: question.title, description: question.description })),
}));
