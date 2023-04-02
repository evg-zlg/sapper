import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/redux';
import { changeWinners } from '../../store/reducers/winnersSlice';

import { Header } from '../../components/Header';
import { APPRoute, localStorageKey } from '../../const/const';
import { GamePage } from '../../Pages/GamePage';
import { WinnersPage } from '../../Pages/WinnersPage';
import { IWinner } from '../../types/types';

function RootRouter() {
  const dispatch = useAppDispatch();

  // check winners in localStorage
  useEffect(() => {
    try {
      const lsValue = localStorage.getItem(localStorageKey);
      if (lsValue !== null) {
        const winners: IWinner[] = JSON.parse(lsValue);
        dispatch(changeWinners(winners));
      }
    } catch (e) {
      const message = 'Error load from localStorage';
      if (e instanceof Error) {
        throw new Error(message + e.message);
      } else {
        throw new Error(message);
      }
    }
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path={APPRoute.main} element={<GamePage />} />
        <Route path={APPRoute.winners} element={<WinnersPage />} />
      </Routes>
    </>
  );
}

export default RootRouter;
