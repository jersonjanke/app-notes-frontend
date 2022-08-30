export type Note = {
  id: string;
  name: string;
  cipher: string;
  src: string;
  frequency: number[];
  correct: boolean;
};

export type GameLevel = {
  level: number;
  notes: Note[];
};
