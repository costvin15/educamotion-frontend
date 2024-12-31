export enum QuestionType {
  DISCURSIVE = 'DISCURSIVE',
  OBJECTIVE = 'OBJECTIVE',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE'
}

export interface Question {
  id: string;
  title: string;
  description: string;
  type: QuestionType;
  options: string[];
  correctAnswer: string;
}
