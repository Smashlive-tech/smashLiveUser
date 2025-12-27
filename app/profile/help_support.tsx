import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  LayoutAnimation,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  UIManager,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Enable animation for Android expand/collapse
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HelpSupportScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "How do I create an event?",
      answer:
        "To create an event, navigate to the 'Events' tab and tap the '+' icon. Follow the on-screen instructions to fill in your event details, set ticket prices, and publish your event.",
    },
    {
      id: 2,
      question: "Managing ticket sales?",
      answer:
        "You can track your ticket sales in real-time from the event dashboard. View sales data, revenue, and attendee information all in one place.",
    },
    {
      id: 3,
      question: "How to check in attendees?",
      answer:
        "Use the built-in scanner in the app to scan QR codes on tickets. You can also manually search for attendees by name or email to check them in.",
    },
    {
      id: 4,
      question: "Payment and payout information?",
      answer:
        "Payouts are processed 3–5 business days after your event concludes. You can set up and manage your payout details in the Settings → Payout section.",
    },
  ];

  const handleToggle = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      {/* ================= HEADER (MATCHES CONNECT) ================= */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons
            name="arrow-back"
            size={22}
            color={isDark ? "#9ca3af" : "#6c757d"}
          />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-text-primary dark:text-white">
          Help & Support
        </Text>
      </View>

      {/* ================= CONTENT ================= */}
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* ================= FAQ ================= */}
        <View className="mt-2 mb-8">
          <Text className="text-lg font-semibold text-text-primary dark:text-white mb-4">
            Frequently Asked Questions
          </Text>

          <View className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            {faqs.map((faq) => (
              <View
                key={faq.id}
                className="border-b border-slate-200 dark:border-slate-700 last:border-b-0"
              >
                <TouchableOpacity
                  onPress={() => handleToggle(faq.id)}
                  activeOpacity={0.85}
                  className="flex-row justify-between items-center px-4 py-4"
                >
                  <Text className="text-base font-medium text-text-primary dark:text-white flex-1 pr-4">
                    {faq.question}
                  </Text>
                  <MaterialIcons
                    name={openFAQ === faq.id ? "expand-less" : "expand-more"}
                    size={26}
                    color={isDark ? "#9ca3af" : "#6b7280"}
                  />
                </TouchableOpacity>

                {openFAQ === faq.id && (
                  <View className="px-4 pb-4">
                    <Text className="text-sm text-text-secondary leading-6">
                      {faq.answer}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* ================= CONTACT SUPPORT ================= */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-text-primary dark:text-white mb-4">
            Contact Support
          </Text>

          <View className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            {/* Email */}
            <TouchableOpacity
              onPress={() => Linking.openURL("mailto:support@smashlive.com")}
              className="flex-row items-center justify-between px-4 py-5 border-b border-slate-200 dark:border-slate-700"
              activeOpacity={0.85}
            >
              <View className="flex-row items-center gap-4">
                <View className="h-11 w-11 rounded-full bg-primary/20 items-center justify-center">
                  <MaterialIcons name="mail" size={22} color="#0d59f2" />
                </View>
                <Text className="text-base font-medium text-text-primary dark:text-white">
                  Email Support
                </Text>
              </View>
              <MaterialIcons
                name="chevron-right"
                size={26}
                color={isDark ? "#9ca3af" : "#6b7280"}
              />
            </TouchableOpacity>

            {/* Live Chat */}
            <TouchableOpacity
              onPress={() =>
                Alert.alert("Live Chat", "Connecting you to support…")
              }
              className="flex-row items-center justify-between px-4 py-5"
              activeOpacity={0.85}
            >
              <View className="flex-row items-center gap-4">
                <View className="h-11 w-11 rounded-full bg-primary/20 items-center justify-center">
                  <MaterialIcons name="chat-bubble" size={20} color="#0d59f2" />
                </View>
                <Text className="text-base font-medium text-text-primary dark:text-white">
                  Live Chat
                </Text>
              </View>
              <MaterialIcons
                name="chevron-right"
                size={26}
                color={isDark ? "#9ca3af" : "#6b7280"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
