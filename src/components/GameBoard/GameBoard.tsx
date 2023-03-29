import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Cell } from './Cell';
import { GameMenu } from './GameMenu';
import { createInitGrid, fillGrid, openArea } from './gameLogic';

import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import {
  changeCells,
  changePhase,
  selectState,
  updateOneCell,
} from '../../store/reducers/gameSlice';

import { ICell } from '../../types/types';

interface IBoardStyledProps {
  col: number;
  row: number;
}

const Board = styled.section<IBoardStyledProps>`
  width: fit-content;
  margin: 0 auto;
  border: 1px solid var(--primary-dark-color);
  display: grid;
  grid-template: repeat(${(props) => props.col}, 30px) / repeat(
      ${(props) => props.row},
      30px
    );
`;

function GameBoard() {
  // const [needUpdateCells, setNeedUpdateCells] = useState(false);
  const [currentCell, setCurrentCell] = useState<ICell | null>(null);

  const dispatch = useAppDispatch();
  const { phase, boardParams, cells } =
    useAppSelector(selectState);

  const prepareNewGame = () => {
    const initGrid = createInitGrid({ ...boardParams });
    dispatch(changeCells(initGrid));
  };

  const startNewGame = (cell: ICell) => {
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
    if (cell.content === -1) {
      dispatch(changePhase('lost'));
      dispatch(updateOneCell({ ...cell, status: 'bomb-boom' }));
    }
    if (cell.content === 0) {
      dispatch(changeCells(openArea(cells, cell)));
    }
    if (cell.content > 0) {
      dispatch(updateOneCell({ ...cell, status: 'around-bombs' }));
    }
  };

  const clickCellHandle = (cell: ICell) => {
    setCurrentCell(cell);
    if (phase === 'new' || phase === 'change-lvl') {
      startNewGame(cell);
    }
    if (phase === 'play' && cell.status === 'closed') {
      makeMove(cell);
    }
  };

  useEffect(() => {
    if (phase === 'new') {
      prepareNewGame();
    }
    if (phase === 'change-lvl') {
      prepareNewGame();
      dispatch(changePhase('new'));
    }
  }, [phase]);

  return (
    <>
      <GameMenu />
      <Board col={boardParams.col} row={boardParams.row}>
        {cells.map((column) =>
          column.map((cell) => (
            <Cell
              key={Math.random()}
              cell={cell}
              clickCellHandle={clickCellHandle}
            />
          )),
        )}
      </Board>
    </>
  );
}

export { GameBoard };
