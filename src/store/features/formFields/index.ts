"use client"; //this is a client side component

import { createSlice } from "@reduxjs/toolkit";

const initialState: IItem = {
  isFormFieldsChanged: false,
};

export const formFields = createSlice({
  name: "formFields",
  initialState,
  reducers: {
    updateFormFields: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateFormFields } = formFields.actions;

interface IItem {
  isFormFieldsChanged: boolean;
}

export default formFields.reducer;
