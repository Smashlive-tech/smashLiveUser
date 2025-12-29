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

type BookingStatus = "upcoming" | "past";

type Booking = {
  id: string;
  venue: string;
  datetime: string;
  sport: string;
  status: BookingStatus;
  image: string;
};

/* ================= MOCK DATA ================= */

const BOOKINGS: Booking[] = [
  {
    id: "BK-1024",
    venue: "Downtown Tennis Center",
    datetime: "Mon, Oct 28 • 4:00 PM - 5:00 PM",
    sport: "Tennis - Court 3",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
  },
  {
    id: "BK-0912",
    venue: "City Sports Club",
    datetime: "Sun, Oct 20 • 10:00 AM - 11:00 AM",
    sport: "Badminton - Court 1",
    status: "past",
    image: "https://images.unsplash.com/photo-1600054800747-5cbf4a7a8c4b",
  },
];

/* ================= SCREEN ================= */

export default function MyBookingsScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  const [activeTab, setActiveTab] = useState<BookingStatus>("upcoming");
  const [search, setSearch] = useState("");

  const filteredBookings = useMemo(() => {
    return BOOKINGS.filter((b) => {
      const matchesTab = b.status === activeTab;
      const matchesSearch =
        b.venue.toLowerCase().includes(search.toLowerCase()) ||
        b.sport.toLowerCase().includes(search.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, search]);

  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* ================= HEADER ================= */}
        <View className="flex-row items-center gap-3 px-4 py-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={iconColor} />
          </TouchableOpacity>

          <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
            My Bookings
          </Text>
        </View>

        {/* ================= SEARCH ================= */}
        <View className="px-4 pb-3">
          <View className="flex-row items-center h-12 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border px-4">
            <Ionicons name="search" size={20} color={iconColor} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search bookings"
              placeholderTextColor={iconColor}
              className="flex-1 ml-2 text-base text-light-text dark:text-dark-text"
            />
          </View>
        </View>

        {/* ================= TABS ================= */}
        <View className="px-4">
          <View className="flex-row border-b border-light-border dark:border-dark-border">
            {(["upcoming", "past"] as BookingStatus[]).map((tab) => {
              const active = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  className={`flex-1 items-center py-3 border-b-2 ${
                    active ? "border-primary" : "border-transparent"
                  }`}
                >
                  <Text
                    className={`text-sm font-medium capitalize ${
                      active
                        ? "text-primary"
                        : "text-light-muted dark:text-dark-muted"
                    }`}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ================= BOOKINGS ================= */}
        <View className="px-4 pt-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          ) : (
            <EmptyBookings onPress={() => router.push("/book/courts/search")} />
          )}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

/* ================= CARD ================= */

function BookingCard({ booking }: { booking: Booking }) {
  return (
    <View className="mb-5 rounded-2xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border flex-row gap-4">
      <Image source={{ uri: booking.image }} className="w-24 h-24 rounded-xl" />

      <View className="flex-1 justify-center">
        <Text className="text-base font-semibold text-light-text dark:text-dark-text">
          {booking.venue}
        </Text>

        <Text className="text-sm text-light-muted dark:text-dark-muted mt-1">
          {booking.datetime}
        </Text>

        <Text className="text-sm font-medium text-light-muted dark:text-dark-muted mt-1">
          {booking.sport}
        </Text>
      </View>
    </View>
  );
}

/* ================= EMPTY STATE ================= */

function EmptyBookings({ onPress }: { onPress: () => void }) {
  return (
    <View className="items-center justify-center mt-20 px-6">
      <View className="h-16 w-16 rounded-full bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border items-center justify-center">
        <Ionicons name="calendar-outline" size={32} color="#6B7280" />
      </View>

      <Text className="mt-4 text-lg font-bold text-light-text dark:text-dark-text">
        No Bookings Yet
      </Text>
      <Text className="mt-1 text-sm text-light-muted dark:text-dark-muted text-center">
        Your upcoming and past bookings will appear here.
      </Text>

      <TouchableOpacity
        onPress={onPress}
        className="mt-6 h-12 px-6 rounded-lg bg-primary items-center justify-center"
      >
        <Text className="text-black font-medium text-base">Book a Court</Text>
      </TouchableOpacity>
    </View>
  );
}
