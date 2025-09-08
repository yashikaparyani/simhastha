import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const isSmallScreen = screenWidth < 375;
const isMediumScreen = screenWidth >= 375 && screenWidth < 414;
const isLargeScreen = screenWidth >= 414;

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

  const renderEmergencyItem = ({ item }: any) => {
    const { type, location, description, reportedBy, assignedTo, priority, status, timestamp, responseTime, contact } = item;

    return (
      <View style={styles.emergencyCard}>
        <View style={styles.emergencyHeader}>
          <View style={styles.emergencyInfo}>
            <Text style={styles.emergencyType}>
              {getTypeIcon(type)} {type}
            </Text>
            <Text style={styles.emergencyLocation}>📍 {location}</Text>
            <Text style={styles.emergencyDescription}>{description}</Text>
            <View style={styles.emergencyMeta}>
              <Text style={styles.reportedBy}>Reported by: {reportedBy}</Text>
              <Text style={styles.assignedTo}>Assigned to: {assignedTo}</Text>
            </View>
          </View>
          <View style={styles.emergencyStatus}>
            <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(priority) }]}>
              <Text style={styles.priorityText}>{priority}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(status) }]}>
              <Text style={styles.statusText}>{status}</Text>
            </View>
          </View>
        </View>

        <View style={styles.emergencyDetails}>
          <Text style={styles.timestamp}>⏰ {formatTimestamp(timestamp)}</Text>
          <Text style={styles.responseTime}>⚡ {responseTime}</Text>
          <Text style={styles.contact}>📞 {contact}</Text>
        </View>

        <View style={styles.emergencyActions}>
          <TouchableOpacity style={[styles.actionButton, styles.viewButton]}>
            <Text style={styles.actionButtonText}>👁️ View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.assignButton]}>
            <Text style={styles.actionButtonText}>👥 Assign</Text>
          </TouchableOpacity>
          {status === 'active' && (
            <TouchableOpacity style={[styles.actionButton, styles.resolveButton]}>
              <Text style={styles.actionButtonText}>✅ Resolve</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Stats Section */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: '#d32f2f' }]}>
          <Text style={styles.statNumber}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#f57c00' }]}>
          <Text style={styles.statNumber}>{stats.active}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#388e3c' }]}>
          <Text style={styles.statNumber}>{stats.resolved}</Text>
          <Text style={styles.statLabel}>Resolved</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#1976d2' }]}>
          <Text style={styles.statNumber}>{stats.avgResponseTime}</Text>
          <Text style={styles.statLabel}>Avg Time</Text>
        </View>
      </View>

      {/* Emergency Management */}
      <View style={styles.managementPaper}>
        <View style={styles.managementHeader}>
          <Text style={styles.managementTitle}>Emergency Services</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => Alert.alert('Emergency Alert', 'Team Notified!')}
          >
            <Text style={styles.addButtonText}>🚨 Alert</Text>
          </TouchableOpacity>
        </View>

        {/* Search & Filters */}
        <View style={styles.filtersContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search emergencies..."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />

          {/* Priority */}
          <View style={styles.filterRow}>
            {['all', 'High', 'Medium', 'Low'].map(p => (
              <TouchableOpacity
                key={p}
                style={[styles.filterButton, filterPriority === p && styles.activeFilter]}
                onPress={() => setFilterPriority(p)}
              >
                <Text style={[styles.filterText, filterPriority === p && styles.activeFilterText]}>
                  {p === 'all' ? 'All Priority' : p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Status */}
          <View style={styles.filterRow}>
            {['all', 'active', 'resolved'].map(s => (
              <TouchableOpacity
                key={s}
                style={[styles.filterButton, filterStatus === s && styles.activeFilter]}
                onPress={() => setFilterStatus(s)}
              >
                <Text style={[styles.filterText, filterStatus === s && styles.activeFilterText]}>
                  {s === 'all' ? 'All Status' : s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Emergencies List */}
        <FlatList
          data={filteredEmergencies}
          renderItem={renderEmergencyItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={{ gap: 16 }}
        />

        {filteredEmergencies.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🚨</Text>
            <Text style={styles.emptyTitle}>No emergencies found</Text>
          </View>
        )}
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EmergencyServices;

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 12,
    backgroundColor: '#f5f5f5'
  },

  /* Stats */
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 20,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    margin: 6,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: isSmallScreen ? 18 : 22,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: isSmallScreen ? 12 : 14,
    color: 'rgba(255,255,255,0.9)',
  },

  /* Management */
  managementPaper: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  managementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  managementTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  addButton: {
    backgroundColor: '#d32f2f',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  /* Filters */
  filtersContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    margin: 4,
  },
  activeFilter: {
    backgroundColor: '#1976d2',
    borderColor: '#1976d2',
  },
  filterText: {
    fontSize: 13,
    color: '#444',
  },
  activeFilterText: {
    color: '#fff',
  },

  /* Emergency Cards */
  emergencyCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  emergencyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  emergencyInfo: {
    flex: 1,
    paddingRight: 10,
  },
  emergencyType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emergencyLocation: {
    fontSize: 13,
    color: '#666',
  },
  emergencyDescription: {
    fontSize: 13,
    color: '#444',
    marginVertical: 4,
  },
  emergencyMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  priorityText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },

  emergencyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 6,
    marginBottom: 8,
  },
  timestamp: { fontSize: 11, color: '#666' },
  responseTime: { fontSize: 11, color: '#1976d2', fontWeight: 'bold' },
  contact: { fontSize: 11, color: '#666' },

  emergencyActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    minWidth: '28%',
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  viewButton: { backgroundColor: '#1976d2' },
  assignButton: { backgroundColor: '#f57c00' },
  resolveButton: { backgroundColor: '#388e3c' },
  actionButtonText: { color: '#fff', fontSize: 12, fontWeight: '500' },

  /* Empty State */
  emptyState: { alignItems: 'center', paddingVertical: 20 },
  emptyIcon: { fontSize: 50, marginBottom: 10, color: '#aaa' },
  emptyTitle: { fontSize: 16, fontWeight: 'bold', color: '#666' },

  /* Back Button */
  backButton: {
    backgroundColor: '#666',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  backButtonText: { color: '#fff', fontWeight: 'bold' },
});
