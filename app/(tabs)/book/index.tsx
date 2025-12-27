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
import { SafeAreaView } from "react-native-safe-area-context";

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
  const iconColor = isDark ? "#9ca3af" : "#6c757d";

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ================= HEADER ================= */}
        <View className="flex-row items-center justify-between px-4 py-4">
          <Text className="text-2xl font-bold text-text-primary dark:text-white">
            Book
          </Text>

          <TouchableOpacity
            onPress={() => router.push("/book/bookings")}
            className="flex-row items-center h-10 px-3 rounded-full"
          >
            <Ionicons name="calendar-outline" size={22} color={iconColor} />
          </TouchableOpacity>
        </View>

        {/* ================= SEARCH ================= */}
        <View className="px-4">
          <View className="flex-row items-center h-12 rounded-lg bg-slate-200 dark:bg-slate-800 px-4">
            <Ionicons name="search" size={20} color={iconColor} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search courts or venues"
              placeholderTextColor={iconColor}
              returnKeyType="search"
              onSubmitEditing={() => {
                if (search.trim()) {
                  router.push({
                    pathname: "/book/courts/search",
                    params: { query: search },
                  });
                }
              }}
              className="flex-1 ml-2 text-base text-text-primary dark:text-white"
            />
          </View>
        </View>

        {/* ================= LOADING STATE ================= */}
        {isLoading && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="pl-4 pt-6"
          >
            {[1, 2, 3].map((i) => (
              <View key={i} className="mr-4 w-60">
                <View className="h-36 w-full rounded-xl bg-slate-200 dark:bg-slate-700" />
              </View>
            ))}
          </ScrollView>
        )}

        {/* ================= CONTENT ================= */}
        {!isLoading && (
          <>
            {/* FEATURED VENUES */}
            <View className="px-4 pt-6 pb-3">
              <Text className="text-[22px] font-bold text-text-primary dark:text-white">
                Featured Venues
              </Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="pl-4"
            >
              {FEATURED_VENUES.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() =>
                    router.push({
                      pathname: "/book/courts/[courtId]",
                      params: { courtId: item.id },
                    })
                  }
                  className="mr-4 w-60"
                >
                  <Image
                    source={{ uri: item.image }}
                    className="w-full h-36 rounded-xl"
                  />
                  <Text className="mt-2 text-base font-medium text-text-primary dark:text-white">
                    {item.name}
                  </Text>
                  <Text className="text-sm text-text-secondary">
                    {item.subtitle}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* TOP PICKS */}
            <View className="px-4 pt-6 pb-3">
              <Text className="text-[22px] font-bold text-text-primary dark:text-white">
                Top Picks of Courts
              </Text>
            </View>

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
                  className="flex-row mb-4 rounded-xl bg-white dark:bg-slate-800 p-3 border border-slate-200 dark:border-slate-700"
                >
                  <Image
                    source={{ uri: court.image }}
                    className="w-20 h-20 rounded-lg"
                  />
                  <View className="flex-1 ml-3 justify-center">
                    <Text className="text-base font-semibold text-text-primary dark:text-white">
                      {court.name}
                    </Text>
                    <Text className="text-sm text-text-secondary mt-1">
                      {court.subtitle}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* ================= BOOK NOW ================= */}
        <View className="px-4 pt-6 pb-3">
          <Text className="text-[22px] font-bold text-text-primary dark:text-white">
            Book Now
          </Text>
        </View>

        <View className="flex-row px-4 pb-10">
          {QUICK_BOOK.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="w-1/2 pr-2"
              onPress={() => {
                if (item.id === "court") {
                  router.push("/book/courts/search");
                }
              }}
            >
              <View className="aspect-square rounded-xl bg-white bg-slate-100 dark:bg-slate-800/50 items-center justify-center">
                <Ionicons name={item.icon as any} size={36} color={iconColor} />
                <Text className="mt-2 text-base font-medium text-text-primary dark:text-white">
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
