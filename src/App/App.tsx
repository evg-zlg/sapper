import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import RootRouter from './RootRouter';



function App() {
  return (
    <BrowserRouter>
        <RootRouter />
    </BrowserRouter>
  );
}

export default App;
