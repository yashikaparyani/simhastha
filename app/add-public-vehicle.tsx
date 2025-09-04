import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function AddPublicVehicle() {
  const navigation = useNavigation();
  const [transportType, setTransportType] = useState<'train' | 'bus' | null>(null);
  const [dateTime, setDateTime] = useState('');
  const [arrivalLocation, setArrivalLocation] = useState('');
  const [trainNumber, setTrainNumber] = useState('');
  const [platformNumber, setPlatformNumber] = useState('');

  const isValid = transportType && dateTime && arrivalLocation && trainNumber && platformNumber;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Public Transport Details</Text>
      
      <View style={styles.card}>
        <Text style={styles.title}>Enter Your Transport Information</Text>
        <Text style={styles.subtitle}>Provide details for your public transport booking</Text>
        
        <Text style={styles.section}>Transport Type</Text>
        <View style={styles.typeContainer}>
          <TouchableOpacity 
            style={[styles.typeBtn, transportType === 'train' && styles.typeBtnActive]} 
            onPress={() => setTransportType('train')}
          >
            <Text style={[styles.typeText, transportType === 'train' && styles.typeTextActive]}>🚆 Train</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.typeBtn, transportType === 'bus' && styles.typeBtnActive]} 
            onPress={() => setTransportType('bus')}
          >
            <Text style={[styles.typeText, transportType === 'bus' && styles.typeTextActive]}>🚌 Bus</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.section}>Journey Details</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Date & Time (e.g., 06 Apr 2028, 10:00 AM)" 
          placeholderTextColor="#00000070" 
          value={dateTime} 
          onChangeText={setDateTime} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Arrival Location (e.g., Ujjain Junction)" 
          placeholderTextColor="#00000070" 
          value={arrivalLocation} 
          onChangeText={setArrivalLocation} 
        />
        
        {transportType === 'train' && (
          <>
            <TextInput 
              style={styles.input} 
              placeholder="Train Number (e.g., 12951)" 
              placeholderTextColor="#00000070" 
              value={trainNumber} 
              onChangeText={setTrainNumber} 
            />
            <TextInput 
              style={styles.input} 
              placeholder="Platform Number (e.g., Platform 2)" 
              placeholderTextColor="#00000070" 
              value={platformNumber} 
              onChangeText={setPlatformNumber} 
            />
          </>
        )}
        
        {transportType === 'bus' && (
          <>
            <TextInput 
              style={styles.input} 
              placeholder="Bus Number/Operator (e.g., MPSTRC 1234)" 
              placeholderTextColor="#00000070" 
              value={trainNumber} 
              onChangeText={setTrainNumber} 
            />
            <TextInput 
              style={styles.input} 
              placeholder="Bus Stand/Gate (e.g., Gate 3)" 
              placeholderTextColor="#00000070" 
              value={platformNumber} 
              onChangeText={setPlatformNumber} 
            />
          </>
        )}
        
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            "Safe journey with public transport - Your details help us assist you better"
            {"\n"}– सार्वजनिक परिवहन से सुरक्षित यात्रा – आपके विवरण हमें बेहतर सहायता करने में मदद करते हैं –
          </Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.primaryBtn, !isValid && {opacity: 0.6}]} 
        disabled={!isValid}
        onPress={() => navigation.navigate('hotel-accommodation' as never)}
      >
        <Text style={styles.primaryBtnText}>Continue to Hotel</Text>
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
  
  typeContainer: { flexDirection: 'row', marginBottom: 16 },
  typeBtn: { flex: 1, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#ffcc80', borderRadius: 10, paddingVertical: 12, marginHorizontal: 4, alignItems: 'center' },
  typeBtnActive: { backgroundColor: '#ffe0b2', borderColor: '#e65100', borderWidth: 2 },
  typeText: { color: '#e65100', fontWeight: '600', fontSize: 16 },
  typeTextActive: { color: '#e65100', fontWeight: '700' },
  
  input: { backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#ffcc80', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 16, marginBottom: 12, fontSize: 16, color: '#000' },
  
  noteBox: { backgroundColor: '#ff8f00', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 16, alignItems: 'center', marginTop: 8 },
  noteText: { color: '#fff', textAlign: 'center', fontSize: 14, lineHeight: 20 },
  
  primaryBtn: { backgroundColor: '#e65100', paddingVertical: 14, borderRadius: 12, alignItems: 'center', width: '100%', marginTop: 16 },
  primaryBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

