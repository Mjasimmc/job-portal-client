import React, { useContext } from 'react';
import Logo from '../../ui/admin/logo';
import { AdminContext } from '../../store/contexts/adminContext';
import { Menu } from '@mui/icons-material';
import HeaderAdmin from '../../ui/admin/header';
import AdminBody from '../../ui/admin/body';
import AdminSidebar from '../../ui/admin/sidebar';
import { Button } from '@mui/material';
import StatusBanner from '../../components/adminComponents/home/statusBanner';

const HomePageAdmin = () => {
    const {
        sideBarOpen,
        setSideBarOpen
    } = useContext(AdminContext)
    return (<>
        <div className="grid min-h-[20rem] p-5">
           <StatusBanner/>
        </div>
    </>
    );
}

export default HomePageAdmin;
