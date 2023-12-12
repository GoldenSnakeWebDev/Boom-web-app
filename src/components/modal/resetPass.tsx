import { MdEmail } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

export const ResetPassword = (props:any) => {
    const onProceedResetPassword = () => {
        props.setShowResetPassword(false);
    }
    return (
        <div className='dialog'>
            <div className='close-icon'>
                <IoCloseSharp style={{cursor:"pointer"}} onClick={() => props.setShowResetPassword(false)}/>
            </div>
            <div className='title'>
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
    )
}