import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNotification } from '@/contexts/NotificationContext';

export default function PaymentScreen() {
  const navigation = useNavigation();
  const { notificationService } = useNotification();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [upiId, setUpiId] = useState('');
  const [bankName, setBankName] = useState('');

  const isValid = paymentMethod && (
    (paymentMethod === 'card' && cardNumber && expiryDate && cvv && cardName) ||
    (paymentMethod === 'upi' && upiId) ||
    (paymentMethod === 'netbanking' && bankName)
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Payment</Text>
      
      <View style={styles.card}>
        <Text style={styles.title}>Complete Your Booking</Text>
        <Text style={styles.subtitle}>Secure payment for your Simhastha journey</Text>
        
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Booking Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Transport:</Text>
            <Text style={styles.summaryValue}>₹2,500</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Accommodation:</Text>
            <Text style={styles.summaryValue}>₹4,000</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Parking:</Text>
            <Text style={styles.summaryValue}>₹800</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalValue}>₹7,300</Text>
          </View>
        </View>
        
        <Text style={styles.section}>Payment Method</Text>
        <View style={styles.paymentContainer}>
          <TouchableOpacity 
            style={[styles.paymentBtn, paymentMethod === 'card' && styles.paymentBtnActive]} 
            onPress={() => setPaymentMethod('card')}
          >
            <Text style={[styles.paymentText, paymentMethod === 'card' && styles.paymentTextActive]}>💳 Card</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.paymentBtn, paymentMethod === 'upi' && styles.paymentBtnActive]} 
            onPress={() => setPaymentMethod('upi')}
          >
            <Text style={[styles.paymentText, paymentMethod === 'upi' && styles.paymentTextActive]}>📱 UPI</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.paymentBtn, paymentMethod === 'netbanking' && styles.paymentBtnActive]} 
            onPress={() => setPaymentMethod('netbanking')}
          >
            <Text style={[styles.paymentText, paymentMethod === 'netbanking' && styles.paymentTextActive]}>🏦 Net Banking</Text>
          </TouchableOpacity>
        </View>

        {paymentMethod === 'card' && (
          <>
            <TextInput 
              style={styles.input} 
              placeholder="Card Number (e.g., 1234 5678 9012 3456)" 
              placeholderTextColor="#00000070" 
              value={cardNumber} 
              onChangeText={setCardNumber}
              keyboardType="numeric"
            />
            <View style={styles.rowInputs}>
              <TextInput 
                style={[styles.input, styles.halfInput]} 
                placeholder="MM/YY" 
                placeholderTextColor="#00000070" 
                value={expiryDate} 
                onChangeText={setExpiryDate}
              />
              <TextInput 
                style={[styles.input, styles.halfInput]} 
                placeholder="CVV" 
                placeholderTextColor="#00000070" 
                value={cvv} 
                onChangeText={setCvv}
                keyboardType="numeric"
                secureTextEntry
              />
            </View>
            <TextInput 
              style={styles.input} 
              placeholder="Cardholder Name" 
              placeholderTextColor="#00000070" 
              value={cardName} 
              onChangeText={setCardName}
            />
          </>
        )}

        {paymentMethod === 'upi' && (
          <TextInput 
            style={styles.input} 
            placeholder="UPI ID (e.g., user@paytm)" 
            placeholderTextColor="#00000070" 
            value={upiId} 
            onChangeText={setUpiId}
          />
        )}

        {paymentMethod === 'netbanking' && (
          <TextInput 
            style={styles.input} 
            placeholder="Select Bank" 
            placeholderTextColor="#00000070" 
            value={bankName} 
            onChangeText={setBankName}
          />
        )}
        
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            &quot;Secure payment gateway - Your transaction is protected&quot;
            {"\n"}– सुरक्षित भुगतान गेटवे – आपका लेनदेन सुरक्षित है –
          </Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.primaryBtn, !isValid && {opacity: 0.6}]} 
        disabled={!isValid}
        onPress={() => {
          // Send notification for successful payment
          notificationService.sendPaymentSuccessNotification('₹7,300', 'Trip Booking');
          
          // For now, navigate to confirmation for public transport
          // In real app, this would be determined by the transport type selected earlier
          navigation.navigate('confirmation-screen' as never);
        }}
      >
        <Text style={styles.primaryBtnText}>Pay ₹7,300</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', padding: 16, backgroundColor: '#fff' },
  header: { width: '100%', textAlign: 'center', backgroundColor: '#fff', color: 'blue', fontWeight: 'bold', paddingVertical: 12, borderRadius: 10, fontSize: 20, marginBottom: 12 },
  card: { width: '100%', backgroundColor: 'white', borderWidth: 1, borderColor: 'blue', borderRadius: 16, padding: 14 },
  title: { color: 'blue', fontWeight: '700', marginBottom: 4, fontSize: 18 },
  subtitle: { color: 'blue', opacity: 0.8, marginBottom: 16, fontSize: 14 },
  
  summaryBox: { backgroundColor: '#ffffff', borderWidth: 1, borderColor: 'blue', borderRadius: 10, padding: 16, marginBottom: 16 },
  summaryTitle: { color: 'black', fontWeight: '700', fontSize: 16, marginBottom: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { color: '#000', fontSize: 14 },
  summaryValue: { color: '#000', fontWeight: '600', fontSize: 14 },
  totalRow: { borderTopWidth: 1, borderTopColor: 'blue', paddingTop: 8, marginTop: 8 },
  totalLabel: { color: 'blue', fontWeight: '700', fontSize: 16 },
  totalValue: { color: 'blue', fontWeight: '700', fontSize: 18 },
  
  section: { color: '', fontWeight: '700', marginBottom: 10, marginTop: 16, fontSize: 16 },
  
  paymentContainer: { flexDirection: 'row', marginBottom: 16 },
  paymentBtn: { flex: 1, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#fff', borderRadius: 10, paddingVertical: 12, marginHorizontal: 4, alignItems: 'center' },
  paymentBtnActive: { backgroundColor: '#fff', borderColor: 'black', borderWidth: 2 },
  paymentText: { color: 'blue', fontWeight: '600', fontSize: 14 },
  paymentTextActive: { color: 'blue', fontWeight: '700' },
  
  input: { backgroundColor: '#ffffff', borderWidth: 1, borderColor: 'blue', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 16, marginBottom: 12, fontSize: 16, color: '#000' },
  rowInputs: { flexDirection: 'row', justifyContent: 'space-between' },
  halfInput: { width: '48%' },
  
  noteBox: { backgroundColor: '#ff8f00', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 16, alignItems: 'center', marginTop: 8 },
  noteText: { color: '#fff', textAlign: 'center', fontSize: 14, lineHeight: 20 },
  
  primaryBtn: { backgroundColor: 'blue', paddingVertical: 14, borderRadius: 12, alignItems: 'center', width: '100%', marginTop: 16 },
  primaryBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
