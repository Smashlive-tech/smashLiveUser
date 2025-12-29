import ScreenWrapper from "@/components/ScreenWrapper";
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

export default function OtpCodeScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  const [otpError, setOtpError] = useState("");
  const [timer, setTimer] = useState(30);

  /* TIMER */
  useEffect(() => {
    const interval = setInterval(() => {
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
    router.replace("/(tabs)/home");
  };

  const resendOtp = () => {
    setTimer(30);
    setOtpError("");
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
          <View className="items-center py-6 pb-8">
            <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
              Enter the 6 digit code
            </Text>
          </View>

          {/* OTP INPUT */}
          <View className="items-center">
            <OtpInput
              numberOfDigits={6}
              autoFocus
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
                  borderColor: otpError
                    ? "#EF4444"
                    : isDark
                      ? "#262626"
                      : "#E5E7EB",
                  backgroundColor: isDark ? "#151515" : "#FFFFFF",
                },
                pinCodeTextStyle: {
                  color: isDark ? "#FFFFFF" : "#0F172A",
                  fontSize: 18,
                  fontWeight: "600",
                },
                focusStickStyle: {
                  backgroundColor: "#8AFF1A",
                },
              }}
            />
          </View>

          {otpError ? (
            <Text className="text-red-500 text-sm text-center mt-2">
              {otpError}
            </Text>
          ) : null}

          {/* VERIFY BUTTON */}
          <View className="mt-6">
            <TouchableOpacity
              onPress={() => handleVerify("")}
              className="h-14 w-full items-center justify-center rounded-xl bg-primary"
            >
              <Text className="text-black font-bold text-base">Verify</Text>
            </TouchableOpacity>
          </View>

          {/* RESEND */}
          {timer > 0 ? (
            <Text className="text-center text-light-muted dark:text-dark-muted mt-4">
              Resend OTP in {timer}s
            </Text>
          ) : (
            <TouchableOpacity onPress={resendOtp}>
              <Text className="text-center text-primary font-bold mt-4">
                Resend OTP
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
