import ScreenWrapper from "@/components/ScreenWrapper";
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
type Match = {
  winner: any;
  umpire: any;
  inProgress: any;
  id: number;
  player1?: {
    id: any;
    fullname: string;
  } | null;
  player2?: {
    id: any;
    fullname: string;
  } | null;
  court?: string;
  matchDate: string;
  round: number;
  match: number;
  isCompleted: boolean;
};
type EventRegistration = {
  id: number;
  player: {
    id: number;
    fullname: string;
    email: string;
  };
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
        {activeTab === "draw" && <DrawTab />}
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
        <ActivityIndicator size="large" color="#8AFF1A" />
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

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "https://smashlive-omega.vercel.app/api/matches",
          {
            params: {
              "where[event.id][equals]": eventId,
            },
          }
        );

        console.log(res.data.docs);
        setMatches(res.data.docs ?? []);
      } catch (err) {
        console.log("Failed to fetch matches", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [eventId]);

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <View className="gap-3">
        <View className="items-center justify-center py-20">
          <ActivityIndicator size="large" color="#8AFF1A" />
          <Text className="mt-3 text-sm text-light-muted dark:text-dark-muted">
            Loading Matches…
          </Text>
        </View>
      </View>
    );
  }

  /* ---------- EMPTY ---------- */
  if (!matches.length) {
    return (
      <CenterMessage icon="calendar-outline" text="Matches not generated yet" />
    );
  }
  const router = useRouter();
  /* ---------- DATA ---------- */
  return (
    <View className="gap-4">
      {matches.map((m) => {
        const player1 = m.player1?.fullname ?? "BYE";
        const player2 = m.player2?.fullname ?? "BYE";

        const isBye1 = !m.player1;
        const isBye2 = !m.player2;
        const winnerId = m.winner?.id;

        const isPlayer1Winner =
          m.isCompleted && m.player1 && m.player1.id === winnerId;

        const isPlayer2Winner =
          m.isCompleted && m.player2 && m.player2.id === winnerId;

        return (
          <View
            key={m.id}
            className="rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border overflow-hidden"
          >
            {/* ===== TOP BAR ===== */}
            <View className="flex-row items-center justify-between px-4 py-2 bg-black/5 dark:bg-white/5">
              <Text className="text-xs font-bold text-primary">
                ROUND {m.round}
              </Text>

              <Text className="text-xs text-light-muted dark:text-dark-muted">
                Match {m.match}
              </Text>

              <View
                className={`px-2 py-0.5 rounded-full ${
                  m.isCompleted
                    ? "bg-primary/15"
                    : m.inProgress
                      ? "bg-blue-100 dark:bg-blue-900/30"
                      : "bg-light-border dark:bg-dark-border"
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    m.isCompleted
                      ? "text-primary"
                      : m.inProgress
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-light-muted dark:text-dark-muted"
                  }`}
                >
                  {m.isCompleted
                    ? "COMPLETED"
                    : m.inProgress
                      ? "LIVE"
                      : "SCHEDULED"}
                </Text>
              </View>
            </View>

            {/* ===== PLAYERS ===== */}
            <View className="py-5 px-4">
              <View className="flex-row items-center justify-between">
                {/* PLAYER 1 */}
                <View className="items-center">
                  {/* CIRCLE */}
                  <View
                    className={`h-12 w-12 rounded-full items-center justify-center border-2 ${
                      isPlayer1Winner
                        ? "border-primary"
                        : m.player1
                          ? "border-gray-300 dark:border-gray-600"
                          : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <Text
                      className={`text-lg font-bold ${
                        isPlayer1Winner
                          ? "text-emerald-600 dark:text-primary"
                          : m.player1
                            ? "text-light-text dark:text-dark-text"
                            : "text-light-muted dark:text-dark-muted"
                      }`}
                    >
                      {(m.player1?.fullname ?? "B").charAt(0).toUpperCase()}
                    </Text>
                  </View>

                  {/* NAME */}
                  <Text
                    className={`mt-2 text-sm font-semibold text-center ${
                      isPlayer1Winner
                        ? "text-emerald-600 dark:text-primary"
                        : m.player1
                          ? "text-light-text dark:text-dark-text"
                          : "text-light-muted dark:text-dark-muted"
                    }`}
                    numberOfLines={1}
                  >
                    {m.player1?.fullname ?? "BYE"}
                  </Text>
                </View>

                {/* VS */}
                <Text className="text-xl font-bold text-light-muted dark:text-dark-muted">
                  VS
                </Text>

                {/* PLAYER 2 */}
                <View className="items-center">
                  {/* CIRCLE */}
                  <View
                    className={`h-12 w-12 rounded-full items-center justify-center border-2 ${
                      isPlayer2Winner
                        ? "border-primary"
                        : m.player2
                          ? "border-gray-300 dark:border-gray-600"
                          : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <Text
                      className={`text-lg font-bold ${
                        isPlayer2Winner
                          ? "text-emerald-600 dark:text-primary"
                          : m.player2
                            ? "text-light-text dark:text-dark-text"
                            : "text-light-muted dark:text-dark-muted"
                      }`}
                    >
                      {(m.player2?.fullname ?? "B").charAt(0).toUpperCase()}
                    </Text>
                  </View>

                  {/* NAME */}
                  <Text
                    className={`mt-2 text-sm font-semibold text-center ${
                      isPlayer2Winner
                        ? "text-emerald-600 dark:text-primary"
                        : m.player2
                          ? "text-light-text dark:text-dark-text"
                          : "text-light-muted dark:text-dark-muted"
                    }`}
                    numberOfLines={1}
                  >
                    {m.player2?.fullname ?? "BYE"}
                  </Text>
                </View>
              </View>
            </View>

            {/* ===== FOOTER ===== */}
            <View className="flex-row items-center justify-between px-4 py-3 border-t border-light-border dark:border-dark-border">
              <Text className="text-sm text-light-muted dark:text-dark-muted">
                Court {m.court ?? "TBD"}
              </Text>

              <Text className="text-sm text-light-muted dark:text-dark-muted">
                {new Date(m.matchDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              {/* UMPIRE */}
              <Text className="text-xs text-light-muted dark:text-dark-muted">
                Umpire: {m.umpire?.fullname ?? "TBD"}
              </Text>
            </View>
            {/* ===== ACTION ===== */}
            {(m.inProgress || m.isCompleted) && (
              <View className="px-4 pb-4">
                {m.inProgress && (
                  <TouchableOpacity
                    onPress={() =>
                      router.push(`/play/tournaments/matches/live/${m.id}`)
                    }
                    className="flex-1 h-10 rounded-lg bg-primary items-center justify-center"
                    activeOpacity={0.9}
                  >
                    <Text className="text-black font-bold text-sm">
                      View Score
                    </Text>
                  </TouchableOpacity>
                )}

                {m.isCompleted && (
                  <TouchableOpacity
                    onPress={() =>
                      router.push(`/play/tournaments/matches/summary/${m.id}`)
                    }
                    className="flex-1 h-10 rounded-lg bg-primary items-center justify-center"
                    activeOpacity={0.9}
                  >
                    <Text className="text-black font-bold text-sm">
                      View Score
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

function DrawTab() {
  const isDark = useColorScheme() === "dark";

  const theme = {
    bg: isDark ? "#0B0B0B" : "#FFFFFF",
    card: isDark ? "#151515" : "#F8FAFC",
    border: isDark ? "#262626" : "#E5E7EB",
    text: isDark ? "#FFFFFF" : "#0F172A",
    muted: isDark ? "#9CA3AF" : "#475569",
    primary: "#8AFF1A",
  };

  const rounds = [
    {
      title: "Round 1",
      seeds: [
        {
          id: 1,
          teams: [
            { name: "Alice", winner: false },
            { name: "Bob", winner: true },
          ],
        },
        {
          id: 2,
          teams: [
            { name: "Charlie", winner: true },
            { name: "David", winner: false },
          ],
        },
        {
          id: 3,
          teams: [
            { name: "Eve", winner: false },
            { name: "Frank", winner: true },
          ],
        },
        {
          id: 4,
          teams: [
            { name: "Grace", winner: true },
            { name: "Henry", winner: false },
          ],
        },
      ],
    },
    {
      title: "Quarter Final",
      seeds: [
        {
          id: 5,
          teams: [
            { name: "Bob", winner: false },
            { name: "Charlie", winner: true },
          ],
        },
        {
          id: 6,
          teams: [
            { name: "Frank", winner: true },
            { name: "Grace", winner: false },
          ],
        },
      ],
    },
    {
      title: "Semi Final",
      seeds: [
        {
          id: 7,
          teams: [
            { name: "Charlie", winner: true },
            { name: "Frank", winner: false },
          ],
        },
      ],
    },
    {
      title: "Final",
      seeds: [
        {
          id: 8,
          teams: [
            { name: "Charlie", winner: true },
            { name: "TBD", winner: false },
          ],
        },
      ],
    },
  ];

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
  if (!rounds.length) {
    return (
      <CenterMessage icon="git-network-outline" text="Draw not generated yet" />
    );
  }
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

            return nextRound.seeds.map((_, ni) => {
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
                {round.seeds.map((seed, si) => {
                  const cardY = HEADER_H + getCardYTop(si, round.seeds.length);
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
                          <Text style={{ fontSize: 10, color: theme.primary }}>
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
                          <Text style={{ fontSize: 10, color: theme.primary }}>
                            ★
                          </Text>
                        )}
                      </View>
                    </View>
                  );
                })}
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
        <ActivityIndicator size="large" color="#8AFF1A" />
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
