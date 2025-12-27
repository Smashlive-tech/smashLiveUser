import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="[orderId]"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
