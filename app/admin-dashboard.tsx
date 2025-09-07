import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { Colors } from '@/constants/Colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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
      activeOpacity={0.7}
    >
      <View style={styles.menuIconContainer}>
        <Text style={styles.menuIcon}>{item.icon}</Text>
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{item.title}</Text>
        <Text style={styles.menuDescription}>{item.description}</Text>
      </View>
      <View style={styles.menuArrow}>
        <Text style={styles.arrowText}>›</Text>
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

      <View style={styles.statsContainer}>
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
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Hotels</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>Transport</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Management Tools</Text>
      
      <View style={styles.menuGrid}>
        {adminMenuItems.map((item) => (
          <TouchableOpacity 
            key={item.id}
            style={styles.menuGridItem} 
            onPress={() => navigation.navigate(item.route as never)}
            activeOpacity={0.7}
          >
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
            </View>
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Text style={styles.menuDescription}>{item.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

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
    paddingHorizontal: screenWidth < 400 ? 12 : 20,
    paddingVertical: screenHeight < 700 ? 10 : 20,
    backgroundColor: Colors.light.background,
  },
  logo: {
    width: screenWidth < 400 ? 80 : 100,
    height: screenWidth < 400 ? 80 : 100,
    borderRadius: screenWidth < 400 ? 40 : 50,
    borderWidth: 2,
    borderColor: Colors.light.accentOrange,
    marginTop: screenHeight < 700 ? 5 : 10,
  },
  header: {
    marginTop: screenHeight < 700 ? 8 : 12,
    width: '100%',
    textAlign: 'center',
    backgroundColor: Colors.light.card,
    color: Colors.light.accentBlue,
    fontWeight: 'bold',
    paddingVertical: screenHeight < 700 ? 10 : 12,
    borderRadius: 10,
    fontSize: screenWidth < 400 ? 18 : 20,
    marginBottom: screenHeight < 700 ? 12 : 16,
  },
  welcomeCard: {
    width: '100%',
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 12,
    padding: screenWidth < 400 ? 12 : 16,
    marginBottom: screenHeight < 700 ? 12 : 16,
    alignItems: 'center',
  },
  welcomeTitle: {
    color: Colors.light.accentBlue,
    fontSize: screenWidth < 400 ? 16 : 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    color: Colors.light.text,
    opacity: 0.7,
    fontSize: screenWidth < 400 ? 12 : 14,
    textAlign: 'center',
  },
  statsContainer: {
    width: '100%',
    marginBottom: screenHeight < 700 ? 12 : 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: screenHeight < 700 ? 8 : 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 12,
    padding: screenWidth < 400 ? 12 : 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    color: Colors.light.accentBlue,
    fontSize: screenWidth < 400 ? 20 : 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: Colors.light.text,
    fontSize: screenWidth < 400 ? 10 : 12,
    opacity: 0.7,
    textAlign: 'center',
  },
  sectionTitle: {
    width: '100%',
    color: Colors.light.accentBlue,
    fontWeight: 'bold',
    fontSize: screenWidth < 400 ? 14 : 16,
    marginBottom: screenHeight < 700 ? 8 : 12,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: screenHeight < 700 ? 12 : 16,
  },
  menuGridItem: {
    width: screenWidth < 400 ? '48%' : screenWidth < 600 ? '31%' : '23%',
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 12,
    padding: screenWidth < 400 ? 8 : 12,
    marginBottom: screenHeight < 700 ? 8 : 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: screenHeight < 700 ? 100 : 120,
  },
  menuIconContainer: {
    width: screenWidth < 400 ? 35 : 45,
    height: screenWidth < 400 ? 35 : 45,
    borderRadius: screenWidth < 400 ? 17.5 : 22.5,
    backgroundColor: Colors.light.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: screenHeight < 700 ? 6 : 8,
  },
  menuIcon: {
    fontSize: screenWidth < 400 ? 18 : 22,
  },
  menuTitle: {
    color: Colors.light.accentOrange,
    fontSize: screenWidth < 400 ? 12 : 14,
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'center',
    lineHeight: screenWidth < 400 ? 16 : 18,
  },
  menuDescription: {
    color: Colors.light.text,
    fontSize: screenWidth < 400 ? 9 : 10,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: screenWidth < 400 ? 12 : 14,
    flex: 1,
  },
  logoutButton: {
    backgroundColor: Colors.light.accentBlue,
    paddingVertical: screenHeight < 700 ? 12 : 14,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: screenHeight < 700 ? 16 : 20,
    shadowColor: '#d32f2f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: screenWidth < 400 ? 14 : 16,
  },
});
