import React from 'react';
import { Outlet } from 'react-router-dom';
import ContentBody from '../body/content-body';
import FullBody from '../body/full-body';
import HeaderAdmin from './header';
import AdminSidebar from './sidebar';
import IsAdminLogged from '../../config/isAdminLogged';
import ContentSidebarBody from '../body/content-sidebar-body';

const AdminBody = () => {
    return (
        <FullBody>
            <HeaderAdmin />
            <ContentSidebarBody>
                <AdminSidebar />
                <IsAdminLogged />
                <Outlet />
            </ContentSidebarBody>
        </FullBody>
    );
}

export default AdminBody;
