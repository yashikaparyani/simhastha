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
  FlatList,
  Dimensions
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Exact conversion from web admin dashboard structure
const PaymentManagement = () => {
  const navigation = useNavigation();
  
  const [payments, setPayments] = useState([
    {
      id: "1",
      transactionId: "TXN001234567",
      userId: "user_001",
      userName: "Rajesh Kumar",
      amount: 2500,
      type: "Hotel Booking",
      status: "completed",
      paymentMethod: "UPI",
      timestamp: "2024-01-15T10:30:00Z",
      description: "Hotel booking for 2 nights",
      commission: 125
    },
    {
      id: "2",
      transactionId: "TXN001234568",
      userId: "user_002",
      userName: "Priya Sharma",
      amount: 450,
      type: "Transport Booking",
      status: "completed",
      paymentMethod: "Credit Card",
      timestamp: "2024-01-15T11:15:00Z",
      description: "Bus booking for temple visit",
      commission: 22.5
    },
    {
      id: "3",
      transactionId: "TXN001234569",
      userId: "user_003",
      userName: "Amit Singh",
      amount: 1200,
      type: "Prasad Booking",
      status: "pending",
      paymentMethod: "Net Banking",
      timestamp: "2024-01-15T12:00:00Z",
      description: "Prasad booking for family",
      commission: 60
    },
    {
      id: "4",
      transactionId: "TXN001234570",
      userId: "user_004",
      userName: "Sunita Patel",
      amount: 800,
      type: "Parking Fee",
      status: "failed",
      paymentMethod: "Wallet",
      timestamp: "2024-01-15T13:45:00Z",
      description: "Parking fee for 2 days",
      commission: 0
    },
    {
      id: "5",
      transactionId: "TXN001234571",
      userId: "user_005",
      userName: "Vikram Joshi",
      amount: 3200,
      type: "Hotel Booking",
      status: "completed",
      paymentMethod: "Debit Card",
      timestamp: "2024-01-15T14:20:00Z",
      description: "Premium hotel booking",
      commission: 160
    }
  ]);

  const [filteredPayments, setFilteredPayments] = useState(payments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    filterPayments();
  }, [searchTerm, filterStatus, filterType, payments]);

  const filterPayments = () => {
    let filtered = payments;

    if (searchTerm) {
      filtered = filtered.filter(payment =>
        payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(payment => payment.status === filterStatus);
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(payment => payment.type === filterType);
    }

    setFilteredPayments(filtered);
  };

  const stats = {
    total: payments.length,
    completed: payments.filter(p => p.status === 'completed').length,
    pending: payments.filter(p => p.status === 'pending').length,
    failed: payments.filter(p => p.status === 'failed').length,
    totalAmount: payments.reduce((sum, p) => sum + p.amount, 0),
    totalCommission: payments.reduce((sum, p) => sum + p.commission, 0)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#388e3c';
      case 'pending': return '#f57c00';
      case 'failed': return '#d32f2f';
      default: return '#666';
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'UPI': return '📱';
      case 'Credit Card': return '💳';
      case 'Debit Card': return '💳';
      case 'Net Banking': return '🏦';
      case 'Wallet': return '💰';
      default: return '💳';
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

  const renderPaymentItem = ({ item: payment }) => (
    <View style={styles.paymentCard}>
      <View style={styles.paymentHeader}>
        <View style={styles.paymentInfo}>
          <Text style={styles.transactionId}>{payment.transactionId}</Text>
          <Text style={styles.userName}>👤 {payment.userName}</Text>
          <Text style={styles.paymentType}>📋 {payment.type}</Text>
          <Text style={styles.paymentDescription}>{payment.description}</Text>
        </View>
        <View style={styles.paymentStatus}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(payment.status) }]}>
            <Text style={styles.statusText}>{payment.status}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.paymentDetails}>
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Amount</Text>
          <Text style={styles.amount}>₹{payment.amount.toLocaleString()}</Text>
        </View>
        <View style={styles.commissionContainer}>
          <Text style={styles.commissionLabel}>Commission</Text>
          <Text style={styles.commission}>₹{payment.commission.toLocaleString()}</Text>
        </View>
        <View style={styles.methodContainer}>
          <Text style={styles.methodLabel}>Method</Text>
          <Text style={styles.method}>
            {getPaymentMethodIcon(payment.paymentMethod)} {payment.paymentMethod}
          </Text>
        </View>
      </View>
      
      <View style={styles.paymentFooter}>
        <Text style={styles.timestamp}>{formatTimestamp(payment.timestamp)}</Text>
        <View style={styles.paymentActions}>
          <TouchableOpacity style={[styles.actionButton, styles.viewButton]}>
            <Text style={styles.actionButtonText}>👁️ View</Text>
          </TouchableOpacity>
          {payment.status === 'pending' && (
            <TouchableOpacity style={[styles.actionButton, styles.approveButton]}>
              <Text style={styles.actionButtonText}>✅ Approve</Text>
            </TouchableOpacity>
          )}
          {payment.status === 'failed' && (
            <TouchableOpacity style={[styles.actionButton, styles.retryButton]}>
              <Text style={styles.actionButtonText}>🔄 Retry</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} equivalent */}
      <View style={styles.gridContainer}>
        {/* Enhanced Stats Cards */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#1976d2' }]}>
            <View style={styles.statContent}>
              <View>
                <Text style={styles.statNumber}>{stats.total}</Text>
                <Text style={styles.statLabel}>Total Transactions</Text>
              </View>
              <Text style={styles.statIcon}>💳</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#388e3c' }]}>
            <View style={styles.statContent}>
              <View>
                <Text style={styles.statNumber}>{stats.completed}</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>
              <Text style={styles.statIcon}>✅</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#f57c00' }]}>
            <View style={styles.statContent}>
              <View>
                <Text style={styles.statNumber}>{stats.pending}</Text>
                <Text style={styles.statLabel}>Pending</Text>
              </View>
              <Text style={styles.statIcon}>⏳</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#d32f2f' }]}>
            <View style={styles.statContent}>
              <View>
                <Text style={styles.statNumber}>{stats.failed}</Text>
                <Text style={styles.statLabel}>Failed</Text>
              </View>
              <Text style={styles.statIcon}>❌</Text>
            </View>
          </View>
        </View>

        {/* Revenue Stats */}
        <View style={styles.revenueStats}>
          <View style={[styles.revenueCard, { backgroundColor: '#4caf50' }]}>
            <View style={styles.revenueContent}>
              <View>
                <Text style={styles.revenueNumber}>₹{stats.totalAmount.toLocaleString()}</Text>
                <Text style={styles.revenueLabel}>Total Revenue</Text>
              </View>
              <Text style={styles.revenueIcon}>💰</Text>
            </View>
          </View>
          
          <View style={[styles.revenueCard, { backgroundColor: '#ff9800' }]}>
            <View style={styles.revenueContent}>
              <View>
                <Text style={styles.revenueNumber}>₹{stats.totalCommission.toLocaleString()}</Text>
                <Text style={styles.revenueLabel}>Total Commission</Text>
              </View>
              <Text style={styles.revenueIcon}>📈</Text>
            </View>
          </View>
        </View>

        {/* Payment Management Paper */}
        <View style={styles.managementPaper}>
          <View style={styles.managementHeader}>
            <Text style={styles.managementTitle}>
              Payment Management
            </Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddModal(true)}
            >
              <Text style={styles.addButtonText}>📊 Reports</Text>
            </TouchableOpacity>
          </View>

          {/* Filters */}
          <View style={styles.filtersContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search transactions..."
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            
            <View style={styles.filterRow}>
              <TouchableOpacity 
                style={[styles.filterButton, filterStatus === 'all' && styles.activeFilter]}
                onPress={() => setFilterStatus('all')}
              >
                <Text style={[styles.filterText, filterStatus === 'all' && styles.activeFilterText]}>All Status</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterStatus === 'completed' && styles.activeFilter]}
                onPress={() => setFilterStatus('completed')}
              >
                <Text style={[styles.filterText, filterStatus === 'completed' && styles.activeFilterText]}>✅ Completed</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterStatus === 'pending' && styles.activeFilter]}
                onPress={() => setFilterStatus('pending')}
              >
                <Text style={[styles.filterText, filterStatus === 'pending' && styles.activeFilterText]}>⏳ Pending</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterStatus === 'failed' && styles.activeFilter]}
                onPress={() => setFilterStatus('failed')}
              >
                <Text style={[styles.filterText, filterStatus === 'failed' && styles.activeFilterText]}>❌ Failed</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.filterRow}>
              <TouchableOpacity 
                style={[styles.filterButton, filterType === 'all' && styles.activeFilter]}
                onPress={() => setFilterType('all')}
              >
                <Text style={[styles.filterText, filterType === 'all' && styles.activeFilterText]}>All Types</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterType === 'Hotel Booking' && styles.activeFilter]}
                onPress={() => setFilterType('Hotel Booking')}
              >
                <Text style={[styles.filterText, filterType === 'Hotel Booking' && styles.activeFilterText]}>🏨 Hotel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterType === 'Transport Booking' && styles.activeFilter]}
                onPress={() => setFilterType('Transport Booking')}
              >
                <Text style={[styles.filterText, filterType === 'Transport Booking' && styles.activeFilterText]}>🚗 Transport</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterType === 'Prasad Booking' && styles.activeFilter]}
                onPress={() => setFilterType('Prasad Booking')}
              >
                <Text style={[styles.filterText, filterType === 'Prasad Booking' && styles.activeFilterText]}>🍽️ Prasad</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Payments List */}
          <FlatList
            data={filteredPayments}
            renderItem={renderPaymentItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            style={styles.paymentsList}
          />

          {filteredPayments.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>💳</Text>
              <Text style={styles.emptyTitle}>No transactions found</Text>
              <Text style={styles.emptySubtitle}>
                {searchTerm || filterStatus !== 'all' || filterType !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'No payment transactions available'}
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

export default PaymentManagement;

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
  
  // Enhanced Stats Cards
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
  
  // Revenue Stats
  revenueStats: {
    flexDirection: 'row',
    gap: 16,
  },
  
  revenueCard: {
    flex: 1,
    borderRadius: 4,
    padding: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  
  revenueContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  revenueNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  
  revenueLabel: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  
  revenueIcon: {
    fontSize: 32,
    opacity: 0.8,
  },
  
  // Management Paper
  managementPaper: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    padding: screenWidth < 400 ? 16 : 24, // p: 3
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  
  managementHeader: {
    flexDirection: screenWidth < 400 ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: screenWidth < 400 ? 'flex-start' : 'center',
    marginBottom: screenHeight < 700 ? 16 : 24,
    gap: screenWidth < 400 ? 12 : 0,
  },
  
  managementTitle: {
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
  
  // Filters
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
  
  // Payments List
  paymentsList: {
    gap: 16,
  },
  
  paymentCard: {
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
  
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  
  paymentInfo: {
    flex: 1,
  },
  
  transactionId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  
  userName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  
  paymentType: {
    fontSize: 14,
    color: '#1976d2',
    fontWeight: '500',
    marginBottom: 4,
  },
  
  paymentDescription: {
    fontSize: 12,
    color: '#999',
  },
  
  paymentStatus: {
    alignItems: 'flex-end',
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
  
  paymentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  
  amountContainer: {
    alignItems: 'center',
  },
  
  amountLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#388e3c',
  },
  
  commissionContainer: {
    alignItems: 'center',
  },
  
  commissionLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  
  commission: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f57c00',
  },
  
  methodContainer: {
    alignItems: 'center',
  },
  
  methodLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  
  method: {
    fontSize: 14,
    color: '#1976d2',
    fontWeight: '500',
  },
  
  paymentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  
  paymentActions: {
    flexDirection: 'row',
    gap: 8,
  },
  
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  
  viewButton: {
    backgroundColor: '#1976d2',
  },
  
  approveButton: {
    backgroundColor: '#388e3c',
  },
  
  retryButton: {
    backgroundColor: '#f57c00',
  },
  
  actionButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
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
