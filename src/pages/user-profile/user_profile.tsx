import { FaFacebook, FaTiktok, FaTwitter } from "react-icons/fa";
import { FaMedium, FaInstagram } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";
import { LiaUserEditSolid } from "react-icons/lia";
import { MdLocationPin } from "react-icons/md";
import { useEffect, useState } from "react"
import { fetchMyProfile } from "../../service/profile.service"
import "./index.css";

export const UserProfile = () => {
    const [userLocation, serUserLocation] = useState('');
    const [userName, setUserName] = useState('');
    const [userSocialMedia, setUserSocialMedia] = useState({
        discord:"",
        facebook: "",
        instagram: "",
        medium: "",
        telegram: "",
        tiktok: "",
        twitter: ""
    })

    const [userBooms, setUserBooms] = useState([]);
    const [userFans, setUserFans] = useState([]);
    const [userFrens, setUserFrens] = useState([]);
    const [userBio, setUserBio] = useState([]);

    const handleAddImage = () => {

    }

    const getMyProfile = async () => {
        const res = await fetchMyProfile();
        if (res) {

            if (res.status === 200) {
                
                if (res.body) {
                    const reader = res.body.getReader();
                    let result = '';
        
                    while (true) {
                    const { done, value } = await reader.read();
        
                    if (done) {
                        break;
                    }
        
                    result += new TextDecoder().decode(value);
                    }
        
                    const myProfile = JSON.parse(result);

                    console.log("my profile>>>>", myProfile);

                    serUserLocation(myProfile.user.location);
                    setUserName(myProfile.user.username);
                    setUserSocialMedia(myProfile.user.social_media);
                    setUserBooms(myProfile.user.booms);
                    setUserFans(myProfile.user.funs);
                    setUserFrens(myProfile.user.friends);
                    setUserBio(myProfile.user.bio);

                } else {
                    console.error('Response body is null.');
                }
            }
        }
    }

    useEffect(() => {
        getMyProfile();
    }, [])

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-location">
                    <MdLocationPin/>
                    {userLocation}
                </div>
                <div className="profile-username">
                    {userName}
                </div>
                <div className="profile-edit">
                    <LiaUserEditSolid style={{width:"24px", height:"24px", cursor:"pointer"}}/>
                </div>

            </div>

            <div className="profile-body">
                <div className="profile-image-socail-bar">
                    <div className="profile-image-bar">
                        Add header Image
                        <CiCirclePlus style={{width:"40px", height:"40px"}} onClick={handleAddImage}/>
                    </div>
                    <div className="profile-social-bar">
                        {
                            userSocialMedia.twitter ? 
                            <a href={`https://twitter.com/${userSocialMedia.twitter}`} target="blank">
                                <FaTwitter className={"socialmdial-color-blue"}/>
                            </a> :
                            <FaTwitter className={"socialmdial-color-black"}/>
                        }
                        {
                            userSocialMedia.facebook ? 
                            <a href={`https://www.facebook.com/${userSocialMedia.facebook}`} target="blank">
                                <FaFacebook className={"socialmdial-color-blue"}/>
                            </a>:
                            <FaFacebook className={"socialmdial-color-black"}/>
                        }
                        
                        {
                            userSocialMedia.instagram ? 
                            <a href={`https://instagram.com/${userSocialMedia.instagram}`} target="blank">
                                <FaInstagram className={"socialmdial-color-blue"}/>
                            </a> :
                            <FaInstagram className={"socialmdial-color-black"}/>
                        }
                        {
                            userSocialMedia.tiktok ?
                            <a href={`https://tiktok.com/@${userSocialMedia.tiktok}`}>
                                <FaTiktok className="socialmedia-color-blue"/>
                            </a> :
                            <FaTiktok className="socialmedia-color-black"/>

                        }
                        {
                            userSocialMedia.medium ?
                            <a href={`https://www.medium.com/@${userSocialMedia.medium}`}>
                                <FaMedium className={"socialmdial-color-blue"}/>
                            </a> :
                            <FaMedium className={"socialmdial-color-black"}/>
                        }
                        
                    </div>
                </div>

                <div className="profile-detail-booms-fans-frens">
                    <div className="profile-details">
                        <div className="profile-details-counts">
                            {userBooms.length}
                        </div>
                        Booms
                    </div>

                    <div className="profile-details">
                        <div className="profile-details-counts">
                            {userFans.length}
                        </div>
                        Fans
                    </div>

                    <div className="profile-details">
                        <div className="profile-details-counts">
                            {userFrens.length}
                        </div>
                        Frens
                    </div>
                </div>

                <div className="profile-bio">
                    {userBio ? userBio : "You have no Bio yet please add one"}
                </div>
            </div>
            
        </div>
    )
}