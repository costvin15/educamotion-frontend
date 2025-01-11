import { ReactNode, useEffect, useState } from 'react';

import { ToastProps } from '@/components/ui/Toast';

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 1000000;

let count = 0;
function generateId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type Toast = Omit<ToasterToast, 'id'>;

type ToasterToast = ToastProps & {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
};

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const;

type ActionType = typeof actionTypes;

type Action =
  | { type: ActionType['ADD_TOAST']; payload: ToasterToast }
  | { type: ActionType['UPDATE_TOAST']; payload: Partial<ToasterToast> }
  | { type: ActionType['DISMISS_TOAST']; payload: ToasterToast['id'] }
  | { type: ActionType['REMOVE_TOAST']; payload: ToasterToast['id'] };

interface State {
  toasts: ToasterToast[];
}

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  console.log('dispatch', action, memoryState);
  listeners.forEach(listener => {
    listener(memoryState);
  });
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();
const addToRemoveQueue = (id: string) => {
  if (toastTimeouts.has(id)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(id);
    dispatch({ type: actionTypes.REMOVE_TOAST, payload: id });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(id, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [ action.payload, ...state.toasts ].slice(0, TOAST_LIMIT)
      };
    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map(toast => {
          if (toast.id === action.payload.id) {
            return {
              ...toast,
              ...action.payload
            };
          }
          return toast;
        })
      };
    case actionTypes.DISMISS_TOAST: {
      if (action.payload) {
        addToRemoveQueue(action.payload);
      } else {
        state.toasts.forEach(toast => addToRemoveQueue(toast.id));
      }

      return {
        ...state,
        toasts: state.toasts.map(toast => {
          if (action.payload === undefined || toast.id === action.payload) {
            return {
              ...toast,
              open: false
            };
          }
          return toast;
        })
      };
    }
    case actionTypes.REMOVE_TOAST: {
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload)
      };
    }
  }
};

export function toast({ ...props }: Toast) {
  const id = generateId();
  console.log('toast', id, props);

  const update = (props: ToasterToast) => {
    return dispatch({
      type: 'UPDATE_TOAST',
      payload: { ...props, id }
    });
  };

  const dismiss = () => {
    return dispatch({
      type: 'DISMISS_TOAST',
      payload: id
    });
  };

  dispatch({
    type: 'ADD_TOAST',
    payload: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) {
          dismiss();
        }
      }
    }
  });

  return {
    id: id,
    update,
    dismiss
  };
};

export function useToast() {
  const [state, setState] = useState<State>(memoryState);

  useEffect(() => {
    console.log('useEffect', state);
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (id: string) => dispatch({ type: 'DISMISS_TOAST', payload: id }),
  };
};
