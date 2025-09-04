import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image as ExpoImage } from 'expo-image';

function TempleCard({ name, date, time, token }: { name: string; date: string; time: string; token: string }) {
  return (
    <View style={styles.templeCard}>
      <Text style={styles.templeName}>{name}</Text>
      <Text style={styles.templeMeta}>Date: {date}   Time: {time}</Text>
      <Text style={styles.templeMeta}>Token no: {token}</Text>
    </View>
  );
}

export default function TempleSlot() {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Mandir Darshan Details</Text>

      <View style={styles.centerBanner}> 
        <Text style={styles.slogan}>– एक पेय, एक आस्था, एक महाकाल –</Text>
      </View>

      <TempleCard name="Mahakaleshwar Jyotirlinga" date="07 April 2028" time="05-10 AM" token="MKL-5842" />
      <TempleCard name="Shree Kaal Bhairav" date="07 April 2028" time="05-10 AM" token="KBH-1608" />
      <TempleCard name="Ram Ghat Ujjain" date="07 April 2028" time="05-10 AM" token="RAG-2141" />

      <View style={styles.summaryCard}>
        <Text style={styles.infoRow}>Booking ID: SIM-2028-TMP-891273</Text>
        <View style={styles.qrBoxLarge}>
          {/* Static sample QR code */}
          <ExpoImage source={require('@/assets/images/sample-qr.png')} style={{ width: 120, height: 120, borderRadius: 8, borderWidth: 1, borderColor: '#ccc' }} contentFit="cover" />
        </View>
        <View style={styles.summaryRow}>
          <View style={styles.summaryPill}><Text style={styles.summaryPillText}>Total Temples Booked: 3</Text></View>
          <View style={styles.summaryPill}><Text style={styles.summaryPillText}>Confirmation Sent To abc@gmail.com</Text></View>
        </View>
        <View style={styles.notes}>
          <Text style={styles.noteText}>1. Please carry your aadhar or ID at the time of darshan.</Text>
          <Text style={styles.noteText}>2. Reach 15 minutes early to avoid slot lapse.</Text>
          <Text style={styles.noteText}>3. Show this token at the temple entrance.</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.navigate('(tabs)' as never)}>
        <Text style={styles.homeBtnText}>Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', padding: 16, backgroundColor: '#fff8e7' },
  header: { width: '100%', textAlign: 'center', backgroundColor: '#ffe0b2', color: '#e65100', fontWeight: 'bold', paddingVertical: 12, borderRadius: 10, fontSize: 20, marginBottom: 12 },
  centerBanner: { width: '100%', alignItems: 'center', marginBottom: 8 },
  slogan: { color: '#e65100' },
  templeCard: { width: '100%', backgroundColor: '#fff7e6', borderWidth: 1, borderColor: '#ffdcab', borderRadius: 12, padding: 12, marginBottom: 10 },
  templeName: { color: '#e65100', fontWeight: '700' },
  templeMeta: { color: '#000', marginTop: 6 },
  summaryCard: { width: '100%', backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 12, padding: 12, marginTop: 4 },
  qrBox: { width: 60, height: 60, borderWidth: 1, borderColor: '#9e9e9e', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 8 },
  qrBoxLarge: { alignItems: 'center', justifyContent: 'center', marginVertical: 16 },
  qrText: { color: '#000' },
  infoRow: { color: '#000', marginBottom: 6, textAlign: 'center' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  summaryPill: { flex: 1, backgroundColor: '#fff8e7', borderRadius: 10, paddingVertical: 10, alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  summaryPillText: { color: '#000', fontSize: 12 },
  notes: { backgroundColor: '#f5f5f5', borderRadius: 8, padding: 10, marginTop: 8 },
  noteText: { color: '#000', opacity: 0.7, fontSize: 12 },
  homeBtn: { backgroundColor: '#e65100', paddingVertical: 14, borderRadius: 12, alignItems: 'center', width: '100%', marginTop: 14 },
  homeBtnText: { color: '#fff', fontWeight: '700' },
});



