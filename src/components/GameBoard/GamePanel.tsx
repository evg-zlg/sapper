import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useAppDispatch } from '../../hooks/redux';
import { changePhase } from '../../store/reducers/gameSlice';

import { RetroDigits } from '../RetroDigits';
import { TBorderShadowType, TGamePhase } from '../../types/types';

import smilePlayIcon from './icons/smile-play-icon.png';
import smileWinIcon from './icons/smile-win-icon.png';
import smileLostIcon from './icons/smile-lost-icon.png';
import { BorderWithShadow } from '../../styles/fragments/BorderWithShadow';

const Panel = styled.div`
  width: 100%;
  height: 62px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  ${BorderWithShadow}
`;

const Moves = styled.div`
  text-align: center;
`;

interface IRestarter {
  smile: string;
  variantBorder: TBorderShadowType;
}

const Restarter = styled.button<IRestarter>`
  width: 55px;
  height: 55px;
  background-image: url(${(props) => props.smile});
  background-size: 90%;
  background-repeat: no-repeat;
  background-position: center center;
  background-color: unset;
  cursor: pointer;
  ${BorderWithShadow}
`;
const Timer = styled.div``;

interface IGamePanel {
  phase: TGamePhase;
  bombsLeft: number;
  timeLeft: number;
}

function GamePanel({ bombsLeft, phase, timeLeft }: IGamePanel) {
  const [smile, setSmile] = useState('');
  const dispatch = useAppDispatch();

  const clickRestartHandler = () => {
    dispatch(changePhase('new'));
  };

  useEffect(() => {
    if (phase === 'lost') {
      setSmile(smileLostIcon);
      return;
    }
    if (phase === 'win') {
      setSmile(smileWinIcon);
      return;
    }
    setSmile(smilePlayIcon);
  }, [phase]);

  return (
    <Panel>
      <Wrapper variantBorder="big-inside">
        <Moves>
          <RetroDigits value={bombsLeft} />
        </Moves>
        <Restarter
          variantBorder="big-outside"
          smile={smile}
          onClick={clickRestartHandler}
        />
        <Timer>
          <RetroDigits value={timeLeft} />
        </Timer>
      </Wrapper>
    </Panel>
  );
}

export { GamePanel };
