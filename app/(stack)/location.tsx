import ScreenWrapper from "@/components/ScreenWrapper";
import { useLocation } from "@/context/LocationContext";
import { getUserLocation } from "@/services/getLocation";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

const API_KEY = process.env.EXPO_PUBLIC_LOCATIONIQ_API_KEY;

export default function LocationScreen() {
  const router = useRouter();
  const { setLocation } = useLocation();
  const isDark = useColorScheme() === "dark";

  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  /* ================= SEARCH (DEBOUNCE) ================= */
  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      setLoading(false);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "https://api.locationiq.com/v1/autocomplete",
          {
            params: {
              key: API_KEY,
              q: query,
              format: "json",
              limit: 5,
            },
          }
        );

        setResults(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  /* ================= SELECT ================= */
  const handleSelect = (item: any) => {
    setLocation({
      latitude: Number(item.lat),
      longitude: Number(item.lon),

      displayName: item.display_place || item.display_name,

      displayAddress: item.display_name,
    });

    router.back();
  };
  /* ================= CURRENT LOCATION ================= */
  const handleUseCurrent = async () => {
    const loc = await getUserLocation();
    setLocation(loc);
    router.back();
  };

  return (
    <ScreenWrapper>
      <View className="flex-1">
        {/* ================= HEADER ================= */}
        <View className="flex-row items-center justify-between px-4 py-4">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={iconColor} />
            </TouchableOpacity>

            <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
              Select Location
            </Text>
          </View>

          <View className="w-6" />
        </View>

        {/* ================= SEARCH ================= */}
        <View className="px-4 mt-2">
          <View className="flex-row items-center rounded-2xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card px-4 py-3">
            <Ionicons name="search-outline" size={20} color={iconColor} />

            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search for area, street name..."
              placeholderTextColor={iconColor}
              className="ml-3 flex-1 text-base text-light-text dark:text-dark-text"
            />
          </View>
        </View>

        {/* ================= LOADING ================= */}
        {loading && (
          <Text className="px-4 mt-3 text-sm text-light-muted dark:text-dark-muted">
            Searching...
          </Text>
        )}
        {/* ================= DETECT LOCATION ================= */}
        {query.length === 0 && (
          <View className="px-4 mt-6">
            <TouchableOpacity
              onPress={handleUseCurrent}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center gap-3">
                <View className="h-12 w-12 rounded-full bg-primary/15 items-center justify-center">
                  <Ionicons name="locate-outline" size={22} color="#8AFF1A" />
                </View>

                <View>
                  <Text className="text-sm font-medium text-light-text dark:text-dark-text">
                    Detect Current Location
                  </Text>
                  <Text className="text-xs text-light-muted dark:text-dark-muted">
                    Using GPS
                  </Text>
                </View>
              </View>

              <Ionicons name="chevron-forward" size={18} color={iconColor} />
            </TouchableOpacity>
          </View>
        )}
        {/* ================= RESULTS ================= */}
        <FlatList
          data={results}
          keyExtractor={(_, index) => index.toString()}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              className="px-4 py-3 border-b border-light-border dark:border-dark-border"
            >
              <View className="flex-row items-start gap-3">
                <Ionicons
                  name="location-outline"
                  size={18}
                  color={iconColor}
                  style={{ marginTop: 2 }}
                />

                <Text
                  numberOfLines={2}
                  className="flex-1 text-sm text-light-text dark:text-dark-text"
                >
                  {item.display_name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScreenWrapper>
  );
}
