import { CircleHelp, Cloud, CodeXml, Image, Type } from 'lucide-react';

import { addObjectiveQuestionToEditor, addLeetCodeToEditor as addLeetCodeToEditor, addQuestionToEditor, addWordCloudToEditor, addDiscursiveQuestionToEditor, addMultipleChoiceQuestionToEditor } from '@/app/edit/[id]/utils/EditorElements';
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
    id: 'objective-question',
    name: 'Pergunta objetiva',
    description: 'Adicione uma pergunta com alternativas pré-definidas e com uma única resposta ao seu slide',
    icon: <CircleHelp className='h-6 w-6 text-muted-foreground' />,
    onAdd: (store) => addObjectiveQuestionToEditor(store)
  },
  {
    id: 'discursive-question',
    name: 'Pergunta discursiva',
    description: 'Adicione uma pergunta discursiva ao seu slide',
    icon: <CircleHelp className='h-6 w-6 text-muted-foreground' />,
    onAdd: (store) => addDiscursiveQuestionToEditor(store)
  },
  {
    id: 'multiple-choice-question',
    name: 'Pergunta de múltipla escolha',
    description: 'Adicione uma pergunta com alternativas pré-definidas e com múltiplas respostas ao seu slide',
    icon: <CircleHelp className='h-6 w-6 text-muted-foreground' />,
    onAdd: (store) => addMultipleChoiceQuestionToEditor(store)
  },
  {
    id: 'wordcloud',
    name: 'Nuvem de palavras',
    description: 'Adicione uma nuvem de palavras ao seu slide',
    icon: <Cloud className='h-6 w-6 text-muted-foreground' />,
    onAdd: (store) => addWordCloudToEditor(store)
  },
  {
    id: 'cosmo',
    name: 'Cosmo',
    description: 'Adicione um problema do Cosmo ao seu slide',
    icon: <CodeXml className='h-6 w-6 text-muted-foreground' />,
    onAdd: (store) => addLeetCodeToEditor(store)
  }
];
