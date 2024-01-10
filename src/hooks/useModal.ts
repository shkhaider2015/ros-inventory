"use client"
import { useDispatch } from "react-redux"
import { openModal, closeModal } from "../store/features/Modal"

const useModal = () => {
    const dispatch = useDispatch();

    const open = (params:IOpen) => {
        dispatch(openModal(params))
    }

    const close = () => {
        dispatch(closeModal())
    }

    return {
        open,
        close
    }
}

interface IOpen {
    message: string | undefined;
    onOk?: () => Promise<any>;
    onCancel?: () => Promise<any>
}

export default useModal