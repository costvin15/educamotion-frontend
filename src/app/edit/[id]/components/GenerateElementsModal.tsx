import { forwardRef, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

import client from '@/client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { useEditorStore } from '@/app/edit/[id]/store/editor';
import { InteractiveElementQuestionMultipleChoice, InteractiveElementQuestionObjective, InteractiveElementQuestionSubjective, InteractiveElements, InteractiveElementType, InteractiveElementWordCloud } from '@/app/edit/[id]/types/pages';
import { createQuestion } from '@/app/edit/[id]/utils/EditorElements';
import { QuestionType } from '@/app/elements/question/types';

const fetchElementsGenerated = async(presentationId: string, slideId: string) : Promise<InteractiveElements> => {
  const { data } = await client.get(`/presentation/generate-elements/${presentationId}/${slideId}`);
  return data;
};

interface GenerateElementsModalProps {
  isOpen: boolean;
  onClose: () => void;
};

export const GenerateElementsModal = forwardRef<HTMLDivElement, GenerateElementsModalProps>(
  ({ isOpen, onClose }, ref) => {
    const store = useEditorStore();
    const [ generationCompleted, setGenerationCompleted ] = useState(false);
    const [ elements, setElements ] = useState<InteractiveElements | null>(null);
    const [ alreadyImportedCount, setAlreadyImportedCount ] = useState(0);

    async function addElementsToPresentation() {
      if (!elements) {
        return;
      }
      for (const element of elements.interactive_objects) {
        let newElement = null;
        if (element.type === InteractiveElementType.QUESTION_OBJECTIVE) {
          const object = element as InteractiveElementQuestionObjective;
          newElement = await createQuestion(
            store.presentationId,
            store.slides[store.currentSlideIndex].objectId,
            object.title,
            object.description,
            QuestionType.OBJECTIVE,
            object.options,
            object.answer
          );
          console.log('Objective question created', newElement);
        } else if (element.type === InteractiveElementType.QUESTION_SUBJECTIVE) {
          const object = element as InteractiveElementQuestionSubjective;
          newElement = await createQuestion(
            store.presentationId,
            store.slides[store.currentSlideIndex].objectId,
            object.title,
            object.description,
            QuestionType.DISCURSIVE,
            [],
            ''
          );
          console.log('Discursive question created', newElement);
        } else if (element.type === InteractiveElementType.QUESTION_MULTIPLE_CHOICE) {
          const object = element as InteractiveElementQuestionMultipleChoice;
          newElement = await createQuestion(
            store.presentationId,
            store.slides[store.currentSlideIndex].objectId,
            object.title,
            object.description,
            QuestionType.MULTIPLE_CHOICE,
            object.options,
            object.correct_options.join(',')
          );
          console.log('Multiple choice question created', newElement);
        } else if (element.type === InteractiveElementType.WORD_CLOUD) {
          element as InteractiveElementWordCloud;
          console.log('Word cloud ignored');
        }

        if (newElement) {
          store.addElementToSlide(newElement);
        }
        setAlreadyImportedCount((count) => count + 1);
      }

      onClose();
    };

    useEffect(() => {
      setGenerationCompleted(false);
      setElements(null);

      if (!isOpen) {
        return;
      }

      (async () => {
        await handleGenerateElements();
        setGenerationCompleted(true);
      })();
    }, [isOpen]);

    useEffect(() => {
      try {
        addElementsToPresentation();
      } catch (error) {
        console.error('Error adding elements to presentation', error);
        onClose();
      }
    }, [elements]);
    
    const handleGenerateElements = async () => {
      const slide = store.slides[store.currentSlideIndex];
      const elements = await fetchElementsGenerated(store.presentationId, slide.objectId);
      setElements(elements);
    }

    return (
      <div ref={ref}>
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <DialogContent className='sm:max-w-[680px]'>
            <DialogHeader>
              <DialogTitle>Gerar objetos interativos</DialogTitle>
            </DialogHeader>
            <ScrollArea>
              <div className='mb-3 flex flex-col items-center'>
                <Loader2 className='animate-spin h-8 w-8 text-primary' />
                {!generationCompleted && <span className='mt-2'>Gerando objetos interativos...</span>}
                {generationCompleted && <span className='mt-2'>Adicionando objetos interativos na apresentação... {alreadyImportedCount}/{elements?.interactive_objects.length}</span>}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
);
