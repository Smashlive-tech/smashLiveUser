import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
type EventItem = {
  id: number;
  title: string;
  description: string;
  fee: number;
  format: string;
};
/* ================= DATA ================= */
const DEFAULT_DESCRIPTION =
  "Participate in this category based on tournament rules.";

/* ================= SCREEN ================= */
function LoadingEvents() {
  return (
    <View className="items-center justify-center py-20">
      <ActivityIndicator size="large" color="#22C55E" />
      <Text className="mt-3 text-sm text-light-muted dark:text-dark-muted">
        Loading events…
      </Text>
    </View>
  );
}

export default function TournamentRegisterScreen() {
  const router = useRouter();
  const { tournamentId } = useLocalSearchParams<{ tournamentId: string }>();

  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "https://smashlive-omega.vercel.app/api/events",
          {
            params: {
              "where[tournament.id][equals]": tournamentId,
            },
          }
        );

        const data = res.data.docs ?? res.data;

        const mapped: EventItem[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: DEFAULT_DESCRIPTION,
          fee: item.pricePerRegistration,
          format: item["Pairing Type"],
        }));

        setEvents(mapped);
      } catch (err) {
        console.log("Failed to fetch events", err);
        Alert.alert("Failed to fetch events");
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

          {loading && <LoadingEvents />}
          {!loading && events.length === 0 && (
            <Text className="text-center text-light-muted dark:text-dark-muted mt-10">
              No events available for this tournament
            </Text>
          )}
          {!loading &&
            events.map((event) => {
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
                          <View className="flex-row mt-2 items-center gap-1">
                            <Ionicons
                              name="trophy-outline"
                              size={16}
                              color={iconColor}
                            />

                            <Text className="text-sm text-light-muted dark:text-dark-muted">
                              {event.format}
                            </Text>
                          </View>
                        </View>

                        {/* FEE BADGE */}
                        <View className="px-3 py-1 rounded-full bg-light-border dark:bg-dark-border">
                          <Text className="text-sm font-semibold text-light-text dark:text-dark-text">
                            ₹{event.fee}
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
        {!loading && (
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
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}
