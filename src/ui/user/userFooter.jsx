import React from 'react';
import { useSelector } from 'react-redux';

const UserFooter = () => {
    const theme = useSelector(state => state.theme);

    return (
        <div className={`w-full ${theme.primaryColor} p-5 text-center`}>
            <p>Job Portal &copy; 2024</p>
            <p>Developed by <a href="mailto:mjasimmc@gmail.com">Jasim</a></p>
            <div className="flex justify-center space-x-4 mt-2">
                <a href="/about">About Us</a>
                <a href="/contact">Contact Us</a>
                <a href="/terms">Terms of Service</a>
                <a href="/privacy">Privacy Policy</a>
            </div>
        </div>
    );
}

export default UserFooter;

