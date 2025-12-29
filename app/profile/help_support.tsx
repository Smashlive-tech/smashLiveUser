import ScreenWrapper from "@/components/ScreenWrapper";
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

// Enable animation for Android
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
        "Navigate to the Events tab and tap the '+' icon. Fill in event details, pricing, and publish.",
    },
    {
      id: 2,
      question: "Managing ticket sales?",
      answer: "Track sales and revenue from the event dashboard in real time.",
    },
    {
      id: 3,
      question: "How to check in attendees?",
      answer:
        "Scan QR codes using the built-in scanner or search attendees manually.",
    },
    {
      id: 4,
      question: "Payment and payout information?",
      answer:
        "Payouts are processed 3–5 business days after the event concludes.",
    },
  ];

  const toggleFAQ = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenFAQ(openFAQ === id ? null : id);
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
          Help & Support
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
      >
        {/* ================= FAQ ================= */}
        <Section title="Frequently Asked Questions" />

        <View className="rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card overflow-hidden">
          {faqs.map((faq) => (
            <View
              key={faq.id}
              className="border-b border-light-border dark:border-dark-border last:border-b-0"
            >
              <TouchableOpacity
                onPress={() => toggleFAQ(faq.id)}
                activeOpacity={0.85}
                className="flex-row justify-between items-center px-4 py-4"
              >
                <Text className="flex-1 pr-4 text-base font-medium text-light-text dark:text-dark-text">
                  {faq.question}
                </Text>

                <MaterialIcons
                  name={openFAQ === faq.id ? "expand-less" : "expand-more"}
                  size={26}
                  color={isDark ? "#9CA3AF" : "#6B7280"}
                />
              </TouchableOpacity>

              {openFAQ === faq.id && (
                <View className="px-4 pb-4">
                  <Text className="text-sm leading-6 text-light-muted dark:text-dark-muted">
                    {faq.answer}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* ================= CONTACT SUPPORT ================= */}
        <Section title="Contact Support" />

        <View className="rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card overflow-hidden">
          {/* Email */}
          <SupportRow
            icon="mail"
            label="Email Support"
            onPress={() => Linking.openURL("mailto:support@smashlive.com")}
          />

          {/* Live Chat */}
          <SupportRow
            icon="chat-bubble"
            label="Live Chat"
            onPress={() =>
              Alert.alert("Live Chat", "Connecting you to support…")
            }
            last
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

/* ================= REUSABLE ================= */

function Section({ title }: { title: string }) {
  return (
    <View className="mt-4 mb-3">
      <Text className="text-lg font-semibold text-light-text dark:text-dark-text">
        {title}
      </Text>
    </View>
  );
}

function SupportRow({
  icon,
  label,
  onPress,
  last,
}: {
  icon: any;
  label: string;
  onPress: () => void;
  last?: boolean;
}) {
  const isDark = useColorScheme() === "dark";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className={`flex-row items-center justify-between px-4 py-5 ${
        !last ? "border-b border-light-border dark:border-dark-border" : ""
      }`}
    >
      <View className="flex-row items-center gap-4">
        <View className="h-11 w-11 rounded-full bg-primary/20 items-center justify-center">
          <MaterialIcons name={icon} size={22} color="#8AFF1A" />
        </View>

        <Text className="text-base font-medium text-light-text dark:text-dark-text">
          {label}
        </Text>
      </View>

      <MaterialIcons
        name="chevron-right"
        size={26}
        color={isDark ? "#9CA3AF" : "#6B7280"}
      />
    </TouchableOpacity>
  );
}
