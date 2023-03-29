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
} from './gameLogic';

import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import {
  changeCells,
  changePhase,
  selectState,
  updateOneCell,
  changeBombsLeft,
} from '../../store/reducers/gameSlice';

import { ICell } from '../../types/types';
import { Frame } from './Frame';
import { GamePanel } from './GamePanel';

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
  const dispatch = useAppDispatch();
  const { phase, boardParams, cells, bombsLeft } = useAppSelector(selectState);

  const prepareNewGame = () => {
    const initGrid = createInitGrid({ ...boardParams });
    dispatch(changeCells(initGrid));
  };

  const startNewGame = (cell: ICell) => {
    if (cell.status === 'flag-icon') return;

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
    if (cell.status === 'flag-icon') return;

    let isVictory = false;

    if (cell.content === -1) {
      dispatch(changePhase('lost'));
      dispatch(updateOneCell({ ...cell, status: 'bomb-boom' }));
    }
    if (cell.content === 0) {
      const newCells = openArea(cells, cell);
      dispatch(changeCells(newCells));
      isVictory = checkVictory(newCells, bombsLeft, null);
    }
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
    prepareNewGame();
    dispatch(changePhase('new'));
    dispatch(changeBombsLeft(boardParams.bombs));
  };

  useEffect(() => {
    if (phase === 'new' || phase === 'change-lvl') {
      restartGame();
    }
  }, [phase]);

  return (
    <Frame type="outside">
      <Board>
        <GamePanel />
        <Frame type="inside">
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
  );
}

export { GameBoard };
