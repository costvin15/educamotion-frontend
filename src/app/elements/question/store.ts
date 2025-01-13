import { create } from 'zustand';

import { Question, QuestionAnswer, QuestionType } from '@/app/elements/question/types';

export interface QuestionState {
  questions: Map<string, Question>;
  answers: Map<string, QuestionAnswer>;
  setQuestion: (question: Question) => void;
  setAnswer: (questionId: string, answer: QuestionAnswer) => void;
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
  answers: new Map<string, QuestionAnswer>(),
  setQuestion: (question) => set((state) => {
    const newQuestions = new Map(state.questions);
    newQuestions.set(question.id, question);
    return { questions: newQuestions };
  }),
  setAnswer: (questionId, answer) => set((state) => {
    const newAnswers = new Map(state.answers);
    newAnswers.set(questionId, answer);
    return { answers: newAnswers };
  }),
}));
