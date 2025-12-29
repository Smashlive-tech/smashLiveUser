import ScreenWrapper from "@/components/ScreenWrapper";
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

type FormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpScreen() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const [agreed, setAgreed] = useState(false);
  const [agreeError, setAgreeError] = useState("");

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = () => {
    let valid = true;
    let temp: FormData = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    setAgreeError("");

    if (!formData.fullName.trim()) {
      temp.fullName = "Full name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      temp.email = "Email is required";
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        temp.email = "Enter a valid email address";
        valid = false;
      }
    }

    if (!formData.password.trim()) {
      temp.password = "Password is required";
      valid = false;
    }

    if (!formData.confirmPassword.trim()) {
      temp.confirmPassword = "Confirm password is required";
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      temp.confirmPassword = "Passwords do not match";
      valid = false;
    }

    if (!agreed) {
      setAgreeError("You must agree to the Terms & Conditions");
      valid = false;
    }

    setErrors(temp);
    if (!valid) return;

    router.push("/(auth)/login");
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
              Create Account ✨
            </Text>
            <Text className="text-light-muted dark:text-dark-muted text-base mt-2">
              Join us and get started
            </Text>
          </View>

          {/* Full Name */}
          <View className="mb-3">
            <Text className="text-sm font-medium text-light-text dark:text-dark-text mb-2 ml-1">
              Full Name
            </Text>
            <View
              className={`flex-row items-center h-14 rounded-2xl border ${
                errors.fullName
                  ? "border-red-500"
                  : "border-light-border dark:border-dark-border"
              } bg-light-card dark:bg-dark-card px-4`}
            >
              <MaterialCommunityIcons
                name="account-outline"
                size={22}
                color="#9CA3AF"
              />
              <TextInput
                value={formData.fullName}
                onChangeText={(t) => handleInputChange("fullName", t)}
                placeholder="Enter your full name"
                placeholderTextColor="#9CA3AF"
                className="flex-1 pl-3 text-base text-light-text dark:text-dark-text"
                autoCapitalize="words"
              />
            </View>
            {errors.fullName ? (
              <Text className="text-red-500 text-sm mt-1">
                {errors.fullName}
              </Text>
            ) : null}
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
                value={formData.email}
                onChangeText={(t) => handleInputChange("email", t)}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                className="flex-1 pl-3 text-base text-light-text dark:text-dark-text"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {errors.email ? (
              <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>
            ) : null}
          </View>

          {/* Password */}
          <View className="mb-3">
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
                value={formData.password}
                onChangeText={(t) => handleInputChange("password", t)}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!isPasswordVisible}
                className="flex-1 pl-3 text-base text-light-text dark:text-dark-text"
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
              <Text className="text-red-500 text-sm mt-1">
                {errors.password}
              </Text>
            ) : null}
          </View>

          {/* Confirm Password */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-light-text dark:text-dark-text mb-2 ml-1">
              Confirm Password
            </Text>
            <View
              className={`flex-row items-center h-14 rounded-2xl border ${
                errors.confirmPassword
                  ? "border-red-500"
                  : "border-light-border dark:border-dark-border"
              } bg-light-card dark:bg-dark-card px-4`}
            >
              <MaterialCommunityIcons
                name="lock-check-outline"
                size={22}
                color="#9CA3AF"
              />
              <TextInput
                value={formData.confirmPassword}
                onChangeText={(t) => handleInputChange("confirmPassword", t)}
                placeholder="Confirm your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!isConfirmPasswordVisible}
                className="flex-1 pl-3 text-base text-light-text dark:text-dark-text"
              />
              <TouchableOpacity
                onPress={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
              >
                <MaterialCommunityIcons
                  name={isConfirmPasswordVisible ? "eye" : "eye-off"}
                  size={22}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword ? (
              <Text className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </Text>
            ) : null}
          </View>

          {/* Terms */}
          <View className="flex-row items-center mb-4 ml-1">
            <TouchableOpacity
              onPress={() => setAgreed(!agreed)}
              className={`h-5 w-5 rounded border mr-3 items-center justify-center ${
                agreed
                  ? "bg-primary border-primary"
                  : "border-light-border dark:border-dark-border"
              }`}
            >
              {agreed && (
                <MaterialCommunityIcons name="check" size={16} color="#000" />
              )}
            </TouchableOpacity>

            <Text className="text-light-muted dark:text-dark-muted text-sm flex-1">
              I agree to the{" "}
              <Text
                className="text-primary font-semibold"
                onPress={() => router.push("/terms-conditions")}
              >
                Terms & Conditions
              </Text>
            </Text>
          </View>

          {agreeError ? (
            <Text className="text-red-500 text-sm mb-4 ml-1">{agreeError}</Text>
          ) : null}

          {/* Submit */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="h-14 w-full items-center justify-center rounded-2xl bg-primary mb-5"
          >
            <Text className="text-black font-bold text-base">Sign Up</Text>
          </TouchableOpacity>

          {/* Bottom */}
          <Text className="text-center text-sm text-light-muted dark:text-dark-muted">
            Already have an account?{" "}
            <Text
              className="font-bold text-primary"
              onPress={() => router.push("/(auth)/login")}
            >
              Sign In
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
