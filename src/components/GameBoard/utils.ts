import { ICell } from '../../types/types';

type CreateGridProps = {
  col: number;
  row: number;
  bombs: number;
};

function getFilledArray(countCell: number, countBombs: number): ICell[] {
  const result: ICell[] = [];
  let bombsDistribute = countBombs;

  for (let i = 0; i < countCell; i += 1) {
    result.push({ status: 'closed', bombInside: false });
  }

  while (bombsDistribute > 0) {
    const randomIndex = Math.trunc(Math.random() * countCell);
    if (!result[randomIndex].bombInside) {
      result[randomIndex].bombInside = true;
      bombsDistribute -= 1;
    }
  }

  return result;
}

function convertArray(col: number, row: number, source: ICell[]): ICell[][] {
  const result: ICell[][] = [];

  for (let i = 0; i < col; i += 1) {
    result.push([]);
    for (let j = 0; j < row; j += 1) {
      result[i].push(source[i * row + j]);
    }
  }

  return result;
}

export function createGrid({ col, row, bombs }: CreateGridProps): ICell[][] {
  const oneDimArray = getFilledArray(col * row, bombs);
  const cells: ICell[][] = convertArray(col, row, oneDimArray);

  return cells
}
