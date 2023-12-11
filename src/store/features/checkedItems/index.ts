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
  description: string;
  icon_url: string | undefined;
  id: string;
  name: string;
  quantity: number;
  selectedQuantity: number;
  rental_price: number;
  type: 'INVENTORY_MENU' | 'VENUE_SPEC' | 'KITCHEN_SUPPLY';
  workspace_id?: string;
  updated_at?: string
}

export default cart.reducer;
