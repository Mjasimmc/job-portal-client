import React from 'react';


import { Provider } from 'react-redux';
import { store } from './redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import 'sweetalert2/src/sweetalert2.scss'
import UserContext from './contexts/userContext';
import AdminContextProvider from './contexts/adminContext';
import { ToastContainer } from 'react-toastify';

let persistor = persistStore(store)


const Config = ({ children }) => {
    return (
        <>

            <AdminContextProvider>
                <div className="fixed z-50 mt-[4.5rem] Z-[50]">
                    <ToastContainer />
                </div>
                <UserContext>
                    <Provider store={store}>
                        <PersistGate persistor={persistor}>
                            {children}
                        </PersistGate>
                    </Provider>
                </UserContext>
            </AdminContextProvider>
        </>
    );
}

export default Config;
