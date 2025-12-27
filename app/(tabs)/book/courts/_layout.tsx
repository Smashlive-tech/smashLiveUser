import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="search"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="[courtId]"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="confirm"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="bookSlot"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="payment"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="paymentSuccess"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
