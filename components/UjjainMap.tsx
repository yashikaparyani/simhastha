
import { useLocation } from '@/contexts/LocationContext';
import React, { useEffect, useMemo, useRef, useState } from 'react';
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

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const webviewRef = useRef<WebView | null>(null);

  useEffect(() => {
    try {
      // Expose a global function to focus a chauraha from outside
      (globalThis as any).focusChaurahaInMap = (id: string) => {
        if (Platform.OS === 'web') {
          const win = (iframeRef.current as any)?.contentWindow;
          win?.postMessage({ type: 'focusChauraha', id }, '*');
        } else {
          // For native, inject JS to call focusChauraha directly
          webviewRef.current?.injectJavaScript(`try{focusChauraha(${JSON.stringify(id)});}catch(e){}`);
        }
      };
    } catch {}
  }, []);

  const html = useMemo(() => `<!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <style>
        html, body { margin: 0; padding: 0; height: 100%; }
        #map { height: 100%; width: 100%; }
        .btns { position: absolute; top: 8px; right: 8px; display: flex; gap: 6px; z-index: 2; }
        .btn { font-family: sans-serif; padding: 6px 8px; font-size: 12px; border-radius: 8px; border: 1px solid #ffcc80; background:#ffe0b2; color:#e65100; }
        .error { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-family:sans-serif; color:#d32f2f; background:#fff; }
        .signal { position: absolute; transform: translate(-50%, -100%); display:flex; flex-direction:column; align-items:center; }
        .lights { width: 28px; background:#222; padding: 4px; border-radius:6px; box-shadow:0 2px 6px rgba(0,0,0,0.35); }
        .light { width: 20px; height: 20px; border-radius:50%; margin: 4px auto; opacity:0.3; }
        .light.red { background:#f44336; }
        .light.yellow { background:#ffeb3b; }
        .light.green { background:#4caf50; }
        .on { opacity: 1; filter: drop-shadow(0 0 4px rgba(255,255,255,0.6)); }
        .badge { margin-top: 4px; background:#fff; border:1px solid #ff9800; color:#e65100; font: 12px/1.2 sans-serif; padding:2px 6px; border-radius: 10px; }
        .pulse { animation: pulse 0.8s ease-in-out 4; }
        @keyframes pulse { 0%{transform: translate(-50%, -100%) scale(1);} 50%{transform: translate(-50%, -100%) scale(1.15);} 100%{transform: translate(-50%, -100%) scale(1);} }
      </style>
      <script src="https://unpkg.com/@googlemaps/markerclustererplus/dist/index.min.js"></script>
      <script>
        const START = ${JSON.stringify(startLocation ?? null)};
        const END = ${JSON.stringify(endLocation ?? 'Ujjain')};
        let map, heatmap, clusterer, trafficLayer, directionsService, directionsRenderer;
        let markers = [];

        // Fixed list of common Ujjain chaurahas
        const chaurahas = [
          { id:'freeganj', name:'Freeganj Tower', lat:23.1824, lng:75.7800, cycle:{red:90,yellow:8,green:82}, offset:0 },
          { id:'dewasgate', name:'Dewas Gate Square', lat:23.1952, lng:75.7828, cycle:{red:90,yellow:8,green:82}, offset:12 },
          { id:'nanakheda', name:'Nanakheda Bus Stand', lat:23.1762, lng:75.7696, cycle:{red:90,yellow:8,green:82}, offset:22 },
          { id:'mahakal', name:'Mahakal Chauraha', lat:23.1769, lng:75.7846, cycle:{red:90,yellow:8,green:82}, offset:35 },
          { id:'harsiddhi', name:'Harsiddhi Square', lat:23.1807, lng:75.7886, cycle:{red:90,yellow:8,green:82}, offset:8 },
          { id:'udaypura', name:'Udaypura Chauraha', lat:23.1687, lng:75.7915, cycle:{red:90,yellow:8,green:82}, offset:18 }
        ];

        function initMap() {
          try {
          map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 23.1793, lng: 75.7849 },
              zoom: 12,
            disableDefaultUI: true
          });

          directionsService = new google.maps.DirectionsService();
          directionsRenderer = new google.maps.DirectionsRenderer({
              polylineOptions: { strokeColor: '#2196F3', strokeWeight: 4, strokeOpacity: 0.8 },
            suppressMarkers: false
          });
          directionsRenderer.setMap(map);

            heatmap = new google.maps.visualization.HeatmapLayer({ data: [], radius: 40 });
          ${heatOn ? 'heatmap.setMap(map);' : ''}
            clusterer = new MarkerClusterer(map, [], { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
          trafficLayer = new google.maps.TrafficLayer();
          ${trafficOn ? 'trafficLayer.setMap(map);' : ''}

            if (START) { calculateRoute(START, END || 'Ujjain'); }

            // Add traffic signal overlays
            setupSignals();
          } catch (e) {
            showError(e && e.message ? e.message : 'Map initialization failed');
          }
        }

        function showError(msg) {
          const div = document.createElement('div');
          div.className = 'error';
          div.textContent = 'Google Map failed to load: ' + msg;
          document.body.appendChild(div);
        }

        function calculateRoute(start, end) {
          const request = { origin: start, destination: end, travelMode: google.maps.TravelMode.DRIVING, unitSystem: google.maps.UnitSystem.METRIC, drivingOptions: { departureTime: new Date(), trafficModel: 'bestguess' } };
          directionsService.route(request, function(result, status) {
            if (status === 'OK') {
              directionsRenderer.setDirections(result);
              const route = result.routes[0];
              buildRouteLayers(route);
              const bounds = new google.maps.LatLngBounds();
              for (let i = 0; i < route.overview_path.length; i++) { bounds.extend(route.overview_path[i]); }
              map.fitBounds(bounds);
            } else {
              showError('Directions request failed: ' + status);
            }
          });
        }

        function buildRouteLayers(route) {
          if (clusterer) { clusterer.clearMarkers(); }
          markers = [];
          const legs = route.legs || [];
          const fullPath = [];
          for (let li = 0; li < legs.length; li++) {
            const steps = legs[li].steps || [];
            for (let si = 0; si < steps.length; si++) {
              const stepPath = steps[si].path || [];
              for (let pi = 0; pi < stepPath.length; pi++) { fullPath.push(stepPath[pi]); }
            }
          }
          const path = fullPath.length ? fullPath : (route.overview_path || []);
          const heatmapData = [];
          for (let i = 0; i < path.length; i++) { heatmapData.push(path[i]); }
          for (let i = 0; i < path.length; i += 5) { markers.push(new google.maps.Marker({ position: path[i] })); }
          heatmap.setData(heatmapData);
          clusterer.addMarkers(markers);
        }

        // Traffic signals via OverlayView
        const overlays = {};
        function setupSignals() {
          chaurahas.forEach((c) => {
            const overlay = new google.maps.OverlayView();
            overlay.onAdd = function() {
              const div = document.createElement('div');
              div.className = 'signal';
              div.innerHTML = '<div class="lights">'
                + '<div class="light red" data-red></div>'
                + '<div class="light yellow" data-yellow></div>'
                + '<div class="light green" data-green></div>'
                + '</div>'
                + '<div class="badge" data-timer>--s</div>';
              this.div = div;
              const panes = this.getPanes();
              panes.overlayMouseTarget.appendChild(div);
            };
            overlay.draw = function() {
              const proj = this.getProjection();
              const pos = proj.fromLatLngToDivPixel(new google.maps.LatLng(c.lat, c.lng));
              if (!this.div) return;
              this.div.style.left = pos.x + 'px';
              this.div.style.top = pos.y + 'px';
            };
            overlay.onRemove = function() { if (this.div && this.div.parentNode) this.div.parentNode.removeChild(this.div); this.div = null; };
            overlay.setMap(map);
            overlays[c.id] = overlay;
          });

          // start ticking
          const startedAt = Date.now();
          setInterval(() => {
            const now = Date.now();
            chaurahas.forEach((c) => {
              const o = overlays[c.id];
              if (!o || !o.div) return;
              const total = c.cycle.red + c.cycle.yellow + c.cycle.green;
              const elapsed = Math.floor((now - startedAt) / 1000) + (c.offset || 0);
              const t = elapsed % total;
              const redEl = o.div.querySelector('[data-red]');
              const yellowEl = o.div.querySelector('[data-yellow]');
              const greenEl = o.div.querySelector('[data-green]');
              const timerEl = o.div.querySelector('[data-timer]');
              redEl.classList.remove('on'); yellowEl.classList.remove('on'); greenEl.classList.remove('on');
              let phase = 'RED', left = 0;
              if (t < c.cycle.red) { phase = 'RED'; left = c.cycle.red - t; redEl.classList.add('on'); }
              else if (t < c.cycle.red + c.cycle.yellow) { phase = 'YELLOW'; left = c.cycle.red + c.cycle.yellow - t; yellowEl.classList.add('on'); }
              else { phase = 'GREEN'; left = total - t; greenEl.classList.add('on'); }
              timerEl.textContent = phase + ' ' + left + 's';
            });
          }, 1000);
        }

        function focusChauraha(id) {
          const c = chaurahas.find(x => x.id === id);
          if (!c) return;
          map.panTo(new google.maps.LatLng(c.lat, c.lng));
          map.setZoom(15);
          const o = overlays[id];
          if (o && o.div) { o.div.classList.add('pulse'); setTimeout(() => o.div.classList.remove('pulse'), 1600); }
        }

        // Listen for parent messages to focus
        window.addEventListener('message', function(e){
          try {
            const data = e.data && (typeof e.data === 'string' ? JSON.parse(e.data) : e.data);
            if (data && data.type === 'focusChauraha') { focusChauraha(data.id); }
          } catch {}
        });
      </script>
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAzakCzViqQ1UF13ekm_W4jD0CKm4k1nqQ&libraries=visualization,geometry&callback=initMap" async defer></script>
    </head>
    <body>
      <div id="map"></div>
      <div class="btns">
        <button id="toggleHeat" class="btn">Heatmap</button>
        <button id="toggleTraffic" class="btn">Traffic</button>
      </div>
      <script>
        document.getElementById('toggleHeat').addEventListener('click', function() { if (!window.heatmap) return; heatmap.setMap(heatmap.getMap() ? null : map); });
        document.getElementById('toggleTraffic').addEventListener('click', function() { if (!window.trafficLayer) return; trafficLayer.setMap(trafficLayer.getMap() ? null : map); });
      </script>
    </body>
  </html>`, [heatOn, trafficOn, startLocation, endLocation]);

  return (
    <View style={styles.container}>
      <View style={[styles.wrapper, { width: mapWidth, height: containerH }]}>      
        {Platform.OS === 'web' ? (
          <iframe
            ref={iframeRef as any}
            title="ujjain-map"
            srcDoc={html}
            style={{ border: '0px', width: '100%', height: '100%' }}
          />
        ) : (
          <WebView ref={webviewRef}
            originWhitelist={["*"]} source={{ html }} style={styles.webview} />
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


