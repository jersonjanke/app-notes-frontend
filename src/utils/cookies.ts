import { parseCookies, setCookie, destroyCookie } from 'nookies';

export const keys = {
  token: '@guitar/token',
  user: '@guitar/user',
};

export const cookies = {
  get: (key: string) => {
    return parseCookies()[key];
  },
  set: (key: string, value: string) => {
    return setCookie({}, key, value, { path: '/' });
  },
  remove: (key: string) => {
    return destroyCookie({}, key, { path: '/' });
  },
};
