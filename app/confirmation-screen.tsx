import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ConfirmationScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Booking Confirmed</Text>
      
      <View style={styles.card}>
        <View style={styles.successIcon}>
          <Text style={styles.checkmark}>✓</Text>
        </View>
        
        <Text style={styles.title}>Your Booking is Confirmed!</Text>
        <Text style={styles.subtitle}>Booking ID: SIM2028001</Text>
        
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Trip Summary</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🚌 Transport Details</Text>
            <Text style={styles.detailText}>Train: 12951 (Mumbai - Ujjain)</Text>
            <Text style={styles.detailText}>Date: 06 Apr 2028, 10:00 AM</Text>
            <Text style={styles.detailText}>Platform: Platform 2</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🏨 Hotel Details</Text>
            <Text style={styles.detailText}>Hotel: Hotel Ujjain Palace</Text>
            <Text style={styles.detailText}>Room: Deluxe AC Room</Text>
            <Text style={styles.detailText}>Check-in: 06 Apr 2028</Text>
            <Text style={styles.detailText}>Check-out: 08 Apr 2028</Text>
            <Text style={styles.detailText}>Guests: 2 Adults, 1 Child</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💰 Payment Details</Text>
            <Text style={styles.detailText}>Amount Paid: ₹7,300</Text>
            <Text style={styles.detailText}>Payment Method: UPI</Text>
            <Text style={styles.detailText}>Transaction ID: TXN123456789</Text>
          </View>
        </View>
        
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            "Your sacred journey is ready! We'll send you all details via SMS and email."
            {"\n"}– आपकी पवित्र यात्रा तैयार है! हम आपको सभी विवरण SMS और ईमेल के माध्यम से भेजेंगे। –
          </Text>
        </View>
        
        <View style={styles.contactBox}>
          <Text style={styles.contactTitle}>Need Help?</Text>
          <Text style={styles.contactText}>📞 Support: +91-9876543210</Text>
          <Text style={styles.contactText}>📧 Email: support@simhastha2028.com</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.primaryBtn}
        onPress={() => navigation.navigate('index' as never)}
      >
        <Text style={styles.primaryBtnText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', padding: 16, backgroundColor: '#fff8e7' },
  header: { width: '100%', textAlign: 'center', backgroundColor: '#ffe0b2', color: '#e65100', fontWeight: 'bold', paddingVertical: 12, borderRadius: 10, fontSize: 20, marginBottom: 12 },
  card: { width: '100%', backgroundColor: '#fff3e0', borderWidth: 1, borderColor: '#ff9800', borderRadius: 16, padding: 14, alignItems: 'center' },
  
  successIcon: { width: 80, height: 80, backgroundColor: '#4CAF50', borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  checkmark: { color: '#fff', fontSize: 40, fontWeight: 'bold' },
  
  title: { color: '#e65100', fontWeight: '700', fontSize: 20, marginBottom: 8, textAlign: 'center' },
  subtitle: { color: '#e65100', fontWeight: '600', fontSize: 16, marginBottom: 20, textAlign: 'center' },
  
  summaryBox: { width: '100%', backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#ffcc80', borderRadius: 10, padding: 16, marginBottom: 16 },
  summaryTitle: { color: '#e65100', fontWeight: '700', fontSize: 18, marginBottom: 16, textAlign: 'center' },
  
  section: { marginBottom: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  sectionTitle: { color: '#e65100', fontWeight: '700', fontSize: 16, marginBottom: 8 },
  detailText: { color: '#000', fontSize: 14, marginBottom: 4, lineHeight: 20 },
  
  noteBox: { backgroundColor: '#4CAF50', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 16, alignItems: 'center', marginBottom: 16, width: '100%' },
  noteText: { color: '#fff', textAlign: 'center', fontSize: 14, lineHeight: 20 },
  
  contactBox: { backgroundColor: '#f5f5f5', borderRadius: 8, padding: 12, width: '100%', alignItems: 'center' },
  contactTitle: { color: '#e65100', fontWeight: '700', fontSize: 16, marginBottom: 8 },
  contactText: { color: '#000', fontSize: 14, marginBottom: 4 },
  
  primaryBtn: { backgroundColor: '#e65100', paddingVertical: 14, borderRadius: 12, alignItems: 'center', width: '100%', marginTop: 16 },
  primaryBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});


