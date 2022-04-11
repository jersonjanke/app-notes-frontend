export interface Score {
  id?: number;
  email: string;
  score?: number;
  life?: number;
}

export interface ScoreDto {
  done: boolean;
  email: string;
  life: number;
  score: number;
  __v?: number;
  _id?: string;
}
