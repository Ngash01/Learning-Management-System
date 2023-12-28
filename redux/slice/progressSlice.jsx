
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    progress:0,
    chapters: [],
    completedChapters: []
}

export const progressSlice = createSlice({
    name:"progress",
    initialState,
    reducers:{
        completeChapter:(state, action) => {
            if (!state.completedChapters.includes(action.payload)) { // Check if the chapter is not already completed
              state.progress = state.progress + 100 / state.chapters.length;
              state.completedChapters.push(action.payload); // Mark the chapter as completed
            }
          },
        setChapters: (state, action)=>{
            state.chapters = action.payload 
        }
    }
})


export const { completeChapter, setChapters } = progressSlice.actions;

