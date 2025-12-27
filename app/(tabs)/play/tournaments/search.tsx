import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
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

const CATEGORIES = ["Tennis", "Badminton", "Running", "Basketball"];
type SortType = "NONE" | "UPCOMING_FIRST" | "LATEST_FIRST";

const TOURNAMENTS = [
  {
    id: "1",
    sport: "Tennis",
    title: "Summer Slam Tennis Open",
    date: "August 15 2024",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCiPxfRzuWoS4Zp3lWJQN3yhYV4lcp30q4UQ3hXoYeDX_OSt6iDEc1bjIkJSccS5FgZnSvWXxnXsdUx-TwOfLNi7HNBJPIin_BA1N8nI7xt7PTa2tSMr6XbvyncsZhOlUB1n0uAXP7PP00AjbpjDEiKhQ2FJubCna_NjggosCxdswGP7Axok2OCZA4P-eW5eTmvH4uM1vP3A6Edj0jkwFL0_HMfHT92DXGYht1C65P2ydr5hp_foXrwonbYjTQuPvYt_8Ng3a92Eg",
  },
  {
    id: "2",
    sport: "Running",
    title: "City Marathon Challenge",
    date: "September 5 2024",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNxy8EJkm54LAylEpi0YeCN7v09W6gy7WSQUtahB42mtqihu5hXTpn7L8p2cy_fnjTLUwVF6OW7IQIIndXT_8FiG8LXTBtspGRTAgju0qb4tlz5Ih3wRT2OINtzbjjCsJ1_1BnFpUoocHHELA3W_ZhH1hyofKIApKsOMpzW087SSrBLdGhCRLe3SQQXLPfVcYts8KW7yNmfRBk6bcB5hl7rX8ZdNYtAr2yeLzISSIpjk3fxVtjIAuqULtSwuoqOsWvYjhHZ_EYqg",
  },
];

/* ================= SCREEN ================= */

export default function PlayTournamentSearchScreen() {
  const router = useRouter();
  const { query } = useLocalSearchParams<{ query?: string }>();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9ca3af" : "#6c757d";

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(query ?? "");
  const [sortType, setSortType] = useState<SortType>("NONE");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  /* ================= FILTERED DATA ================= */

  const filtered = useMemo(() => {
    let data = [...TOURNAMENTS];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (t) =>
          t.title.toLowerCase().includes(q) || t.sport.toLowerCase().includes(q)
      );
    }

    if (sortType === "UPCOMING_FIRST") {
      data.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }

    if (sortType === "LATEST_FIRST") {
      data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    return data;
  }, [search, sortType]);

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDark ? "#9ca3af" : "#6c757d"}
          />
        </TouchableOpacity>

        <Text className="flex-1 ml-3 text-2xl font-bold text-text-primary dark:text-white">
          Play
        </Text>

        <View className="flex-row gap-4">
          <TouchableOpacity onPress={() => router.push("/notifications")}>
            <MaterialIcons
              name="notifications"
              size={24}
              color={isDark ? "#9ca3af" : "#6c757d"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/play/bookings")}>
            <MaterialIcons
              name="calendar-month"
              size={24}
              color={isDark ? "#9ca3af" : "#6c757d"}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* ================= SEARCH ================= */}
      <View className="px-4 pb-2">
        <View className="flex-row items-center h-12 rounded-lg bg-slate-200 dark:bg-slate-800 px-4">
          <Ionicons name="search" size={20} color={iconColor} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search tournaments"
            placeholderTextColor={iconColor}
            returnKeyType="search"
            onSubmitEditing={() => {
              if (search.trim()) {
                router.replace({
                  pathname: "/play/tournaments/search",
                  params: { query: search.trim() },
                });
              }
            }}
            className="flex-1 ml-2 text-base text-text-primary dark:text-white"
          />
        </View>
      </View>
      {/* ================= LIST ================= */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 pt-2 pb-8">
          {loading &&
            [1, 2].map((i) => (
              <View
                key={i}
                className="mb-4 h-60 rounded-xl bg-slate-200 dark:bg-slate-700"
              />
            ))}

          {!loading &&
            filtered.map((item) => (
              <View
                key={item.id}
                className="mb-4 rounded-xl bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700"
              >
                <Image
                  source={{ uri: item.image }}
                  className="w-full h-44 rounded-lg mb-4"
                />

                <View className="flex-row justify-between">
                  <View className="flex-1 pr-3">
                    <Text className="text-primary text-sm font-medium">
                      {item.sport}
                    </Text>
                    <Text className="font-bold text-text-primary dark:text-white">
                      {item.title}
                    </Text>
                    <Text className="text-sm text-text-secondary">
                      {item.date}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => router.push(`/play/tournaments/${item.id}`)}
                    className="h-10 px-4 rounded-lg bg-primary items-center justify-center"
                  >
                    <Text className="text-white text-sm font-medium">
                      Details
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

          {!loading && filtered.length === 0 && (
            <Text className="text-center text-text-secondary mt-10">
              No tournaments found
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
