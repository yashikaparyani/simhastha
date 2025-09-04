import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { LocationProvider } from '@/contexts/LocationContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <NotificationProvider>
      <LocationProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="aadhaar-verification" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="wallet-payment-confirmation" options={{ headerShown: false }} />
            <Stack.Screen name="admin-dashboard" options={{ headerShown: false }} />
            <Stack.Screen name="superadmin-dashboard" options={{ headerShown: false }} />
            <Stack.Screen name="admin-main-dashboard" options={{ headerShown: false }} />
            <Stack.Screen name="admin-user-management" options={{ headerShown: false }} />
            <Stack.Screen name="admin-hotel-management" options={{ headerShown: false }} />
            <Stack.Screen name="admin-transport-management" options={{ headerShown: false }} />
            <Stack.Screen name="admin-payment-management" options={{ headerShown: false }} />
            <Stack.Screen name="admin-emergency-services" options={{ headerShown: false }} />
            <Stack.Screen name="admin-volunteer-management" options={{ headerShown: false }} />
            <Stack.Screen name="admin-notifications" options={{ headerShown: false }} />
            <Stack.Screen name="admin-heatmap" options={{ headerShown: false }} />
            <Stack.Screen name="admin-reports" options={{ headerShown: false }} />
            <Stack.Screen name="admin-settings" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </LocationProvider>
    </NotificationProvider>
  );
}
