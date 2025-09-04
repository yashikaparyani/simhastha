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

const VolunteerManagement = () => {
  const navigation = useNavigation();
  
  const [volunteers, setVolunteers] = useState([
    {
      id: "1",
      name: "Rajesh Kumar",
      email: "rajesh@email.com",
      phone: "+91-9876543210",
      age: 28,
      skills: ["First Aid", "Crowd Management", "Language Translation"],
      availability: "Full Time",
      status: "active",
      department: "Medical Support",
      experience: "2 years",
      rating: 4.8,
      totalHours: 156,
      joinedDate: "2023-06-15",
      lastActive: "2024-01-15T10:30:00Z"
    },
    {
      id: "2",
      name: "Priya Sharma",
      email: "priya@email.com",
      phone: "+91-9876543211",
      age: 24,
      skills: ["Event Management", "Customer Service", "Photography"],
      availability: "Part Time",
      status: "active",
      department: "Event Coordination",
      experience: "1 year",
      rating: 4.6,
      totalHours: 89,
      joinedDate: "2023-08-20",
      lastActive: "2024-01-14T15:45:00Z"
    },
    {
      id: "3",
      name: "Amit Singh",
      email: "amit@email.com",
      phone: "+91-9876543212",
      age: 32,
      skills: ["Security", "Traffic Control", "Emergency Response"],
      availability: "Full Time",
      status: "active",
      department: "Security",
      experience: "3 years",
      rating: 4.9,
      totalHours: 234,
      joinedDate: "2023-03-10",
      lastActive: "2024-01-15T08:20:00Z"
    },
    {
      id: "4",
      name: "Sunita Patel",
      email: "sunita@email.com",
      phone: "+91-9876543213",
      age: 45,
      skills: ["Cooking", "Food Distribution", "Kitchen Management"],
      availability: "Part Time",
      status: "inactive",
      department: "Food Service",
      experience: "5 years",
      rating: 4.7,
      totalHours: 178,
      joinedDate: "2023-01-05",
      lastActive: "2024-01-10T12:00:00Z"
    },
    {
      id: "5",
      name: "Vikram Joshi",
      email: "vikram@email.com",
      phone: "+91-9876543214",
      age: 26,
      skills: ["IT Support", "Digital Marketing", "Social Media"],
      availability: "Full Time",
      status: "active",
      department: "IT Support",
      experience: "1.5 years",
      rating: 4.5,
      totalHours: 112,
      joinedDate: "2023-09-12",
      lastActive: "2024-01-15T14:30:00Z"
    }
  ]);

  const [filteredVolunteers, setFilteredVolunteers] = useState(volunteers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    filterVolunteers();
  }, [searchTerm, filterDepartment, filterStatus, volunteers]);

  const filterVolunteers = () => {
    let filtered = volunteers;

    if (searchTerm) {
      filtered = filtered.filter(volunteer =>
        volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        volunteer.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterDepartment !== 'all') {
      filtered = filtered.filter(volunteer => volunteer.department === filterDepartment);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(volunteer => volunteer.status === filterStatus);
    }

    setFilteredVolunteers(filtered);
  };

  const stats = {
    total: volunteers.length,
    active: volunteers.filter(v => v.status === 'active').length,
    totalHours: volunteers.reduce((sum, v) => sum + v.totalHours, 0),
    avgRating: (volunteers.reduce((sum, v) => sum + v.rating, 0) / volunteers.length).toFixed(1),
    departments: [...new Set(volunteers.map(v => v.department))].length
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? '#388e3c' : '#f57c00';
  };

  const getDepartmentColor = (department: string) => {
    const colors = {
      'Medical Support': '#d32f2f',
      'Event Coordination': '#1976d2',
      'Security': '#f57c00',
      'Food Service': '#388e3c',
      'IT Support': '#7b1fa2'
    };
    return colors[department] || '#666';
  };

  const formatLastActive = (lastActive: string) => {
    const date = new Date(lastActive);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const renderVolunteerItem = ({ item: volunteer }) => (
    <View style={styles.volunteerCard}>
      <View style={styles.volunteerHeader}>
        <View style={styles.volunteerInfo}>
          <Text style={styles.volunteerName}>{volunteer.name}</Text>
          <Text style={styles.volunteerEmail}>📧 {volunteer.email}</Text>
          <Text style={styles.volunteerPhone}>📞 {volunteer.phone}</Text>
          <View style={styles.volunteerMeta}>
            <Text style={styles.volunteerAge}>👤 Age: {volunteer.age}</Text>
            <Text style={styles.volunteerExperience}>⭐ {volunteer.experience} exp</Text>
            <Text style={styles.volunteerRating}>⭐ {volunteer.rating}/5</Text>
          </View>
        </View>
        <View style={styles.volunteerStatus}>
          <View style={[styles.departmentBadge, { backgroundColor: getDepartmentColor(volunteer.department) }]}>
            <Text style={styles.departmentText}>{volunteer.department}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(volunteer.status) }]}>
            <Text style={styles.statusText}>{volunteer.status}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.volunteerDetails}>
        <Text style={styles.availability}>📅 {volunteer.availability}</Text>
        <Text style={styles.totalHours}>⏰ {volunteer.totalHours} hours</Text>
        <Text style={styles.lastActive}>🕒 Last active: {formatLastActive(volunteer.lastActive)}</Text>
      </View>
      
      <View style={styles.skillsContainer}>
        <Text style={styles.skillsLabel}>Skills:</Text>
        <View style={styles.skillsList}>
          {volunteer.skills.map((skill, index) => (
            <View key={index} style={styles.skillTag}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.volunteerActions}>
        <TouchableOpacity style={[styles.actionButton, styles.viewButton]}>
          <Text style={styles.actionButtonText}>👁️ View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.editButton]}>
          <Text style={styles.actionButtonText}>✏️ Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.assignButton]}>
          <Text style={styles.actionButtonText}>📋 Assign</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.toggleButton]}>
          <Text style={styles.actionButtonText}>
            {volunteer.status === 'active' ? '⏸️ Deactivate' : '▶️ Activate'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.gridContainer}>
        {/* Volunteer Stats Cards */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#1976d2' }]}>
            <View style={styles.statContent}>
              <View>
                <Text style={styles.statNumber}>{stats.total}</Text>
                <Text style={styles.statLabel}>Total Volunteers</Text>
              </View>
              <Text style={styles.statIcon}>🤝</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#388e3c' }]}>
            <View style={styles.statContent}>
              <View>
                <Text style={styles.statNumber}>{stats.active}</Text>
                <Text style={styles.statLabel}>Active</Text>
              </View>
              <Text style={styles.statIcon}>✅</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#f57c00' }]}>
            <View style={styles.statContent}>
              <View>
                <Text style={styles.statNumber}>{stats.totalHours}</Text>
                <Text style={styles.statLabel}>Total Hours</Text>
              </View>
              <Text style={styles.statIcon}>⏰</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#7b1fa2' }]}>
            <View style={styles.statContent}>
              <View>
                <Text style={styles.statNumber}>{stats.avgRating}</Text>
                <Text style={styles.statLabel}>Avg Rating</Text>
              </View>
              <Text style={styles.statIcon}>⭐</Text>
            </View>
          </View>
        </View>

        {/* Volunteer Management Paper */}
        <View style={styles.managementPaper}>
          <View style={styles.managementHeader}>
            <Text style={styles.managementTitle}>
              Volunteer Management
            </Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddModal(true)}
            >
              <Text style={styles.addButtonText}>+ Add Volunteer</Text>
            </TouchableOpacity>
          </View>

          {/* Filters */}
          <View style={styles.filtersContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search volunteers..."
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            
            <View style={styles.filterRow}>
              <TouchableOpacity 
                style={[styles.filterButton, filterDepartment === 'all' && styles.activeFilter]}
                onPress={() => setFilterDepartment('all')}
              >
                <Text style={[styles.filterText, filterDepartment === 'all' && styles.activeFilterText]}>All Departments</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterDepartment === 'Medical Support' && styles.activeFilter]}
                onPress={() => setFilterDepartment('Medical Support')}
              >
                <Text style={[styles.filterText, filterDepartment === 'Medical Support' && styles.activeFilterText]}>🏥 Medical</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterDepartment === 'Event Coordination' && styles.activeFilter]}
                onPress={() => setFilterDepartment('Event Coordination')}
              >
                <Text style={[styles.filterText, filterDepartment === 'Event Coordination' && styles.activeFilterText]}>🎉 Events</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterDepartment === 'Security' && styles.activeFilter]}
                onPress={() => setFilterDepartment('Security')}
              >
                <Text style={[styles.filterText, filterDepartment === 'Security' && styles.activeFilterText]}>🔒 Security</Text>
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
                <Text style={[styles.filterText, filterStatus === 'active' && styles.activeFilterText]}>✅ Active</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterStatus === 'inactive' && styles.activeFilter]}
                onPress={() => setFilterStatus('inactive')}
              >
                <Text style={[styles.filterText, filterStatus === 'inactive' && styles.activeFilterText]}>⏸️ Inactive</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Volunteers List */}
          <FlatList
            data={filteredVolunteers}
            renderItem={renderVolunteerItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            style={styles.volunteersList}
          />

          {filteredVolunteers.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🤝</Text>
              <Text style={styles.emptyTitle}>No volunteers found</Text>
              <Text style={styles.emptySubtitle}>
                {searchTerm || filterDepartment !== 'all' || filterStatus !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start by adding your first volunteer'}
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

export default VolunteerManagement;

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
    backgroundColor: '#1976d2',
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
  
  volunteersList: {
    gap: 16,
  },
  
  volunteerCard: {
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
  
  volunteerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  
  volunteerInfo: {
    flex: 1,
  },
  
  volunteerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  
  volunteerEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  
  volunteerPhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  
  volunteerMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  
  volunteerAge: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  
  volunteerExperience: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  
  volunteerRating: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  
  volunteerStatus: {
    alignItems: 'flex-end',
    gap: 8,
  },
  
  departmentBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  
  departmentText: {
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
  
  volunteerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  
  availability: {
    fontSize: 14,
    color: '#1976d2',
    fontWeight: '500',
  },
  
  totalHours: {
    fontSize: 14,
    color: '#388e3c',
    fontWeight: '500',
  },
  
  lastActive: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  
  skillsContainer: {
    marginBottom: 16,
  },
  
  skillsLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  
  skillTag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  
  skillText: {
    fontSize: 12,
    color: '#1976d2',
  },
  
  volunteerActions: {
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
  
  editButton: {
    backgroundColor: '#f57c00',
  },
  
  assignButton: {
    backgroundColor: '#388e3c',
  },
  
  toggleButton: {
    backgroundColor: '#7b1fa2',
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
