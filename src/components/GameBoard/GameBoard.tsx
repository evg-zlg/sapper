import { useEffect } from 'react';
import styled from 'styled-components';
import { Cell } from './Cell';
import { GameMenu } from './GameMenu';
import {
  createInitGrid,
  defineNextStatusCell,
  fillGrid,
  openArea,
} from './gameLogic';

import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import {
  changeCells,
  changePhase,
  selectState,
  updateOneCell,
} from '../../store/reducers/gameSlice';

import { ICell } from '../../types/types';
import { Frame } from './Frame';

interface IGridTemplateProps {
  col: number;
  row: number;
}

const Board = styled.section`
  width: fit-content;
  margin: 0 auto;
  padding: 15px;
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
  const { phase, boardParams, cells } = useAppSelector(selectState);

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
      if (status !== null) {
        dispatch(updateOneCell({ ...cell, status }));
      }
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
      <Frame type="outside">
        <Board>
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
    </>
  );
}

export { GameBoard };
