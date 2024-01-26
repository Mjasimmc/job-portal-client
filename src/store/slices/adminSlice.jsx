import { createSlice } from '@reduxjs/toolkit';

export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        isLogin: false,
    },
    reducers: {
        setAdminLogin: (state,action) => {
            console.log(action.payload)
            localStorage.setItem('admintoken',action.payload.token)
            state.isLogin = true
        },
        setAdminLogout: (state) => {
            localStorage.removeItem('admintoken')
            state.isLogin = false
        },

    },
});

export const { setAdminLogin, setAdminLogout } = adminSlice.actions

export default adminSlice.reducer;