import { MouseEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { baseTheme } from '../../styles/theme';

import { ICell, TBorderShadowType, TCellStatus } from '../../types/types';
import { palette } from '../../const/const';

import bombIcon from './icons/bomb-icon.png';
import wrongBomb from './icons/wrong-bomb-icon.png';
import flagIcon from './icons/flag-icon.png';
import questIcon from './icons/quest-icon.png';
import { BorderWithShadow } from '../../styles/components/BorderWithShadow';

interface ICellStyled {
  status: TCellStatus;
  digit: number;
  icon: string;
  variantBorder: TBorderShadowType;
}

const CellStyled = styled.button<ICellStyled>`
  outline: none;
  width: 32px;
  height: 32px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  font-size: 24px;
  font-weight: 900;
  border: 1px solid ${baseTheme.colors.borderCell};
  background-color: ${(props) =>
    props.status === 'bomb-boom'
      ? `${baseTheme.colors.boomBgCell}`
      : 'inherit'};
  background-image: url(${(props) => props.icon});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 70%;
  color: ${(props) => palette.get(props.digit) || 'inherit'};
  ${BorderWithShadow}
`;

interface ICellProps {
  clickCellHandler: (cell: ICell) => void;
  clickContextCellHandler: (cell: ICell) => void;
  cell: ICell;
}

function Cell({ cell, clickCellHandler, clickContextCellHandler }: ICellProps) {
  const [icon, setIcon] = useState('');
  const [showWrap, setShowWrap] = useState(true);

  const clickButtonHandler = () => {
    clickCellHandler(cell);
  };

  const clickContextButtonHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    clickContextCellHandler(cell);
  };

  useEffect(() => {
    if (cell.status === 'flag-icon') setIcon(flagIcon);
    if (cell.status === 'quest-icon') setIcon(questIcon);
    if (cell.status === 'bomb-boom') {
      setShowWrap(false);
      setIcon(bombIcon);
    }
    if (cell.status === 'bomb-open') {
      setShowWrap(false);
      setIcon(bombIcon);
    }
    if (cell.status === 'open') {
      setIcon('');
      setShowWrap(false);
    }
    if (cell.status === 'around-bombs') {
      setIcon('');
      setShowWrap(false);
    }
    if (cell.status === 'wrong-bomb') {
      setIcon(wrongBomb);
      setShowWrap(false);
    }
    if (cell.status === 'closed') {
      setIcon('');
      setShowWrap(true);
    }
  }, [cell]);

  return (
    <CellStyled
      variantBorder={showWrap ? 'big-outside' : 'cell'}
      status={cell.status}
      digit={cell.content}
      icon={icon}
      type="button"
      onClick={clickButtonHandler}
      onContextMenu={clickContextButtonHandler}
    >
      {cell.status === 'around-bombs' && cell.content !== 0 ? cell.content : ''}
    </CellStyled>
  );
}

export { Cell };
