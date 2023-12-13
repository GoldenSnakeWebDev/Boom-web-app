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
import { useNavigate } from 'react-router-dom';
import './login.css';

export const Register = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPass, setIsShowConfirmPass] = useState(false);
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const navigate = useNavigate();

    const regex = RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$&*~]).{6,}$');
    const handleRegister = async (e:any) => {

        const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegexp.test(email)) {
            console.log("invalid email");
            return;
        }
        if (validatePassword()) {
            const headers = {'Content-Type': 'application/json'};
            const res:Response = await fetch(`${process.env.REACT_APP_BASIC_URL}users/signup`, {
                method:'post',
                headers:headers,
                body: JSON.stringify({
                    "email":email,
                    "username":userName,
                    "password":password
                })
            })

            console.log("response>>>", res)
            if (res.status === 201) {
                navigate('/');
            } else if (res.status === 400) {
                if (res.body) {
                    const reader = res.body.getReader();
                    let result = '';
        
                    // Assuming the response is text, adjust as needed for other types
                    while (true) {
                    const { done, value } = await reader.read();
        
                    if (done) {
                        break;
                    }
        
                    result += new TextDecoder().decode(value);
                    }
        
                    // Now, parse the string using JSON.parse
                    const message = JSON.parse(result).message;
                    
                    console.log('response>>>', message);
    
                } else {
                    console.error('Response body is null.');
                }
            }

        } else {
            console.log("Please make sure you password meets the requirements");
        }
    }

    const validatePassword = () => {
        if (
            password.trim().length === confirmPass.trim().length &&
            password.trim() === confirmPass.trim() &&
            regex.test(password.trim()) &&
            regex.test(confirmPass.trim()) &&
            password.trim().length >= 6
          ) {
            // Password and confirm password are valid.
            return true;
          } else {
            // Password and confirm password do not meet the required conditions.
            return false
          }
    }
    return (
        <Container className='container'>
            <Box width={'100%'}>
                <Stack spacing={5}>
                    <div className='launcher'>
                        <img className='logo-img' src='./assets/icons/launcher_icon.png' alt='launcher icon'/>
                    </div>

                    <div className='login-container'>
                        <div className='login-form'>
                            <div>
                                <FaUser className='user-icon' />
                                <p className='sign-in-title'>Sign Up</p>
                            </div>

                            <div className='input-fields'>

                                <div className='input-form'>
                                    <MdEmail className='frontIcon-on-input'/>
                                    <input type="email" placeholder='Email' className='input-field' required onChange={(event) => setEmail(event.target.value)}/>
                                </div>

                                <div className='input-form'>
                                    <FaUserLarge className='frontIcon-on-input'/>
                                    <input type="text" placeholder='Username' className='input-field' onChange={(event) => setUserName(event.target.value)}/>
                                </div>

                                <div className='input-form'>
                                    <MdLock className='frontIcon-on-input'/>
                                    <input id='password' type={isShowPassword ? "text" : "password"} placeholder='Password' className='input-field' onChange={(event) => setPassword(event.target.value)}/>
                                    {
                                        isShowPassword ? <FiEyeOff className='endIcon-on-input' onClick={() => setIsShowPassword(!isShowPassword)}/> : <FiEye className='endIcon-on-input' onClick={() => setIsShowPassword(!isShowPassword)}/> 
                                    }
                                </div>

                                <div className='password-rule'>
                                    Must be over 6 characters long, contain an uppercase letter, special symbol and a number
                                </div>

                                <div className='input-form'>
                                    <MdLock className='frontIcon-on-input'/>
                                    <input id='confirm-password' type={isShowConfirmPass ? "text" : "password"} placeholder='Confirm Password' className='input-field' onChange={(event) => setConfirmPass(event.target.value)}/>
                                    {
                                        isShowConfirmPass ? <FiEyeOff className='endIcon-on-input' onClick={()=>setIsShowConfirmPass(!isShowConfirmPass)}/> : <FiEye className='endIcon-on-input' onClick={() => setIsShowConfirmPass(!isShowConfirmPass)}/> 
                                    }
                                </div>
                            </div>
                            
                            <button className='styled-button' onClick={handleRegister}>
                                CREATE ACCOUNT
                            </button>

                            <div className='register-form'>
                                <p className='no-margin'>Already have an account?</p> <a href='/' className='register'>Log In</a>
                            </div>

                        </div>
                    </div>                    
                </Stack>

            </Box>        
        </Container>
    )
}