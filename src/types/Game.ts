export type Note = {
  id: string;
  name: string;
  cipher: string;
  src: string;
  frequency: number[];
};

export type GameLevel = {
  level: number;
  notes: Note[];
};
