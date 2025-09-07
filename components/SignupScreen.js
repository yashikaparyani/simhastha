import React, { useState } from 'react';  
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';  
import { Image as ExpoImage } from 'expo-image';  
import { Colors } from '@/constants/Colors';
  
export default function SignupScreen({ navigation }) {  
  const [form, setForm] = useState({  
    email: '',  
    name: '',  
    mobile: '',  
    city: '',  
    address: '',  
    occupation: '',  
    password: '',  
    referenceId: '', // <-- new optional field
  });  
  
  const handleChange = (field, value) => setForm({ ...form, [field]: value });  
  
  return (  
    <ScrollView contentContainerStyle={styles.container}>  
      <ExpoImage  
        source={require('@/assets/images/kumbh.jpeg')}  
        style={styles.logo}  
        contentFit="cover"  
      />  
      <Text style={styles.title}>Create Account</Text>  
      <View style={styles.inputContainer}>  
        <TextInput   
          style={styles.input}   
          placeholder="Enter your email"   
          placeholderTextColor="#00000070"  
          value={form.email}   
          onChangeText={t => handleChange('email', t)}   
        />  
        <TextInput   
          style={styles.input}   
          placeholder="Enter your name"   
          placeholderTextColor="#00000070"  
          value={form.name}   
          onChangeText={t => handleChange('name', t)}   
        />  
        <TextInput   
          style={styles.input}   
          placeholder="Enter your mobile no"   
          placeholderTextColor="#00000070"  
          value={form.mobile}   
          onChangeText={t => handleChange('mobile', t)}   
          keyboardType="phone-pad"   
        />  
        <TextInput   
          style={styles.input}   
          placeholder="Enter your city"   
          placeholderTextColor="#00000070"  
          value={form.city}   
          onChangeText={t => handleChange('city', t)}   
        />  
        <TextInput   
          style={styles.input}   
          placeholder="Enter your address"   
          placeholderTextColor="#00000070"  
          value={form.address}   
          onChangeText={t => handleChange('address', t)}   
        />  
        <TextInput   
          style={styles.input}   
          placeholder="Enter your occupation"   
          placeholderTextColor="#00000070"  
          value={form.occupation}   
          onChangeText={t => handleChange('occupation', t)}   
        />  
        <TextInput   
          style={styles.input}   
          placeholder="Enter your password"   
          placeholderTextColor="#00000070"  
          value={form.password}   
          onChangeText={t => handleChange('password', t)}   
          secureTextEntry   
        />  
        {/* Optional Reference ID field */}
        <TextInput
          style={styles.input}
          placeholder="Reference ID (optional)"
          placeholderTextColor="#00000070"
          value={form.referenceId}
          onChangeText={t => handleChange('referenceId', t)}
        />
      </View>  
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('aadhaar-verification')}
      >  
        <Text style={styles.buttonText}>Get Started</Text>  
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
  
  button: {  
    backgroundColor: Colors.light.accentBlue,  
    paddingVertical: 16,  
    paddingHorizontal: 60,  
    borderRadius: 14,  
    width: '92%',  
    alignItems: 'center',  
    marginTop: 20,  
    shadowColor: '#ff9800',  
    shadowOpacity: 0.5,  
    shadowRadius: 10,  
    elevation: 6,  
  },  
  
  buttonText: {  
    color: '#fff',  
    fontWeight: 'bold',  
    fontSize: 20,  
    letterSpacing: 1,  
  },  
});