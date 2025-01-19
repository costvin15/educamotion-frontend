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

export const addQuestionToEditor = (store : EditorState) => {
  // store.addElementToSlide({
  //   id: Date.now().toString(),
  //   elementType: SlideElementType.QUESTION,
  //   x: 0,
  //   y: 0,
  //   width: 20,
  //   height: 10,
  //   rotation: 0,
  //   content: 'What is the answer to life, the universe and everything?',
  //   style: {
  //     fontSize: 16,
  //     color: '#000000',
  //   },
  // });
}

export const addWordCloudToEditor = (store : EditorState) => {
  // store.addElementToSlide({
  //   id: Date.now().toString(),
  //   elementType: SlideElementType.WORDCLOUD,
  //   x: 0,
  //   y: 0,
  //   width: 20,
  //   height: 10,
  //   rotation: 0,
  //   content: 'Word Cloud',
  //   style: {
  //     fontSize: 16,
  //   },
  // });
}

export const addLeetCodeToEditor = (store : EditorState) => {
  // store.addElementToSlide({
  //   id: Date.now().toString(),
  //   elementType: SlideElementType.LEETCODE,
  //   x: 0,
  //   y: 0,
  //   width: 20,
  //   height: 10,
  //   rotation: 0,
  //   content: '',
  //   style: {
  //     fontSize: 16,
  //     color: '#000000',
  //   },
  // });
}
