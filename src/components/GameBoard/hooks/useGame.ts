import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  changeBombsLeft,
  changeCells,
  changePhase,
  changeTimeleft,
  selectState,
  updateOneCell,
} from '../../../store/reducers/gameSlice';

import {
  checkVictory,
  createInitGrid,
  defineNextStatusCell,
  fillGrid,
  getCountFlags,
  openArea,
  openBombsAfterLost,
  openCellsAfterWin,
} from './utils';
import { ICell, IWinner } from '../../../types/types';
import { useTimer } from './useTimer';
import { addWinner } from '../../../store/reducers/winnersSlice';

function useGame() {
  const dispatch = useAppDispatch();
  const { phase, boardParams, cells, bombsLeft, timeLeft } =
    useAppSelector(selectState);
  const { startTimer, stopTimer } = useTimer();

  const prepareNewGame = () => {
    const initGrid = createInitGrid({ ...boardParams });
    dispatch(changeCells(initGrid));
  };

  const startNewGame = (cell: ICell) => {
    if (cell.status === 'flag-icon') return;

    startTimer();

    const filledGrid: ICell[][] = fillGrid({
      source: cells,
      bombs: boardParams.bombs,
      currentCellPosition: cell.position,
    });
    dispatch(changePhase('play'));

    const { i, j } = cell.position;
    if (filledGrid[i][j].content === 0) {
      dispatch(changeCells(openArea(filledGrid, filledGrid[i][j])));
    } else {
      dispatch(changeCells(filledGrid));
      dispatch(updateOneCell({ ...filledGrid[i][j], status: 'around-bombs' }));
    }
  };

  const endGameWithVictory = () => {
    const winner: IWinner = {
      id: Math.random(),
      timeLeft,
      boardParams,
    };
    dispatch(changePhase('win'));
    dispatch(addWinner(winner));
  };

  const makeMove = (cell: ICell) => {
    // do nothing if flag-icon
    if (cell.status === 'flag-icon') return;

    let isVictory = false;

    // game over if click to bomb
    if (cell.content === -1) {
      dispatch(changePhase('lost'));
      dispatch(updateOneCell({ ...cell, status: 'bomb-boom' }));
    }

    // open one cell if click in cell with digit
    if (cell.content > 0) {
      dispatch(updateOneCell({ ...cell, status: 'around-bombs' }));
      isVictory = checkVictory(cells, bombsLeft, {
        ...cell,
        status: 'around-bombs',
      });
    }

    // open area if click in empty cell
    if (cell.content === 0) {
      const newCells = openArea(cells, cell);
      dispatch(changeCells(newCells));
      // check victory
      isVictory = checkVictory(newCells, bombsLeft, null);
    }

    if (isVictory) {
      endGameWithVictory();
    }
  };

  const clickLeftButton = (cell: ICell) => {
    if (phase === 'new' || phase === 'change-lvl') {
      startNewGame(cell);
    }
    if (phase === 'play' && cell.status === 'closed') {
      makeMove(cell);
    }
  };

  const clickRightButton = (cell: ICell) => {
    if (phase !== 'lost' && phase !== 'win') {
      let isVictory = false;

      const status = defineNextStatusCell(cell);
      if (status !== null) {
        dispatch(updateOneCell({ ...cell, status }));
      }

      let countFlags = getCountFlags(cells);
      if (status === 'quest-icon') countFlags -= 1;
      if (status === 'flag-icon') countFlags += 1;
      dispatch(changeBombsLeft(boardParams.bombs - countFlags));

      // check victory
      isVictory = checkVictory(
        cells,
        boardParams.bombs - countFlags,
        status === null ? null : { ...cell, status: status || '' },
      );
      if (isVictory) {
        endGameWithVictory();
      }
    }
  };

  const restartGame = () => {
    stopTimer();
    prepareNewGame();
    dispatch(changePhase('new'));
    dispatch(changeBombsLeft(boardParams.bombs));
  };

  useEffect(() => {
    if (phase === 'new' || phase === 'change-lvl') {
      stopTimer();
      restartGame();
      dispatch(changeTimeleft(0));
    }
    if (phase === 'win') {
      const newCells = openCellsAfterWin(cells);
      dispatch(changeCells(newCells));
      stopTimer();
    }
    if (phase === 'lost') {
      const newCells = openBombsAfterLost(cells);
      dispatch(changeCells(newCells));
      stopTimer();
    }
  }, [phase]);

  useEffect(() => {
    if (timeLeft > 999) {
      dispatch(changePhase('lost'));
    }
  }, [timeLeft]);

  return {
    cells,
    prepareNewGame,
    clickLeftButton,
    clickRightButton,
    boardParams,
    bombsLeft,
    phase,
    timeLeft,
  };
}

export { useGame };
