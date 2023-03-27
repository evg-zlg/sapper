import { Route, Routes } from 'react-router-dom';
import { Header } from '../../components/Header';
import { APPRoute } from '../../const/const';
import { GamePage } from '../../Pages/GamePage';
import { WinnersPage } from '../../Pages/WinnersPage';

function RootRouter() {
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
