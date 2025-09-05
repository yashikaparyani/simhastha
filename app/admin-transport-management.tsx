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
const TransportManagement = () => {
  const navigation = useNavigation();
  
  // Modal state for booking details
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState(null);
  
  // Sample booking data for each transport
  const getTransportBookings = (transportId) => {
    const sampleBookings = [
      {
        id: "TB001",
        passengerName: "Rajesh Kumar",
        passengerEmail: "rajesh@email.com",
        passengerPhone: "+91-9876543210",
        travelDate: "2024-01-15",
        departureTime: "06:00 AM",
        arrivalTime: "07:30 AM",
        seats: 2,
        passengers: 2,
        totalAmount: 300,
        bookingDate: "2024-01-10",
        status: "Confirmed",
        paymentMethod: "UPI",
        pickupLocation: "Temple Complex Gate 1",
        dropLocation: "City Center Mall"
      },
      {
        id: "TB002",
        passengerName: "Priya Sharma",
        passengerEmail: "priya@email.com",
        passengerPhone: "+91-9876543211",
        travelDate: "2024-01-16",
        departureTime: "06:00 AM",
        arrivalTime: "07:30 AM",
        seats: 1,
        passengers: 1,
        totalAmount: 150,
        bookingDate: "2024-01-12",
        status: "Confirmed",
        paymentMethod: "Credit Card",
        pickupLocation: "Temple Complex Gate 2",
        dropLocation: "Airport Terminal"
      },
      {
        id: "TB003",
        passengerName: "Amit Patel",
        passengerEmail: "amit@email.com",
        passengerPhone: "+91-9876543212",
        travelDate: "2024-01-17",
        departureTime: "06:00 AM",
        arrivalTime: "07:30 AM",
        seats: 4,
        passengers: 4,
        totalAmount: 600,
        bookingDate: "2024-01-14",
        status: "Pending",
        paymentMethod: "Net Banking",
        pickupLocation: "City Center",
        dropLocation: "Temple Complex"
      },
      {
        id: "TB004",
        passengerName: "Sneha Gupta",
        passengerEmail: "sneha@email.com",
        passengerPhone: "+91-9876543213",
        travelDate: "2024-01-18",
        departureTime: "06:00 AM",
        arrivalTime: "07:30 AM",
        seats: 1,
        passengers: 1,
        totalAmount: 150,
        bookingDate: "2024-01-16",
        status: "Confirmed",
        paymentMethod: "UPI",
        pickupLocation: "Airport",
        dropLocation: "Temple Complex"
      },
      {
        id: "TB005",
        passengerName: "Vikram Singh",
        passengerEmail: "vikram@email.com",
        passengerPhone: "+91-9876543214",
        travelDate: "2024-01-19",
        departureTime: "06:00 AM",
        arrivalTime: "07:30 AM",
        seats: 3,
        passengers: 3,
        totalAmount: 450,
        bookingDate: "2024-01-18",
        status: "Confirmed",
        paymentMethod: "Debit Card",
        pickupLocation: "Temple Complex",
        dropLocation: "City Center"
      }
    ];
    
    // Return random subset of bookings (2-4 bookings)
    const shuffled = sampleBookings.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 3) + 2);
  };
  
  const [transports, setTransports] = useState([
    {
      id: "1",
      name: "City Bus Service",
      type: "Bus",
      capacity: 50,
      availableSeats: 12,
      pricePerSeat: 150,
      route: "Temple Complex - City Center",
      driver: "Rajesh Kumar",
      contact: "+91-9876543210",
      status: "active",
      bookings: 38,
      revenue: 5700,
      departureTime: "06:00 AM",
      arrivalTime: "07:30 AM"
    },
    {
      id: "2",
      name: "Premium Shuttle",
      type: "Shuttle",
      capacity: 20,
      availableSeats: 5,
      pricePerSeat: 300,
      route: "Airport - Temple Complex",
      driver: "Priya Sharma",
      contact: "+91-9876543211",
      status: "active",
      bookings: 15,
      revenue: 4500,
      departureTime: "08:00 AM",
      arrivalTime: "09:00 AM"
    },
    {
      id: "3",
      name: "Local Auto Service",
      type: "Auto",
      capacity: 3,
      availableSeats: 1,
      pricePerSeat: 80,
      route: "Local Area - Temple",
      driver: "Amit Singh",
      contact: "+91-9876543212",
      status: "active",
      bookings: 25,
      revenue: 2000,
      departureTime: "Flexible",
      arrivalTime: "Flexible"
    },
    {
      id: "4",
      name: "VIP Car Service",
      type: "Car",
      capacity: 4,
      availableSeats: 0,
      pricePerSeat: 500,
      route: "Hotel - Temple Complex",
      driver: "Sunita Patel",
      contact: "+91-9876543213",
      status: "inactive",
      bookings: 0,
      revenue: 0,
      departureTime: "On Demand",
      arrivalTime: "On Demand"
    }
  ]);

  const [filteredTransports, setFilteredTransports] = useState(transports);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTransport, setNewTransport] = useState({
    name: '',
    type: 'Bus',
    capacity: '',
    pricePerSeat: '',
    route: '',
    driver: '',
    contact: ''
  });

  useEffect(() => {
    filterTransports();
  }, [searchTerm, filterType, filterStatus, transports]);

  const filterTransports = () => {
    let filtered = transports;

    if (searchTerm) {
      filtered = filtered.filter(transport =>
        transport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transport.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transport.driver.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(transport => transport.type === filterType);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(transport => transport.status === filterStatus);
    }

    setFilteredTransports(filtered);
  };

  const stats = {
    total: transports.length,
    active: transports.filter(t => t.status === 'active').length,
    totalCapacity: transports.reduce((sum, t) => sum + t.capacity, 0),
    availableSeats: transports.reduce((sum, t) => sum + t.availableSeats, 0),
    totalBookings: transports.reduce((sum, t) => sum + t.bookings, 0),
    totalRevenue: transports.reduce((sum, t) => sum + t.revenue, 0)
  };

  const handleViewBookings = (transport) => {
    console.log('View bookings for:', transport);
    setSelectedTransport(transport);
    setShowBookingModal(true);
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? '#388e3c' : '#f57c00';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Bus': return '🚌';
      case 'Shuttle': return '🚐';
      case 'Auto': return '🛺';
      case 'Car': return '🚗';
      default: return '🚗';
    }
  };

  const renderTransportItem = ({ item: transport }) => (
    <View style={styles.transportCard}>
      <View style={styles.transportHeader}>
        <View style={styles.transportInfo}>
          <Text style={styles.transportName}>{transport.name}</Text>
          <Text style={styles.transportType}>{getTypeIcon(transport.type)} {transport.type}</Text>
          <Text style={styles.transportRoute}>🛣️ {transport.route}</Text>
          <View style={styles.transportStats}>
            <Text style={styles.transportStat}>👥 {transport.capacity} seats</Text>
            <Text style={styles.transportStat}>💰 ₹{transport.pricePerSeat}/seat</Text>
            <Text style={styles.transportStat}>👨‍💼 {transport.driver}</Text>
          </View>
        </View>
        <View style={styles.transportStatus}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(transport.status) }]}>
            <Text style={styles.statusText}>{transport.status}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.transportDetails}>
        <Text style={styles.availability}>
          Available: {transport.availableSeats}/{transport.capacity} seats
        </Text>
        <Text style={styles.bookings}>Bookings: {transport.bookings}</Text>
        <Text style={styles.revenue}>Revenue: ₹{transport.revenue.toLocaleString()}</Text>
        <Text style={styles.timing}>
          {transport.departureTime} - {transport.arrivalTime}
        </Text>
      </View>
      
      <View style={styles.transportActions}>
        <TouchableOpacity style={[styles.actionButton, styles.editButton]}>
          <Text style={styles.actionButtonText}>✏️ Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.viewButton]}
          onPress={() => handleViewBookings(transport)}
        >
          <Text style={styles.actionButtonText}>👁️ View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.toggleButton]}>
          <Text style={styles.actionButtonText}>
            {transport.status === 'active' ? '⏸️ Deactivate' : '▶️ Activate'}
          </Text>
        </TouchableOpacity>
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
                <Text style={styles.statLabel}>Total Vehicles</Text>
              </View>
              <Text style={styles.statIcon}>🚗</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#388e3c' }]}>
            <View style={styles.statContent}>
              <View>
                <Text style={styles.statNumber}>{stats.active}</Text>
                <Text style={styles.statLabel}>Active Vehicles</Text>
              </View>
              <Text style={styles.statIcon}>✅</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#f57c00' }]}>
            <View style={styles.statContent}>
              <View>
                <Text style={styles.statNumber}>{stats.totalCapacity}</Text>
                <Text style={styles.statLabel}>Total Capacity</Text>
              </View>
              <Text style={styles.statIcon}>👥</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#d32f2f' }]}>
            <View style={styles.statContent}>
              <View>
                <Text style={styles.statNumber}>{stats.availableSeats}</Text>
                <Text style={styles.statLabel}>Available Seats</Text>
              </View>
              <Text style={styles.statIcon}>🔓</Text>
            </View>
          </View>
        </View>

        {/* Transport Management Paper */}
        <View style={styles.managementPaper}>
          <View style={styles.managementHeader}>
            <Text style={styles.managementTitle}>
              Transport Management
            </Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddModal(true)}
            >
              <Text style={styles.addButtonText}>+ Add Vehicle</Text>
            </TouchableOpacity>
          </View>

          {/* Filters */}
          <View style={styles.filtersContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search vehicles..."
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            
            <View style={styles.filterRow}>
              <TouchableOpacity 
                style={[styles.filterButton, filterType === 'all' && styles.activeFilter]}
                onPress={() => setFilterType('all')}
              >
                <Text style={[styles.filterText, filterType === 'all' && styles.activeFilterText]}>All Types</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterType === 'Bus' && styles.activeFilter]}
                onPress={() => setFilterType('Bus')}
              >
                <Text style={[styles.filterText, filterType === 'Bus' && styles.activeFilterText]}>🚌 Bus</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterType === 'Shuttle' && styles.activeFilter]}
                onPress={() => setFilterType('Shuttle')}
              >
                <Text style={[styles.filterText, filterType === 'Shuttle' && styles.activeFilterText]}>🚐 Shuttle</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterType === 'Auto' && styles.activeFilter]}
                onPress={() => setFilterType('Auto')}
              >
                <Text style={[styles.filterText, filterType === 'Auto' && styles.activeFilterText]}>🛺 Auto</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterType === 'Car' && styles.activeFilter]}
                onPress={() => setFilterType('Car')}
              >
                <Text style={[styles.filterText, filterType === 'Car' && styles.activeFilterText]}>🚗 Car</Text>
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

          {/* Transports List */}
          <FlatList
            data={filteredTransports}
            renderItem={renderTransportItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            style={styles.transportsList}
          />

          {filteredTransports.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🚗</Text>
              <Text style={styles.emptyTitle}>No vehicles found</Text>
              <Text style={styles.emptySubtitle}>
                {searchTerm || filterType !== 'all' || filterStatus !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start by adding your first vehicle'}
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

      {/* Booking Details Modal */}
      <Modal
        visible={showBookingModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowBookingModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              🚌 Bookings for {selectedTransport?.name}
            </Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowBookingModal(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            {selectedTransport && getTransportBookings(selectedTransport.id).map((booking) => (
              <View key={booking.id} style={styles.bookingCard}>
                <View style={styles.bookingHeader}>
                  <Text style={styles.bookingId}>Booking #{booking.id}</Text>
                  <View style={[
                    styles.statusBadge, 
                    { backgroundColor: booking.status === 'Confirmed' ? '#388e3c' : '#f57c00' }
                  ]}>
                    <Text style={styles.statusText}>{booking.status}</Text>
                  </View>
                </View>
                
                <View style={styles.bookingDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>👤 Passenger:</Text>
                    <Text style={styles.detailValue}>{booking.passengerName}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>📧 Email:</Text>
                    <Text style={styles.detailValue}>{booking.passengerEmail}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>📞 Phone:</Text>
                    <Text style={styles.detailValue}>{booking.passengerPhone}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>📅 Travel Date:</Text>
                    <Text style={styles.detailValue}>{booking.travelDate}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>🕕 Departure:</Text>
                    <Text style={styles.detailValue}>{booking.departureTime}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>🕕 Arrival:</Text>
                    <Text style={styles.detailValue}>{booking.arrivalTime}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>🪑 Seats:</Text>
                    <Text style={styles.detailValue}>{booking.seats}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>👥 Passengers:</Text>
                    <Text style={styles.detailValue}>{booking.passengers}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>📍 Pickup:</Text>
                    <Text style={styles.detailValue}>{booking.pickupLocation}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>📍 Drop:</Text>
                    <Text style={styles.detailValue}>{booking.dropLocation}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>💰 Total Amount:</Text>
                    <Text style={styles.detailValue}>₹{booking.totalAmount}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>📅 Booking Date:</Text>
                    <Text style={styles.detailValue}>{booking.bookingDate}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>💳 Payment:</Text>
                    <Text style={styles.detailValue}>{booking.paymentMethod}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default TransportManagement;

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
  
  // Transports List
  transportsList: {
    gap: 16,
  },
  
  transportCard: {
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
  
  transportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  
  transportInfo: {
    flex: 1,
  },
  
  transportName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  
  transportType: {
    fontSize: 14,
    color: '#1976d2',
    fontWeight: '500',
    marginBottom: 4,
  },
  
  transportRoute: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  
  transportStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  
  transportStat: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  
  transportStatus: {
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
  
  transportDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
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
  
  bookings: {
    fontSize: 14,
    color: '#388e3c',
    fontWeight: '500',
  },
  
  revenue: {
    fontSize: 14,
    color: '#f57c00',
    fontWeight: '500',
  },
  
  timing: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  
  transportActions: {
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
  
  editButton: {
    backgroundColor: '#1976d2',
  },
  
  viewButton: {
    backgroundColor: '#388e3c',
  },
  
  toggleButton: {
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
    fontSize: screenWidth < 400 ? 14 : 16,
  },
  
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: screenWidth < 400 ? 16 : 20,
    paddingVertical: screenHeight < 700 ? 16 : 20,
    backgroundColor: '#1976d2',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  
  modalTitle: {
    fontSize: screenWidth < 400 ? 18 : 20,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
  
  closeButton: {
    padding: screenWidth < 400 ? 8 : 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  
  closeButtonText: {
    fontSize: screenWidth < 400 ? 16 : 18,
    color: 'white',
    fontWeight: 'bold',
  },
  
  modalContent: {
    flex: 1,
    paddingHorizontal: screenWidth < 400 ? 12 : 20,
    paddingVertical: screenHeight < 700 ? 16 : 20,
  },
  
  bookingCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: screenWidth < 400 ? 12 : 16,
    marginBottom: screenHeight < 700 ? 12 : 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: screenHeight < 700 ? 8 : 12,
  },
  
  bookingId: {
    fontSize: screenWidth < 400 ? 14 : 16,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  
  bookingDetails: {
    gap: screenHeight < 700 ? 4 : 6,
  },
  
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: screenHeight < 700 ? 2 : 4,
  },
  
  detailLabel: {
    fontSize: screenWidth < 400 ? 12 : 14,
    color: '#666',
    flex: 1,
  },
  
  detailValue: {
    fontSize: screenWidth < 400 ? 12 : 14,
    color: '#333',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
});
