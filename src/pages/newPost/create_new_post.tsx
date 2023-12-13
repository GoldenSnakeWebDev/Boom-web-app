import { MdArrowBackIosNew } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Popover from '@mui/material/Popover';
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import IconButton from '@mui/material/IconButton';
import { getNetworks } from "../../service/network.service";
import "./index.css";

export const CreateNewPost = () => {
    const navigate = useNavigate();
    const [NFTtext, setNFTtext] = useState('');
    const [networkModels, setNetworkModels] = useState([{
        id: "",
        image_url: "",
        is_active: true,
        name: "",
        symbol: ""
    }]);

    const onBack = () => {
        navigate(-1);
    }

    const onChangeChain = (popupState:any) => {
        popupState.close();
    }

    useEffect(() => {

        const localstoageItem = localStorage.getItem('networkModel');
        console.log("networkmodels>>>>", localstoageItem);
        if (localstoageItem !== null) {
            setNetworkModels(JSON.parse(localstoageItem));
        } else {
            getNetworks();
        }
        const token = localStorage.getItem('token');
        
        if (token === null) {
            navigate('/');
        }

    }, []);

    return (
        <div className="new-post-container">
            <div className="newpost-header-bar">
                <div style={{width:"30%", display:"flex", justifyContent:"start"}}>
                    <MdArrowBackIosNew style={{cursor:"pointer"}} onClick={onBack}/>
                </div>
                New Post
                <div style={{width:"30%", display:"flex", justifyContent:"end"}}>
                    <button className="import-nft-button">import NFT</button>
                </div>
            </div>

            <div className="new-post-body">
                <div className="nft-image-bar">
                    <div className="text-nft">
                        Text NFT
                        <textarea className="nft-textarea" name="nftimage" id="nftimage" cols={30} rows={6} maxLength={320} onChange={(event) => setNFTtext(event.target.value)}/>
                        <p style={{textAlign:"end", color:"grey"}}>{NFTtext.length}/320</p>
                    </div>
                    OR
                    <div className="image-nft">
                        <div className="nft-add-buttons">
                            <button className="add-button"><LuPlus/> Add File</button>
                            <button className="add-button"><LuPlus/> instagram import</button>
                        </div>
                        <p className="no-margin">Max upload size 30MB</p>
                    </div>
                </div>

                <div className="version-num">
                    Number of versions
                    <input className="version-field" type="text" placeholder="Enter number of copies you want to create"/>
                </div>
                <div className="price-bar">
                    Price
                    <div className="price-pick-bar">
                        <input style={{width:"50%"}} className="version-field" type="number" placeholder="Price(min listing price is $5)"/>
                        <div className="token-price">
                            <input style={{width:"50%"}} type="text" disabled />
                            <PopupState variant="popover" popupId="post-menu">
                                {(popupState:any) => (
                                    <div>
                                        <IconButton {...bindTrigger(popupState)}>
                                            <MdOutlineArrowDropDownCircle/>
                                        </IconButton>
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
                                                {
                                                    networkModels.map((model, key) => {
                                                        return(
                                                            <div key={key} className="menu-item" onClick={()=> onChangeChain(popupState)}>
                                                                <img style={{width:"30px", height:"30px"}} src={model.image_url} alt="post icon"/>
                                                                {model.symbol}
                                                            </div>
                                                        )
                                                    })
                                                }
                                                
                                                
                                            </div>
                                        </Popover>
                                    </div>
                                    
                                )}
                            </PopupState>
                        </div>
                    </div>
                    <p style={{color:"grey"}}>Service fee <span style={{color:"black"}}>4%</span></p>
                </div>
                <div className="nft-detail">
                    NFT Details
                    <div className="deatil-info">
                        <p style={{color:"grey"}} className="no-margin">complete the following deatils before your post is listed on the marketplace</p>
                        <p className="no-margin">Apply Title, category, description, hashtags to all post</p>
                    </div>
                    <div className="title-area">
                        Title
                        <input className="version-field" type="text" placeholder="Enter title about your art" />
                    </div>

                    <div className="text-nft">
                        Caption (Optional)
                        <textarea className="nft-textarea" name="caption" id="caption" cols={30} rows={6} placeholder="Enter some description about your post"/>
                    </div>
                    <div className="title-area">
                        Location
                        <input className="version-field" type="text" />
                    </div>
                    <div className="title-area">
                        Add At-Tags
                        <input type="text" className="version-field"/>
                    </div>
                </div>
                <div className="newpost">
                    <button>POST</button>
                </div>
            </div>

        </div>
    )
}