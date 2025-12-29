import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

/* ================= TYPES ================= */

type Product = {
  id: string;
  brand: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  colors: string[];
  description: string;
  specs: string[];
};

/* ================= MOCK FETCH ================= */

function fetchProduct(productId: string): Promise<Product> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: productId,
        brand: "Yonex",
        name: "Astrox 99 Pro",
        price: 199.99,
        rating: 4.5,
        reviews: 1248,
        image:
          "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80",
        colors: ["#ef4444", "#000000", "#2563eb"],
        description:
          "The Yonex Astrox 99 Pro is built for aggressive badminton players. It delivers explosive smashes with excellent control.",
        specs: [
          "Balance: Head Heavy",
          "Flex: Stiff",
          "Frame: High Modulus Graphite",
          "Skill Level: Advanced",
        ],
      });
    }, 900);
  });
}

/* ================= SCREEN ================= */

export default function ProductDetailScreen() {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const [showDescription, setShowDescription] = useState(true);
  const [showSpecs, setShowSpecs] = useState(false);

  useEffect(() => {
    if (!productId) return;
    fetchProduct(productId).then((res) => {
      setProduct(res);
      setSelectedColor(res.colors[0]);
      setLoading(false);
    });
  }, [productId]);

  if (loading || !product) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center">
          <Text className="text-light-muted dark:text-dark-muted">
            Loading product…
          </Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center gap-3 px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>

        <Text className="text-xl font-bold text-light-text dark:text-dark-text">
          Buy
        </Text>
      </View>

      {/* ================= CONTENT ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* IMAGE */}
        <View className="px-4 pt-2">
          <Image
            source={{ uri: product.image }}
            className="w-full h-60 rounded-2xl"
            resizeMode="cover"
          />
        </View>

        {/* TITLE */}
        <Text className="px-4 pt-4 text-[30px] font-bold text-light-text dark:text-dark-text">
          {product.name}
        </Text>

        {/* PRICE + RATING */}
        <View className="flex-row justify-between items-center px-4 pt-2">
          <Text className="text-3xl font-bold text-light-text dark:text-dark-text">
            ${product.price.toFixed(2)}
          </Text>
          <Text className="text-sm text-light-muted dark:text-dark-muted">
            ⭐ {product.rating} ({product.reviews})
          </Text>
        </View>

        {/* COLORS */}
        <View className="flex-row gap-3 px-4 pt-4">
          {product.colors.map((color) => (
            <TouchableOpacity
              key={color}
              onPress={() => setSelectedColor(color)}
              className={`h-10 w-10 rounded-full ${
                selectedColor === color ? "ring-2 ring-primary" : ""
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </View>

        {/* ================= DETAILS ================= */}
        <View className="px-4 pt-6 gap-4">
          {/* DESCRIPTION */}
          <View className="rounded-xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border">
            <TouchableOpacity
              onPress={() => setShowDescription(!showDescription)}
              className="flex-row items-center justify-between"
            >
              <Text className="text-base font-semibold text-light-text dark:text-dark-text">
                Description
              </Text>
              <Ionicons
                name={showDescription ? "chevron-up" : "chevron-down"}
                size={20}
                color={iconColor}
              />
            </TouchableOpacity>

            {showDescription && (
              <Text className="pt-3 text-sm leading-6 text-light-muted dark:text-dark-muted">
                {product.description}
              </Text>
            )}
          </View>

          {/* SPECIFICATIONS */}
          <View className="rounded-xl bg-light-card dark:bg-dark-card p-4 border border-light-border dark:border-dark-border">
            <TouchableOpacity
              onPress={() => setShowSpecs(!showSpecs)}
              className="flex-row items-center justify-between"
            >
              <Text className="text-base font-semibold text-light-text dark:text-dark-text">
                Specifications
              </Text>
              <Ionicons
                name={showSpecs ? "chevron-up" : "chevron-down"}
                size={20}
                color={iconColor}
              />
            </TouchableOpacity>

            {showSpecs && (
              <View className="pt-3 gap-2">
                {product.specs.map((s) => (
                  <Text
                    key={s}
                    className="text-sm text-light-muted dark:text-dark-muted"
                  >
                    • {s}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* ================= CTA ================= */}
      <View className="absolute bottom-0 left-0 right-0 bg-light-bg dark:bg-dark-bg px-4 py-4 border-t border-light-border dark:border-dark-border">
        <View className="flex-row gap-4">
          <TouchableOpacity className="flex-1 h-14 rounded-xl bg-light-border dark:bg-dark-border items-center justify-center">
            <Text className="text-light-text dark:text-dark-text text-base font-medium">
              Buy Now
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 h-14 rounded-xl bg-primary items-center justify-center">
            <Text className="text-black text-base font-bold">Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}
