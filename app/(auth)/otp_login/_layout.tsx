import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="mobile"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen name="otp" options={{ headerShown: false }}></Stack.Screen>
    </Stack>
  );
}
