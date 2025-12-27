import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OtpCodeScreen() {
  const router = useRouter();

  const [otpError, setOtpError] = useState("");
  const [timer, setTimer] = useState(30);

  // TIMER EFFECT
  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleVerify = (code: string) => {
    if (code.length < 6) {
      setOtpError("Enter 6 digits");
      return;
    }
    setOtpError("");

    // success
    router.replace("/(tabs)/home");
  };

  const resendOtp = () => {
    setTimer(30); // restart timer
    setOtpError("");
  };
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
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
              Enter the 6 digit code
            </Text>
          </View>

          <View className="items-center">
            <OtpInput
              numberOfDigits={6}
              autoFocus={true}
              onTextChange={() => setOtpError("")}
              onFilled={handleVerify}
              theme={{
                containerStyle: {
                  width: "80%",
                  height: 80,
                },
                pinCodeContainerStyle: {
                  width: 45,
                  height: 55,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: otpError ? "#ef4444" : "#d1d5db",
                  backgroundColor: "transparent",
                },
                pinCodeTextStyle: {
                  color: isDarkMode ? "#fff" : "#000",
                  fontSize: 18,
                  fontWeight: "600",
                },
                focusStickStyle: {
                  backgroundColor: "#0d59f2",
                },
              }}
            />
          </View>

          {otpError ? (
            <Text className="text-red-500 text-sm text-center mt-2">
              {otpError}
            </Text>
          ) : null}

          {/* Verify button */}
          <View className="py-3 pb-4 mt-6">
            <TouchableOpacity
              onPress={() => handleVerify("")}
              className="flex h-14 w-full items-center justify-center rounded-xl bg-primary"
            >
              <Text className="text-white font-bold text-base">Verify</Text>
            </TouchableOpacity>
          </View>

          {timer > 0 ? (
            <Text className="text-center text-gray-500 dark:text-gray-400 mt-2">
              Resend OTP in {timer}s
            </Text>
          ) : (
            <TouchableOpacity onPress={resendOtp}>
              <Text className="text-center text-primary font-bold mt-2">
                Resend OTP
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
