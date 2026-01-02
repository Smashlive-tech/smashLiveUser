import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

/* ================= DATA ================= */

const EVENTS = [
  {
    id: "u14",
    title: "Under 14",
    description: "For players aged 13 and below",
    format: "Singles",
  },
  {
    id: "u18",
    title: "Under 18",
    description: "For players aged 14 to 17",
    format: "Singles",
  },
  {
    id: "open",
    title: "Open Category",
    description: "Open to all age groups",
    format: "Singles & Doubles",
  },
  {
    id: "doubles",
    title: "Doubles Event",
    description: "Team-based doubles competition",
    format: "Doubles",
  },
];

/* ================= SCREEN ================= */

export default function TournamentEventsScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>

        <Text className="flex-1 ml-3 text-2xl font-bold text-light-text dark:text-dark-text">
          Play
        </Text>
      </View>

      {/* ================= CONTENT ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="px-4 pt-2">
          <Text className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">
            Tournament Events
          </Text>

          {EVENTS.map((event) => (
            <View
              key={event.id}
              className="mb-4 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border"
            >
              <View className="flex-row items-center p-4">
                {/* LEFT CONTENT */}
                <View className="flex-1 pr-3">
                  <Text className="text-base font-semibold text-light-text dark:text-dark-text">
                    {event.title}
                  </Text>

                  <Text className="text-sm text-light-muted dark:text-dark-muted mt-1">
                    {event.description}
                  </Text>

                  <Text className="text-sm text-light-muted dark:text-dark-muted mt-1">
                    🏸 {event.format}
                  </Text>
                </View>

                {/* RIGHT ACTION */}
                <TouchableOpacity
                  className="h-10 px-4 rounded-lg bg-primary items-center justify-center"
                  onPress={() =>
                    router.push({
                      pathname: "/play/tournaments/eventsFolder/[eventId]",
                      params: { eventId: event.id },
                    })
                  }
                >
                  <Text className="text-black text-sm font-bold">Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
