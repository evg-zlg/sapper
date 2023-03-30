import styled from 'styled-components';
import { levels, menuButtons } from '../../const/const';
import { TLevelType } from '../../types/types';
import { getBoardParamsByLevelType } from '../GameBoard/utils';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeLevel, changePhase } from '../../store/reducers/gameSlice';
import { Frame } from '../Frame';

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
  background-color: var(--bg-primery-color);
  border: none;
  cursor: pointer;
  > div {
    border-width: 1px;
  }
`;

function GameMenu() {
  const dispatch = useAppDispatch();
  const { currentLevel } = useAppSelector((state) => state.gameState);

  const clickLevelHandle = (levelType: TLevelType) => {
    if (levelType !== currentLevel) {
      const boardParams = getBoardParamsByLevelType(levelType, levels);
      dispatch(changeLevel({ currentLevel: levelType, boardParams }));
      dispatch(changePhase('change-lvl'));
    }
  };

  return (
    <Menu>
      {menuButtons.map((button) => (
        <Frame variant={currentLevel === button.levelType ? 'button-inside' : 'button-outside'}>
          <Button type="button"  onClick={() => clickLevelHandle(button.levelType)}>
            {button.text}
          </Button>
        </Frame>
      ))}
    </Menu>
  );
}

export { GameMenu };
