import { MouseEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

import { ICell, TCellStatus } from '../../types/types';
import { palette } from '../../const/const';
import { Frame } from './Frame';

import bombIcon from './icons/bomb-icon.png';
// import boomIcon from './icons/boom-icon.png';
import flagIcon from './icons/flag-icon.png';
import questIcon from './icons/quest-icon2.png';

interface ICellFrame {
  status: TCellStatus;
}

const CellFrame = styled.div<ICellFrame>`
  border: 1px solid gray;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.status === 'bomb-boom' ? 'red' : 'inherit'};
`;

interface ICellStyled {
  status: TCellStatus;
  digit: number;
  icon: string;
}

const CellStyled = styled.button<ICellStyled>`
  width: 20px;
  height: 20px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  font-size: 24px;
  font-weight: 900;
  background-color: ${(props) =>
    props.status === 'bomb-boom' ? 'red' : 'inherit'};
  background-image: url(${(props) => props.icon});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 80%;
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
      setShowFrame(false);
    }
    if (cell.status === 'around-bombs') {
      setShowFrame(false);
    }
    if (cell.status === 'wrong-bomb') {
      setIcon(bombIcon);
      setShowFrame(false);
    }
    if (cell.status === 'closed') {
      setIcon('');
      setShowFrame(true);
    }
  }, [cell]);

  return (
    <CellFrame status={cell.status}>
      <Frame type={showFrame ? 'outside' : 'none'}>
        <CellStyled
          status={cell.status}
          digit={cell.content}
          icon={icon}
          type="button"
          onClick={clickButtonHandle}
          onContextMenu={clickContextButtonHandle}
        >
          {cell.status === 'around-bombs' && cell.content !== 0
            ? cell.content
            : ''}
        </CellStyled>
      </Frame>
    </CellFrame>
  );
}

export { Cell };
