import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Popover from '@mui/material/Popover';
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import './index.css';
import '../user-profile/index.css';
import { useEffect, useState } from "react";
import { ChangePassword } from "../../components/modal/changepassword";
import { fetchMyProfile } from "../../service/profile.service";
import { uploadPhoto } from '../../service/profile.service';

export const EditProfile = () => {
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [bnbAddress, setBNBAddress] = useState('');
    const [tzAddress, setTZAddress] = useState('');
    const [maticAddress, setMATICAddress] = useState('');
    const [twitterUsername, setTwitterUsername] = useState('');
    const [facebookLink, setFaceBookLink] = useState('');
    const [instagramUsername, setInstagramUsername] = useState('');
    const [tiktokUsername, setTiktokUsername] = useState('');
    const [mediumLink, setMediumLink] = useState('');
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [photo, setImage] = useState<File>();
    const [email, setEmail] = useState('');
    const [profileURL, setProfileURL] = useState('');

    const navigate = useNavigate()
    const onCamera = (popupState:any) => {
        popupState.close();
    }

    const handlePickImage = (e:any) => {
        setImage(e.target.files[0]);
        console.log("inputed file>>>", e.target.files[0]);
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;
            if (typeof result === "string") {

                setProfileURL(result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    const onGallery = (popupState:any) => {
        popupState.close();
        const input = document.createElement('input');
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e:Event) => handlePickImage(e);
        input.click();
    }

    const onBooms = (popupState:any) => {
        popupState.close();
    }
    const handleUpdateProfile = async () => {
        const token = localStorage.getItem('token');
        const tipping_info:any = [];

        if (token) {

            const temp_model = localStorage.getItem('networkModel');
            if (temp_model) {
                
                const networkModel = JSON.parse(temp_model);
                networkModel.forEach((element:any) => {
                    if (element.symbol === "BNB") {
                        const networkBody = {
                            "network":element.id,
                            "address":bnbAddress?.trim()
                        }
    
                        tipping_info.push(networkBody);
                    } else if (element.symbol === "TZ") {
                        const networkBody = {
                            "network":element.id,
                            "address":tzAddress?.trim()
                        }
                        tipping_info.push(networkBody);
                    } else if (element.symbol === "MATIC") {
                        const networkBody ={
                            "network":element.id,
                            "address":maticAddress?.trim()
                        }
    
                        tipping_info.push(networkBody);
                    }
    
    
                });
    
                if (photo !== undefined) {
                    const profileURL = await uploadPhoto(photo, "Profile photo uploaded!");
    
                    const res = await fetch(`${process.env.REACT_APP_BASIC_URL}users/update-profile`, {
                        method: 'POST',
                        headers: {"Content-Type": "application/json", "Authorization": token},
                        body:JSON.stringify({
                            "username": username,
                            "email": email,
                            "bio": bio,
                            "location": location,
                            // "website": websiteController.text,
                            "photo": profileURL,
                            "tipping_info": tipping_info,
                            "social_media": {
                            "facebook": facebookLink,
                            "twitter": twitterUsername,
                            "instagram": instagramUsername,
                            "tiktok": tiktokUsername,
                            "medium": mediumLink,
                            },
                        })
                    });

                    if (res.status === 200) {
                        console.log("successful updated!");
                    } else {
                        console.log("Error updating profilie");
                    }
                } else if (photo === undefined) {
                    const res = await fetch(`${process.env.REACT_APP_BASIC_URL}users/update-profile`, {
                        method: 'POST',
                        headers: {"Content-Type": "application/json", "Authorization": token},
                        body:JSON.stringify({
                            "username": username,
                            "email": email,
                            "bio": bio,
                            "location": location,
                            // "website": websiteController.text,
                            "tipping_info": tipping_info,
                            "social_media": {
                            "facebook": facebookLink,
                            "twitter": twitterUsername,
                            "instagram": instagramUsername,
                            "tiktok": tiktokUsername,
                            "medium": mediumLink,
                            },
                        })
                    });


                    if (res.status === 200) {
                        console.log("successful updated!");
                    } else {
                        console.log("Error updating profilie");
                    }
                }
    
                
            }
        }
         
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
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

                    setLocation(myProfile.user.location);
                    setUsername(myProfile.user.username);
                    setBio(myProfile.user.bio);
                    setBNBAddress(myProfile.user.tipping_info[0]?.address);
                    setTZAddress(myProfile.user.tipping_info[1]?.address);
                    setMATICAddress(myProfile.user.tipping_info[2]?.address);
                    setTwitterUsername(myProfile.user.social_media.twitter);
                    setFaceBookLink(myProfile.user.social_media.facebook);
                    setInstagramUsername(myProfile.user.social_media.instagram);
                    setTiktokUsername(myProfile.user.social_media.tiktok);
                    setMediumLink(myProfile.user.social_media.medium);
                    setEmail(myProfile.user.email);
                    setProfileURL(myProfile.user.photo);
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
        <div className="edit-profile-container">
            <div className="edit-profile-header">
                <MdArrowBackIosNew style={{width:"25px",height:"25px", cursor:"pointer"}} onClick={() => navigate(-1)}/>
                Edit Profile
                <button className="btn-edit-profile-save" onClick={handleUpdateProfile}>Save</button>
            </div>
            <div className="edit-profile-body">
                {
                    !profileURL ?
                    <div style={{width:"100%", borderRadius:"10px"}} className="profile-add-image-bar">
                        Add header Image
                        <PopupState variant="popover" popupId="post-menu">
                            {(popupState:any) => (
                                <div>
                                    <CiCirclePlus style={{width:"40px", height:"40px"}} {...bindTrigger(popupState)} />
                                    
                                    <Popover
                                        {...bindPopover(popupState)}
                                        anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                        }}
                                    >
                                        <div className="pop-menu-bar" >
                                            <div className="menu-item" onClick={()=> onCamera(popupState)}>
                                                Camera
                                            </div>
                                            <div className="menu-item" onClick={()=> onGallery(popupState)}>
                                                Gallery
                                            </div>
                                            <div className="menu-item" onClick={()=> onBooms(popupState)}>
                                                Booms
                                            </div>
                                        </div>
                                    </Popover>
                                </div>
                                
                            )}
                        </PopupState>
                        
                    </div> :
                    <div style={{width:"100%", borderRadius:"10px", position:"relative"}} className="profile-add-image-bar">
                        <img style={{width:"100px", height:"100px"}} src={profileURL} alt="profile_photo" />
                        <PopupState variant="popover" popupId="post-menu">
                            {(popupState:any) => (
                                <div style={{position:"absolute", left:"0px", bottom:"0px"}}>
                                    <CiCirclePlus style={{width:"40px", height:"40px"}} {...bindTrigger(popupState)} />
                                    
                                    <Popover
                                        {...bindPopover(popupState)}
                                        anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                        }}
                                    >
                                        <div className="pop-menu-bar" >
                                            <div className="menu-item" onClick={()=> onCamera(popupState)}>
                                                Camera
                                            </div>
                                            <div className="menu-item" onClick={()=> onGallery(popupState)}>
                                                Gallery
                                            </div>
                                            <div className="menu-item" onClick={()=> onBooms(popupState)}>
                                                Booms
                                            </div>
                                        </div>
                                    </Popover>
                                </div>
                                
                            )}
                        </PopupState>
                    </div>
                }

                <div className="edit-profile-input-bar">
                    Username*
                    <input className="edit-profile-input-field" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="edit-profile-input-bar">
                    Bio
                    <textarea className="edit-profile-input-field" name="bio" id="bio" maxLength={180} cols={30} rows={6} value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
                    {bio.length}/180
                </div>
                <div className="edit-profile-input-bar">
                    Location
                    <input className="edit-profile-input-field" type="text" value={location} onChange={(e) => setLocation(e.target.value)}/>
                </div>

                <div className="edit-profile-input-bar">
                    Tip
                    <p className="no-margin edit-profile-tip-detail">
                        To receive tips, add your walletaddress below
                    </p>
                    <div style={{width:"100%", display:"flex", alignItems:"center", gap:"10px"}}>
                        <img style={{width:"20px", height:"20px"}} src="./assets/icons/bnb.svg" alt="BNB" />
                        <input className="edit-profile-input-field" type="text" value={bnbAddress} onChange={(e) => setBNBAddress(e.target.value)}/>
                    </div>
                    <div style={{width:"100%", display:"flex", alignItems:"center", gap:"10px"}}>
                        <img style={{width:"21px", height:"20px"}} src="https://lh3.googleusercontent.com/pw/AJFCJaWVmPcwYmSc_CQs5ojp4VCRIZb7-T-kc6ILN4BUvoXXoij0GfabGjQSyei3oE-391ZHZTNSOqWcgD3DWZx6zX4V086LRlHfr8CJN9rnxkBuSBNDs9xSTerU7JWhmz6H9fC3iiAds-bDEmR4qA7a9QTKvw=w805-h988-s-no?authuser=0" alt="TZ" />
                        <input className="edit-profile-input-field" type="text" value={tzAddress} onChange={(e) => setTZAddress(e.target.value)}/>
                    </div>
                    <div style={{width:"100%", display:"flex", alignItems:"center", gap:"10px"}}>
                        <img style={{width:"20px", height:"20px"}} src="./assets/icons/matic.png" alt="MATIC" />
                        <input className="edit-profile-input-field" type="text" value={maticAddress} onChange={(e) => setMATICAddress(e.target.value)}/>
                    </div>
                </div>

                <div className="edit-profile-input-bar">
                    Twitter Username
                    <input className="edit-profile-input-field" type="text" value={twitterUsername} onChange={(e) => setTwitterUsername(e.target.value)}/>
                </div>
                <div className="edit-profile-input-bar">
                    Facebook Link
                    <input className="edit-profile-input-field" type="text" value={facebookLink} onChange={(e) => setFaceBookLink(e.target.value)}/>
                </div>
                <div className="edit-profile-input-bar">
                    Instagram Username
                    <input className="edit-profile-input-field" type="text" value={instagramUsername} onChange={(e) => setInstagramUsername(e.target.value)}/>
                </div>
                <div className="edit-profile-input-bar">
                    Tiktok Username
                    <input className="edit-profile-input-field" type="text" value={tiktokUsername} onChange={(e) => setTiktokUsername(e.target.value)}/>
                </div>
                <div className="edit-profile-input-bar">
                    Medium Link
                    <input className="edit-profile-input-field" type="text" value={mediumLink} onChange={(e) => setMediumLink(e.target.value)}/>
                </div>

                <div style={{display:"flex", justifyContent:"space-between", padding:"10px 0px"}}>
                    <button className="btns-profile-bottom btn-change-password" onClick={() => setShowChangePasswordModal(true)}>Change Password</button>
                    <button className="btns-profile-bottom btn-logout" onClick={handleLogout}>Logout</button>
                </div>
            </div>

            {
                showChangePasswordModal && <ChangePassword setShowChangePasswordModal={setShowChangePasswordModal}/>
            }
        </div>
    )
}