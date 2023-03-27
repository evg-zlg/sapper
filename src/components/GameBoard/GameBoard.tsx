import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { baseLevelsOptions } from '../../const/const';
import { useLevelOptions } from '../../hooks/gameLevel';
import { IBoardParams, ICell } from '../../types/types';
import { Cell } from './Cell';
import { GameMenu } from './GameMenu';
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
  /* border-radius: 5px; */
  border: 1px solid var(--primary-dark-color);
  display: grid;
  grid-template: repeat(${(props) => props.col}, 30px) / repeat(
      ${(props) => props.row},
      30px
    );
`;

function GameBoard() {
  const [levelOptions] = useLevelOptions(baseLevelsOptions[0]);
  console.log('levelOptions:', levelOptions);
  // const gameGrid = createGrid({col: levelOptions.col, row: levelOptions.});
  return (
    <>
      <GameMenu />
      {/* <Board col={gameGrid.col} row={gameGrid.row}>
        {gameGrid?.cells.map((column, i) =>
          column.map((cell, j) => (
            <Cell key={Math.random()} currentIndex={{ i, j }} cell={cell} />
          )),
        )}
      </Board> */}
    </>
  );
}

export { GameBoard };
