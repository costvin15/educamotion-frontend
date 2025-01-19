import { ElementType } from "@/app/elements";

export interface Page {
  objectId: string;
  background: string;
  elements: SlideElement[];
  isLoading?: boolean;
}

export interface DetailPresentation {
  id: string;
  title: string;
  thumbnail: string;
  lastModified: string;
  slidesIds: string[];
  elements: Record<string, SlideElement[]>;
}

export interface SlideElement {
  id: string;
  elementType: ElementType;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  owner: boolean;
}

export enum InteractiveElementType {
  QUESTION_OBJECTIVE = 'QUESTION_OBJECTIVE',
  QUESTION_SUBJECTIVE = 'QUESTION_SUBJECTIVE',
  QUESTION_MULTIPLE_CHOICE = 'QUESTION_MULTIPLE_CHOICE',
  WORD_CLOUD = 'WORD_CLOUD',
}

export interface InteractiveElements {
  interactive_objects: (InteractiveElementQuestionObjective|InteractiveElementQuestionSubjective|InteractiveElementQuestionMultipleChoice|InteractiveElementWordCloud)[];
}

export interface InteractiveElement {
  type: InteractiveElementType;
}

export interface InteractiveElementQuestionObjective extends InteractiveElement {
  title: string;
  description: string;
  options: string[];
  answer: string;
}

export interface InteractiveElementQuestionSubjective extends InteractiveElement {
  title: string;
  description: string;
}

export interface InteractiveElementQuestionMultipleChoice extends InteractiveElement {
  title: string;
  description: string;
  options: string[];
  correct_options: string[];
}

export interface InteractiveElementWordCloud extends InteractiveElement {
  words: { value: string, weight: number }[];
}
