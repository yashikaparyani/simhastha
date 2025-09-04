import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNotification } from '@/contexts/NotificationContext';

export default function HotelAccommodation() {
  const navigation = useNavigation();
  const { notificationService } = useNotification();
  const [hotelName, setHotelName] = useState('');
  const [roomType, setRoomType] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const isValid = hotelName && roomType && checkInDate && checkOutDate && numberOfGuests && contactNumber;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Hotel Accommodation</Text>
      
      <View style={styles.card}>
        <Text style={styles.title}>Book Your Stay</Text>
        <Text style={styles.subtitle}>Find comfortable accommodation for your sacred journey</Text>
        
        <Text style={styles.section}>Hotel Details</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Hotel Name (e.g., Hotel Ujjain Palace)" 
          placeholderTextColor="#00000070" 
          value={hotelName} 
          onChangeText={setHotelName} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Room Type (e.g., Deluxe Room, AC Room)" 
          placeholderTextColor="#00000070" 
          value={roomType} 
          onChangeText={setRoomType} 
        />
        
        <Text style={styles.section}>Stay Duration</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Check-in Date (e.g., 06 Apr 2028)" 
          placeholderTextColor="#00000070" 
          value={checkInDate} 
          onChangeText={setCheckInDate} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Check-out Date (e.g., 08 Apr 2028)" 
          placeholderTextColor="#00000070" 
          value={checkOutDate} 
          onChangeText={setCheckOutDate} 
        />
        
        <Text style={styles.section}>Guest Information</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Number of Guests (e.g., 2 Adults, 1 Child)" 
          placeholderTextColor="#00000070" 
          value={numberOfGuests} 
          onChangeText={setNumberOfGuests} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Contact Number (e.g., +91-9876543210)" 
          placeholderTextColor="#00000070" 
          value={contactNumber} 
          onChangeText={setContactNumber} 
          keyboardType="phone-pad"
        />
        
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            &quot;Comfortable stay for peaceful darshan - Book your accommodation in advance&quot;
            {"\n"}– शांतिपूर्ण दर्शन के लिए आरामदायक ठहराव – पहले से अपना आवास बुक करें –
          </Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.primaryBtn, !isValid && {opacity: 0.6}]} 
        disabled={!isValid}
        onPress={() => {
          // Send notification for hotel booking
          notificationService.sendHotelBookingNotification(hotelName, `${checkInDate} - ${checkOutDate}`);
          navigation.navigate('payment-screen' as never);
        }}
      >
        <Text style={styles.primaryBtnText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', padding: 16, backgroundColor: '#fff8e7' },
  header: { width: '100%', textAlign: 'center', backgroundColor: '#ffe0b2', color: '#e65100', fontWeight: 'bold', paddingVertical: 12, borderRadius: 10, fontSize: 20, marginBottom: 12 },
  card: { width: '100%', backgroundColor: '#fff3e0', borderWidth: 1, borderColor: '#ff9800', borderRadius: 16, padding: 14 },
  title: { color: '#e65100', fontWeight: '700', marginBottom: 4, fontSize: 18 },
  subtitle: { color: '#e65100', opacity: 0.8, marginBottom: 16, fontSize: 14 },
  
  section: { color: '#e65100', fontWeight: '700', marginBottom: 10, marginTop: 16, fontSize: 16 },
  
  input: { backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#ffcc80', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 16, marginBottom: 12, fontSize: 16, color: '#000' },
  
  noteBox: { backgroundColor: '#ff8f00', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 16, alignItems: 'center', marginTop: 8 },
  noteText: { color: '#fff', textAlign: 'center', fontSize: 14, lineHeight: 20 },
  
  primaryBtn: { backgroundColor: '#e65100', paddingVertical: 14, borderRadius: 12, alignItems: 'center', width: '100%', marginTop: 16 },
  primaryBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
