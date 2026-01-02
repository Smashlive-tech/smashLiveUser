import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[eventId]"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
