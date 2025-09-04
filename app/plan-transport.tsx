import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useLocation } from '@/contexts/LocationContext';

export default function PlanTransport() {
  const navigation = useNavigation();
  const { startLocation, setStartLocation } = useLocation();
  const [choice, setChoice] = useState<'private' | 'public' | null>(null);
  const [startLocationInput, setStartLocationInput] = useState(startLocation || '');

  const isValid = choice && startLocationInput.trim();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Choose Transport</Text>
      <View style={styles.card}>
        <Text style={styles.title}>Select Your Transport Mode</Text>
        <Text style={styles.sub}>Choose how you want to travel to Ujjain{"\n"}05 Apr 2028 - 09 Apr 2028</Text>
        
        <Text style={styles.section}>Journey Details</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Start Location (e.g., Mumbai, Delhi, Bangalore)" 
          placeholderTextColor="#00000070" 
          value={startLocationInput} 
          onChangeText={setStartLocationInput}
        />
        <TextInput 
          style={[styles.input, styles.disabledInput]} 
          placeholder="End Location" 
          placeholderTextColor="#00000070" 
          value="Ujjain" 
          editable={false}
        />

        <Text style={styles.section}>Transportation Mode</Text>
        <TouchableOpacity style={[styles.option, choice==='private' && styles.optionActive]} onPress={() => setChoice('private')}>
          <Text style={styles.optionText}>🚗  Private Transport</Text>
          <Text style={styles.optionSubtext}>Your own vehicle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.option, choice==='public' && styles.optionActive]} onPress={() => setChoice('public')}>
          <Text style={styles.optionText}>🚌  Public Transport</Text>
          <Text style={styles.optionSubtext}>Train, Bus, or other public transport</Text>
        </TouchableOpacity>

        <View style={styles.note}><Text style={styles.noteText}>परंपरा और तकनीक का संगम – अपनी यात्रा स्वयं चुनें।</Text></View>
      </View>

      <TouchableOpacity 
        style={[styles.primaryBtn, !isValid && {opacity:0.6}]} 
        disabled={!isValid} 
        onPress={() => {
          setStartLocation(startLocationInput.trim());
          if (choice === 'private') {
            navigation.navigate('plan-vehicle' as never);
          } else if (choice === 'public') {
            navigation.navigate('add-public-vehicle' as never);
          }
        }}
      >
        <Text style={styles.primaryBtnText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', padding: 16, backgroundColor: '#fff8e7' },
  header: { width: '100%', textAlign: 'center', backgroundColor: '#ffe0b2', color: '#e65100', fontWeight: 'bold', paddingVertical: 12, borderRadius: 10, fontSize: 20, marginBottom: 12 },
  card: { width: '100%', backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 12, padding: 14 },
  title: { color: '#000', fontWeight: '800', marginBottom: 4 },
  sub: { color: '#000', opacity: 0.6, marginBottom: 10 },
  section: { color: '#000', fontWeight: '700', marginBottom: 10 },
  option: { backgroundColor: '#eeeeee', borderRadius: 10, paddingVertical: 18, paddingHorizontal: 14, marginBottom: 10 },
  optionActive: { backgroundColor: '#ffe0b2', borderWidth: 1, borderColor: '#ff9800' },
  input: { backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#ffcc80', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 16, marginBottom: 12, fontSize: 16, color: '#000' },
  disabledInput: { backgroundColor: '#f5f5f5', color: '#999' },
  optionText: { color: '#000', fontWeight: '700', fontSize: 16 },
  optionSubtext: { color: '#000', opacity: 0.6, fontSize: 14, marginTop: 4 },
  note: { backgroundColor: '#fff3e0', borderWidth: 1, borderColor: '#ffcc80', borderRadius: 8, padding: 10, marginTop: 6 },
  noteText: { color: '#e65100', textAlign: 'center' },
  primaryBtn: { backgroundColor: '#e65100', paddingVertical: 14, borderRadius: 12, alignItems: 'center', width: '100%', marginTop: 14 },
  primaryBtnText: { color: '#fff', fontWeight: '700' },
});


