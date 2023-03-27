import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateProps = {
  winners: [];
};
const initialState: initialStateProps = {
  winners: [],
};

export const winnersSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    changeWinners(state, actions: PayloadAction<[]>) {
      state.winners = actions.payload;
    },
  },
});



export const { changeWinners } = winnersSlice.actions;

export const winnersState = winnersSlice.reducer;