import React from 'react';
import { useSelector } from 'react-redux';

const InputTextField = (props) => {
    const {isDarkMode} = useSelector(state => state.theme)
    return (
        <div className={`form__group `}>
            <input  type="input" value={props.value} onChange={props.onChange} className={`form__field  ${props.className} `} placeholder="Name" required="" />
            <label htmlFor="name" className={`form__label text-[#00000064] ${props.error && 'text-[red]'}`}>{props.label}</label>

            {props.error &&<p className='text-xs text-[red]'>{props.label} is required</p>}
        </div>
    );
}

export default InputTextField;
