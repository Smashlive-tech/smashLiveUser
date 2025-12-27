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
import { SafeAreaView } from "react-native-safe-area-context";

/* ================= SLOT GENERATOR ================= */

function generateSlots() {
  return [
    { time: "09:00 AM", available: true },
    { time: "10:00 AM", available: true },
    { time: "11:00 AM", available: true },
    { time: "02:00 PM", available: true },
    { time: "03:00 PM", available: true },
    { time: "04:00 PM", available: false }, // disabled
  ];
}

/* ================= SCREEN ================= */

export default function BookSlotScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9ca3af" : "#6c757d";

  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [slots, setSlots] = useState<{ time: string; available: boolean }[]>(
    []
  );
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  /* ================= FETCH SLOTS ================= */
  useEffect(() => {
    setSelectedSlot(null);
    setSlots(generateSlots());
  }, [selectedDate]);

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center gap-2 px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-text-primary dark:text-white">
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
                selectedColor: "#0d59f2",
              },
            }}
            theme={{
              calendarBackground: "transparent",
              dayTextColor: isDark ? "#ffffff" : "#111827",
              monthTextColor: isDark ? "#ffffff" : "#111827",
              textDisabledColor: "#9ca3af",
              arrowColor: "#0d59f2",
              selectedDayBackgroundColor: "#0d59f2",
              todayTextColor: "#0d59f2",
            }}
          />
        </View>

        {/* ================= SLOT HEADER ================= */}
        <Text className="px-4 pt-6 pb-3 text-lg font-bold text-text-primary dark:text-white">
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
                className={`h-11 px-5 rounded-xl items-center justify-center border-2 ${
                  !slot.available
                    ? "bg-slate-300 dark:bg-slate-700 border-slate-300 dark:border-slate-700"
                    : isSelected
                      ? "bg-primary border-primary"
                      : "bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
                    !slot.available
                      ? "text-slate-600 dark:text-slate-400"
                      : isSelected
                        ? "text-white"
                        : "text-text-primary dark:text-white"
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
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800">
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
          className={`h-14 rounded-xl items-center justify-center shadow-lg ${
            selectedSlot ? "bg-primary" : "bg-slate-300 dark:bg-slate-700"
          }`}
        >
          <Text
            className={`text-base font-bold ${
              selectedSlot ? "text-white" : "text-slate-500"
            }`}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
