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
const HotelManagement = () => {
  const navigation = useNavigation();
  
  // Modal state for booking details
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  
  // Sample booking data for each hotel
  const getHotelBookings = (hotelId) => {
    const sampleBookings = [
      {
        id: "B001",
        guestName: "Rajesh Kumar",
        guestEmail: "rajesh@email.com",
        guestPhone: "+91-9876543210",
        checkIn: "2024-01-15",
        checkOut: "2024-01-17",
        rooms: 2,
        guests: 4,
        totalAmount: 5000,
        bookingDate: "2024-01-10",
        status: "Confirmed",
        paymentMethod: "UPI"
      },
      {
        id: "B002",
        guestName: "Priya Sharma",
        guestEmail: "priya@email.com",
        guestPhone: "+91-9876543211",
        checkIn: "2024-01-18",
        checkOut: "2024-01-20",
        rooms: 1,
        guests: 2,
        totalAmount: 2500,
        bookingDate: "2024-01-12",
        status: "Confirmed",
        paymentMethod: "Credit Card"
      },
      {
        id: "B003",
        guestName: "Amit Patel",
        guestEmail: "amit@email.com",
        guestPhone: "+91-9876543212",
        checkIn: "2024-01-22",
        checkOut: "2024-01-24",
        rooms: 3,
        guests: 6,
        totalAmount: 7500,
        bookingDate: "2024-01-14",
        status: "Pending",
        paymentMethod: "Net Banking"
      },
      {
        id: "B004",
        guestName: "Sneha Gupta",
        guestEmail: "sneha@email.com",
        guestPhone: "+91-9876543213",
        checkIn: "2024-01-25",
        checkOut: "2024-01-27",
        rooms: 1,
        guests: 2,
        totalAmount: 2500,
        bookingDate: "2024-01-16",
        status: "Confirmed",
        paymentMethod: "UPI"
      },
      {
        id: "B005",
        guestName: "Vikram Singh",
        guestEmail: "vikram@email.com",
        guestPhone: "+91-9876543214",
        checkIn: "2024-01-28",
        checkOut: "2024-01-30",
        rooms: 2,
        guests: 4,
        totalAmount: 5000,
        bookingDate: "2024-01-18",
        status: "Confirmed",
        paymentMethod: "Debit Card"
      }
    ];
    
    // Return random subset of bookings (2-4 bookings)
    const shuffled = sampleBookings.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 3) + 2);
  };
  
  const [hotels, setHotels] = useState([
    {
      id: "1",
      name: "Grand Palace Hotel",
      location: "Near Temple Complex",
      rooms: 150,
      availableRooms: 45,
      pricePerNight: 2500,
      rating: 4.5,
      status: "active",
      contact: "+91-9876543210",
      email: "info@grandpalace.com",
      amenities: ["WiFi", "Parking", "Restaurant", "AC"],
      bookings: 23,
      revenue: 57500
    },
    {
      id: "2",
      name: "Saffron Inn",
      location: "City Center",
      rooms: 80,
      availableRooms: 12,
      pricePerNight: 1800,
      rating: 4.2,
      status: "active",
      contact: "+91-9876543211",
      email: "contact@saffroninn.com",
      amenities: ["WiFi", "Parking", "AC"],
      bookings: 15,
      revenue: 27000
    },
    {
      id: "3",
      name: "Pilgrim Lodge",
      location: "Temple Road",
      rooms: 60,
      availableRooms: 8,
      pricePerNight: 1200,
      rating: 3.8,
      status: "active",
      contact: "+91-9876543212",
      email: "bookings@pilgrimlodge.com",
      amenities: ["WiFi", "AC"],
      bookings: 18,
      revenue: 21600
    },
    {
      id: "4",
      name: "Heritage Hotel",
      location: "Old City",
      rooms: 100,
      availableRooms: 0,
      pricePerNight: 3200,
      rating: 4.7,
      status: "inactive",
      contact: "+91-9876543213",
      email: "reservations@heritage.com",
      amenities: ["WiFi", "Parking", "Restaurant", "AC", "Spa"],
      bookings: 0,
      revenue: 0
    }
  ]);

  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newHotel, setNewHotel] = useState({
    name: '',
    location: '',
    rooms: '',
    pricePerNight: '',
    contact: '',
    email: '',
    amenities: []
  });

  useEffect(() => {
    filterHotels();
  }, [searchTerm, filterStatus, hotels]);

  const filterHotels = () => {
    let filtered = hotels;

    if (searchTerm) {
      filtered = filtered.filter(hotel =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(hotel => hotel.status === filterStatus);
    }

    setFilteredHotels(filtered);
  };

  const stats = {
    total: hotels.length,
    active: hotels.filter(h => h.status === 'active').length,
    totalRooms: hotels.reduce((sum, h) => sum + h.rooms, 0),
    availableRooms: hotels.reduce((sum, h) => sum + h.availableRooms, 0),
    totalBookings: hotels.reduce((sum, h) => sum + h.bookings, 0),
    totalRevenue: hotels.reduce((sum, h) => sum + h.revenue, 0)
  };

  const handleViewBookings = (hotel) => {
    setSelectedHotel(hotel);
    setShowBookingModal(true);
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? '#388e3c' : '#f57c00';
  };

  const renderHotelItem = ({ item: hotel }) => (
    <View style={styles.hotelCard}>
      <View style={styles.hotelHeader}>
        <View style={styles.hotelInfo}>
          <Text style={styles.hotelName}>{hotel.name}</Text>
          <Text style={styles.hotelLocation}>📍 {hotel.location}</Text>
          <View style={styles.hotelStats}>
            <Text style={styles.hotelStat}>⭐ {hotel.rating}</Text>
            <Text style={styles.hotelStat}>🏨 {hotel.rooms} rooms</Text>
            <Text style={styles.hotelStat}>💰 ₹{hotel.pricePerNight}/night</Text>
          </View>
        </View>
        <View style={styles.hotelStatus}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(hotel.status) }]}>
            <Text style={styles.statusText}>{hotel.status}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.hotelDetails}>
        <Text style={styles.availability}>
          Available: {hotel.availableRooms}/{hotel.rooms} rooms
        </Text>
        <Text style={styles.bookings}>Bookings: {hotel.bookings}</Text>
        <Text style={styles.revenue}>Revenue: ₹{hotel.revenue.toLocaleString()}</Text>
      </View>
      
      <View style={styles.amenitiesContainer}>
        <Text style={styles.amenitiesLabel}>Amenities:</Text>
        <View style={styles.amenitiesList}>
          {hotel.amenities.map((amenity, index) => (
            <View key={index} style={styles.amenityTag}>
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.hotelActions}>
        <TouchableOpacity style={[styles.actionButton, styles.editButton]}>
          <Text style={styles.actionButtonText}>✏️ Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.viewButton]}
          onPress={() => handleViewBookings(hotel)}
        >
          <Text style={styles.actionButtonText}>👁️ View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.toggleButton]}>
          <Text style={styles.actionButtonText}>
            {hotel.status === 'active' ? '⏸️ Deactivate' : '▶️ Activate'}
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
                <Text style={styles.statLabel}>Total Hotels</Text>
              </View>
              <Text style={styles.statIcon}>🏨</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#388e3c' }]}>
            <View style={styles.statContent}>
              <View>
                <Text style={styles.statNumber}>{stats.active}</Text>
                <Text style={styles.statLabel}>Active Hotels</Text>
              </View>
              <Text style={styles.statIcon}>✅</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#f57c00' }]}>
            <View style={styles.statContent}>
              <View>
                <Text style={styles.statNumber}>{stats.totalRooms}</Text>
                <Text style={styles.statLabel}>Total Rooms</Text>
              </View>
              <Text style={styles.statIcon}>🛏️</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#d32f2f' }]}>
            <View style={styles.statContent}>
              <View>
                <Text style={styles.statNumber}>{stats.availableRooms}</Text>
                <Text style={styles.statLabel}>Available</Text>
              </View>
              <Text style={styles.statIcon}>🔓</Text>
            </View>
          </View>
        </View>

        {/* Hotel Management Paper */}
        <View style={styles.managementPaper}>
          <View style={styles.managementHeader}>
            <Text style={styles.managementTitle}>
              Hotel Management
            </Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddModal(true)}
            >
              <Text style={styles.addButtonText}>+ Add Hotel</Text>
            </TouchableOpacity>
          </View>

          {/* Filters */}
          <View style={styles.filtersContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search hotels..."
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

          {/* Hotels List */}
          <FlatList
            data={filteredHotels}
            renderItem={renderHotelItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            style={styles.hotelsList}
          />

          {filteredHotels.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🏨</Text>
              <Text style={styles.emptyTitle}>No hotels found</Text>
              <Text style={styles.emptySubtitle}>
                {searchTerm || filterStatus !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start by adding your first hotel'}
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
              📋 Bookings for {selectedHotel?.name}
            </Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowBookingModal(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            {selectedHotel && getHotelBookings(selectedHotel.id).map((booking) => (
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
                    <Text style={styles.detailLabel}>👤 Guest:</Text>
                    <Text style={styles.detailValue}>{booking.guestName}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>📧 Email:</Text>
                    <Text style={styles.detailValue}>{booking.guestEmail}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>📞 Phone:</Text>
                    <Text style={styles.detailValue}>{booking.guestPhone}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>🏨 Check-in:</Text>
                    <Text style={styles.detailValue}>{booking.checkIn}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>🏨 Check-out:</Text>
                    <Text style={styles.detailValue}>{booking.checkOut}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>🛏️ Rooms:</Text>
                    <Text style={styles.detailValue}>{booking.rooms}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>👥 Guests:</Text>
                    <Text style={styles.detailValue}>{booking.guests}</Text>
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

export default HotelManagement;

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
  
  // Hotels List
  hotelsList: {
    gap: screenHeight < 700 ? 12 : 16,
  },
  
  hotelCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: screenWidth < 400 ? 12 : 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    width: '100%',
    minHeight: screenWidth < 400 ? 120 : 100,
  },
  
  hotelHeader: {
    flexDirection: screenWidth < 400 ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: screenWidth < 400 ? 'flex-start' : 'flex-start',
    marginBottom: screenHeight < 700 ? 8 : 12,
    gap: screenWidth < 400 ? 8 : 0,
  },
  
  hotelInfo: {
    flex: 1,
    minWidth: 0,
  },
  
  hotelName: {
    fontSize: screenWidth < 400 ? 16 : 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  
  hotelLocation: {
    fontSize: screenWidth < 400 ? 12 : 14,
    color: '#666',
    marginBottom: screenHeight < 700 ? 6 : 8,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  
  hotelStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: screenWidth < 400 ? 8 : 12,
  },
  
  hotelStat: {
    fontSize: screenWidth < 400 ? 10 : 12,
    color: '#666',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: screenWidth < 400 ? 6 : 8,
    paddingVertical: screenHeight < 700 ? 3 : 4,
    borderRadius: 4,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  
  hotelStatus: {
    alignItems: screenWidth < 400 ? 'flex-start' : 'flex-end',
  },
  
  statusBadge: {
    paddingHorizontal: screenWidth < 400 ? 8 : 12,
    paddingVertical: screenHeight < 700 ? 4 : 6,
    borderRadius: 12,
  },
  
  statusText: {
    fontSize: screenWidth < 400 ? 10 : 12,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  hotelDetails: {
    flexDirection: screenWidth < 400 ? 'column' : 'row',
    justifyContent: 'space-between',
    marginBottom: screenHeight < 700 ? 8 : 12,
    paddingVertical: screenHeight < 700 ? 6 : 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: screenWidth < 400 ? 4 : 0,
  },
  
  availability: {
    fontSize: screenWidth < 400 ? 12 : 14,
    color: '#1976d2',
    fontWeight: '500',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  
  bookings: {
    fontSize: screenWidth < 400 ? 12 : 14,
    color: '#388e3c',
    fontWeight: '500',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  
  revenue: {
    fontSize: screenWidth < 400 ? 12 : 14,
    color: '#f57c00',
    fontWeight: '500',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  
  amenitiesContainer: {
    marginBottom: screenHeight < 700 ? 12 : 16,
  },
  
  amenitiesLabel: {
    fontSize: screenWidth < 400 ? 12 : 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: screenHeight < 700 ? 6 : 8,
  },
  
  amenitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: screenWidth < 400 ? 6 : 8,
  },
  
  amenityTag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: screenWidth < 400 ? 6 : 8,
    paddingVertical: screenHeight < 700 ? 3 : 4,
    borderRadius: 4,
  },
  
  amenityText: {
    fontSize: screenWidth < 400 ? 10 : 12,
    color: '#1976d2',
  },
  
  hotelActions: {
    flexDirection: 'row',
    gap: screenWidth < 400 ? 6 : 8,
    justifyContent: screenWidth < 400 ? 'center' : 'flex-end',
    flexWrap: 'wrap',
  },
  
  actionButton: {
    flex: screenWidth < 400 ? 0.3 : 1,
    paddingVertical: screenHeight < 700 ? 6 : 8,
    paddingHorizontal: screenWidth < 400 ? 8 : 12,
    borderRadius: 4,
    alignItems: 'center',
    minWidth: screenWidth < 400 ? 60 : 80,
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
    fontSize: screenWidth < 400 ? 10 : 12,
    fontWeight: 'bold',
    textAlign: 'center',
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
