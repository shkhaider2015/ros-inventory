"use client"

import { createSlice } from "@reduxjs/toolkit"


const initialValues = {
    expected_guest_count: 0,
    checkin_at_door: 0,
}

export const GuestInfo = createSlice({
    name: 'guestInfo',
    initialState: initialValues,
    reducers: {
        updateGuest: (state, action) => {
            // console.log("State : ", state);
            // console.log("Action : ", action)
            return { ...state, ...action.payload }
        }
    }
})

export const { updateGuest } = GuestInfo.actions;

export default GuestInfo.reducer;
