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
              Reset Password
            </Text>
          </View>

          {/* New Password */}
          <View className="mb-4">
            <Text className="text-base font-medium pb-2 text-gray-800 dark:text-gray-200">
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
                secureTextEntry={!isPasswordVisible}
                className={`h-14 w-full rounded-xl border ${
                  errorPassword
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-700"
                } bg-background-light dark:bg-background-dark p-[15px] pr-12 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500`}
              />

              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute right-4"
                style={{ top: 14 }}
              >
                <MaterialCommunityIcons
                  name={isPasswordVisible ? "eye" : "eye-off"}
                  size={22}
                  color="#6b7280"
                />
              </TouchableOpacity>
            </View>

            {errorPassword ? (
              <Text className="text-red-500 text-sm mt-1">{errorPassword}</Text>
            ) : null}
          </View>

          {/* Confirm Password */}
          <View className="mb-4">
            <Text className="text-base font-medium pb-2 text-gray-800 dark:text-gray-200">
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
                secureTextEntry={!isConfirmPasswordVisible}
                className={`h-14 w-full rounded-xl border ${
                  errorConfirm
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-700"
                } bg-background-light dark:bg-background-dark p-[15px] pr-12 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500`}
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
                  color="#6b7280"
                />
              </TouchableOpacity>
            </View>

            {errorConfirm ? (
              <Text className="text-red-500 text-sm mt-1">{errorConfirm}</Text>
            ) : null}
          </View>

          {/* Save button */}
          <View className="py-3 pb-4">
            <TouchableOpacity
              onPress={handleSave}
              className="flex h-14 w-full items-center justify-center rounded-xl bg-primary"
            >
              <Text className="text-white font-bold text-base">Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
