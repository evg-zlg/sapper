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

// function loadStateFromLocalStorage() {
//   try {
//     const lsValue = localStorage.getItem(localStorageKey);
//     if (!lsValue) return undefined;
//     return JSON.parse(lsValue);
//   } catch (e) {
//     return new Error('Error load from localStorage');
//   }
// }
// function saveStateToLocalStorage(
//   state: CombinedState<{
//     winnersState: initialStateProps;
//     gameState: initialStateProps;
//   }>,
// ) {
//   try {
//     const lsValue = JSON.stringify(state.winnersState.winners);
//     localStorage.setItem(localStorageKey, lsValue);
//   } catch (e) {
//     // do nothing
//   }
// }
