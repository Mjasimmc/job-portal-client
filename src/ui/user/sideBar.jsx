import React from 'react';
import { headerOption } from './header';
import SideBarOption from '../elements/sideBarOption';
import { useSelector } from 'react-redux';

const SideBar = ({
    pageOptions,
    setPageOptions
}) => {
    const {primaryColor} = useSelector(state => state.theme)

    const backgrouColor = () => {
        return primaryColor
    }

    return (
        <div
            className={`fixed left-0 top-0 z-[90] duration-500 !w-[12rem] flex gap-1  pt-0 sidebar-height  flex-col ${pageOptions ? "max-lg:translate-x-0 lg:-translate-x-[100%]" : "-translate-x-[100%]"}`}
        >
            <div className={`flex-1 max-h-full overflow-y-auto border-e duration-700  job-card    ${backgrouColor()}`} onMouseLeave={() => setPageOptions(false)}>
                <div className="w-full flex flex-col gap-1 p-1 " >
                    {headerOption.map((option, i) => (
                        <SideBarOption key={option.keyId} option={option} index={i} setPageOptions={setPageOptions} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SideBar;
