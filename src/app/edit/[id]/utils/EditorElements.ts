import { EditorState } from "@/app/edit/[id]/store/editor";
import { SlideElementType } from "@/app/edit/[id]/types/pages";

export const addBlankTextToEditor = (store : EditorState) => {
  store.addElementToSlide({
    id: Date.now().toString(),
    elementType: SlideElementType.TEXT,
    x: 0,
    y: 0,
    width: 20,
    height: 10,
    rotation: 0,
    content: 'Hello World',
    style: {
      fontSize: 16,
      color: '#000000',
    },
  });
};

export const addQuestionToEditor = (store : EditorState) => {
  store.addElementToSlide({
    id: Date.now().toString(),
    elementType: SlideElementType.QUESTION,
    x: 0,
    y: 0,
    width: 20,
    height: 10,
    rotation: 0,
    content: 'What is the answer to life, the universe and everything?',
    style: {
      fontSize: 16,
      color: '#000000',
    },
  });
}

export const addWordCloudToEditor = (store : EditorState) => {
  store.addElementToSlide({
    id: Date.now().toString(),
    elementType: SlideElementType.WORDCLOUD,
    x: 0,
    y: 0,
    width: 20,
    height: 10,
    rotation: 0,
    content: 'Word Cloud',
    style: {
      fontSize: 16,
    },
  });
}

export const addLeetCodeToEditor = (store : EditorState) => {
  store.addElementToSlide({
    id: Date.now().toString(),
    elementType: SlideElementType.LEETCODE,
    x: 0,
    y: 0,
    width: 20,
    height: 10,
    rotation: 0,
    content: '',
    style: {
      fontSize: 16,
      color: '#000000',
    },
  });
}
