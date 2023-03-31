import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import RootRouter from './RootRouter';
import { store } from '../store/rootReducer';
import { GlobalStyles } from '../styles/global';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RootRouter />
        <GlobalStyles />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
