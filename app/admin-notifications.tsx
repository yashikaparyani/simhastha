import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'emergency' | 'success';
  sentAt: string;
  recipients: number;
};

const mockNotifications: Notification[] = [
  { id: '1', title: 'Weather Alert', message: 'Heavy rain expected in Ujjain area. Please stay indoors.', type: 'warning', sentAt: '2024-01-25 14:30', recipients: 2847 },
  { id: '2', title: 'Temple Timings Update', message: 'Mahakaleshwar temple will open at 4 AM tomorrow.', type: 'info', sentAt: '2024-01-25 10:15', recipients: 2847 },
  { id: '3', title: 'Emergency Evacuation', message: 'Please evacuate Zone A immediately due to safety concerns.', type: 'emergency', sentAt: '2024-01-24 16:45', recipients: 500 },
  { id: '4', title: 'Booking Confirmed', message: 'Your hotel booking has been confirmed. Check your email for details.', type: 'success', sentAt: '2024-01-24 12:20', recipients: 156 },
];

export default function AdminNotifications() {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'info' as 'info' | 'warning' | 'emergency' | 'success',
  });

  const sendNotification = () => {
    if (!newNotification.title || !newNotification.message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const notification: Notification = {
      id: Date.now().toString(),
      title: newNotification.title,
      message: newNotification.message,
      type: newNotification.type,
      sentAt: new Date().toLocaleString(),
      recipients: 2847, // Total users
    };

    setNotifications([notification, ...notifications]);
    setNewNotification({ title: '', message: '', type: 'info' });
    Alert.alert('Success', 'Notification sent successfully!');
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'emergency': return '#d32f2f';
      case 'warning': return '#f57c00';
      case 'success': return '#2e7d32';
      case 'info': return '#1976d2';
      default: return '#666';
    }
  };

  const getTypeEmoji = (type: string) => {
    switch (type) {
      case 'emergency': return '🚨';
      case 'warning': return '⚠️';
      case 'success': return '✅';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Notification Management</Text>
      
      <View style={styles.createCard}>
        <Text style={styles.createTitle}>Send New Notification</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Notification Title"
          placeholderTextColor="#666"
          value={newNotification.title}
          onChangeText={(text) => setNewNotification({ ...newNotification, title: text })}
        />
        
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Notification Message"
          placeholderTextColor="#666"
          value={newNotification.message}
          onChangeText={(text) => setNewNotification({ ...newNotification, message: text })}
          multiline
          numberOfLines={4}
        />
        
        <View style={styles.typeSelector}>
          <Text style={styles.typeLabel}>Type:</Text>
          <View style={styles.typeButtons}>
            {['info', 'warning', 'emergency', 'success'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeButton,
                  { backgroundColor: getTypeColor(type) },
                  newNotification.type === type && styles.typeButtonActive
                ]}
                onPress={() => setNewNotification({ ...newNotification, type: type as any })}
              >
                <Text style={styles.typeButtonText}>
                  {getTypeEmoji(type)} {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <TouchableOpacity style={styles.sendButton} onPress={sendNotification}>
          <Text style={styles.sendButtonText}>📢 Send Notification</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.historyCard}>
        <Text style={styles.historyTitle}>Notification History</Text>
        
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.notificationItem}>
            <View style={styles.notificationHeader}>
              <View style={styles.notificationType}>
                <Text style={styles.notificationEmoji}>{getTypeEmoji(notification.type)}</Text>
                <Text style={[styles.notificationTypeText, { color: getTypeColor(notification.type) }]}>
                  {notification.type.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.notificationTime}>{notification.sentAt}</Text>
            </View>
            
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <Text style={styles.notificationMessage}>{notification.message}</Text>
            
            <View style={styles.notificationFooter}>
              <Text style={styles.recipientsText}>
                📤 Sent to {notification.recipients.toLocaleString()} users
              </Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back to Admin Menu</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff8e7',
  },
  header: {
    fontSize: 24,
    color: '#e65100',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  createCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ffcc80',
  },
  createTitle: {
    fontSize: 18,
    color: '#e65100',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  typeSelector: {
    marginBottom: 16,
  },
  typeLabel: {
    fontSize: 16,
    color: '#e65100',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  typeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    opacity: 0.7,
  },
  typeButtonActive: {
    opacity: 1,
    borderWidth: 2,
    borderColor: '#fff',
  },
  typeButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sendButton: {
    backgroundColor: '#e65100',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ffcc80',
  },
  historyTitle: {
    fontSize: 18,
    color: '#e65100',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  notificationItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#e65100',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  notificationType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationEmoji: {
    fontSize: 16,
    marginRight: 4,
  },
  notificationTypeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  notificationTime: {
    fontSize: 12,
    color: '#666',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  recipientsText: {
    fontSize: 12,
    color: '#999',
  },
  backButton: {
    backgroundColor: '#666',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
