import React, { createContext, useContext, ReactNode } from 'react';
import NotificationService from '@/services/NotificationService';

interface NotificationContextType {
  notificationService: NotificationService;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const notificationService = NotificationService.getInstance();

  return (
    <NotificationContext.Provider value={{ notificationService }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

