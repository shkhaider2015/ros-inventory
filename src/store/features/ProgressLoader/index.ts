"use client"

import { createSlice } from "@reduxjs/toolkit"


const initialValues:IState = {
    isProgress: false,
}

export const ProgressLoader = createSlice({
    name: 'progressLoader',
    initialState: initialValues,
    reducers: {
        startProgress: () => {
            return { isProgress: true }
        },
        endProgress: () => {
            return { isProgress: false }
        }
    }
})

interface IState {
    isProgress: boolean;
}

export const { startProgress, endProgress } = ProgressLoader.actions;

export default ProgressLoader.reducer;
