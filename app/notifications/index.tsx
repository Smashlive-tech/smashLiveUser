import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* ================= MOCK DATA =================
   🔹 Replace this with API response later
*/
const NOTIFICATIONS = [
  {
    id: "1",
    title: "Tournament Reminder",
    message: "Summer Slam Tennis Open starts tomorrow",
    time: "2h ago",
  },
  {
    id: "2",
    title: "Booking Confirmed",
    message: "Your court booking is confirmed for today",
    time: "5h ago",
  },
  {
    id: "3",
    title: "New Event",
    message: "City Marathon registrations are now open",
    time: "1d ago",
  },
];

export default function NotificationScreen() {
  const isDark = useColorScheme() === "dark";
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      {/* ================= HEADER (GLOBAL CONSISTENT) ================= */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons
            name="arrow-back"
            size={22}
            color={isDark ? "#9ca3af" : "#6c757d"}
          />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-text-primary dark:text-white">
          Notifications
        </Text>
      </View>

      {/* ================= LIST ================= */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 pt-2">
          {NOTIFICATIONS.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.85}
              className="mb-3 flex-row rounded-xl bg-white dark:bg-slate-800
                         border border-slate-200 dark:border-slate-700 p-4"
            >
              {/* LEFT ICON (ONLY ONE) */}
              <View
                className="h-10 w-10 rounded-full items-center justify-center
                           bg-slate-100 dark:bg-slate-700 mr-3"
              >
                <Ionicons
                  name="notifications-outline"
                  size={18}
                  color={isDark ? "#cbd5e1" : "#475569"}
                />
              </View>

              {/* CONTENT */}
              <View className="flex-1">
                <View className="flex-row justify-between items-start mb-1">
                  <Text className="text-base font-semibold text-text-primary dark:text-white">
                    {item.title}
                  </Text>
                  <Text className="text-xs text-text-secondary ml-2">
                    {item.time}
                  </Text>
                </View>

                <Text className="text-sm text-text-secondary leading-5">
                  {item.message}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
