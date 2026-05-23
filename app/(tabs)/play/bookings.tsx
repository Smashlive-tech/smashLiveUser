import GuestView from "@/components/GuestView";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
/* ================= TYPES ================= */

type BookingStatus = "upcoming" | "live" | "past";

type Booking = {
  time: any;
  format: any;
  courts: any;
  id: string;
  title: string;
  venue: string;
  datetime: string;
  sport: string;
  status: BookingStatus;
  image: string;
};

/* ================= SCREEN ================= */
export default function MyTournamentBookingsScreen() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <GuestView title="Play" />;
  return <MyTournamentBookingsScreenAuthenticated />;
}
function MyTournamentBookingsScreenAuthenticated() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<BookingStatus>("upcoming");
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };
  useEffect(() => {
    if (!user?.id) return;
    const fetchMyBookings = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "https://smashlive-omega.vercel.app/api/registrations",
          {
            params: {
              depth: 1,
              "where[player.id][equals]": user.id,
            },
          }
        );
        console.log(user.id);
        const mappedBookings: Booking[] = (res.data.docs ?? []).map(
          (r: any) => {
            const event = r.event;

            const now = new Date();
            const start = new Date(event.startdate);
            const end = new Date(event.enddate);

            let status: BookingStatus = "upcoming";
            if (now >= start && now <= end) status = "live";
            if (now > end) status = "past";

            return {
              id: String(event.id),

              title: event.title,

              venue: event.venue ?? "TBD",

              datetime: start.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }),

              time: `${formatTime(event.startTime)} - ${formatTime(event.endTime)}`,

              format: event["Pairing Type"],

              courts: event.Courts?.length ?? 0,

              sets: event.numberOfSets,

              sport: "Tournament",

              status,

              image:
                "https://images.unsplash.com/photo-1517649763962-0c623066013b",
            };
          }
        );

        setBookings(mappedBookings);
      } catch (err) {
        console.log("Failed to fetch bookings", err);
        Alert.alert("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, [user?.id]);

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchesTab = b.status === activeTab;
      const matchesSearch =
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.venue.toLowerCase().includes(search.toLowerCase()) ||
        b.sport.toLowerCase().includes(search.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [bookings, activeTab, search]);

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center gap-3 px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
          Play
        </Text>
      </View>

      {/* ================= TABS ================= */}
      <View className="px-4">
        <View className="flex-row border-b border-light-border dark:border-dark-border">
          {(["upcoming", "live", "past"] as BookingStatus[]).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 items-center py-3 border-b-2 ${
                activeTab === tab ? "border-primary" : "border-transparent"
              }`}
            >
              <Text
                className={`font-bold text-m capitalize ${
                  activeTab === tab
                    ? "text-primary"
                    : "text-light-muted dark:text-dark-muted"
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ================= LIST ================= */}
      <ScrollView className="flex-1 px-4 pt-4">
        {loading ? (
          // ===== SKELETONS =====
          <View className="flex-1 items-center justify-center py-20">
            <ActivityIndicator size="large" color="#22C55E" />
            <Text className="mt-3 text-sm text-light-muted dark:text-dark-muted">
              Loading your Events…
            </Text>
          </View>
        ) : filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <EmptyState activeTab={activeTab} />
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

/* ================= CARD ================= */

function BookingCard({ booking }: { booking: Booking }) {
  const router = useRouter();
  const iconColor = useColorScheme() === "dark" ? "#9CA3AF" : "#475569";
  return (
    <View className="mb-4 rounded-3xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border overflow-hidden">
      {/* CONTENT */}
      <View className="flex-row gap-4 p-4">
        {/* IMAGE */}
        <Image
          source={{ uri: booking.image }}
          className="w-24 h-24 rounded-2xl bg-gray-200 dark:bg-gray-700"
        />

        {/* INFO */}
        <View className="flex-1 justify-between">
          <View>
            {/* TITLE + STATUS */}
            <View className="flex-row items-start justify-between gap-2">
              <Text
                className="flex-1 text-base font-bold text-light-text dark:text-dark-text"
                numberOfLines={2}
              >
                {booking.title}
              </Text>
            </View>

            {/* VENUE */}
            <Text
              className="text-sm text-light-muted dark:text-dark-muted mt-1"
              numberOfLines={1}
            >
              {booking.venue}
            </Text>

            {/* DATE + TIME */}
            <Text className="text-xs text-light-muted dark:text-dark-muted mt-1">
              {booking.datetime}
              {booking.time ? ` • ${booking.time}` : ""}
            </Text>
          </View>

          {/* TAGS */}
          <View className="flex-row flex-wrap items-center gap-2 mt-1">
            {booking.format && (
              <View className="flex-row items-center gap-1">
                <Ionicons name="trophy-outline" size={14} color={iconColor} />

                <Text className="text-sm text-light-muted dark:text-dark-muted">
                  {booking.format}
                </Text>
              </View>
            )}

            {booking.courts && (
              <Text className="text-sm text-light-muted dark:text-dark-muted">
                {booking.courts} Court(s)
              </Text>
            )}
          </View>
        </View>
      </View>

      {/* ACTION */}
      <View className="px-4 pb-4">
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/play/tournaments/eventsFolder/[eventId]",
              params: {
                eventId: booking.id,
                tab: "matches",
              },
            })
          }
          className="h-11 rounded-2xl bg-primary items-center justify-center"
          activeOpacity={0.85}
        >
          <Text className="text-black font-bold text-sm">View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ================= EMPTY STATE ================= */

function EmptyState({ activeTab }: { activeTab: BookingStatus }) {
  const router = useRouter();

  return (
    <View className="items-center justify-center mt-24 px-6">
      <View className="h-16 w-16 rounded-full bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border items-center justify-center">
        <Ionicons name="calendar-outline" size={32} color="#6B7280" />
      </View>

      <Text className="mt-4 text-lg font-bold text-light-text dark:text-dark-text">
        No {activeTab} tournaments
      </Text>

      <Text className="mt-1 text-sm text-light-muted dark:text-dark-muted text-center">
        Your {activeTab} tournament bookings will appear here.
      </Text>

      {activeTab !== "past" && (
        <TouchableOpacity
          onPress={() => router.push("/play")}
          className="mt-6 h-12 px-6 rounded-lg bg-primary items-center justify-center"
        >
          <Text className="dark:text-black text-white font-bold text-base">
            Explore Tournaments
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
