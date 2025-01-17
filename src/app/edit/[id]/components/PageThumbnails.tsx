import { Page } from '@/app/edit/[id]/types/pages';
import { useEditorStore } from '@/app/edit/[id]/store/editor';

import { Button } from '@/components/ui/Button';
import { mergeClassNames } from '@/components/utils';

export function PageThumbnails() {
  const { slides, currentSlideIndex, setCurrentSlide } = useEditorStore();

  return (
    <div className='space-y-2 h-[calc(100vh-90px)] overflow-y-auto'>
      <h2 className='mb-4 font-semibold'>Páginas</h2>
      <div className='space-y-2 mx-1 mb-1'>
        {slides.map((slide: Page, index: number) => {
          if (slide.isLoading) {
            return (
              <div
                key={index}
                className='h-[120px] w-full p-1 my-1'
              >
                <div
                  className='h-full w-full rounded animate-pulse'
                  style={{ background: 'gray' }}
                />
              </div>
            );
          }

          return (
            <Button
              key={index}
              variant='ghost'
              className={mergeClassNames(
                'h-[120px] w-full p-1 my-1',
                currentSlideIndex == index && 'ring-2 ring-primary ring-offset-2'
              )}
              onClick={() => setCurrentSlide(index)}
            >
              <div
                className='h-full w-full rounded'
                style={{ background: 'white' }}
              >
                <img
                  src={slide.background}
                  alt='Thumbnail'
                  className='h-full w-full object-cover rounded'
                />
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
