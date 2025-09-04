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
                      <View>
                        <Text style={styles.userName}>{user.name}</Text>
                        <Text style={styles.userJobTitle}>{user.jobTitle}</Text>
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.tableCell}>
                    <Text style={styles.userEmail}>{user.email}</Text>
                    {user.phone && (
                      <Text style={styles.userPhone}>{user.phone}</Text>
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
                    <Text style={styles.userDepartment}>{user.department || '-'}</Text>
                  </View>
                  
                  <View style={styles.tableCell}>
                    <Text style={styles.userLastLogin}>{formatLastLogin(user.lastLogin)}</Text>
                  </View>
                  
                  <View style={styles.tableCell}>
                    <View style={styles.tableActions}>
                      <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>👁️</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>✏️</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>🗑️</Text>
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
    paddingTop: 32, // mt: 4
    paddingBottom: 32, // mb: 4
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5', // Default Material-UI background
  },
  
  // Grid container spacing={3} equivalent
  gridContainer: {
    gap: 24, // spacing={3} = 24px
  },
  
  // Enhanced Stats Cards - exact Material-UI structure
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
  
  // Enhanced User Management - exact Material-UI structure
  userManagementPaper: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    padding: 24, // p: 3
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  
  userManagementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  
  userManagementTitle: {
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
  
  // Enhanced Filters - exact Material-UI structure
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
  
  // Users Table/List Toggle - exact Material-UI structure
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  
  activeTab: {
    borderBottomColor: '#1976d2',
  },
  
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  
  activeTabText: {
    color: '#1976d2',
    fontWeight: 'bold',
  },
  
  // Enhanced List View - exact Material-UI structure
  listContainer: {
    gap: 16,
  },
  
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  
  listItemAvatar: {
    position: 'relative',
    marginRight: 16,
  },
  
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  avatarText: {
    fontSize: 24,
    color: 'white',
  },
  
  statusBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  
  listItemContent: {
    flex: 1,
  },
  
  listItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  
  userBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  
  badgeText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  
  userPhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  
  userDepartment: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  
  userPermissions: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  
  userDetails: {
    fontSize: 12,
    color: '#999',
  },
  
  listItemActions: {
    flexDirection: 'row',
    gap: 4,
  },
  
  actionButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
  },
  
  actionButtonText: {
    fontSize: 16,
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
  },
  
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  
  tableHeaderCell: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  
  tableCell: {
    flex: 1,
    justifyContent: 'center',
  },
  
  userCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  
  userJobTitle: {
    fontSize: 12,
    color: '#666',
  },
  
  userLastLogin: {
    fontSize: 14,
    color: '#666',
  },
  
  tableActions: {
    flexDirection: 'row',
    gap: 4,
  },
  
  // Empty State
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
    marginBottom: 16,
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