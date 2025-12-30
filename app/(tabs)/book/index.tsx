import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

/* ================= DATA ================= */

const SPORTS = ["Tennis", "Badminton", "Basketball", "Futsal"] as const;
type SportFilter = (typeof SPORTS)[number];
type SortType = "NONE" | "RATING_HIGH" | "DISTANCE_NEAR";

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
  const [sortType, setSortType] = useState<SortType>("NONE");

  const [sportFilters, setSportFilters] = useState<SportFilter[]>([]);
  const [tempFilters, setTempFilters] = useState<SportFilter[]>([]);

  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const filteredVenues = useMemo(() => {
    let data = [...VENUES];

    if (search) {
      data = data.filter((v) =>
        `${v.name} ${v.location} ${v.sports.join(" ")}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (sportFilters.length) {
      data = data.filter((v) =>
        v.sports.some((s) => sportFilters.includes(s as SportFilter))
      );
    }

    if (sortType === "RATING_HIGH") {
      data.sort((a, b) => b.rating - a.rating);
    }

    if (sortType === "DISTANCE_NEAR") {
      data.sort(
        (a, b) =>
          parseFloat(a.location.split("·")[1]) -
          parseFloat(b.location.split("·")[1])
      );
    }

    return data;
  }, [search, sportFilters, sortType]);

  return (
    <ScreenWrapper>
      {/* HEADER */}
      <View className="flex-row items-center justify-between px-4 py-4">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={iconColor} />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
            Book
          </Text>
        </View>

        <TouchableOpacity onPress={() => router.push("/book/bookings")}>
          <Ionicons name="calendar-outline" size={22} color={iconColor} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* SEARCH */}
        <View className="px-4 py-2">
          <View className="flex-row items-center h-12 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border px-4">
            <Ionicons name="search" size={20} color={iconColor} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search venues, sports, location"
              placeholderTextColor={iconColor}
              className="flex-1 ml-2 text-base text-light-text dark:text-dark-text"
            />
          </View>
        </View>

        {/* CHIPS */}
        <View className="flex-row gap-3 px-4 pb-3">
          <ActionChip
            icon="swap-vert"
            label="Sort By"
            onPress={() => setShowSort(true)}
          />
          <ActionChip
            icon="tune"
            label={`Filters${sportFilters.length ? ` (${sportFilters.length})` : ""}`}
            onPress={() => {
              setTempFilters(sportFilters);
              setShowFilter(true);
            }}
          />
        </View>

        {/* LIST (UNCHANGED) */}
        <View className="px-4 pb-10">
          {filteredVenues.map((venue) => (
            <View
              key={venue.id}
              className="mb-4 rounded-xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border"
            >
              <Image
                source={{ uri: venue.image }}
                className="w-full h-44 rounded-lg mb-4"
              />

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
                  <Text className="text-black text-sm font-bold">Book Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* SORT */}
      <BottomSheet visible={showSort} onClose={() => setShowSort(false)}>
        <SheetOption
          label="Rating: High to Low"
          onPress={() => {
            setSortType("RATING_HIGH");
            setShowSort(false);
          }}
        />
        <SheetOption
          label="Nearest First"
          onPress={() => {
            setSortType("DISTANCE_NEAR");
            setShowSort(false);
          }}
        />
      </BottomSheet>

      {/* FILTER */}
      <BottomSheet visible={showFilter} onClose={() => setShowFilter(false)}>
        <Text className="text-lg font-bold mb-4 text-light-text dark:text-dark-text">
          Sports
        </Text>

        {SPORTS.map((sport) => (
          <Checkbox
            key={sport}
            label={sport}
            checked={tempFilters.includes(sport)}
            onPress={() => toggle(tempFilters, setTempFilters, sport)}
          />
        ))}

        <View className="flex-row justify-between mt-6">
          <TouchableOpacity
            onPress={() => {
              setTempFilters([]);
              setSportFilters([]);
              setShowFilter(false);
            }}
          >
            <Text className="text-light-muted dark:text-dark-muted">Clear</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSportFilters(tempFilters);
              setShowFilter(false);
            }}
          >
            <Text className="text-primary font-medium">Apply</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </ScreenWrapper>
  );
}

/* ================= HELPERS ================= */

function toggle<T>(arr: T[], setArr: (v: T[]) => void, item: T) {
  setArr(arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]);
}

function ActionChip({ label, icon, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center gap-2 h-10 px-4 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border"
    >
      <MaterialIcons name={icon} size={18} color="#6B7280" />
      <Text className="text-sm font-medium text-light-text dark:text-dark-text">
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function Checkbox({ label, checked, onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center py-3">
      <Ionicons
        name={checked ? "checkbox" : "square-outline"}
        size={22}
        color={checked ? "#8AFF1A" : "#6B7280"}
      />
      <Text className="ml-3 text-base text-light-text dark:text-dark-text">
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function BottomSheet({ visible, children, onClose }: any) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableOpacity
        onPress={onClose}
        className="flex-1 bg-black/40 justify-end"
      >
        <View className="bg-light-bg dark:bg-dark-bg rounded-t-2xl p-4">
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

function SheetOption({ label, onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress} className="py-4">
      <Text className="text-base font-medium text-light-text dark:text-dark-text">
        {label}
      </Text>
    </TouchableOpacity>
  );
}
