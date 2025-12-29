import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenWrapperProps = {
  children: ReactNode;
};

export default function ScreenWrapper({ children }: ScreenWrapperProps) {
  const isDark = useColorScheme() === "dark";

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      {/* STATUS BAR FIX */}
      <StatusBar
        style={isDark ? "light" : "dark"}
        backgroundColor={isDark ? "#1E1E1E" : "#F9FAFB"}
      />

      <LinearGradient
        colors={
          isDark
            ? ["#1E1E1E", "#080808"] // dark gradient
            : ["#F9FAFB", "#F9FAFB"] // soft white
        }
        style={{ flex: 1 }}
      >
        {children}
      </LinearGradient>
    </SafeAreaView>
  );
}
