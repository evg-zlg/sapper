export type TCellStatus =
  | 'closed'
  | 'open'
  | 'flag-icon'
  | 'quest-icon'
  | 'around-bombs'
  | 'bomb-open'
  | 'bomb-boom'
  | 'wrong-bomb';

export interface ICell {
  id: number;
  status: TCellStatus;
  content: number;
  position: {
    i: number;
    j: number;
  }
}

export type TLevelType = 'easy' | 'normal' | 'hard' | 'custom';

export type TGamePhase = 'change-lvl' | 'new' | 'play' |  'lost' | 'win';

export type TBorderShadowType = 'big-inside' | 'big-outside' | 'cell' | 'small-inside' | 'small-outside' | 'none';

export type IBoardParams = {
  col: number;
  row: number;
  bombs: number;
};

export interface IGameParams {
  cells: ICell[][];
  boardParams: IBoardParams;
}

export interface IWinner {
  id: number,
  boardParams: IBoardParams,
  timeLeft: number,
}