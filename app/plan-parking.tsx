import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import UjjainMap from '@/components/UjjainMap';
import { useNotification } from '@/contexts/NotificationContext';

const rows = 6;
const cols = 5;
const booked = new Set(['B01','B02','B03','B04','B05','B10','B11','B12','B20','B25']);

function slotId(r: number, c: number) { const n = r*cols + c + 1; return `B${n.toString().padStart(2,'0')}`; }

export default function PlanParking() {
  const navigation = useNavigation();
  const { notificationService } = useNotification();
  const [selected, setSelected] = useState<string|null>(null);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Book Parking</Text>
      <View style={styles.card}>
        <Text style={styles.title}>Book Your Parking Slot</Text>
        <View style={styles.tabRow}>
          <Text style={[styles.tab, styles.tabInactive]}>Parking A</Text>
          <Text style={[styles.tab, styles.tabActive]}>Parking B</Text>
          <Text style={[styles.tab, styles.tabInactive]}>Parking C</Text>
        </View>

        <View style={styles.grid}>
          {Array.from({length: rows}).map((_, r) => (
            <View key={r} style={styles.gridRow}>
              {Array.from({length: cols}).map((_, c) => {
                const id = slotId(r,c);
                const isBooked = booked.has(id);
                const isSelected = selected === id;
                return (
                  <TouchableOpacity key={id} style={[styles.cell, isBooked && styles.cellBooked, isSelected && styles.cellSelected]} disabled={isBooked} onPress={() => setSelected(prev => prev===id ? null : id)}>
                    <Text style={styles.cellText}>{id}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        <View style={styles.legendRow}>
          <View style={[styles.legendBox, {backgroundColor: '#ef9a9a'}]} />
          <Text style={styles.legendText}>Booked Slots</Text>
          <View style={[styles.legendBox, {backgroundColor: '#a5d6a7', marginLeft: 16}]} />
          <Text style={styles.legendText}>Available Slots</Text>
        </View>

        <View style={{ marginTop: 12 }}>
          <UjjainMap />
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.primaryBtn, !selected && {opacity: 0.6}]} 
        disabled={!selected}
        onPress={() => {
          // Send notification for parking booking
          notificationService.sendParkingBookingNotification(selected!, '06 April, 10:00 AM');
          navigation.navigate('payment-screen' as never);
        }}
      >
        <Text style={styles.primaryBtnText}>Select & Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', padding: 16, backgroundColor: '#fff8e7' },
  header: { width: '100%', textAlign: 'center', backgroundColor: '#ffe0b2', color: '#e65100', fontWeight: 'bold', paddingVertical: 12, borderRadius: 10, fontSize: 20, marginBottom: 12 },
  card: { width: '100%', backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 12, padding: 14 },
  title: { color: '#000', fontWeight: '800', marginBottom: 10 },
  tabRow: { flexDirection: 'row', marginBottom: 10 },
  tab: { flex: 1, textAlign: 'center', paddingVertical: 8, borderWidth: 1, borderColor: '#ffcc80' },
  tabActive: { backgroundColor: '#ffe0b2', color: '#e65100', fontWeight: '700' },
  tabInactive: { backgroundColor: '#fff8e7', color: '#000' },
  grid: { borderWidth: 1, borderColor: '#9fa8da', padding: 8, borderRadius: 8 },
  gridRow: { flexDirection: 'row' },
  cell: { width: 56, height: 40, margin: 4, borderRadius: 6, backgroundColor: '#a5d6a7', alignItems: 'center', justifyContent: 'center' },
  cellBooked: { backgroundColor: '#ef9a9a' },
  cellSelected: { backgroundColor: '#fff59d', borderWidth: 1, borderColor: '#f57f17' },
  cellText: { color: '#000', fontWeight: '700' },
  legendRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  legendBox: { width: 18, height: 18, borderRadius: 4, marginRight: 6 },
  legendText: { color: '#000', opacity: 0.8 },
  primaryBtn: { backgroundColor: '#e65100', paddingVertical: 14, borderRadius: 12, alignItems: 'center', width: '100%', marginTop: 14 },
  primaryBtnText: { color: '#fff', fontWeight: '700' },
});


