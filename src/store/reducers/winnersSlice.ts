import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { localStorageKey } from '../../const/const';
import { IWinner } from '../../types/types';

type initialStateProps = {
  winners: IWinner[];
};
const initialState: initialStateProps = {
  winners: [],
};

export const winnersSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    changeWinners(state, actions: PayloadAction<IWinner[]>) {
      state.winners = actions.payload;
    },
    addWinner(state, actions: PayloadAction<IWinner>) {
      state.winners.push(actions.payload);
      localStorage.setItem(localStorageKey, JSON.stringify(state.winners));
    },
  },
});

export const { addWinner, changeWinners } = winnersSlice.actions;

export const winnersState = winnersSlice.reducer;
