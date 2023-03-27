import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { boardSize } from '../../const/const';
import { ICell } from '../../types/types';
import { Cell } from './Cell';
import { createGrid } from './utils';

interface ISizeParams {
  col: number;
  row: number;
}

interface IGameGrid extends ISizeParams {
  cells: ICell[][];
}
const Board = styled.section<ISizeParams>`
  width: fit-content;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid var(--primary-dark-color);
  display: grid;
  grid-template: repeat(${(props) => props.col}, 30px) / repeat(
      ${(props) => props.row},
      30px
    );
`;

function GameBoard() {
  const [gameGrid] = useState<IGameGrid>(() => ({
    col: boardSize[0].col,
    row: boardSize[0].row,
    cells: createGrid(boardSize[0]),
  }));

  useEffect(() => {
    console.log(gameGrid);
  }, [gameGrid]);

  return (
    <>
      <header>time, button for restart, and someone else</header>
      <Board col={gameGrid.col} row={gameGrid.row}>
        {gameGrid?.cells.map((column, i) =>
          column.map((cell, j) => (
            <Cell key={Math.random()} currentIndex={{ i, j }} cell={cell} />
          )),
        )}
      </Board>
    </>
  );
}

export { GameBoard };
