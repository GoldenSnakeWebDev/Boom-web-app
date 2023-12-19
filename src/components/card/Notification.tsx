import { useEffect, useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { MdArrowForwardIos } from "react-icons/md";

export const NotificationCard = (props:any) => {
    const [notificationDate, setDate] = useState('');
    const [notificationTime, setTime] = useState('');
    useEffect(() => {
        const date = new Date(props.notification.timestamp);

        setDate(date.toLocaleDateString('en-US'));
        setTime(date.toLocaleTimeString('en-US'));

    },[props.notification.timestamp])
    
    return (
        <div className="card-container">
            <div className="notification-content">
                <div className="icon-and-message-bar">
                    <IoMdNotifications className="notification-icon"/>
                    <p className="no-margin">{props.notification.message}</p>
                </div>
                <div className="notification-timestamp">
                    {notificationDate}, {notificationTime}
                </div>
            </div>

            <div className="view-more">
                View
                <MdArrowForwardIos className="notification-icon"/>
            </div>

        </div>
    )
}