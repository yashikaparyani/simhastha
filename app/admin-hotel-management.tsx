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

// Exact conversion from web admin dashboard structure
const HotelManagement = () => {
  const navigation = useNavigation();
  
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
        <TouchableOpacity style={[styles.actionButton, styles.viewButton]}>
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
    </ScrollView>
  );
};

export default HotelManagement;

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
  
  // Enhanced Stats Cards
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
  
  // Management Paper
  managementPaper: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    padding: 24, // p: 3
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
  
  // Hotels List
  hotelsList: {
    gap: 16,
  },
  
  hotelCard: {
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
  
  hotelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  
  hotelInfo: {
    flex: 1,
  },
  
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  
  hotelLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  
  hotelStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  
  hotelStat: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  
  hotelStatus: {
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
  
  hotelDetails: {
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
  
  amenitiesContainer: {
    marginBottom: 16,
  },
  
  amenitiesLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  
  amenitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  
  amenityTag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  
  amenityText: {
    fontSize: 12,
    color: '#1976d2',
  },
  
  hotelActions: {
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
  },
});
