import { ConfigDto } from './../../../types/Config';
import { CONFIG } from '../';

export const setConfig = (config: ConfigDto) => ({
  type: CONFIG,
  payload: config,
});
