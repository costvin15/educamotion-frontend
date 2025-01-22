import client from '@/client';

import { ElementType } from '@/app/elements';

import { EditorState } from "@/app/edit/[id]/store/editor";
import { SlideElement } from '@/app/edit/[id]/types/pages';
import { QuestionType } from '@/app/elements/question/types';

const createElement = async (presentationId: string, slideId: string, elementType: ElementType) : Promise<SlideElement> => {
  const { data } = await client.post('/element/create', {
    presentationId,
    slideId,
    elementType,
  });
  return data;
};

export const createQuestion = async (presentationId: string, slideId: string, title: string, description: string, questionType : QuestionType, options: string[], correct_option: string) : Promise<SlideElement> => {
  const element = await createElement(presentationId, slideId, ElementType.QUESTION);

  await client.post('/element/question/add', {
    id: element.id,
    question: title,
    description: description,
    type: questionType,
    options: options,
    correctOption: correct_option,
  });

  return element;
};

export const createWordCloud = async (presentationId: string, slideId: string, title: string, enableMultipleEntries: boolean) : Promise<SlideElement> => {
  const element = await createElement(presentationId, slideId, ElementType.WORDCLOUD);

  await client.post('/element/word-cloud/add', {
    id: element.id,
    title: title,
    enableMultipleEntries: enableMultipleEntries,
  });

  return element;
}

const createDefaultQuestion = async (presentationId: string, slideId: string, questionType : QuestionType) : Promise<SlideElement> => {
  return createQuestion(
    presentationId,
    slideId,
    'What is the answer to life, the universe and everything?',
    'The answer to life, the universe and everything is 42.',
    questionType,
    ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    'Option 1'
  );
}

export const addObjectiveQuestionToEditor = async (store : EditorState) => {
  const slide = store.slides[store.currentSlideIndex];
  const presentationId = store.presentationId;
  const slideId = slide.objectId;

  const question = await createDefaultQuestion(presentationId, slideId, QuestionType.OBJECTIVE);
  store.addElementToSlide(question);
};

export const addDiscursiveQuestionToEditor = async (store : EditorState) => {
  const slide = store.slides[store.currentSlideIndex];
  const presentationId = store.presentationId;
  const slideId = slide.objectId;

  const question = await createDefaultQuestion(presentationId, slideId, QuestionType.DISCURSIVE);
  store.addElementToSlide(question);
};

export const addMultipleChoiceQuestionToEditor = async (store : EditorState) => {
  const slide = store.slides[store.currentSlideIndex];
  const presentationId = store.presentationId;
  const slideId = slide.objectId;

  const question = await createDefaultQuestion(presentationId, slideId, QuestionType.MULTIPLE_CHOICE);
  store.addElementToSlide(question);
};

export const addWordCloudToEditor = async (store : EditorState) => {
  const slide = store.slides[store.currentSlideIndex];
  const presentationId = store.presentationId;
  const slideId = slide.objectId;

  const wordcloud = await createWordCloud(presentationId, slideId, 'Edite me!', true);
  store.addElementToSlide(wordcloud);
};
