import ScreenWrapper from "@/components/ScreenWrapper";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
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

/* ================= DATA ================= */

const FEATURED_TOURNAMENTS = [
  {
    id: "1",
    title: "City Tennis Open",
    date: "Aug 12 – Aug 18",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
  },
  {
    id: "2",
    title: "Badminton Pro League",
    date: "Sep 05 – Sep 10",
    image: "https://images.unsplash.com/photo-1600054800747-5cbf4a7a8c4b",
  },
];

const STORE_ITEMS = [
  { id: "1", icon: "tennisball-outline", label: "Tennis" },
  { id: "2", icon: "shirt-outline", label: "Apparel" },
  { id: "3", icon: "barbell-outline", label: "Fitness" },
  { id: "4", icon: "walk-outline", label: "Running" },
];

/* ================= SCREEN ================= */

export default function HomeScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  const iconColor = isDark ? "#9CA3AF" : "#6B7280";
  const { user } = useAuth();
  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* ================= HEADER ================= */}
        <View className="flex-row justify-between items-center px-4 py-4">
          <View>
            <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
              Hi, {user?.fullname} 👋
            </Text>
            <Text className="text-sm text-light-muted dark:text-dark-muted">
              Hyderabad, India
            </Text>
          </View>

          <TouchableOpacity onPress={() => router.push("/profile/[userId]")}>
            <View className="h-9 w-9 rounded-full bg-primary items-center justify-center">
              <Text className="text-black font-bold text-base">
                {user?.fullname?.charAt(0).toUpperCase() || "U"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ================= TOURNAMENT STATUS ================= */}
        <View className="px-4 mt-4">
          <View className="relative rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card pt-6 pb-4 px-4">
            <View className="absolute -top-3 left-4 px-2 bg-light-card dark:bg-dark-card">
              <Text className="text-sm font-bold text-light-text dark:text-dark-text">
                Tournaments
              </Text>
            </View>

            <View className="flex-row justify-between">
              {["Past", "Live", "Upcoming"].map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => router.push("/play/bookings")}
                  className="items-center flex-1"
                >
                  <View className="h-12 w-12 rounded-full bg-primary/15 items-center justify-center mb-2">
                    <Ionicons
                      name={
                        item === "Past"
                          ? "trophy-outline"
                          : item === "Live"
                            ? "pulse-outline"
                            : "calendar-outline"
                      }
                      size={22}
                      color="#8AFF1A"
                    />
                  </View>
                  <Text className="text-sm font-medium text-light-text dark:text-dark-text">
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* ================= PLAY / BOOK / WATCH ================= */}
        <View className="px-4 mt-6">
          <View className="flex-row gap-4">
            <HomeActionCard
              title="Play"
              subtitle="Join matches"
              onPress={() => router.push("/play")}
            />
            <HomeActionCard
              title="Book"
              subtitle="Courts & slots"
              onPress={() => router.push("/book")}
            />
            <HomeActionCard
              title="Watch"
              subtitle="Live games"
              onPress={() => router.push("/play/bookings")}
            />
          </View>
        </View>

        {/* ================= STORE ================= */}
        <View className="px-4 mt-8">
          <View className="rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-4">
            <Text className="text-base font-bold text-light-text dark:text-dark-text mb-4">
              Store
            </Text>

            <View className="flex-row justify-between">
              {STORE_ITEMS.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => router.push("/buy")}
                  className="items-center w-[22%]"
                >
                  <View className="h-14 w-14 rounded-full bg-primary/10 items-center justify-center">
                    <Ionicons
                      name={item.icon as any}
                      size={24}
                      color={iconColor}
                    />
                  </View>
                  <Text className="mt-2 text-xs font-medium text-light-text dark:text-dark-text">
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* ================= FEATURED TOURNAMENTS ================= */}
        <View className="mt-10">
          <View className="px-4 mb-3">
            <Text className="text-base font-bold text-light-text dark:text-dark-text">
              Featured Tournaments
            </Text>
          </View>

          <Carousel
            width={width}
            height={width / 2}
            data={FEATURED_TOURNAMENTS}
            autoPlay
            loop
            scrollAnimationDuration={1200}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => router.push("/play")}
                className="px-4"
              >
                <View className="rounded-xl overflow-hidden">
                  <Image
                    source={{ uri: item.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />

                  <View className="absolute inset-0 bg-black/40 justify-end p-5">
                    <Text className="text-white text-2xl font-bold">
                      {item.title}
                    </Text>
                    <Text className="text-white/80 text-sm mt-1">
                      {item.date}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

/* ================= COMPONENT ================= */

function HomeActionCard({
  title,
  subtitle,
  onPress,
}: {
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 rounded-2xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-4 justify-end"
    >
      <View className="absolute bottom-0 right-0 w-16 h-16 bg-primary/15 rounded-tl-2xl" />

      <Text className="text-lg font-bold text-light-text dark:text-dark-text">
        {title}
      </Text>
      <Text className="text-sm text-light-muted dark:text-dark-muted mt-1">
        {subtitle}
      </Text>
    </TouchableOpacity>
  );
}
