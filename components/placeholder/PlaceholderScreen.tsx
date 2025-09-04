import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PlaceholderScreen({ title }: { title: string; navigation?: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>Coming soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff8e7',
    padding: 24,
  },
  title: {
    fontSize: 28,
    color: '#e65100',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#000',
    opacity: 0.7,
  },
});


