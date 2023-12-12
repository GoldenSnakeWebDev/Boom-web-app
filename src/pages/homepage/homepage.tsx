import { HeaderBar } from "../../components/hearder"
import { Footer } from "../../components/footer"
import { ShowNftList } from "../../components/showNFTList"
import { Notification } from "../../components/notification";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const HomePage = () => {
    const navigate = useNavigate();
    const [isHome, setIsHome] = useState(true);
    const [isSearch, setIsSearch] = useState(false);
    const [isNotification, setIsNotification] = useState(false);
    const [isUser, setIsUser] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (token === null) {
            navigate('/');
        }

        console.log('token>>>>', token);
        
    }, []);

    return (
        <div className="home-container">
            <HeaderBar/>
            {
                isHome === true ? <ShowNftList isSearch={isSearch}/> : isSearch === true && <ShowNftList isSearch={isSearch}/>

            }
            {
                isNotification && <Notification/>
            }
            <Footer setIsHome={setIsHome} setIsSearch={setIsSearch} setIsNotification={setIsNotification} setIsUser={setIsUser}/>
        </div>
    )
}