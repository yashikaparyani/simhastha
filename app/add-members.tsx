import React, { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { Image as ExpoImage } from 'expo-image';

type Member = {
  id: string;
  name: string;
  age: string;
  aadhaar: string;
  contact: string;
  relation: string;
  photoUri?: string;
};

export default function AddMembers() {
  const navigation = useNavigation();
  const [mode, setMode] = useState<'form' | 'list'>('form');
  const [members, setMembers] = useState<Member[]>([]);
  const [form, setForm] = useState<Omit<Member, 'id'>>({ name: '', age: '', aadhaar: '', contact: '', relation: '', photoUri: undefined });

  const isFormValid = useMemo(() => form.name && form.age && form.aadhaar && form.contact && form.relation, [form]);

  const handleChange = (key: keyof typeof form, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSave = () => {
    if (!isFormValid) return;
    const newMember: Member = { id: Date.now().toString(), ...form };
    setMembers(prev => [...prev, newMember]);
    setMode('list');
  };

  const handleAddAnother = () => {
    setForm({ name: '', age: '', aadhaar: '', contact: '', relation: '', photoUri: undefined });
    setMode('form');
  };

  const handleRemove = (id: string) => setMembers(prev => prev.filter(m => m.id !== id));

  if (mode === 'list') {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Registered Members</Text>

        {members.map(m => (
          <View key={m.id} style={styles.memberCard}>
            <View style={styles.memberRow}>
              <View style={styles.avatarBox}>
                <ExpoImage source={m.photoUri ? { uri: m.photoUri } : require('@/assets/images/kumbh.jpeg')} style={styles.avatar} contentFit="cover" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.memberLine}><Text style={styles.bold}>Name:</Text> <Text style={styles.linkText}>{m.name}</Text></Text>
                <Text style={styles.memberLine}><Text style={styles.bold}>Age:</Text> {m.age}</Text>
                <Text style={styles.memberLine}><Text style={styles.bold}>Contact:</Text> <Text style={styles.linkText}>{m.contact}</Text></Text>
                <Text style={styles.memberLine}><Text style={styles.bold}>Aadhaar:</Text> xxxx xxxx {m.aadhaar.slice(-4)}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.removeBtn} onPress={() => handleRemove(m.id)}>
              <Text style={styles.removeBtnText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.addAnotherOutline} onPress={handleAddAnother}>
          <Text style={styles.addAnotherOutlineText}>+ Add Another Member</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add Family Member</Text>

      <View style={styles.formCard}>
        <TouchableOpacity style={styles.cameraBox} activeOpacity={0.8}>
          <Text style={styles.cameraText}>📷 Camera Access</Text>
        </TouchableOpacity>

        <View style={styles.inputGroup}>
          <TextInput style={styles.input} placeholder="Enter your name" placeholderTextColor="#00000070" value={form.name} onChangeText={t => handleChange('name', t)} />
          <TextInput style={styles.input} placeholder="Enter your age" placeholderTextColor="#00000070" value={form.age} onChangeText={t => handleChange('age', t)} keyboardType="number-pad" />
          <TextInput style={styles.input} placeholder="Enter your aadhar no" placeholderTextColor="#00000070" value={form.aadhaar} onChangeText={t => handleChange('aadhaar', t)} keyboardType="number-pad" maxLength={16} />
          <TextInput style={styles.input} placeholder="Enter your emergency contact" placeholderTextColor="#00000070" value={form.contact} onChangeText={t => handleChange('contact', t)} keyboardType="phone-pad" />
          <TextInput style={styles.input} placeholder="Enter your relation" placeholderTextColor="#00000070" value={form.relation} onChangeText={t => handleChange('relation', t)} />
        </View>

        <TouchableOpacity style={[styles.saveBtn, !isFormValid && { opacity: 0.6 }]} onPress={handleSave} disabled={!isFormValid}>
          <Text style={styles.saveBtnText}>Save Member</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addAnother} onPress={handleAddAnother}>
          <Text style={styles.addAnotherText}>+ Add Another Member</Text>
        </TouchableOpacity>
      </View>
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
  header: {
    marginTop: 10,
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#ffe0b2',
    color: '#e65100',
    fontWeight: 'bold',
    paddingVertical: 14,
    borderRadius: 10,
    fontSize: 20,
    marginBottom: 16,
  },
  formCard: {
    width: '100%',
    backgroundColor: '#fff3e0',
    borderWidth: 1,
    borderColor: '#ff9800',
    borderRadius: 16,
    padding: 16,
  },
  cameraBox: {
    alignSelf: 'center',
    width: 130,
    height: 150,
    backgroundColor: '#fff1cc',
    borderWidth: 1,
    borderColor: '#ffcc80',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  cameraText: {
    color: '#000',
    opacity: 0.7,
  },
  inputGroup: {
    width: '100%',
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ff7043',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    backgroundColor: '#ffffff',
    fontSize: 16,
    color: '#000',
  },
  saveBtn: {
    backgroundColor: '#e65100',
    paddingVertical: 16,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#ff9800',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  addAnother: {
    marginTop: 12,
    backgroundColor: '#ffe0b2',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  addAnotherText: {
    color: '#000',
    opacity: 0.8,
    fontWeight: '600',
  },
  memberCard: {
    width: '100%',
    backgroundColor: '#fff3e0',
    borderWidth: 1,
    borderColor: '#ffcc80',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  memberRow: {
    flexDirection: 'row',
    gap: 12,
  },
  avatarBox: {
    width: 80,
    height: 80,
    borderRadius: 6,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  bold: { fontWeight: '700' },
  linkText: { color: '#e65100', fontWeight: '600' },
  memberLine: { color: '#000', marginBottom: 2 },
  removeBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#ff8a65',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginTop: 8,
  },
  removeBtnText: { color: '#fff', fontWeight: '700' },
  addAnotherOutline: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ffcc80',
    backgroundColor: '#fff8e7',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  addAnotherOutlineText: { color: '#000', fontWeight: '600' },
});


