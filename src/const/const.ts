import { IBoardParams } from '../types/types';

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
  [1, '#004DFF'],
  [2, '#008000'],
  [3, '#FF0000'],
  [4, '#00008B'],
  [5, '#A52A2A'],
  [6, '#40E0D0'],
  [7, '#000000'],
  [8, '#FFFFFF'],
]);