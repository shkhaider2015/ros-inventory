"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/checkedItems";
import GuestInfo from "./features/GuestInfo";
import Modal from "./features/Modal";

const rootReducer = combineReducers({
  cart: cartReducer,
  guestInfo: GuestInfo,
  modal: Modal
  //add all your reducers here
});

export const store = configureStore({
  reducer: rootReducer,
});
