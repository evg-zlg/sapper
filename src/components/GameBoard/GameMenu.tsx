import styled from 'styled-components';
import { levels } from '../../const/const';
import { TLevelType } from '../../types/types';
import { getBoardParamsByLevelType } from './gameLogic';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeLevel, changePhase } from '../../store/reducers/gameSlice';

const Menu = styled.menu`
  margin: 0 auto 10px;
  width: fit-content;
  display: flex;
  gap: 20px;
`;

const Button = styled.button`
  padding: 5px 10px;
  cursor: pointer;
`;

function GameMenu() {
  const dispatch = useAppDispatch();
  const { currentLevel } = useAppSelector((state) => state.gameState);

  const clickLevelHandle = (levelType: TLevelType) => {
    if (levelType !== currentLevel) {
      const boardParams = getBoardParamsByLevelType(levelType, levels);
      dispatch(changeLevel({currentLevel: levelType, boardParams}));
      dispatch(changePhase('change-lvl'));
    }
  };

  return (
    <Menu>
      <Button type="button" onClick={() => clickLevelHandle('easy')}>
        easy
      </Button>
      <Button type="button" onClick={() => clickLevelHandle('normal')}>
        normal
      </Button>
      <Button type="button" onClick={() => clickLevelHandle('hard')}>
        hard
      </Button>
      <Button type="button" onClick={() => clickLevelHandle('custom')}>
        custom
      </Button>
    </Menu>
  );
}

export { GameMenu };
