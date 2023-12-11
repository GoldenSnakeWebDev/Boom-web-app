import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { FaUser } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { MdLock } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import './login.css';

export const Login = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);

    const onForgotPassword = () => {
        setShowResetPassword(true);
    }

    const onProceedResetPassword = () => {
        setShowResetPassword(false);
    }

    const onCloseResetDialog = () => {
        setShowResetPassword(false);
    }
    return (
        <Container className='container'>
            <Box width={'100%'}>
                <Stack spacing={5}>
                    <div className='launcher'>
                        <img className='logo-img' src='./assets/icons/launcher_icon.png' alt='launcher icon'/>
                    </div>

                    <div className='login-container'>
                        <form className='login-form'>
                            <div>
                                <FaUser className='user-icon' />
                                <p className='sign-in-title'>Sign In</p>
                            </div>

                            <div className='input-fields'>
                                <div className='input-form'>
                                    <FaUserLarge className='frontIcon-on-input'/>
                                    <input type="text" placeholder='Username or Email' className='input-field' />
                                </div>

                                <div className='input-form'>
                                    <MdLock className='frontIcon-on-input'/>
                                    <input id='password' type={isShowPassword ? "text" : "password"} placeholder='Password' className='input-field' />
                                    {
                                        isShowPassword ? <FiEyeOff className='endIcon-on-input' onClick={() => setIsShowPassword(!isShowPassword)}/> : <FiEye className='endIcon-on-input' onClick={()=>setIsShowPassword(!isShowPassword)}/> 
                                    }
                                </div>
                            </div>
                            
                            <button className='styled-button'>
                                LOGIN
                            </button>

                            <div className='reset-password-form'>
                                <p className='forgot-password no-margin' onClick={onForgotPassword}>Forgot Password</p>
                            </div>

                            <div className='register-form'>
                                <p className='no-margin'>Don't have account?</p> <a href='/register' className='register'>Register</a>
                            </div>

                        </form>
                    </div>   

                    {
                        showResetPassword && 
                        <div className='reset-password-dialog'>
                            <div className='close-icon'>
                                <IoCloseSharp style={{cursor:"pointer"}} onClick={onCloseResetDialog}/>
                            </div>
                            <div className='reset-password-title'>
                                Reset Password
                            </div>
                            <div className='reset-password-description'>
                                Enter your email addresss and click Proceed to reset your password
                            </div>

                            <div className='input-form'>
                                <MdEmail className='frontIcon-on-input'/>
                                <input type="text" placeholder='Email' className='input-field' />
                            </div>

                            <button className='styled-button' onClick={onProceedResetPassword}>
                                Proceed
                            </button>
                        </div>
                    }
                </Stack>

                
            </Box>        
        </Container>
    )
}