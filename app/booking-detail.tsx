import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { Colors } from '@/constants/Colors';

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <Text style={styles.infoRow}><Text style={styles.bold}>{label}:</Text> <Text style={styles.value}>{value}</Text></Text>
  );
}

export default function BookingDetail() {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Hotel Booking</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Hotel Shree Palace</Text>
        <InfoRow label="Booking ID" value="HSP-89540763" />
        <InfoRow label="Date" value="06 April–08 April" />
        <InfoRow label="Room Details" value="Room no-102, 2nd floor" />
      </View>

      <Text style={styles.header2}>Prasad Orders</Text>

      {[{name:'Laddo Box', id:'FOD-6459182', date:'07 April 2028', qty:'1 box'}, {name:'Panchamrit', id:'FOD-5238064', date:'07 April 2028', qty:'1'}, {name:'Dry Fruits', id:'FOD-98721045', date:'07 April 2028', qty:'1'}].map(o => (
        <View key={o.id} style={styles.orderCard}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.orderName}>{o.name}</Text>
            <Text style={styles.orderId}>ORDER ID {o.id}</Text>
          </View>
          <Text style={styles.orderMeta}>Delivery Date: {o.date}</Text>
          <Text style={styles.orderMeta}>Qty: {o.qty}</Text>
        </View>
      ))}

      <View style={styles.summaryCard}>
        <Text style={styles.infoRow}><Text style={styles.bold}>Booking ID:</Text> HSP-89540763</Text>
        <View style={styles.qrBoxLarge}>
          {/* Static sample QR code */}
          <ExpoImage source={require('@/assets/images/sample-qr.png')} style={{ width: 100, height: 100, borderRadius: 8, borderWidth: 1, borderColor: '#ccc' }} contentFit="cover" />
        </View>
        <View style={styles.summaryRow}> 
          <View style={styles.summaryPill}><Text style={styles.summaryPillText}>Total Room Booked: 1</Text></View>
          <View style={styles.summaryPill}><Text style={styles.summaryPillText}>Confirmation Sent To abc@gmail.com</Text></View>
        </View>
        <View style={styles.notes}>
          <Text style={styles.noteText}>1. Please carry your aadhar or ID at the time of checkin.</Text>
          <Text style={styles.noteText}>2. Reach 15 minutes early to avoid rush.</Text>
          <Text style={styles.noteText}>3. Show this token at the hotel reception.</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.navigate('(tabs)' as never)}>
        <Text style={styles.homeBtnText}>Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', padding: 16, backgroundColor: Colors.light.background },
  header: { width: '100%', color: Colors.light.accentBlue, fontWeight: '800', fontSize: 18, marginBottom: 8 },
  header2: { width: '100%', color: Colors.light.accentBlue, fontWeight: '800', fontSize: 18, marginVertical: 8 },
  card: { width: '100%', backgroundColor: Colors.light.card, borderWidth: 1, borderColor: Colors.light.border, borderRadius: 12, padding: 12 },
  title: { color: Colors.light.accentBlue, fontWeight: '800', marginBottom: 8 },
  infoRow: { color: Colors.light.text, marginBottom: 4 },
  bold: { fontWeight: '700' },
  value: { color: Colors.light.text },
  orderCard: { width: '100%', backgroundColor: Colors.light.card, borderWidth: 1, borderColor: Colors.light.border, borderRadius: 12, padding: 12, marginBottom: 10 },
  orderName: { color: Colors.light.accentBlue, fontWeight: '700' },
  orderId: { color: Colors.light.icon, fontWeight: '700', fontSize: 12 },
  orderMeta: { color: Colors.light.text, marginTop: 6 },
  summaryCard: { width: '100%', backgroundColor: Colors.light.card, borderWidth: 1, borderColor: Colors.light.border, borderRadius: 12, padding: 12, marginTop: 4 },
  qrBox: { width: 60, height: 60, borderWidth: 1, borderColor: Colors.light.border, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 8 },
  qrBoxLarge: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: Colors.light.border,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 16,
    padding: 10,
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  qrText: { color: Colors.light.text },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  summaryPill: { flex: 1, backgroundColor: Colors.light.background, borderRadius: 10, paddingVertical: 10, alignItems: 'center', borderWidth: 1, borderColor: Colors.light.border },
  summaryPillText: { color: Colors.light.text, fontSize: 12 },
  notes: { backgroundColor: Colors.light.card, borderRadius: 8, padding: 10, marginTop: 8 },
  noteText: { color: Colors.light.text, opacity: 0.7, fontSize: 12 },
  homeBtn: { backgroundColor: Colors.light.accentBlue, paddingVertical: 14, borderRadius: 12, alignItems: 'center', width: '100%', marginTop: 14 },
  homeBtnText: { color: '#fff', fontWeight: '700' },
});



