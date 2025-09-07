import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { Colors } from '@/constants/Colors';

export default function AadhaarVerificationScreen({ navigation }) {
  const [aadhaar, setAadhaar] = useState('');
  const [otp, setOtp] = useState('');
  const [otpRequested, setOtpRequested] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const hiddenOtpRef = useRef(null);

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
    if (otp.length !== 6) {
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

        {/* OTP six-box input */}
        {otpRequested && (
          <View style={styles.otpBoxesWrapper}>
            <TouchableOpacity onPress={() => hiddenOtpRef.current?.focus()} activeOpacity={1}>
              <View style={styles.otpBoxesRow}>
                {Array.from({ length: 6 }).map((_, idx) => {
                  const char = otp[idx] ?? '';
                  const isFilled = Boolean(char);
                  return (
                    <View
                      key={idx}
                      style={[
                        styles.otpBox,
                        isFilled && styles.otpBoxFilled,
                        isOtpLoading && styles.disabledInput,
                      ]}
                    >
                      <Text style={styles.otpChar}>{char}</Text>
                    </View>
                  );
                })}
              </View>
            </TouchableOpacity>
            {/* Hidden input to capture numeric entry */}
            <TextInput
              ref={hiddenOtpRef}
              style={styles.hidden}
              value={otp}
              onChangeText={(t) => setOtp(t.replace(/\D/g, '').slice(0, 6))}
              keyboardType="number-pad"
              maxLength={6}
              editable={isOtpGenerated}
              autoFocus
            />
          </View>
        )}

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
                <Text style={[styles.resendText, {color: Colors.light.accentOrange}]}> Resend OTP</Text>
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
    backgroundColor: Colors.light.background,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 25,
    marginTop: 35,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: Colors.light.accentOrange,
    shadowColor: '#ff9800',
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    color: Colors.light.accentBlue,
    fontWeight: 'bold',
    marginBottom: 25,
    backgroundColor: Colors.light.card,
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
    backgroundColor: Colors.light.card,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  subtitle: {
    color: Colors.light.text,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    backgroundColor: Colors.light.background,
    fontSize: 16,
    color: Colors.light.text,
  },
  otpBoxesWrapper: {
    marginBottom: 14,
    alignItems: 'center',
  },
  otpBoxesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  otpBox: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderColor: Colors.light.accentBlue,
    borderRadius: 8,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  otpBoxFilled: {
    borderColor: Colors.light.accentOrange,
  },
  otpChar: {
    fontSize: 20,
    color: Colors.light.text,
    fontWeight: 'bold',
  },
  otpContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  otpButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.light.accentBlue,
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
    color: Colors.light.text,
    fontSize: 14,
  },
  verifyButton: {
    backgroundColor: Colors.light.accentBlue,
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
    color: Colors.light.accentOrange,
    fontSize: 18,
    marginTop: 20,
    fontStyle: 'italic',
  },
  backButton: {
    marginTop: 15,
    padding: 10,
  },
  backButtonText: {
    color: Colors.light.accentBlue,
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});