import React from 'react';
import { ScrollView, View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import UjjainMap from '@/components/UjjainMap';

export default function LiveMap() {
  const { width, height } = useWindowDimensions();
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Live Map</Text>
      <View style={styles.card}>
        <Text style={styles.title}>Ujjain Area Overview</Text>
        <UjjainMap height={Math.floor(height * 0.5)} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', padding: 16, backgroundColor: '#fff8e7' },
  header: { width: '100%', textAlign: 'center', backgroundColor: '#ffe0b2', color: '#e65100', fontWeight: 'bold', paddingVertical: 12, borderRadius: 10, fontSize: 20, marginBottom: 12 },
  card: { width: '100%', backgroundColor: '#fff3e0', borderWidth: 1, borderColor: '#ff9800', borderRadius: 16, padding: 14 },
  title: { color: '#e65100', fontWeight: '700', marginBottom: 10 },
});


