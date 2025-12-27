import { MaterialCommunityIcons } from "@expo/vector-icons";
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

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    let valid = true;
    let temp = { email: "", password: "" };

    if (!email.trim()) {
      temp.email = "Email or phone is required";
      valid = false;
    } else {
      const isNumber = /^[0-9]+$/.test(email);
      if (isNumber) {
        if (email.length !== 10) {
          temp.email = "Enter valid 10 digit phone number";
          valid = false;
        }
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          temp.email = "Enter valid email address";
          valid = false;
        }
      }
    }

    if (!password.trim()) {
      temp.password = "Password is required";
      valid = false;
    }

    setErrors(temp);
    if (!valid) return;
    router.replace("/(tabs)/home");
  };

  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 bg-background-light dark:bg-background-dark"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          className="flex-1 px-6 pt-14"
        >
          {/* Sign In Header */}
          <View className="items-center mb-10">
            <Text className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome Back 👋
            </Text>
            <Text className="text-gray-500 dark:text-gray-400 text-base mt-2">
              Sign in to continue
            </Text>
          </View>

          {/* Email Field */}
          <View className="mb-3">
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">
              Email or Phone
            </Text>
            <View
              className={`flex-row items-center h-14 rounded-2xl border ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 dark:border-[#314368]"
              } bg-white dark:bg-[#182234] px-4 shadow-sm`}
            >
              <MaterialCommunityIcons
                name="email-outline"
                size={22}
                color="#9ca3af"
              />
              <TextInput
                value={email}
                onChangeText={(v) => {
                  setEmail(v);
                  setErrors({ ...errors, email: "" });
                }}
                placeholder="Enter your email"
                placeholderTextColor="#9ca3af"
                className="flex-1 pl-3 text-base text-gray-900 dark:text-white"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
              />
            </View>
            {errors.email ? (
              <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>
            ) : null}
          </View>

          {/* Password Field */}
          <View className="mb-2">
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">
              Password
            </Text>
            <View
              className={`flex-row items-center h-14 rounded-2xl border ${
                errors.password
                  ? "border-red-500"
                  : "border-gray-300 dark:border-[#314368]"
              } bg-white dark:bg-[#182234] px-4 shadow-sm`}
            >
              <MaterialCommunityIcons
                name="lock-outline"
                size={22}
                color="#9ca3af"
              />
              <TextInput
                value={password}
                onChangeText={(v) => {
                  setPassword(v);
                  setErrors({ ...errors, password: "" });
                }}
                placeholder="Enter your password"
                placeholderTextColor="#9ca3af"
                secureTextEntry={!isPasswordVisible}
                className="flex-1 pl-3 text-base text-gray-900 dark:text-white"
                returnKeyType="done"
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <MaterialCommunityIcons
                  name={isPasswordVisible ? "eye" : "eye-off"}
                  size={22}
                  color="#9ca3af"
                />
              </TouchableOpacity>
            </View>
            {errors.password ? (
              <Text className="text-red-500 text-sm mt-1">
                {errors.password}
              </Text>
            ) : null}
          </View>

          {/* Forgot Password */}
          <View className="flex-row justify-end mb-5">
            <TouchableOpacity
              onPress={() => router.push("/(auth)/forgotPassword/email")}
            >
              <Text className="text-sm font-medium text-primary">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Buttons */}
          <TouchableOpacity
            onPress={validate}
            className="flex h-14 w-full items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30 mb-3"
          >
            <Text className="text-white font-bold text-base">Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(auth)/otp_login/mobile")}
            className="flex h-14 w-full items-center justify-center rounded-2xl border border-gray-300 dark:border-[#314368] bg-transparent mb-5"
          >
            <Text className="text-gray-800 dark:text-white font-bold text-base">
              Login with OTP
            </Text>
          </TouchableOpacity>

          {/* Bottom */}
          <View className="mb-4">
            <Text className="text-center text-sm text-gray-600 dark:text-gray-400">
              New here?{" "}
              <Text
                className="font-bold text-primary"
                onPress={() => router.push("/(auth)/signup")}
              >
                Create Account
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
