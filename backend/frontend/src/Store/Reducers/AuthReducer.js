import { createSlice } from "@reduxjs/toolkit";

const AuthReducer = createSlice({
    name: "Auth",
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})


export const { setUser }  = AuthReducer.actions;
export const authReducer = AuthReducer.reducer;