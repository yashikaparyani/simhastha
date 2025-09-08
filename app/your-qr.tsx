import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function YourQRScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Your QR Code',
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Your QR Code</Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Show this QR code at the entrance for verification
        </Text>
        
        <View style={styles.qrContainer}>
          <View style={styles.qrCode}>
            <Image
              source={require('@/assets/images/frame.png')}
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
            />
          </View>
        </View>
        
        <Text style={[styles.note, { color: colors.text }]}>
          This QR code is unique to your registration
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
    opacity: 0.8,
  },
  qrContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    alignSelf: 'stretch',
    marginHorizontal: 10,
  },
  qrCode: {
    width: '100%',
    aspectRatio: 1,
    maxWidth: 400,
    maxHeight: 400,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  note: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center',
  },
});
