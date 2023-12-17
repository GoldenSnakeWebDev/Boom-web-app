import "./index.css";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { useState } from "react";

export const DirectMessage = () => {
    const [value, setValue] = useState('1');
    const navigate = useNavigate();
    return (
        <div className="direct-message-container">
            <div className="dm-header-bar">
                <div className="back-icon">
                    <MdArrowBackIosNew style={{width:"25px",height:"25px", cursor:"pointer"}} onClick={() => navigate(-1)}/>
                </div>
                <div className="dm-title-bar">
                    <Tab label="Direct Message" value="1" />
                </div>
            </div>

            <div className="dm-body">
                
            </div>

        </div>
    )
}