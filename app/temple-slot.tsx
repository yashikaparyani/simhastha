import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { Colors } from '@/constants/Colors';
// Using simple modal approach instead of DateTimePicker
import * as Notifications from 'expo-notifications';

// Static temple suggestions as fallback
const TEMPLE_SUGGESTIONS = [
  'Mahakaleshwar Jyotirlinga',
  'Shree Kaal Bhairav Temple',
  'Ram Ghat Ujjain',
  'Harsiddhi Mata Temple',
  'Mangalnath Temple',
  'Chintaman Ganesh Temple',
  'Gadhkalika Temple',
  'Vikram Kirti Mandir',
  'Sandipani Ashram',
  'Triveni Ghat'
];

const TEMPLE_DETAILS = [
  '⚠️ High crowd detected. Avoid visiting at peak hours.',
  '✅ Smooth darshan experience expected today.',
  '🙏 Special aarti scheduled for devotees.',
  '🚧 Road construction nearby, expect delays.',
  '🎉 Festival ongoing, vibrant atmosphere!',
  '🟢 Low crowd, best time to visit.',
  '⚠️ Parking is limited today.',
  '✅ Extra volunteers available for assistance.',
  '⚠️ Long queue for prasad distribution.',
  '✅ Free water and shade arrangements available.'
];

