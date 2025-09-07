import UjjainMap from '@/components/UjjainMap';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

export default function LiveMap() {
  const { width, height } = useWindowDimensions();

  const chaurahas = [
    { id:'freeganj', name:'Freeganj Tower' },
    { id:'dewasgate', name:'Dewas Gate Square' },
    { id:'nanakheda', name:'Nanakheda Bus Stand' },
    { id:'mahakal', name:'Mahakal Chauraha' },
    { id:'harsiddhi', name:'Harsiddhi Square' },
    { id:'udaypura', name:'Udaypura Chauraha' }
  ];

  const handleFocus = (id: string) => {
    try { (globalThis as any)?.focusChaurahaInMap?.(id); } catch {}
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Live Map</Text>
      <View style={styles.card}>
        <Text style={styles.title}>Ujjain Area Overview</Text>
        <UjjainMap height={Math.floor(height * 0.5)} />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Chaurahas on this route</Text>
        {chaurahas.map(c => (
          <TouchableOpacity key={c.id} style={styles.row} onPress={() => handleFocus(c.id)}>
            <Text style={styles.rowName}>{c.name}</Text>
            <Text style={styles.rowAction}>View</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', padding: 16, backgroundColor: '#fff8e7' },
  header: { width: '100%', textAlign: 'center', backgroundColor: '#ffe0b2', color: '#e65100', fontWeight: 'bold', paddingVertical: 12, borderRadius: 10, fontSize: 20, marginBottom: 12 },
  card: { width: '100%', backgroundColor: '#fff3e0', borderWidth: 1, borderColor: '#ff9800', borderRadius: 16, padding: 14, marginBottom: 12 },
  title: { color: '#e65100', fontWeight: '700', marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ffcc80', borderRadius: 10, marginBottom: 8 },
  rowName: { color: '#333', fontWeight: '600' },
  rowAction: { color: '#e65100', fontWeight: '700' },
});


