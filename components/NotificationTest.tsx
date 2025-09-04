import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNotification } from '@/contexts/NotificationContext';

export default function NotificationTest() {
  const { notificationService } = useNotification();

  const testNotifications = () => {
    // Test all notification types
    notificationService.sendPaymentSuccessNotification('₹1,000', 'Test Payment');
    notificationService.sendHotelBookingNotification('Test Hotel', '06-08 April');
    notificationService.sendParkingBookingNotification('B01', '06 April');
    notificationService.sendWalletAddNotification('₹500');
    notificationService.sendSOSNotification();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Test</Text>
      <TouchableOpacity style={styles.button} onPress={testNotifications}>
        <Text style={styles.buttonText}>Test All Notifications</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff8e7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e65100',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e65100',
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


