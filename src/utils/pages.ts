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
};

export type typePlay =
  | 'unison'
  | 'minor2nd'
  | 'major2nd'
  | 'minor3nd'
  | 'major3nd'
  | 'dim4th'
  | 'perfect4th'
  | 'dim5th'
  | 'perfect5th'
  | 'minor6nd'
  | 'major6nd'
  | 'minor7nd'
  | 'major7nd';

export const playParams = {
  unison: 'unison',
  minor2nd: 'minor2nd',
  major2nd: 'major2nd',
  minor3nd: 'minor3nd',
  major3nd: 'major3nd',
  dim4th: 'dim4th',
  perfect4th: 'perfect4th',
  dim5th: 'dim5th',
  perfect5th: 'perfect5th',
  minor6nd: 'minor6nd',
  major6nd: 'major6nd',
  minor7nd: 'minor7nd',
  major7nd: 'major7nd',
};

export const getTitleForParams = (type: typePlay) => {
  switch (type) {
    case 'unison':
      return 'Uníssono';
    case 'minor2nd':
      return '2° menor';
    case 'major2nd':
      return '2° maior';
    case 'minor3nd':
      return '3° menor';
    case 'major3nd':
      return '3° maior';
    case 'perfect4th':
      return '4° justa';
    case 'dim4th':
      return '4° aumentada';
    case 'perfect5th':
      return '5° justa';
    case 'dim5th':
      return '5° aumentada';
    case 'major6nd':
      return '6° maior';
    case 'minor6nd':
      return '6° menor';
    case 'minor7nd':
      return '7° menor';
    case 'major7nd':
      return '7° maior';
    default:
      return '';
  }
};
