import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { FaUser } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { MdLock } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { ResetPassword } from '../../components/modal/resetPass';
import { Welcome } from '../../components/modal/welcome';
import {UserModel} from '../../model/user_model';
import { useNavigate } from 'react-router-dom';

import './login.css';

export const Login = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [showWelcomeDialog, setShowWelcomeDialog] = useState(true);
    const [userName, setUserName] = useState('');
    const [password, setpassword] = useState('');
    const [user, setUser] = useState<UserModel>({ status: '', user: null });

    const navigate = useNavigate();

    // const baseURL = process.env.REACT_APP_BASIC_URL;
    const onForgotPassword = () => {
        setShowResetPassword(true);
    }

    const handleLogin = async () => {

        console.log("logining...");
        const headers = {'Content-Type': 'application/json'};
        const res:Response = await fetch(`${process.env.REACT_APP_BASIC_URL}users/signin`, {
            method:'post',
            headers:headers,
            body: JSON.stringify({
                "email":userName,
                "password":password
            })
        })

        console.log("response>>>>", res.body);

        if (res.status === 200) {
            // setUser(res.body);
            
            // Check if the response body is not null
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
                setUser(JSON.parse(result));
                const token = JSON.parse(result).token;

                console.log('tokey>>>', token);
                localStorage.setItem('token', `Bearer ${token}`);
                const userId = user.user?.id ?? 'defaultUserId';
                localStorage.setItem('userID', userId);
                console.log('user id>>>>', userId);

                navigate('/homepage');

            } else {
                console.error('Response body is null.');
            }
            
        }
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
                        <div className='login-form'>
                            <div>
                                <FaUser className='user-icon' />
                                <p className='sign-in-title'>Sign In</p>
                            </div>

                            <div className='input-fields'>
                                <div className='input-form'>
                                    <FaUserLarge className='frontIcon-on-input'/>
                                    <input type="text" placeholder='Username or Email' className='input-field' onChange={(event) => setUserName(event.target.value)}/>
                                </div>

                                <div className='input-form'>
                                    <MdLock className='frontIcon-on-input'/>
                                    <input id='password' type={isShowPassword ? "text" : "password"} placeholder='Password' className='input-field' onChange={(event) => setpassword(event.target.value)}/>
                                    {
                                        isShowPassword ? <FiEyeOff className='endIcon-on-input' onClick={() => setIsShowPassword(!isShowPassword)}/> : <FiEye className='endIcon-on-input' onClick={()=>setIsShowPassword(!isShowPassword)}/> 
                                    }
                                </div>
                            </div>
                            
                            <button className='styled-button btn-login' onClick={handleLogin}>
                                LOGIN
                            </button>

                            <div className='reset-password-form'>
                                <p className='forgot-password no-margin' onClick={onForgotPassword}>Forgot Password</p>
                            </div>

                            <div className='register-form'>
                                <p className='no-margin' style={{color:"white"}}>Don't have account?</p> <a href='/register' className='register'>Register</a>
                            </div>

                        </div>
                    </div>   

                    {
                        showResetPassword && <ResetPassword setShowResetPassword={setShowResetPassword}/>
                    }

                    {
                        showWelcomeDialog && <Welcome setShowWelcomeDialog={setShowWelcomeDialog}/>
                    }

                    <div className='animation-board'>
                        <img src="./assets/icons/422dress_100789(1).png" alt="animation_image" className='animation-turning  animated-image1' />
                        <img src="./assets/icons/Handbag Emoji(1).png" alt="animation_image" className='animation-turning  animated-image2' />
                        <img src="./assets/icons/laughter-clipart-xl(1).png" alt="animation_image" className='animation-turning  animated-image3' />
                        <img src="./assets/icons/man-s-shoe-emoji-clipart-xl(1).png" alt="animation_image" className='animation-turning  animated-image4' />
                        <img src="./assets/icons/running-shoe-emoji-clipart-xl(2).png" alt="animation_image" className='animation-turning  animated-image5' />
                        <img src="./assets/icons/t-shirt-emoji-clipart-xl(1).png" alt="animation_image" className='animation-turning  animated-image6' />
                        <img src="./assets/icons/sun-glass-clipart-xl(1).png" alt="animation_image" className='animation-turning  animated-image7' />
                    </div>
                    
                </Stack>
                
            </Box>        
        </Container>
    )
}