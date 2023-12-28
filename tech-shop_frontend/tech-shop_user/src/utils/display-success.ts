import { toast } from 'react-toastify';

export function displaySuccessMessage(message: string) {
  toast.success(message, {
    autoClose: 1000,
  });
}
