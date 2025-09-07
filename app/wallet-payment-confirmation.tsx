import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { Colors } from '@/constants/Colors';

type PaymentConfirmationParams = {
  amount: number;
  method: string;
  type: 'add' | 'pay' | 'withdraw';
  merchant?: {
    name: string;
    id: string;
    qrCode: string;
  };
  bankDetails?: {
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
    bank: string;
  };
};

export default function WalletPaymentConfirmation() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as PaymentConfirmationParams;
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    if (params) {
      processTransaction();
    }
  }, [params]);

  const processTransaction = () => {
    setIsProcessing(true);
    
    // Simulate transaction processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTransactionId('TXN' + Date.now().toString().slice(-8));
    }, 3000);
  };

  const getTransactionTypeText = () => {
    switch (params.type) {
      case 'add': return 'Money Added';
      case 'pay': return 'Payment Sent';
      case 'withdraw': return 'Money Withdrawn';
      default: return 'Transaction';
    }
  };

  const getMethodIcon = () => {
    switch (params.method) {
      case 'UPI': return '📱';
      case 'Card': return '💳';
      case 'NetBanking': return '🏦';
      case 'QR Pay': return '📷';
      case 'Bank Transfer': return '🏦';
      default: return '💰';
    }
  };

  const handleBackToWallet = () => {
    navigation.navigate('wallet' as never);
  };

  if (!params) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Invalid transaction details</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ExpoImage source={require('@/assets/images/kumbh.jpeg')} style={styles.logo} contentFit="cover" />
      <Text style={styles.header}>Transaction Confirmation</Text>

      {isProcessing && (
        <View style={styles.processingCard}>
          <Text style={styles.processingEmoji}>⏳</Text>
          <Text style={styles.processingTitle}>Processing Transaction</Text>
          <Text style={styles.processingText}>Please wait while we process your {params.type === 'add' ? 'payment' : params.type === 'pay' ? 'payment' : 'withdrawal'}...</Text>
        </View>
      )}

      {isSuccess && (
        <View style={styles.successCard}>
          <Text style={styles.successEmoji}>✅</Text>
          <Text style={styles.successTitle}>{getTransactionTypeText()}</Text>
          <Text style={styles.successAmount}>₹{params.amount.toFixed(2)}</Text>
          
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Transaction ID:</Text>
              <Text style={styles.detailValue}>{transactionId}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Method:</Text>
              <Text style={styles.detailValue}>{getMethodIcon()} {params.method}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date:</Text>
              <Text style={styles.detailValue}>{new Date().toLocaleString()}</Text>
            </View>
            
            {params.merchant && (
              <>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Merchant:</Text>
                  <Text style={styles.detailValue}>{params.merchant.name}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Merchant ID:</Text>
                  <Text style={styles.detailValue}>{params.merchant.id}</Text>
                </View>
              </>
            )}
            
            {params.bankDetails && (
              <>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Bank:</Text>
                  <Text style={styles.detailValue}>{params.bankDetails.bank}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Account:</Text>
                  <Text style={styles.detailValue}>****{params.bankDetails.accountNumber.slice(-4)}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Account Holder:</Text>
                  <Text style={styles.detailValue}>{params.bankDetails.accountHolderName}</Text>
                </View>
              </>
            )}
          </View>

          <Text style={styles.statusText}>Transaction Successful!</Text>
        </View>
      )}

      {isSuccess && (
        <TouchableOpacity style={styles.backButton} onPress={handleBackToWallet}>
          <Text style={styles.backButtonText}>Back to Wallet</Text>
        </TouchableOpacity>
      )}
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
    marginBottom: 12,
  },
  processingCard: {
    width: '100%',
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 12,
  },
  processingEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  processingTitle: {
    color: Colors.light.accentBlue,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8,
  },
  processingText: {
    color: Colors.light.text,
    opacity: 0.7,
    textAlign: 'center',
    fontSize: 16,
  },
  successCard: {
    width: '100%',
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.success,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 12,
  },
  successEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  successTitle: {
    color: Colors.light.success,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8,
  },
  successAmount: {
    color: Colors.light.accentBlue,
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 20,
  },
  detailsCard: {
    width: '100%',
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    color: Colors.light.text,
    opacity: 0.7,
    fontSize: 14,
  },
  detailValue: {
    color: Colors.light.text,
    fontWeight: '600',
    fontSize: 14,
  },
  statusText: {
    color: Colors.light.success,
    fontWeight: 'bold',
    fontSize: 18,
  },
  backButton: {
    backgroundColor: Colors.light.accentBlue,
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 12,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  errorText: {
    color: Colors.light.error,
    fontSize: 18,
    textAlign: 'center',
  },
});

