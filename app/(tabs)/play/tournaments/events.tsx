import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
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
};
/* ================= DATA ================= */
const DEFAULT_DESCRIPTION =
  "Participate in this category based on tournament rules.";

/* ================= SCREEN ================= */
function EventSkeleton() {
  return (
    <View className="mb-4 rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-4">
      <View className="flex-row justify-between items-start">
        <View className="flex-1 pr-4">
          <View className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
          <View className="h-3 w-full bg-gray-200 dark:bg-gray-600 rounded" />
        </View>

        <View className="h-6 w-12 bg-gray-300 dark:bg-gray-700 rounded-full" />
      </View>
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

        console.log(res.data.docs);
        const data = res.data.docs ?? res.data;

        const mapped: EventItem[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: DEFAULT_DESCRIPTION,
          fee: item.fee ?? 50,
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

          {loading && [1, 2, 3].map((i) => <EventSkeleton key={i} />)}
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
