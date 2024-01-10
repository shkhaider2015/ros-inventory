"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/checkedItems";
import GuestInfo from "./features/GuestInfo";
import Modal from "./features/Modal";
import formFields from "./features/formFields";

const rootReducer = combineReducers({
  cart: cartReducer,
  guestInfo: GuestInfo,
  modal: Modal,
  formFields: formFields,
  //add all your reducers here
});

export const store = configureStore({
  reducer: rootReducer,
});
