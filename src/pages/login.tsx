import React, { useEffect, useState } from 'react';
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
import { IoIosCloseCircleOutline } from "react-icons/io";
import './login.css';

export const Login = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [showWelcomeDialog, setShowWelcomeDialog] = useState(true);
    const onForgotPassword = () => {
        setShowResetPassword(true);
    }

    const onProceedResetPassword = () => {
        setShowResetPassword(false);
    }

    useEffect(() => {
        setShowWelcomeDialog(true);
    }, [])
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
                        <div className='dialog'>
                            <div className='close-icon'>
                                <IoCloseSharp style={{cursor:"pointer"}} onClick={() => setShowResetPassword(false)}/>
                            </div>
                            <div className='reset-password-title'>
                                Reset Password
                            </div>
                            <div className='description'>
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

                    {
                        showWelcomeDialog &&

                        <div className='dialog'>
                            <div className='close-icon' style={{color:"red"}}>
                                <IoIosCloseCircleOutline style={{cursor:"pointer"}} onClick={() => setShowWelcomeDialog(false)}/>
                            </div>

                            <div className='title'>
                                Welcome to Boom!
                            </div>

                            <div className='boom-subtitle'>
                                Boom is where merchants & Social users win together!
                            </div>

                            <button className='styled-button btn-welcome-important' onClick={onProceedResetPassword}>
                                Important, please read:
                            </button>

                            <div className='boom-description'>
                                <ul>
                                    <li>
                                        This version is a "simulation"(demo) of what's to come!
                                    </li>
                                    <li>
                                        With this simulation, users can own social content
                                    </li>
                                    <li>
                                        Users have the bonus of trading content using simulated (pseudo) coins across Tezos, Polygon & BNB
                                    </li>
                                    <li>
                                        This simulation gives usrs a fun way to experience the application completely free and shows a preview....
                                    </li>
                                </ul>
                            </div>

                            <button className='styled-button btn-welcome-gotit' onClick={() => setShowWelcomeDialog(false)}>
                                GOT IT
                            </button>

                        </div>
                    }
                </Stack>

                
            </Box>        
        </Container>
    )
}