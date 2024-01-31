import React from 'react';
import { useSelector } from 'react-redux';

const MyButton = (props) => {
    const {isDarkMode} = useSelector(state => state.theme)
    return (
        <button {...props} className={ `  cursor-pointer border shadow-[0px_0px_6px_rgba(0,0,0,0.309)]  p-[5px]  border-solid border-[#30f3e3] rounded-lg z-0  my-2 ${isDarkMode ?"bg-[#0000006e] text-[#9883ff] ":"bg-[#C998E0] text-[#090909]"} ` + props.className  }>
           {props.children}
        </button>
    );
}

export default MyButton;
