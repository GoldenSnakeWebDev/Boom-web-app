import { IoIosCloseCircleOutline } from "react-icons/io";
// import '../../pages/authentication/login.css';
export const Welcome = (props:any) => {
    return (
        <div className='dialog'>
            <div className='close-icon' style={{color:"red"}}>
                <IoIosCloseCircleOutline style={{cursor:"pointer"}} onClick={() => props.setShowWelcomeDialog(false)}/>
            </div>

            <div className='title'>
                Welcome to Boom! 💥
            </div>

            <div className='boom-subtitle'>
                Boom is where merchants & Social users win together!
            </div>

            <button className='styled-button btn-welcome-important'>
                Important, please read:
            </button>

            <div className='boom-description'>
                <ul>
                    <li>
                        This version is a "simulation"(demo) of what's to come!
                    </li>
                    <li>
                        With this simulation, users can own social content
                    </li>
                    <li>
                        Users have the bonus of trading content using simulated (pseudo) coins across Tezos, Polygon & BNB
                    </li>
                    <li>
                        This simulation gives usrs a fun way to experience the application completely free and shows a preview of the exciting things that wil be achieved with Boom!
                    </li>
                </ul>
            </div>

            <button className='styled-button btn-welcome-gotit' onClick={() => props.setShowWelcomeDialog(false)}>
                GOT IT
            </button>

        </div>
    )
}