import { FREQUENCY } from '../';

export const setFrequency = (frequency: number) => ({
  type: FREQUENCY,
  payload: frequency,
});
