import { useEditorStore } from "@/app/edit/[id]/store/editor";

export function Canvas() {
  const store = useEditorStore();

  return (
    <div className='flex h-full items-center justify-center bg-muted p-8'>
      <div className='aspect-video w-full max-w-5xl rounded-lg shadow-lg bg-white'>
        <img src={store.thumbnails[store.slides[store.currentSlideIndex].objectId]} alt='Slide' className='rounded-lg' />
      </div>
    </div>
  );
}
