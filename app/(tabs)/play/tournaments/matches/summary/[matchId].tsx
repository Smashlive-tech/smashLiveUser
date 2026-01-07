import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

/* ================= TYPES ================= */

type ApiSet = {
  id: number;
  set: number;
  player1Score: number;
  player2Score: number;
  winner: { id: number; fullname: string } | null;
  match: {
    player1: { id: number; fullname: string };
    player2: { id: number; fullname: string };
    winner: { id: number; fullname: string } | null;
    event: { title: string };
  };
};

/* ================= SCREEN ================= */

export default function MatchSummaryScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  const { matchId } = useLocalSearchParams<{ matchId: string }>();

  const [sets, setSets] = useState<ApiSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ================= API ================= */

  const fetchSets = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        "https://smashlive-omega.vercel.app/api/sets",
        {
          params: {
            "where[match.id][equals]": Number(matchId),
            depth: 2,
          },
        }
      );

      setSets(res.data.docs ?? []);
    } catch {
      setError("Unable to load match summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSets();
  }, [matchId]);

  /* ================= DERIVED DATA ================= */

  const player1 = sets[0]?.match.player1;
  const player2 = sets[0]?.match.player2;
  const matchWinner = sets[0]?.match.winner;
  const eventTitle = sets[0]?.match.event?.title;

  const player1SetWins = sets.filter(
    (s) => s.winner?.id === player1?.id
  ).length;

  const player2SetWins = sets.filter(
    (s) => s.winner?.id === player2?.id
  ).length;

  /* ================= UI ================= */

  return (
    <ScreenWrapper>
      {/* ===== HEADER ===== */}
      <View className="flex-row items-center gap-3 px-4 py-4">
        <Ionicons
          name="arrow-back"
          size={24}
          color={iconColor}
          onPress={() => router.back()}
        />

        <View>
          <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
            Match Summary
          </Text>
          <Text className="text-sm text-light-muted dark:text-dark-muted">
            Match ID: {matchId}
          </Text>
        </View>
      </View>

      <ScrollView
        className="px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* ===== STATUS ===== */}
        <View className="self-center mt-2 mb-5 px-3 py-1 rounded-full bg-primary/15">
          <Text className="text-base text-primary font-semibold">
            Match Completed
          </Text>
        </View>

        {/* ===== ERROR ===== */}
        {error && (
          <View className="mb-4 rounded-xl bg-red-100 dark:bg-red-900/30 p-4">
            <Text className="text-base font-semibold text-red-600 dark:text-red-400">
              {error}
            </Text>

            <TouchableOpacity
              onPress={fetchSets}
              className="mt-3 self-start px-4 py-2 rounded-lg bg-red-600"
            >
              <Text className="text-base font-semibold text-white">Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ===== SCORE CARD ===== */}
        {loading && (
          <View className="items-center justify-center py-12">
            <ActivityIndicator size="large" color="#8AFF1A" />
            <Text className="mt-3 text-sm text-light-muted dark:text-dark-muted">
              Loading match scores…
            </Text>
          </View>
        )}

        {!loading && player1 && player2 && (
          <View className="rounded-2xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border">
            {eventTitle && (
              <Text className="text-base font-semibold text-light-text dark:text-dark-text text-center mb-3">
                {eventTitle}
              </Text>
            )}

            <View className="flex-row items-center justify-between">
              <PlayerCircle
                name={player1.fullname}
                winner={matchWinner?.id === player1.id}
              />

              <Text className="text-4xl font-bold text-light-text dark:text-dark-text">
                {player1SetWins} : {player2SetWins}
              </Text>

              <PlayerCircle
                name={player2.fullname}
                winner={matchWinner?.id === player2.id}
              />
            </View>
          </View>
        )}

        {/* ===== SET SUMMARY ===== */}
        <View className="mt-5 rounded-xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border">
          <Text className="text-base font-semibold text-light-text dark:text-dark-text mb-3">
            Set Summary
          </Text>

          {loading && (
            <View className="items-center justify-center py-12">
              <ActivityIndicator size="large" color="#8AFF1A" />
              <Text className="mt-3 text-sm text-light-muted dark:text-dark-muted">
                Loading match summary…
              </Text>
            </View>
          )}

          {!loading &&
            sets.map((set) => {
              const p1Won = set.winner?.id === player1?.id;
              const p2Won = set.winner?.id === player2?.id;

              return (
                <View
                  key={set.id}
                  className="flex-row items-center justify-between py-3"
                >
                  <Text className="text-base text-light-muted dark:text-dark-muted w-12">
                    Set {set.set}
                  </Text>

                  <View className="flex-row items-center gap-4">
                    <Text
                      className={`text-base font-bold ${
                        p1Won
                          ? "text-emerald-600 dark:text-primary"
                          : "text-light-text dark:text-dark-text"
                      }`}
                    >
                      {set.player1Score}
                    </Text>

                    <Text className="text-sm text-light-muted dark:text-dark-muted">
                      -
                    </Text>

                    <Text
                      className={`text-base font-bold ${
                        p2Won
                          ? "text-emerald-600 dark:text-primary"
                          : "text-light-text dark:text-dark-text"
                      }`}
                    >
                      {set.player2Score}
                    </Text>
                  </View>

                  <View className="w-24 items-end">
                    <Text
                      numberOfLines={1}
                      className="text-sm font-semibold text-emerald-600 dark:text-primary"
                    >
                      {set.winner?.fullname ?? "—"}
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>

        {/* ===== MATCH DETAILS ===== */}
        <View className="mt-5 rounded-xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border">
          <InfoRow
            icon="trophy-outline"
            label="Winner"
            value={matchWinner?.fullname ?? "TBD"}
            highlight
          />
          <Divider />
          <InfoRow
            icon="layers-outline"
            label="Total Sets"
            value={sets.length.toString()}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

/* ================= PLAYER CIRCLE ================= */

function PlayerCircle({ name, winner }: { name: string; winner?: boolean }) {
  return (
    <View className="items-center">
      <View
        className={`h-12 w-12 rounded-full items-center justify-center border-2 ${
          winner ? "border-primary" : "border-gray-300 dark:border-gray-600"
        }`}
      >
        <Text
          className={`text-lg font-bold ${
            winner
              ? "text-emerald-600 dark:text-primary"
              : "text-light-text dark:text-dark-text"
          }`}
        >
          {name.charAt(0).toUpperCase()}
        </Text>
      </View>

      <Text
        numberOfLines={1}
        className={`mt-2 text-base font-semibold ${
          winner
            ? "text-emerald-600 dark:text-primary"
            : "text-light-text dark:text-dark-text"
        }`}
      >
        {name}
      </Text>

      {winner && (
        <Text className="text-xs font-semibold text-emerald-600 dark:text-primary">
          Winner
        </Text>
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
          color={highlight ? "#8AFF1A" : isDark ? "#9CA3AF" : "#6B7280"}
        />
        <Text className="text-base text-light-muted dark:text-dark-muted">
          {label}
        </Text>
      </View>

      <Text
        className={`text-base font-semibold ${
          highlight ? "text-primary" : "text-light-text dark:text-dark-text"
        }`}
      >
        {value}
      </Text>
    </View>
  );
}

/* ================= DIVIDER ================= */

function Divider() {
  return <View className="h-px bg-light-border dark:bg-dark-border my-1" />;
}
