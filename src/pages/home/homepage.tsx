import { HeaderBar } from "../../components/hearder"
import { Footer } from "../../components/footer"
import { ShowNftList } from "../../components/showNFTList"
import { Notification } from "../../components/notification";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { boomIconUrl } from "../../utils/constant";
import { postIconUrl } from "../../utils/constant";
import { MdEmail } from "react-icons/md";
import { fansIconUrl } from "../../utils/constant";
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Popover from '@mui/material/Popover';
import "./index.css";
import { getNetworks } from "../../service/network.service";
import { UserProfile } from "../user-profile/user_profile";

export const HomePage = () => {
    const navigate = useNavigate();
    const [isHome, setIsHome] = useState(true);
    const [isSearch, setIsSearch] = useState(false);
    const [isNotification, setIsNotification] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const onNewPost = (popupState:any) => {
        popupState.close();
        navigate('/newpost')
    }

    const onDirectMessage = (popupState:any) => {
        popupState.close();
        navigate('/direct_message');
    }
    useEffect(() => {

        getNetworks();
        const token = localStorage.getItem('token');
        
        if (token === null) {
            navigate('/');
        }

    });

    return (
        <div className="home-container">
            <HeaderBar/>
            {
                isHome === true ? <ShowNftList isSearch={isSearch}/> : isSearch === true && <ShowNftList isSearch={isSearch}/>
            }
            {
                isNotification && <Notification/>
            }

            {
                isUser && <UserProfile/>
            }
            
            <PopupState variant="popover" popupId="post-menu">
                {(popupState:any) => (
                    <div>
                        <div className="post-menu-icon-area" {...bindTrigger(popupState)}>
                            <img src={boomIconUrl} alt="logo icon" className="post-menu-icon"/>
                        </div>
                        <Popover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                            }}
                            transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                            }}
                        >
                            <div className="pop-menu-bar" >
                                <div className="menu-item" onClick={()=> onNewPost(popupState)}>
                                    <img style={{width:"30px", height:"30px"}} src={postIconUrl} alt="post icon"/>
                                    Post
                                </div>
                                <div className="menu-item" onClick={()=> onDirectMessage(popupState)}>
                                    <MdEmail style={{width:"30px", height:"30px"}} />
                                    DM
                                </div>
                                <div className="menu-item" onClick={()=> onNewPost(popupState)}>
                                    <img style={{width:"30px", height:"30px"}} src={fansIconUrl} alt="fans icon" />
                                    Fans
                                </div>
                                <div className="menu-item" onClick={()=> onNewPost(popupState)}>
                                    <img style={{width:"30px", height:"30px"}} src={fansIconUrl} alt="fans icon" />
                                    Frens
                                </div>
                            </div>
                        </Popover>
                    </div>
                    
                )}
            </PopupState>
            <Footer setIsHome={setIsHome} setIsSearch={setIsSearch} setIsNotification={setIsNotification} setIsUser={setIsUser}/>
        </div>
    )
}