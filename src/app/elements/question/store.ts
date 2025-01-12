import { create } from 'zustand';

import { Question, QuestionType } from '@/app/elements/question/types';

export interface QuestionState {
  questions: Map<string, Question>;
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
  questions: new Map<string, Question>(),
  setQuestion: (question) => set((state) => {
    const newQuestions = new Map(state.questions);
    newQuestions.set(question.id, question);
    return { questions: newQuestions };
  }),
}));
