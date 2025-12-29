import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

/* ================= TYPES ================= */

type BookingStatus = "upcoming" | "live" | "past";

type Booking = {
  id: string;
  title: string;
  venue: string;
  datetime: string;
  sport: string;
  status: BookingStatus;
  image: string;
};

/* ================= MOCK DATA ================= */

const BOOKINGS: Booking[] = [
  {
    id: "TB-1001",
    title: "Summer Slam Tennis Open",
    venue: "Downtown Tennis Center",
    datetime: "Oct 28 • 4:00 PM - 6:00 PM",
    sport: "Tennis",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
  },
  {
    id: "TB-1002",
    title: "City Marathon Challenge",
    venue: "City Sports Club",
    datetime: "Live Now",
    sport: "Running",
    status: "live",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
  },
  {
    id: "TB-0991",
    title: "Elite Badminton Cup",
    venue: "National Indoor Stadium",
    datetime: "Sep 12 • 9:00 AM",
    sport: "Badminton",
    status: "past",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
  },
];

/* ================= SCREEN ================= */

export default function MyTournamentBookingsScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  const [activeTab, setActiveTab] = useState<BookingStatus>("upcoming");
  const [search, setSearch] = useState("");

  const filteredBookings = useMemo(() => {
    return BOOKINGS.filter((b) => {
      const matchesTab = b.status === activeTab;
      const matchesSearch =
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.venue.toLowerCase().includes(search.toLowerCase()) ||
        b.sport.toLowerCase().includes(search.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [activeTab, search]);

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

      {/* ================= SEARCH ================= */}
      <View className="px-4 pb-3">
        <View className="flex-row items-center h-12 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border px-4">
          <Ionicons name="search" size={20} color={iconColor} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search tournaments"
            placeholderTextColor={iconColor}
            className="flex-1 ml-2 text-base text-light-text dark:text-dark-text"
          />
        </View>
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
                className={`font-bold text-sm capitalize ${
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
        {filteredBookings.length > 0 ? (
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

  return (
    <View className="mb-4 rounded-xl bg-light-card dark:bg-dark-card p-3 border border-light-border dark:border-dark-border">
      <View className="flex-row gap-4">
        <Image
          source={{ uri: booking.image }}
          className="w-24 h-24 rounded-lg"
        />

        <View className="flex-1 justify-center">
          <Text className="text-base font-bold text-light-text dark:text-dark-text">
            {booking.title}
          </Text>
          <Text className="text-sm text-light-muted dark:text-dark-muted mt-1">
            {booking.venue}
          </Text>
          <Text className="text-sm text-light-muted dark:text-dark-muted mt-1">
            {booking.datetime}
          </Text>
          <Text className="text-xs font-medium text-primary mt-1">
            {booking.sport}
          </Text>
        </View>
      </View>

      {/* ================= ACTIONS ================= */}
      <View className="mt-4">
        {booking.status === "upcoming" && (
          <TouchableOpacity
            onPress={() =>
              router.push(`/play/tournaments/matches/details/${booking.id}`)
            }
            className="h-10 rounded-lg bg-primary items-center justify-center"
          >
            <Text className="text-black font-semibold text-sm">
              View Details
            </Text>
          </TouchableOpacity>
        )}

        {booking.status === "live" && (
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() =>
                router.push(`/play/tournaments/matches/live/${booking.id}`)
              }
              className="flex-1 h-10 rounded-lg bg-primary items-center justify-center"
            >
              <Text className="text-black  font-semibold text-sm">
                View Score
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                router.push(`/play/tournaments/matches/details/${booking.id}`)
              }
              className="flex-1 h-10 rounded-lg border border-light-border dark:border-dark-border items-center justify-center"
            >
              <Text className="text-light-text dark:text-dark-text font-semibold text-sm">
                View Details
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {booking.status === "past" && (
          <TouchableOpacity
            onPress={() =>
              router.push(`/play/tournaments/matches/summary/${booking.id}`)
            }
            className="h-10 rounded-lg bg-primary items-center justify-center"
          >
            <Text className="text-black  font-semibold text-sm">
              View Summary
            </Text>
          </TouchableOpacity>
        )}
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
          <Text className="text-white font-bold text-base">
            Explore Tournaments
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
