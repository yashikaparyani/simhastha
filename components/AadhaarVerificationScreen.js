import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Image as ExpoImage } from 'expo-image';

export default function AadhaarVerificationScreen({ navigation }) {
  const [aadhaar, setAadhaar] = useState('');
  const [otp, setOtp] = useState('');
  const [otpRequested, setOtpRequested] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);

  const generateOTP = () => {
    // Generate a 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleRequestOTP = () => {
    if (aadhaar.length !== 16) {
      alert('Please enter a valid 16-digit Aadhaar number');
      return;
    }
    
    // Show the OTP field immediately
    setOtpRequested(true);
    setIsOtpLoading(true);
    setOtp('');
    setIsOtpGenerated(false);
    
    // Simulate API call delay
    setTimeout(() => {
      const newOtp = generateOTP();
      setOtp(newOtp);
      setIsOtpGenerated(true);
      setIsOtpLoading(false);
    }, 2000 + Math.random() * 1000); // Random delay between 2-3 seconds
  };

  const handleVerify = () => {
    if (!otp) {
      alert('Please enter the OTP');
      return;
    }
    
    // Here you would typically verify the OTP with your backend
    console.log('Verifying OTP:', otp);
    navigation.navigate('login'); // Navigate to login after verification
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ExpoImage
        source={require('@/assets/images/kumbh.jpeg')}
        style={styles.logo}
        contentFit="cover"
      />
      <Text style={styles.title}>Aadhaar Verification</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.subtitle}>Generate OTP to verify Aadhaar</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter your Aadhaar no"
          placeholderTextColor="#00000070"
          value={aadhaar}
          onChangeText={setAadhaar}
          keyboardType="number-pad"
          maxLength={16}
        />

        <TextInput
          style={[
            styles.input, 
            !otpRequested && styles.hidden,
            isOtpLoading && styles.disabledInput
          ]}
          placeholder={isOtpLoading ? 'Generating OTP...' : 'Enter OTP'}
          placeholderTextColor="#00000070"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          maxLength={6}
          editable={isOtpGenerated}
        />

        <View style={styles.otpContainer}>
          {!otpRequested ? (
            <TouchableOpacity 
              style={[styles.otpButton, isOtpLoading && styles.disabledButton]}
              onPress={handleRequestOTP}
              disabled={isOtpLoading}
            >
              <Text style={styles.otpButtonText}>
                {isOtpLoading ? 'Sending OTP...' : 'Request OTP'}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>Didn't receive OTP?</Text>
              <TouchableOpacity>
                <Text style={[styles.resendText, {color: '#e65100'}]}> Resend OTP</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <TouchableOpacity 
          style={styles.verifyButton}
          onPress={handleVerify}
        >
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>मेरा आधार, मेरी पहचान</Text>
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.navigate('index')}
      >
        <Text style={styles.backButtonText}>Back to Signup</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff8e7',
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 25,
    marginTop: 35,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: '#e65100',
    shadowColor: '#ff9800',
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    color: '#e65100',
    fontWeight: 'bold',
    marginBottom: 25,
    backgroundColor: '#ffe0b2',
    width: '100%',
    textAlign: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    letterSpacing: 1,
    shadowColor: '#ff7043',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 25,
    backgroundColor: '#fff3e0',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ff9800',
  },
  subtitle: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ff7043',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    backgroundColor: '#ffffff',
    fontSize: 16,
    color: '#000',
  },
  otpContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  otpButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#e65100',
    width: '60%',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  otpButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  hidden: {
    height: 0,
    opacity: 0,
    margin: 0,
    padding: 0,
    borderWidth: 0,
  },
  disabledInput: {
    backgroundColor: '#f5f5f5',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  resendText: {
    color: '#000',
    fontSize: 14,
  },
  verifyButton: {
    backgroundColor: '#e65100',
    paddingVertical: 16,
    borderRadius: 14,
    width: '92%',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#ff9800',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
    alignSelf: 'center',
  },
  verifyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  footerText: {
    color: '#e65100',
    fontSize: 18,
    marginTop: 20,
    fontStyle: 'italic',
  },
  backButton: {
    marginTop: 15,
    padding: 10,
  },
  backButtonText: {
    color: '#e65100',
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});