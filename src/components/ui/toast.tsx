'use client';

import { toast, type ToasterProps } from 'sonner';

type ToastProps = ToasterProps;

export { toast, type ToastProps };

export function useToast() {
  return {
    toast,
    dismiss: toast.dismiss,
  };
}