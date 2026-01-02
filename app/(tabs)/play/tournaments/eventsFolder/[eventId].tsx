import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

/* ================= TYPES ================= */

type EventTab = "overview" | "matches" | "draw" | "players" | "leaderboard";

/* ================= SCREEN ================= */

export default function EventDetailsScreen() {
  const router = useRouter();
  const { eventId } = useLocalSearchParams<{ eventId: string }>();
  const isDark = useColorScheme() === "dark";

  const iconColor = isDark ? "#9CA3AF" : "#6B7280";
  const [activeTab, setActiveTab] = useState<EventTab>("overview");

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
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "matches" && <MatchesTab />}
        {activeTab === "draw" && <DrawTab />}
        {activeTab === "players" && <PlayersTab />}
        {activeTab === "leaderboard" && <LeaderboardTab />}
      </ScrollView>
    </ScreenWrapper>
  );
}

/* ================= TAB COMPONENTS ================= */

function OverviewTab() {
  return (
    <Card title="Overview">
      This event follows a knockout format with seeded players and official
      referees.
    </Card>
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
