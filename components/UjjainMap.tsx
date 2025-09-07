
import { useLocation } from '@/contexts/LocationContext';
import React, { useMemo, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { WebView } from 'react-native-webview';


type UjjainMapProps = {
  height?: number;
  showToggles?: boolean;
  defaultHeatmap?: boolean;
  defaultTraffic?: boolean;
};

export default function UjjainMap({ height, showToggles = true, defaultHeatmap = true, defaultTraffic = true }: UjjainMapProps) {
  const { width, height: screenH } = useWindowDimensions();
  const { startLocation, endLocation } = useLocation();
  const mapWidth = Math.min(width * 0.8, width - 32); // 80% of screen width, but not exceeding screen width minus padding
  const containerH = height ?? Math.max(200, Math.min(280, Math.floor(screenH * 0.3)));

  const [heatOn, setHeatOn] = useState<boolean>(defaultHeatmap);
  const [trafficOn, setTrafficOn] = useState<boolean>(defaultTraffic);

  const html = useMemo(() => `<!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <style>
        html, body { margin: 0; padding: 0; height: 100%; }
        #map { height: 100%; width: 100%; }
        .btns { position: absolute; top: 8px; right: 8px; display: flex; gap: 6px; z-index: 2; }
        .btn { font-family: sans-serif; padding: 6px 8px; font-size: 12px; border-radius: 8px; border: 1px solid #ffcc80; background:#ffe0b2; color:#e65100; }
      </style>
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAzakCzViqQ1UF13ekm_W4jD0CKm4k1nqQ&libraries=visualization,geometry"></script>
      <script src="https://unpkg.com/@googlemaps/markerclustererplus/dist/index.min.js"></script>
    </head>
    <body>
      <div id="map"></div>
      <div class="btns">
        <button id="toggleHeat" class="btn">Heatmap</button>
        <button id="toggleTraffic" class="btn">Traffic</button>
      </div>
      <script>
        let map, heatmap, clusterer, trafficLayer, directionsService, directionsRenderer;
        let markers = [];

        function initMap() {
          map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 23.1793, lng: 75.7849 },
            zoom: 6,
            disableDefaultUI: true
          });

          // Initialize Directions Service and Renderer
          directionsService = new google.maps.DirectionsService();
          directionsRenderer = new google.maps.DirectionsRenderer({
            polylineOptions: {
              strokeColor: '#2196F3',
              strokeWeight: 4,
              strokeOpacity: 0.8
            },
            suppressMarkers: false
          });
          directionsRenderer.setMap(map);

          // Initialize empty heatmap and clusterer; will be populated after route
          heatmap = new google.maps.visualization.HeatmapLayer({ data: [], radius: 40 });
          ${heatOn ? 'heatmap.setMap(map);' : ''}

          clusterer = new MarkerClusterer(map, [], {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
          });
          trafficLayer = new google.maps.TrafficLayer();
          ${trafficOn ? 'trafficLayer.setMap(map);' : ''}

          // Calculate and display route if start location is available
          ${startLocation ? `
          calculateRoute('${startLocation}', '${endLocation ?? 'Ujjain'}');
          ` : ''}

          document.getElementById('toggleHeat').addEventListener('click', function() {
            heatmap.setMap(heatmap.getMap() ? null : map);
          });
          document.getElementById('toggleTraffic').addEventListener('click', function() {
            trafficLayer.setMap(trafficLayer.getMap() ? null : map);
          });
        }

        function calculateRoute(start, end) {
          const request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            drivingOptions: {
              departureTime: new Date(),
              trafficModel: 'bestguess'
            }
          };

          directionsService.route(request, function(result, status) {
            if (status === 'OK') {
              directionsRenderer.setDirections(result);

              
              // Auto-fit the map to show the entire route
              const bounds = new google.maps.LatLngBounds();
              const route = result.routes[0];

              // Build heatmap and clustering along the route path
              buildRouteLayers(route);

              // Auto-fit the map to show the entire route
              const bounds = new google.maps.LatLngBounds();
              for (let i = 0; i < route.overview_path.length; i++) {
                bounds.extend(route.overview_path[i]);
              }
              map.fitBounds(bounds);
            } else {
              console.log('Directions request failed: ' + status);
            }
          });
        }

        function buildRouteLayers(route) {
          // Clear previous markers from clusterer
          if (clusterer) {
            clusterer.clearMarkers();
          }
          markers = [];

          // Build a denser path by concatenating all step paths
          const legs = route.legs || [];
          const fullPath = [];
          for (let li = 0; li < legs.length; li++) {
            const steps = legs[li].steps || [];
            for (let si = 0; si < steps.length; si++) {
              const stepPath = steps[si].path || [];
              for (let pi = 0; pi < stepPath.length; pi++) {
                fullPath.push(stepPath[pi]);
              }
            }
          }

          const path = fullPath.length ? fullPath : (route.overview_path || []);
          const heatmapData = [];

          // Use the full path for heatmap for continuous visualization
          for (let i = 0; i < path.length; i++) {
            heatmapData.push(path[i]);
          }

          // Sample markers along the path for clustering (every ~5th point to reduce marker count)
          for (let i = 0; i < path.length; i += 5) {
            const marker = new google.maps.Marker({ position: path[i] });
            markers.push(marker);
          }

          // Update heatmap and clusterer
          heatmap.setData(heatmapData);
          clusterer.addMarkers(markers);
        }

        window.initMap = initMap;
        window.onload = initMap;
      </script>
    </body>

  </html>`, [heatOn, trafficOn, startLocation, endLocation]);


  return (
    <View style={styles.container}>
      <View style={[styles.wrapper, { width: mapWidth, height: containerH }]}>      
        {Platform.OS === 'web' ? (
          <iframe
            title="ujjain-map"
            srcDoc={html}
            style={{ border: '0px', width: '100%', height: '100%' }}
          />
        ) : (
          <WebView originWhitelist={["*"]} source={{ html }} style={styles.webview} />
        )}
      </View>
      {showToggles && (
        <View style={styles.toggleContainer}>
          <TouchableOpacity style={styles.smallBtn} onPress={() => setHeatOn(v => !v)}>
            <Text style={styles.smallBtnText}>{heatOn ? 'Heat On' : 'Heat Off'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.smallBtn,{marginLeft:6}]} onPress={() => setTrafficOn(v => !v)}>
            <Text style={styles.smallBtnText}>{trafficOn ? 'Traffic On' : 'Traffic Off'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  wrapper: { borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#ff9800', backgroundColor: '#fff' },
  webview: { flex: 1 },
  toggleContainer: { flexDirection: 'row', marginTop: 8, justifyContent: 'center' },
  smallBtn: { backgroundColor: '#ffe0b2', paddingVertical: 6, paddingHorizontal: 8, borderRadius: 8, borderWidth: 1, borderColor: '#ffcc80' },
  smallBtnText: { color: '#e65100', fontSize: 12, fontWeight: '600' },
});


