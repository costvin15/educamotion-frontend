import { Button } from "@/components/ui/Button";
import { mergeClassNames } from "@/components/utils";

export function PageThumbnails() {
  return (
    <div className='space-y-2'>
      <h2 className='mb-4 font-semibold'>Páginas</h2>
      <div className='space-y-2'>
        <Button
          variant="ghost"
          className={mergeClassNames(
              'h-[120px] w-full p-1',
              'ring-2 ring-primary ring-offset-2'
            )}
          >
            <div
              className="h-full w-full rounded"
              style={{ background: 'white' }}
            >
              {/* Render thumbnail content */}
            </div>
          </Button>
      </div>
    </div>
  );
}
