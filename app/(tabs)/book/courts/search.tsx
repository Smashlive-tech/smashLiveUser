import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
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

/* ================= DATA ================= */

const VENUES = [
  {
    id: "1",
    name: "City Sports Center",
    location: "Downtown · 2.5 miles",
    rating: 4.5,
    sports: ["Basketball", "Badminton"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBlsS16ZD2LycwhoJM7tQwBBdgjonz80oN97Tsn8HzDWInPaXh07YHHYkVKmrBSCW7qpudFaCOlUzpLnC2qj4kJ6htWKyAngetEc8WwmRZDmW1to2LnB2M06CSNBo9r0QrtT8OAckfLp-ShTzakcbJ2ghTEVTlTwCXKhoamm7RK9Je4GxxoV1TVytsifUzBMjhEeOSkyigTDkQpzP7r5uQuua3IIeLqZ2cmymO_xt8aD-2uYTFuWX5c2QbYsH9tUyFnfxnyPdZ_Wg",
  },
  {
    id: "2",
    name: "Grand Slam Tennis Club",
    location: "North Suburbs · 5 miles",
    rating: 4.8,
    sports: ["Tennis", "Padel"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCpl8wImJZC91IDu4lrkHcjECwxTyKz-n04KhnP36lUIJhWRElhfcvnfzZ53hDJZycf3kmiwjfQpWmpN9CmMefpGYOMwoUKXpVz0oSUvIXz_sDePz1StVrJsEdsLbnPid9HvFRqkI_XsnCWyt2RR1cp8YoQlvwCeZskRVH6uWYzMD_IhBviCjGYCq89D_aceP6L_1ir-zDhUNQZJlyeQx_q2Kec_fLDBCHfKDK7r4TxjuJImeVlgcND8hDCtNy2nG0K0X_x2abZyg",
  },
  {
    id: "3",
    name: "Urban Futsal Arena",
    location: "East District · 3.1 miles",
    rating: 4.2,
    sports: ["Futsal"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBhC8vIK4G2QgGbSxYLaU28JKfwYmQS0yXQYnOX3blmuSJc1VKkLR47rc4SRQnGJw3qMu1XVibWduY_ymunKgQnqTr7255jdf2ue3S_66T5l34C_oyidOJtinLlUJgCM0p7ocybgaYFdMM5f_YQ1OrM7KeHVwmxFGuuZZBWdqbLFdcomayVd6A4a3UXU8w4ntwWE8CqQ8RDzKyGDCW3DIvhnf3ZUvGPV9UavBm5n1m6R5FZEpD21CQTDuZ6eEWkmC4v5KhjMtaeSg",
  },
];

/* ================= SCREEN ================= */

export default function VenueListScreen() {
  const router = useRouter();
  const { query } = useLocalSearchParams<{ query?: string }>();

  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  const [search, setSearch] = useState(query ?? "");

  const filteredVenues = useMemo(() => {
    if (!search) return VENUES;
    return VENUES.filter((v) =>
      `${v.name} ${v.location} ${v.sports.join(" ")}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center justify-between px-4 py-4">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={iconColor} />
          </TouchableOpacity>

          <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
            Venues
          </Text>
        </View>

        <TouchableOpacity onPress={() => router.push("/book/bookings")}>
          <Ionicons name="calendar-outline" size={22} color={iconColor} />
        </TouchableOpacity>
      </View>

      {/* ================= SEARCH ================= */}
      <View className="px-4 py-2">
        <View className="flex-row items-center h-12 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border px-4">
          <Ionicons name="search" size={20} color={iconColor} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search venues, sports, location"
            placeholderTextColor={iconColor}
            returnKeyType="search"
            className="flex-1 ml-2 text-base text-light-text dark:text-dark-text"
          />
        </View>
      </View>

      {/* ================= LIST ================= */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 pt-2 pb-10">
          {filteredVenues.map((venue) => (
            <View
              key={venue.id}
              className="mb-4 rounded-xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border"
            >
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/book/courts/[courtId]",
                    params: { courtId: venue.id },
                  })
                }
              >
                <Image
                  source={{ uri: venue.image }}
                  className="w-full h-44 rounded-lg mb-4"
                />
              </TouchableOpacity>

              <View className="flex-row justify-between items-center">
                <View className="flex-1 pr-3">
                  <Text className="font-bold text-light-text dark:text-dark-text">
                    {venue.name}
                  </Text>

                  <Text className="text-sm text-light-muted dark:text-dark-muted mt-1">
                    {venue.location}
                  </Text>

                  <View className="flex-row items-center mt-1">
                    <Ionicons name="star" size={14} color="#FACC15" />
                    <Text className="ml-1 text-sm text-light-muted dark:text-dark-muted">
                      {venue.rating}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  className="h-10 px-4 rounded-lg bg-primary items-center justify-center"
                  onPress={() =>
                    router.push({
                      pathname: "/book/courts/[courtId]",
                      params: { courtId: venue.id },
                    })
                  }
                >
                  <Text className="text-black text-sm font-medium">
                    Book Now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
