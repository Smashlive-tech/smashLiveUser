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
import { SafeAreaView } from "react-native-safe-area-context";

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
      // here you will call real backend API:
      // await axios.post("/auth/send-otp", { phone: "+" + callingCode + phone });

      // simulate success:
      Alert.alert("OTP Sent", `OTP has been sent to +${callingCode} ${phone}`);

      router.push("/(auth)/otp_login/otp");
    } catch (error) {
      Alert.alert("Error", "Server error, cannot send OTP");
    }
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
          <View className="flex-row items-center justify-center p-4 pb-8">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              Login with OTP
            </Text>
          </View>

          {/* PHONE INPUT */}
          <View className="mb-4">
            <Text className="text-base font-medium pb-2 text-gray-800 dark:text-gray-200">
              Mobile Number
            </Text>

            <View
              className={`flex-row items-center h-14 rounded-xl border px-3 ${
                error
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              } bg-background-light dark:bg-background-dark`}
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

              <Text className="text-gray-900 dark:text-white ml-2 mr-2">
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
                className="flex-1 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </View>

            {error ? (
              <Text className="text-red-500 text-sm mt-1">{error}</Text>
            ) : null}
          </View>

          {/* NEXT BUTTON */}
          <View className="py-3 pb-4">
            <TouchableOpacity
              onPress={handleNext}
              className="flex h-14 w-full items-center justify-center rounded-xl bg-primary"
            >
              <Text className="text-white font-bold text-base">Send OTP</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
