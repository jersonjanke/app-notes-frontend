export interface Score {
  level: number;
  id?: number;
  email: string;
  score?: number;
  life?: number;
}

export type GameListNotes = {
  level: number;
  correct: string;
  selected: string;
};

export interface ScoreDto {
  level: number;
  done: boolean;
  email: string;
  life: number;
  score: number;
  notes: GameListNotes[];
  __v?: number;
  _id: string;
}
