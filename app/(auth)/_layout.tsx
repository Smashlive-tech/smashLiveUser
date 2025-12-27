import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="signup"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="otp_login"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="forgotPassword"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
