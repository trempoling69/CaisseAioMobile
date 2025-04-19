import { useAuthContext } from '@/context/AuthContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Redirect, Stack } from 'expo-router';
import { useEffect } from 'react';
import { Text } from 'react-native';

const AppLayout = () => {
  const { isLoggedIn, verifyLogin } = useAuthContext();

  useEffect(() => {
    verifyLogin();
  }, []);

  if (isLoggedIn === null) {
    return <Text>Loading...</Text>;
  }

  if (isLoggedIn === true) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AppLayout;
