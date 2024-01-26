import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        isDarkMode: false,
    },
    reducers: {
        setDardMode: (state,action) => {
            state.isDarkMode = !state.isDarkMode
        },
    },
});

export const { setDardMode, removeDardMode } = themeSlice.actions

export default themeSlice.reducer;