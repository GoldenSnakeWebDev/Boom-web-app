import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const EditProfile = () => {
    const navigate = useNavigate()
    return (
        <div className="edit-profile-container">
            <div className="edit-profile-header">
                <MdArrowBackIosNew style={{width:"25px",height:"25px", cursor:"pointer"}} onClick={() => navigate(-1)}/>
            </div>
            <div className="edit-profile-body"></div>
        </div>
    )
}