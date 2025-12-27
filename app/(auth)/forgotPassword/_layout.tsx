import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="email"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="password"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
