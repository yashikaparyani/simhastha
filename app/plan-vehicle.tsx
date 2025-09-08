import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useLocation } from '@/contexts/LocationContext';

export default function PlanVehicle() {
  const navigation = useNavigation();
  const { startLocation, setStartLocation } = useLocation();
  const [vehicleNo, setVehicleNo] = useState('');
  const [color, setColor] = useState('');
  const [city, setCity] = useState(startLocation || '');
  const isValid = vehicleNo && color && city;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Vehicle Details</Text>
      <View style={styles.card}>
        <Text style={styles.title}>Private Vehicle Details</Text>
        <TextInput style={styles.input} placeholder="Vehicle No" placeholderTextColor="#00000070" value={vehicleNo} onChangeText={setVehicleNo} />
        <TextInput style={styles.input} placeholder="Vehicle Color" placeholderTextColor="#00000070" value={color} onChangeText={setColor} />
        <TextInput style={styles.input} placeholder="Vehicle City/State" placeholderTextColor="#00000070" value={city} onChangeText={setCity} />
        <View style={styles.artBox}><Text style={styles.artText}>ॐ नमः शिवाय</Text></View>
      </View>
      <TouchableOpacity 
        style={[styles.primaryBtn, !isValid && {opacity:0.6}]} 
        disabled={!isValid} 
        onPress={() => {
          setStartLocation(city);
          navigation.navigate('plan-parking' as never);
        }}
      >
        <Text style={styles.primaryBtnText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', padding: 16, backgroundColor: '#fff8e7' },
  header: { width: '100%', textAlign: 'center', backgroundColor: '#fff', color: 'blue', fontWeight: 'bold', paddingVertical: 12, borderRadius: 10, fontSize: 20, marginBottom: 12 },
  card: { width: '100%', backgroundColor: '#fff', borderWidth: 1, borderColor: '#fff', borderRadius: 12, padding: 14 },
  title: { color: '#000', fontWeight: '800', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: 'blue', borderRadius: 10, padding: 14, marginBottom: 12, backgroundColor: '#ffffff', color: '#000' },
  artBox: { height: 140, backgroundColor: 'orange', borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  artText: { color: 'beige', fontWeight: '800', fontSize: 18 },
  primaryBtn: { backgroundColor: 'blue', paddingVertical: 14, borderRadius: 12, alignItems: 'center', width: '100%', marginTop: 14 },
  primaryBtnText: { color: '#fff', fontWeight: '700' },
});


