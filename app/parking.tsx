import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  Alert 
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { Colors } from '@/constants/Colors';

const { width: screenWidth } = Dimensions.get('window');

export default function Parking() {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ExpoImage source={require('@/assets/images/kumbh.jpeg')} style={styles.logo} contentFit="cover" />
      <Text style={styles.header}>Parking Information</Text>

      <View style={styles.videoContainer}>
        <Text style={styles.videoTitle}>Parking Guidelines Video</Text>
        
        <View style={styles.videoWrapper}>
          <View style={styles.videoPlaceholder}>
            <ExpoImage
              source={require('@/assets/images/kumbh.jpeg')}
              style={styles.placeholderImage}
              contentFit="cover"
            />
            <View style={styles.placeholderOverlay}>
              <Text style={styles.placeholderText}>📹</Text>
              <Text style={styles.placeholderTitle}>Parking Guidelines Video</Text>
              <Text style={styles.placeholderSubtitle}>Coming Soon</Text>
            </View>
          </View>
        </View>

        <Text style={styles.videoDescription}>
          Watch this video to understand parking guidelines and procedures for Simhastha Mela.
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Parking Zones</Text>
        <View style={styles.zoneList}>
          <View style={styles.zoneItem}>
            <Text style={styles.zoneIcon}>🅿️</Text>
            <View style={styles.zoneDetails}>
              <Text style={styles.zoneName}>Zone A - Near Mahakaleshwar Temple</Text>
              <Text style={styles.zoneInfo}>Capacity: 500 vehicles | Rate: ₹50/hour</Text>
            </View>
          </View>
          
          <View style={styles.zoneItem}>
            <Text style={styles.zoneIcon}>🅿️</Text>
            <View style={styles.zoneDetails}>
              <Text style={styles.zoneName}>Zone B - Near Ram Ghat</Text>
              <Text style={styles.zoneInfo}>Capacity: 300 vehicles | Rate: ₹40/hour</Text>
            </View>
          </View>
          
          <View style={styles.zoneItem}>
            <Text style={styles.zoneIcon}>🅿️</Text>
            <View style={styles.zoneDetails}>
              <Text style={styles.zoneName}>Zone C - Near Harsiddhi Temple</Text>
              <Text style={styles.zoneInfo}>Capacity: 200 vehicles | Rate: ₹30/hour</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.rulesCard}>
        <Text style={styles.cardTitle}>Parking Rules</Text>
        <View style={styles.rulesList}>
          <Text style={styles.ruleItem}>• Park only in designated areas</Text>
          <Text style={styles.ruleItem}>• Keep your parking token safe</Text>
          <Text style={styles.ruleItem}>• No overnight parking without permission</Text>
          <Text style={styles.ruleItem}>• Follow traffic marshals' instructions</Text>
          <Text style={styles.ruleItem}>• Emergency contact: +91-9876543210</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
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
  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: Colors.light.accentOrange,
    marginTop: 10,
  },
  header: {
    marginTop: 12,
    width: '100%',
    textAlign: 'center',
    backgroundColor: Colors.light.card,
    color: Colors.light.accentBlue,
    fontWeight: 'bold',
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 20,
    marginBottom: 16,
  },
  videoContainer: {
    width: '100%',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  videoTitle: {
    color: Colors.light.accentBlue,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  videoWrapper: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  video: {
    width: '100%',
    height: 200,
    backgroundColor: '#000',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  videoPlaceholder: {
    width: '100%',
    height: 200,
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
  },
  placeholderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 48,
    marginBottom: 8,
  },
  placeholderTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  placeholderSubtitle: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  videoDescription: {
    color: Colors.light.text,
    textAlign: 'center',
    fontSize: 14,
    opacity: 0.8,
  },
  infoCard: {
    width: '100%',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  cardTitle: {
    color: Colors.light.accentBlue,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
  zoneList: {
    gap: 12,
  },
  zoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  zoneIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  zoneDetails: {
    flex: 1,
  },
  zoneName: {
    color: Colors.light.text,
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 2,
  },
  zoneInfo: {
    color: Colors.light.text,
    fontSize: 12,
    opacity: 0.7,
  },
  rulesCard: {
    width: '100%',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  rulesList: {
    gap: 8,
  },
  ruleItem: {
    color: Colors.light.text,
    fontSize: 14,
    lineHeight: 20,
  },
  backButton: {
    backgroundColor: Colors.light.accentBlue,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 14,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
