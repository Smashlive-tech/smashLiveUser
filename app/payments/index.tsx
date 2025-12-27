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
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentsScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  const [activeTab, setActiveTab] = useState("Refunds");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedTournament, setSelectedTournament] = useState<string>("All");

  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);

  const tabs = ["Refunds", "Payouts"];
  const filters = ["Date Range", "Tournament"];

  const [transactions, setTransactions] = useState([
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

  /* ===== Simulate API ===== */
  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return {
          bg: "bg-green-100 dark:bg-green-900/50",
          text: "text-green-700 dark:text-green-300",
        };
      case "Pending":
        return {
          bg: "bg-yellow-100 dark:bg-yellow-900/50",
          text: "text-yellow-700 dark:text-yellow-300",
        };
      default:
        return {
          bg: "bg-gray-100 dark:bg-gray-700/50",
          text: "text-gray-700 dark:text-gray-300",
        };
    }
  };

  const applyLastDays = (days: number) => {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - (days - 1));
    start.setHours(0, 0, 0, 0);

    const end = new Date(now);
    end.setHours(23, 59, 59, 999);

    setStartDate(start);
    setEndDate(end);
    setSelectedFilter(null);
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
    setSelectedFilter(null);
  };

  const filteredTransactions = transactions.filter((item) => {
    if (
      selectedTournament !== "All" &&
      item.tournament !== selectedTournament
    ) {
      return false;
    }

    if (startDate && endDate) {
      const txnDate = new Date(item.date);
      if (isNaN(txnDate.getTime())) return true;

      return (
        txnDate >= new Date(startDate.setHours(0, 0, 0, 0)) &&
        txnDate <= new Date(endDate.setHours(23, 59, 59, 999))
      );
    }
    return true;
  });

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      {/* ===== HEADER ===== */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons
            name="arrow-back"
            size={22}
            color={isDark ? "#9ca3af" : "#6c757d"}
          />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-text-primary dark:text-white">
          Payments
        </Text>
      </View>

      {/* ===== TABS ===== */}
      <View className="flex-row border-b border-gray-200 dark:border-gray-700 px-4">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`flex-1 items-center justify-center border-b-[3px] ${
              activeTab === tab ? "border-blue-600" : "border-transparent"
            } py-3`}
          >
            <Text
              className={`text-sm font-semibold ${
                activeTab === tab
                  ? "text-gray-900 dark:text-blue-500"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ===== TRANSACTIONS ===== */}
      <ScrollView
        className="flex-1 px-4 mt-4"
        showsVerticalScrollIndicator={false}
      >
        {/* ===== SKELETON LOADING ===== */}
        {loading &&
          [1, 2, 3, 4].map((i) => (
            <View
              key={i}
              className="flex-row items-center gap-4 bg-gray-200/70 dark:bg-gray-700/60 
                         p-4 rounded-xl mb-3"
            >
              <View className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600" />
              <View className="flex-1 gap-2">
                <View className="h-4 w-24 rounded bg-gray-300 dark:bg-gray-600" />
                <View className="h-3 w-40 rounded bg-gray-300 dark:bg-gray-600" />
                <View className="h-3 w-28 rounded bg-gray-300 dark:bg-gray-600" />
              </View>
              <View className="h-6 w-14 rounded-full bg-gray-300 dark:bg-gray-600" />
            </View>
          ))}

        {/* ===== DATA ===== */}
        {!loading &&
          filteredTransactions.map((item) => {
            const colors = getStatusColor(item.status);
            return (
              <View
                key={item.id}
                className="flex-row items-center gap-4 bg-white dark:bg-[#1A2233] 
                           p-4 rounded-xl shadow-sm mb-3"
              >
                <View
                  className={`h-12 w-12 items-center justify-center rounded-full ${
                    item.status === "Paid"
                      ? "bg-green-100 dark:bg-green-900/50"
                      : "bg-yellow-100 dark:bg-yellow-900/50"
                  }`}
                >
                  <MaterialIcons
                    name={item.status === "Paid" ? "north-east" : "schedule"}
                    size={22}
                    color={
                      item.status === "Paid"
                        ? isDark
                          ? "#4ade80"
                          : "#16a34a"
                        : isDark
                          ? "#facc15"
                          : "#ca8a04"
                    }
                  />
                </View>

                <View className="flex-1">
                  <Text className="font-bold text-text-primary dark:text-white">
                    {item.amount}
                  </Text>
                  <Text className="text-sm text-text-secondary">
                    {item.desc}
                  </Text>
                  <Text className="text-xs text-text-secondary">
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

      {/* ===== DATE PICKERS ===== */}
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
    </SafeAreaView>
  );
}
