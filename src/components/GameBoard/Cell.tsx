import { Dispatch, SetStateAction } from 'react';

import styled, { css } from 'styled-components';
import { ICell } from '../../types/types';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changePhase, updateOneCell } from '../../store/reducers/gameSlice';
import { palette } from '../../const/const';
import { openArea } from './utils';

interface ICellProps {
  currentIndex: {
    i: number;
    j: number;
  };
  setClickAddress: Dispatch<
    SetStateAction<{
      i: number;
      j: number;
    } | null>
  >;
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

function Cell({ setClickAddress, cell, currentIndex }: ICellProps) {
  const { phase, cells } = useAppSelector((state) => state.gameState);
  const dispatch = useAppDispatch();

  const clickCellHandle = () => {
    if (phase === 'lost' || phase === 'win') {
      return;
    }

    setClickAddress(currentIndex);

    if (phase === 'new') {
      dispatch(changePhase('play'));
      if (cell.content === 0) {
        dispatch(
          updateOneCell({ cell: { ...cell, status: 'open' }, ...currentIndex }),
        );
      } else {
        dispatch(
          updateOneCell({
            cell: { ...cell, status: 'around-bombs' },
            ...currentIndex,
          }),
        );
      }
    }

  };

  return (
    <CellStyled
      status={cell.status}
      digit={cell.content}
      type="button"
      onClick={clickCellHandle}
    >
      {cell.status === 'around-bombs' && cell.content !== 0 ? cell.content : ''}
    </CellStyled>
  );
}

export { Cell };
