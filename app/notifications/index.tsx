import GuestView from "@/components/GuestView";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

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
/* ================= MAIN ================= */
export default function NotificationScreen() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <GuestView title="Notifications" />;
  return <NotificationsAuthenticated />;
}

/* ================= AUTHENTICATED VIEW ================= */
function NotificationsAuthenticated() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";
  return (
    <ScreenWrapper>
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={22} color={iconColor} />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
          Notifications
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 pt-2">
          {NOTIFICATIONS.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.85}
              className="mb-3 flex-row rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-4"
            >
              <View className="h-10 w-10 rounded-full items-center justify-center bg-primary/15 mr-3">
                <Ionicons
                  name="notifications-outline"
                  size={18}
                  color="#22C55E"
                />
              </View>

              <View className="flex-1">
                <View className="flex-row justify-between items-start mb-1">
                  <Text className="text-base font-semibold text-light-text dark:text-dark-text">
                    {item.title}
                  </Text>
                  <Text className="text-xs text-light-muted dark:text-dark-muted ml-2">
                    {item.time}
                  </Text>
                </View>
                <Text className="text-sm text-light-muted dark:text-dark-muted leading-5">
                  {item.message}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
