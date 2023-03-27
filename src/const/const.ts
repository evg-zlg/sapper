import { IBoardParams } from "../types/types";

export enum APPRoute {
  main = '/',
  winners = '/winners',
}

export const baseLevelsOptions: IBoardParams[] = [
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
];
