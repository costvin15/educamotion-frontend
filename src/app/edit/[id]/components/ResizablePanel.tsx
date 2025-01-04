import { forwardRef } from 'react';
import { Resizable, ResizableProps } from 're-resizable';

interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  width: number;
  height: number;
  onSizeChange: (width: number, height: number) => void;
  isSelected?: boolean;
}

export const ResizablePanel = forwardRef<ResizableProps, ResizablePanelProps>(
  ({ children, isSelected, width, height, onSizeChange, onResize, ...props }, ref) => {
    return (
      <Resizable
        className={isSelected ? 'border-4 border-dashed border-sky-500 rounded-lg' : ''}
        minWidth={250}
        minHeight={150}
        size={{ width, height }}
        onResizeStart={(e, dir, ref) => {}}
        onResizeStop={(event, direction, ref, delta) => {
          onSizeChange(ref.offsetWidth, ref.offsetHeight);
        }}
        {...props}
      >
        { children }
        {isSelected && (
          <>
            <div className='w-3 h-3 top-[-5px] left-[-5px] bg-sky-500 rounded-full absolute'></div>
            <div className='w-3 h-3 top-[-5px] right-[-5px] bg-sky-500 rounded-full absolute'></div>
            <div className='w-3 h-3 bottom-[-5px] left-[-5px] bg-sky-500 rounded-full absolute'></div>
            <div className='w-3 h-3 bottom-[-5px] right-[-5px] bg-sky-500 rounded-full absolute'></div>
          </>
        )}
      </Resizable>
    )
  }
);
