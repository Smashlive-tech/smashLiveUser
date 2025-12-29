import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

/* ================= DATA ================= */

const FEATURED_VENUES = [
  {
    id: "1",
    name: "Grand Sports Arena",
    subtitle: "Tennis • 4.8 ⭐",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
  },
  {
    id: "2",
    name: "City Hoops Center",
    subtitle: "Basketball • 4.9 ⭐",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
  },
  {
    id: "3",
    name: "Peak Performance Gym",
    subtitle: "Fitness • 4.7 ⭐",
    image: "https://images.unsplash.com/photo-1600054800747-5cbf4a7a8c4b",
  },
];

const TOP_PICKS_COURTS = [
  {
    id: "1",
    name: "Elite Badminton Club",
    subtitle: "Badminton • 4.7 ⭐",
    image: "https://images.unsplash.com/photo-1600054800747-5cbf4a7a8c4b",
  },
  {
    id: "2",
    name: "Ace Tennis Courts",
    subtitle: "Tennis • 4.6 ⭐",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
  },
];

const QUICK_BOOK = [
  { id: "court", title: "Book a Court", icon: "tennisball-outline" },
  { id: "nearby", title: "Nearby Courts", icon: "location-outline" },
];

/* ================= SCREEN ================= */

export default function BookScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* ================= HEADER ================= */}
        <View className="flex-row items-center justify-between px-4 py-4">
          <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
            Book
          </Text>

          <TouchableOpacity onPress={() => router.push("/book/bookings")}>
            <Ionicons name="calendar-outline" size={24} color={iconColor} />
          </TouchableOpacity>
        </View>

        {/* ================= SEARCH ================= */}
        <View className="px-4">
          <View className="flex-row items-center h-12 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border px-4">
            <Ionicons name="search" size={20} color={iconColor} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search courts or venues"
              placeholderTextColor={iconColor}
              returnKeyType="search"
              onSubmitEditing={() =>
                search.trim() &&
                router.push({
                  pathname: "/book/courts/search",
                  params: { query: search.trim() },
                })
              }
              className="flex-1 ml-2 text-base text-light-text dark:text-dark-text"
            />
          </View>
        </View>

        {/* ================= FEATURED ================= */}
        <Section title="Featured Venues" />

        {loading ? (
          <HorizontalSkeleton />
        ) : (
          <HorizontalVenues
            data={FEATURED_VENUES}
            onPress={(id) =>
              router.push({
                pathname: "/book/courts/[courtId]",
                params: { courtId: id },
              })
            }
          />
        )}

        {/* ================= TOP PICKS ================= */}
        <Section title="Top Picks of Courts" />

        <View className="px-4">
          {TOP_PICKS_COURTS.map((court) => (
            <TouchableOpacity
              key={court.id}
              onPress={() =>
                router.push({
                  pathname: "/book/courts/[courtId]",
                  params: { courtId: court.id },
                })
              }
              className="flex-row mb-4 rounded-xl bg-light-card dark:bg-dark-card p-3 border border-light-border dark:border-dark-border"
            >
              <Image
                source={{ uri: court.image }}
                className="w-20 h-20 rounded-lg"
              />
              <View className="flex-1 ml-3 justify-center">
                <Text className="text-base font-semibold text-light-text dark:text-dark-text">
                  {court.name}
                </Text>
                <Text className="text-sm text-light-muted dark:text-dark-muted mt-1">
                  {court.subtitle}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ================= QUICK BOOK ================= */}
        <Section title="Book Now" />

        <View className="flex-row px-4">
          {QUICK_BOOK.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="w-1/2 pr-2"
              onPress={() =>
                item.id === "court" && router.push("/book/courts/search")
              }
            >
              <View className="aspect-square rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border items-center justify-center">
                <Ionicons name={item.icon as any} size={36} color={iconColor} />
                <Text className="mt-2 text-base font-medium text-light-text dark:text-dark-text">
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

/* ================= HELPERS ================= */

function Section({ title }: { title: string }) {
  return (
    <View className="px-4 pt-6 pb-3">
      <Text className="text-[22px] font-bold text-light-text dark:text-dark-text">
        {title}
      </Text>
    </View>
  );
}

function HorizontalVenues({
  data,
  onPress,
}: {
  data: any[];
  onPress: (id: string) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="pl-4"
    >
      {data.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => onPress(item.id)}
          className="mr-4 w-60"
        >
          <Image
            source={{ uri: item.image }}
            className="w-full h-36 rounded-xl"
          />
          <Text className="mt-2 text-base font-semibold text-light-text dark:text-dark-text">
            {item.name}
          </Text>
          <Text className="text-sm text-light-muted dark:text-dark-muted">
            {item.subtitle}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function HorizontalSkeleton() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="pl-4"
    >
      {[1, 2, 3].map((i) => (
        <View
          key={i}
          className="mr-4 w-60 h-36 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border"
        />
      ))}
    </ScrollView>
  );
}
