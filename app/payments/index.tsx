import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function PaymentsScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  const [activeTab, setActiveTab] = useState("Refunds");
  const [loading, setLoading] = useState(true);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedTournament, setSelectedTournament] = useState<string>("All");

  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);

  const tabs = ["Refunds", "Payouts"];

  const [transactions] = useState([
    {
      id: 1,
      amount: "+$50.00",
      desc: "Ticket Sale: John D.",
      date: "Oct 26, 2023, 3:45 PM",
      status: "Paid",
      tournament: "Summer Smash Fest 2024",
    },
    {
      id: 2,
      amount: "+$120.00",
      desc: "Ticket Sale: Ultimate Melee Weekly",
      date: "Oct 25, 2023, 11:10 AM",
      status: "Paid",
      tournament: "Apex Arena Championship",
    },
    {
      id: 3,
      amount: "+$25.00",
      desc: "Ticket Sale: Jane S.",
      date: "Oct 24, 2023, 9:02 PM",
      status: "Pending",
      tournament: "Summer Smash Fest 2024",
    },
  ]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  const getStatusColor = (status: string) => {
    if (status === "Paid") {
      return {
        bg: "bg-primary/15",
        text: "text-primary",
      };
    }
    if (status === "Pending") {
      return {
        bg: "bg-yellow-500/15",
        text: "text-yellow-600 dark:text-yellow-400",
      };
    }
    return {
      bg: "bg-slate-200 dark:bg-slate-700",
      text: "text-light-muted dark:text-dark-muted",
    };
  };

  const handleConfirmStart = (date: Date) => {
    setStartDate(date);
    setStartPickerVisible(false);
    if (endDate && endDate < date) setEndDate(null);
  };

  const handleConfirmEnd = (date: Date) => {
    if (startDate && date < startDate) {
      if (Platform.OS === "android") {
        ToastAndroid.show(
          "End date cannot be before start date",
          ToastAndroid.SHORT
        );
      }
      setEndPickerVisible(false);
      return;
    }
    setEndDate(date);
    setEndPickerVisible(false);
  };

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons
            name="arrow-back"
            size={22}
            color={isDark ? "#9CA3AF" : "#6B7280"}
          />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
          Payments
        </Text>
      </View>

      {/* ================= TABS ================= */}
      <View className="flex-row border-b border-light-border dark:border-dark-border px-4">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`flex-1 items-center py-3 border-b-2 ${
              activeTab === tab ? "border-primary" : "border-transparent"
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                activeTab === tab
                  ? "text-primary"
                  : "text-light-muted dark:text-dark-muted"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ================= TRANSACTIONS ================= */}
      <ScrollView
        className="flex-1 px-4 mt-4"
        showsVerticalScrollIndicator={false}
      >
        {/* ===== SKELETON ===== */}
        {loading &&
          [1, 2, 3, 4].map((i) => (
            <View
              key={i}
              className="flex-row items-center gap-4
                         bg-light-card dark:bg-dark-card
                         p-4 rounded-xl mb-3 opacity-60"
            >
              <View className="h-12 w-12 rounded-full bg-slate-300 dark:bg-slate-700" />
              <View className="flex-1 gap-2">
                <View className="h-4 w-24 rounded bg-slate-300 dark:bg-slate-700" />
                <View className="h-3 w-40 rounded bg-slate-300 dark:bg-slate-700" />
                <View className="h-3 w-28 rounded bg-slate-300 dark:bg-slate-700" />
              </View>
            </View>
          ))}

        {/* ===== DATA ===== */}
        {!loading &&
          transactions.map((item) => {
            const colors = getStatusColor(item.status);
            return (
              <View
                key={item.id}
                className="flex-row items-center gap-4
                           bg-light-card dark:bg-dark-card
                           border border-light-border dark:border-dark-border
                           p-4 rounded-xl mb-3"
              >
                <View className="h-12 w-12 rounded-full bg-primary/15 items-center justify-center">
                  <MaterialIcons
                    name={item.status === "Paid" ? "north-east" : "schedule"}
                    size={22}
                    color="#8AFF1A"
                  />
                </View>

                <View className="flex-1">
                  <Text className="font-bold text-light-text dark:text-dark-text">
                    {item.amount}
                  </Text>
                  <Text className="text-sm text-light-muted dark:text-dark-muted">
                    {item.desc}
                  </Text>
                  <Text className="text-xs text-light-muted dark:text-dark-muted">
                    {item.date}
                  </Text>
                </View>

                <View className={`px-3 py-1 rounded-full ${colors.bg}`}>
                  <Text className={`text-xs font-medium ${colors.text}`}>
                    {item.status}
                  </Text>
                </View>
              </View>
            );
          })}
      </ScrollView>

      {/* ================= DATE PICKERS ================= */}
      <DateTimePickerModal
        isVisible={isStartPickerVisible}
        mode="date"
        onConfirm={handleConfirmStart}
        onCancel={() => setStartPickerVisible(false)}
        themeVariant={isDark ? "dark" : "light"}
      />

      <DateTimePickerModal
        isVisible={isEndPickerVisible}
        mode="date"
        onConfirm={handleConfirmEnd}
        onCancel={() => setEndPickerVisible(false)}
        minimumDate={startDate ?? undefined}
        themeVariant={isDark ? "dark" : "light"}
      />
    </ScreenWrapper>
  );
}
