import ScreenWrapper from "@/components/ScreenWrapper";
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
    router.push("/(auth)/forgotPassword/password");
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 px-4"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* Header */}
          <View className="items-center py-6 pb-6">
            <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
              Forgot Password
            </Text>
          </View>

          {/* Email Input */}
          <View className="pt-4 mb-4">
            <Text className="text-base font-medium pb-2 text-light-text dark:text-dark-text">
              Email Address
            </Text>

            <TextInput
              value={email}
              onChangeText={(v) => {
                setEmail(v);
                setError("");
              }}
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              className={`h-14 w-full rounded-xl border ${
                error
                  ? "border-red-500"
                  : "border-light-border dark:border-dark-border"
              } bg-light-card dark:bg-dark-card p-[15px] text-base text-light-text dark:text-dark-text`}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {error ? (
              <Text className="text-red-500 text-sm mt-1">{error}</Text>
            ) : null}
          </View>

          {/* Next Button */}
          <TouchableOpacity
            onPress={handleNext}
            className="h-14 w-full items-center justify-center rounded-xl bg-primary mt-4"
          >
            <Text className="text-black font-bold text-base">Next</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
