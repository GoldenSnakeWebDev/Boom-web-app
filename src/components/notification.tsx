import { useEffect, useState } from "react"
import { fetchAllNotifications } from "../service/notification.service"
import { NotificationCard } from "./card/Notification";
export const Notification = () => {

    const [notifications, setNotifications] = useState([]);

    const getNotifications = async () => {
        const res = await fetchAllNotifications();
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
                    setNotifications(JSON.parse(result).notifications);
                    console.log("all notifications >>>>", JSON.parse(result));
    
                } else {
                    console.error('Response body is null.');
                }
            }
        }
    }
    
    useEffect(() => {
        getNotifications();
    }, [])
    return (
        <div className="notification-container">
            <div className="notification-title-area">
                Notifications
            </div>

            <div className="notification-area">
                {
                    notifications.length > 0 ?
                    notifications.map(notification => {
                        return (
                            <NotificationCard notification={notification}/>
                        )
                    }) :
                    <div>
                        No notifications at the moment
                    </div>
                }
            </div>
        </div>
    )
}