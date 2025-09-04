import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Image as ExpoImage } from 'expo-image';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login with:', { email, password });
    
    // Check for admin credentials
    if (email === 'admin@simhastha.com' && password === 'admin123') {
      navigation.navigate('admin-dashboard');
    } else if (email === 'superadmin@simhastha.com' && password === 'superadmin123') {
      navigation.navigate('superadmin-dashboard');
    } else {
      // Regular user login
      navigation.navigate('(tabs)');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ExpoImage
        source={require('@/assets/images/kumbh.jpeg')}
        style={styles.logo}
        contentFit="cover"
      />
      <Text style={styles.title}>Login</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email ID"
          placeholderTextColor="black"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Password"
            placeholderTextColor="black"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity 
            style={styles.showPasswordButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.showPasswordText}>
              {showPassword ? 'HIDE' : 'SHOW'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('index')}>
            <Text style={[styles.signupText, { color: '#FFD54F' }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  showPasswordButton: {
    position: 'absolute',
    right: 15,
    padding: 10,
  },
  showPasswordText: {
    color: '#e65100',
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#e65100',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
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
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  signupText: {
    color: '#000',
    fontSize: 15,
    opacity: 0.9,
  },
});
