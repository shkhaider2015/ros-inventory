"use client"; //this is a client side component

import { createSlice } from "@reduxjs/toolkit";

const initialState: IItem[] = [];

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    removeFromCart: (state, action) => {
      return (state = state.filter((item) => item.id !== action.payload));
    },
  },
});

export const { addToCart, removeFromCart } = cart.actions;

interface IItem {
  id: string;
  title: string;
  url: string;
  price: number;
  units: number;
  desc: string;
  updatedAt: string;
}

export default cart.reducer;
