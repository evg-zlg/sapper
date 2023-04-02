import { IBoardParams, ICell, TLevelType } from '../types/types';

export enum APPRoute {
  main = '/',
  winners = '/winners',
}

export const levels: IBoardParams[] = [
  {
    col: 8,
    row: 8,
    bombs: 10,
  },
  {
    col: 16,
    row: 16,
    bombs: 40,
  },
  {
    col: 16,
    row: 32,
    bombs: 100,
  },
  {
    col: 10,
    row: 10,
    bombs: 20,
  },
];

export const palette = new Map([
  [1, '#0040d3'],
  [2, '#006a00'],
  [3, '#c10101'],
  [4, '#00008B'],
  [5, '#A52A2A'],
  [6, '#2b857c'],
  [7, '#000000'],
  [8, '#FFFFFF'],
]);

export const initCell: ICell = {
  id: 0,
  content: 0,
  status: 'closed',
  position: { i: 0, j: 0 },
};

export const menuButtons: {levelType: TLevelType, text: string}[] = [
  { levelType: 'easy', text: 'easy' },
  { levelType: 'normal', text: 'normal' },
  { levelType: 'hard', text: 'hard' },
  { levelType: 'custom', text: 'custom' },
];

export const minMaxFormValues = {
  colMin: 10,
  colMax: 16,
  rowMin: 10,
  rowMax: 32,
  bombMin: 1,
  bombMax: 999,
};

export const localStorageKey = 'winners';