import ScreenWrapper from "@/components/ScreenWrapper";
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

export default function SettingsScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  const [profilePic, setProfilePic] = useState(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBALEbqIVOyBbj_MSp30VwoHAO85ei29lp8jLEqOdwgkwZ1fal1v1DLwrhHg_q6-bJwNfitfgguH3Ijoz6XPevVYgqr5Bgd0DPvXitiqP1CGHeVS7i_eLYVZQQwDlIj8nioZd4u25mK8V58LTWb-R-F8Fh7XtK6yUM6_uRR255hnwZux-4wBbYu8N8brI93hpEZZHs-MANGSzFK8QHquRSx0y8MEMbMrs9zdZ6lEFlYHLrzygn9QBY2s9xjgLL_a-_eEd8kDhZaA6Zl"
  );

  /* ================= IMAGE PICKER ================= */
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
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons
            name="arrow-back"
            size={22}
            color={isDark ? "#9CA3AF" : "#6B7280"}
          />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
          Settings
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
      >
        {/* ================= PROFILE ================= */}
        <View className="items-center mt-2 mb-8">
          <TouchableOpacity onPress={pickImage} activeOpacity={0.85}>
            <Image
              source={{ uri: profilePic }}
              className="h-32 w-32 rounded-full"
            />
            <View className="absolute bottom-1 right-1 bg-primary rounded-full p-2">
              <MaterialIcons name="edit" size={18} color="#000" />
            </View>
          </TouchableOpacity>

          <Text className="mt-4 text-[22px] font-bold text-light-text dark:text-dark-text">
            Alex Martinez
          </Text>
          <Text className="text-base text-light-muted dark:text-dark-muted">
            alex.martinez@smashlive.com
          </Text>
        </View>

        {/* ================= ACCOUNT ================= */}
        <SettingsCard>
          <SettingsRow
            icon="person"
            label="Edit Profile"
            onPress={() => router.push("/profile/edit-profile")}
          />
          <SettingsRow
            icon="notifications"
            label="Notifications"
            onPress={() => router.push("/notifications")}
          />
          <SettingsRow
            icon="credit-card"
            label="Payments"
            onPress={() => router.push("/payments")}
            last
          />
        </SettingsCard>

        {/* ================= SUPPORT ================= */}
        <SettingsCard>
          <SettingsRow
            icon="help-outline"
            label="Help & Support"
            onPress={() => router.push("/profile/help_support")}
          />
          <SettingsRow
            icon="description"
            label="Terms & Conditions"
            onPress={() => router.push("/terms-conditions")}
            last
          />
        </SettingsCard>

        {/* ================= LOGOUT ================= */}
        <SettingsCard>
          <TouchableOpacity
            activeOpacity={0.85}
            className="flex-row items-center px-4 py-4"
          >
            <View className="h-10 w-10 rounded-lg bg-red-500/20 items-center justify-center mr-4">
              <MaterialIcons name="logout" size={22} color="#EF4444" />
            </View>
            <Text className="text-base font-medium text-red-500">Logout</Text>
          </TouchableOpacity>
        </SettingsCard>
      </ScrollView>
    </ScreenWrapper>
  );
}

/* ================= REUSABLE ================= */

function SettingsCard({ children }: { children: React.ReactNode }) {
  return (
    <View className="mb-5 rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card overflow-hidden">
      {children}
    </View>
  );
}

function SettingsRow({
  icon,
  label,
  onPress,
  last,
}: {
  icon: any;
  label: string;
  onPress: () => void;
  last?: boolean;
}) {
  const isDark = useColorScheme() === "dark";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className={`flex-row items-center justify-between px-4 py-4 ${
        !last ? "border-b border-light-border dark:border-dark-border" : ""
      }`}
    >
      <View className="flex-row items-center gap-4">
        <View className="h-10 w-10 rounded-lg bg-primary/20 items-center justify-center">
          <MaterialIcons name={icon} size={22} color="#8AFF1A" />
        </View>
        <Text className="text-base font-medium text-light-text dark:text-dark-text">
          {label}
        </Text>
      </View>

      <MaterialIcons
        name="chevron-right"
        size={26}
        color={isDark ? "#9CA3AF" : "#6B7280"}
      />
    </TouchableOpacity>
  );
}
