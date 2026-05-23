import ScreenWrapper from "@/components/ScreenWrapper";
import { useAuth } from "@/context/AuthContext";
import { getAccessToken } from "@/services/authService";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
/* ================= TYPES ================= */

type EventTab = "overview" | "matches" | "draw" | "players";
type EventDetails = {
  id: number;
  title: string;
  pairingType: string;
  numberOfSets: number;
  startdate: string;
  enddate: string;
  registrationDeadline: string;
  duration: string;
  intervalBetweenMatches: string;
  maxScore: number;
  courts: { CourtIdentifier: string }[];
  tournamentTitle: string;
};
type Player = {
  id: number;
  fullname: string;
  email?: string;
};
type Match = {
  id: number;
  match: number;
  round: number;
  court: string | null;
  matchDate: string;
  inProgress: boolean;
  isCompleted: boolean;
  player1: Player | null;
  player2: Player | null;
  player1SetsWon: number;
  player2SetsWon: number;
  winner: Player | null;
  umpire: Player | null;
  winnerMatch: number;
  winnerRound: number;
};

type EventRegistration = {
  id: number;
  player: Player;
};

/* ================= SCREEN ================= */
export default function EventDetailsScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const { eventId, tab } = useLocalSearchParams<{
    eventId: string;
    tab?: EventTab;
  }>();
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";
  const [activeTab, setActiveTab] = useState<EventTab>(
    tab === "matches" ? "matches" : "overview"
  );

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="px-4 pt-4 pb-3">
        <View className="flex-row items-center gap-3">
          {/* BACK */}
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={iconColor} />
          </TouchableOpacity>

          {/* TITLE */}
          <View>
            <Text className="text-xl font-semibold text-light-text dark:text-dark-text">
              Event Details
            </Text>
            <Text className="text-xs text-light-muted dark:text-dark-muted">
              Event ID - {eventId}
            </Text>
          </View>
        </View>
      </View>

      {/* ================= TABS ================= */}
      <View className="px-4">
        <View className="flex-row border-b border-light-border dark:border-dark-border">
          {(["overview", "matches", "draw", "players"] as EventTab[]).map(
            (tab) => {
              const isActive = activeTab === tab;

              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  className={`flex-1 items-center py-3 border-b-2 ${
                    isActive ? "border-primary" : "border-transparent"
                  }`}
                >
                  <Text
                    className={`text-m font-bold capitalize ${
                      isActive
                        ? "text-primary"
                        : "text-light-muted dark:text-dark-muted"
                    }`}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            }
          )}
        </View>
      </View>

      {/* ================= TAB CONTENT ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      >
        {activeTab === "overview" && <OverviewTab eventId={eventId} />}
        {activeTab === "matches" && <MatchesTab eventId={eventId} />}
        {activeTab === "draw" && <DrawTab eventId={eventId} />}
        {activeTab === "players" && <PlayersTab eventId={eventId} />}
      </ScrollView>
    </ScreenWrapper>
  );
}

/* ================= TAB COMPONENTS ================= */
function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
function OverviewTab({ eventId }: { eventId: string }) {
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `https://smashlive-omega.vercel.app/api/events/${eventId}`,
          { params: { depth: 1 } }
        );

        const d = res.data;
        console.log(d);
        setEvent({
          id: d.id,
          title: d.title,
          pairingType: d["Pairing Type"],
          numberOfSets: d.numberOfSets,
          startdate: d.startdate,
          enddate: d.enddate,
          registrationDeadline: d.registrationDeadline,
          duration: d.duration,
          intervalBetweenMatches: d.intervalBetweenMatches,
          maxScore: d.maxScore,
          courts: d.Courts ?? [],
          tournamentTitle: d.tournament?.title ?? "—",
        });
      } catch (err) {
        console.log("Failed to fetch event", err);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchEvent();
  }, [eventId]);

  if (loading) {
    return (
      <View className="items-center justify-center py-20">
        <ActivityIndicator size="large" color="#22C55E" />
        <Text className="mt-3 text-sm text-light-muted dark:text-dark-muted">
          Loading Overview…
        </Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View className="rounded-xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border">
        <Text className="text-light-muted dark:text-dark-muted">
          Event not found
        </Text>
      </View>
    );
  }

  return (
    <View className="rounded-xl bg-light-card dark:bg-dark-card p-5 border border-light-border dark:border-dark-border gap-4">
      {/* TITLE */}
      <View>
        <Text className="text-xl font-bold text-light-text dark:text-dark-text">
          {event.title}
        </Text>
        <Text className="text-sm text-light-muted dark:text-dark-muted mt-1">
          {event.tournamentTitle}
        </Text>
      </View>

      {/* KEY HIGHLIGHTS */}
      <View className="flex-row flex-wrap gap-2">
        <View className="px-3 py-1 rounded-full bg-primary/10">
          <Text className="text-sm font-semibold text-primary">
            {event.pairingType}
          </Text>
        </View>

        <View className="px-3 py-1 rounded-full bg-primary/10">
          <Text className="text-sm font-semibold text-primary">
            {event.numberOfSets} Sets
          </Text>
        </View>

        <View className="px-3 py-1 rounded-full bg-primary/10">
          <Text className="text-sm font-semibold text-primary">
            Max {event.maxScore}
          </Text>
        </View>
      </View>

      {/* INFO GRID */}
      <View className="gap-2">
        <Row
          label="Schedule"
          value={`${formatDate(event.startdate)} → ${formatDate(
            event.enddate
          )}`}
        />
        <Row
          label="Registration Deadline"
          value={formatDate(event.registrationDeadline)}
        />
        <Row label="Match Duration" value={`${event.duration} mins`} />
        <Row
          label="Interval Between Matches"
          value={`${event.intervalBetweenMatches} mins`}
        />
        <Row
          label="Courts"
          value={
            event.courts.length
              ? event.courts.map((c) => c.CourtIdentifier).join(", ")
              : "Not assigned"
          }
        />
      </View>
    </View>
  );
}

