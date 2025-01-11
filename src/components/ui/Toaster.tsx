import { useToast } from '@/hooks/use-toast';
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/Toast';
import { useEffect } from 'react';

export function Toaster() {
  const state = useToast();

  useEffect(() => {
    console.log('toaster', state);
  }, [state]);

  return (
    <ToastProvider>
      {state.toasts.map(({ id, title, description, action, ...props }) => {
        console.log('toaster', id, props);
        return (
          <Toast key={id} {...props}>
            <div className='grid gap-1 mt-1'>
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
