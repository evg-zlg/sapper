import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { changeTimeleft, updateTimerId } from '../../../store/reducers/gameSlice';

function useTimer() {
  const dispatch = useAppDispatch();
  const { timerId: timerIdFromStore } = useAppSelector(
    (state) => state.gameState,
  );

  const [timeLeft, setTimeLeft] = useState(0);
  let startedTime = new Date();

  const timer = () => {
    const now = new Date();
    const newTimeLeft = Math.trunc(
      (now.valueOf() - startedTime.valueOf()) / 1000,
    );
    setTimeLeft(newTimeLeft);
    dispatch(changeTimeleft(newTimeLeft));
  };

  const startTimer = () => {
    startedTime = new Date();
    const newTimerId = setInterval(timer, 1000);
    dispatch(updateTimerId(newTimerId));
  };

  const stopTimer = () => {
    clearInterval(timerIdFromStore);
  };

  return { timeLeft, startTimer, stopTimer };
}

export { useTimer };
