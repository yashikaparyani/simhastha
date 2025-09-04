import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  Alert,
  Modal,
  Switch
} from 'react-native';

const AdminSettings = () => {
  const navigation = useNavigation();
  
  const [settings, setSettings] = useState({
    // General Settings
    appName: "Simhastha 2028",
    appVersion: "2.1.0",
    maintenanceMode: false,
    debugMode: false,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    notificationSound: true,
    
    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordPolicy: "Strong",
    loginAttempts: 5,
    
    // System Settings
    autoBackup: true,
    backupFrequency: "Daily",
    dataRetention: 365,
    maxFileSize: 10,
    
    // Integration Settings
    paymentGateway: "Razorpay",
    smsProvider: "Twilio",
    emailProvider: "SendGrid",
    analyticsEnabled: true
  });

  const [activeTab, setActiveTab] = useState('general');
  const [showSaveModal, setShowSaveModal] = useState(false);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    Alert.alert('Settings Saved', 'All settings have been saved successfully!');
    setShowSaveModal(false);
  };

  const handleResetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to default?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: () => {
          // Reset to default values
          setSettings({
            appName: "Simhastha 2028",
            appVersion: "2.1.0",
            maintenanceMode: false,
            debugMode: false,
            emailNotifications: true,
            smsNotifications: true,
            pushNotifications: true,
            notificationSound: true,
            twoFactorAuth: true,
            sessionTimeout: 30,
            passwordPolicy: "Strong",
            loginAttempts: 5,
            autoBackup: true,
            backupFrequency: "Daily",
            dataRetention: 365,
            maxFileSize: 10,
            paymentGateway: "Razorpay",
            smsProvider: "Twilio",
            emailProvider: "SendGrid",
            analyticsEnabled: true
          });
        }}
      ]
    );
  };

  const renderGeneralSettings = () => (
    <View style={styles.settingsSection}>
      <Text style={styles.sectionTitle}>General Settings</Text>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>App Name</Text>
        <TextInput
          style={styles.textInput}
          value={settings.appName}
          onChangeText={(value) => handleSettingChange('appName', value)}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>App Version</Text>
        <Text style={styles.settingValue}>{settings.appVersion}</Text>
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Maintenance Mode</Text>
        <Switch
          value={settings.maintenanceMode}
          onValueChange={(value) => handleSettingChange('maintenanceMode', value)}
          trackColor={{ false: '#767577', true: '#1976d2' }}
          thumbColor={settings.maintenanceMode ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Debug Mode</Text>
        <Switch
          value={settings.debugMode}
          onValueChange={(value) => handleSettingChange('debugMode', value)}
          trackColor={{ false: '#767577', true: '#1976d2' }}
          thumbColor={settings.debugMode ? '#ffffff' : '#f4f3f4'}
        />
      </View>
    </View>
  );

  const renderNotificationSettings = () => (
    <View style={styles.settingsSection}>
      <Text style={styles.sectionTitle}>Notification Settings</Text>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Email Notifications</Text>
        <Switch
          value={settings.emailNotifications}
          onValueChange={(value) => handleSettingChange('emailNotifications', value)}
          trackColor={{ false: '#767577', true: '#1976d2' }}
          thumbColor={settings.emailNotifications ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>SMS Notifications</Text>
        <Switch
          value={settings.smsNotifications}
          onValueChange={(value) => handleSettingChange('smsNotifications', value)}
          trackColor={{ false: '#767577', true: '#1976d2' }}
          thumbColor={settings.smsNotifications ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Push Notifications</Text>
        <Switch
          value={settings.pushNotifications}
          onValueChange={(value) => handleSettingChange('pushNotifications', value)}
          trackColor={{ false: '#767577', true: '#1976d2' }}
          thumbColor={settings.pushNotifications ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Notification Sound</Text>
        <Switch
          value={settings.notificationSound}
          onValueChange={(value) => handleSettingChange('notificationSound', value)}
          trackColor={{ false: '#767577', true: '#1976d2' }}
          thumbColor={settings.notificationSound ? '#ffffff' : '#f4f3f4'}
        />
      </View>
    </View>
  );

  const renderSecuritySettings = () => (
    <View style={styles.settingsSection}>
      <Text style={styles.sectionTitle}>Security Settings</Text>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Two-Factor Authentication</Text>
        <Switch
          value={settings.twoFactorAuth}
          onValueChange={(value) => handleSettingChange('twoFactorAuth', value)}
          trackColor={{ false: '#767577', true: '#1976d2' }}
          thumbColor={settings.twoFactorAuth ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Session Timeout (minutes)</Text>
        <TextInput
          style={styles.numberInput}
          value={settings.sessionTimeout.toString()}
          onChangeText={(value) => handleSettingChange('sessionTimeout', parseInt(value) || 30)}
          keyboardType="numeric"
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Password Policy</Text>
        <View style={styles.pickerContainer}>
          <TouchableOpacity 
            style={[styles.pickerOption, settings.passwordPolicy === 'Weak' && styles.selectedOption]}
            onPress={() => handleSettingChange('passwordPolicy', 'Weak')}
          >
            <Text style={[styles.pickerText, settings.passwordPolicy === 'Weak' && styles.selectedText]}>Weak</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.pickerOption, settings.passwordPolicy === 'Medium' && styles.selectedOption]}
            onPress={() => handleSettingChange('passwordPolicy', 'Medium')}
          >
            <Text style={[styles.pickerText, settings.passwordPolicy === 'Medium' && styles.selectedText]}>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.pickerOption, settings.passwordPolicy === 'Strong' && styles.selectedOption]}
            onPress={() => handleSettingChange('passwordPolicy', 'Strong')}
          >
            <Text style={[styles.pickerText, settings.passwordPolicy === 'Strong' && styles.selectedText]}>Strong</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Max Login Attempts</Text>
        <TextInput
          style={styles.numberInput}
          value={settings.loginAttempts.toString()}
          onChangeText={(value) => handleSettingChange('loginAttempts', parseInt(value) || 5)}
          keyboardType="numeric"
        />
      </View>
    </View>
  );

  const renderSystemSettings = () => (
    <View style={styles.settingsSection}>
      <Text style={styles.sectionTitle}>System Settings</Text>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Auto Backup</Text>
        <Switch
          value={settings.autoBackup}
          onValueChange={(value) => handleSettingChange('autoBackup', value)}
          trackColor={{ false: '#767577', true: '#1976d2' }}
          thumbColor={settings.autoBackup ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Backup Frequency</Text>
        <View style={styles.pickerContainer}>
          <TouchableOpacity 
            style={[styles.pickerOption, settings.backupFrequency === 'Daily' && styles.selectedOption]}
            onPress={() => handleSettingChange('backupFrequency', 'Daily')}
          >
            <Text style={[styles.pickerText, settings.backupFrequency === 'Daily' && styles.selectedText]}>Daily</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.pickerOption, settings.backupFrequency === 'Weekly' && styles.selectedOption]}
            onPress={() => handleSettingChange('backupFrequency', 'Weekly')}
          >
            <Text style={[styles.pickerText, settings.backupFrequency === 'Weekly' && styles.selectedText]}>Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.pickerOption, settings.backupFrequency === 'Monthly' && styles.selectedOption]}
            onPress={() => handleSettingChange('backupFrequency', 'Monthly')}
          >
            <Text style={[styles.pickerText, settings.backupFrequency === 'Monthly' && styles.selectedText]}>Monthly</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Data Retention (days)</Text>
        <TextInput
          style={styles.numberInput}
          value={settings.dataRetention.toString()}
          onChangeText={(value) => handleSettingChange('dataRetention', parseInt(value) || 365)}
          keyboardType="numeric"
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Max File Size (MB)</Text>
        <TextInput
          style={styles.numberInput}
          value={settings.maxFileSize.toString()}
          onChangeText={(value) => handleSettingChange('maxFileSize', parseInt(value) || 10)}
          keyboardType="numeric"
        />
      </View>
    </View>
  );

  const renderIntegrationSettings = () => (
    <View style={styles.settingsSection}>
      <Text style={styles.sectionTitle}>Integration Settings</Text>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Payment Gateway</Text>
        <View style={styles.pickerContainer}>
          <TouchableOpacity 
            style={[styles.pickerOption, settings.paymentGateway === 'Razorpay' && styles.selectedOption]}
            onPress={() => handleSettingChange('paymentGateway', 'Razorpay')}
          >
            <Text style={[styles.pickerText, settings.paymentGateway === 'Razorpay' && styles.selectedText]}>Razorpay</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.pickerOption, settings.paymentGateway === 'PayU' && styles.selectedOption]}
            onPress={() => handleSettingChange('paymentGateway', 'PayU')}
          >
            <Text style={[styles.pickerText, settings.paymentGateway === 'PayU' && styles.selectedText]}>PayU</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.pickerOption, settings.paymentGateway === 'Stripe' && styles.selectedOption]}
            onPress={() => handleSettingChange('paymentGateway', 'Stripe')}
          >
            <Text style={[styles.pickerText, settings.paymentGateway === 'Stripe' && styles.selectedText]}>Stripe</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>SMS Provider</Text>
        <View style={styles.pickerContainer}>
          <TouchableOpacity 
            style={[styles.pickerOption, settings.smsProvider === 'Twilio' && styles.selectedOption]}
            onPress={() => handleSettingChange('smsProvider', 'Twilio')}
          >
            <Text style={[styles.pickerText, settings.smsProvider === 'Twilio' && styles.selectedText]}>Twilio</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.pickerOption, settings.smsProvider === 'AWS SNS' && styles.selectedOption]}
            onPress={() => handleSettingChange('smsProvider', 'AWS SNS')}
          >
            <Text style={[styles.pickerText, settings.smsProvider === 'AWS SNS' && styles.selectedText]}>AWS SNS</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Email Provider</Text>
        <View style={styles.pickerContainer}>
          <TouchableOpacity 
            style={[styles.pickerOption, settings.emailProvider === 'SendGrid' && styles.selectedOption]}
            onPress={() => handleSettingChange('emailProvider', 'SendGrid')}
          >
            <Text style={[styles.pickerText, settings.emailProvider === 'SendGrid' && styles.selectedText]}>SendGrid</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.pickerOption, settings.emailProvider === 'Mailgun' && styles.selectedOption]}
            onPress={() => handleSettingChange('emailProvider', 'Mailgun')}
          >
            <Text style={[styles.pickerText, settings.emailProvider === 'Mailgun' && styles.selectedText]}>Mailgun</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Analytics Enabled</Text>
        <Switch
          value={settings.analyticsEnabled}
          onValueChange={(value) => handleSettingChange('analyticsEnabled', value)}
          trackColor={{ false: '#767577', true: '#1976d2' }}
          thumbColor={settings.analyticsEnabled ? '#ffffff' : '#f4f3f4'}
        />
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.gridContainer}>
        {/* Settings Header */}
        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>System Settings</Text>
          <Text style={styles.headerSubtitle}>Configure your Simhastha admin panel</Text>
        </View>

        {/* Settings Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'general' && styles.activeTab]}
            onPress={() => setActiveTab('general')}
          >
            <Text style={[styles.tabText, activeTab === 'general' && styles.activeTabText]}>⚙️ General</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'notifications' && styles.activeTab]}
            onPress={() => setActiveTab('notifications')}
          >
            <Text style={[styles.tabText, activeTab === 'notifications' && styles.activeTabText]}>🔔 Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'security' && styles.activeTab]}
            onPress={() => setActiveTab('security')}
          >
            <Text style={[styles.tabText, activeTab === 'security' && styles.activeTabText]}>🔒 Security</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'system' && styles.activeTab]}
            onPress={() => setActiveTab('system')}
          >
            <Text style={[styles.tabText, activeTab === 'system' && styles.activeTabText]}>💾 System</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'integrations' && styles.activeTab]}
            onPress={() => setActiveTab('integrations')}
          >
            <Text style={[styles.tabText, activeTab === 'integrations' && styles.activeTabText]}>🔗 Integrations</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Content */}
        <View style={styles.settingsContainer}>
          {activeTab === 'general' && renderGeneralSettings()}
          {activeTab === 'notifications' && renderNotificationSettings()}
          {activeTab === 'security' && renderSecuritySettings()}
          {activeTab === 'system' && renderSystemSettings()}
          {activeTab === 'integrations' && renderIntegrationSettings()}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.saveButton]}
            onPress={() => setShowSaveModal(true)}
          >
            <Text style={styles.saveButtonText}>💾 Save Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.resetButton]}
            onPress={handleResetSettings}
          >
            <Text style={styles.resetButtonText}>🔄 Reset to Default</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back to Admin Menu</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AdminSettings;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  
  gridContainer: {
    gap: 24,
  },
  
  headerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    alignItems: 'center',
  },
  
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 8,
  },
  
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  
  activeTab: {
    backgroundColor: '#1976d2',
  },
  
  tabText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  
  settingsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 24,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  
  settingsSection: {
    gap: 20,
  },
  
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 16,
  },
  
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  
  settingLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  
  settingValue: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  
  textInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    minWidth: 150,
    backgroundColor: '#f9f9f9',
  },
  
  numberInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    width: 80,
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
  },
  
  pickerContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  
  pickerOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f9f9f9',
  },
  
  selectedOption: {
    backgroundColor: '#1976d2',
    borderColor: '#1976d2',
  },
  
  pickerText: {
    fontSize: 14,
    color: '#666',
  },
  
  selectedText: {
    color: 'white',
    fontWeight: 'bold',
  },
  
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  
  saveButton: {
    backgroundColor: '#388e3c',
  },
  
  resetButton: {
    backgroundColor: '#f57c00',
  },
  
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  backButton: {
    backgroundColor: '#666',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
