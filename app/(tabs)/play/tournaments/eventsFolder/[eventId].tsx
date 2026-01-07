import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
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
      <View className="rounded-xl bg-light-card dark:bg-dark-card p-5 border border-light-border dark:border-dark-border">
        {/* Big unified skeleton */}
        <View className="h-40 rounded-lg bg-gray-300 dark:bg-dark-card" />
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
              "where[event.id][equals]": 23,
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
        {[1, 2, 3].map((i) => (
          <View
            key={i}
            className="h-24 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border"
          />
        ))}
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
  return (
    <CenterMessage icon="git-branch-outline" text="Draw not released yet" />
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
              "where[event.id]": eventId,
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
      <View className="gap-3">
        {[1, 2, 3].map((i) => (
          <View
            key={i}
            className="h-16 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border"
          />
        ))}
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

/* ================= REUSABLE UI ================= */

function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <View className="rounded-xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border">
      <Text className="font-semibold text-light-text dark:text-dark-text mb-1">
        {title}
      </Text>

      {children && (
        <Text className="text-sm text-light-muted dark:text-dark-muted">
          {children}
        </Text>
      )}
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
