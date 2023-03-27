import { Route, Routes } from 'react-router-dom';
import { Header } from '../../components/Header';
import { APPRoute } from '../../const/const';
import { Game } from '../../Pages/Game';
import { Winners } from '../../Pages/Winners';

function RootRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={APPRoute.main} element={<Game />} />
        <Route path={APPRoute.winners} element={<Winners />} />
      </Routes>
    </>
  );
}

export default RootRouter;
