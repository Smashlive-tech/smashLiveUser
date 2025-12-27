import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotEmailScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Enter valid email address");
      return;
    }

    setError("");

    // you can call send reset email API here

    router.push("/(auth)/forgotPassword/password");
  };

  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 bg-background-light dark:bg-background-dark"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-4 pb-0">
          <View className="flex-row items-center justify-center p-4 pb-6">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              Forgot Password
            </Text>
          </View>

          <View className="pt-4 mb-4">
            <Text className="text-base font-medium pb-2 text-gray-800 dark:text-gray-200">
              Email Address
            </Text>

            <TextInput
              value={email}
              onChangeText={(v) => {
                setEmail(v);
                setError("");
              }}
              placeholder="Enter your email"
              className={`h-14 w-full rounded-xl border ${
                error
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              } bg-background-light dark:bg-background-dark p-[15px] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500`}
            />

            {error ? (
              <Text className="text-red-500 text-sm mt-1">{error}</Text>
            ) : null}
          </View>

          <View className="py-3 pb-4">
            <TouchableOpacity
              onPress={handleNext}
              className="flex h-14 w-full items-center justify-center rounded-xl bg-primary"
            >
              <Text className="text-white font-bold text-base">Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
