import { useEffect, useState } from 'react';

function useTimer() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerId, setTimerId] = useState(0);
  let startedTime = new Date();

  const timerFunc = () => {
    const now = new Date();
    const letftTime = now.getSeconds() - startedTime.getSeconds();
    setTimeLeft(letftTime);
  };

  const startTimer = () => {
    startedTime = new Date();
    clearInterval(timerId);
    setTimerId(setInterval(timerFunc, 1000));
  };

  const stopTimer = () => {
    setTimerId(0);
    clearInterval(timerId);
  };

  useEffect(() => {
    setTimerId(0);

    return () => {
      clearInterval(timerId);
      setTimerId(0);
      setTimeLeft(0);
    };
  }, []);

  return { timeLeft, startTimer, stopTimer };
}

export { useTimer };
