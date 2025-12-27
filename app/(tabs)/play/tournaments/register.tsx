import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterTypeScreen() {
  const router = useRouter();
  const { tournamentId } = useLocalSearchParams();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9ca3af" : "#6c757d";

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center gap-3 px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-text-primary dark:text-white">
          Play
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* ================= TITLE ================= */}
        <View className="px-4 pt-2 pb-6">
          <Text className="text-[22px] font-bold text-text-primary dark:text-white">
            Choose Registration Type
          </Text>
          <Text className="mt-1 text-sm text-text-secondary leading-5">
            Select how you want to participate in this tournament
          </Text>
        </View>

        {/* ================= OPTIONS ================= */}
        <View className="px-4">
          {/* INDIVIDUAL */}
          <RegisterCard
            icon="person-outline"
            title="Play as Individual"
            subtitle="Register solo. Ideal for singles or solo events."
            onPress={() =>
              router.push({
                pathname: "/play/tournaments/payment",
                params: { tournamentId },
              })
            }
          />

          {/* CREATE TEAM */}
          <RegisterCard
            icon="people-outline"
            title="Create a Team"
            subtitle="Create a team and add players before the tournament starts."
            onPress={() =>
              router.push({
                pathname: "/play/tournaments/createTeam",
                params: { tournamentId },
              })
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= CARD COMPONENT ================= */

function RegisterCard({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: any;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  const isDark = useColorScheme() === "dark";

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className="rounded-xl border p-4 mb-4 flex-row gap-4 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
    >
      {/* ICON */}
      <View className="h-12 w-12 rounded-lg items-center justify-center bg-slate-200 dark:bg-slate-700">
        <Ionicons
          name={icon}
          size={24}
          color={isDark ? "#9ca3af" : "#6c757d"}
        />
      </View>

      {/* TEXT */}
      <View className="flex-1 justify-center">
        <Text className="text-base font-bold text-text-primary dark:text-white">
          {title}
        </Text>
        <Text className="text-sm text-text-secondary mt-1">{subtitle}</Text>
      </View>

      {/* ARROW */}
      <Ionicons
        name="chevron-forward"
        size={20}
        color="#9ca3af"
        style={{ alignSelf: "center" }}
      />
    </TouchableOpacity>
  );
}
