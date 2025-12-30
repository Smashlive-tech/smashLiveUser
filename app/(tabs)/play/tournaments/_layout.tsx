import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[tournamentId]"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="register"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="createTeam"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="payment"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="matches"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="events"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
