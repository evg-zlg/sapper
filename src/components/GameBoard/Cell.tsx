import { Dispatch, SetStateAction } from 'react';

import styled, { css } from 'styled-components';
import { ICell } from '../../types/types';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changePhase, updateOneCell } from '../../store/reducers/gameSlice';
import { palette } from '../../const/const';
import { openArea } from './gameLogic';

interface ICellProps {
  // setClickPosition: Dispatch<
  //   SetStateAction<{
  //     i: number;
  //     j: number;
  //   }>
  // >;
  clickCellHandle: (cell: ICell) => void;
  cell: ICell;
}

interface ICellStyled {
  status: string;
  digit: number;
}

const ClosedCellStyles = css`
  background-color: #4b4b4b;
`;

const OpenCellStyles = css`
  background-color: var(--shadow-light-color);
`;

const CellStyled = styled.button<ICellStyled>`
  border: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => palette.get(props.digit) || 'inherit'};
  ${(props) => (props.status === 'closed' ? ClosedCellStyles : OpenCellStyles)}
`;

function Cell({ cell, clickCellHandle }: ICellProps) {
  const { phase } = useAppSelector((state) => state.gameState);
  const dispatch = useAppDispatch();

  const clickButtonHandle = () => {
    clickCellHandle(cell);

  };

  return (
    <CellStyled
      status={cell.status}
      digit={cell.content}
      type="button"
      onClick={clickButtonHandle}
    >
      {/* {cell.status === 'around-bombs' && cell.content !== 0 ? cell.content : ''} */}
      {cell.content === 0 ? '' : cell.content}
    </CellStyled>
  );
}

export { Cell };