/* SMALL INLINE ROW (ONLY USED HERE) */
function Row({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between">
      <Text className="text-sm text-light-muted dark:text-dark-muted">
        {label}
      </Text>
      <Text className="text-sm font-medium text-light-text dark:text-dark-text">
        {value}
      </Text>
    </View>
  );
}

function MatchesTab({ eventId }: { eventId: string }) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://smashlive-omega.vercel.app/api/matches",
          { params: { "where[event.id][equals]": eventId } }
        );
        setMatches(res.data.docs ?? []);
      } catch (err) {
        console.log("Failed to fetch matches", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, [eventId]);

  if (loading) {
    return (
      <View className="items-center justify-center py-20 gap-3">
        <ActivityIndicator size="large" color="#22C55E" />
        <Text className="text-sm text-light-muted dark:text-dark-muted">
          Loading Matches…
        </Text>
      </View>
    );
  }

  if (!matches.length) {
    return (
      <CenterMessage icon="calendar-outline" text="Matches not generated yet" />
    );
  }

  return (
    <View className="px-3 relative">
      {/* CONTINUOUS LINE */}
      <View className="absolute left-[7px] top-0 bottom-0 w-[1px] bg-light-border dark:bg-dark-border" />

      {matches.map((m) => {
        const isUserMatch =
          m.player1?.id === user?.id || m.player2?.id === user?.id;

        const winnerId = m.winner?.id;
        const isP1Winner =
          m.isCompleted && !!m.player1 && m.player1.id === winnerId;
        const isP2Winner =
          m.isCompleted && !!m.player2 && m.player2.id === winnerId;

        const isBye = !m.player1 && !m.player2;

        const p1Initial = (m.player1?.fullname ?? "B").charAt(0).toUpperCase();
        const p2Initial = (m.player2?.fullname ?? "B").charAt(0).toUpperCase();

        const date = new Date(m.matchDate);

        return (
          <View key={m.id} className="flex-row mb-5">
            {/* DOT */}
            <View className="w-4 items-center">
              <View
                className={`w-3 h-3 rounded-full ${
                  m.inProgress ? "bg-red-500" : "bg-primary"
                }`}
              />
            </View>

            {/* CARD */}
            <View
              className={`flex-1 ml-2 rounded-2xl border ${
                isUserMatch
                  ? "border-primary"
                  : "border-light-border dark:border-dark-border"
              } bg-light-card dark:bg-dark-card`}
            >
              <View className="px-4 py-4">
                {/* HEADER */}
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-[10px] font-bold text-primary">
                    MATCH {m.match}
                  </Text>

                  <Text
                    className={`text-[10px] font-bold ${
                      m.inProgress
                        ? "text-red-500"
                        : m.isCompleted
                          ? "text-primary"
                          : "text-light-muted dark:text-dark-muted"
                    }`}
                  >
                    {m.inProgress
                      ? "LIVE"
                      : m.isCompleted
                        ? "COMPLETED"
                        : "SCHEDULED"}
                  </Text>
                </View>

                {/* DATE */}
                <Text className="text-xs text-light-muted dark:text-dark-muted mb-3">
                  {date.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}{" "}
                  •{" "}
                  {date.toLocaleTimeString("en-IN", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </Text>

                {/* PLAYERS */}
                {isBye ? (
                  <Text className="text-sm text-light-muted dark:text-dark-muted">
                    Awaiting players
                  </Text>
                ) : (
                  <View className="flex-row items-center justify-between">
                    {/* PLAYER 1 */}
                    <View className="flex-1 flex-col items-center gap-2">
                      <View
                        className={`w-9 h-9 rounded-full items-center justify-center border ${
                          isP1Winner
                            ? "bg-primary/15 border-primary"
                            : "bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border"
                        }`}
                      >
                        <Text
                          className={`text-sm font-bold ${
                            isP1Winner
                              ? "text-primary"
                              : "text-light-text dark:text-dark-text"
                          }`}
                        >
                          {p1Initial}
                        </Text>
                      </View>

                      <Text
                        className={`text-sm font-semibold ${
                          isP1Winner
                            ? "text-primary"
                            : "text-light-text dark:text-dark-text"
                        }`}
                        numberOfLines={1}
                      >
                        {m.player1?.fullname ?? "BYE"}
                      </Text>
                    </View>

                    {/* SCORE */}
                    <View className="px-3">
                      {m.isCompleted ? (
                        <Text
                          className={`text-base font-bold ${
                            isP1Winner || isP2Winner
                              ? "text-primary"
                              : "text-light-text dark:text-dark-text"
                          }`}
                        >
                          {m.player1SetsWon} - {m.player2SetsWon}
                        </Text>
                      ) : (
                        <Text className="text-xs font-semibold text-light-muted dark:text-dark-muted">
                          VS
                        </Text>
                      )}
                    </View>

                    {/* PLAYER 2 */}
                    <View className="flex-1 flex-col items-center justify-end gap-2">
                      <View
                        className={`w-9 h-9 rounded-full items-center justify-center border ${
                          isP1Winner
                            ? "bg-primary/15 border-primary"
                            : "bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border"
                        }`}
                      >
                        <Text
                          className={`text-sm font-bold ${
                            isP1Winner
                              ? "text-primary"
                              : "text-light-text dark:text-dark-text"
                          }`}
                        >
                          {p2Initial}
                        </Text>
                      </View>
                      <Text
                        className={`text-sm font-semibold text-right ${
                          isP2Winner
                            ? "text-primary"
                            : "text-light-text dark:text-dark-text"
                        }`}
                        numberOfLines={1}
                      >
                        {m.player2?.fullname ?? "BYE"}
                      </Text>
                    </View>
                  </View>
                )}

                {/* FOOTER */}
                <View className="flex-row justify-between mt-3">
                  <Text className="text-[11px] text-light-muted dark:text-dark-muted">
                    Court {m.court ?? "TBD"}
                  </Text>

                  <Text className="text-[11px] text-light-muted dark:text-dark-muted">
                    {m.umpire?.fullname ?? "Umpire TBD"}
                  </Text>
                </View>

                {/* BUTTON */}
                {(m.inProgress || m.isCompleted) && (
                  <TouchableOpacity
                    onPress={() =>
                      router.push(
                        m.inProgress
                          ? `/play/tournaments/matches/live/${m.id}`
                          : `/play/tournaments/matches/summary/${m.id}`
                      )
                    }
                    className="mt-3 h-10 rounded-xl bg-primary items-center justify-center"
                  >
                    <Text className="text-black font-bold text-sm">
                      {m.inProgress ? "View Live Score" : "View Summary"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

function DrawTab({ eventId }: { eventId: string }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isDark = useColorScheme() === "dark";
  const [rounds, setRounds] = useState<any[]>([]);
  const theme = {
    bg: isDark ? "#0B0B0B" : "#FFFFFF",
    card: isDark ? "#151515" : "#F8FAFC",
    border: isDark ? "#262626" : "#E5E7EB",
    text: isDark ? "#FFFFFF" : "#0F172A",
    muted: isDark ? "#9CA3AF" : "#475569",
    primary: "#22C55E",
  };
  const transformDrawData = (docs: any[]) => {
    const roundMap: Record<number, any[]> = {};
    docs.forEach((match) => {
      const round = match.round;
      if (!roundMap[round]) roundMap[round] = [];
      roundMap[round].push(match);
    });

    const sortedRoundNumbers = Object.keys(roundMap)
      .map(Number)
      .sort((a, b) => a - b);
    const maxRound = Math.max(...sortedRoundNumbers);

    const getRoundTitle = (roundNum: number) => {
      if (roundNum === maxRound) return "Final";
      if (roundNum === maxRound - 1) return "Semi Final";
      if (roundNum === maxRound - 2) return "Quarter Final";
      return `Round ${roundNum}`;
    };

    return sortedRoundNumbers.map((roundNum) => {
      const matches = roundMap[roundNum].sort((a, b) => a.match - b.match);

      return {
        title: getRoundTitle(roundNum),
        seeds: matches.map((match) => ({
          id: match.id,
          teams: [
            {
              name: match.player1?.fullname ?? "TBD",
              winner:
                match.winner !== null && match.winner?.id === match.player1?.id,
            },
            {
              name: match.player2?.fullname ?? "TBD",
              winner:
                match.winner !== null && match.winner?.id === match.player2?.id,
            },
          ],
        })),
      };
    });
  };
  const fetchDraw = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = await getAccessToken();
      const response = await axios.get(
        `https://smashlive-omega.vercel.app/api/matches`,
        {
          params: {
            "where[event][equals]": eventId,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      const transformed = transformDrawData(response.data.docs);
      setRounds(transformed);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.log(err);
        setError(
          err.response?.data?.message || err.message || "Request failed"
        );
      } else {
        setError(err.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDraw();
  }, [eventId]);

  // Loading state
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#22C55E" />
        <Text style={{ color: theme.muted, marginTop: 8, fontSize: 13 }}>
          Loading draw...
        </Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <Ionicons name="alert-circle-outline" size={36} color="#EF4444" />
        <Text style={{ color: theme.muted, fontSize: 13 }}>{error}</Text>
        <TouchableOpacity
          onPress={fetchDraw}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 8,
            backgroundColor: `${theme.primary}20`,
            borderWidth: 1,
            borderColor: theme.primary,
          }}
        >
          <Text
            style={{ color: theme.primary, fontWeight: "600", fontSize: 13 }}
          >
            Retry
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!rounds.length) {
    return (
      <CenterMessage icon="git-network-outline" text="Draw not generated yet" />
    );
  }
  const CARD_W = 150;
  const CARD_H = 68;
  const H_GAP = 50;
  const V_GAP = 60;
  const HEADER_H = 32;

  const maxSeeds = rounds[0].seeds.length;
  const totalRoundH = maxSeeds * (CARD_H + V_GAP) - V_GAP;
  const totalW = rounds.length * (CARD_W + H_GAP);
  const totalH = totalRoundH + HEADER_H + 20;

  const getCardYCenter = (seedIndex: number, total: number) => {
    const slotH = totalRoundH / total;
    return seedIndex * slotH + slotH / 2;
  };

  const getCardYTop = (seedIndex: number, total: number) => {
    return getCardYCenter(seedIndex, total) - CARD_H / 2;
  };
  return (
    <View
      style={{
        borderRadius: 16,
        borderWidth: 1,
        borderColor: theme.border,
        backgroundColor: theme.card,
        padding: 16,
        overflow: "hidden",
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <View style={{ width: totalW, height: totalH, position: "relative" }}>
          {/* ── CONNECTOR LINES ── */}
          {rounds.map((round, ri) => {
            if (ri === rounds.length - 1) return null;
            const nextRound = rounds[ri + 1];

            return nextRound.seeds.map((_: any, ni: number) => {
              const src1Idx = ni * 2;
              const src2Idx = ni * 2 + 1;
              const hasSrc2 = src2Idx < round.seeds.length;

              const cardX = ri * (CARD_W + H_GAP);
              const y1 = HEADER_H + getCardYCenter(src1Idx, round.seeds.length);
              const y2 = hasSrc2
                ? HEADER_H + getCardYCenter(src2Idx, round.seeds.length)
                : y1;
              const yMid = (y1 + y2) / 2;
              const yDst =
                HEADER_H + getCardYCenter(ni, nextRound.seeds.length);
              const xLineEnd = cardX + CARD_W + H_GAP / 2;

              return (
                <View key={`line-${ri}-${ni}`}>
                  {/* Horizontal from card 1 to midpoint */}
                  <View
                    style={{
                      position: "absolute",
                      left: cardX + CARD_W,
                      top: y1 - 0.75,
                      width: H_GAP / 2,
                      height: 1.5,
                      backgroundColor: theme.primary,
                      opacity: 0.4,
                    }}
                  />

                  {/* Horizontal from card 2 to midpoint */}
                  {hasSrc2 && (
                    <View
                      style={{
                        position: "absolute",
                        left: cardX + CARD_W,
                        top: y2 - 0.75,
                        width: H_GAP / 2,
                        height: 1.5,
                        backgroundColor: theme.primary,
                        opacity: 0.4,
                      }}
                    />
                  )}

                  {/* Vertical joining card 1 and card 2 */}
                  {hasSrc2 && (
                    <View
                      style={{
                        position: "absolute",
                        left: xLineEnd - 0.75,
                        top: Math.min(y1, y2),
                        width: 1.5,
                        height: Math.abs(y2 - y1),
                        backgroundColor: theme.primary,
                        opacity: 0.4,
                      }}
                    />
                  )}

                  {/* Horizontal from midpoint to next card */}
                  <View
                    style={{
                      position: "absolute",
                      left: xLineEnd,
                      top: yDst - 0.75,
                      width: H_GAP / 2,
                      height: 1.5,
                      backgroundColor: theme.primary,
                      opacity: 0.4,
                    }}
                  />

                  {/* Vertical from yMid to yDst if misaligned */}
                  {Math.abs(yMid - yDst) > 1 && (
                    <View
                      style={{
                        position: "absolute",
                        left: xLineEnd - 0.75,
                        top: Math.min(yMid, yDst),
                        width: 1.5,
                        height: Math.abs(yDst - yMid),
                        backgroundColor: theme.primary,
                        opacity: 0.4,
                      }}
                    />
                  )}
                </View>
              );
            });
          })}

          {/* ── ROUNDS & CARDS ── */}
          {rounds.map((round, ri) => {
            const cardX = ri * (CARD_W + H_GAP);

            return (
              <View key={`round-${ri}`}>
                {/* Round label */}
                <View
                  style={{
                    position: "absolute",
                    left: cardX,
                    top: 0,
                    width: CARD_W,
                    height: HEADER_H - 4,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: `${theme.primary}15`,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      color: theme.primary,
                      fontSize: 9,
                      fontWeight: "700",
                      letterSpacing: 1,
                    }}
                  >
                    {round.title.toUpperCase()}
                  </Text>
                </View>

                {/* Match cards */}
                {round.seeds.map(
                  (seed: { teams: any[]; id: any }, si: number) => {
                    const cardY =
                      HEADER_H + getCardYTop(si, round.seeds.length);
                    const p1 = seed.teams[0];
                    const p2 = seed.teams[1];

                    return (
                      <View
                        key={`card-${seed.id}`}
                        style={{
                          position: "absolute",
                          left: cardX,
                          top: cardY,
                          width: CARD_W,
                          height: CARD_H,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: theme.border,
                          backgroundColor: theme.card,
                          overflow: "hidden",
                        }}
                      >
                        {/* Player 1 */}
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            paddingHorizontal: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: theme.border,
                            backgroundColor: p1.winner
                              ? `${theme.primary}12`
                              : "transparent",
                          }}
                        >
                          <Text
                            numberOfLines={1}
                            style={{
                              flex: 1,
                              fontSize: 11,
                              fontWeight: p1.winner ? "700" : "500",
                              color: p1.winner ? theme.primary : theme.text,
                            }}
                          >
                            {p1.name}
                          </Text>
                          {p1.winner && (
                            <Text
                              style={{ fontSize: 10, color: theme.primary }}
                            >
                              ★
                            </Text>
                          )}
                        </View>

                        {/* Player 2 */}
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            paddingHorizontal: 10,
                            backgroundColor: p2.winner
                              ? `${theme.primary}12`
                              : "transparent",
                          }}
                        >
                          <Text
                            numberOfLines={1}
                            style={{
                              flex: 1,
                              fontSize: 11,
                              fontWeight: p2.winner ? "700" : "500",
                              color: p2.winner
                                ? theme.primary
                                : p2.name === "TBD" || p2.name === "BYE"
                                  ? theme.muted
                                  : theme.text,
                            }}
                          >
                            {p2.name}
                          </Text>
                          {p2.winner && (
                            <Text
                              style={{ fontSize: 10, color: theme.primary }}
                            >
                              ★
                            </Text>
                          )}
                        </View>
                      </View>
                    );
                  }
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

function PlayersTab({ eventId }: { eventId: string }) {
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "https://smashlive-omega.vercel.app/api/registrations",
          {
            params: {
              depth: 1,
              "select[player]": true,
              "where[event.id][equals]": eventId,
            },
          }
        );
        console.log(res.data.docs);
        setRegistrations(res.data.docs ?? []);
      } catch (err) {
        console.log("Failed to fetch players", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [eventId]);

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <View className="items-center justify-center py-20">
        <ActivityIndicator size="large" color="#22C55E" />
        <Text className="mt-3 text-sm text-light-muted dark:text-dark-muted">
          Loading players…
        </Text>
      </View>
    );
  }

  /* ---------- EMPTY ---------- */
  if (!registrations.length) {
    return (
      <CenterMessage icon="people-outline" text="No players registered yet" />
    );
  }

  /* ---------- DATA ---------- */
  return (
    <View className="gap-3">
      {registrations.map((r) => {
        const name = r.player.fullname;
        const firstLetter = name.charAt(0).toUpperCase();

        return (
          <View
            key={r.id}
            className="flex-row items-center rounded-2xl bg-light-card dark:bg-dark-card px-4 py-4 border border-light-border dark:border-dark-border"
          >
            {/* CIRCLE AVATAR */}
            <View className="mr-4">
              <View className="h-12 w-12 rounded-full items-center justify-center border-2 border-gray-300 dark:border-gray-600">
                <Text className="text-lg font-bold text-light-text dark:text-dark-text">
                  {firstLetter}
                </Text>
              </View>
            </View>

            {/* PLAYER INFO */}
            <View className="flex-1">
              <Text
                className="text-base font-semibold text-light-text dark:text-dark-text"
                numberOfLines={1}
              >
                {name}
              </Text>

              <Text
                className="text-xs text-light-muted dark:text-dark-muted mt-0.5"
                numberOfLines={1}
              >
                {r.player.email}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

function CenterMessage({ icon, text }: { icon: any; text: string }) {
  return (
    <View className="items-center justify-center mt-20">
      <Ionicons name={icon} size={48} color="#8AFF1A" />
      <Text className="mt-4 text-base font-semibold text-light-text dark:text-dark-text">
        {text}
      </Text>
    </View>
  );
}
