import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Cell } from './Cell';
import { GameMenu } from './GameMenu';
import { fillGrid, createInitGrid, defineStatusCell, openArea } from './utils';

import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { changeCells, changePhase, updateOneCell } from '../../store/reducers/gameSlice';
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
  const [clickAddress, setClickAddress] = useState<{i: number, j: number} | null>(null);

  const dispatch = useAppDispatch();
  const { phase, boardParams, cells, currentLevel } = useAppSelector(
    (state) => state.gameState,
  );

  const startNewGame = () => {
    const gameGrid = createInitGrid({ ...boardParams });
    dispatch(changeCells(gameGrid));
  };

  useEffect(() => {
    if (phase === 'new') {
      startNewGame();
      // return;
    }
    // if (phase === 'play' && clickAddress !== null) {
    //   const newCells = fillGrid({
    //     source: cells,
    //     bombs: boardParams.bombs,
    //     excludeAddress: clickAddress,
    //   });
    //   dispatch(changePhase('process'));
    //   dispatch(changeCells(newCells));
    //   // dispatch(changeCells(openArea(cells, clickAddress.i, clickAddress.j)));
    // }
  }, [phase, currentLevel]);

  return (
    <>
      <GameMenu />
      <Board col={boardParams.col} row={boardParams.row}>
        {cells.map((column, i) =>
          column.map((cell, j) => (
            <Cell
              key={Math.random()}
              currentIndex={{ i, j }}
              cell={cell}
              setClickAddress={setClickAddress}
            />
          )),
        )}
      </Board>
    </>
  );
}

export { GameBoard };
