import styled from 'styled-components';
import { ICell } from '../../types/types';

interface ICellProps {
  currentIndex: {
    i: number, 
    j: number
  };
  cell: ICell;
}

const CellStyled = styled.div`
  border: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`;

function Cell({ currentIndex, cell }: ICellProps) {

  return <CellStyled>{cell.bombInside ? '0' : ''}</CellStyled>;
}

export { Cell };
