import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerStyle: { backgroundColor: '#F8FAFC' }, headerTintColor: '#172554' }}>
        <Stack.Screen name="index" options={{ title: 'Sign Up' }} />
        <Stack.Screen name="confirmation" options={{ title: 'Confirmation', headerBackVisible: false, gestureEnabled: false }} />
      </Stack>
    </>
  );
}
