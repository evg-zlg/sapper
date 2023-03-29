import styled, { css } from 'styled-components';
import { ICell } from '../../types/types';
import { palette } from '../../const/const';
import { Frame } from './Frame';

interface ICellProps {
  clickCellHandle: (cell: ICell) => void;
  cell: ICell;
}

interface ICellStyled {
  status: string;
  digit: number;
}

const CellFrame = styled.div`
  border: 1px solid gray;
  display: flex;
  align-items: center;
`;

const CellStyled = styled.button<ICellStyled>`
  width: 20px;
  height: 20px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  font-size: 24px;
  font-weight: 700;
  background-color: inherit;
  color: ${(props) => palette.get(props.digit) || 'inherit'};
`;

function Cell({ cell, clickCellHandle }: ICellProps) {
  const clickButtonHandle = () => {
    clickCellHandle(cell);
  };

  return (
    <CellFrame >
      <Frame type={cell.status === 'closed' ? 'outside' : 'none'}>
        <CellStyled
          status={cell.status}
          digit={cell.content}
          type="button"
          onClick={clickButtonHandle}
        >
          {cell.status === 'around-bombs' && cell.content !== 0
            ? cell.content
            : ''}
          {cell.status === 'bomb-boom' && '0'}
        </CellStyled>
      </Frame>
    </CellFrame>
  );
}

export { Cell };
