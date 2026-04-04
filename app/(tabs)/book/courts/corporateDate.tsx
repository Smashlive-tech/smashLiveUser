import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { Calendar } from "react-native-calendars";

export default function CorporateDateScreen() {
  const router = useRouter();
  const { courtId } = useLocalSearchParams<{ courtId: string }>();

  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center gap-3 px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
          Corporate Booking
        </Text>
      </View>

      {/* ================= CONTENT ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* ================= CALENDAR (SAME AS SLOT SCREEN) ================= */}
        <View className="px-4">
          <Calendar
            minDate={today}
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: "#8AFF1A",
              },
            }}
            theme={{
              calendarBackground: "transparent",
              dayTextColor: isDark ? "#FFFFFF" : "#0F172A",
              monthTextColor: isDark ? "#FFFFFF" : "#0F172A",
              textDisabledColor: "#9CA3AF",
              arrowColor: "#8AFF1A",
              selectedDayBackgroundColor: "#8AFF1A",
              todayTextColor: "#8AFF1A",
            }}
          />
        </View>

        {/* ================= INFO ================= */}
        <Text className="px-4 pt-6 text-lg font-bold text-light-text dark:text-dark-text">
          Booking entire venue for:
        </Text>

        <Text className="px-4 pt-2 text-base text-light-muted dark:text-dark-muted">
          {new Date(selectedDate).toDateString()}
        </Text>
      </ScrollView>

      {/* ================= STICKY FOOTER ================= */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border">
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() =>
            router.push({
              pathname: "/book/courts/confirm",
              params: {
                courtId,
                type: "corporate",
                date: selectedDate,
              },
            })
          }
          className="h-14 rounded-xl bg-primary items-center justify-center"
        >
          <Text className="text-black text-base font-medium">Continue</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}
