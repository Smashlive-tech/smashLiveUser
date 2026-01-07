import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

/* ================= DATA ================= */
type EventItem = {
  id: number;
  title: string;
  description: string;
  format: string;
};
const DEFAULT_DESCRIPTION =
  "Participate in this category based on tournament rules.";

const DEFAULT_FORMAT = "Singles";

/* ================= SCREEN ================= */

export default function TournamentEventsScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { tournamentId } = useLocalSearchParams<{ tournamentId: string }>();
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "https://smashlive-omega.vercel.app/api/events",
          {
            params: {
              depth: 0,
              "where[tournament.id][equals]": tournamentId,
            },
          }
        );

        const data = res.data.docs ?? res.data;

        const mapped: EventItem[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: DEFAULT_DESCRIPTION, // 🔒 hardcoded
          format: DEFAULT_FORMAT, // 🔒 hardcoded
        }));

        setEvents(mapped);
      } catch (err) {
        console.log("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    };

    if (tournamentId) {
      fetchEvents();
    }
  }, [tournamentId]);

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
          {loading && (
            <View className="items-center justify-center py-20">
              <ActivityIndicator size="large" color="#8AFF1A" />
              <Text className="mt-3 text-sm text-light-muted dark:text-dark-muted">
                Loading events…
              </Text>
            </View>
          )}
          {!loading &&
            events.map((event) => (
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
                    <Text className="text-black text-sm font-bold">
                      Details
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
