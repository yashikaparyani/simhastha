import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  Alert
} from 'react-native';
import UjjainMap from '@/components/UjjainMap';

// Admin HeatMap using UjjainMap component
const AdminHeatMap = () => {
  const navigation = useNavigation();
  const [mapType, setMapType] = useState('dynamic');
  const [heatmapVisible, setHeatmapVisible] = useState(true);
  const [trafficVisible, setTrafficVisible] = useState(true);
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [routeDetails, setRouteDetails] = useState([]);

  // Calculate routes (simplified for mobile)
  const calculateRoutes = () => {
    if (!startLocation || !endLocation) {
      Alert.alert("Error", "Please enter both start and destination.");
      return;
    }

    // Simulate route calculation
    const mockRoutes = [
      {
        id: 0,
        distance: "245 km",
        duration: "4 hours 30 mins"
      },
      {
        id: 1,
        distance: "267 km", 
        duration: "5 hours 15 mins"
      },
      {
        id: 2,
        distance: "289 km",
        duration: "5 hours 45 mins"
      }
    ];
    
    setRouteDetails(mockRoutes);
  };

  const getTitle = () => {
    switch (mapType) {
      case 'dynamic':
        return 'Ujjain Area - Dynamic Heatmap, Clustering & Zoom Display';
      case 'static':
        return 'Ujjain Area - Static Heatmap, Clustering & Zoom Display';
      case 'routes':
        return 'India Routes - Heatmap, Clustering & Route Planning';
      default:
        return 'Heat Map Display';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{getTitle()}</Text>
      </View>

      <View style={styles.controls}>
        {/* Map Type Selection */}
        <View style={styles.mapTypeContainer}>
          <Text style={styles.controlLabel}>Map Type:</Text>
          <View style={styles.mapTypeButtons}>
            <TouchableOpacity
              style={[styles.mapTypeButton, mapType === 'dynamic' && styles.activeButton]}
              onPress={() => setMapType('dynamic')}
            >
              <Text style={[styles.mapTypeButtonText, mapType === 'dynamic' && styles.activeButtonText]}>
                Dynamic
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.mapTypeButton, mapType === 'static' && styles.activeButton]}
              onPress={() => setMapType('static')}
            >
              <Text style={[styles.mapTypeButtonText, mapType === 'static' && styles.activeButtonText]}>
                Static
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.mapTypeButton, mapType === 'routes' && styles.activeButton]}
              onPress={() => setMapType('routes')}
            >
              <Text style={[styles.mapTypeButtonText, mapType === 'routes' && styles.activeButtonText]}>
                Routes
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Route Planning (for routes mode) */}
        {mapType === 'routes' && (
          <View style={styles.routeContainer}>
            <Text style={styles.controlLabel}>Route Planning:</Text>
            <TextInput
              style={styles.routeInput}
              placeholder="Enter start location"
              value={startLocation}
              onChangeText={setStartLocation}
            />
            <TextInput
              style={styles.routeInput}
              placeholder="Enter destination"
              value={endLocation}
              onChangeText={setEndLocation}
            />
            <TouchableOpacity
              style={styles.routeButton}
              onPress={calculateRoutes}
            >
              <Text style={styles.routeButtonText}>Get Routes</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Controls */}
        <View style={styles.controlButtons}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setHeatmapVisible(!heatmapVisible)}
          >
            <Text style={styles.controlButtonText}>
              {heatmapVisible ? 'Hide' : 'Show'} Heatmap
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setTrafficVisible(!trafficVisible)}
          >
            <Text style={styles.controlButtonText}>
              {trafficVisible ? 'Hide' : 'Show'} Traffic
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Route Details */}
      {mapType === 'routes' && routeDetails.length > 0 && (
        <View style={styles.routeDetailsContainer}>
          <Text style={styles.routeDetailsTitle}>Route Options:</Text>
          {routeDetails.map(route => (
            <View key={route.id} style={styles.routeDetailItem}>
              <Text style={styles.routeDetailTitle}>Route {route.id + 1}</Text>
              <Text style={styles.routeDetailText}>Distance: {route.distance}</Text>
              <Text style={styles.routeDetailText}>Duration: {route.duration}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Map Container */}
      <View style={styles.mapContainer}>
        <UjjainMap 
          height={300}
          showToggles={true}
          defaultHeatmap={heatmapVisible}
          defaultTraffic={trafficVisible}
        />
        <View style={styles.mapInfo}>
          <Text style={styles.mapInfoText}>
            {mapType === 'dynamic' && 'Live heatmap data with Google Maps integration'}
            {mapType === 'static' && 'Static heatmap visualization with clustering'}
            {mapType === 'routes' && 'Route planning with traffic data and directions'}
          </Text>
          <Text style={styles.mapInfoText}>
            Heatmap: {heatmapVisible ? 'ON' : 'OFF'} | Traffic: {trafficVisible ? 'ON' : 'OFF'}
          </Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Heatmap Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>300</Text>
            <Text style={styles.statLabel}>Data Points</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{mapType}</Text>
            <Text style={styles.statLabel}>Map Type</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>10</Text>
            <Text style={styles.statLabel}>Zoom Level</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{heatmapVisible ? 'ON' : 'OFF'}</Text>
            <Text style={styles.statLabel}>Heatmap</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1976d2',
    padding: 16,
    paddingTop: 50,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  controls: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  mapTypeContainer: {
    marginBottom: 16,
  },
  controlLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  mapTypeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  mapTypeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
  },
  activeButton: {
    backgroundColor: '#1976d2',
    borderColor: '#1976d2',
  },
  mapTypeButtonText: {
    fontSize: 14,
    color: '#666',
  },
  activeButtonText: {
    color: '#fff',
  },
  routeContainer: {
    marginBottom: 16,
  },
  routeInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    marginBottom: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  routeButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  routeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  zoomText: {
    fontSize: 14,
    color: '#666',
  },
  zoomValue: {
    fontWeight: 'bold',
    color: '#333',
  },
  routeDetailsContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    marginBottom: 8,
  },
  routeDetailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  routeDetailItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  routeDetailTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  routeDetailText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  mapContainer: {
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mapInfo: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 4,
  },
  mapInfoText: {
    fontSize: 12,
    color: '#333',
    marginBottom: 2,
  },
  statsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default AdminHeatMap;
