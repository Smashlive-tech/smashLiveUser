import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[tournamentId]"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
