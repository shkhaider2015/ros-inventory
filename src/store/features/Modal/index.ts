"use client"

import { createSlice } from "@reduxjs/toolkit"


const initialValues:IState = {
    isOpen: false,
    message: 'Are you sure you want to perform the action',
}

export const Modal = createSlice({
    name: 'modal',
    initialState: initialValues,
    reducers: {
        openModal: (state, action) => {
            return { isOpen: true, ...action.payload }
        },
        closeModal: (state) => {
            return {
                isOpen: false,
                message: undefined,
                onOk: async () => {},
                onCancel: async () => {}
            }
        }
    }
})

interface IState {
    isOpen: boolean;
    message: string | undefined;
    onOk?: () => Promise<any>;
    onCancel?: () => Promise<any>
}

export const { openModal, closeModal } = Modal.actions;

export default Modal.reducer;
