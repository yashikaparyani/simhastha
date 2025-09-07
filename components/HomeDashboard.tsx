import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { Colors } from '@/constants/Colors';
import Chatbot from '@/components/Chatbot';
import AdvertisementCarousel from '@/components/AdvertisementCarousel';
import NoticeMarquee from '@/components/NoticeMarquee';

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
  { key: 'parking', label: 'Parking', route: 'parking', emoji: '🅿️' },
];

export default function HomeDashboard({ navigation, userName = 'User' }: HomeDashboardProps) {
  const [showBot, setShowBot] = React.useState(false);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Notice Marquee */}
      <NoticeMarquee />

      {/* Advertisement Carousel */}
      <AdvertisementCarousel />

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
      <TouchableOpacity
        style={styles.chatFloating}
        onPress={() => setShowBot((v) => !v)}
        accessibilityRole="button"
        accessibilityLabel="Open chatbot"
      >
        <Text style={styles.chatIcon}>💬</Text>
      </TouchableOpacity>
      {showBot && <Chatbot onClose={() => setShowBot(false)} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  banner: {
    width: '100%',
    backgroundColor: Colors.light.card,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 14,
    alignItems: 'center',
  },
  bannerText: {
    color: Colors.light.text,
    fontSize: 16,
  },
  taglineBox: {
    width: '100%',
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 18,
    alignItems: 'center',
  },
  taglinePrimary: {
    color: Colors.light.accentOrange,
    fontWeight: '600',
    marginBottom: 6,
  },
  taglineSecondary: {
    color: Colors.light.text,
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
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.border,
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
    color: Colors.light.text,
    textAlign: 'center',
  },
  chatFloating: {
    position: 'absolute',
    bottom: 20,
    right: 16,
    height: 56,
    width: 56,
    borderRadius: 28,
    backgroundColor: Colors.light.accentBlue,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  chatIcon: { color: '#fff', fontSize: 22 },
});


