import { MouseEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

import { ICell, TCellStatus } from '../../types/types';
import { palette } from '../../const/const';
import { Frame } from '../Frame';

import bombIcon from './icons/bomb-icon.png';
import wrongBomb from './icons/wrong-bomb-icon.png';
import flagIcon from './icons/flag-icon.png';
import questIcon from './icons/quest-icon.png';


interface ICellStyled {
  status: TCellStatus;
  digit: number;
  icon: string;
}

const CellStyled = styled.button<ICellStyled>`
  width: 32px;
  height: 32px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  font-size: 24px;
  font-weight: 900;
  border: 1px solid var(--border-secondary-color);
  background-color: ${(props) =>
    props.status === 'bomb-boom' ? 'red' : 'inherit'};
  background-image: url(${(props) => props.icon});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 70%;
  color: ${(props) => palette.get(props.digit) || 'inherit'};
`;

interface ICellProps {
  clickCellHandle: (cell: ICell) => void;
  clickContextCellHandle: (cell: ICell) => void;
  cell: ICell;
}

function Cell({ cell, clickCellHandle, clickContextCellHandle }: ICellProps) {
  const [icon, setIcon] = useState('');
  const [showFrame, setShowFrame] = useState(true);

  const clickButtonHandle = () => {
    clickCellHandle(cell);
  };

  const clickContextButtonHandle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    clickContextCellHandle(cell);
  };

  useEffect(() => {
    if (cell.status === 'flag-icon') setIcon(flagIcon);
    if (cell.status === 'quest-icon') setIcon(questIcon);
    if (cell.status === 'bomb-boom') {
      setShowFrame(false);
      setIcon(bombIcon);
    }
    if (cell.status === 'bomb-open') {
      setShowFrame(false);
      setIcon(bombIcon);
    }
    if (cell.status === 'open') {
      setIcon('');
      setShowFrame(false);
    }
    if (cell.status === 'around-bombs') {
      setIcon('');
      setShowFrame(false);
    }
    if (cell.status === 'wrong-bomb') {
      setIcon(wrongBomb);
      setShowFrame(false);
    }
    if (cell.status === 'closed') {
      setIcon('');
      setShowFrame(true);
    }
  }, [cell]);

  return (
    // <CellFrame status={cell.status}>
      <CellStyled
        status={cell.status}
        digit={cell.content}
        icon={icon}
        type="button"
        onClick={clickButtonHandle}
        onContextMenu={clickContextButtonHandle}
      >
        <Frame variant={showFrame ? 'cell' : 'none'}>
          {cell.status === 'around-bombs' && cell.content !== 0
            ? cell.content
            : ''}
        </Frame>
      </CellStyled>
    // </CellFrame>
  );
}

export { Cell };
