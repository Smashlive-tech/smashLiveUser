import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[userId]"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="help_support"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="edit-profile"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
