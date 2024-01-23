import React, { useContext, useEffect } from 'react';

import "./error.css"
import { useNavigate } from 'react-router-dom';
import { UserMainContext } from '../../store/contexts/userContext';
const Error404 = () => {
    const navigate = useNavigate()
    const {
        pageNotFound,
        setPageNotFound,
        serverError,
        setServerError
    } = useContext(UserMainContext)
    const handleGoHomeButton = ()=>{
        setPageNotFound(false)
        navigate(-1)
    }
    useEffect(()=>{
        return ()=>{
            setPageNotFound(false)
        }
    },[serverError,pageNotFound])
    return (
        <div className="box">
            <div className="box__ghost">
                <div className="symbol" />
                <div className="symbol" />
                <div className="symbol" />
                <div className="symbol" />
                <div className="symbol" />
                <div className="symbol" />
                <div className="box__ghost-container">
                    <div className="box__ghost-eyes">
                        <div className="box__eye-left" />
                        <div className="box__eye-right" />
                    </div>
                    <div className="box__ghost-bottom">
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                    </div>
                </div>
                <div className="box__ghost-shadow" />
            </div>
            <div className="box__description">
                <div className="box__description-container">
                    <div className="box__description-title">!Whoops</div>
                    <div className="box__description-text !text-white">
                       Page Not Found
                    </div>
                </div>
                <button
                    className="box__button"
                    onClick={handleGoHomeButton}
                >
                    Go back
                </button>
            </div>
        </div>
    );
}

export default Error404;
