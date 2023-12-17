
import { useEffect, useState } from "react"
import { fetchBooms } from "../service/boomService"
import { FaSearch } from "react-icons/fa";
import { BoomCard } from "./card/Boom";
export const ShowNftList = (props:any) => {

    const [booms, setBooms] = useState([]);
    const [totalPages, setTotalPages] = useState<Number>();
    const getBooms = async () => {
        const res = await fetchBooms(0);

        if (res) {

            if (res.status === 200) {
                
                // Check if the response body is not null
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
                    const allbooms = JSON.parse(result);

                    console.log("all booms>>>>", allbooms);

                    localStorage.setItem('saved', JSON.parse(result));

                    setBooms(allbooms.booms);

                    setTotalPages(allbooms.page.limit);
    
                } else {
                    console.error('Response body is null.');
                }
            }
        }
    }
    useEffect(() => {
        getBooms();
    }, [])
    return (
        <div className="booms-container">
            {
                props.isSearch && 
                <div className="search-bar">
                    <FaSearch className="frontIcon-on-input"/>
                    <input type="text" placeholder="Search" className="search-field"/>
                </div>
            }
            {
                booms.length > 0 ?
                booms.map((boom, key) => {
                    return (
                        <BoomCard key={key} boom={boom}/>
                    )
                }) : 
                <div> you have no booms</div>
            }
        </div>
    )
}