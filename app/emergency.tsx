import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  TextInput,
  Modal,
  Linking,
  Dimensions
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { useNotification } from '@/contexts/NotificationContext';

const { width, height } = Dimensions.get('window');

interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  type: 'police' | 'ambulance' | 'fire' | 'personal';
  isPersonal?: boolean;
}

export default function Emergency() {
  const navigation = useNavigation();
  const { notificationService } = useNotification();
  const [isPanicMode, setIsPanicMode] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', number: '' });
  const [medicalInfo, setMedicalInfo] = useState({
    bloodGroup: '',
    allergies: '',
    medications: '',
    emergencyContact: ''
  });

  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { id: '1', name: 'Police', number: '100', type: 'police' },
    { id: '2', name: 'Ambulance', number: '102', type: 'ambulance' },
    { id: '3', name: 'Fire Brigade', number: '101', type: 'fire' },
    { id: '4', name: 'Women Helpline', number: '1091', type: 'police' },
    { id: '5', name: 'Child Helpline', number: '1098', type: 'police' },
    { id: '6', name: 'Senior Citizen Helpline', number: '14567', type: 'police' },
  ]);

  const handleSOSPress = () => {
    Alert.alert(
      'SOS Emergency',
      'Do you want to call emergency services?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call Police (100)', onPress: () => callEmergency('100') },
        { text: 'Call Ambulance (102)', onPress: () => callEmergency('102') },
        { text: 'Panic Mode', onPress: () => activatePanicMode() }
      ]
    );
  };

  const callEmergency = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  const activatePanicMode = () => {
    setIsPanicMode(true);
    
    // Send SOS emergency notification
    notificationService.sendSOSNotification();
    
    Alert.alert(
      'PANIC MODE ACTIVATED',
      'Emergency alerts sent to all contacts. Location shared.',
      [{ text: 'OK', onPress: () => setIsPanicMode(false) }]
    );
  };

  const handleContactPress = (contact: EmergencyContact) => {
    Alert.alert(
      `Call ${contact.name}`,
      `Do you want to call ${contact.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => {
          callEmergency(contact.number);
          // Send notification for emergency contact call
          notificationService.sendEmergencyContactNotification(contact.name);
        }}
      ]
    );
  };

  const addPersonalContact = () => {
    if (newContact.name && newContact.number) {
      const contact: EmergencyContact = {
        id: Date.now().toString(),
        name: newContact.name,
        number: newContact.number,
        type: 'personal',
        isPersonal: true
      };
      setEmergencyContacts([...emergencyContacts, contact]);
      setNewContact({ name: '', number: '' });
      setShowAddContact(false);
    }
  };

  const shareLocation = () => {
    const message = `EMERGENCY: I need help! Please call emergency services immediately.`;
    Linking.openURL(`sms:?body=${encodeURIComponent(message)}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ExpoImage source={require('@/assets/images/kumbh.jpeg')} style={styles.logo} contentFit="cover" />
      <Text style={styles.header}>SOS Emergency</Text>

      {/* SOS Button */}
      <TouchableOpacity
        style={[styles.sosButton, isPanicMode && styles.sosButtonActive]}
        onPress={handleSOSPress}
        activeOpacity={0.8}
      >
        <Text style={styles.sosEmoji}>🚨</Text>
        <Text style={styles.sosText}>SOS</Text>
        <Text style={styles.sosSubtext}>Press for Emergency</Text>
      </TouchableOpacity>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => callEmergency('100')}>
          <Text style={styles.actionEmoji}>👮</Text>
          <Text style={styles.actionText}>Police</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => callEmergency('102')}>
          <Text style={styles.actionEmoji}>🚑</Text>
          <Text style={styles.actionText}>Ambulance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => callEmergency('101')}>
          <Text style={styles.actionEmoji}>🚒</Text>
          <Text style={styles.actionText}>Fire</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={shareLocation}>
          <Text style={styles.actionEmoji}>📍</Text>
          <Text style={styles.actionText}>Share Location</Text>
        </TouchableOpacity>
        {/* New: Missing Person */}
        <TouchableOpacity style={styles.actionButton} onPress={() => Alert.alert('Report Missing', 'missing report is submitted succesfully .')}> 
          <Text style={styles.actionEmoji}>🕵️‍♂️</Text>
          <Text style={styles.actionText}>Missing</Text>
        </TouchableOpacity>
        {/* New: File a Complaint */}
        <TouchableOpacity style={styles.actionButton} onPress={() => Alert.alert('File a Complaint', 'PLease contact police department to file a complaint .')}> 
          <Text style={styles.actionEmoji}>📝</Text>
          <Text style={styles.actionText}>File a Complaint</Text>
        </TouchableOpacity>
      </View>

      {/* Emergency Contacts */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          <TouchableOpacity onPress={() => setShowAddContact(true)}>
            <Text style={styles.addButton}>+ Add Contact</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.contactsGrid}>
          {emergencyContacts.map((contact) => (
            <TouchableOpacity
              key={contact.id}
              style={[styles.contactCard, contact.isPersonal && styles.personalContact]}
              onPress={() => handleContactPress(contact)}
            >
              <Text style={styles.contactEmoji}>
                {contact.type === 'police' ? '👮' : 
                 contact.type === 'ambulance' ? '🚑' : 
                 contact.type === 'fire' ? '🚒' : '👤'}
              </Text>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactNumber}>{contact.number}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Medical Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medical Information</Text>
        <View style={styles.medicalCard}>
          <View style={styles.medicalRow}>
            <Text style={styles.medicalLabel}>Blood Group:</Text>
            <TextInput
              style={styles.medicalInput}
              placeholder="A+, B+, etc."
              value={medicalInfo.bloodGroup}
              onChangeText={(text) => setMedicalInfo({...medicalInfo, bloodGroup: text})}
            />
          </View>
          <View style={styles.medicalRow}>
            <Text style={styles.medicalLabel}>Allergies:</Text>
            <TextInput
              style={styles.medicalInput}
              placeholder="Peanuts, Penicillin, etc."
              value={medicalInfo.allergies}
              onChangeText={(text) => setMedicalInfo({...medicalInfo, allergies: text})}
            />
          </View>
          <View style={styles.medicalRow}>
            <Text style={styles.medicalLabel}>Medications:</Text>
            <TextInput
              style={styles.medicalInput}
              placeholder="Current medications"
              value={medicalInfo.medications}
              onChangeText={(text) => setMedicalInfo({...medicalInfo, medications: text})}
            />
          </View>
        </View>
      </View>

      {/* Emergency Instructions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Instructions</Text>
        <View style={styles.instructionsCard}>
          <Text style={styles.instructionText}>• Stay calm and assess the situation</Text>
          <Text style={styles.instructionText}>• Call emergency services immediately</Text>
          <Text style={styles.instructionText}>• Provide clear location details</Text>
          <Text style={styles.instructionText}>• Follow dispatcher instructions</Text>
          <Text style={styles.instructionText}>• Keep phone line open</Text>
        </View>
      </View>

      {/* Add Contact Modal */}
      <Modal
        visible={showAddContact}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Emergency Contact</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Contact Name"
              value={newContact.name}
              onChangeText={(text) => setNewContact({...newContact, name: text})}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Phone Number"
              value={newContact.number}
              onChangeText={(text) => setNewContact({...newContact, number: text})}
              keyboardType="phone-pad"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalButton} 
                onPress={() => setShowAddContact(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonPrimary]} 
                onPress={addPersonalContact}
              >
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
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
    backgroundColor: '#ffff',
    color: 'blue',
    fontWeight: 'bold',
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 20,
    marginBottom: 16,
  },
  sosButton: {
    width: '100%',
    backgroundColor: '#ff4444',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  sosButtonActive: {
    backgroundColor: '#cc0000',
    transform: [{ scale: 1.1 }],
  },
  sosEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  sosText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sosSubtext: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#ff4444',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    color: '#ff4444',
    fontWeight: 'bold',
    fontSize: 14,
  },
  section: {
    width: '100%',
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 18,
  },
  addButton: {
    color: 'blue',
    fontWeight: '600',
    fontSize: 14,
  },
  contactsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  contactCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  personalContact: {
    borderColor: 'blue',
    backgroundColor: '#fff3e0',
    color:'black'
  },
  contactEmoji: {
    fontSize: 20,
    marginBottom: 6,
  },
  contactName: {
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 2,
  },
  contactNumber: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 12,
  },
  medicalCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 12,
    padding: 16,
  },
  medicalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  medicalLabel: {
    color: '#000',
    fontWeight: '600',
    width: '30%',
    fontSize: 14,
  },
  medicalInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 6,
    padding: 8,
    fontSize: 14,
  },
  instructionsCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 12,
    padding: 16,
  },
  instructionText: {
    color: '#000',
    fontSize: 14,
    marginBottom: 6,
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  modalButtonPrimary: {
    backgroundColor: 'blue',
  },
  modalButtonText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


