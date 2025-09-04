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
  FlatList
} from 'react-native';

const EmergencyServices = () => {
  const navigation = useNavigation();
  
  const [emergencies, setEmergencies] = useState([
    {
      id: "1",
      type: "Medical Emergency",
      priority: "High",
      location: "Temple Complex - Gate 2",
      description: "Person collapsed near main entrance",
      reportedBy: "Security Guard - Rajesh",
      contact: "+91-9876543210",
      status: "active",
      timestamp: "2024-01-15T10:30:00Z",
      assignedTo: "Medical Team Alpha",
      responseTime: "5 minutes"
    },
    {
      id: "2",
      type: "Lost Child",
      priority: "High",
      location: "Prayer Hall - Section A",
      description: "5-year-old boy separated from parents",
      reportedBy: "Volunteer - Priya",
      contact: "+91-9876543211",
      status: "resolved",
      timestamp: "2024-01-15T09:15:00Z",
      assignedTo: "Security Team Beta",
      responseTime: "3 minutes"
    },
    {
      id: "3",
      type: "Fire Safety",
      priority: "Medium",
      location: "Kitchen Area - Block C",
      description: "Smoke detected in kitchen area",
      reportedBy: "Kitchen Staff - Amit",
      contact: "+91-9876543212",
      status: "active",
      timestamp: "2024-01-15T11:45:00Z",
      assignedTo: "Fire Safety Team",
      responseTime: "8 minutes"
    },
    {
      id: "4",
      type: "Crowd Control",
      priority: "Medium",
      location: "Main Entrance",
      description: "Large crowd gathering, need crowd control",
      reportedBy: "Gate Keeper - Sunita",
      contact: "+91-9876543213",
      status: "resolved",
      timestamp: "2024-01-15T08:20:00Z",
      assignedTo: "Crowd Control Team",
      responseTime: "2 minutes"
    }
  ]);

  const [filteredEmergencies, setFilteredEmergencies] = useState(emergencies);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    filterEmergencies();
  }, [searchTerm, filterPriority, filterStatus, emergencies]);

  const filterEmergencies = () => {
    let filtered = emergencies;

    if (searchTerm) {
      filtered = filtered.filter(emergency =>
        emergency.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emergency.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emergency.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterPriority !== 'all') {
      filtered = filtered.filter(emergency => emergency.priority === filterPriority);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(emergency => emergency.status === filterStatus);
    }

    setFilteredEmergencies(filtered);
  };

  const stats = {
    total: emergencies.length,
    active: emergencies.filter(e => e.status === 'active').length,
    resolved: emergencies.filter(e => e.status === 'resolved').length,
    highPriority: emergencies.filter(e => e.priority === 'High').length,
    avgResponseTime: "4.5 minutes"
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return '#d32f2f';
      case 'Medium': return '#f57c00';
      case 'Low': return '#388e3c';
      default: return '#666';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? '#d32f2f' : '#388e3c';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Medical Emergency': return '🏥';
      case 'Lost Child': return '👶';
      case 'Fire Safety': return '🔥';
      case 'Crowd Control': return '👥';
      default: return '🚨';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderEmergencyItem = ({ item: emergency }) => (
    <View style={styles.emergencyCard}>
      <View style={styles.emergencyHeader}>
        <View style={styles.emergencyInfo}>
          <Text style={styles.emergencyType}>
            {getTypeIcon(emergency.type)} {emergency.type}
          </Text>
          <Text style={styles.emergencyLocation}>📍 {emergency.location}</Text>
          <Text style={styles.emergencyDescription}>{emergency.description}</Text>
          <View style={styles.emergencyMeta}>
            <Text style={styles.reportedBy}>Reported by: {emergency.reportedBy}</Text>
            <Text style={styles.assignedTo}>Assigned to: {emergency.assignedTo}</Text>
          </View>
        </View>
        <View style={styles.emergencyStatus}>
          <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(emergency.priority) }]}>
            <Text style={styles.priorityText}>{emergency.priority}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(emergency.status) }]}>
            <Text style={styles.statusText}>{emergency.status}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.emergencyDetails}>
        <Text style={styles.timestamp}>⏰ {formatTimestamp(emergency.timestamp)}</Text>
        <Text style={styles.responseTime}>⚡ Response: {emergency.responseTime}</Text>
        <Text style={styles.contact}>📞 {emergency.contact}</Text>
      </View>
      
      <View style={styles.emergencyActions}>
        <TouchableOpacity style={[styles.actionButton, styles.viewButton]}>
          <Text style={styles.actionButtonText}>👁️ View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.assignButton]}>
          <Text style={styles.actionButtonText}>👥 Assign Team</Text>
        </TouchableOpacity>
        {emergency.status === 'active' && (
          <TouchableOpacity style={[styles.actionButton, styles.resolveButton]}>
            <Text style={styles.actionButtonText}>✅ Resolve</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.gridContainer}>
        {/* Emergency Stats Cards */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#d32f2f' }]}>
            <View style={styles.statContent}>
              <View>
                <Text style={styles.statNumber}>{stats.total}</Text>
                <Text style={styles.statLabel}>Total Emergencies</Text>
              </View>
              <Text style={styles.statIcon}>🚨</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#f57c00' }]}>
            <View style={styles.statContent}>
              <View>
                <Text style={styles.statNumber}>{stats.active}</Text>
                <Text style={styles.statLabel}>Active</Text>
              </View>
              <Text style={styles.statIcon}>⚡</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#388e3c' }]}>
            <View style={styles.statContent}>
              <View>
                <Text style={styles.statNumber}>{stats.resolved}</Text>
                <Text style={styles.statLabel}>Resolved</Text>
              </View>
              <Text style={styles.statIcon}>✅</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#1976d2' }]}>
            <View style={styles.statContent}>
              <View>
                <Text style={styles.statNumber}>{stats.avgResponseTime}</Text>
                <Text style={styles.statLabel}>Avg Response</Text>
              </View>
              <Text style={styles.statIcon}>⏱️</Text>
            </View>
          </View>
        </View>

        {/* Emergency Management Paper */}
        <View style={styles.managementPaper}>
          <View style={styles.managementHeader}>
            <Text style={styles.managementTitle}>
              Emergency Services
            </Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => Alert.alert('Emergency Alert', 'Emergency response team notified!')}
            >
              <Text style={styles.addButtonText}>🚨 Alert Team</Text>
            </TouchableOpacity>
          </View>

          {/* Filters */}
          <View style={styles.filtersContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search emergencies..."
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            
            <View style={styles.filterRow}>
              <TouchableOpacity 
                style={[styles.filterButton, filterPriority === 'all' && styles.activeFilter]}
                onPress={() => setFilterPriority('all')}
              >
                <Text style={[styles.filterText, filterPriority === 'all' && styles.activeFilterText]}>All Priority</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterPriority === 'High' && styles.activeFilter]}
                onPress={() => setFilterPriority('High')}
              >
                <Text style={[styles.filterText, filterPriority === 'High' && styles.activeFilterText]}>🔴 High</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterPriority === 'Medium' && styles.activeFilter]}
                onPress={() => setFilterPriority('Medium')}
              >
                <Text style={[styles.filterText, filterPriority === 'Medium' && styles.activeFilterText]}>🟡 Medium</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterPriority === 'Low' && styles.activeFilter]}
                onPress={() => setFilterPriority('Low')}
              >
                <Text style={[styles.filterText, filterPriority === 'Low' && styles.activeFilterText]}>🟢 Low</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.filterRow}>
              <TouchableOpacity 
                style={[styles.filterButton, filterStatus === 'all' && styles.activeFilter]}
                onPress={() => setFilterStatus('all')}
              >
                <Text style={[styles.filterText, filterStatus === 'all' && styles.activeFilterText]}>All Status</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterStatus === 'active' && styles.activeFilter]}
                onPress={() => setFilterStatus('active')}
              >
                <Text style={[styles.filterText, filterStatus === 'active' && styles.activeFilterText]}>⚡ Active</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterStatus === 'resolved' && styles.activeFilter]}
                onPress={() => setFilterStatus('resolved')}
              >
                <Text style={[styles.filterText, filterStatus === 'resolved' && styles.activeFilterText]}>✅ Resolved</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Emergencies List */}
          <FlatList
            data={filteredEmergencies}
            renderItem={renderEmergencyItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            style={styles.emergenciesList}
          />

          {filteredEmergencies.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🚨</Text>
              <Text style={styles.emptyTitle}>No emergencies found</Text>
              <Text style={styles.emptySubtitle}>
                {searchTerm || filterPriority !== 'all' || filterStatus !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'No emergency cases reported'}
              </Text>
            </View>
          )}
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

