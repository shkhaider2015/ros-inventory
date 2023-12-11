"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/checkedItems";

const rootReducer = combineReducers({
  cart: cartReducer,
  //add all your reducers here
});

export const store = configureStore({
  reducer: rootReducer,
});
