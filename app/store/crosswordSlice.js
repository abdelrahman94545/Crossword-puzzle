import { createSlice } from "@reduxjs/toolkit";
import { crosswordData, grid, solution } from "../data/crosswordData";


const initialState = {
  currentCrosswordData: crosswordData,
  currentGridData: grid,
  highlightRow: [],
  highlightCol: [],
  nextGridDirection: "across",
  currentGridDirection: "",
  crosswordSolution: solution,
};


const crosswordSlice = createSlice({
  name: "crossword",
  initialState,
  reducers: {
    setHighlightRowsAndCols: (state, action) => {
      state.highlightRow = action.payload.gridRow
      state.highlightCol = action.payload.gridCol
    },

    settoggleDirection: (state) => {
      state.nextGridDirection = state.nextGridDirection === "across" ? "down" : "across" 
      state.currentGridDirection = state.nextGridDirection === "across" ? "down" : "across" 
    },

    setUpdateDirection: (state, action) => {
      state.nextGridDirection = action.payload
      state.currentGridDirection = action.payload
    },

    setUpdateCrosswordData: (state, action) => {
      state.currentCrosswordData = action.payload
    },

    setChangeGridData: (state, action) => {
      state.currentGridData[action.payload.row][action.payload.col] =  action.payload.val
    },

    setSolveGridData: (state) => {
      state.currentGridData =  solution
    },

    setResetGridData: (state) => {
      state.currentGridData =  grid
    },
  },
});


export const { 
    setHighlightRowsAndCols, 
    settoggleDirection, 
    setUpdateDirection, 
    setUpdateCrosswordData,
    setChangeGridData,
    setSolveGridData,
    setResetGridData 
  } = crosswordSlice.actions;
export default crosswordSlice.reducer;