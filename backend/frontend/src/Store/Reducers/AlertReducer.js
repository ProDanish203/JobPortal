import { createSlice } from "@reduxjs/toolkit";

const AlertReducer = createSlice({
    name: "Alerts",
    initialState: {
        loading: false
    },
    reducers: {
        showLoading: (state) => {
            state.loading = true
        },
        hideLoading: (state) => {
            state.loading = false
        }
    }
})

export const { showLoading, hideLoading } = AlertReducer.actions
export const alertReducer = AlertReducer.reducer