import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

/* ================= MOCK DATA ================= */

const COURT_DATA = {
  id: "1",
  name: "Grand Slam Arena",
  rating: "4.8 (215 reviews)",
  address: "123 Victory Lane, Sportsville",
  description:
    "Grand Slam Arena is a premium sports destination with professional-grade courts and modern facilities for casual and competitive play.",
  images: [
    "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
    "https://images.unsplash.com/photo-1600054800747-5cbf4a7a8c4b",
  ],
  courts: [
    {
      id: "hard",
      name: "Hard Court",
      available: 4,
      icon: "tennisball-outline",
    },
    { id: "clay", name: "Clay Court", available: 2, icon: "leaf-outline" },
  ],
};

/* ================= SCREEN ================= */

export default function CourtDetailScreen() {
  const { courtId } = useLocalSearchParams<{ courtId: string }>();
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  const [selectedCourt, setSelectedCourt] = useState("hard");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#8AFF1A" />
          <Text className="mt-4 text-base text-light-muted dark:text-dark-muted">
            Loading court details…
          </Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>

        <Text className="ml-3 text-2xl font-bold text-light-text dark:text-dark-text">
          Book
        </Text>
      </View>

      {/* ================= CONTENT ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* IMAGE CAROUSEL */}
        <View className="py-3">
          <Carousel
            width={width}
            height={220}
            data={COURT_DATA.images}
            loop
            autoPlay
            scrollAnimationDuration={1200}
            renderItem={({ item }) => (
              <View className="px-4">
                <View className="rounded-xl overflow-hidden">
                  <Image
                    source={{ uri: item }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
              </View>
            )}
          />
        </View>

        {/* TITLE */}
        <View className="px-4 pt-6">
          <Text className="text-3xl font-bold text-light-text dark:text-dark-text">
            {COURT_DATA.name}
          </Text>

          <View className="flex-row items-center mt-2">
            <Ionicons name="star" size={16} color="#FACC15" />
            <Text className="ml-2 text-sm text-light-muted dark:text-dark-muted">
              {COURT_DATA.rating}
            </Text>
          </View>
        </View>

        {/* LOCATION */}
        <View className="flex-row items-center px-4 py-4 gap-3">
          <View className="h-10 w-10 items-center justify-center rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border">
            <Ionicons name="location-outline" size={20} color={iconColor} />
          </View>

          <Text className="flex-1 text-base text-light-text dark:text-dark-text">
            {COURT_DATA.address}
          </Text>

          <TouchableOpacity>
            <Text className="text-primary font-medium">Directions</Text>
          </TouchableOpacity>
        </View>

        {/* ABOUT */}
        <View className="px-4 py-4">
          <Text className="text-xl font-bold text-light-text dark:text-dark-text mb-2">
            About this venue
          </Text>

          <Text className="text-base text-light-muted dark:text-dark-muted leading-relaxed">
            {COURT_DATA.description}
          </Text>
        </View>

        {/* COURT TYPE */}
        <View className="px-4 py-4">
          <Text className="text-xl font-bold text-light-text dark:text-dark-text mb-4">
            Select Court Type
          </Text>

          <View className="flex-row gap-4">
            {COURT_DATA.courts.map((court) => {
              const active = selectedCourt === court.id;

              return (
                <TouchableOpacity
                  key={court.id}
                  onPress={() => setSelectedCourt(court.id)}
                  className={`flex-1 p-4 rounded-xl border ${
                    active
                      ? "border-primary bg-primary/10"
                      : "border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card"
                  }`}
                >
                  <Ionicons
                    name={court.icon as any}
                    size={28}
                    color={active ? "#8AFF1A" : iconColor}
                  />

                  <Text
                    className={`mt-2 font-semibold ${
                      active
                        ? "text-primary"
                        : "text-light-text dark:text-dark-text"
                    }`}
                  >
                    {court.name}
                  </Text>

                  <Text className="text-sm text-light-muted dark:text-dark-muted">
                    {court.available} available
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* ================= FOOTER ================= */}
      <View className="absolute bottom-0 left-0 right-0 px-4 py-4 bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border">
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/book/courts/bookSlot",
              params: { courtId, courtType: selectedCourt },
            })
          }
          className="h-14 rounded-xl bg-primary items-center justify-center"
        >
          <Text className="text-black text-lg font-medium">Book a Court</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}
