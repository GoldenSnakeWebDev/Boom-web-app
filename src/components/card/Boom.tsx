import { MdLocationPin } from "react-icons/md";
import { IoThumbsUpOutline } from "react-icons/io5";
import { reactToBoom } from "../../service/boomService";
import "./index.css";
import "../../pages/authentication/login.css";
import { useEffect, useState } from "react";

export const BoomCard = (props:any) => {

    const [isLiked, setIsLiked] = useState(false);
    const [countsLiked, setCountsLiked] = useState(0);
    const handleReaction = async () => {

        if (isLiked) {
            setIsLiked(!isLiked);
            setCountsLiked(countsLiked - 1);
        } else {
            setIsLiked(!isLiked);
            setCountsLiked(countsLiked + 1);
        }
        const res = await reactToBoom("likes", props.boom.id);

        if (res?.status === 200) {

            console.log("successfull reaction!!!");

        } else {

            console.log("faild reaction!!!!");
        }
    }

    useEffect(() => {
        setCountsLiked(props.boom.reactions.likes.length);
        const curUserID = localStorage.getItem("userID");

        if (curUserID) {

            props.boom.reactions.likes?.forEach((like:any) => {
                if (like.id === curUserID) {
                    setIsLiked(true);
                }
            })
        } else {
            setIsLiked(false);
        }
    }, [props])

    return (
        <div className="card-container">
            <div className="user-location">
                <p className="no-margin boom-username">{props.boom.user.username}</p>
                <div className="boom-location">
                    <img style={{width:"16px", height:"16px"}} src={props.boom.network.image_url} alt="network icon" />
                    <div className="boom-location boom-gradiant-background boom-border-radius">
                        <MdLocationPin/>
                        <p className="no-margin">{props.boom.location}</p>
                    </div>
                </div>
            </div>
            <div className="nft-name">
                {
                    props.boom.boom_type === 'text' ?
                    <p className="no-margin">{props.boom.image_url}</p> :
                    props.boom.boom_type === 'video' ?
                    <div></div> :
                    <div>
                        <img src={props.boom.image_url} alt="nft_image" />
                    </div>
                }
            </div>

            <div className="nft-title">
                <p className="no-margin">{props.boom.title}</p>
            </div>

            <div className="nft-comment">
                <IoThumbsUpOutline className={`${isLiked && "isliked"} cursor-pointer`} onClick={handleReaction}/>
                <p className="no-margin">{countsLiked}</p>
            </div>
        </div>
    )
}