import styled from 'styled-components';

import { baseTheme } from '../../styles/theme';
import { Cell } from './Cell';
import { ICell, TBorderShadowType } from '../../types/types';
import { GamePanel } from './GamePanel';
import { useGame } from './hooks/useGame';
import { BorderWithShadow } from '../../styles/fragments/BorderWithShadow';

const Board = styled.section`
  width: fit-content;
  margin: 0 auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: stretch;
  background-color: ${baseTheme.colors.bgPrimery};
  ${BorderWithShadow}
  @media (max-height: 767px) {
    transform: scale(0.9);
    margin: -10px auto 0;
  }
  @media (max-height: 720px) {
    transform: scale(0.85);
    margin: -30px auto 0;
  }
`;

interface IGridTemplateProps {
  col: number;
  row: number;
  variantBorder: TBorderShadowType;
}

const GridTemplate = styled.div<IGridTemplateProps>`
  display: grid;
  grid-template: repeat(${(props) => props.col}, 1fr) / repeat(
      ${(props) => props.row},
      1fr
    );
  transition: all 0.3s ease 0s;
  ${BorderWithShadow}
`;

function GameBoard() {
  const {
    cells,
    boardParams,
    bombsLeft,
    phase,
    timeLeft,
    clickLeftButton,
    clickRightButton,
  } = useGame();

  const clickCellHandler = (cell: ICell) => {
    clickLeftButton(cell);
  };

  const clickContextCellHandler = (cell: ICell) => {
    clickRightButton(cell);
  };

  return (
    <Board variantBorder="big-outside">
      <GamePanel bombsLeft={bombsLeft} phase={phase} timeLeft={timeLeft} />
      <GridTemplate
        variantBorder="big-inside"
        col={boardParams.col}
        row={boardParams.row}
      >
        {cells.map((column) =>
          column.map((cell) => (
            <Cell
              key={cell.id}
              cell={cell}
              clickCellHandler={clickCellHandler}
              clickContextCellHandler={clickContextCellHandler}
            />
          )),
        )}
      </GridTemplate>
    </Board>
  );
}

export { GameBoard };
