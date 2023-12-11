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
import './login.css';

export const Register = () => {
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
                                <p className='sign-in-title'>Sign Up</p>
                            </div>

                            <div className='input-fields'>

                                <div className='input-form'>
                                    <MdEmail className='frontIcon-on-input'/>
                                    <input type="text" placeholder='Email' className='input-field' />
                                </div>

                                <div className='input-form'>
                                    <FaUserLarge className='frontIcon-on-input'/>
                                    <input type="text" placeholder='Username' className='input-field' />
                                </div>

                                <div className='input-form'>
                                    <MdLock className='frontIcon-on-input'/>
                                    <input id='password' type={isShowPassword ? "text" : "password"} placeholder='Password' className='input-field' />
                                    {
                                        isShowPassword ? <FiEyeOff className='endIcon-on-input' onClick={onShowPassword}/> : <FiEye className='endIcon-on-input' onClick={onShowPassword}/> 
                                    }
                                </div>

                                <div className='password-rule'>
                                    Must be over 6 characters long, contain an uppercase letter, special symbol and a number
                                </div>

                                <div className='input-form'>
                                    <MdLock className='frontIcon-on-input'/>
                                    <input id='confirm-password' type={isShowPassword ? "text" : "password"} placeholder='Confirm Password' className='input-field' />
                                    {
                                        isShowPassword ? <FiEyeOff className='endIcon-on-input' onClick={onShowPassword}/> : <FiEye className='endIcon-on-input' onClick={onShowPassword}/> 
                                    }
                                </div>
                            </div>
                            
                            <button className='login-button'>
                                LOGIN
                            </button>

                            <div className='register-form'>
                                <p className='no-margin'>Already have an account?</p> <a href='/' className='register'>Log In</a>
                            </div>

                        </form>
                    </div>                    
                </Stack>

            </Box>        
        </Container>
    )
}