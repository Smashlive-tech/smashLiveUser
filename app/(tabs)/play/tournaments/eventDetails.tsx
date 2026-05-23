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
  duration: number;
  price: number;
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
          description: DEFAULT_DESCRIPTION,
          format: item["Pairing Type"],
          price: item.pricePerRegistration,
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
          {events.length > 0 && (
            <Text className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">
              Tournament Events
            </Text>
          )}
          {loading && (
            <View className="items-center justify-center py-20">
              <ActivityIndicator size="large" color="#22C55E" />
              <Text className="mt-3 text-sm text-light-muted dark:text-dark-muted">
                Loading events…
              </Text>
            </View>
          )}
          {!loading && events.length === 0 && (
            <View className="items-center justify-center py-20">
              <Text className="text-sm text-light-muted dark:text-dark-muted">
                No events available for this tournament.
              </Text>
            </View>
          )}

          {!loading &&
            events.map((event) => (
              <View
                key={event.id}
                className="mb-4 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border overflow-hidden"
              >
                <View className="flex-row items-center p-4">
                  {/* LEFT CONTENT */}
                  <View className="flex-1 pr-3">
                    <Text className="text-base font-semibold text-light-text dark:text-dark-text">
                      {event.title}
                    </Text>

                    {!!event.description && (
                      <Text className="text-sm text-light-muted dark:text-dark-muted mt-1">
                        {event.description}
                      </Text>
                    )}
                    <View className="mt-2 flex-row items-center gap-3">
                      <View className="flex-row items-center gap-2">
                        <Ionicons
                          name="trophy-outline"
                          size={16}
                          color={iconColor}
                        />

                        <Text className="text-sm text-light-muted dark:text-dark-muted">
                          {event.format}
                        </Text>
                      </View>

                      <Text className="text-sm font-semibold text-light-text dark:text-dark-text">
                        ₹ {event.price}
                      </Text>
                    </View>
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
