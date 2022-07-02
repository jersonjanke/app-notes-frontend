declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export const pages = {
  play: 'play',
  level: 'level',
  success: 'success',
  failed: 'failed',
  finished: 'finished',
  dashboard: 'dashboard',
  interval: 'interval',
  password: 'password',
  signup: 'signup',
  signupSuccess: 'signup-success',
  settings: 'settings',
};
