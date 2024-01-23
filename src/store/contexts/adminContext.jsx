import { createContext, useState } from "react";


export const AdminContext = createContext(null)

export default ({ children }) => {
    const [sideBarOpen, setSideBarOpen] = useState(false)

    return (<AdminContext.Provider value={{
        sideBarOpen,
        setSideBarOpen
    }} >
        {children}
    </AdminContext.Provider>)
}