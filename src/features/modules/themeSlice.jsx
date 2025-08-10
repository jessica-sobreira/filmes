import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: true,
    reducers: {
        toggleTheme: (state) => {
            return !state
        }
        
    }
});

export default themeSlice.reducer;

export const { toggleTheme } = themeSlice.actions;