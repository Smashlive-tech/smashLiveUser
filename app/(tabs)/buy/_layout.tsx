import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="orders"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen name="cart" options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen
        name="products"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
