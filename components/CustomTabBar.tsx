import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, View, useColorScheme } from "react-native";

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const isDark = useColorScheme() === "dark";

  return (
    <View
      style={{
        flexDirection: "row",

        height: 90, // was 64
        paddingTop: 10, // was 6
        paddingBottom: 30, // was 10

        backgroundColor: isDark ? "#0B0B0B" : "#F9FAFB",
        borderTopWidth: 1,
        borderTopColor: isDark ? "#262626" : "#E5E7EB",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const focused = state.index === index;

        const onPress = () => navigation.navigate(route.name);

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={1}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                // 👇 SLIGHTLY BIGGER CIRCLE (OPTIONAL BUT FEELS BETTER)
                width: 48, // was 46
                height: 48,
                borderRadius: 24,
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? "#8AFF1A" : "transparent",
              }}
            >
              {options.tabBarIcon?.({
                focused,
                size: 22,
                color: focused
                  ? "#000000" // black on green
                  : isDark
                    ? "#9CA3AF"
                    : "#6B7280",
              })}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
