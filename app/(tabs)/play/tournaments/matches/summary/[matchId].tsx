import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * MATCH SUMMARY SCREEN
 * - Used for completed matches
 * - matchId comes from route params
 * - Data fetched once from API
 */

export default function MatchSummaryScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9ca3af" : "#6c757d";

  /**
   * 🔹 API TODO
   * 1. Get matchId from route params
   * 2. Fetch match summary (GET /matches/:matchId)
   * 3. Get final score, winner, stats
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
        {/* ================= MATCH STATUS ================= */}
        <View className="self-center mt-2 mb-5 px-3 py-1 rounded-full bg-primary/10">
          <Text className="text-primary text-sm font-semibold">
            Match Completed
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
              winner
            />

            <Text className="text-4xl font-bold text-text-primary dark:text-white">
              3 : 1
            </Text>

            <TeamBlock
              name="Team Bravo"
              image="https://images.unsplash.com/photo-1517649763962-0c623066013b"
            />
          </View>
        </View>

        {/* ================= MATCH DETAILS (IMPROVED) ================= */}
        <View className="mt-5 rounded-xl bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700">
          <InfoRow
            icon="trophy-outline"
            label="Winner"
            value="Team Alpha"
            highlight
          />
          <Divider />
          <InfoRow
            icon="time-outline"
            label="Match Duration"
            value="1 hr 12 mins"
          />
          <Divider />
          <InfoRow icon="layers-outline" label="Final Set" value="4" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= TEAM BLOCK ================= */

function TeamBlock({
  name,
  image,
  winner,
}: {
  name: string;
  image: string;
  winner?: boolean;
}) {
  return (
    <View className="items-center w-24">
      <Image
        source={{ uri: image }}
        className={`w-16 h-16 rounded-full mb-2 ${
          winner ? "border-2 border-primary" : ""
        }`}
      />
      <Text
        numberOfLines={1}
        className={`text-sm font-semibold ${
          winner ? "text-primary" : "text-text-primary dark:text-white"
        }`}
      >
        {name}
      </Text>

      {winner && (
        <Text className="text-xs text-primary font-medium mt-0.5">Winner</Text>
      )}
    </View>
  );
}

/* ================= INFO ROW ================= */

function InfoRow({
  icon,
  label,
  value,
  highlight,
}: {
  icon: any;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  const isDark = useColorScheme() === "dark";

  return (
    <View className="flex-row items-center justify-between py-2">
      <View className="flex-row items-center gap-2">
        <Ionicons
          name={icon}
          size={18}
          color={highlight ? "#0d59f2" : isDark ? "#9ca3af" : "#6c757d"}
        />
        <Text className="text-sm text-text-secondary">{label}</Text>
      </View>

      <Text
        className={`text-sm font-semibold ${
          highlight ? "text-primary" : "text-text-primary dark:text-white"
        }`}
      >
        {value}
      </Text>
    </View>
  );
}

/* ================= DIVIDER ================= */

function Divider() {
  return <View className="h-px bg-slate-200 dark:bg-slate-700 my-1" />;
}
