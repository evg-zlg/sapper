import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { levels } from '../../const/const';
import {
  IBoardParams,
  ICell,
  IGameParams,
  TGamePhase,
  TLevelType,
} from '../../types/types';
import { RootState } from '../rootReducer';

interface initialStateProps extends IGameParams {
  phase: TGamePhase;
  currentLevel: TLevelType;
  bombsLeft: number;
}

const initialState: initialStateProps = {
  cells: [],
  boardParams: levels[0],
  phase: 'new',
  currentLevel: 'easy',
  bombsLeft: levels[0].bombs,
};

export const gameSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    changeCells(state, actions: PayloadAction<ICell[][]>) {
      state.cells = actions.payload;
    },
    updateOneCell(state, actions: PayloadAction<ICell>) {
      const cell = actions.payload;
      const { i, j } = cell.position;
      state.cells[i][j] = cell;
    },
    changeLevel(
      state,
      actions: PayloadAction<{
        currentLevel: TLevelType;
        boardParams: IBoardParams;
      }>,
    ) {
      state.currentLevel = actions.payload.currentLevel;
      state.boardParams = actions.payload.boardParams;
    },
    changePhase(state, actions: PayloadAction<TGamePhase>) {
      state.phase = actions.payload;
    },
    changeBombsLeft(state, actions: PayloadAction<number>) {
      state.bombsLeft = actions.payload;
    },
  },
});

export const selectState = (state: RootState) => state.gameState;

export const {
  changeCells,
  changePhase,
  changeLevel,
  updateOneCell,
  changeBombsLeft,
} = gameSlice.actions;

export const gameState = gameSlice.reducer;
