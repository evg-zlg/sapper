<<<<<<< HEAD
import { useEffect, useState } from "react";
import styled from "styled-components";
import { boardSize } from "../../const/const";
import { createGrid } from "./utils";

interface IBoardProps {
  col: number;
  row: number;
}
const Board = styled.section<IBoardProps>`
  border-radius: 5px;
  border: 1px solid var(--primary-dark-color);
`;

function GameBoard() {
  const [size] = useState(boardSize[0]);
  const [gameGrid] = useState(() => createGrid(size));

  useEffect( () => {
    console.log(gameGrid);
  }, [size]);

  return (
    <>
      <header>time, button for restart, and someone else</header>
      <Board col={size.col} row={size.row} />
    </>
=======
import { useEffect } from 'react';
import styled from 'styled-components';
import { Cell } from './Cell';
import {
  checkVictory,
  createInitGrid,
  defineNextStatusCell,
  fillGrid,
  getCountFlags,
  openArea,
  openBombAfterLost,
  openCellsAfterWin,
} from './utils';

import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import {
  changeCells,
  changePhase,
  selectState,
  updateOneCell,
  changeBombsLeft,
  changeTimeleft,
} from '../../store/reducers/gameSlice';

import { ICell } from '../../types/types';
import { Frame } from '../Frame';
import { GamePanel } from './GamePanel';
import { useTimer } from '../../hooks/timer';

interface IGridTemplateProps {
  col: number;
  row: number;
}

const Board = styled.section`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: stretch;
  background-color: var(--bg-primery-color);
`;

const GridTemplate = styled.div<IGridTemplateProps>`
  display: grid;
  grid-template: repeat(${(props) => props.col}, 1fr) / repeat(
      ${(props) => props.row},
      1fr
    );
`;

function GameBoard() {
  const { startTimer, stopTimer, timeLeft } = useTimer();
  const dispatch = useAppDispatch();
  const { phase, boardParams, cells, bombsLeft } = useAppSelector(selectState);

  const prepareNewGame = () => {
    const initGrid = createInitGrid({ ...boardParams });
    dispatch(changeCells(initGrid));
  };

  const startNewGame = (cell: ICell) => {
    if (cell.status === 'flag-icon') return;

    stopTimer();
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

  const makeMove = (cell: ICell) => {
    // do nothing if flag
    if (cell.status === 'flag-icon') return;

    let isVictory = false;

    // game over if click to bomb
    if (cell.content === -1) {
      dispatch(changePhase('lost'));
      dispatch(updateOneCell({ ...cell, status: 'bomb-boom' }));
    }

    // open area if click in empty cell
    if (cell.content === 0) {
      const newCells = openArea(cells, cell);
      dispatch(changeCells(newCells));
      isVictory = checkVictory(newCells, bombsLeft, null);
    }

    // open one cell if click in cell with digit
    if (cell.content > 0) {
      dispatch(updateOneCell({ ...cell, status: 'around-bombs' }));
      isVictory = checkVictory(cells, bombsLeft, {
        ...cell,
        status: 'around-bombs',
      });
    }

    if (isVictory) {
      dispatch(changePhase('win'));
    }
  };

  const clickCellHandle = (cell: ICell) => {
    if (phase === 'new' || phase === 'change-lvl') {
      startNewGame(cell);
    }
    if (phase === 'play' && cell.status === 'closed') {
      makeMove(cell);
    }
  };

  const clickContextCellHandle = (cell: ICell) => {
    if (phase !== 'lost' && phase !== 'win') {
      const status = defineNextStatusCell(cell);
      let isVictory = false;

      if (status !== null) {
        dispatch(updateOneCell({ ...cell, status }));
      }

      let countFlags = getCountFlags(cells);
      if (status === 'quest-icon') countFlags -= 1;
      if (status === 'flag-icon') countFlags += 1;
      dispatch(changeBombsLeft(boardParams.bombs - countFlags));

      isVictory = checkVictory(
        cells,
        boardParams.bombs - countFlags,
        status === null ? null : { ...cell, status: status || '' },
      );
      if (isVictory) {
        dispatch(changePhase('win'));
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
      restartGame();
      stopTimer();
      dispatch(changeTimeleft(0));
    }
    if (phase === 'win') {
      const newCells = openCellsAfterWin(cells);
      dispatch(changeCells(newCells));
      stopTimer();
    }
    if (phase === 'lost') {
      const newCells = openBombAfterLost(cells);
      dispatch(changeCells(newCells));
      stopTimer();
    }
  }, [phase]);

  useEffect(() => {

    if (timeLeft > 999) {
      dispatch(changePhase('lost'));
      return;
    }

    dispatch(changeTimeleft(timeLeft));
  }, [timeLeft]);

  return (
    <Frame variant="outside">
      <Board>
        <GamePanel />
        <Frame variant="inside">
          <GridTemplate col={boardParams.col} row={boardParams.row}>
            {cells.map((column) =>
              column.map((cell) => (
                <Cell
                  key={cell.id}
                  cell={cell}
                  clickCellHandle={clickCellHandle}
                  clickContextCellHandle={clickContextCellHandle}
                />
              )),
            )}
          </GridTemplate>
        </Frame>
      </Board>
    </Frame>
>>>>>>> 0d067eadc5f56363afd1b77b2594107c4fb96ac5
  );
}

export { GameBoard };
