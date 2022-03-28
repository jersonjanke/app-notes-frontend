export type Note = {
  name: string;
  cipher: string;
  src: string;
};

export type GameLevel = {
  level: number;
  notes: Note[];
};
