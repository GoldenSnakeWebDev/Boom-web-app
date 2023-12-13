import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { MdOutlineNotifications } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { useState } from "react";

export const Footer = (props:any) => {

    const [isHome, setIsHome] = useState(true);
    const [isSearch, setIsSearch] = useState(false);
    const [isNotification, setIsNotification] = useState(false);
    const [isUser, setIsUser] = useState(false);

    const onNotification = () => {
        setIsNotification(true);
        setIsHome(false);
        setIsSearch(false);
        setIsUser(false);

        props.setIsNotification(true);
        props.setIsHome(false);
        props.setIsSearch(false);
        props.setIsUser(false);
    }

    const onHome = () => {
        props.setIsNotification(false);
        props.setIsHome(true);
        props.setIsSearch(false);
        props.setIsUser(false);

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

        props.setIsNotification(false);
        props.setIsHome(false);
        props.setIsSearch(true);
        props.setIsUser(false);
    }

    const onUser = () => {
        setIsNotification(false);
        setIsHome(false);
        setIsSearch(false);
        setIsUser(true);

        props.setIsNotification(false);
        props.setIsHome(false);
        props.setIsSearch(false);
        props.setIsUser(true);
    }
    
    return (
        <div className="footer-container">
            <div className="footer-iconpart">
                <IoMdHome style={{width:"27px", height:"27px"}} className={`icon ${isHome && "selected-icon"}`} onClick={onHome}/>
                <FaSearch style={{width:"23px", height:"23px"}} className={`icon ${isSearch && "selected-icon"}`} onClick={onSearch}/>
            </div>

            <div className="footer-iconpart">
                <MdOutlineNotifications style={{width:"30px", height:"30px"}} className={`icon ${isNotification && "selected-icon"}`} onClick={onNotification}/>
                <FaUser style={{width:"20px", height:"20px"}} className={`icon ${isUser && "selected-icon"}`} onClick={onUser}/>
            </div>
        </div>
    )
}