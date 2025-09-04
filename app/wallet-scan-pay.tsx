import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { useNotification } from '@/contexts/NotificationContext';

export default function WalletScanPay() {
  const navigation = useNavigation();
  const { notificationService } = useNotification();
  const [amount, setAmount] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [merchantDetails, setMerchantDetails] = useState({
    name: '',
    id: '',
    qrCode: ''
  });

  const predefinedAmounts = [50, 100, 200, 500];

  const handleAmountSelect = (value: number) => {
    setAmount(value.toString());
  };

  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate QR scanning
    setTimeout(() => {
      setIsScanning(false);
      // Mock merchant details
      setMerchantDetails({
        name: 'Mahakaleshwar Temple',
        id: 'TEMPLE001',
        qrCode: 'mahakaleshwar@temple'
      });
    }, 2000);
  };

  const validatePayment = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return false;
    }
    if (!merchantDetails.name) {
      Alert.alert('Error', 'Please scan a QR code first');
      return false;
    }
    return true;
  };

  const handlePayment = () => {
    if (!validatePayment()) return;

    // Send notification for successful payment
    notificationService.sendPaymentSuccessNotification(`₹${amount}`, 'QR Payment');

    (navigation as any).navigate('wallet-payment-confirmation', {
      amount: parseFloat(amount),
      method: 'QR Pay',
      type: 'pay',
      merchant: merchantDetails.name
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ExpoImage source={require('@/assets/images/kumbh.jpeg')} style={styles.logo} contentFit="cover" />
      <Text style={styles.header}>Scan & Pay</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Scan QR Code</Text>
        
        <TouchableOpacity
          style={[styles.scanButton, isScanning && styles.scanButtonActive]}
          onPress={handleScan}
          disabled={isScanning}
        >
          <Text style={styles.scanEmoji}>📷</Text>
          <Text style={styles.scanText}>
            {isScanning ? 'Scanning...' : 'Tap to Scan QR Code'}
          </Text>
        </TouchableOpacity>

        {merchantDetails.name && (
          <View style={styles.merchantCard}>
            <Text style={styles.merchantTitle}>Merchant Details</Text>
            <View style={styles.merchantRow}>
              <Text style={styles.merchantLabel}>Name:</Text>
              <Text style={styles.merchantValue}>{merchantDetails.name}</Text>
            </View>
            <View style={styles.merchantRow}>
              <Text style={styles.merchantLabel}>ID:</Text>
              <Text style={styles.merchantValue}>{merchantDetails.id}</Text>
            </View>
            <View style={styles.merchantRow}>
              <Text style={styles.merchantLabel}>UPI:</Text>
              <Text style={styles.merchantValue}>{merchantDetails.qrCode}</Text>
            </View>
          </View>
        )}

        <Text style={styles.sectionTitle}>Enter Amount</Text>
        
        <TextInput
          style={styles.amountInput}
          placeholder="Enter amount"
          placeholderTextColor="#00000070"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        <View style={styles.predefinedAmounts}>
          {predefinedAmounts.map((value) => (
            <TouchableOpacity
              key={value}
              style={[styles.amountBtn, amount === value.toString() && styles.amountBtnActive]}
              onPress={() => handleAmountSelect(value)}
            >
              <Text style={[styles.amountBtnText, amount === value.toString() && styles.amountBtnTextActive]}>
                ₹{value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.payButton, (!amount || !merchantDetails.name) && styles.payButtonDisabled]}
        onPress={handlePayment}
        disabled={!amount || !merchantDetails.name}
      >
        <Text style={styles.payButtonText}>
          Pay ₹{amount || '0'}
        </Text>
      </TouchableOpacity>
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
  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#e65100',
    marginTop: 10,
  },
  header: {
    marginTop: 12,
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#ffe0b2',
    color: '#e65100',
    fontWeight: 'bold',
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 20,
    marginBottom: 12,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff3e0',
    borderWidth: 1,
    borderColor: '#ff9800',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#e65100',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 12,
  },
  scanButton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e65100',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    marginBottom: 16,
  },
  scanButtonActive: {
    backgroundColor: '#ffe0b2',
    borderColor: '#ff9800',
  },
  scanEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  scanText: {
    color: '#e65100',
    fontWeight: '600',
    fontSize: 16,
  },
  merchantCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ffcc80',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  merchantTitle: {
    color: '#e65100',
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 8,
  },
  merchantRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  merchantLabel: {
    color: '#000',
    opacity: 0.7,
    fontSize: 14,
  },
  merchantValue: {
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
  },
  amountInput: {
    borderWidth: 1,
    borderColor: '#ff7043',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    backgroundColor: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
  predefinedAmounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  amountBtn: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ffcc80',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 8,
  },
  amountBtnActive: {
    backgroundColor: '#e65100',
    borderColor: '#e65100',
  },
  amountBtnText: {
    color: '#000',
    fontWeight: '600',
  },
  amountBtnTextActive: {
    color: '#fff',
  },
  payButton: {
    backgroundColor: '#e65100',
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 12,
  },
  payButtonDisabled: {
    opacity: 0.6,
  },
  payButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});


