import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
  useColorScheme,
} from "react-native";

/* ================= TYPES ================= */

type ApiSet = {
  id: number;
  set: number;
  winner: any | null;
  player1Score: number;
  player2Score: number;
  isCompleted: boolean;
  inProgress: boolean;
  match: any;
};

export default function LiveMatchScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  const { matchId } = useLocalSearchParams<{ matchId: string }>();

  /* ================= STATE ================= */

  const [sets, setSets] = useState<ApiSet[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshDisabled, setRefreshDisabled] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ================= API ================= */

  const fetchLiveMatch = async () => {
    if (refreshDisabled) return;

    try {
      setLoading(true);
      setRefreshing(true);
      setRefreshDisabled(true);

      const res = await axios.get(
        "https://smashlive-omega.vercel.app/api/sets",
        {
          params: {
            "where[match.id][equals]": Number(matchId),
            depth: 2,
          },
        }
      );

      const sorted = res.data.docs.sort(
        (a: ApiSet, b: ApiSet) => a.set - b.set
      );

      setSets(sorted);
    } catch (e) {
      console.error("Fetch failed", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setTimeout(() => setRefreshDisabled(false), 5000);
    }
  };

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    fetchLiveMatch();
  }, [matchId]);

  /* ================= DERIVED ================= */

  const match = sets[0]?.match;

  const teamAName = match?.player1?.fullname ?? "";
  const teamBName = match?.player2?.fullname ?? "";

  const teamASetsWon = sets.filter(
    (s) => s.isCompleted && s.winner?.id === match?.player1?.id
  ).length;

  const teamBSetsWon = sets.filter(
    (s) => s.isCompleted && s.winner?.id === match?.player2?.id
  ).length;

  const currentSet = sets.find((s) => s.inProgress)?.set ?? "-";

  if (!match && !loading) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center">
          <Text className="text-light-muted dark:text-dark-muted">
            Loading live match...
          </Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center justify-between px-4 py-4">
        <View className="flex-row items-center gap-3">
          <Ionicons
            name="arrow-back"
            size={24}
            color={iconColor}
            onPress={() => router.back()}
          />
          <View>
            <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
              Live Match
            </Text>
            <Text className="text-xs text-light-muted dark:text-dark-muted">
              Match ID: {matchId}
            </Text>
          </View>
        </View>

        <Ionicons
          name="refresh-outline"
          size={22}
          color={refreshDisabled ? "#9CA3AF" : iconColor}
          onPress={fetchLiveMatch}
        />
      </View>

      <ScrollView
        className="px-4"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchLiveMatch}
            tintColor={isDark ? "#fff" : "#000"}
          />
        }
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* ================= LIVE BADGE ================= */}
        {!loading && match?.inProgress && (
          <View className="self-center mt-2 mb-5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30">
            <Text className="text-red-600 dark:text-red-400 text-sm font-semibold">
              Live Now
            </Text>
          </View>
        )}

        {/* ================= SCORE CARD ================= */}
        <View className="rounded-2xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border">
          <Text className="text-sm text-light-muted dark:text-dark-muted mb-4 text-center">
            {match?.event?.title ?? "Live Match"}
          </Text>

          <View className="flex-row items-center justify-between">
            <TeamBlock name={teamAName} />

            <Text className="text-4xl font-bold text-light-text dark:text-dark-text">
              {teamASetsWon} : {teamBSetsWon}
            </Text>

            <TeamBlock name={teamBName} />
          </View>
        </View>

        {/* ================= SET SCORES ================= */}
        <View className="mt-5 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border overflow-hidden">
          <Text className="px-4 pt-4 text-sm font-semibold text-light-text dark:text-dark-text">
            Set Scores
          </Text>

          {loading ? (
            <View className="items-center justify-center py-12">
              <ActivityIndicator size="large" color="#8AFF1A" />
              <Text className="mt-3 text-sm text-light-muted dark:text-dark-muted">
                Loading match scores…
              </Text>
            </View>
          ) : (
            sets.map((set) => {
              const isLive = set.inProgress;

              return (
                <View
                  key={set.id}
                  className={`flex-row items-center px-4 py-3 ${
                    isLive ? "bg-primary/10 border-primary" : ""
                  }`}
                >
                  {/* LEFT */}
                  <View className="w-16">
                    <Text className="text-sm text-light-muted dark:text-dark-muted">
                      Set {set.set}
                    </Text>
                  </View>

                  {/* CENTER */}
                  <View className="flex-1 flex-row items-center justify-center gap-6">
                    <Text className="text-sm font-bold text-light-text dark:text-dark-text">
                      {set.player1Score}
                    </Text>
                    <Text className="text-xs text-light-muted dark:text-dark-muted">
                      -
                    </Text>
                    <Text className="text-sm font-bold text-light-text dark:text-dark-text">
                      {set.player2Score}
                    </Text>
                  </View>

                  {/* RIGHT */}
                  <View className="w-20 items-end">
                    {isLive ? (
                      <Text className="text-xs font-bold text-primary">
                        LIVE
                      </Text>
                    ) : set.isCompleted && set.winner ? (
                      <Text
                        numberOfLines={1}
                        className="text-xs font-medium text-light-muted dark:text-dark-muted"
                      >
                        {set.winner.id === match.player1.id
                          ? match.player1.fullname
                          : match.player2.fullname}
                      </Text>
                    ) : (
                      <Text className="text-xs text-light-muted dark:text-dark-muted">
                        -
                      </Text>
                    )}
                  </View>
                </View>
              );
            })
          )}
        </View>

        {/* ================= MATCH INFO ================= */}
        <View className="mt-5 rounded-xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border">
          <InfoRow
            icon="layers-outline"
            label="Current Set"
            value={String(currentSet)}
          />
          <Divider />
          <InfoRow icon="tennisball-outline" label="Server" value={teamAName} />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

/* ================= SKELETON ================= */

function SetScoresSkeleton() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <View key={i} className="flex-row items-center px-4 py-3">
          {/* Left: Set label placeholder */}
          <View className="w-16 h-4 bg-light-border dark:bg-dark-border rounded" />

          {/* Center: Scores placeholder */}
          <View className="flex-1 flex-row items-center justify-center gap-6">
            <View className="w-6 h-4 bg-light-border dark:bg-dark-border rounded" />
            <View className="w-3 h-4 bg-light-border dark:bg-dark-border rounded" />
            <View className="w-6 h-4 bg-light-border dark:bg-dark-border rounded" />
          </View>

          {/* Right: Status / Winner placeholder */}
          <View className="w-20 h-4 bg-light-border dark:bg-dark-border rounded" />
        </View>
      ))}
    </>
  );
}

/* ================= TEAM BLOCK ================= */

function TeamBlock({ name }: { name: string }) {
  const isDark = useColorScheme() === "dark";
  const letter = name.charAt(0).toUpperCase();

  return (
    <View className="items-center w-24">
      <View className="h-12 w-12 rounded-full items-center justify-center border-2 mb-2 border-gray-300 dark:border-gray-600">
        <Text
          className={`text-lg font-bold ${
            isDark ? "text-dark-text" : "text-light-text"
          }`}
        >
          {letter}
        </Text>
      </View>

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
