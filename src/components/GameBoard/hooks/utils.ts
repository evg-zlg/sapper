import { initCell } from '../../../const/const';
import {
  IBoardParams,
  ICell,
  TCellStatus,
  TLevelType,
} from '../../../types/types';

function addBombsInArray(
  source: ICell[],
  countBombs: number,
  excludeIndex: number,
) {
  const result: ICell[] = [...source];
  const countCell = source.length;
  let bombsDistribute = countBombs;

  while (bombsDistribute > 0) {
    const randomIndex = Math.trunc(Math.random() * countCell);
    if (randomIndex !== excludeIndex && result[randomIndex].content !== -1) {
      result[randomIndex] = {
        ...result[randomIndex],
        content: -1,
      };
      bombsDistribute -= 1;
    }
  }

  return result;
}

function addDigitsInGrid(source: ICell[][]) {
  const grid: ICell[][] = source.map((arr) => arr.slice());
  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid[i].length; j += 1) {
      if (grid[i][j].content !== -1) {
        // how many bombs around
        let bombsAround = 0;
        // top
        if (grid[i - 1] && grid[i - 1][j] && grid[i - 1][j].content === -1) {
          bombsAround += 1;
        }
        // top-right
        if (
          grid[i - 1] &&
          grid[i - 1][j + 1] &&
          grid[i - 1][j + 1].content === -1
        ) {
          bombsAround += 1;
        }
        // right
        if (grid[i][j + 1] && grid[i][j + 1].content === -1) {
          bombsAround += 1;
        }
        // right - bottom
        if (
          grid[i + 1] &&
          grid[i + 1][j + 1] &&
          grid[i + 1][j + 1].content === -1
        ) {
          bombsAround += 1;
        }
        // bottom
        if (grid[i + 1] && grid[i + 1][j] && grid[i + 1][j].content === -1) {
          bombsAround += 1;
        }
        // left-bottom
        if (
          grid[i + 1] &&
          grid[i + 1][j - 1] &&
          grid[i + 1][j - 1].content === -1
        ) {
          bombsAround += 1;
        }
        // left
        if (grid[i][j - 1] && grid[i][j - 1].content === -1) {
          bombsAround += 1;
        }
        // left-top
        if (
          grid[i - 1] &&
          grid[i - 1][j - 1] &&
          grid[i - 1][j - 1].content === -1
        ) {
          bombsAround += 1;
        }
        if (bombsAround > 0) {
          grid[i][j] = { ...grid[i][j], content: bombsAround };
        }
      }
    }
  }
  return grid;
}

function convertArray(col: number, row: number, source: ICell[]): ICell[][] {
  const result: ICell[][] = [];

  for (let i = 0; i < col; i += 1) {
    result.push([]);
    for (let j = 0; j < row; j += 1) {
      result[i].push({ ...source[i * row + j], position: { i, j } });
    }
  }

  return result;
}

interface IFillGridProps {
  source: ICell[][];
  bombs: number;
  currentCellPosition: {
    i: number;
    j: number;
  };
}

export function fillGrid({
  source,
  bombs,
  currentCellPosition,
}: IFillGridProps): ICell[][] {
  const excludeIndex =
    currentCellPosition.i * source[0].length + currentCellPosition.j;
  const oneDimArray = source.flat();
  const arrayWithBombs = addBombsInArray(oneDimArray, bombs, excludeIndex);
  const grid = convertArray(source.length, source[0].length, arrayWithBombs);

  const filledGrid = addDigitsInGrid(grid);

  return filledGrid;
}

interface ICreateInitGrid {
  col: number;
  row: number;
}
export function createInitGrid({ col, row }: ICreateInitGrid): ICell[][] {
  const result: ICell[] = [];
  const count = col * row;

  for (let i = 0; i < count; i += 1) {
    result.push({ ...initCell, id: i });
  }

  return convertArray(col, row, result);
}

export function getBoardParamsByLevelType(
  levelType: TLevelType,
  levels: IBoardParams[],
): IBoardParams {
  switch (levelType) {
    case 'easy':
      return levels[0];
    case 'normal':
      return levels[1];
    case 'hard':
      return levels[2];
    case 'custom':
      return levels[3];
    default:
      return levels[0];
  }
}

function needOpenAround(grid: ICell[][], i: number, j: number): boolean {
  // top
  if (grid[i - 1] && grid[i - 1][j] && grid[i - 1][j].status === 'closed') {
    return true;
  }
  // top-right
  if (
    grid[i - 1] &&
    grid[i - 1][j + 1] &&
    grid[i - 1][j + 1].status === 'closed'
  ) {
    return true;
  }
  // right
  if (grid[i][j + 1] && grid[i][j + 1].status === 'closed') {
    return true;
  }
  // right - bottom
  if (
    grid[i + 1] &&
    grid[i + 1][j + 1] &&
    grid[i + 1][j + 1].status === 'closed'
  ) {
    return true;
  }
  // bottom
  if (grid[i + 1] && grid[i + 1][j] && grid[i + 1][j].status === 'closed') {
    return true;
  }
  // left-bottom
  if (
    grid[i + 1] &&
    grid[i + 1][j - 1] &&
    grid[i + 1][j - 1].status === 'closed'
  ) {
    return true;
  }
  // left
  if (grid[i][j - 1] && grid[i][j - 1].status === 'closed') {
    return true;
  }
  // left-top
  if (
    grid[i - 1] &&
    grid[i - 1][j - 1] &&
    grid[i - 1][j - 1].status === 'closed'
  ) {
    return true;
  }

  return false;
}

