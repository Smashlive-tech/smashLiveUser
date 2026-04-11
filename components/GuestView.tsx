import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, useColorScheme } from "react-native";

type Props = {
  title: string;
};

export default function GuestView({ title }: Props) {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={22} color={iconColor} />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
          {title}
        </Text>
      </View>

      {/* ================= CONTENT ================= */}
      <View className="flex-1 items-center justify-center px-6">
        {/* ICON */}
        <View className="h-24 w-24 rounded-full bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border items-center justify-center mb-6">
          <Ionicons name="lock-closed-outline" size={36} color={iconColor} />
        </View>

        {/* TITLE */}
        <Text className="text-xl font-bold text-light-text dark:text-dark-text text-center">
          Login Required
        </Text>

        {/* SUBTEXT */}
        <Text className="text-sm text-light-muted dark:text-dark-muted mt-2 text-center leading-5">
          You need to be logged in to access this page.
        </Text>

        {/* BUTTON */}
        <TouchableOpacity
          onPress={() => router.replace("/(auth)/login")}
          activeOpacity={0.85}
          className="mt-6 px-6 py-2.5 rounded-xl bg-primary items-center justify-center"
        >
          <Text className="text-black font-semibold text-base">Login</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}
