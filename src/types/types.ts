export interface ICell {
  status: 'closed' | 'open' | 'flag-icon' | 'bomb-icon' | 'around-bombs' | 'bomb-open' | 'bomb-boom';
  bombInside: boolean;
}

export interface IBoardParams {
  col: number;
  row: number;
  bombs: number;
}