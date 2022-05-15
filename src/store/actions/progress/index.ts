import { PROGRESS } from '../';

export const setProgress = (value: number) => ({
  type: PROGRESS,
  payload: value,
});
