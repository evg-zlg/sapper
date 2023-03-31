import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useAppDispatch } from '../../hooks/redux';
import { changePhase } from '../../store/reducers/gameSlice';

import { Frame } from '../Frame';
import { RetroDigits } from '../RetroDigits';
import { TGamePhase } from '../../types/types';

import smilePlayIcon from './icons/smile-play-icon.png';
import smileWinIcon from './icons/smile-win-icon.png';
import smileLostIcon from './icons/smile-lost-icon.png';

const Panel = styled.div`
  width: 100%;
  height: 62px;
  > div {
    width: 100%;
    height: 100%;
  }
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
`;

const Moves = styled.div`
  text-align: center;
`;

interface IRestarter {
  smile: string;
}

const Restarter = styled.button<IRestarter>`
  margin: 5px 0 0 0;
  width: 46px;
  height: 39px;
  border: none;
  background-image: url(${(props) => props.smile});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  background-color: unset;
  cursor: pointer;
`;
const Timer = styled.div``;

interface IGamePanel {
  phase: TGamePhase,
  bombsLeft: number,
  timeLeft: number,
}

function GamePanel({bombsLeft, phase, timeLeft}: IGamePanel) {
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
      <Frame variant="inside">
        <Wrapper>
          <Moves>
            <RetroDigits value={bombsLeft} />
          </Moves>
          <Frame variant="outside">
            <Restarter smile={smile} onClick={clickRestartHandler} />
          </Frame>
          <Timer>
            <RetroDigits value={timeLeft} />
          </Timer>
        </Wrapper>
      </Frame>
    </Panel>
  );
}

export { GamePanel };
