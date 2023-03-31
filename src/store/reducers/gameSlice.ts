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
  timeLeft: number;
  timerId: number;
}

const initialState: initialStateProps = {
  cells: [],
  boardParams: levels[0],
  phase: 'new',
  currentLevel: 'easy',
  bombsLeft: levels[0].bombs,
  timeLeft: 0,
  timerId: 0,
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
      state.phase = 'change-lvl';
    },
    changePhase(state, actions: PayloadAction<TGamePhase>) {
      state.phase = actions.payload;
    },
    changeBombsLeft(state, actions: PayloadAction<number>) {
      state.bombsLeft = actions.payload;
    },
    changeTimeleft(state, actions: PayloadAction<number>) {
      state.timeLeft = actions.payload;
    },
    updateTimerId(state, actions: PayloadAction<number>) {
      state.timerId = actions.payload;
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
  changeTimeleft,
  updateTimerId,
} = gameSlice.actions;

export const gameState = gameSlice.reducer;
