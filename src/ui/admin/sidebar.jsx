import React, { useContext } from 'react';
import { AdminContext } from '../../store/contexts/adminContext';
import Logo from './logo';
import { useNavigate } from 'react-router-dom';
import SideBarOption from '../elements/sideBarOption';
import { useSelector } from 'react-redux';
const adminSidebarOptions = [
    {
        keyId: '1',
        title: 'Home',
        to: '/admin',
        view: true
    },
    {
        keyId: '2',
        title: 'Users',
        to: '/admin/users',
        view: true
    },
    {
        keyId: '3',
        title: 'Jobs',
        to: '/admin/jobs',
        view: true
    },
    // {
    //     keyId: '4',
    //     title: 'Create Job',
    //     to: '/admin/create-job',
    //     view: true
    // },
    {
        keyId: '5',
        title: 'Subscription',
        to: '/admin/subscription',
        view: true
    },
];
const AdminSidebar = () => {
    const {
        sideBarOpen,
        setSideBarOpen
    } = useContext(AdminContext)
    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const backgrouColor = () => {
        return isDarkMode ? 'bg-[#2d2d2d]' : 'bg-white'
    }
    return (<>

        <section className={`fixed left-0 top-0 border z-[90] duration-500 !w-[12rem] flex gap-1  pt-0 sidebar-height bg-white flex-col ${sideBarOpen ? "max-lg:-translate-x-[0] " : 'max-lg:-translate-x-[100%]'}`}
            onMouseLeave={() => setSideBarOpen(false)}>
            <div className={`p-1 uppercase flex-1 shadow rounded-md overflow-auto ${backgrouColor()}`}>
                {adminSidebarOptions.map((option, i) => (
                    <SideBarOption key={option.keyId} option={option} index={i} setPageOptions={setSideBarOpen} />
                ))}
            </div>
        </section>

    </>
    );
}

export default AdminSidebar;
