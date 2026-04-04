import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View, useColorScheme } from "react-native";

export default function BookingTypeScreen() {
  const router = useRouter();
  const { courtId } = useLocalSearchParams<{ courtId: string }>();

  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>

        <Text className="ml-3 text-2xl font-bold text-light-text dark:text-dark-text">
          Choose Booking Type
        </Text>
      </View>

      {/* ================= CONTENT ================= */}
      <View className="px-4 pt-4 gap-5">
        {/* ===== CORPORATE PASS ===== */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() =>
            router.push({
              pathname: "/book/courts/corporateDate",
              params: { courtId },
            })
          }
          className="p-5 rounded-2xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card shadow-sm"
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="h-12 w-12 rounded-xl items-center justify-center bg-primary/10">
                <Ionicons name="business-outline" size={24} color="#8AFF1A" />
              </View>

              <View>
                <Text className="text-lg font-semibold text-light-text dark:text-dark-text">
                  Corporate Pass
                </Text>
                <Text className="text-sm text-light-muted dark:text-dark-muted">
                  Book entire venue
                </Text>
              </View>
            </View>

            <Ionicons name="chevron-forward" size={20} color={iconColor} />
          </View>
        </TouchableOpacity>

        {/* ===== SLOT BOOKING ===== */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() =>
            router.push({
              pathname: "/book/courts/bookSlot",
              params: { courtId },
            })
          }
          className="p-5 rounded-2xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card shadow-sm"
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="h-12 w-12 rounded-xl items-center justify-center bg-primary/10">
                <Ionicons name="time-outline" size={24} color="#8AFF1A" />
              </View>

              <View>
                <Text className="text-lg font-semibold text-light-text dark:text-dark-text">
                  Slot Booking
                </Text>
                <Text className="text-sm text-light-muted dark:text-dark-muted">
                  Book hourly slots
                </Text>
              </View>
            </View>

            <Ionicons name="chevron-forward" size={20} color={iconColor} />
          </View>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}
