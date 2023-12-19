import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

export const ChangePassword = (props:any) => {

    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const onProceedChangePassword = async () => {
        props.setShowChangePasswordModal(false);

        const token = localStorage.getItem('token');

        if (token) {

            const headers = {
                "Authorization": token,
                "Content-Type": "application/json",
            }
            const body = {
                "current_password": currentPass.trim(),
                "new_password": newPass.trim(),
                "confirm_password": confirmPass.trim(),
            };
    
    
    
            const res = await fetch(`${process.env.REACT_APP_BASIC_URL}users/currentuser-update-password`, {
                method:'post',
                headers: headers,
                body:JSON.stringify(body)
            })

            if (res.status === 200) {
                console.log("updated");
            } else {
                console.log("error occurred>>", res.body);
                console.log("res status code>>>", res.status);
            }
        }

    }
    return (
        <div className='dialog'>
            <div className='close-icon'>
                <IoCloseSharp style={{cursor:"pointer"}} onClick={() => props.setShowChangePasswordModal(false)}/>
            </div>
            <div className='title'>
                Password
            </div>

            <div className='change-pass-input-form'>
                <input type="text" placeholder='Current Password' className='change-pass-input-field' onChange={(e) => setCurrentPass(e.target.value)}/>
                <input type="text" placeholder='New Password' className='change-pass-input-field' onChange={(e) => setNewPass(e.target.value)}/>
                <input type="text" placeholder='Confirm Password' className='change-pass-input-field' onChange={(e) => setConfirmPass(e.target.value)}/>
            </div>

            <button className='styled-button' onClick={onProceedChangePassword}>
                Proceed
            </button>
        </div>
    )
}