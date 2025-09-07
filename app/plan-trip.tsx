import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { Colors } from '@/constants/Colors';

export default function PlanTrip() {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Plan My Trip</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Design Your Sacred Simhastha Journey</Text>
        <View style={styles.bannerBox}>
          <Text style={styles.bannerText}>"Crowd-Free Darshan. Stress-Free Journey."{"\n"}– भीड़ मुक्त दर्शन, चिंता मुक्त यात्रा –</Text>
        </View>
        <ExpoImage source={require('@/assets/images/kumbh_image1.png')} style={styles.hero} contentFit="cover" />
        <ExpoImage source={require('@/assets/images/kumbh_image2.png')} style={[styles.hero,{marginTop:14}]} contentFit="cover" />
        <View style={[styles.bannerBox,{marginTop:14}]}> 
          <Text style={styles.bannerText}>"Seva. Suraksha. Simhastha 2028."{"\n"}– सेवा, सुरक्षा और सिम्हस्थ 2028 –</Text>
        </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('plan-date' as never)}>
          <Text style={styles.primaryBtnText}>Start Planning</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', padding: 16, backgroundColor: Colors.light.background },
  header: { width: '100%', textAlign: 'center', backgroundColor: Colors.light.card, color: Colors.light.accentBlue, fontWeight: 'bold', paddingVertical: 12, borderRadius: 10, fontSize: 20, marginBottom: 12 },
  card: { width: '100%', backgroundColor: Colors.light.card, borderWidth: 1, borderColor: Colors.light.border, borderRadius: 16, padding: 14 },
  cardTitle: { color: Colors.light.accentBlue, fontWeight: '700', marginBottom: 10 },
  bannerBox: { backgroundColor: Colors.light.accentOrange, borderRadius: 8, paddingVertical: 10, alignItems: 'center' },
  bannerText: { color: '#fff', textAlign: 'center' },
  hero: { width: '100%', height: 160, marginTop: 14, borderRadius: 8 },
  primaryBtn: { backgroundColor: Colors.light.accentBlue, paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  primaryBtnText: { color: '#fff', fontWeight: '700' },
});



