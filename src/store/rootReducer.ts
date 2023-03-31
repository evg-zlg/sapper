import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { winnersState } from './reducers/winnersSlice';
import { gameState } from './reducers/gameSlice';


export const rootReducer = combineReducers({
  winnersState,
  gameState,
});

const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export { store };

store.getState()