import { useAuthContext } from '@/context/AuthContext';
import { Redirect, Stack } from 'expo-router';
import { useEffect } from 'react';
import { Text } from 'react-native';

const AppLayout = () => {
  const { isLoggedIn, verifyLogin } = useAuthContext();

  useEffect(() => {
    void verifyLogin();
  }, []);

  if (isLoggedIn === null) {
    return <Text>Loading...</Text>;
  }


  if (!isLoggedIn) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false, title: "Home" }} />
      <Stack.Screen name="sales" options={{headerTitle: 'Tickets'}} />
    </Stack>
  );
};

export default AppLayout;
