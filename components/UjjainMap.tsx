import React, { useMemo, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, useWindowDimensions, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocation } from '@/contexts/LocationContext';

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
            zoom: 10,
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

          const heatmapData = [];
          for (let i = 0; i < 300; i++) {
            const lat = 23.10 + Math.random() * 0.25;
            const lng = 75.65 + Math.random() * 0.25;
            const latLng = new google.maps.LatLng(lat, lng);
            const marker = new google.maps.Marker({ position: latLng });
            markers.push(marker);
            heatmapData.push(latLng);
          }

          clusterer = new MarkerClusterer(map, markers, {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
          });

          heatmap = new google.maps.visualization.HeatmapLayer({ data: heatmapData, radius: 40 });
          ${heatOn ? 'heatmap.setMap(map);' : ''}

          trafficLayer = new google.maps.TrafficLayer();
          ${trafficOn ? 'trafficLayer.setMap(map);' : ''}

          // Calculate and display route if start location is available
          ${startLocation ? `
          calculateRoute('${startLocation}', 'Ujjain');
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
            unitSystem: google.maps.UnitSystem.METRIC
          };

          directionsService.route(request, function(result, status) {
            if (status === 'OK') {
              directionsRenderer.setDirections(result);
              
              // Auto-fit the map to show the entire route
              const bounds = new google.maps.LatLngBounds();
              const route = result.routes[0];
              for (let i = 0; i < route.overview_path.length; i++) {
                bounds.extend(route.overview_path[i]);
              }
              map.fitBounds(bounds);
            } else {
              console.log('Directions request failed: ' + status);
            }
          });
        }

        window.initMap = initMap;
        window.onload = initMap;
      </script>
    </body>
  </html>`, [heatOn, trafficOn, startLocation]);

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


