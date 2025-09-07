import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { Colors } from '@/constants/Colors';

export default function TripDetails() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ExpoImage source={require('@/assets/images/kumbh.jpeg')} style={styles.logo} contentFit="cover" />
      <Text style={styles.header}>Booking Details</Text>

      {/* Journey Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Journey Details</Text>
        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            <Text style={styles.fieldLabel}>From</Text>
            <Text style={styles.fieldValue}>Mumbai</Text>
          </View>
          <View style={[styles.tableRow, styles.alternateRow]}>
            <Text style={styles.fieldLabel}>To (Destination)</Text>
            <Text style={styles.fieldValue}>Ujjain</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.fieldLabel}>Estimated Arrival</Text>
            <Text style={styles.fieldValue}>06 April 2028</Text>
          </View>
          <View style={[styles.tableRow, styles.alternateRow]}>
            <Text style={styles.fieldLabel}>Route Chosen</Text>
            <Text style={styles.fieldValue}>Mumbai → Nashik → Indore → Ujjain</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.fieldLabel}>Traffic Forecast</Text>
            <View style={styles.trafficContainer}>
              <Text style={styles.fieldValue}>Moderate</Text>
              <Text style={styles.trafficIcon}>☀️</Text>
            </View>
          </View>
          <View style={[styles.tableRow, styles.alternateRow]}>
            <Text style={styles.fieldLabel}>Toll Booths</Text>
            <Text style={styles.fieldValue}>6 - Approx ₹560</Text>
          </View>
        </View>
      </View>

      {/* Parking Details Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.parkingIcon}>🅿️</Text>
          <Text style={styles.sectionTitle}>Parking Details</Text>
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            <Text style={styles.fieldLabel}>Zone</Text>
            <Text style={styles.fieldValue}>Zone B</Text>
          </View>
          <View style={[styles.tableRow, styles.alternateRow]}>
            <Text style={styles.fieldLabel}>Slot ID</Text>
            <Text style={styles.fieldValue}>4W-B-102</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.fieldLabel}>Entry Time</Text>
            <Text style={styles.fieldValue}>06 April, 10:00 AM</Text>
          </View>
          <View style={[styles.tableRow, styles.alternateRow]}>
            <Text style={styles.fieldLabel}>Exit Time</Text>
            <Text style={styles.fieldValue}>08 April, 08:00 AM</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.fieldLabel}>Duration</Text>
            <Text style={styles.fieldValue}>2 Days</Text>
          </View>
          <View style={[styles.tableRow, styles.alternateRow]}>
            <Text style={styles.fieldLabel}>Type</Text>
            <Text style={styles.fieldValue}>Covered Parking</Text>
          </View>
        </View>
      </View>

      {/* Support Information */}
      <View style={styles.supportSection}>
        <Text style={styles.supportText}>📞 Support: +91-987654xxxx</Text>
      </View>

      {/* Go to Home Button */}
      <TouchableOpacity 
        style={styles.homeButton}
        onPress={() => navigation.navigate('(tabs)' as never)}
      >
        <Text style={styles.homeButtonText}>Go to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: Colors.light.accentOrange,
    marginTop: 10,
  },
  header: {
    marginTop: 12,
    width: '100%',
    textAlign: 'center',
    backgroundColor: Colors.light.card,
    color: Colors.light.accentBlue,
    fontWeight: 'bold',
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 20,
    marginBottom: 16,
  },
  section: {
    width: '100%',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: Colors.light.accentBlue,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
  parkingIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.light.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  alternateRow: {
    backgroundColor: Colors.light.background,
  },
  fieldLabel: {
    flex: 1,
    color: Colors.light.accentBlue,
    fontWeight: '600',
    fontSize: 14,
  },
  fieldValue: {
    flex: 1,
    color: Colors.light.text,
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'right',
  },
  trafficContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  trafficIcon: {
    fontSize: 16,
    marginLeft: 8,
  },
  supportSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  supportText: {
    color: Colors.light.accentBlue,
    fontWeight: '600',
    fontSize: 16,
  },
  homeButton: {
    width: '100%',
    backgroundColor: Colors.light.accentBlue,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  homeButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


