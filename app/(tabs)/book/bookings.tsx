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
import { SafeAreaView } from "react-native-safe-area-context";

/* ================= MOCK BOOKINGS ================= */

type BookingStatus = "upcoming" | "past";

type Booking = {
  id: string;
  venue: string;
  datetime: string;
  sport: string;
  status: BookingStatus;
  image: string;
};

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

export default function MyBookingsScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  const [activeTab, setActiveTab] = useState<BookingStatus>("upcoming");
  const [search, setSearch] = useState("");

  /* ================= FILTER LOGIC ================= */

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
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center gap-2 px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDark ? "#9ca3af" : "#6c757d"}
          />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-text-primary dark:text-white">
          Book
        </Text>
      </View>

      {/* ================= SEARCH ================= */}
      <View className="px-4 pb-3">
        <View className="flex-row items-center h-12 rounded-lg bg-slate-200 dark:bg-slate-800 px-4">
          <Ionicons
            name="search"
            size={20}
            color={isDark ? "#9ca3af" : "#6c757d"}
          />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search bookings..."
            placeholderTextColor={isDark ? "#9ca3af" : "#6c757d"}
            className="flex-1 ml-2 text-base text-text-primary dark:text-white"
          />
        </View>
      </View>

      {/* ================= TABS ================= */}
      <View className="px-4">
        <View className="flex-row border-b border-slate-200 dark:border-slate-700">
          {(["upcoming", "past"] as BookingStatus[]).map((tab) => (
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
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ================= BOOKINGS ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-4 pt-4"
      >
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <EmptyBookings />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= CARD WITH IMAGE ================= */

function BookingCard({ booking }: { booking: Booking }) {
  return (
    <View className="mb-5 rounded-2xl bg-slate-100 dark:bg-slate-800/50 p-4 shadow-sm border border-slate-200 dark:border-slate-700 flex-row gap-4">
      {/* Image */}
      <Image
        source={{ uri: booking.image }}
        className="w-24 h-24 rounded-xl"
        resizeMode="cover"
      />

      {/* Details */}
      <View className="flex-1 justify-center">
        <Text className="text-base font-bold text-text-primary dark:text-white">
          {booking.venue}
        </Text>

        <Text className="text-sm text-text-secondary mt-1">
          {booking.datetime}
        </Text>

        <Text className="text-sm font-medium text-text-secondary mt-1">
          {booking.sport}
        </Text>
      </View>
    </View>
  );
}

/* ================= EMPTY STATE ================= */

function EmptyBookings() {
  return (
    <View className="items-center justify-center mt-20 px-6">
      <View className="h-16 w-16 rounded-full bg-slate-200 dark:bg-slate-800 items-center justify-center">
        <Ionicons name="calendar-outline" size={32} color="#6c757d" />
      </View>

      <Text className="mt-4 text-lg font-bold text-text-primary dark:text-white">
        No Bookings Yet
      </Text>
      <Text className="mt-1 text-sm text-text-secondary text-center">
        Your upcoming and past bookings will appear here.
      </Text>

      <TouchableOpacity className="mt-6 h-12 px-6 rounded-lg bg-primary items-center justify-center">
        <Text className="text-white font-bold text-base">Book a Court</Text>
      </TouchableOpacity>
    </View>
  );
}
