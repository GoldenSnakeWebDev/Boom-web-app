import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { FaUser } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { MdLock } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import './login.css';

export const Login = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const onShowPassword = () => {

        setIsShowPassword(!isShowPassword);
     
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
                                        isShowPassword ? <FiEyeOff className='endIcon-on-input' onClick={onShowPassword}/> : <FiEye className='endIcon-on-input' onClick={onShowPassword}/> 
                                    }
                                </div>
                            </div>
                            
                            <button className='login-button'>
                                LOGIN
                            </button>

                            <div className='reset-password-form'>
                                <p className='forgot-password no-margin'>Forgot Password</p>
                            </div>

                            <div className='register-form'>
                                <p className='no-margin'>Don't have account?</p> <a href='/register' className='register'>Register</a>
                            </div>

                        </form>
                    </div>                    
                </Stack>

                {/* <div className='reset-password-dialog'>
                    <div className='reset-password-title'>
                        Reset Password
                    </div>
                    <div className='reset-password-title'>
                        Enter your email addresss and click Proceed to reset your password
                    </div>
                </div> */}
            </Box>        
        </Container>
    )
}