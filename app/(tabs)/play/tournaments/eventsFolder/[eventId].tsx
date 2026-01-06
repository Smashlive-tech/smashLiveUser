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

type EventTab = "overview" | "matches" | "draw" | "players" | "leaderboard";
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

/* ================= SCREEN ================= */

export default function EventDetailsScreen() {
  const router = useRouter();
  const { eventId } = useLocalSearchParams<{ eventId: string }>();
  const isDark = useColorScheme() === "dark";

  const iconColor = isDark ? "#9CA3AF" : "#6B7280";
  const [activeTab, setActiveTab] = useState<EventTab>("overview");
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

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center gap-3 px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
          Event • {eventId}
        </Text>
      </View>

      {/* ================= TABS ================= */}
      <View className="px-4">
        <View className="flex-row border-b border-light-border dark:border-dark-border">
          {(
            [
              "overview",
              "matches",
              "draw",
              "players",
              "leaderboard",
            ] as EventTab[]
          ).map((tab) => {
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
                  className={`text-sm font-bold capitalize ${
                    isActive
                      ? "text-primary"
                      : "text-light-muted dark:text-dark-muted"
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* ================= TAB CONTENT ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      >
        {activeTab === "overview" && (
          <OverviewTab event={event} loading={loading} />
        )}
        {activeTab === "matches" && <MatchesTab />}
        {activeTab === "draw" && <DrawTab />}
        {activeTab === "players" && <PlayersTab />}
        {activeTab === "leaderboard" && <LeaderboardTab />}
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
function OverviewTab({
  event,
  loading,
}: {
  event: EventDetails | null;
  loading: boolean;
}) {
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

function MatchesTab() {
  return (
    <View className="gap-3">
      {["Match 1", "Match 2", "Semi Final"].map((m) => (
        <Card key={m} title={m}>
          Court 1 • 5:00 PM
        </Card>
      ))}
    </View>
  );
}

function DrawTab() {
  return (
    <CenterMessage icon="git-branch-outline" text="Draw not released yet" />
  );
}

function PlayersTab() {
  return (
    <View className="gap-3">
      {["Player A", "Player B", "Player C"].map((p) => (
        <Card key={p} title={p} />
      ))}
    </View>
  );
}

function LeaderboardTab() {
  return (
    <View className="gap-3">
      {[
        ["1", "Player A"],
        ["2", "Player B"],
        ["3", "Player C"],
      ].map(([rank, name]) => (
        <View
          key={rank}
          className="flex-row justify-between rounded-xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border"
        >
          <Text className="font-bold text-light-text dark:text-dark-text">
            #{rank}
          </Text>
          <Text className="text-light-text dark:text-dark-text">{name}</Text>
        </View>
      ))}
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
