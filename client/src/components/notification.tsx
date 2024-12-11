import React from 'react';
import { useNotification } from '../hooks/notificationContext';
import { LiaTimesSolid } from "react-icons/lia";

const Notification: React.FC = () => {
    const { notification, clearNotification } = useNotification();

    if (!notification) {
        return null; 
    }

    return (
        <div
            className={`slide-left z-50 fixed top-0 right-0 h-[80px] w-1/2 px-4 py-3 border-b-4 bg-text-dark shadow-sm shadow-gray-300 ${
                notification.type === "success" ? "border-b-primary" : "border-b-secondary"
            }`}
        >
            <div className="flex items-center justify-between">
                <p className="text-sm">{notification.message}</p>
                <LiaTimesSolid
                    className="cursor-pointer text-lg"
                    onClick={clearNotification}
                />
            </div>
        </div>
    );
};

export default Notification;
