import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// TypeScript interfaces for type safety
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  permissions: string[];
  status: string;
  department: string;
  jobTitle: string;
  createdAt: string;
  lastLogin: string;
  loginCount: number;
  avatar: string | null;
}

// Exact conversion from the original UserManagement.jsx
const UserManagement = () => {
  const navigation = useNavigation();
  
  // Exact same state structure as original with proper typing
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [passwordResetUser, setPasswordResetUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    permissions: [],
    status: 'active',
    password: '',
    confirmPassword: '',
    department: '',
    jobTitle: '',
  });
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Exact same permissions as original
  const availablePermissions = [
    { id: 'manage_vendors', label: 'Manage Vendors', icon: '🏢' },
    { id: 'manage_vehicles', label: 'Manage Vehicles', icon: '🚗' },
    { id: 'manage_bookings', label: 'Manage Bookings', icon: '📅' },
    { id: 'view_analytics', label: 'View Analytics', icon: '📊' },
    { id: 'manage_users', label: 'Manage Users', icon: '👥' },
    { id: 'system_settings', label: 'System Settings', icon: '⚙️' },
    { id: 'financial_reports', label: 'Financial Reports', icon: '💰' },
    { id: 'export_data', label: 'Export Data', icon: '📤' }
  ];

  const departments = ['Operations', 'Finance', 'HR', 'IT', 'Management', 'Customer Service'];

  // Initialize with exact same seed data as original
  useEffect(() => {
    const initialUsers = [
      {
        id: "1",
        name: "John Admin",
        email: "admin@transport.com",
        phone: "+1-234-567-8901",
        role: "admin",
        permissions: availablePermissions.map(p => p.id),
        status: "active",
        department: "Management",
        jobTitle: "System Administrator",
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        loginCount: 45,
        avatar: null
      },
      {
        id: "2",
        name: "Sarah Manager",
        email: "manager@transport.com",
        phone: "+1-234-567-8902",
        role: "manager",
        permissions: ['manage_vendors', 'manage_vehicles', 'manage_bookings', 'view_analytics', 'financial_reports'],
        status: "active",
        department: "Operations",
        jobTitle: "Operations Manager",
        createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
        lastLogin: new Date(Date.now() - 3600000).toISOString(),
        loginCount: 128,
        avatar: null
      },
      {
        id: "3",
        name: "Mike Staff",
        email: "staff@transport.com",
        phone: "+1-234-567-8903",
        role: "staff",
        permissions: ['manage_bookings', 'view_analytics'],
        status: "active",
        department: "Customer Service",
        jobTitle: "Customer Service Representative",
        createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
        lastLogin: new Date(Date.now() - 7200000).toISOString(),
        loginCount: 67,
        avatar: null
      },
      {
        id: "4",
        name: "Lisa Analyst",
        email: "analyst@transport.com",
        phone: "+1-234-567-8904",
        role: "staff",
        permissions: ['view_analytics', 'financial_reports', 'export_data'],
        status: "inactive",
        department: "Finance",
        jobTitle: "Financial Analyst",
        createdAt: new Date(Date.now() - 86400000 * 60).toISOString(),
        lastLogin: new Date(Date.now() - 86400000 * 7).toISOString(),
        loginCount: 23,
        avatar: null
      }
    ];
    
    setUsers(initialUsers);
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, filterRole, filterStatus]);

  const filterUsers = () => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterRole !== 'all') {
      filtered = filtered.filter(user => user.role === filterRole);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(user => user.status === filterStatus);
    }

    setFilteredUsers(filtered);
  };

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    admins: users.filter(u => u.role === 'admin').length,
    managers: users.filter(u => u.role === 'manager').length,
    staff: users.filter(u => u.role === 'staff').length,
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return '#d32f2f';
      case 'manager':
        return '#1976d2';
      case 'staff':
        return '#388e3c';
      default:
        return '#666';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return '#388e3c';
      case 'inactive':
        return '#f57c00';
      case 'suspended':
        return '#d32f2f';
      default:
        return '#666';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return '👑';
      case 'manager':
        return '👨‍💼';
      case 'staff':
        return '👤';
      default:
        return '👤';
    }
  };

  const formatLastLogin = (lastLogin: string) => {
    if (!lastLogin) return 'Never';
    const date = new Date(lastLogin);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} equivalent */}
      <View style={styles.gridContainer}>
        {/* Enhanced Stats Cards - exact Material-UI structure */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#1976d2' }]}>
            <View style={styles.statContent}>
              <View>
                <Text style={styles.statNumber}>{stats.total}</Text>
                <Text style={styles.statLabel}>Total Users</Text>
              </View>
              <Text style={styles.statIcon}>👥</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#388e3c' }]}>
            <View style={styles.statContent}>
              <View>
                <Text style={styles.statNumber}>{stats.active}</Text>
                <Text style={styles.statLabel}>Active Users</Text>
              </View>
              <Text style={styles.statIcon}>👤</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#d32f2f' }]}>
            <View style={styles.statContent}>
              <View>
                <Text style={styles.statNumber}>{stats.admins}</Text>
                <Text style={styles.statLabel}>Administrators</Text>
              </View>
              <Text style={styles.statIcon}>🔒</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#0288d1' }]}>
            <View style={styles.statContent}>
              <View>
                <Text style={styles.statNumber}>{stats.managers}</Text>
                <Text style={styles.statLabel}>Managers</Text>
              </View>
              <Text style={styles.statIcon}>👨‍💼</Text>
            </View>
          </View>
        </View>

        {/* Enhanced User Management - exact Material-UI structure */}
        <View style={styles.userManagementPaper}>
          <View style={styles.userManagementHeader}>
            <Text style={styles.userManagementTitle}>
              User Management
            </Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setOpenDialog(true)}
            >
              <Text style={styles.addButtonText}>+ Add New User</Text>
            </TouchableOpacity>
          </View>

          {/* Enhanced Filters - exact Material-UI structure */}
          <View style={styles.filtersContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search users..."
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            
            <View style={styles.filterRow}>
              <TouchableOpacity 
                style={[styles.filterButton, filterRole === 'all' && styles.activeFilter]}
                onPress={() => setFilterRole('all')}
              >
                <Text style={[styles.filterText, filterRole === 'all' && styles.activeFilterText]}>All Roles</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterRole === 'admin' && styles.activeFilter]}
                onPress={() => setFilterRole('admin')}
              >
                <Text style={[styles.filterText, filterRole === 'admin' && styles.activeFilterText]}>Admin</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterRole === 'manager' && styles.activeFilter]}
                onPress={() => setFilterRole('manager')}
              >
                <Text style={[styles.filterText, filterRole === 'manager' && styles.activeFilterText]}>Manager</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterRole === 'staff' && styles.activeFilter]}
                onPress={() => setFilterRole('staff')}
              >
                <Text style={[styles.filterText, filterRole === 'staff' && styles.activeFilterText]}>Staff</Text>
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
                <Text style={[styles.filterText, filterStatus === 'active' && styles.activeFilterText]}>Active</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterStatus === 'inactive' && styles.activeFilter]}
                onPress={() => setFilterStatus('inactive')}
              >
                <Text style={[styles.filterText, filterStatus === 'inactive' && styles.activeFilterText]}>Inactive</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Users Table/List Toggle - exact Material-UI structure */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity 
              style={[styles.tab, tabValue === 0 && styles.activeTab]}
              onPress={() => setTabValue(0)}
            >
              <Text style={[styles.tabText, tabValue === 0 && styles.activeTabText]}>List View</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, tabValue === 1 && styles.activeTab]}
              onPress={() => setTabValue(1)}
            >
              <Text style={[styles.tabText, tabValue === 1 && styles.activeTabText]}>Table View</Text>
            </TouchableOpacity>
          </View>

          {/* Enhanced List View - exact Material-UI structure */}
          {tabValue === 0 && (
            <View style={styles.listContainer}>
              {filteredUsers.map((user) => (
                <View key={user.id} style={styles.listItem}>
                  <View style={styles.listItemAvatar}>
                    <View style={[styles.avatar, { backgroundColor: getRoleColor(user.role) }]}>
                      <Text style={styles.avatarText}>{getRoleIcon(user.role)}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: user.status === 'active' ? '#388e3c' : '#f57c00' }]} />
                  </View>
                  
                  <View style={styles.listItemContent}>
                    <View style={styles.listItemHeader}>
                      <Text style={styles.userName}>{user.name}</Text>
                      <View style={styles.userBadges}>
                        <View style={[styles.roleBadge, { backgroundColor: getRoleColor(user.role) }]}>
                          <Text style={styles.badgeText}>{user.role}</Text>
                        </View>
                        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(user.status) }]}>
                          <Text style={styles.badgeText}>{user.status}</Text>
                        </View>
                      </View>
                    </View>
                    
                    <Text style={styles.userEmail}>📧 {user.email}</Text>
                    {user.phone && (
                      <Text style={styles.userPhone}>📞 {user.phone}</Text>
                    )}
                    {user.department && (
                      <Text style={styles.userDepartment}>{user.jobTitle} • {user.department}</Text>
                    )}
                    <Text style={styles.userPermissions}>
                      Permissions: {user.permissions.length} assigned • Last login: {formatLastLogin(user.lastLogin)}
                    </Text>
                    <Text style={styles.userDetails}>
                      Joined: {new Date(user.createdAt).toLocaleDateString()} • Login count: {user.loginCount || 0}
                    </Text>
                  </View>
                  
                  <View style={styles.listItemActions}>
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={styles.actionButtonText}>👁️</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={styles.actionButtonText}>✏️</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={styles.actionButtonText}>🔑</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={styles.actionButtonText}>{user.status === 'active' ? '✅' : '⏸️'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={styles.actionButtonText}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Table View - exact Material-UI structure */}
          {tabValue === 1 && (
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderCell}>User</Text>
                <Text style={styles.tableHeaderCell}>Contact</Text>
                <Text style={styles.tableHeaderCell}>Role</Text>
                <Text style={styles.tableHeaderCell}>Status</Text>
                <Text style={styles.tableHeaderCell}>Department</Text>
                <Text style={styles.tableHeaderCell}>Last Login</Text>
                <Text style={styles.tableHeaderCell}>Actions</Text>
              </View>
              
              {filteredUsers.map((user) => (
                <View key={user.id} style={styles.tableRow}>
                                     <View style={styles.tableCell}>
                     <View style={styles.userCell}>
                       <View style={[styles.avatar, { backgroundColor: getRoleColor(user.role) }]}>
                         <Text style={styles.avatarText}>{user.name.charAt(0).toUpperCase()}</Text>
                       </View>
                       <View style={{ flex: 1, minWidth: 0 }}>
                         <Text style={styles.tableUserName}>{user.name}</Text>
                         <Text style={styles.userJobTitle}>{user.jobTitle}</Text>
                       </View>
                     </View>
                   </View>
                   
                   <View style={styles.tableCell}>
                     <Text style={styles.tableUserEmail}>{user.email}</Text>
                     {user.phone && (
                       <Text style={styles.tableUserPhone}>{user.phone}</Text>
                     )}
                   </View>
                   
                   <View style={styles.tableCell}>
                     <View style={[styles.roleBadge, { backgroundColor: getRoleColor(user.role) }]}>
                       <Text style={styles.badgeText}>{user.role}</Text>
                     </View>
                   </View>
                   
                   <View style={styles.tableCell}>
                     <View style={[styles.statusBadge, { backgroundColor: getStatusColor(user.status) }]}>
                       <Text style={styles.badgeText}>{user.status}</Text>
                     </View>
                   </View>
                   
                   <View style={styles.tableCell}>
                     <Text style={styles.tableUserDepartment}>{user.department || '-'}</Text>
                   </View>
                   
                   <View style={styles.tableCell}>
                     <Text style={styles.userLastLogin}>{formatLastLogin(user.lastLogin)}</Text>
                   </View>
                  
                  <View style={styles.tableCell}>
                    <View style={styles.tableActions}>
                      <TouchableOpacity style={[styles.actionButton, { padding: screenWidth < 400 ? 6 : 8, minWidth: screenWidth < 400 ? 24 : 32 }]}>
                        <Text style={[styles.actionButtonText, { fontSize: screenWidth < 400 ? 12 : 16 }]}>👁️</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.actionButton, { padding: screenWidth < 400 ? 6 : 8, minWidth: screenWidth < 400 ? 24 : 32 }]}>
                        <Text style={[styles.actionButtonText, { fontSize: screenWidth < 400 ? 12 : 16 }]}>✏️</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.actionButton, { padding: screenWidth < 400 ? 6 : 8, minWidth: screenWidth < 400 ? 24 : 32 }]}>
                        <Text style={[styles.actionButtonText, { fontSize: screenWidth < 400 ? 12 : 16 }]}>🗑️</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}

          {filteredUsers.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>👤</Text>
              <Text style={styles.emptyTitle}>No users found</Text>
              <Text style={styles.emptySubtitle}>
                {searchTerm || filterRole !== 'all' || filterStatus !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start by adding your first user'}
              </Text>
              {!searchTerm && filterRole === 'all' && filterStatus === 'all' && (
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => setOpenDialog(true)}
                >
                  <Text style={styles.addButtonText}>+ Add New User</Text>
                </TouchableOpacity>
              )}
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

export default UserManagement;

const styles = StyleSheet.create({
  // Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} equivalent
  container: {
    flexGrow: 1,
    paddingTop: screenHeight < 700 ? 20 : 32, // mt: 4
    paddingBottom: screenHeight < 700 ? 20 : 32, // mb: 4
    paddingHorizontal: screenWidth < 400 ? 12 : 20,
    backgroundColor: '#f5f5f5', // Default Material-UI background
  },
  
  // Grid container spacing={3} equivalent
  gridContainer: {
    gap: screenHeight < 700 ? 16 : 24, // spacing={3} = 24px
  },
  
  // Enhanced Stats Cards - exact Material-UI structure
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: screenWidth < 400 ? 12 : 16,
  },
  
  statCard: {
    flex: screenWidth < 400 ? 0.48 : 1,
    minWidth: screenWidth < 400 ? 120 : 150,
    borderRadius: 4,
    padding: screenWidth < 400 ? 12 : 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  
  statContent: {
    flexDirection: screenWidth < 400 ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  statNumber: {
    fontSize: screenWidth < 400 ? 24 : 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: screenWidth < 400 ? 'center' : 'left',
  },
  
  statLabel: {
    fontSize: screenWidth < 400 ? 12 : 14,
    color: 'white',
    opacity: 0.9,
    textAlign: screenWidth < 400 ? 'center' : 'left',
  },
  
  statIcon: {
    fontSize: screenWidth < 400 ? 30 : 40,
    opacity: 0.8,
    alignSelf: screenWidth < 400 ? 'center' : 'auto',
  },
  
  // Enhanced User Management - exact Material-UI structure
  userManagementPaper: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    padding: screenWidth < 400 ? 16 : 24, // p: 3
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  
  userManagementHeader: {
    flexDirection: screenWidth < 400 ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: screenWidth < 400 ? 'flex-start' : 'center',
    marginBottom: screenHeight < 700 ? 16 : 24,
    gap: screenWidth < 400 ? 12 : 0,
  },
  
  userManagementTitle: {
    fontSize: screenWidth < 400 ? 20 : 24,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  
  addButton: {
    backgroundColor: '#1976d2',
    paddingHorizontal: screenWidth < 400 ? 12 : 16,
    paddingVertical: screenHeight < 700 ? 10 : 12,
    borderRadius: 4,
    alignSelf: screenWidth < 400 ? 'stretch' : 'auto',
  },
  
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: screenWidth < 400 ? 14 : 16,
    textAlign: screenWidth < 400 ? 'center' : 'left',
  },
  
  // Enhanced Filters - exact Material-UI structure
  filtersContainer: {
    marginBottom: screenHeight < 700 ? 16 : 24,
    gap: screenHeight < 700 ? 12 : 16,
  },
  
  searchInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    padding: screenWidth < 400 ? 10 : 12,
    backgroundColor: 'white',
    fontSize: screenWidth < 400 ? 14 : 16,
  },
  
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: screenWidth < 400 ? 6 : 8,
  },
  
  filterButton: {
    paddingHorizontal: screenWidth < 400 ? 12 : 16,
    paddingVertical: screenHeight < 700 ? 6 : 8,
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
    fontSize: screenWidth < 400 ? 12 : 14,
    color: '#666',
  },
  
  activeFilterText: {
    color: 'white',
  },
  
  // Users Table/List Toggle - exact Material-UI structure
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: screenHeight < 700 ? 12 : 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  
  tab: {
    paddingHorizontal: screenWidth < 400 ? 12 : 16,
    paddingVertical: screenHeight < 700 ? 10 : 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    flex: 1,
  },
  
  activeTab: {
    borderBottomColor: '#1976d2',
  },
  
  tabText: {
    fontSize: screenWidth < 400 ? 14 : 16,
    color: '#666',
    textAlign: 'center',
  },
  
  activeTabText: {
    color: '#1976d2',
    fontWeight: 'bold',
  },
  
  // Enhanced List View - exact Material-UI structure
  listContainer: {
    gap: screenHeight < 700 ? 12 : 16,
  },
  
  listItem: {
    flexDirection: screenWidth < 400 ? 'column' : 'row',
    alignItems: screenWidth < 400 ? 'flex-start' : 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: screenWidth < 400 ? 12 : 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    width: '100%',
    minHeight: screenWidth < 400 ? 120 : 80,
  },
  
  listItemAvatar: {
    position: 'relative',
    marginRight: screenWidth < 400 ? 0 : 16,
    marginBottom: screenWidth < 400 ? 12 : 0,
    alignSelf: screenWidth < 400 ? 'center' : 'auto',
    flexShrink: 0,
  },
  
  avatar: {
    width: screenWidth < 400 ? 48 : 56,
    height: screenWidth < 400 ? 48 : 56,
    borderRadius: screenWidth < 400 ? 24 : 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  avatarText: {
    fontSize: screenWidth < 400 ? 20 : 24,
    color: 'white',
  },
  
  statusBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: screenWidth < 400 ? 10 : 12,
    height: screenWidth < 400 ? 10 : 12,
    borderRadius: screenWidth < 400 ? 5 : 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  
  listItemContent: {
    flex: 1,
    width: screenWidth < 400 ? '100%' : 'auto',
    minWidth: 0, // Prevents text overflow issues
  },
  
  listItemHeader: {
    flexDirection: screenWidth < 400 ? 'column' : 'row',
    alignItems: screenWidth < 400 ? 'flex-start' : 'center',
    flexWrap: 'wrap',
    marginBottom: screenHeight < 700 ? 6 : 8,
    width: '100%',
  },
  
  userName: {
    fontSize: screenWidth < 400 ? 16 : 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: screenWidth < 400 ? 0 : 8,
    marginBottom: screenWidth < 400 ? 4 : 0,
    flexShrink: 1,
    minWidth: 0,
  },
  
  userBadges: {
    flexDirection: 'row',
    gap: screenWidth < 400 ? 6 : 8,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  
  roleBadge: {
    paddingHorizontal: screenWidth < 400 ? 6 : 8,
    paddingVertical: screenHeight < 700 ? 3 : 4,
    borderRadius: 12,
    flexShrink: 0,
  },
  
  badgeText: {
    fontSize: screenWidth < 400 ? 10 : 12,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  userEmail: {
    fontSize: screenWidth < 400 ? 12 : 14,
    color: '#666',
    marginBottom: 4,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  
  userPhone: {
    fontSize: screenWidth < 400 ? 12 : 14,
    color: '#666',
    marginBottom: 4,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  
  userDepartment: {
    fontSize: screenWidth < 400 ? 12 : 14,
    color: '#666',
    marginBottom: 4,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  
  userPermissions: {
    fontSize: screenWidth < 400 ? 10 : 12,
    color: '#999',
    marginBottom: 4,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  
  userDetails: {
    fontSize: screenWidth < 400 ? 10 : 12,
    color: '#999',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  
  listItemActions: {
    flexDirection: 'row',
    gap: screenWidth < 400 ? 6 : 4,
    justifyContent: screenWidth < 400 ? 'center' : 'flex-end',
    marginTop: screenWidth < 400 ? 12 : 0,
    width: screenWidth < 400 ? '100%' : 'auto',
    flexShrink: 0,
  },
  
  actionButton: {
    padding: screenWidth < 400 ? 10 : 8,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
    flex: screenWidth < 400 ? 1 : 0,
    minWidth: screenWidth < 400 ? 40 : 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  actionButtonText: {
    fontSize: screenWidth < 400 ? 14 : 16,
    textAlign: 'center',
  },
  
  // Table View - exact Material-UI structure
  tableContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    overflow: 'hidden',
  },
  
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    paddingVertical: screenHeight < 700 ? 10 : 12,
    paddingHorizontal: screenWidth < 400 ? 8 : 16,
  },
  
  tableHeaderCell: {
    flex: screenWidth < 400 ? 0.8 : 1,
    fontSize: screenWidth < 400 ? 10 : 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: screenWidth < 400 ? 'center' : 'left',
    minWidth: screenWidth < 400 ? 50 : 80,
  },
  
  tableRow: {
    flexDirection: 'row',
    paddingVertical: screenHeight < 700 ? 8 : 12,
    paddingHorizontal: screenWidth < 400 ? 6 : 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
    minHeight: screenWidth < 400 ? 60 : 80,
  },
  
  tableCell: {
    flex: screenWidth < 400 ? 0.8 : 1,
    justifyContent: 'center',
    minWidth: screenWidth < 400 ? 50 : 80,
    paddingHorizontal: screenWidth < 400 ? 2 : 4,
  },
  
  userCell: {
    flexDirection: screenWidth < 400 ? 'column' : 'row',
    alignItems: 'center',
    gap: screenWidth < 400 ? 2 : 8,
    flex: 1,
    minWidth: 0,
  },
  
  userJobTitle: {
    fontSize: screenWidth < 400 ? 8 : 12,
    color: '#666',
    textAlign: 'center',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  
  userLastLogin: {
    fontSize: screenWidth < 400 ? 10 : 14,
    color: '#666',
    textAlign: 'center',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  
  tableActions: {
    flexDirection: 'row',
    gap: screenWidth < 400 ? 2 : 4,
    justifyContent: 'center',
    flexShrink: 0,
  },
  
  // Table-specific text styles to prevent wrapping issues
  tableUserName: {
    fontSize: screenWidth < 400 ? 10 : 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    flexWrap: 'wrap',
    flexShrink: 1,
    minWidth: 0,
  },
  
  tableUserEmail: {
    fontSize: screenWidth < 400 ? 8 : 12,
    color: '#666',
    textAlign: 'center',
    flexWrap: 'wrap',
    flexShrink: 1,
    minWidth: 0,
  },
  
  tableUserPhone: {
    fontSize: screenWidth < 400 ? 8 : 12,
    color: '#666',
    textAlign: 'center',
    flexWrap: 'wrap',
    flexShrink: 1,
    minWidth: 0,
  },
  
  tableUserDepartment: {
    fontSize: screenWidth < 400 ? 8 : 12,
    color: '#666',
    textAlign: 'center',
    flexWrap: 'wrap',
    flexShrink: 1,
    minWidth: 0,
  },
  
  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: screenHeight < 700 ? 24 : 32,
  },
  
  emptyIcon: {
    fontSize: screenWidth < 400 ? 60 : 80,
    color: '#ccc',
    marginBottom: screenHeight < 700 ? 12 : 16,
  },
  
  emptyTitle: {
    fontSize: screenWidth < 400 ? 16 : 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: screenHeight < 700 ? 6 : 8,
    textAlign: 'center',
  },
  
  emptySubtitle: {
    fontSize: screenWidth < 400 ? 12 : 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: screenHeight < 700 ? 12 : 16,
    paddingHorizontal: screenWidth < 400 ? 20 : 0,
  },
  
  backButton: {
    backgroundColor: '#666',
    paddingVertical: screenHeight < 700 ? 10 : 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: screenHeight < 700 ? 16 : 20,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: screenWidth < 400 ? 14 : 16,
  },
});