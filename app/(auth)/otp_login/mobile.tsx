import ScreenWrapper from "@/components/ScreenWrapper";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CountryPicker, { Country } from "react-native-country-picker-modal";

export default function PhoneScreen() {
  const router = useRouter();

  const [countryCode, setCountryCode] = useState<Country["cca2"]>("IN");
  const [callingCode, setCallingCode] = useState<string>("91");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!phone.trim()) {
      setError("Phone number is required");
      return;
    }
    const onlyDigits = /^[0-9]+$/;
    if (!onlyDigits.test(phone)) {
      setError("Phone number must contain only digits");
      return;
    }
    if (phone.length !== 10) {
      setError("Enter valid 10 digit phone");
      return;
    }

    setError("");

    try {
      Alert.alert("OTP Sent", `OTP has been sent to +${callingCode} ${phone}`);
      router.push("/(auth)/otp_login/otp");
    } catch (error) {
      Alert.alert("Error", "Server error, cannot send OTP");
    }
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
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Header */}
          <View className="items-center py-6 pb-8">
            <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
              Login with OTP
            </Text>
          </View>

          {/* Phone Input */}
          <View className="mb-4">
            <Text className="text-base font-medium pb-2 text-light-text dark:text-dark-text">
              Mobile Number
            </Text>

            <View
              className={`flex-row items-center h-14 rounded-xl border px-3 ${
                error
                  ? "border-red-500"
                  : "border-light-border dark:border-dark-border"
              } bg-light-card dark:bg-dark-card`}
            >
              <CountryPicker
                countryCode={countryCode}
                withCallingCode
                withFilter
                withFlag
                withModal
                onSelect={(c) => {
                  setCountryCode(c.cca2);
                  setCallingCode(c.callingCode[0]);
                  setError("");
                }}
              />

              <Text className="ml-2 mr-2 text-light-text dark:text-dark-text">
                +{callingCode}
              </Text>

              <TextInput
                keyboardType="number-pad"
                maxLength={10}
                value={phone}
                onChangeText={(v) => {
                  setPhone(v);
                  setError("");
                }}
                placeholder="Enter mobile number"
                placeholderTextColor="#9CA3AF"
                className="flex-1 text-base text-light-text dark:text-dark-text"
              />
            </View>

            {error ? (
              <Text className="text-red-500 text-sm mt-1">{error}</Text>
            ) : null}
          </View>

          {/* Send OTP Button */}
          <TouchableOpacity
            onPress={handleNext}
            className="h-14 w-full items-center justify-center rounded-xl bg-primary mt-4"
          >
            <Text className="text-black font-bold text-base">Send OTP</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
