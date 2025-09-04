import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Exact conversion from the original Dashboard.jsx
const Dashboard = () => {
  const navigation = useNavigation();

  // Exact data from original web dashboard
  const statsData = {
    labels: ['RFID Vendors', 'Hotels', 'Transport', 'Advertisement', 'Parking', 'Volunteers'],
    datasets: [{
      label: 'Registrations',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
      ],
    }]
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Grid container spacing={3} equivalent */}
      <View style={styles.gridContainer}>
        {/* Grid item xs={12} - Title Paper */}
        <View style={styles.titleGridItem}>
          <View style={styles.titlePaper}>
            <Text style={styles.titleText}>
              Simhastha Administration Dashboard
            </Text>
          </View>
        </View>
        
        {/* Grid item xs={12} - Chart Paper */}
        <View style={styles.chartGridItem}>
          <View style={styles.chartPaper}>
            {/* Bar chart equivalent */}
            <View style={styles.barChart}>
              {statsData.labels.map((label, index) => (
                <View key={index} style={styles.barItem}>
                  <View style={styles.barContainer}>
                    <View 
                      style={[
                        styles.bar, 
                        { 
                          height: (statsData.datasets[0].data[index] / Math.max(...statsData.datasets[0].data)) * 150,
                          backgroundColor: statsData.datasets[0].backgroundColor[index]
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.barLabel}>{label}</Text>
                  <Text style={styles.barValue}>{statsData.datasets[0].data[index]}</Text>
                </View>
              ))}
            </View>
          </View>
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

export default Dashboard;

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
  
  // Grid item xs={12} equivalent
  titleGridItem: {
    width: '100%',
  },
  chartGridItem: {
    width: '100%',
  },
  
  // Paper with title styling - exact Material-UI equivalent
  titlePaper: {
    padding: 16, // p: 2
    backgroundColor: '#ffffff',
    borderRadius: 4,
    elevation: 1, // Material-UI Paper shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginBottom: 8,
  },
  
  // Typography component="h2" variant="h6" color="primary" gutterBottom equivalent
  titleText: {
    fontSize: 20, // h6 variant
    fontWeight: '600',
    color: '#1976d2', // Material-UI primary color
    marginBottom: 16, // gutterBottom
  },
  
  // Paper with chart styling
  chartPaper: {
    padding: 16, // p: 2
    backgroundColor: '#ffffff',
    borderRadius: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  
  // Bar chart container
  barChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 300, // Chart.js default height
    paddingHorizontal: 10,
  },
  
  barItem: {
    alignItems: 'center',
    flex: 1,
  },
  
  barContainer: {
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  bar: {
    width: 40,
    borderRadius: 2,
    minHeight: 4,
  },
  
  barLabel: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: '400',
  },
  
  barValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
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
