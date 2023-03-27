import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { winnersState } from './reducers/winnersSlice';


export const rootReducer = combineReducers({
  winnersState,
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