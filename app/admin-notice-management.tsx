import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  FlatList 
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { Colors } from '@/constants/Colors';

interface Notice {
  id: string;
  text: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminNoticeManagement() {
  const navigation = useNavigation();
  const [newNotice, setNewNotice] = useState('');
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: '1',
      text: 'सिंहस्थ मेला 2028 में आपका स्वागत है - Welcome to Simhastha Mela 2028',
      isActive: true,
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      text: 'महाकालेश्वर मंदिर में विशेष दर्शन की व्यवस्था - Special darshan arrangements at Mahakaleshwar Temple',
      isActive: true,
      createdAt: '2024-01-14',
    },
    {
      id: '3',
      text: 'पार्किंग सुविधा उपलब्ध - Parking facilities available',
      isActive: false,
      createdAt: '2024-01-13',
    },
  ]);

  const handleAddNotice = () => {
    if (!newNotice.trim()) {
      Alert.alert('Error', 'Please enter a notice text');
      return;
    }

    const notice: Notice = {
      id: Date.now().toString(),
      text: newNotice.trim(),
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setNotices(prev => [notice, ...prev]);
    setNewNotice('');
    Alert.alert('Success', 'Notice added successfully');
  };

  const handleToggleNotice = (id: string) => {
    setNotices(prev => 
      prev.map(notice => 
        notice.id === id 
          ? { ...notice, isActive: !notice.isActive }
          : notice
      )
    );
  };

  const handleDeleteNotice = (id: string) => {
    Alert.alert(
      'Delete Notice',
      'Are you sure you want to delete this notice?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            setNotices(prev => prev.filter(notice => notice.id !== id));
            Alert.alert('Success', 'Notice deleted successfully');
          }
        },
      ]
    );
  };

  const renderNotice = ({ item }: { item: Notice }) => (
    <View style={styles.noticeCard}>
      <View style={styles.noticeHeader}>
        <View style={styles.noticeInfo}>
          <Text style={styles.noticeDate}>{item.createdAt}</Text>
          <View style={[
            styles.statusBadge, 
            { backgroundColor: item.isActive ? Colors.light.success : Colors.light.icon }
          ]}>
            <Text style={styles.statusText}>
              {item.isActive ? 'Active' : 'Inactive'}
            </Text>
          </View>
        </View>
        <View style={styles.noticeActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleToggleNotice(item.id)}
          >
            <Text style={styles.actionButtonText}>
              {item.isActive ? 'Deactivate' : 'Activate'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDeleteNotice(item.id)}
          >
            <Text style={styles.actionButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.noticeText}>{item.text}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ExpoImage source={require('@/assets/images/kumbh.jpeg')} style={styles.logo} contentFit="cover" />
      <Text style={styles.header}>Notice Management</Text>

      <View style={styles.addNoticeCard}>
        <Text style={styles.cardTitle}>Add New Notice</Text>
        <TextInput
          style={styles.noticeInput}
          placeholder="Enter notice text (Hindi/English)"
          placeholderTextColor={Colors.light.icon}
          value={newNotice}
          onChangeText={setNewNotice}
          multiline
          numberOfLines={3}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddNotice}>
          <Text style={styles.addButtonText}>Add Notice</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.noticesCard}>
        <Text style={styles.cardTitle}>Manage Notices</Text>
        <Text style={styles.noticeCount}>
          Total: {notices.length} | Active: {notices.filter(n => n.isActive).length}
        </Text>
        
        <FlatList
          data={notices}
          renderItem={renderNotice}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Admin Dashboard</Text>
      </TouchableOpacity>
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
    marginBottom: 16,
  },
  addNoticeCard: {
    width: '100%',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  cardTitle: {
    color: Colors.light.accentBlue,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
  noticeInput: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    padding: 12,
    backgroundColor: Colors.light.background,
    fontSize: 16,
    color: Colors.light.text,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: Colors.light.accentBlue,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noticesCard: {
    width: '100%',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  noticeCount: {
    color: Colors.light.text,
    fontSize: 14,
    marginBottom: 12,
    opacity: 0.7,
  },
  noticeCard: {
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  noticeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  noticeInfo: {
    flex: 1,
  },
  noticeDate: {
    color: Colors.light.text,
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  noticeActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    backgroundColor: Colors.light.accentBlue,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: Colors.light.error,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  noticeText: {
    color: Colors.light.text,
    fontSize: 14,
    lineHeight: 20,
  },
  backButton: {
    backgroundColor: Colors.light.accentBlue,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 14,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
