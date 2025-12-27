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
import { SafeAreaView } from "react-native-safe-area-context";

type Player = {
  id: string;
  name: string;
};

export default function CreateTeamScreen() {
  const router = useRouter();
  const { tournamentId } = useLocalSearchParams();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9ca3af" : "#6c757d";

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
            Create a Team
          </Text>
          <Text className="mt-1 text-sm text-text-secondary leading-5">
            Add your team details and players
          </Text>
        </View>

        {/* ================= TEAM DETAILS ================= */}
        <View className="px-4 gap-5">
          {/* TEAM NAME */}
          <View>
            <Text className="text-sm font-medium text-text-primary dark:text-white mb-2">
              Team Name
            </Text>
            <View className="h-12 rounded-lg bg-slate-200 dark:bg-slate-800 px-4 justify-center">
              <TextInput
                value={teamName}
                onChangeText={setTeamName}
                placeholder="Enter team name"
                placeholderTextColor={iconColor}
                className="text-base text-text-primary dark:text-white"
              />
            </View>
          </View>

          {/* DESCRIPTION */}
          <View>
            <Text className="text-sm font-medium text-text-primary dark:text-white mb-2">
              Team Description (Optional)
            </Text>
            <View className="min-h-[96px] rounded-lg bg-slate-200 dark:bg-slate-800 px-4 py-3">
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Short description about your team"
                placeholderTextColor={iconColor}
                multiline
                className="text-base text-text-primary dark:text-white"
              />
            </View>
          </View>
        </View>

        {/* ================= ADD PLAYERS ================= */}
        <View className="px-4 pt-8">
          <Text className="text-base font-semibold text-text-primary dark:text-white mb-3">
            Team Players
          </Text>

          {/* ADD PLAYER INPUT */}
          <View className="flex-row items-center gap-2 mb-4">
            <View className="flex-1 h-12 rounded-lg bg-slate-200 dark:bg-slate-800 px-4 justify-center">
              <TextInput
                value={playerName}
                onChangeText={setPlayerName}
                placeholder="Enter player name"
                placeholderTextColor={iconColor}
                className="text-base text-text-primary dark:text-white"
              />
            </View>

            <TouchableOpacity
              onPress={addPlayer}
              className="h-12 px-4 rounded-lg bg-primary items-center justify-center"
            >
              <Ionicons name="add" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* PLAYER LIST */}
          {players.map((player, index) => (
            <View
              key={player.id}
              className="flex-row items-center justify-between mb-3 rounded-lg bg-white dark:bg-slate-800 px-4 py-3 border border-slate-200 dark:border-slate-700"
            >
              <Text className="text-base text-text-primary dark:text-white">
                {index + 1}. {player.name}
              </Text>

              <TouchableOpacity onPress={() => removePlayer(player.id)}>
                <Ionicons
                  name="close"
                  size={20}
                  color={isDark ? "#9ca3af" : "#6c757d"}
                />
              </TouchableOpacity>
            </View>
          ))}

          {players.length === 0 && (
            <Text className="text-sm text-text-secondary mt-2">
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
            <Text className="text-white text-base font-bold">
              Create Team & Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
