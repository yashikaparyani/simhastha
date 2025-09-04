import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Image as ExpoImage } from 'expo-image';

type SuperAdminMenuItem = {
  id: string;
  title: string;
  icon: string;
  route: string;
  description: string;
  isSuperAdmin?: boolean;
};

const superAdminMenuItems: SuperAdminMenuItem[] = [
  { id: '1', title: 'Dashboard', icon: '📊', route: 'admin-main-dashboard', description: 'Overview & Statistics' },
  { id: '2', title: 'User Management', icon: '👥', route: 'admin-user-management', description: 'Manage Users & Members' },
  { id: '3', title: 'Hotel Management', icon: '🏨', route: 'admin-hotel-management', description: 'Hotel Vendors & Bookings' },
  { id: '4', title: 'Transport Management', icon: '🚌', route: 'admin-transport-management', description: 'Transport Vendors & Routes' },
  { id: '5', title: 'Payment Management', icon: '💳', route: 'admin-payment-management', description: 'Payments & Transactions' },
  { id: '6', title: 'Emergency Services', icon: '🆘', route: 'admin-emergency-services', description: 'Emergency Response' },
  { id: '7', title: 'Volunteer Management', icon: '🤝', route: 'admin-volunteer-management', description: 'Volunteer Coordination' },
  { id: '8', title: 'RFID Management', icon: '🔐', route: 'admin-rfid-management', description: 'RFID System Control', isSuperAdmin: true },
  { id: '9', title: 'Advertisement Management', icon: '📢', route: 'admin-advertisement-management', description: 'Manage Advertisements', isSuperAdmin: true },
  { id: '10', title: 'Parking Management', icon: '🅿️', route: 'admin-parking-management', description: 'Parking System Control', isSuperAdmin: true },
  { id: '11', title: 'Notifications', icon: '🔔', route: 'admin-notifications', description: 'Send Notifications' },
  { id: '12', title: 'Reports', icon: '📈', route: 'admin-reports', description: 'Analytics & Reports' },
  { id: '13', title: 'Heat Map', icon: '🗺️', route: 'admin-heatmap', description: 'Crowd Density Analysis', isSuperAdmin: true },
  { id: '14', title: 'System Settings', icon: '⚙️', route: 'admin-settings', description: 'System Configuration' },
  { id: '15', title: 'Admin Management', icon: '👑', route: 'admin-management', description: 'Manage Other Admins', isSuperAdmin: true },
];

export default function SuperAdminDashboard() {
  const navigation = useNavigation();

  const renderMenuItem = ({ item }: { item: SuperAdminMenuItem }) => (
    <TouchableOpacity 
      style={[styles.menuItem, item.isSuperAdmin && styles.superAdminItem]} 
      onPress={() => navigation.navigate(item.route as never)}
    >
      <Text style={styles.menuIcon}>{item.icon}</Text>
      <View style={styles.menuContent}>
        <View style={styles.titleRow}>
          <Text style={styles.menuTitle}>{item.title}</Text>
          {item.isSuperAdmin && <Text style={styles.superAdminBadge}>SUPER</Text>}
        </View>
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
      
      <Text style={styles.header}>Super Admin Dashboard</Text>
      
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>Welcome, Super Administrator</Text>
        <Text style={styles.welcomeSubtitle}>Full Control - Simhastha 2028 Operations</Text>
        <View style={styles.superAdminBanner}>
          <Text style={styles.superAdminBannerText}>🔐 SUPER ADMIN ACCESS</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>2,847</Text>
          <Text style={styles.statLabel}>Total Users</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>156</Text>
          <Text style={styles.statLabel}>Active Bookings</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>23</Text>
          <Text style={styles.statLabel}>Admins</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Management Tools</Text>
      
      <FlatList
        data={superAdminMenuItems}
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
    marginBottom: 8,
  },
  superAdminBanner: {
    backgroundColor: '#d32f2f',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  superAdminBannerText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
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
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  statNumber: {
    color: '#e65100',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#000',
    fontSize: 10,
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
  superAdminItem: {
    borderColor: '#d32f2f',
    backgroundColor: '#fff5f5',
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  menuTitle: {
    color: '#e65100',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  superAdminBadge: {
    backgroundColor: '#d32f2f',
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
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
