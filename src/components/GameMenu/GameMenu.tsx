import { useState } from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeLevel, changePhase } from '../../store/reducers/gameSlice';

import { baseTheme } from '../../styles/theme';
import { levels, menuButtons } from '../../const/const';
import { TLevelType } from '../../types/types';
import { getBoardParamsByLevelType } from '../GameBoard/hooks/utils';
import { CustomParamsForm } from './CustomParamsForm';
import { BorderWithShadow } from '../../styles/fragments/BorderWithShadow';

const Menu = styled.menu`
  margin: 0 auto 10px;
  width: fit-content;
  display: flex;
  gap: 20px;

  @media (${baseTheme.brakePoint.sm}) {
    gap: 10px;
  }
`;

const Button = styled.button`
  padding: 5px 10px;
  min-width: 80px;
  font-size: 1rem;
  text-transform: capitalize;
  background-color: ${baseTheme.colors.bgPrimery};
  border: none;
  cursor: pointer;
  ${BorderWithShadow}

  @media (${baseTheme.brakePoint.sm}) {
    font-size: 0.75rem;
    min-width: 70px;
  }
`;

function GameMenu() {
  const dispatch = useAppDispatch();
  const { currentLevel } = useAppSelector((state) => state.gameState);
  const [showCustomParamsForm, setShowCustomParamsForm] = useState(false);

  const clickLevelHandle = (levelType: TLevelType) => {
    if (levelType === 'custom') {
      setShowCustomParamsForm(true);
    } else if (levelType !== currentLevel) {
      const boardParams = getBoardParamsByLevelType(levelType, levels);
      dispatch(changeLevel({ currentLevel: levelType, boardParams }));
      dispatch(changePhase('change-lvl'));
    }
  };

  return (
    <Menu>
      {menuButtons.map((button) => (
        <Button
          key={button.text}
          variantBorder={
            currentLevel === button.levelType ? 'small-inside' : 'small-outside'
          }
          type="button"
          onClick={() => clickLevelHandle(button.levelType)}
        >
          {button.text}
        </Button>
      ))}
      {showCustomParamsForm && (
        <CustomParamsForm setShowCustomParamsForm={setShowCustomParamsForm} />
      )}
    </Menu>
  );
}

export { GameMenu };
