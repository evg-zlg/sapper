export interface ICell {
  status: 'closed' | 'open' | 'flag-icon' | 'bomb-icon' | 'around-bombs' | 'bomb-open' | 'bomb-boom';
  bombInside: boolean;
}