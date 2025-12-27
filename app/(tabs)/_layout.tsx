import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

export default function SmashLiveTabsLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: isDark ? "#ffffff" : "#0d59f2",
        tabBarInactiveTintColor: isDark ? "#9ca3af" : "#6b7280",

        tabBarStyle: {
          backgroundColor: isDark ? "#101622" : "#ffffff",
          borderTopColor: isDark ? "#1f2937" : "#e5e7eb",
        },
      }}
    >
      {/* ===== HOME ===== */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* ===== PLAY ===== */}
      <Tabs.Screen
        name="play"
        options={{
          title: "Play",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "play-circle" : "play-circle-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* ===== BOOK ===== */}
      <Tabs.Screen
        name="book"
        options={{
          title: "Book",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* ===== BUY ===== */}
      <Tabs.Screen
        name="buy"
        options={{
          title: "Buy",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "cart" : "cart-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* ===== CONNECT ===== */}
      <Tabs.Screen
        name="connect"
        options={{
          title: "Connect",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "account-group" : "account-group-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
