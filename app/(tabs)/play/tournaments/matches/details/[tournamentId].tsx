import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* ================= TYPES ================= */

type MatchStatus = "upcoming" | "live" | "past";

type Match = {
  id: string;
  round: string;
  court: string;
  venue: string;
  date: string;
  time: string;
  teamA: {
    name: string;
    image: string;
  };
  teamB: {
    name: string;
    image: string;
  };
  winner?: "A" | "B";
  status: MatchStatus;
};

/* ================= MOCK MATCHES ================= */

const MATCHES: Match[] = [
  {
    id: "M-101",
    round: "Quarter Final",
    court: "Court 2",
    venue: "Downtown Tennis Center, Block A",
    date: "Oct 26",
    time: "2:00 PM – 4:00 PM",
    teamA: {
      name: "Team Alpha",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    },
    teamB: {
      name: "Team Delta",
      image: "https://images.unsplash.com/photo-1600054800747-5cbf4a7a8c4b",
    },
    status: "upcoming",
  },
  {
    id: "M-102",
    round: "Semi Final",
    court: "Court 3",
    venue: "City Sports Complex",
    date: "Oct 28",
    time: "4:00 PM – 6:00 PM",
    teamA: {
      name: "Team Alpha",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    },
    teamB: {
      name: "Team Bravo",
      image: "https://images.unsplash.com/photo-1600054800747-5cbf4a7a8c4b",
    },
    status: "live",
  },
  {
    id: "M-103",
    round: "Final",
    court: "Center Court",
    venue: "National Indoor Stadium",
    date: "Oct 30",
    time: "6:00 PM – 8:00 PM",
    teamA: {
      name: "Team Alpha",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    },
    teamB: {
      name: "Team Bravo",
      image: "https://images.unsplash.com/photo-1600054800747-5cbf4a7a8c4b",
    },
    winner: "A",
    status: "past",
  },
];

/* ================= SCREEN ================= */

export default function MatchDetailsScreen() {
  const router = useRouter();
  const { tid } = useLocalSearchParams<{ tid: string }>();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9ca3af" : "#6c757d";

  /**
   * 🔹 API TODO
   * GET /tournaments/:tid/matches
   */

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

      {/* ================= TITLE ================= */}
      <View className="px-6 pb-2">
        <Text className="text-xl font-bold text-text-primary dark:text-white">
          Match Schedule
        </Text>
        <Text className="text-sm text-text-secondary mt-1">
          City Tennis Championship
        </Text>
      </View>

      {/* ================= MATCH LIST ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-4 pt-4"
      >
        {MATCHES.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= MATCH CARD ================= */

function MatchCard({ match }: { match: Match }) {
  const router = useRouter();

  function handlePress() {
    if (match.status === "live") {
      router.push(`/play/tournaments/matches/live/${match.id}`);
    } else if (match.status === "past") {
      router.push(`/play/tournaments/matches/summary/${match.id}`);
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      className="mb-4 rounded-2xl bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700"
    >
      {/* ROUND + COURT */}
      <View className="flex-row justify-between">
        <Text className="text-sm font-semibold text-text-primary dark:text-white">
          {match.round}
        </Text>
        <Text className="text-sm text-text-secondary">{match.court}</Text>
      </View>

      {/* ADDRESS */}
      <Text className="mt-1 text-sm text-text-secondary">{match.venue}</Text>

      {/* TEAMS */}
      <View className="flex-row items-center justify-between py-4">
        <TeamBlock team={match.teamA} winner={match.winner === "A"} />
        <Text className="text-sm text-text-secondary font-medium">VS</Text>
        <TeamBlock team={match.teamB} winner={match.winner === "B"} />
      </View>

      {/* DATE + STATUS */}
      <View className="flex-row justify-between items-center">
        <Text className="text-sm text-text-secondary">
          {match.date} • {match.time}
        </Text>

        {match.status === "live" && (
          <View className="px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30">
            <Text className="text-xs font-semibold text-red-600 dark:text-red-400">
              LIVE
            </Text>
          </View>
        )}

        {match.status === "upcoming" && (
          <View className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700">
            <Text className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              UPCOMING
            </Text>
          </View>
        )}

        {match.status === "past" && (
          <View className="px-2 py-0.5 rounded-full bg-primary/10">
            <Text className="text-xs font-semibold text-primary">
              COMPLETED
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

/* ================= TEAM BLOCK ================= */

function TeamBlock({
  team,
  winner,
}: {
  team: { name: string; image: string };
  winner?: boolean;
}) {
  return (
    <View className="items-center w-24">
      <Image
        source={{ uri: team.image }}
        className={`w-14 h-14 rounded-full mb-2 ${
          winner ? "border-2 border-primary" : ""
        }`}
      />
      <Text
        numberOfLines={1}
        className={`text-sm font-semibold ${
          winner ? "text-primary" : "text-text-primary dark:text-white"
        }`}
      >
        {team.name}
      </Text>

      {winner && (
        <Text className="text-xs text-primary font-medium mt-0.5">Winner</Text>
      )}
    </View>
  );
}