export default EmergencyServices;

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
  
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  
  statCard: {
    flex: 1,
    minWidth: 150,
    borderRadius: 4,
    padding: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  
  statLabel: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  
  statIcon: {
    fontSize: 40,
    opacity: 0.8,
  },
  
  managementPaper: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    padding: 24,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  
  managementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  
  managementTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  
  addButton: {
    backgroundColor: '#d32f2f',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
  },
  
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  
  filtersContainer: {
    marginBottom: 24,
    gap: 16,
  },
  
  searchInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    padding: 12,
    backgroundColor: 'white',
    fontSize: 16,
  },
  
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  
  activeFilter: {
    backgroundColor: '#1976d2',
    borderColor: '#1976d2',
  },
  
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  
  activeFilterText: {
    color: 'white',
  },
  
  emergenciesList: {
    gap: 16,
  },
  
  emergencyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  
  emergencyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  
  emergencyInfo: {
    flex: 1,
  },
  
  emergencyType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  
  emergencyLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  
  emergencyDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  
  emergencyMeta: {
    gap: 4,
  },
  
  reportedBy: {
    fontSize: 12,
    color: '#666',
  },
  
  assignedTo: {
    fontSize: 12,
    color: '#666',
  },
  
  emergencyStatus: {
    alignItems: 'flex-end',
    gap: 8,
  },
  
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  
  priorityText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  
  emergencyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  
  responseTime: {
    fontSize: 12,
    color: '#1976d2',
    fontWeight: '500',
  },
  
  contact: {
    fontSize: 12,
    color: '#666',
  },
  
  emergencyActions: {
    flexDirection: 'row',
    gap: 8,
  },
  
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  
  viewButton: {
    backgroundColor: '#1976d2',
  },
  
  assignButton: {
    backgroundColor: '#f57c00',
  },
  
  resolveButton: {
    backgroundColor: '#388e3c',
  },
  
  actionButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  
  emptyIcon: {
    fontSize: 80,
    color: '#ccc',
    marginBottom: 16,
  },
  
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
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
