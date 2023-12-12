import './index.css';

export const HeaderBar = () => {
    return (
        <div className="headerbar-container">
            <img style={{width:"45px", height:"40px"}} src="./assets/icons/launcher_icon.png" alt="logo icon" />
            <div className='header-iconbar'>
                <img style={{width:"35px", height:"35px"}} src="./assets/icons/dm_icon.png" alt="dm icon" className='icon'/>
                <a href="https://t.me/whatsboom"><img style={{width:"30px", height:"30px"}} src="./assets/icons/support_icon.png" alt="support icon" className='icon'/></a>
                <img style={{width:"35px", height:"35px"}} src="./assets/icons/backpack_icon.png" alt="backpack icon" className='icon'/> 
                <img style={{width:"35px", height:"35px"}} src="./assets/icons/syncBank_icon.png" alt="syncBank icon" className='icon'/> 
            </div>
        </div>
    )
}