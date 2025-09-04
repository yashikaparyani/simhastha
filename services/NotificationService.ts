import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Check if running in Expo Go
const isExpoGo = Constants.appOwnership === 'expo';

// Configure notification behavior only for native platforms and not Expo Go
if (Platform.OS !== 'web' && !isExpoGo) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

export interface NotificationData {
  title: string;
  body: string;
  type: 'payment' | 'booking' | 'emergency' | 'wallet' | 'system';
  sound?: 'default' | 'success' | 'error' | 'emergency';
}

class NotificationService {
  private static instance: NotificationService;

  private constructor() {
    this.configurePushNotifications();
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private async configurePushNotifications() {
    // Only configure for native platforms, not web or Expo Go
    if (Platform.OS === 'web' || isExpoGo) {
      return;
    }

    if (Platform.OS === 'android') {
      try {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });

        // Create specific channels for different notification types
        await Notifications.setNotificationChannelAsync('payment', {
          name: 'Payment Notifications',
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#4CAF50',
          sound: 'success.wav',
        });

        await Notifications.setNotificationChannelAsync('booking', {
          name: 'Booking Notifications',
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#2196F3',
          sound: 'success.wav',
        });

        await Notifications.setNotificationChannelAsync('emergency', {
          name: 'Emergency Notifications',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 500, 250, 500, 250, 500],
          lightColor: '#FF4444',
          sound: 'emergency.wav',
        });

        await Notifications.setNotificationChannelAsync('wallet', {
          name: 'Wallet Notifications',
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF9800',
          sound: 'success.wav',
        });
      } catch (error) {
        console.log('Error configuring notification channels:', error);
      }
    }
  }

  public async requestPermissions(): Promise<boolean> {
    // Web platform and Expo Go don't support notifications
    if (Platform.OS === 'web' || isExpoGo) {
      console.log('Notifications not supported on web platform or Expo Go');
      return false;
    }

    if (Device.isDevice) {
      try {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        
        if (finalStatus !== 'granted') {
          console.log('Failed to get push token for push notification!');
          return false;
        }
        
        return true;
      } catch (error) {
        console.log('Error requesting notification permissions:', error);
        return false;
      }
    } else {
      console.log('Must use physical device for Push Notifications');
      return false;
    }
  }

  public async scheduleNotification(data: NotificationData, delay: number = 0): Promise<string> {
    // Web platform and Expo Go fallback - just log the notification
    if (Platform.OS === 'web' || isExpoGo) {
      console.log(`[${Platform.OS === 'web' ? 'WEB' : 'EXPO GO'} NOTIFICATION] ${data.title}: ${data.body}`);
      return `${Platform.OS === 'web' ? 'web' : 'expo-go'}-notification`;
    }

    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        console.log('No notification permission');
        return '';
      }

      const channelId = this.getChannelId(data.type);
      
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: data.title,
          body: data.body,
          sound: data.sound || 'default',
          priority: data.type === 'emergency' ? Notifications.AndroidNotificationPriority.MAX : Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: delay > 0 ? { seconds: delay } : null,
        android: {
          channelId: channelId,
          priority: data.type === 'emergency' ? 'max' : 'high',
          sound: data.sound || 'default',
        },
        ios: {
          sound: data.sound || 'default',
          priority: data.type === 'emergency' ? 10 : 5,
        },
      });

      return notificationId;
    } catch (error) {
      console.log('Error scheduling notification:', error);
      return '';
    }
  }

  public async sendImmediateNotification(data: NotificationData): Promise<string> {
    return this.scheduleNotification(data, 0);
  }

  private getChannelId(type: string): string {
    switch (type) {
      case 'payment':
        return 'payment';
      case 'booking':
        return 'booking';
      case 'emergency':
        return 'emergency';
      case 'wallet':
        return 'wallet';
      default:
        return 'default';
    }
  }

  // Predefined notification templates
  public async sendPaymentSuccessNotification(amount: string, service: string): Promise<string> {
    return this.sendImmediateNotification({
      title: '💰 Payment Successful',
      body: `Your payment of ${amount} for ${service} has been processed successfully.`,
      type: 'payment',
      sound: 'success',
    });
  }

  public async sendPaymentFailedNotification(service: string): Promise<string> {
    return this.sendImmediateNotification({
      title: '❌ Payment Failed',
      body: `Payment for ${service} failed. Please try again.`,
      type: 'payment',
      sound: 'error',
    });
  }

  public async sendHotelBookingNotification(hotelName: string, dates: string): Promise<string> {
    return this.sendImmediateNotification({
      title: '🏨 Hotel Booked',
      body: `Your hotel booking at ${hotelName} for ${dates} is confirmed.`,
      type: 'booking',
      sound: 'success',
    });
  }

  public async sendParkingBookingNotification(slotId: string, date: string): Promise<string> {
    return this.sendImmediateNotification({
      title: '🚗 Parking Confirmed',
      body: `Parking slot ${slotId} has been booked for ${date}.`,
      type: 'booking',
      sound: 'success',
    });
  }

  public async sendTransportBookingNotification(from: string, to: string): Promise<string> {
    return this.sendImmediateNotification({
      title: '🚌 Transport Booked',
      body: `Transport booking confirmed from ${from} to ${to}.`,
      type: 'booking',
      sound: 'success',
    });
  }

  public async sendWalletAddNotification(amount: string): Promise<string> {
    return this.sendImmediateNotification({
      title: '💰 Wallet Updated',
      body: `${amount} has been added to your wallet successfully.`,
      type: 'wallet',
      sound: 'success',
    });
  }

  public async sendWalletWithdrawNotification(amount: string): Promise<string> {
    return this.sendImmediateNotification({
      title: '💸 Withdrawal Successful',
      body: `${amount} has been withdrawn from your wallet successfully.`,
      type: 'wallet',
      sound: 'success',
    });
  }

  public async sendSOSNotification(): Promise<string> {
    return this.sendImmediateNotification({
      title: '🚨 SOS Emergency',
      body: 'Emergency services have been notified. Your location has been shared.',
      type: 'emergency',
      sound: 'emergency',
    });
  }

  public async sendEmergencyContactNotification(contactName: string): Promise<string> {
    return this.sendImmediateNotification({
      title: '📞 Emergency Contact Notified',
      body: `${contactName} has been notified about your emergency.`,
      type: 'emergency',
      sound: 'emergency',
    });
  }

  public async cancelAllNotifications(): Promise<void> {
    if (Platform.OS === 'web' || isExpoGo) {
      console.log(`[${Platform.OS === 'web' ? 'WEB' : 'EXPO GO'}] Cancel all notifications - not supported`);
      return;
    }
    
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.log('Error canceling all notifications:', error);
    }
  }

  public async cancelNotification(notificationId: string): Promise<void> {
    if (Platform.OS === 'web' || isExpoGo) {
      console.log(`[${Platform.OS === 'web' ? 'WEB' : 'EXPO GO'}] Cancel notification ${notificationId} - not supported`);
      return;
    }
    
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (error) {
      console.log('Error canceling notification:', error);
    }
  }
}

export default NotificationService;

