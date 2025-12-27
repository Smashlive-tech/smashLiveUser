import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="live" options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen
        name="summary"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="details"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
