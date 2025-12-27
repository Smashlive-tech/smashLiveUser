import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // profile state
  const [profilePic, setProfilePic] = useState(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBALEbqIVOyBbj_MSp30VwoHAO85ei29lp8jLEqOdwgkwZ1fal1v1DLwrhHg_q6-bJwNfitfgguH3Ijoz6XPevVYgqr5Bgd0DPvXitiqP1CGHeVS7i_eLYVZQQwDlIj8nioZd4u25mK8V58LTWb-R-F8Fh7XtK6yUM6_uRR255hnwZux-4wBbYu8N8brI93hpEZZHs-MANGSzFK8QHquRSx0y8MEMbMrs9zdZ6lEFlYHLrzygn9QBY2s9xjgLL_a-_eEd8kDhZaA6Zl"
  );

  // image picker handler
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "We need access to your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 bg-[#f5f6f8] dark:bg-[#101622]"
    >
      {/* ===== Header ===== */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons
            name="arrow-back"
            size={22}
            color={isDark ? "#9ca3af" : "#6c757d"}
          />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-text-primary dark:text-white">
          Settings
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-4 pt-4 pb-8"
        showsVerticalScrollIndicator={false}
      >
        {/* ===== Profile Section ===== */}
        <View className="flex flex-col items-center mb-8 mt-2">
          {/* Profile image picker */}
          <TouchableOpacity
            onPress={pickImage}
            activeOpacity={0.8}
            className="relative"
          >
            <Image
              source={{ uri: profilePic }}
              className="h-32 w-32 rounded-full bg-center bg-cover"
            />
            {/* Edit icon overlay */}
            <View className="absolute bottom-1 right-1 bg-[#0d59f2] rounded-full p-2">
              <MaterialIcons name="edit" size={18} color="#fff" />
            </View>
          </TouchableOpacity>

          <Text className="text-[22px] font-bold text-gray-900 dark:text-white text-center mt-4 leading-tight">
            Alex Martinez
          </Text>
          <Text className="text-base text-gray-500 dark:text-gray-400 text-center leading-normal">
            alex.martinez@smashlive.com
          </Text>
        </View>

        {/* ===== Card 1 ===== */}
        <View className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm overflow-hidden mb-5">
          {/* Edit Profile */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/profile/edit-profile")}
            className="flex-row items-center justify-between px-4 min-h-[60px] border-b border-gray-100 dark:border-gray-700/50"
          >
            <View className="flex-row items-center gap-4">
              <View className="bg-[#0d59f2]/20 rounded-lg size-10 items-center justify-center">
                <MaterialIcons name="person" size={24} color="#0d59f2" />
              </View>
              <Text className="text-gray-900 dark:text-white text-base font-medium leading-normal">
                Edit Profile
              </Text>
            </View>
            <View className="flex size-7 items-center justify-center">
              <MaterialIcons
                name="chevron-right"
                size={26}
                color={isDark ? "#9ca3af" : "#6b7280"}
              />
            </View>
          </TouchableOpacity>
          {/* Notification */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/notifications")}
            className="flex-row items-center justify-between px-4 min-h-[60px]"
          >
            <View className="flex-row items-center gap-4">
              <View className="bg-[#0d59f2]/20 rounded-lg size-10 items-center justify-center">
                <MaterialIcons name="notifications" size={22} color="#0d59f2" />
              </View>
              <Text className="text-gray-900 dark:text-white text-base font-medium leading-normal">
                Notifications
              </Text>
            </View>
            <View className="flex size-7 items-center justify-center">
              <MaterialIcons
                name="chevron-right"
                size={26}
                color={isDark ? "#9ca3af" : "#6b7280"}
              />
            </View>
          </TouchableOpacity>
          {/* Payment Settings */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/payments")}
            className="flex-row items-center justify-between px-4 min-h-[60px]"
          >
            <View className="flex-row items-center gap-4">
              <View className="bg-[#0d59f2]/20 rounded-lg size-10 items-center justify-center">
                <MaterialIcons name="credit-card" size={22} color="#0d59f2" />
              </View>
              <Text className="text-gray-900 dark:text-white text-base font-medium leading-normal">
                Payments
              </Text>
            </View>
            <View className="flex size-7 items-center justify-center">
              <MaterialIcons
                name="chevron-right"
                size={26}
                color={isDark ? "#9ca3af" : "#6b7280"}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* ===== Card 2 ===== */}
        <View className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm overflow-hidden mb-5">
          {/* Help & Support */}
          <TouchableOpacity
            activeOpacity={0.8}
            className="flex-row items-center justify-between px-4 min-h-[60px]"
            onPress={() => router.push("/profile/help_support")}
          >
            <View className="flex-row items-center gap-4">
              <View className="bg-[#0d59f2]/20 rounded-lg size-10 items-center justify-center">
                <MaterialIcons name="help-outline" size={24} color="#0d59f2" />
              </View>
              <Text className="text-gray-900 dark:text-white text-base font-medium leading-normal">
                Help & Support
              </Text>
            </View>
            <View className="flex size-7 items-center justify-center">
              <MaterialIcons
                name="chevron-right"
                size={26}
                color={isDark ? "#9ca3af" : "#6b7280"}
              />
            </View>
          </TouchableOpacity>
          {/* Terms & Conditions */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/terms-conditions")}
            className="flex-row items-center justify-between px-4 min-h-[60px]"
          >
            <View className="flex-row items-center gap-4">
              <View className="bg-[#0d59f2]/20 rounded-lg size-10 items-center justify-center">
                <MaterialIcons name="description" size={24} color="#0d59f2" />
              </View>
              <Text className="text-gray-900 dark:text-white text-base font-medium">
                Terms & Conditions
              </Text>
            </View>

            <View className="flex size-7 items-center justify-center">
              <MaterialIcons
                name="chevron-right"
                size={26}
                color={isDark ? "#9ca3af" : "#6b7280"}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* ===== Logout ===== */}
        <View className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm overflow-hidden">
          <TouchableOpacity
            activeOpacity={0.8}
            className="flex-row items-center justify-between px-4 min-h-[60px]"
          >
            <View className="flex-row items-center gap-4">
              <View className="bg-red-500/20 rounded-lg size-10 items-center justify-center">
                <MaterialIcons name="logout" size={22} color="#ef4444" />
              </View>
              <Text className="text-base font-medium text-red-500 leading-normal">
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
