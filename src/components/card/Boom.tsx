import { MdLocationPin } from "react-icons/md";
import { IoThumbsUpOutline } from "react-icons/io5";
import "./index.css";
import "../../pages/authentication/login.css";

export const BoomCard = (props:any) => {

    const handleComment = () => {
        console.log("current commet>>", props.boom.comments.length);
    }
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
                <IoThumbsUpOutline className="cursor-pointer" onClick={handleComment}/>
                <p className="no-margin">{props.boom.comments.length}</p>
            </div>
        </div>
    )
}