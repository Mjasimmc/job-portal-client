import React, { createContext, useContext, useState } from 'react';
import Error404 from '../../pages/errorPages/error404';
import Error500 from '../../pages/errorPages/error500';
export const UserMainContext = createContext(null)

const UserContext = ({ children }) => {
    const [pageOptions, setPageOptions] = useState(false)
    const [sideOptions, setSideOptions] = useState(false)
    const [employeeProfile, setEmployeeProfile] = useState(true)

    const [pageNotFound, setPageNotFound] = useState(false)
    const [serverError, setServerError] = useState(false)
    return (
        <>
            <UserMainContext.Provider value={{
                pageOptions,
                setPageOptions,
                sideOptions,
                setSideOptions,
                employeeProfile,
                setEmployeeProfile,
                pageNotFound,
                setPageNotFound,
                serverError, 
                setServerError
            }}>
                {children}
              
            </UserMainContext.Provider>
        </>
    );
}

export default UserContext;
