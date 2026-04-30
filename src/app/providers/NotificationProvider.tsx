import React, { createContext, useContext } from "react";
import type { NotificationContextValue } from "./types";
import { useNotificationProvider } from "./hooks/useNotificationProvider";

interface NotificationProviderProps {
  children: React.ReactNode;
  autoRegister?: boolean;
  autoRequestPermission?: boolean;
  showPermissionAlert?: boolean;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
  autoRegister = true,
  autoRequestPermission = false,
}) => {
  const value = useNotificationProvider(autoRegister, autoRequestPermission);

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = (): NotificationContextValue => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotificationContext must be used within a NotificationProvider");
  }
  return context;
};

export default NotificationProvider;
