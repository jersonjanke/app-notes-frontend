import { toast } from 'react-toastify';

export const toastMSG = (msg: string, type: 'success' | 'error') => {
  toast(msg, {
    type,
    theme: 'colored',
  });
};
