import { Slot, Stack } from 'expo-router';
import '@/translation/index';
import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { AppState, AppStateStatus, Platform } from 'react-native';
import { useEffect } from 'react';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import AuthProvider from '@/context/AuthContext';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const queryClient = new QueryClient();

  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <Slot />
        </AuthProvider>
        <StatusBar style="light" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
