export type TCellStatus =
  | 'closed'
  | 'open'
  | 'flag-icon'
  | 'quest-icon'
  | 'around-bombs'
  | 'bomb-open'
  | 'bomb-boom';

export interface ICell {
  status: TCellStatus;
  content: number;
  position: {
    i: number;
    j: number;
  }
}

export type TLevelType = 'easy' | 'normal' | 'hard' | 'custom';

export type TGamePhase = 'new' | 'play' | 'process' | 'lost' | 'win';

export type IBoardParams = {
  col: number;
  row: number;
  bombs: number;
};

export interface IGameParams {
  cells: ICell[][];
  boardParams: IBoardParams;
}