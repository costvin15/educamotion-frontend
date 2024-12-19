import { CircleHelp, Cloud, CodeXml, Image, Type } from 'lucide-react';

import { addBlankTextToEditor, addLeetCodeToEditor as addLeetCodeToEditor, addQuestionToEditor, addWordCloudToEditor } from '@/app/edit/[id]/utils/EditorElements';
import { EditorState } from '@/app/edit/[id]/store/editor';

export interface SlideResource {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  onAdd: (store: EditorState) => void;
}

export const SlideResources : SlideResource[] = [
  {
    id: 'text',
    name: 'Texto',
    description: 'Adicione um bloco de texto ao seu slide',
    icon: <Type className='h-6 w-6 text-muted-foreground' />,
    onAdd: (store) => addBlankTextToEditor(store)
  },
  {
    id: 'image',
    name: 'Imagem',
    description: 'Adicione uma imagem ao seu slide',
    icon: <Image className='h-6 w-6 text-muted-foreground' />,
    onAdd: (store) => console.log('Add image')
  },
  {
    id: 'question',
    name: 'Pergunta',
    description: 'Adicione uma pergunta ao seu slide',
    icon: <CircleHelp className='h-6 w-6 text-muted-foreground' />,
    onAdd: (store) => addQuestionToEditor(store)
  },
  {
    id: 'wordcloud',
    name: 'Nuvem de palavras',
    description: 'Adicione uma nuvem de palavras ao seu slide',
    icon: <Cloud className='h-6 w-6 text-muted-foreground' />,
    onAdd: (store) => addWordCloudToEditor(store)
  },
  {
    id: 'leetcode',
    name: 'LeetCode',
    description: 'Adicione um problema do LeetCode ao seu slide',
    icon: <CodeXml className='h-6 w-6 text-muted-foreground' />,
    onAdd: (store) => addLeetCodeToEditor(store)
  }
];
