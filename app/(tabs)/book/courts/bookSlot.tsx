import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { Calendar } from "react-native-calendars";

/* ================= SLOT GENERATOR ================= */

function generateSlots() {
  return [
    { time: "09:00 AM", available: true },
    { time: "10:00 AM", available: true },
    { time: "11:00 AM", available: true },
    { time: "02:00 PM", available: true },
    { time: "03:00 PM", available: true },
    { time: "04:00 PM", available: false },
  ];
}

/* ================= SCREEN ================= */

export default function BookSlotScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [slots, setSlots] = useState<{ time: string; available: boolean }[]>(
    []
  );
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  useEffect(() => {
    setSelectedSlot(null);
    setSlots(generateSlots());
  }, [selectedDate]);

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center gap-3 px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
          Book
        </Text>
      </View>

      {/* ================= CONTENT ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* ================= CALENDAR ================= */}
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

        {/* ================= SLOT HEADER ================= */}
        <Text className="px-4 pt-6 pb-3 text-lg font-bold text-light-text dark:text-dark-text">
          Available Times for {new Date(selectedDate).toDateString()}
        </Text>

        {/* ================= TIME SLOTS ================= */}
        <View className="flex-row flex-wrap gap-3 px-4">
          {slots.map((slot) => {
            const isSelected = selectedSlot === slot.time;

            return (
              <TouchableOpacity
                key={slot.time}
                disabled={!slot.available}
                activeOpacity={0.85}
                onPress={() => setSelectedSlot(slot.time)}
                className={`h-11 px-5 rounded-xl items-center justify-center border ${
                  !slot.available
                    ? "bg-light-border dark:bg-dark-border border-light-border dark:border-dark-border"
                    : isSelected
                      ? "bg-primary border-primary"
                      : "bg-light-card dark:bg-dark-card border-light-border dark:border-dark-border"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    !slot.available
                      ? "text-light-muted dark:text-dark-muted"
                      : isSelected
                        ? "text-black"
                        : "text-light-text dark:text-dark-text"
                  }`}
                >
                  {slot.time}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* ================= STICKY FOOTER ================= */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border">
        <TouchableOpacity
          disabled={!selectedSlot}
          activeOpacity={0.85}
          onPress={() =>
            router.push({
              pathname: "/book/courts/confirm",
              params: {
                date: selectedDate,
                time: selectedSlot,
              },
            })
          }
          className={`h-14 rounded-xl items-center justify-center ${
            selectedSlot ? "bg-primary" : "bg-light-border dark:bg-dark-border"
          }`}
        >
          <Text
            className={`text-base font-medium ${
              selectedSlot
                ? "text-black"
                : "text-light-muted dark:text-dark-muted"
            }`}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}
