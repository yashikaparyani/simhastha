import { Image as ExpoImage } from 'expo-image';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Tile = {
  key: string;
  label: string;
  route: string;
  emoji: string;
};

interface HomeDashboardProps {
  navigation: any;
  userName?: string;
}

const tiles: Tile[] = [
  { key: 'addMembers', label: 'Add Members', route: 'add-members', emoji: '👥' },
  { key: 'wallet', label: 'My Wallet', route: 'wallet', emoji: '💼' },
  { key: 'planTrip', label: 'Plan my trip', route: 'plan-trip', emoji: '🧭' },
  { key: 'booking', label: 'Booking Detail', route: 'booking-detail', emoji: '🧾' },
  { key: 'sos', label: 'Emergency', route: 'emergency', emoji: '🆘' },
  { key: 'tripDetails', label: 'Trip Details', route: 'trip-details', emoji: '🚌' },
  { key: 'liveMap', label: 'Live Map', route: 'live-map', emoji: '🗺️' },
  { key: 'temple', label: 'Temple Slot', route: 'temple-slot', emoji: '🛕' },
];

export default function HomeDashboard({ navigation, userName = 'User' }: HomeDashboardProps) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.greeting}>Namaste,{userName}</Text>

      <ExpoImage
        source={require('@/assets/images/kumbh.jpeg')}
        style={styles.logo}
        contentFit="cover"
      />

      <View style={styles.banner}>
        <Text style={styles.bannerText}>Welcome to <Text style={{ fontWeight: 'bold' }}>Simhastha</Text> app</Text>
      </View>

      <View style={styles.taglineBox}>
        <Text style={styles.taglinePrimary}>"Guiding Every Step of Your Simhastha Yatra."</Text>
        <Text style={styles.taglineSecondary}>— आपकी प्रत्येक यात्रा का भरोसेमंद साथी —</Text>
      </View>

      <View style={styles.grid}>
        {tiles.map(tile => (
          <TouchableOpacity key={tile.key} style={styles.tile} onPress={() => navigation.navigate(tile.route)}>
            <Text style={styles.tileEmoji}>{tile.emoji}</Text>
            <Text style={styles.tileLabel}>{tile.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff8e7',
  },
  greeting: {
    marginTop: 12,
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#ffd699',
    color: '#e65100',
    fontWeight: 'bold',
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 18,
  },
  logo: {
    width: 180,
    height: 180,
    marginVertical: 16,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: '#e65100',
  },
  banner: {
    width: '100%',
    backgroundColor: '#ffe0b2',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 14,
    alignItems: 'center',
  },
  bannerText: {
    color: '#000',
    fontSize: 16,
  },
  taglineBox: {
    width: '100%',
    backgroundColor: '#fff3e0',
    borderWidth: 1,
    borderColor: '#ff9800',
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 18,
    alignItems: 'center',
  },
  taglinePrimary: {
    color: '#e65100',
    fontWeight: '600',
    marginBottom: 6,
  },
  taglineSecondary: {
    color: '#000',
    opacity: 0.7,
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tile: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ff9800',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginBottom: 14,
    alignItems: 'center',
  },
  tileEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  tileLabel: {
    color: '#000',
    textAlign: 'center',
  },
});


