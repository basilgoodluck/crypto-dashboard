import React, { useState, createContext, useContext } from "react";

type Notification = {
    message: string,
    type: "success" | "error"
}

type NotificationContextType = {
    notification: Notification | null
    setNotification: (notification: Notification) => void,
    clearNotification: () => void,
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const NotificationProvider: React.FC<{ children: React.ReactNode }>  = ({ children }) => {
    const [notification, setNotificationState] = useState<Notification | null>(null);

    const setNotification = (newNotification: Notification) => {
        setNotificationState(newNotification)

        setTimeout(() => setNotificationState(null), 5000)
    }

    const clearNotification = () => setNotificationState(null)

    return (
        <NotificationContext.Provider value={{ notification, setNotification, clearNotification }}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
      throw new Error("useNotification must be used within a NotificationProvider");
    }
    return context;
  
};