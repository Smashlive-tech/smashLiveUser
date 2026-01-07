import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import "../global.css";
export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="welcome"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="(auth)"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="terms-conditions"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="notifications"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="profile"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="payments"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="settings"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="posts"
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack>
    </AuthProvider>
  );
}
