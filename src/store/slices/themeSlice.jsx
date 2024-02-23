import { createSlice } from '@reduxjs/toolkit';

const darkModeButton = "bg-[#0000006e] text-[#9883ff]"
const lightModeButton = "bg-[#d2c7d2]  text-[#090909]"


export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        isDarkMode: false,
        primaryColor: "dual-backgroud-color text-[#000]",
        secondaryColor: 'secondary-light',
        buttonColor: "bg-[#C998E0] text-[#090909]"
    },
    reducers: {
        setDardMode: (state, action) => {
            state.primaryColor = !state.isDarkMode ? "bg-[#020408] text-[white]" : "dual-backgroud-color text-[#000]"
            // state.primaryColor =  !state.isDarkMode ? "bg-[#020408] text-[white]":"bg-[#faf4f6] text-[#000]"
            state.secondaryColor = !state.isDarkMode ? 'bg-[#020408] text-[white]' : 'secondary-light'
            state.buttonColor = !state.isDarkMode ? darkModeButton : lightModeButton


            state.isDarkMode = !state.isDarkMode

        },
    },
});

export const { setDardMode, removeDardMode } = themeSlice.actions

export default themeSlice.reducer;