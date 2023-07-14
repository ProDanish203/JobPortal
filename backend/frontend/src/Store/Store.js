import { configureStore } from "@reduxjs/toolkit";
import { alertReducer } from "./Reducers/AlertReducer";
import { authReducer } from "./Reducers/AuthReducer";

const Store = configureStore({
    reducer: {
        alerts: alertReducer,
        auth: authReducer, 
    }
})

export default Store;