import React from 'react';
import { useSelector } from 'react-redux';

const InputTextField = ({ type = 'input', value, onChange, className = '', label, error, ...restProps }) => {
    const { isDarkMode } = useSelector(state => state.theme);

    return (
        <div className={`form__group`}>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={`form__field ${className} ${isDarkMode ? 'caret-white' : 'caret-black'}`}
                placeholder={label}
                required=""
                {...restProps}
            />
            <label htmlFor="name" className={`form__label text-[#00000064] ${error && 'text-[red]'}`}>{label}</label>
            {error && <p className='text-xs text-[red]'>invalid {label}</p>}
        </div>
    );
}

export default InputTextField;
