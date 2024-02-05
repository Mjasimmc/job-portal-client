import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        isDarkMode: false,
        primaryColor:"bg-[#F1FFFA] text-[#000]",
        // secondaryColor:'bg-[#EEF7FC]',
        buttonColor:"bg-[#C998E0] text-[#090909]"
    },
    reducers: {
        setDardMode: (state,action) => {
            state.primaryColor =  !state.isDarkMode ? "bg-[#020408] text-[white]":"bg-[#faf4f6] text-[#000]"
            // state.secondaryColor =  !state.isDarkMode ? '':''
            state.buttonColor = !state.isDarkMode ? "bg-[#0000006e] text-[#9883ff] ":"bg-[#d2c7d2] text-[#090909]"


            state.isDarkMode = !state.isDarkMode

        },
    },
});

export const { setDardMode, removeDardMode } = themeSlice.actions

export default themeSlice.reducer;