import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { useNotification } from '@/contexts/NotificationContext';

type PaymentMethod = 'UPI' | 'Card' | 'NetBanking';

export default function WalletAddMoney() {
  const navigation = useNavigation();
  const { notificationService } = useNotification();
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  const predefinedAmounts = [100, 200, 500, 1000, 2000];

  const banks = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Canara Bank',
    'Union Bank of India'
  ];

  const handleAmountSelect = (value: number) => {
    setAmount(value.toString());
  };

  const validateForm = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return false;
    }
    if (!selectedMethod) {
      Alert.alert('Error', 'Please select a payment method');
      return false;
    }
    
    if (selectedMethod === 'UPI' && !upiId.trim()) {
      Alert.alert('Error', 'Please enter UPI ID');
      return false;
    }
    if (selectedMethod === 'Card' && (!cardNumber || !cardExpiry || !cardCvv)) {
      Alert.alert('Error', 'Please fill all card details');
      return false;
    }
    if (selectedMethod === 'NetBanking' && !selectedBank) {
      Alert.alert('Error', 'Please select a bank');
      return false;
    }
    return true;
  };

  const handlePayment = () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      
      // Send notification for successful payment
      notificationService.sendWalletAddNotification(`₹${amount}`);
      
      navigation.navigate('wallet-payment-confirmation' as never, {
        amount: parseFloat(amount),
        method: selectedMethod,
        type: 'add'
      });
    }, 2000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ExpoImage source={require('@/assets/images/kumbh.jpeg')} style={styles.logo} contentFit="cover" />
      <Text style={styles.header}>Add Money</Text>

      <View style={styles.card}>
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

        <Text style={styles.sectionTitle}>Payment Method</Text>
        
        <TouchableOpacity
          style={[styles.methodBtn, selectedMethod === 'UPI' && styles.methodBtnActive]}
          onPress={() => setSelectedMethod('UPI')}
        >
          <Text style={styles.methodEmoji}>📱</Text>
          <Text style={styles.methodText}>UPI</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.methodBtn, selectedMethod === 'Card' && styles.methodBtnActive]}
          onPress={() => setSelectedMethod('Card')}
        >
          <Text style={styles.methodEmoji}>💳</Text>
          <Text style={styles.methodText}>Credit/Debit Card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.methodBtn, selectedMethod === 'NetBanking' && styles.methodBtnActive]}
          onPress={() => setSelectedMethod('NetBanking')}
        >
          <Text style={styles.methodEmoji}>🏦</Text>
          <Text style={styles.methodText}>Net Banking</Text>
        </TouchableOpacity>

        {selectedMethod === 'UPI' && (
          <View style={styles.methodDetails}>
            <TextInput
              style={styles.input}
              placeholder="Enter UPI ID (e.g., user@upi)"
              placeholderTextColor="#00000070"
              value={upiId}
              onChangeText={setUpiId}
            />
          </View>
        )}

        {selectedMethod === 'Card' && (
          <View style={styles.methodDetails}>
            <TextInput
              style={styles.input}
              placeholder="Card Number"
              placeholderTextColor="#00000070"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
              maxLength={16}
            />
            <View style={styles.cardRow}>
              <TextInput
                style={[styles.input, styles.cardInput]}
                placeholder="MM/YY"
                placeholderTextColor="#00000070"
                value={cardExpiry}
                onChangeText={setCardExpiry}
                maxLength={5}
              />
              <TextInput
                style={[styles.input, styles.cardInput]}
                placeholder="CVV"
                placeholderTextColor="#00000070"
                value={cardCvv}
                onChangeText={setCardCvv}
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
              />
            </View>
          </View>
        )}

        {selectedMethod === 'NetBanking' && (
          <View style={styles.methodDetails}>
            <View style={styles.bankDropdown}>
              {banks.map((bank) => (
                <TouchableOpacity
                  key={bank}
                  style={[styles.bankOption, selectedBank === bank && styles.bankOptionActive]}
                  onPress={() => setSelectedBank(bank)}
                >
                  <Text style={[styles.bankText, selectedBank === bank && styles.bankTextActive]}>
                    {bank}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[styles.payButton, isLoading && styles.payButtonDisabled]}
        onPress={handlePayment}
        disabled={isLoading}
      >
        <Text style={styles.payButtonText}>
          {isLoading ? 'Processing...' : `Pay ₹${amount || '0'}`}
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
    marginBottom: 20,
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
  methodBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ffcc80',
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
  },
  methodBtnActive: {
    backgroundColor: '#ffe0b2',
    borderColor: '#e65100',
  },
  methodEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  methodText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
  methodDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#ffcc80',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ff7043',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardInput: {
    width: '48%',
  },
  bankDropdown: {
    maxHeight: 200,
  },
  bankOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ffcc80',
  },
  bankOptionActive: {
    backgroundColor: '#ffe0b2',
  },
  bankText: {
    color: '#000',
    fontSize: 16,
  },
  bankTextActive: {
    color: '#e65100',
    fontWeight: '600',
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


