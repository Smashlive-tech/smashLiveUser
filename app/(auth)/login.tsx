import ScreenWrapper from "@/components/ScreenWrapper";
import { useAuth } from "@/context/AuthContext";
import { checkAuth } from "@/services/authService";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import { ActivityIndicator } from "react-native";

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setUser } = useAuth();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    toast: "",
  });

  const validate = async () => {
    let valid = true;
    let temp = { email: "", password: "", toast: "" };

    if (!email.trim()) {
      temp.email = "Email or phone is required";
      valid = false;
    } else {
      const isNumber = /^[0-9]+$/.test(email);
      if (isNumber && email.length !== 10) {
        temp.email = "Enter valid 10 digit phone number";
        valid = false;
      } else if (!isNumber) {
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
    try {
      setLoading(true);
      const res = await axios.post(
        "https://smashlive-omega.vercel.app/api/users/login",
        { email: email, password: password }
      );
      await SecureStore.setItemAsync("token", res.data.token, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED,
      });
      const data = await checkAuth();
      setUser(data.user);
      router.replace("/(tabs)/home");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.errors?.[0]?.message ||
          err.response?.data?.message ||
          "Something went wrong";
        temp.toast = message;
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScreenWrapper>
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
          {/* Header */}
          <View className="items-center mb-10">
            <Text className="text-3xl font-bold text-light-text dark:text-dark-text">
              Welcome Back 👋
            </Text>
            <Text className="text-light-muted dark:text-dark-muted text-base mt-2">
              Sign in to continue
            </Text>
          </View>

          {/* Email */}
          <View className="mb-3">
            <Text className="text-sm font-medium text-light-text dark:text-dark-text mb-2 ml-1">
              Email
            </Text>

            <View
              className={`flex-row items-center h-14 rounded-2xl border ${
                errors.email
                  ? "border-red-500"
                  : "border-light-border dark:border-dark-border"
              } bg-light-card dark:bg-dark-card px-4`}
            >
              <MaterialCommunityIcons
                name="email-outline"
                size={22}
                color="#9CA3AF"
              />
              <TextInput
                value={email}
                onChangeText={(v) => {
                  setEmail(v);
                  setErrors({ ...errors, email: "" });
                }}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                className="flex-1 pl-3 text-base text-light-text dark:text-dark-text"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
              />
            </View>

            {errors.email ? (
              <Text className="text-red-500 text-sm mt-1 ml-1">
                {errors.email}
              </Text>
            ) : null}
          </View>

          {/* Password */}
          <View className="mb-2">
            <Text className="text-sm font-medium text-light-text dark:text-dark-text mb-2 ml-1">
              Password
            </Text>

            <View
              className={`flex-row items-center h-14 rounded-2xl border ${
                errors.password
                  ? "border-red-500"
                  : "border-light-border dark:border-dark-border"
              } bg-light-card dark:bg-dark-card px-4`}
            >
              <MaterialCommunityIcons
                name="lock-outline"
                size={22}
                color="#9CA3AF"
              />
              <TextInput
                value={password}
                onChangeText={(v) => {
                  setPassword(v);
                  setErrors({ ...errors, password: "" });
                }}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!isPasswordVisible}
                className="flex-1 pl-3 text-base text-light-text dark:text-dark-text"
                returnKeyType="done"
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <MaterialCommunityIcons
                  name={isPasswordVisible ? "eye" : "eye-off"}
                  size={22}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>

            {errors.password ? (
              <Text className="text-red-500 text-sm mt-1 ml-1">
                {errors.password}
              </Text>
            ) : null}
            {errors.toast ? (
              <Text className="text-red-500 text-sm mt-1 ml-1">
                {errors.toast}
              </Text>
            ) : null}
          </View>

          {/* Forgot */}
          <View className="flex-row justify-end mb-5">
            <TouchableOpacity
              onPress={() => router.push("/(auth)/forgotPassword/email")}
            >
              <Text className="text-sm font-medium text-primary">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Buttons Section */}
          <View className="mt-4 gap-3">
            {/* Primary - Sign In */}
            <TouchableOpacity
              onPress={validate}
              disabled={loading}
              className={`h-14 w-full items-center justify-center rounded-2xl ${
                loading ? "bg-primary/70" : "bg-primary"
              }`}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <Text className="text-black font-bold text-base">Sign In</Text>
              )}
            </TouchableOpacity>

            {/* Secondary - OTP */}
            <TouchableOpacity
              onPress={() => router.push("/(auth)/otp_login/mobile")}
              className="h-14 w-full items-center justify-center rounded-2xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card"
            >
              <Text className="text-light-text dark:text-dark-text font-semibold text-base">
                Login with OTP
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center my-1">
              <View className="flex-1 h-[1px] bg-light-border dark:bg-dark-border" />
              <Text className="mx-3 text-xs text-light-muted dark:text-dark-muted">
                OR
              </Text>
              <View className="flex-1 h-[1px] bg-light-border dark:bg-dark-border" />
            </View>

            <TouchableOpacity
              onPress={() => router.push("/(tabs)/home")}
              className="h-14 w-full mb-3 items-center justify-center rounded-2xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card"
            >
              <Text className="text-light-text dark:text-dark-text font-semibold text-base">
                Continue as Guest
              </Text>
            </TouchableOpacity>
          </View>
          {/* Bottom */}
          <Text className="text-center text-sm text-light-muted dark:text-dark-muted">
            New here?{" "}
            <Text
              className="font-bold text-primary"
              onPress={() => router.push("/(auth)/signup")}
            >
              Create Account
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
