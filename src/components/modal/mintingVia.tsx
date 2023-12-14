import { IoCloseSharp } from "react-icons/io5";

export const MintingVia = (props:any) => {

    const handleOffChain = () => {
        props.setIsPost(false);
    }

    const handleOnChain = () => {
        props.setIsPost(false);
    }
    return (
        <div className="dialog minting-dialog">
            <div className='close-icon'>
                
                <IoCloseSharp style={{cursor:"pointer"}} onClick={() => props.setIsPost(false)}/>
            </div>
            Mint Your FNT Via:

            <div className="minting-button" onClick={handleOffChain}>
                Off-Chain Minting
            </div>

            <div className="minting-button" onClick={handleOnChain}>
                On-Chain Minting
            </div>

        </div>
    )
}