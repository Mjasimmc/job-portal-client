import React from 'react';
import { useSelector } from 'react-redux';

const MyButton = (props) => {
    const {buttonColor} = useSelector(state => state.theme)
    return (
        <button {...props} className={ `  cursor-pointer border p-[5px]  border-solid border-[#30f3e3] rounded-lg z-0  my-2 ${buttonColor} ` + props.className  }>
           {props.children}
        </button>
    );
}

export default MyButton;
