import { useState } from 'react';

import styled from 'styled-components';
import { baseTheme } from '../../styles/theme';

import { levels, menuButtons } from '../../const/const';
import { TLevelType } from '../../types/types';
import { getBoardParamsByLevelType } from '../../hooks/game/utils';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeLevel, changePhase } from '../../store/reducers/gameSlice';
import { CustomParamsForm } from './CustomParamsForm';
import { BorderWithShadow } from '../../styles/components/BorderWithShadow';

const Menu = styled.menu`
  margin: 0 auto;
  width: fit-content;
  display: flex;
  gap: 20px;
`;

const Button = styled.button`
  padding: 5px 10px;
  width: 70px;
  text-transform: capitalize;
  background-color: ${baseTheme.colors.bgPrimery};
  border: none;
  cursor: pointer;
  ${BorderWithShadow}
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
