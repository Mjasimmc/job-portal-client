import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications: [],
        page: 1,
        count:0
    },
    reducers: {
        setAdminLogin: (state, action) => {
           
        },
        setAdminLogout: (state) => {
            
        },

    },
});

export const { setAdminLogin, setAdminLogout } = notificationSlice.actions

export default notificationSlice.reducer;