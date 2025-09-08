import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function PlanDate() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Generate dates for April 2028
  const dates = [
    { date: '05 Apr 2028', day: 'Friday', available: true },
    { date: '06 Apr 2028', day: 'Saturday', available: true },
    { date: '07 Apr 2028', day: 'Sunday', available: true },
    { date: '08 Apr 2028', day: 'Monday', available: true },
    { date: '09 Apr 2028', day: 'Tuesday', available: true },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Select Date</Text>
      
      <View style={styles.card}>
        <Text style={styles.title}>Choose Your Travel Date</Text>
        <Text style={styles.subtitle}>Select your preferred date for Simhastha 2028</Text>
        
        <View style={styles.dateContainer}>
          {dates.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateCard,
                selectedDate === item.date && styles.dateCardSelected,
                !item.available && styles.dateCardDisabled
              ]}
              onPress={() => item.available && setSelectedDate(item.date)}
              disabled={!item.available}
            >
              <Text style={[
                styles.dateText,
                selectedDate === item.date && styles.dateTextSelected,
                !item.available && styles.dateTextDisabled
              ]}>
                {item.date}
              </Text>
              <Text style={[
                styles.dayText,
                selectedDate === item.date && styles.dayTextSelected,
                !item.available && styles.dayTextDisabled
              ]}>
                {item.day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            "Sacred dates for divine journey - Choose wisely for blessed darshan"
            {"\n"}– पवित्र तिथियां दिव्य यात्रा के लिए – चुनें बुद्धिमानी से आशीर्वादित दर्शन के लिए –
          </Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.primaryBtn, !selectedDate && {opacity: 0.6}]} 
        disabled={!selectedDate}
        onPress={() => navigation.navigate('plan-transport' as never)}
      >
        <Text style={styles.primaryBtnText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', padding: 16, backgroundColor: '#fff' },
  header: { width: '100%', textAlign: 'center', backgroundColor: '#fff', color: 'blue', fontWeight: 'bold', paddingVertical: 12, borderRadius: 10, fontSize: 20, marginBottom: 12 },
  card: { width: '100%', backgroundColor: '#fff', borderWidth: 1, borderColor: 'blue', borderRadius: 16, padding: 14 },
  title: { color: 'blue', fontWeight: '700', marginBottom: 4, fontSize: 18 },
  subtitle: { color: 'blue', opacity: 0.8, marginBottom: 16, fontSize: 14 },
  
  dateContainer: { marginBottom: 16 },
  dateCard: { backgroundColor: '#ffffff', borderWidth: 1, borderColor: 'blue', borderRadius: 12, padding: 16, marginBottom: 12, alignItems: 'center' },
  dateCardSelected: { backgroundColor: '#fff', borderColor: 'blue', borderWidth: 2 },
  dateCardDisabled: { backgroundColor: '#f5f5f5', borderColor: '#e0e0e0' },
  
  dateText: { color: 'blue', fontWeight: '700', fontSize: 16, marginBottom: 4 },
  dateTextSelected: { color: 'blue' },
  dateTextDisabled: { color: '#999' },
  
  dayText: { color: 'blue', opacity: 0.7, fontSize: 14 },
  dayTextSelected: { color: 'blue', opacity: 1 },
  dayTextDisabled: { color: '#999' },
  
  noteBox: { backgroundColor: '#ff8f00', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 16, alignItems: 'center' },
  noteText: { color: '#fff', textAlign: 'center', fontSize: 14, lineHeight: 20 },
  
  primaryBtn: { backgroundColor: 'blue', paddingVertical: 14, borderRadius: 12, alignItems: 'center', width: '100%', marginTop: 16 },
  primaryBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

