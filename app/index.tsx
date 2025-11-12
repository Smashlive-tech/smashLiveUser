import React from "react";
import { Pressable, Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-background-light">
      <Text className="text-2xl font-bold text-primary mb-4">
        NativeWind Setup Test
      </Text>

      <Text className="text-text-secondary mb-6">
        If you see colors and spacing, it’s working!
      </Text>

      <Pressable className="bg-primary px-5 py-3 rounded-2xl">
        <Text className="text-white text-lg font-semibold">Press Me</Text>
      </Pressable>
    </View>
  );
}
