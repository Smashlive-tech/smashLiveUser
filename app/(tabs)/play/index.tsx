import ScreenWrapper from "@/components/ScreenWrapper";
import { getAccessToken } from "@/services/authService";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
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

const CATEGORIES = ["Tennis", "Badminton", "Running", "Basketball"] as const;

type SortType = "NONE" | "UPCOMING_FIRST" | "LATEST_FIRST";
type SportFilter = (typeof CATEGORIES)[number];
type Tournament = {
  id: number;
  title: string;
  sport: string;
  date: string;
  image: string;
};

/* 🔒 HARDCODED VALUES */
const HARDCODED_DATA = {
  sport: "Tennis",
  date: "August 15 2024",
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCiPxfRzuWoS4Zp3lWJQN3yhYV4lcp30q4UQ3hXoYeDX_OSt6iDEc1bjIkJSccS5FgZnSvWXxnXsdUx-TwOfLNi7HNBJPIin_BA1N8nI7xt7PTa2tSMr6XbvyncsZhOlUB1n0uAXP7PP00AjbpjDEiKhQ2FJubCna_NjggosCxdswGP7Axok2OCZA4P-eW5eTmvH4uM1vP3A6Edj0jkwFL0_HMfHT92DXGYht1C65P2ydr5hp_foXrwonbYjTQuPvYt_8Ng3a92Eg",
};

/* ================= SCREEN ================= */

export default function PlayTournamentSearchScreen() {
  const router = useRouter();
  const { query } = useLocalSearchParams<{ query?: string }>();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(query ?? "");
  const [sortType, setSortType] = useState<SortType>("NONE");

  const [sportFilters, setSportFilters] = useState<SportFilter[]>([]);
  const [tempFilters, setTempFilters] = useState<SportFilter[]>([]);

  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setLoading(true);
        const token = await getAccessToken();
        let today = new Date().toISOString().split("T")[0];
        today = "2025-08-14";
        const res = await axios.get(
          "https://smashlive-omega.vercel.app/api/tournaments",
          {
            params: {
              depth: 0,
              //"where[startDate][greater_than_equal]": today,
              //"where[status][equals]": "active",
              sort: "startDate",
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data);
        const data = await res.data.docs;
        const mapped: Tournament[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          ...HARDCODED_DATA,
        }));

        setTournaments(mapped);
      } catch (err) {
        console.log("Failed to fetch tournaments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  /* ================= FILTERED DATA ================= */

  const filtered = useMemo(() => {
    let data = [...tournaments];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (t) =>
          t.title.toLowerCase().includes(q) || t.sport.toLowerCase().includes(q)
      );
    }

    if (sportFilters.length) {
      data = data.filter((t) => sportFilters.includes(t.sport as SportFilter));
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
  }, [search, sortType, sportFilters, tournaments]);

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>

        <Text className="flex-1 ml-3 text-2xl font-bold text-light-text dark:text-dark-text">
          Play
        </Text>

        <View className="flex-row gap-4">
          <TouchableOpacity onPress={() => router.push("/notifications")}>
            <MaterialIcons name="notifications" size={24} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/play/bookings")}>
            <MaterialIcons name="calendar-month" size={24} color={iconColor} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ================= SEARCH ================= */}
        <View className="px-4 pb-2">
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

        {/* ================= CHIPS ================= */}
        <View className="flex-row gap-3 px-4 pb-3">
          <ActionChip
            label="Sort By"
            icon="swap-vert"
            onPress={() => setShowSort(true)}
          />
          <ActionChip
            label={`Filters${sportFilters.length ? ` (${sportFilters.length})` : ""}`}
            icon="tune"
            onPress={() => {
              setTempFilters(sportFilters);
              setShowFilter(true);
            }}
          />
        </View>

        {/* ================= LIST ================= */}

        <View className="px-4 pt-2 pb-8">
          {loading && (
            <View className="flex-1 items-center justify-center py-20">
              <ActivityIndicator size="large" color="#8AFF1A" />
              <Text className="mt-3 text-sm text-light-muted dark:text-dark-muted">
                Loading tournaments…
              </Text>
            </View>
          )}

          {!loading &&
            filtered.map((item) => (
              <View
                key={item.id}
                className="mb-4 rounded-xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border"
              >
                <Image
                  source={{ uri: item.image }}
                  className="w-full h-44 rounded-lg mb-4"
                />

                <View className="flex-row justify-between">
                  <View className="flex-1 pr-3">
                    <Text className="font-bold text-light-text dark:text-dark-text">
                      {item.title}
                    </Text>
                    <Text className="text-sm text-light-muted dark:text-dark-muted">
                      {item.date}
                    </Text>
                    <Text className="text-primary text-sm font-medium">
                      {item.sport}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => router.push(`/play/tournaments/${item.id}`)}
                    className="h-10 px-4 rounded-lg bg-primary items-center justify-center"
                  >
                    <Text className="text-black text-sm font-bold">
                      Details
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

          {!loading && filtered.length === 0 && (
            <Text className="text-center text-light-muted dark:text-dark-muted mt-10">
              No tournaments found
            </Text>
          )}
        </View>
      </ScrollView>

      {/* ================= SORT ================= */}
      <BottomSheet visible={showSort} onClose={() => setShowSort(false)}>
        <SheetOption
          label="Upcoming First"
          onPress={() => {
            setSortType("UPCOMING_FIRST");
            setShowSort(false);
          }}
        />
        <SheetOption
          label="Latest First"
          onPress={() => {
            setSortType("LATEST_FIRST");
            setShowSort(false);
          }}
        />
      </BottomSheet>

      {/* ================= FILTER ================= */}
      <BottomSheet visible={showFilter} onClose={() => setShowFilter(false)}>
        <Text className="text-lg font-bold mb-4 text-light-text dark:text-dark-text">
          Sports
        </Text>

        {CATEGORIES.map((sport) => (
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

/* ================= UI COMPONENTS ================= */

function ActionChip({ label, icon, onPress }: any) {
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center gap-2 h-10 px-4 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border"
    >
      <MaterialIcons name={icon} size={18} color={iconColor} />
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
