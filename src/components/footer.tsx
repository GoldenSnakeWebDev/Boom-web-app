import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { MdOutlineNotifications } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { useState } from "react";

export const Footer = () => {

    const [isHome, setIsHome] = useState(true);
    const [isSearch, setIsSearch] = useState(false);
    const [isNotification, setIsNotification] = useState(false);
    const [isUser, setIsUser] = useState(false);

    const onNotification = () => {
        setIsNotification(true);
        setIsHome(false);
        setIsSearch(false);
        setIsUser(false);
    }

    const onHome = () => {
        setIsNotification(false);
        setIsHome(true);
        setIsSearch(false);
        setIsUser(false);
    }

    const onSearch = () => {
        setIsNotification(false);
        setIsHome(false);
        setIsSearch(true);
        setIsUser(false);
    }

    const onUser = () => {
        setIsNotification(false);
        setIsHome(false);
        setIsSearch(false);
        setIsUser(true);
    }
    
    return (
        <div className="footer-container">
            <div className="footer-iconpart">
                <IoMdHome style={{width:"25px", height:"25px"}} className={`icon ${isHome && "selected-icon"}`} onClick={onHome}/>
                <FaSearch style={{width:"25px", height:"25px"}} className={`icon ${isSearch && "selected-icon"}`} onClick={onSearch}/>
            </div>

            <div className="footer-iconpart">
                <MdOutlineNotifications style={{width:"30px", height:"30px"}} className={`icon ${isNotification && "selected-icon"}`} onClick={onNotification}/>
                <FaUser style={{width:"25px", height:"25px"}} className={`icon ${isUser && "selected-icon"}`} onClick={onUser}/>
            </div>
        </div>
    )
}