import { configureStore } from "@reduxjs/toolkit";
import { progressSlice } from "./slice/progressSlice";


export const store = configureStore({
    reducer:{
        progress: progressSlice.reducer
    }
})

