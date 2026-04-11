import { ActivityIndicator, View, useColorScheme } from "react-native";

export default function FullScreenLoader() {
  const isDark = useColorScheme() === "dark";

  return (
    <View
      className={`absolute inset-0 items-center justify-center z-50 ${
        isDark ? "bg-black/60" : "bg-black/30"
      }`}
    >
      <View
        className={`px-6 py-5 rounded-2xl border ${
          isDark
            ? "bg-dark-card border-dark-border"
            : "bg-light-card border-light-border"
        }`}
      >
        <ActivityIndicator size="large" color={isDark ? "#fff" : "#000"} />
      </View>
    </View>
  );
}