interface PlannedVisit {
  id: string;
  templeName: string;
  date: Date;
  time: Date;
  token: string;
  isCrowded?: boolean;
  randomDetail?: string;
}

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
  const [plannedVisits, setPlannedVisits] = useState<PlannedVisit[]>([]);
  const [showAddTemple, setShowAddTemple] = useState(false);
  const [templeInput, setTempleInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  // Configure notifications
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true
      }),
    });
  }, []);

  // Filter suggestions based on input
  useEffect(() => {
    if (templeInput.length > 0) {
      const filtered = TEMPLE_SUGGESTIONS.filter(temple =>
        temple.toLowerCase().includes(templeInput.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [templeInput]);

  const handleTempleSelect = (temple: string) => {
    setTempleInput(temple);
    setShowSuggestions(false);
  };

  const checkCrowdStatus = async (templeName: string) => {
    try {
      // Google Places API call for crowd analysis
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(templeName + ' Ujjain')}&key=AIzaSyAzakCzViqQ1UF13ekm_W4jD0CKm4k1nqQ`
      );
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const place = data.results[0];
        // Simulate crowd analysis (in real app, you'd use Popular Times API)
        const isCrowded = Math.random() > 0.5; // Random for demo
        
        if (isCrowded) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: 'Temple Crowd Alert',
              body: `Avoid visiting ${templeName} - Currently crowded!`,
            },
            trigger: null,
          });
        }
        
        return isCrowded;
      }
    } catch (error) {
      console.log('Error checking crowd status:', error);
    }
    return false;
  };

  const handleSaveVisit = async () => {
    if (!templeInput.trim()) {
      Alert.alert('Error', 'Please enter a temple name');
      return;
    }

    const token = `TMP-${Date.now().toString().slice(-6)}`;
    const isCrowded = await checkCrowdStatus(templeInput);
    // Pick a random detail
    const randomDetail = TEMPLE_DETAILS[Math.floor(Math.random() * TEMPLE_DETAILS.length)];
    const newVisit: PlannedVisit = {
      id: Date.now().toString(),
      templeName: templeInput,
      date: selectedDate,
      time: selectedTime,
      token,
      isCrowded,
      randomDetail
    };

    setPlannedVisits(prev => [...prev, newVisit]);
    setTempleInput('');
    setShowAddTemple(false);
    setSelectedDate(new Date());
    setSelectedTime(new Date());
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Mandir Darshan Details</Text>

      <View style={styles.centerBanner}> 
        <Text style={styles.slogan}>– एक पेय, एक आस्था, एक महाकाल –</Text>
      </View>

      {/* Existing temple cards */}
      <TempleCard name="Mahakaleshwar Jyotirlinga" date="07 April 2028" time="05-10 AM" token="MKL-5842" />
      <TempleCard name="Shree Kaal Bhairav" date="07 April 2028" time="05-10 AM" token="KBH-1608" />
      <TempleCard name="Ram Ghat Ujjain" date="07 April 2028" time="05-10 AM" token="RAG-2141" />

      {/* Add Temple Button */}
      <TouchableOpacity 
        style={styles.addTempleBtn} 
        onPress={() => setShowAddTemple(true)}
      >
        <Text style={styles.addTempleBtnText}>+ Add Temple Visit</Text>
      </TouchableOpacity>

      {/* Add Temple Form */}
      {showAddTemple && (
        <View style={styles.addTempleForm}>
          <Text style={styles.formTitle}>Plan Your Temple Visit</Text>
          
          <TextInput
            style={styles.templeInput}
            placeholder="Enter temple name"
            placeholderTextColor="#00000070"
            value={templeInput}
            onChangeText={setTempleInput}
          />
          
          {/* Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {suggestions.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestionItem}
                  onPress={() => handleTempleSelect(suggestion)}
                >
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Date Input */}
          <TextInput
            style={styles.templeInput}
            placeholder="Enter date (e.g., 15 Dec 2024)"
            placeholderTextColor="#00000070"
            value={formatDate(selectedDate)}
            editable={false}
          />

          {/* Time Input */}
          <TextInput
            style={styles.templeInput}
            placeholder="Enter time (e.g., 10:30 AM)"
            placeholderTextColor="#00000070"
            value={formatTime(selectedTime)}
            editable={false}
          />

          {/* Action Buttons */}
          <View style={styles.formActions}>
            <TouchableOpacity 
              style={styles.cancelBtn}
              onPress={() => setShowAddTemple(false)}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.saveBtn}
              onPress={handleSaveVisit}
            >
              <Text style={styles.saveBtnText}>Save Visit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Planned Visits List */}
      {plannedVisits.length > 0 && (
        <View style={styles.plannedVisitsContainer}>
          <Text style={styles.plannedVisitsTitle}>Your Planned Visits</Text>
          {plannedVisits.map(visit => (
            <View key={visit.id} style={styles.plannedVisitCard}>
              <Text style={styles.plannedVisitName}>{visit.templeName}</Text>
              <Text style={styles.plannedVisitMeta}>
                Date: {formatDate(visit.date)} | Time: {formatTime(visit.time)}
              </Text>
              <Text style={styles.plannedVisitMeta}>Token: {visit.token}</Text>
              {visit.isCrowded && (
                <Text style={styles.crowdedWarning}>⚠️ Currently Crowded</Text>
              )}
              {visit.randomDetail && (
                <Text style={styles.plannedVisitDetail}>{visit.randomDetail}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      <View style={styles.summaryCard}>
        <Text style={styles.infoRow}>Booking ID: SIM-2028-TMP-891273</Text>
        <View style={styles.qrBoxLarge}>
          {/* Static sample QR code */}
          <ExpoImage source={require('@/assets/images/sample-qr.png')} style={{ width: 120, height: 120, borderRadius: 8, borderWidth: 1, borderColor: '#ccc' }} contentFit="cover" />
        </View>
        <View style={styles.summaryRow}>
          <View style={styles.summaryPill}><Text style={styles.summaryPillText}>Total Temples Booked: {3 + plannedVisits.length}</Text></View>
          <View style={styles.summaryPill}><Text style={styles.summaryPillText}>Confirmation Sent To abc@gmail.com</Text></View>
        </View>
        <View style={styles.notes}>
          <Text style={styles.noteText}>1. Please carry your aadhar or ID at the time of darshan.</Text>
          <Text style={styles.noteText}>2. Reach 15 minutes early to avoid slot lapse.</Text>
          <Text style={styles.noteText}>3. Show this token at the temple entrance.</Text>
        </View>
      </View>

      {/* Date and Time are now static for simplicity */}

      <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.navigate('(tabs)' as never)}>
        <Text style={styles.homeBtnText}>Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', padding: 16, backgroundColor: Colors.light.background },
  header: { width: '100%', textAlign: 'center', backgroundColor: Colors.light.card, color: Colors.light.accentBlue, fontWeight: 'bold', paddingVertical: 12, borderRadius: 10, fontSize: 20, marginBottom: 12 },
  centerBanner: { width: '100%', alignItems: 'center', marginBottom: 8 },
  slogan: { color: Colors.light.accentOrange },
  templeCard: { width: '100%', backgroundColor: Colors.light.card, borderWidth: 1, borderColor: Colors.light.border, borderRadius: 12, padding: 12, marginBottom: 10 },
  templeName: { color: Colors.light.accentBlue, fontWeight: '700' },
  templeMeta: { color: Colors.light.text, marginTop: 6 },
  
  // New styles for Add Temple functionality
  addTempleBtn: {
    width: '100%',
    backgroundColor: Colors.light.accentBlue,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 12,
    shadowColor: Colors.light.accentBlue,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  addTempleBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addTempleForm: {
    width: '100%',
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  formTitle: {
    color: Colors.light.accentBlue,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  templeInput: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    padding: 12,
    backgroundColor: Colors.light.background,
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 8,
  },
  suggestionsContainer: {
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    marginBottom: 12,
    maxHeight: 150,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  suggestionText: {
    color: Colors.light.text,
    fontSize: 14,
  },
  dateTimeBtn: {
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  dateTimeBtnText: {
    color: Colors.light.text,
    fontSize: 16,
    textAlign: 'center',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: Colors.light.accentOrange,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 6,
  },
  cancelBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  saveBtn: {
    flex: 1,
    backgroundColor: Colors.light.accentBlue,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 6,
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
  // Planned Visits styles
  plannedVisitsContainer: {
    width: '100%',
    marginBottom: 12,
  },
  plannedVisitsTitle: {
    color: Colors.light.accentBlue,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  plannedVisitCard: {
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  plannedVisitName: {
    color: Colors.light.accentBlue,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  plannedVisitMeta: {
    color: Colors.light.text,
    fontSize: 14,
    marginBottom: 2,
  },
  crowdedWarning: {
    color: Colors.light.error,
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 4,
  },
  plannedVisitDetail: {
    color: Colors.light.accentBlue,
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 4,
  },
  
  // Existing styles
  summaryCard: { width: '100%', backgroundColor: Colors.light.card, borderWidth: 1, borderColor: Colors.light.border, borderRadius: 12, padding: 12, marginTop: 4 },
  qrBox: { width: 60, height: 60, borderWidth: 1, borderColor: Colors.light.border, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 8 },
  qrBoxLarge: { alignItems: 'center', justifyContent: 'center', marginVertical: 16 },
  qrText: { color: Colors.light.text },
  infoRow: { color: Colors.light.text, marginBottom: 6, textAlign: 'center' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  summaryPill: { flex: 1, backgroundColor: Colors.light.background, borderRadius: 10, paddingVertical: 10, alignItems: 'center', borderWidth: 1, borderColor: Colors.light.border },
  summaryPillText: { color: Colors.light.text, fontSize: 12 },
  notes: { backgroundColor: Colors.light.card, borderRadius: 8, padding: 10, marginTop: 8 },
  noteText: { color: Colors.light.text, opacity: 0.7, fontSize: 12 },
  homeBtn: { backgroundColor: Colors.light.accentBlue, paddingVertical: 14, borderRadius: 12, alignItems: 'center', width: '100%', marginTop: 14 },
  homeBtnText: { color: '#fff', fontWeight: '700' },
});



