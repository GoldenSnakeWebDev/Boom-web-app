import { HeaderBar } from "../../components/hearder"
import { Footer } from "../../components/footer"
import { ShowNftList } from "../../components/showNFTList"
export const HomePage = () => {
    
    return (
        <div className="home-container">
            <HeaderBar/>
            <ShowNftList/>
            <Footer/>
        </div>
    )
}