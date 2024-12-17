import { EditorState } from "@/app/edit/[id]/store/editor";
import { SlideElementType } from "@/app/edit/[id]/types/pages";

export const addBlankTextToEditor = (store : EditorState) => {
  store.addElementToSlide({
    id: Date.now().toString(),
    type: SlideElementType.TEXT,
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
