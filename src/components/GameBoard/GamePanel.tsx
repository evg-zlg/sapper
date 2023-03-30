import { useEffect, useState } from 'react';

import styled from 'styled-components';
import { Frame } from './Frame';

import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { changePhase, selectState } from '../../store/reducers/gameSlice';

import smilePlayIcon from './icons/smile-play-icon.png';
import smileWinIcon from './icons/smile-win-icon.png';
import smileLostIcon from './icons/smile-lost-icon.png';

const Panel = styled.div`
  width: 100%;
  height: 50px;
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
  width: 50px;
`;

interface IRestarter {
  smile: string;
}

const Restarter = styled.button<IRestarter>`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: none;
  background-image: url(${(props) => props.smile});
  background-size: contain;
  cursor: pointer;
`;
const Timer = styled.div`
  width: 50px;
`;

function GamePanel() {
  const dispatch = useAppDispatch();
  const { phase, bombsLeft, timeLeft } = useAppSelector(selectState);
  const [smile, setSmile] = useState('');

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
          <Moves>{bombsLeft}</Moves>
          <Restarter smile={smile} onClick={clickRestartHandler} />
          <Timer>{timeLeft}</Timer>
        </Wrapper>
      </Frame>
    </Panel>
  );
}

export { GamePanel };
