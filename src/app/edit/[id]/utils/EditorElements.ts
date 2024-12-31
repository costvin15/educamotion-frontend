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
}

const createQuestion = async (presentationId: string, slideId: string, questionType : QuestionType) => {
  const element = await createElement(presentationId, slideId, ElementType.QUESTION);

  const { data } = await client.post('/element/question/add', {
    id: element.id,
    question: 'What is the answer to life, the universe and everything?',
    description: 'The answer to life, the universe and everything is 42.',
    type: questionType,
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    correctOption: 'Option 1'
  });

  console.log(data);
}

// export const addBlankTextToEditor = (store : EditorState) => {
  // store.addElementToSlide({
  //   id: Date.now().toString(),
  //   elementType: SlideElementType.TEXT,
  //   x: 0,
  //   y: 0,
  //   width: 20,
  //   height: 10,
  //   rotation: 0,
  //   content: 'Hello World',
  //   style: {
  //     fontSize: 16,
  //     color: '#000000',
  //   },
  // });
// };

export const addObjectiveQuestionToEditor = (store : EditorState) => {
  const slide = store.slides[store.currentSlideIndex];
  const presentationId = store.presentationId;
  const slideId = slide.objectId;

  createQuestion(presentationId, slideId, QuestionType.OBJECTIVE);
}

export const addDiscursiveQuestionToEditor = (store : EditorState) => {
  const slide = store.slides[store.currentSlideIndex];
  const presentationId = store.presentationId;
  const slideId = slide.objectId;

  createQuestion(presentationId, slideId, QuestionType.DISCURSIVE);
}

export const addMultipleChoiceQuestionToEditor = (store : EditorState) => {
  const slide = store.slides[store.currentSlideIndex];
  const presentationId = store.presentationId;
  const slideId = slide.objectId;

  createQuestion(presentationId, slideId, QuestionType.MULTIPLE_CHOICE);
}

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
