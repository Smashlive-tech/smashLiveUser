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
import { SafeAreaView } from "react-native-safe-area-context";

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
        colors: ["#ef4444", "black", "#2563eb"],
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

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const [showDescription, setShowDescription] = useState(true);
  const [showSpecs, setShowSpecs] = useState(false);

  useEffect(() => {
    if (!productId) return;

    setLoading(true);
    fetchProduct(productId).then((res) => {
      setProduct(res);
      setSelectedColor(res.colors[0]);
      setLoading(false);
    });
  }, [productId]);

  if (loading || !product) {
    return (
      <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark items-center justify-center">
        <Text className="text-text-secondary">Loading product...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      {/* ================= TOP BAR ================= */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDark ? "#9ca3af" : "#6c757d"}
          />
        </TouchableOpacity>

        <Text className="flex-1 ml-3 text-xl font-bold text-text-primary dark:text-white">
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
        <Text className="px-4 pt-4 text-[30px] font-bold text-text-primary dark:text-white">
          {product.name}
        </Text>

        {/* PRICE + RATING */}
        <View className="flex-row justify-between items-center px-4 pt-2">
          <Text className="text-3xl font-bold text-text-primary dark:text-white">
            ${product.price.toFixed(2)}
          </Text>
          <Text className="text-sm text-text-secondary">
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

        {/* ================= DETAILS (SAME AS TOURNAMENT) ================= */}
        <View className="px-4 pt-6 gap-4">
          {/* DESCRIPTION */}
          <View className="rounded-xl bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700">
            <TouchableOpacity
              onPress={() => setShowDescription(!showDescription)}
              className="flex-row items-center justify-between"
            >
              <Text className="text-base font-semibold text-text-primary dark:text-white">
                Description
              </Text>
              <Ionicons
                name={showDescription ? "chevron-up" : "chevron-down"}
                size={20}
                color={isDark ? "#9ca3af" : "#6c757d"}
              />
            </TouchableOpacity>

            {showDescription && (
              <Text className="pt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {product.description}
              </Text>
            )}
          </View>

          {/* SPECIFICATIONS */}
          <View className="rounded-xl bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700">
            <TouchableOpacity
              onPress={() => setShowSpecs(!showSpecs)}
              className="flex-row items-center justify-between"
            >
              <Text className="text-base font-semibold text-text-primary dark:text-white">
                Specifications
              </Text>
              <Ionicons
                name={showSpecs ? "chevron-up" : "chevron-down"}
                size={20}
                color={isDark ? "#9ca3af" : "#6c757d"}
              />
            </TouchableOpacity>

            {showSpecs && (
              <View className="pt-3 gap-2">
                {product.specs.map((s) => (
                  <Text
                    key={s}
                    className="text-sm text-slate-600 dark:text-slate-400"
                  >
                    • {s}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* ================= CTA (SAME AS TOURNAMENT STYLE) ================= */}
      <View className="absolute bottom-0 left-0 right-0 bg-background-light dark:bg-background-dark px-4 py-4 border-t border-slate-200 dark:border-slate-700">
        <View className="flex-row gap-4">
          {/* BUY NOW */}
          <TouchableOpacity className="flex-1 h-14 rounded-xl bg-slate-200 dark:bg-slate-700 items-center justify-center">
            <Text className="text-text-primary dark:text-white text-base font-bold">
              Buy Now
            </Text>
          </TouchableOpacity>

          {/* ADD TO CART */}
          <TouchableOpacity className="flex-1 h-14 rounded-xl bg-primary items-center justify-center">
            <Text className="text-white text-base font-bold">Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
