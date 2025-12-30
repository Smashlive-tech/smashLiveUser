import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[productId]"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
