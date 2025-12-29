import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, View, useColorScheme } from "react-native";

/**
 * LIVE MATCH SCREEN
 * - Used for ongoing matches
 * - Data should be fetched using WebSockets / polling
 * - matchId comes from route params
 */

export default function LiveMatchScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  /**
   * 🔹 API TODO
   * 1. Get matchId from route params
   * 2. Connect to WebSocket (Socket.IO / WS)
   * 3. Subscribe to: `match:${matchId}`
   * 4. Receive live score, set info, server, timer
   * 5. Update state in real-time
   */

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center gap-3 px-4 py-4">
        <Ionicons
          name="arrow-back"
          size={24}
          color={iconColor}
          onPress={() => router.back()}
        />

        <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
          Play
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
        className="px-4"
      >
        {/* ================= LIVE BADGE ================= */}
        <View className="self-center mt-2 mb-5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30">
          <Text className="text-red-600 dark:text-red-400 text-sm font-semibold">
            Live Now
          </Text>
        </View>

        {/* ================= SCORE CARD ================= */}
        <View className="rounded-2xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border">
          <Text className="text-sm text-light-muted dark:text-dark-muted mb-4 text-center">
            City Tennis Championship • Semi Final
          </Text>

          <View className="flex-row items-center justify-between">
            <TeamBlock
              name="Team Alpha"
              image="https://images.unsplash.com/photo-1517649763962-0c623066013b"
            />

            <Text className="text-4xl font-bold text-light-text dark:text-dark-text">
              2 : 1
            </Text>

            <TeamBlock
              name="Team Bravo"
              image="https://images.unsplash.com/photo-1517649763962-0c623066013b"
            />
          </View>
        </View>

        {/* ================= LIVE MATCH INFO ================= */}
        <View className="mt-5 rounded-xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border">
          <InfoRow icon="layers-outline" label="Current Set" value="3" />
          <Divider />
          <InfoRow
            icon="tennisball-outline"
            label="Server"
            value="Team Alpha"
          />
          <Divider />
          <InfoRow icon="time-outline" label="Match Time" value="48 mins" />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

/* ================= TEAM BLOCK ================= */

function TeamBlock({ name, image }: { name: string; image: string }) {
  return (
    <View className="items-center w-24">
      <Image source={{ uri: image }} className="w-16 h-16 rounded-full mb-2" />
      <Text
        numberOfLines={1}
        className="text-sm font-semibold text-light-text dark:text-dark-text"
      >
        {name}
      </Text>
    </View>
  );
}

/* ================= INFO ROW ================= */

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  const isDark = useColorScheme() === "dark";

  return (
    <View className="flex-row items-center justify-between py-2">
      <View className="flex-row items-center gap-2">
        <Ionicons
          name={icon}
          size={18}
          color={isDark ? "#9CA3AF" : "#6B7280"}
        />
        <Text className="text-sm text-light-muted dark:text-dark-muted">
          {label}
        </Text>
      </View>

      <Text className="text-sm font-semibold text-light-text dark:text-dark-text">
        {value}
      </Text>
    </View>
  );
}

/* ================= DIVIDER ================= */

function Divider() {
  return <View className="h-px bg-light-border dark:bg-dark-border my-1" />;
}