function openAround(source: ICell[][], n: number, m: number) {
  const grid: ICell[][] = source.map((arr) => arr.slice());
  const i = n;
  const j = m;

  // top
  if (grid[i - 1] && grid[i - 1][j] && grid[i - 1][j].status !== 'flag-icon') {
    grid[i - 1][j] = {
      ...grid[i - 1][j],
      status: grid[i - 1][j].content === 0 ? 'open' : 'around-bombs',
    };
  }
  // top-right
  if (
    grid[i - 1] &&
    grid[i - 1][j + 1] &&
    grid[i - 1][j + 1].status !== 'flag-icon'
  ) {
    grid[i - 1][j + 1] = {
      ...grid[i - 1][j + 1],
      status: grid[i - 1][j + 1].content === 0 ? 'open' : 'around-bombs',
    };
  }
  // right
  if (grid[i][j + 1] && grid[i][j + 1].status !== 'flag-icon') {
    grid[i][j + 1] = {
      ...grid[i][j + 1],
      status: grid[i][j + 1].content === 0 ? 'open' : 'around-bombs',
    };
  }
  // right - bottom
  if (
    grid[i + 1] &&
    grid[i + 1][j + 1] &&
    grid[i + 1][j + 1].status !== 'flag-icon'
  ) {
    grid[i + 1][j + 1] = {
      ...grid[i + 1][j + 1],
      status: grid[i + 1][j + 1].content === 0 ? 'open' : 'around-bombs',
    };
  }
  // bottom
  if (grid[i + 1] && grid[i + 1][j] && grid[i + 1][j].status !== 'flag-icon') {
    grid[i + 1][j] = {
      ...grid[i + 1][j],
      status: grid[i + 1][j].content === 0 ? 'open' : 'around-bombs',
    };
  }
  // left-bottom
  if (
    grid[i + 1] &&
    grid[i + 1][j - 1] &&
    grid[i + 1][j - 1].status !== 'flag-icon'
  ) {
    grid[i + 1][j - 1] = {
      ...grid[i + 1][j - 1],
      status: grid[i + 1][j - 1].content === 0 ? 'open' : 'around-bombs',
    };
  }
  // left
  if (grid[i][j - 1] && grid[i][j - 1].status !== 'flag-icon') {
    grid[i][j - 1] = {
      ...grid[i][j - 1],
      status: grid[i][j - 1].content === 0 ? 'open' : 'around-bombs',
    };
  }
  // left-top
  if (
    grid[i - 1] &&
    grid[i - 1][j - 1] &&
    grid[i - 1][j - 1].status !== 'flag-icon'
  ) {
    grid[i - 1][j - 1] = {
      ...grid[i - 1][j - 1],
      status: grid[i - 1][j - 1].content === 0 ? 'open' : 'around-bombs',
    };
  }

  return grid;
}

export function openArea(source: ICell[][], cell: ICell) {
  let grid: ICell[][] = source.map((arr) =>
    arr.map((item) => {
      // open clicked cell
      if (
        item.position.i === cell.position.i &&
        item.position.j === cell.position.j
      ) {
        return { ...item, status: 'open' };
      }
      return item;
    }),
  );

  let allOpened = false;

  // open area
  while (!allOpened) {
    let wasOpen = false;

    for (let c = 0; c < source.length; c += 1) {
      for (let r = 0; r < source[0].length; r += 1) {
        if (
          grid[c][r].status === 'open' &&
          grid[c][r].content === 0 &&
          needOpenAround(grid, c, r)
        ) {
          grid = openAround(grid, c, r);
          wasOpen = true;
        }
      }
    }

    allOpened = !wasOpen;
  }

  return grid;
}

export function defineNextStatusCell(cell: ICell): TCellStatus | null {
  if (cell.status === 'closed') return 'flag-icon';
  if (cell.status === 'flag-icon') return 'quest-icon';
  if (cell.status === 'quest-icon') return 'closed';
  return null;
}

export function getCountFlags(grid: ICell[][]): number {
  let result = 0;
  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid[i].length; j += 1) {
      if (grid[i][j].status === 'flag-icon') {
        result += 1;
      }
    }
  }
  return result;
}

export function checkVictory(
  grid: ICell[][],
  bombsLeft: number,
  lastOpenCell: ICell | null,
): boolean {
  if (bombsLeft !== 0) return false;

  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid[i].length; j += 1) {
      let cell = grid[i][j];
      if (lastOpenCell !== null && grid[i][j].id === lastOpenCell.id) {
        cell = lastOpenCell;
      }

      if (cell.content === -1 && cell.status !== 'flag-icon') {
        return false;
      }
      // if (cell.status === 'closed' || cell.status === 'quest-icon') {
      //   return false;
      // }
    }
  }

  return true;
}

export function openCellsAfterWin(source: ICell[][]): ICell[][] {
  const grid: ICell[][] = source.map((arr) => arr.slice());

  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid[i].length; j += 1) {
      if (grid[i][j].content === 0) {
        grid[i][j] = { ...grid[i][j], status: 'open' };
      }
      if (grid[i][j].content > 0) {
        grid[i][j] = { ...grid[i][j], status: 'around-bombs' };
      }
    }
  }

  return grid;
}

export function openBombsAfterLost(source: ICell[][]): ICell[][] {
  const grid: ICell[][] = source.map((arr) => arr.slice());
  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid[i].length; j += 1) {
      if (grid[i][j].content === -1 && grid[i][j].status !== 'bomb-boom') {
        grid[i][j] = { ...grid[i][j], status: 'bomb-open' };
      }
      if (grid[i][j].status === 'flag-icon' && grid[i][j].content !== -1) {
        grid[i][j] = { ...grid[i][j], status: 'wrong-bomb' };
      }
    }
  }

  return grid;
}
