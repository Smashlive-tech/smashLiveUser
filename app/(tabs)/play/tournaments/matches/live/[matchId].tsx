import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * LIVE MATCH SCREEN
 * - Used for ongoing matches
 * - Data should be fetched using WebSockets / polling
 * - matchId comes from route params
 */

export default function LiveMatchScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9ca3af" : "#6c757d";

  /**
   * 🔹 API TODO
   * 1. Get matchId from route params
   * 2. Connect to WebSocket (Socket.IO / WS)
   * 3. Subscribe to: `match:${matchId}`
   * 4. Receive live score, set info, server, timer
   * 5. Update state in real-time
   */

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center gap-3 px-4 py-4">
        <Ionicons
          name="arrow-back"
          size={24}
          color={iconColor}
          onPress={() => router.back()}
        />

        <Text className="text-2xl font-bold text-text-primary dark:text-white">
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
        <View className="rounded-2xl bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700">
          <Text className="text-sm text-text-secondary mb-4 text-center">
            City Tennis Championship • Semi Final
          </Text>

          <View className="flex-row items-center justify-between">
            <TeamBlock
              name="Team Alpha"
              image="https://images.unsplash.com/photo-1517649763962-0c623066013b"
            />

            <Text className="text-4xl font-bold text-text-primary dark:text-white">
              2 : 1
            </Text>

            <TeamBlock
              name="Team Bravo"
              image="https://images.unsplash.com/photo-1517649763962-0c623066013b"
            />
          </View>
        </View>

        {/* ================= LIVE MATCH INFO (IMPROVED) ================= */}
        <View className="mt-5 rounded-xl bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700">
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
    </SafeAreaView>
  );
}

/* ================= TEAM BLOCK ================= */

function TeamBlock({ name, image }: { name: string; image: string }) {
  return (
    <View className="items-center w-24">
      <Image source={{ uri: image }} className="w-16 h-16 rounded-full mb-2" />
      <Text
        numberOfLines={1}
        className="text-sm font-semibold text-text-primary dark:text-white"
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
          color={isDark ? "#9ca3af" : "#6c757d"}
        />
        <Text className="text-sm text-text-secondary">{label}</Text>
      </View>

      <Text className="text-sm font-semibold text-text-primary dark:text-white">
        {value}
      </Text>
    </View>
  );
}

/* ================= DIVIDER ================= */

function Divider() {
  return <View className="h-px bg-slate-200 dark:bg-slate-700 my-1" />;
}
