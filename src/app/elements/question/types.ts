import { ElementType } from "@/app/elements";

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
  correctOption: string;
}

export interface QuestionProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

export interface QuestionPropertiesProps {
  questionId: string;
}

export interface QuestionAnswer {
  questionId: string;
  answer: string;
  answeredAt: Date;
}

export interface QuestionAnswerReport {
  questionId: string;
  userId: string;
  answer: string;
  correct: boolean;
  answeredAt: Date;
}

export interface ReportPage {
  page: string;
  answers: QuestionAnswerReport[];
}

export interface Report {
  pages: ReportPage[];
}

export interface SlideElement {
  id: string;
  elementType: ElementType;
};

export interface Presentation {
  id: string;
  title: string;
  thumbnail: string;
  lastModified: string;
  slidesIds: string[];
  elements: Record<string, SlideElement[]>;
};

export interface User {
  id: string;
  name: string;
  profilePicture: string;
}
