import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        isDarkMode: false,
        primaryColor:"bg-[#EEF7FC] text-[black]",
        secondaryColor:'bg-[#EEF7FC]',
    },
    reducers: {
        setDardMode: (state,action) => {
            state.primaryColor =  !state.isDarkMode ? "bg-[#020408] text-[white]":"bg-[#EEF7FC] text-[black]"
            state.secondaryColor =  !state.isDarkMode ? '':''
            state.isDarkMode = !state.isDarkMode

        },
    },
});

export const { setDardMode, removeDardMode } = themeSlice.actions

export default themeSlice.reducer;