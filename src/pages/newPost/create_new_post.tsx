import { CiLocationArrow1 } from "react-icons/ci";
import { MdArrowBackIosNew } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Popover from '@mui/material/Popover';
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import IconButton from '@mui/material/IconButton';
import { getNetworks } from "../../service/network.service";
import { ImportNFT } from "../../components/modal/importNFT";
import { MintingVia } from "../../components/modal/mintingVia";
import { chainID } from "../../utils/constant";
import { bnbMarketAddress, bnbTokenAddress, maticMarketAddress, maticTokenAddress } from "../../utils/constant";
import "./index.css";
import { symbolName } from "typescript";

interface NetworkModel {
    id: "";
    image_url: "";
    is_active: true;
    name: "";
    symbol: "";
}
export const CreateNewPost = () => {
    const navigate = useNavigate();
    const [NFTtext, setNFTtext] = useState('');
    const [networkModels, setNetworkModels] = useState<NetworkModel[]>([]);

    const [selectedNetworModel, setSelectedNetworkModel] = useState({
        id: "655b5dc06b1fba5fc3f64e03",
        image_url: "https://bin.bnbstatic.com/static/images/common/favicon.ico",
        is_active: true,
        name: "Binance Smart Chain",
        symbol: "BNB"
    });
    const [selectedChainID, setSelectedChainID] = useState("");
    const [smartContractAddress, setSmartContractAddress] = useState("");
    const [marketPlaceAddress, setMarketPlaceAddress] = useState("");
    const [cryptoAmount, setCryptoAmount] = useState("");
    // let currentUSDPrice = "";
    const [isPost, setIsPost] = useState(false);
    // const [nftPrice, setNFTPrice] = useState('');
    // let nftPrice = "";
    const [selectedSymbol, setSelectedSymbol] = useState('BNB');
    const [isImportNFT, setIsImportNFT] = useState(false);

    const getCryptoPrice = async (symbol:String) => {
        const res:Response = await fetch(`${process.env.REACT_APP_BASIC_URL}networks-pricing?symbol=${symbol}&amount=1`, {
            method:"get"
        }) 

        if (res.status === 200) {
            if (res.body) {
                const reader = res.body.getReader();
                let result = '';
    
                // Assuming the response is text, adjust as needed for other types
                while (true) {
                const { done, value } = await reader.read();
    
                if (done) {
                    break;
                }
    
                result += new TextDecoder().decode(value);
                }
    
                // Now, parse the string using JSON.parse
                
                // setCurrentUSDPrice(JSON.parse(result).currentUSDPrice);
                const currentUSDPrice = JSON.parse(result).currentUSDPrice;
                localStorage.setItem("USDPrice", currentUSDPrice);
                console.log("all notifications >>>>", currentUSDPrice);
                
            } else {
                console.error('Response body is null.');
            }
        }
    }

    const getCryptoAmount = () => {
        const nftPrice = localStorage.getItem("nftPrice");
        const currentUSDPrice = localStorage.getItem("USDPrice");

        const amount  = Number(nftPrice)/Number(currentUSDPrice);

        setCryptoAmount(amount.toLocaleString(undefined, {minimumFractionDigits:2}) + " " + localStorage.getItem("symbol"));

        console.log("nft price>>>>", nftPrice);
        console.log("USD price>>>>", currentUSDPrice);
        console.log("amount>>>", amount);
    }

    const onChangePrice = (e:any) => {
        // setNFTPrice(e.target.value);
        const nftPrice:Number = e.target.value;
        localStorage.setItem("nftPrice", nftPrice.toString());
        getCryptoAmount();
    }

    const onBack = () => {
        navigate(-1);
    }

    const onChangeChain = async (popupState:any, model:NetworkModel) => {
        popupState.close();
        setSelectedNetworkModel(model);
        if (model.symbol !== "") {

            switch (model.symbol) {
                case "TZ":
                    setSelectedChainID(chainID.TZ);
                    setSelectedSymbol("TZ");
                    localStorage.setItem('symbol', "TZ");
                    // setSmartContractAddress()
                    break;
                case "MATIC":
                    setSelectedChainID(chainID.MATIC);
                    setSmartContractAddress(maticTokenAddress);
                    setMarketPlaceAddress(maticMarketAddress);
                    setSelectedSymbol("MATIC");
                    localStorage.setItem('symbol', "MATIC");
                    break;
                case "BNB":
                    setSelectedChainID(chainID.BNB);
                    setSmartContractAddress(bnbTokenAddress);
                    setMarketPlaceAddress(bnbMarketAddress);
                    setSelectedSymbol("BNB");
                    localStorage.setItem('symbol', "BNB");
                    break;

                default:
                    setSelectedChainID(chainID.MATIC);
    
            }
        }

        await getCryptoPrice(model.symbol);
        getCryptoAmount();
    }

    useEffect(() => {

        localStorage.removeItem("nftPrice");
        localStorage.removeItem("USDPrice");
        localStorage.removeItem("symbol");
        localStorage.setItem("symbol", "BNB");
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

        getCryptoPrice("BNB");
        setCryptoAmount("0.00 BNB");

    }, [navigate]);

    return (
        <div className="new-post-container">
            <div className="newpost-header-bar">
                <div style={{width:"30%", display:"flex", justifyContent:"start"}}>
                    <MdArrowBackIosNew style={{cursor:"pointer"}} onClick={onBack}/>
                </div>
                New Post
                <div style={{width:"30%", display:"flex", justifyContent:"end"}}>
                    <button className="import-nft-button" onClick={() => setIsImportNFT(true)}>import NFT</button>
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
                        <input style={{width:"50%"}} className="version-field" type="number" placeholder="Price(min listing price is $5)" onChange={onChangePrice}/>
                        <div className="token-price">
                            <div className="crypto-amount-bar">
                                <img src={selectedNetworModel.image_url} alt="crypto img" className="crypto-icon"/>
                                <input style={{width:"50%"}} value={cryptoAmount} type="text" disabled className="crypto-amount-field version-field"/>
                            </div>
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
                                                            <div key={key} className="menu-item" onClick={()=> onChangeChain(popupState, model)}>
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
                <div style={{display:"flex", justifyContent:"center"}}>
                    <div className="new-post">
                        <CiLocationArrow1 style={{width:"50px", height:"50px"}} onClick={() => setIsPost(true)}/>
                    </div>
                </div>
            </div>

            {
                isImportNFT && <ImportNFT setIsImportNFT={setIsImportNFT}/>
            }

            {
                isPost && <MintingVia setIsPost={setIsPost}/>
            }

        </div>
    )
}