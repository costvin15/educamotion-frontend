import React from "react";

import { Question, QuestionProperties } from "@/app/elements/question";
import { WordCloud } from "@/app/elements/WordCloud";
import { Cosmo } from "@/app/elements/Cosmo";
import { SlideElement } from "@/app/edit/[id]/types/pages";

export const QUESTION_ELEMENT_TYPE = 'QUESTION';
export const WORDCLOUD_ELEMENT_TYPE = 'WORDCLOUD';
export const COSMO_ELEMENT_TYPE = 'COSMO';

export enum ElementType {
  QUESTION = QUESTION_ELEMENT_TYPE,
  WORDCLOUD = WORDCLOUD_ELEMENT_TYPE,
  COSMO = COSMO_ELEMENT_TYPE,
};

export interface ElementProps {
  element: SlideElement;
  onLoaded?: () => void;
}

export const Elements : Record<string, React.FC<ElementProps>> = {
  [QUESTION_ELEMENT_TYPE]: Question,
  [WORDCLOUD_ELEMENT_TYPE]: WordCloud,
  [COSMO_ELEMENT_TYPE]: Cosmo,
};

export const ElementProperties : Record<string, React.FC<{ element: SlideElement}>> = {
  [QUESTION_ELEMENT_TYPE]: QuestionProperties,
};
