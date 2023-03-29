import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { openArea } from '../../components/GameBoard/gameLogic';
import { levels } from '../../const/const';
import { IBoardParams, ICell, IGameParams, TGamePhase, TLevelType } from '../../types/types';
import { RootState } from '../rootReducer';

interface initialStateProps extends IGameParams {
  phase: TGamePhase;
  currentLevel: TLevelType;
}

const initialState: initialStateProps = {
  cells: [],
  boardParams: levels[0],
  phase: 'new',
  currentLevel: 'easy',
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
      console.log('cell in slice', cell)
      const {i, j} = cell.position;
      state.cells[i][j] = cell;
    },
    changeLevel(state, actions: PayloadAction<{currentLevel: TLevelType, boardParams: IBoardParams}>) {
      state.currentLevel = actions.payload.currentLevel;
      state.boardParams = actions.payload.boardParams;
    },
    changePhase(state, actions: PayloadAction<TGamePhase>) {
      state.phase = actions.payload;
    },
  },
});

export const selectState = (state: RootState) => state.gameState;

export const { changeCells, changePhase, changeLevel, updateOneCell } = gameSlice.actions;

export const gameState = gameSlice.reducer;

