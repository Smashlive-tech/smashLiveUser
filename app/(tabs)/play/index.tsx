import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
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

const FEATURED_TOURNAMENTS = [
  {
    id: "1",
    sport: "Tennis",
    title: "Summer Slam Tennis Open",
    date: "August 15, 2024",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCiPxfRzuWoS4Zp3lWJQN3yhYV4lcp30q4UQ3hXoYeDX_OSt6iDEc1bjIkJSccS5FgZnSvWXxnXsdUx-TwOfLNi7HNBJPIin_BA1N8nI7xt7PTa2tSMr6XbvyncsZhOlUB1n0uAXP7PP00AjbpjDEiKhQ2FJubCna_NjggosCxdswGP7Axok2OCZA4P-eW5eTmvH4uM1vP3A6Edj0jkwFL0_HMfHT92DXGYht1C65P2ydr5hp_foXrwonbYjTQuPvYt_8Ng3a92Eg",
  },
  {
    id: "2",
    sport: "Running",
    title: "City Marathon Challenge",
    date: "September 5, 2024",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNxy8EJkm54LAylEpi0YeCN7v09W6gy7WSQUtahB42mtqihu5hXTpn7L8p2cy_fnjTLUwVF6OW7IQIIndXT_8FiG8LXTBtspGRTAgju0qb4tlz5Ih3wRT2OINtzbjjCsJ1_1BnFpUoocHHELA3W_ZhH1hyofKIApKsOMpzW087SSrBLdGhCRLe3SQQXLPfVcYts8KW7yNmfRBk6bcB5hl7rX8ZdNYtAr2yeLzISSIpjk3fxVtjIAuqULtSwuoqOsWvYjhHZ_EYqg",
  },
];

const TOP_PICKS = [
  {
    id: "3",
    sport: "Badminton",
    title: "Elite Badminton Cup",
    date: "October 10, 2024",
    image: "https://images.unsplash.com/photo-1600054800747-5cbf4a7a8c4b",
  },
  {
    id: "4",
    sport: "Basketball",
    title: "City Hoops Championship",
    date: "November 2, 2024",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
  },
];

const QUICK_ACTIONS = [
  { id: "tournaments", title: "All Tournaments", icon: "trophy-outline" },
  { id: "nearby", title: "Nearby Events", icon: "location-outline" },
];

/* ================= SCREEN ================= */

export default function PlayScreen() {
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
            Play
          </Text>

          <View className="flex-row gap-3">
            {["notifications", "calendar-month"].map((icon) => (
              <TouchableOpacity
                key={icon}
                onPress={() =>
                  icon === "notifications"
                    ? router.push("/notifications")
                    : router.push("/play/bookings")
                }
              >
                <MaterialIcons name={icon as any} size={24} color={iconColor} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ================= SEARCH ================= */}
        <View className="px-4">
          <View className="flex-row items-center h-12 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border px-4">
            <Ionicons name="search" size={20} color={iconColor} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search tournaments"
              placeholderTextColor={iconColor}
              returnKeyType="search"
              onSubmitEditing={() =>
                search.trim() &&
                router.push({
                  pathname: "/play/tournaments/search",
                  params: { query: search.trim() },
                })
              }
              className="flex-1 ml-2 text-base text-light-text dark:text-dark-text"
            />
          </View>
        </View>

        {/* ================= FEATURED ================= */}
        <Section title="Featured Tournaments" />

        {loading ? (
          <HorizontalSkeleton />
        ) : (
          <HorizontalList
            data={FEATURED_TOURNAMENTS}
            onPress={(id) => router.push(`/play/tournaments/${id}`)}
          />
        )}

        {/* ================= TOP PICKS ================= */}
        <Section title="Top Tournament Picks" />

        <View className="px-4">
          {TOP_PICKS.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => router.push(`/play/tournaments/${item.id}`)}
              className="flex-row mb-4 rounded-xl bg-light-card dark:bg-dark-card p-3 border border-light-border dark:border-dark-border"
            >
              <Image
                source={{ uri: item.image }}
                className="w-20 h-20 rounded-lg"
              />
              <View className="flex-1 ml-3 justify-center">
                <Text className="text-primary text-sm font-medium">
                  {item.sport}
                </Text>
                <Text className="text-base font-semibold text-light-text dark:text-dark-text">
                  {item.title}
                </Text>
                <Text className="text-sm text-light-muted dark:text-dark-muted mt-1">
                  {item.date}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ================= EXPLORE ================= */}
        <Section title="Explore" />

        <View className="flex-row px-4">
          {QUICK_ACTIONS.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="w-1/2 pr-2"
              onPress={() => router.push("/play/tournaments/search")}
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

function HorizontalList({
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
          <Text className="mt-2 text-sm font-medium text-primary">
            {item.sport}
          </Text>
          <Text className="text-base font-semibold text-light-text dark:text-dark-text">
            {item.title}
          </Text>
          <Text className="text-sm text-light-muted dark:text-dark-muted">
            {item.date}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function HorizontalSkeleton() {
  return (
    <ScrollView horizontal className="pl-4">
      {[1, 2, 3].map((i) => (
        <View
          key={i}
          className="mr-4 w-60 h-40 rounded-xl bg-slate-200 dark:bg-slate-700"
        />
      ))}
    </ScrollView>
  );
}
