import { configureStore } from "@reduxjs/toolkit";
import crosswordReducer from "./crosswordSlice";
import storage from "redux-persist/lib/storage"; // localStorage


// config
const persistConfig = {
  key: "root",
  storage,
};


export const store = configureStore({
  reducer: {
    crossword: crosswordReducer,
  },
  devTools: true,
});
