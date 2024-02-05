import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const UserFooter = () => {
    const theme = useSelector(state => state.theme);
    const location = useLocation();

    // Define the patterns for the pathnames where UserFooter should be hidden
    const hideOnPathnamePatterns = [
        /\/job\/applicant\/\d+_application/,
        /\/applied\/\d+_application/
    ];

    // Check if the current pathname matches any of the patterns
    const shouldHideFooter = hideOnPathnamePatterns.some(pattern => pattern.test(location.pathname));

    // Render the component conditionally
    return (
        // Render only if shouldHideFooter is false
        !shouldHideFooter && (
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
        )
    );
}

export default UserFooter;
