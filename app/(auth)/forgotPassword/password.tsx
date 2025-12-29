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

export default function NewPasswordScreen() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handleSave = () => {
    let valid = true;

    if (password.length < 8) {
      setErrorPassword("Password must be at least 8 characters");
      valid = false;
    }

    if (confirmPassword !== password) {
      setErrorConfirm("Passwords do not match");
      valid = false;
    }

    if (!valid) return;

    // call API to update password
    router.push("/(auth)/login");
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
              Reset Password
            </Text>
          </View>

          {/* New Password */}
          <View className="mb-4">
            <Text className="text-base font-medium pb-2 text-light-text dark:text-dark-text">
              New Password
            </Text>

            <View className="relative justify-center">
              <TextInput
                value={password}
                onChangeText={(v) => {
                  setPassword(v);
                  setErrorPassword("");
                }}
                placeholder="Enter new password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!isPasswordVisible}
                className={`h-14 w-full rounded-xl border ${
                  errorPassword
                    ? "border-red-500"
                    : "border-light-border dark:border-dark-border"
                } bg-light-card dark:bg-dark-card p-[15px] pr-12 text-base text-light-text dark:text-dark-text`}
              />

              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute right-4"
                style={{ top: 14 }}
              >
                <MaterialCommunityIcons
                  name={isPasswordVisible ? "eye" : "eye-off"}
                  size={22}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>

            {errorPassword ? (
              <Text className="text-red-500 text-sm mt-1">{errorPassword}</Text>
            ) : null}
          </View>

          {/* Confirm Password */}
          <View className="mb-6">
            <Text className="text-base font-medium pb-2 text-light-text dark:text-dark-text">
              Confirm Password
            </Text>

            <View className="relative justify-center">
              <TextInput
                value={confirmPassword}
                onChangeText={(v) => {
                  setConfirmPassword(v);
                  setErrorConfirm("");
                }}
                placeholder="Confirm new password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!isConfirmPasswordVisible}
                className={`h-14 w-full rounded-xl border ${
                  errorConfirm
                    ? "border-red-500"
                    : "border-light-border dark:border-dark-border"
                } bg-light-card dark:bg-dark-card p-[15px] pr-12 text-base text-light-text dark:text-dark-text`}
              />

              <TouchableOpacity
                onPress={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
                className="absolute right-4"
                style={{ top: 14 }}
              >
                <MaterialCommunityIcons
                  name={isConfirmPasswordVisible ? "eye" : "eye-off"}
                  size={22}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>

            {errorConfirm ? (
              <Text className="text-red-500 text-sm mt-1">{errorConfirm}</Text>
            ) : null}
          </View>

          {/* Save Button */}
          <TouchableOpacity
            onPress={handleSave}
            className="h-14 w-full items-center justify-center rounded-xl bg-primary"
          >
            <Text className="text-black font-bold text-base">Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
