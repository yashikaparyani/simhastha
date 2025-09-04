import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Image as ExpoImage } from 'expo-image';

type AdminMenuItem = {
  id: string;
  title: string;
  icon: string;
  route: string;
  description: string;
};

const adminMenuItems: AdminMenuItem[] = [
  { id: '1', title: 'Dashboard', icon: '📊', route: 'admin-main-dashboard', description: 'Overview & Statistics' },
  { id: '2', title: 'User Management', icon: '👥', route: 'admin-user-management', description: 'Manage Users & Members' },
  { id: '3', title: 'Hotel Management', icon: '🏨', route: 'admin-hotel-management', description: 'Hotel Vendors & Bookings' },
  { id: '4', title: 'Transport Management', icon: '🚌', route: 'admin-transport-management', description: 'Transport Vendors & Routes' },
  { id: '5', title: 'Payment Management', icon: '💳', route: 'admin-payment-management', description: 'Payments & Transactions' },
  { id: '6', title: 'Emergency Services', icon: '🆘', route: 'admin-emergency-services', description: 'Emergency Response' },
  { id: '7', title: 'Volunteer Management', icon: '🤝', route: 'admin-volunteer-management', description: 'Volunteer Coordination' },
  { id: '8', title: 'Notifications', icon: '🔔', route: 'admin-notifications', description: 'Send Notifications' },
  { id: '9', title: 'Heat Map', icon: '🗺️', route: 'admin-heatmap', description: 'Heatmap & Route Planning' },
  { id: '10', title: 'Reports', icon: '📈', route: 'admin-reports', description: 'Analytics & Reports' },
  { id: '11', title: 'Settings', icon: '⚙️', route: 'admin-settings', description: 'System Settings' },
];

export default function AdminDashboard() {
  const navigation = useNavigation();

  const renderMenuItem = ({ item }: { item: AdminMenuItem }) => (
    <TouchableOpacity 
      style={styles.menuItem} 
      onPress={() => navigation.navigate(item.route as never)}
    >
      <Text style={styles.menuIcon}>{item.icon}</Text>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{item.title}</Text>
        <Text style={styles.menuDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ExpoImage
        source={require('@/assets/images/kumbh.jpeg')}
        style={styles.logo}
        contentFit="cover"
      />
      
      <Text style={styles.header}>Admin Dashboard</Text>
      
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>Welcome, Administrator</Text>
        <Text style={styles.welcomeSubtitle}>Manage Simhastha 2028 Operations</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>1,247</Text>
          <Text style={styles.statLabel}>Total Users</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>89</Text>
          <Text style={styles.statLabel}>Active Bookings</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Management Tools</Text>
      
      <FlatList
        data={adminMenuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={() => navigation.navigate('login')}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff8e7',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#e65100',
    marginTop: 10,
  },
  header: {
    marginTop: 12,
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#ffe0b2',
    color: '#e65100',
    fontWeight: 'bold',
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 20,
    marginBottom: 16,
  },
  welcomeCard: {
    width: '100%',
    backgroundColor: '#fff3e0',
    borderWidth: 1,
    borderColor: '#ff9800',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  welcomeTitle: {
    color: '#e65100',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    color: '#000',
    opacity: 0.7,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ffcc80',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statNumber: {
    color: '#e65100',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#000',
    fontSize: 12,
    opacity: 0.7,
  },
  sectionTitle: {
    width: '100%',
    color: '#e65100',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
  },
  menuItem: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ff9800',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    color: '#e65100',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  menuDescription: {
    color: '#000',
    fontSize: 12,
    opacity: 0.7,
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
