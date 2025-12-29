import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

type Player = {
  id: string;
  name: string;
};

export default function CreateTeamScreen() {
  const router = useRouter();
  const { tournamentId } = useLocalSearchParams();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);

  function addPlayer() {
    if (!playerName.trim()) return;

    setPlayers((prev) => [
      ...prev,
      { id: Date.now().toString(), name: playerName.trim() },
    ]);
    setPlayerName("");
  }

  function removePlayer(id: string) {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  }

  const canContinue = teamName.trim() && players.length > 0;

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center gap-3 px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
          Play
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* ================= TITLE ================= */}
        <View className="px-4 pt-2 pb-6">
          <Text className="text-[22px] font-bold text-light-text dark:text-dark-text">
            Create a Team
          </Text>
          <Text className="mt-1 text-sm text-light-muted dark:text-dark-muted leading-5">
            Add your team details and players
          </Text>
        </View>

        {/* ================= TEAM DETAILS ================= */}
        <View className="px-4 gap-5">
          {/* TEAM NAME */}
          <View>
            <Text className="text-sm font-medium text-light-text dark:text-dark-text mb-2">
              Team Name
            </Text>
            <View className="h-12 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border px-4 justify-center">
              <TextInput
                value={teamName}
                onChangeText={setTeamName}
                placeholder="Enter team name"
                placeholderTextColor={iconColor}
                className="text-base text-light-text dark:text-dark-text"
              />
            </View>
          </View>

          {/* DESCRIPTION */}
          <View>
            <Text className="text-sm font-medium text-light-text dark:text-dark-text mb-2">
              Team Description (Optional)
            </Text>
            <View className="min-h-[96px] rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border px-4 py-3">
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Short description about your team"
                placeholderTextColor={iconColor}
                multiline
                className="text-base text-light-text dark:text-dark-text"
              />
            </View>
          </View>
        </View>

        {/* ================= ADD PLAYERS ================= */}
        <View className="px-4 pt-8">
          <Text className="text-base font-semibold text-light-text dark:text-dark-text mb-3">
            Team Players
          </Text>

          {/* ADD PLAYER INPUT */}
          <View className="flex-row items-center gap-2 mb-4">
            <View className="flex-1 h-12 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border px-4 justify-center">
              <TextInput
                value={playerName}
                onChangeText={setPlayerName}
                placeholder="Enter player name"
                placeholderTextColor={iconColor}
                className="text-base text-light-text dark:text-dark-text"
              />
            </View>

            <TouchableOpacity
              onPress={addPlayer}
              className="h-12 px-4 rounded-lg bg-primary items-center justify-center"
            >
              <Ionicons name="add" size={22} color="#000" />
            </TouchableOpacity>
          </View>

          {/* PLAYER LIST */}
          {players.map((player, index) => (
            <View
              key={player.id}
              className="flex-row items-center justify-between mb-3 rounded-lg bg-light-card dark:bg-dark-card px-4 py-3 border border-light-border dark:border-dark-border"
            >
              <Text className="text-base text-light-text dark:text-dark-text">
                {index + 1}. {player.name}
              </Text>

              <TouchableOpacity onPress={() => removePlayer(player.id)}>
                <Ionicons name="close" size={20} color={iconColor} />
              </TouchableOpacity>
            </View>
          ))}

          {players.length === 0 && (
            <Text className="text-sm text-light-muted dark:text-dark-muted mt-2">
              Add at least one player to continue
            </Text>
          )}
        </View>

        {/* ================= CTA ================= */}
        <View className="px-4 pt-10">
          <TouchableOpacity
            disabled={!canContinue}
            onPress={() =>
              router.push({
                pathname: "/play/tournaments/payment",
                params: {
                  tournamentId,
                  teamName,
                  players: JSON.stringify(players),
                },
              })
            }
            className={`h-14 rounded-xl items-center justify-center ${
              canContinue ? "bg-primary" : "bg-slate-400"
            }`}
          >
            <Text className="text-black text-base font-bold">
              Create Team & Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
