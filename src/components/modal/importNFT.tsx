import { IoCloseSharp } from "react-icons/io5";
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Popover from '@mui/material/Popover';
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import { getNetworks } from "../../service/network.service";
import "../../pages/authentication/login.css";
import "./index.css";

export const ImportNFT = (props:any) => {

    const [networkModels, setNetworkModels] = useState([{
        id: "",
        image_url: "",
        is_active: true,
        name: "",
        symbol: ""
    }]);

    const onChangeChain = (popupState:any) => {
        popupState.close();
    }

    const handleImportNFT = () => {
        props.setIsImportNFT(false);
    }
    useEffect(() => {

        const localstoageItem = localStorage.getItem('networkModel');
        console.log("networkmodels>>>>", localstoageItem);
        if (localstoageItem !== null) {
            setNetworkModels(JSON.parse(localstoageItem));
        } else {
            getNetworks();
        }

    }, []);
    return (
        <div className='dialog import-nft-dialog'>
            <div className='close-icon'>
                
                <IoCloseSharp style={{cursor:"pointer"}} onClick={() => props.setIsImportNFT(false)}/>
            </div>
            <div className="import-nft-title">
                Import NFT from your wallet
            </div>
            <div className="price-pick-bar">
                <input style={{width:"50%"}} className="version-field" type="text" placeholder="NFT contract address"/>
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
                
            <input className="version-field" type="text" placeholder="NFT ID" />
            <input className="version-field" type="text" placeholder="Image URI" />
            <button className="styled-button" onClick={handleImportNFT}>PROCEED</button>
        </div>
    )
}