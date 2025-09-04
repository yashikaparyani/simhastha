import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { useNotification } from '@/contexts/NotificationContext';

export default function WalletWithdraw() {
  const navigation = useNavigation();
  const { notificationService } = useNotification();
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  const currentBalance = 1250; // This should come from wallet context
  const minWithdrawal = 100;
  const maxWithdrawal = currentBalance;

  const predefinedAmounts = [100, 200, 500, 1000];

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
    if (value <= maxWithdrawal) {
      setAmount(value.toString());
    } else {
      Alert.alert('Error', `Maximum withdrawal amount is ₹${maxWithdrawal}`);
    }
  };

  const validateForm = () => {
    if (!amount || parseFloat(amount) < minWithdrawal) {
      Alert.alert('Error', `Minimum withdrawal amount is ₹${minWithdrawal}`);
      return false;
    }
    if (parseFloat(amount) > maxWithdrawal) {
      Alert.alert('Error', `Maximum withdrawal amount is ₹${maxWithdrawal}`);
      return false;
    }
    if (!accountNumber || accountNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid account number');
      return false;
    }
    if (!ifscCode || ifscCode.length !== 11) {
      Alert.alert('Error', 'Please enter a valid IFSC code');
      return false;
    }
    if (!accountHolderName.trim()) {
      Alert.alert('Error', 'Please enter account holder name');
      return false;
    }
    if (!selectedBank) {
      Alert.alert('Error', 'Please select a bank');
      return false;
    }
    return true;
  };

  const handleWithdraw = () => {
    if (!validateForm()) return;

    // Send notification for successful withdrawal
    notificationService.sendWalletWithdrawNotification(`₹${amount}`);

    navigation.navigate('wallet-payment-confirmation' as never, {
      amount: parseFloat(amount),
      method: 'Bank Transfer',
      type: 'withdraw',
      bankDetails: {
        accountNumber,
        ifscCode,
        accountHolderName,
        bank: selectedBank
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ExpoImage source={require('@/assets/images/kumbh.jpeg')} style={styles.logo} contentFit="cover" />
      <Text style={styles.header}>Withdraw Money</Text>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceValue}>₹{currentBalance.toFixed(2)}</Text>
        <Text style={styles.limitText}>
          Min: ₹{minWithdrawal} | Max: ₹{maxWithdrawal}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Withdrawal Amount</Text>
        
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
              style={[
                styles.amountBtn, 
                amount === value.toString() && styles.amountBtnActive,
                value > maxWithdrawal && styles.amountBtnDisabled
              ]}
              onPress={() => handleAmountSelect(value)}
              disabled={value > maxWithdrawal}
            >
              <Text style={[
                styles.amountBtnText, 
                amount === value.toString() && styles.amountBtnTextActive,
                value > maxWithdrawal && styles.amountBtnTextDisabled
              ]}>
                ₹{value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Bank Account Details</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Account Number"
          placeholderTextColor="#00000070"
          value={accountNumber}
          onChangeText={setAccountNumber}
          keyboardType="numeric"
          maxLength={20}
        />

        <TextInput
          style={styles.input}
          placeholder="IFSC Code"
          placeholderTextColor="#00000070"
          value={ifscCode}
          onChangeText={(text) => setIfscCode(text.toUpperCase())}
          maxLength={11}
          autoCapitalize="characters"
        />

        <TextInput
          style={styles.input}
          placeholder="Account Holder Name"
          placeholderTextColor="#00000070"
          value={accountHolderName}
          onChangeText={setAccountHolderName}
          autoCapitalize="words"
        />

        <View style={styles.bankDropdown}>
          <Text style={styles.dropdownLabel}>Select Bank</Text>
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

      <TouchableOpacity
        style={[styles.withdrawButton, !amount && styles.withdrawButtonDisabled]}
        onPress={handleWithdraw}
        disabled={!amount}
      >
        <Text style={styles.withdrawButtonText}>
          Withdraw ₹{amount || '0'}
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
  balanceCard: {
    width: '100%',
    backgroundColor: '#fff3e0',
    borderWidth: 1,
    borderColor: '#ff9800',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  balanceLabel: {
    color: '#000',
    opacity: 0.7,
    marginBottom: 6,
  },
  balanceValue: {
    color: '#e65100',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  limitText: {
    color: '#000',
    opacity: 0.6,
    fontSize: 12,
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
  amountBtnDisabled: {
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
  },
  amountBtnText: {
    color: '#000',
    fontWeight: '600',
  },
  amountBtnTextActive: {
    color: '#fff',
  },
  amountBtnTextDisabled: {
    color: '#999',
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
  bankDropdown: {
    marginTop: 8,
  },
  dropdownLabel: {
    color: '#e65100',
    fontWeight: '600',
    marginBottom: 8,
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
  withdrawButton: {
    backgroundColor: '#e65100',
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 12,
  },
  withdrawButtonDisabled: {
    opacity: 0.6,
  },
  withdrawButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});


