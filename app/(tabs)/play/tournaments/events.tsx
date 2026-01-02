import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
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
    fee: 30,
  },
  {
    id: "u18",
    title: "Under 18",
    description: "For players aged 14 to 17",
    fee: 40,
  },
  {
    id: "open",
    title: "Open Category",
    description: "Open to all age groups",
    fee: 50,
  },
  {
    id: "doubles",
    title: "Doubles Event",
    description: "Team-based doubles competition",
    fee: 60,
  },
];

/* ================= SCREEN ================= */

export default function TournamentRegisterScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

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

        <View className="flex-row gap-4">
          <TouchableOpacity onPress={() => router.push("/notifications")}>
            <MaterialIcons name="notifications" size={24} color={iconColor} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/play/bookings")}>
            <MaterialIcons name="calendar-month" size={24} color={iconColor} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ================= CONTENT ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="px-4 pt-2 pb-6">
          <Text className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">
            Select Event Category
          </Text>

          {EVENTS.map((event) => {
            const isSelected = selectedEvent === event.id;

            return (
              <TouchableOpacity
                key={event.id}
                onPress={() => setSelectedEvent(event.id)}
                className={`mb-4 rounded-xl border overflow-hidden ${
                  isSelected
                    ? "border-primary"
                    : "border-light-border dark:border-dark-border"
                }`}
              >
                <View
                  className={`flex-row ${
                    isSelected
                      ? "bg-primary/10"
                      : "bg-light-card dark:bg-dark-card"
                  }`}
                >
                  {/* LEFT ACCENT */}
                  {isSelected && <View className="w-1 bg-primary" />}

                  {/* CONTENT */}
                  <View className="flex-1 p-4">
                    <View className="flex-row justify-between items-start">
                      <View className="flex-1 pr-4">
                        <Text className="text-base font-semibold text-light-text dark:text-dark-text">
                          {event.title}
                        </Text>

                        <Text className="text-sm text-light-muted dark:text-dark-muted mt-1">
                          {event.description}
                        </Text>
                      </View>

                      {/* FEE BADGE */}
                      <View className="px-3 py-1 rounded-full bg-light-border dark:bg-dark-border">
                        <Text className="text-sm font-semibold text-light-text dark:text-dark-text">
                          ${event.fee}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ================= CTA ================= */}
        <View className="px-4">
          <TouchableOpacity
            disabled={!selectedEvent}
            onPress={() =>
              router.push({
                pathname: "/play/tournaments/register",
                params: { eventId: selectedEvent },
              })
            }
            className={`h-14 rounded-xl items-center justify-center border ${
              selectedEvent
                ? "bg-primary border-primary"
                : "bg-light-card dark:bg-dark-card border-light-border dark:border-dark-border"
            }`}
          >
            <Text
              className={`text-base font-bold ${
                selectedEvent
                  ? "text-black"
                  : "text-light-muted dark:text-dark-muted"
              }`}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
