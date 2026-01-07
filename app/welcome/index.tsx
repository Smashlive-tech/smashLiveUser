import ScreenWrapper from "@/components/ScreenWrapper";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: 1,
    title: "Join Leagues and Win.",
    description:
      "Participate in competitive leagues, climb the rankings, and win exciting rewards.",
    image: require("../../assets/images/ob1.png"),
  },
  {
    id: 2,
    title: "Shop Your Club’s Gear.",
    description:
      "Buy merchandised sports accessories and apparel from your favorite sports clubs.",
    image: require("../../assets/images/ob2.png"),
  },
  {
    id: 3,
    title: "Book Play Arenas Instantly.",
    description:
      "Reserve courts and play arenas near you with real-time availability and ease.",
    image: require("../../assets/images/ob3.png"),
  },
  {
    id: 4,
    title: "Connect with Sports People.",
    description:
      "Follow athletes, players, and organizers to stay updated and connected.",
    image: require("../../assets/images/ob4.png"),
  },
];

export default function OrganizerOnboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  const primary = "#8AFF1A";
  const muted = isDark ? "#9CA3AF" : "#475569";

  return (
    <ScreenWrapper>
      {/* ===== Pagination Dots ===== */}
      <View className="flex-row justify-center py-4">
        {slides.map((slide, index) => (
          <View
            key={slide.id}
            className="h-2 w-2 rounded-full mx-1"
            style={{
              backgroundColor:
                currentIndex === index
                  ? primary
                  : isDark
                    ? "#374151"
                    : "#CBD5E1",
            }}
          />
        ))}
      </View>

      {/* ===== Swiper ===== */}
      <SwiperFlatList
        autoplay
        autoplayDelay={3}
        autoplayLoop={false}
        onChangeIndex={({ index }) => setCurrentIndex(index)}
      >
        {slides.map((slide) => (
          <View
            key={slide.id}
            style={{ width }}
            className="flex-1 justify-between px-6"
          >
            {/* Spacer */}
            <View className="h-10" />

            {/* Content */}
            <View className="flex-1 items-center justify-center">
              <ImageBackground
                source={
                  typeof slide.image === "string"
                    ? { uri: slide.image }
                    : slide.image
                }
                resizeMode="contain"
                className="w-full max-w-sm min-h-64 rounded-xl mb-8"
              />

              {/* Title */}
              <Text className="text-light-text dark:text-dark-text text-3xl font-bold text-center leading-tight mb-3">
                {slide.title}
              </Text>

              {/* Description */}
              <Text className="text-light-muted dark:text-dark-muted text-lg text-center leading-relaxed px-4">
                {slide.description}
              </Text>
            </View>
          </View>
        ))}
      </SwiperFlatList>

      {/* ===== Footer ===== */}
      <View className="pb-6">
        {/* Get Started Button */}
        {currentIndex === slides.length - 1 && (
          <View className="px-6 py-3">
            <TouchableOpacity
              className="h-12 rounded-xl items-center justify-center"
              style={{ backgroundColor: primary }}
              onPress={() => router.replace("/(auth)/login")}
              activeOpacity={0.9}
            >
              <Text className="text-black font-bold text-base">
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Skip */}
        <View className="pt-2 items-center mb-10">
          <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
            <Text className="text-sm font-medium" style={{ color: muted }}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}
