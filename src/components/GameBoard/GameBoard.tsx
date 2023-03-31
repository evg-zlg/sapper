import styled from 'styled-components';
import { Cell } from './Cell';

import { ICell } from '../../types/types';
import { Frame } from '../Frame';
import { GamePanel } from './GamePanel';
import { useGame } from '../../hooks/game/useGame';

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
  const { cells, boardParams, clickLeftButton, clickRightButton } = useGame();

  const clickCellHandler = (cell: ICell) => {
    clickLeftButton(cell);
  };

  const clickContextCellHandler = (cell: ICell) => {
    clickRightButton(cell);
  };

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
                  clickCellHandle={clickCellHandler}
                  clickContextCellHandle={clickContextCellHandler}
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
