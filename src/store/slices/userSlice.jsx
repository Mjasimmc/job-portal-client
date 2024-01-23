import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: false,
        name: null,
        email: null,
        phone: null,
        id: null
    },
    reducers: {
        setUserLogin: (state, action) => {
            const { email, name, token, phone, _id } = action.payload
            localStorage.setItem('usertoken', token)
            state.isLogin = true;
            state.name = name;
            state.email = email;
            state.phone = phone;
            state.id = _id;
        },
        setUserLogout: (state) => {
            localStorage.removeItem('usertoken')
            state.isLogin = false
            state.id = '';
            state.name = '';
            state.email = '';
            state.phone = '';
        },
    },
});

export const { setUserLogin, setUserLogout } = userSlice.actions

export default userSlice.reducer;