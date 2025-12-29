import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

/* ================= DATA ================= */

const BANNERS = [
  {
    id: "1",
    title: "Summer Sale",
    subtitle: "Up to 50% off on selected running shoes!",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: "2",
    title: "New Arrivals",
    subtitle: "Latest sports gear just dropped",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
  },
];

const FEATURED_PRODUCTS = [
  {
    id: "1",
    name: "Velocity Runners",
    brand: "Nike · $120",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: "2",
    name: "Aero Pro Racket",
    brand: "Wilson · $199",
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    name: "Court Vision Hoops",
    brand: "Nike · $150",
    image: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
  },
  {
    id: "4",
    name: "Pro Yoga Mat",
    brand: "Lululemon · $88",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
  },
];

const RECOMMENDED = [
  {
    id: "1",
    name: "Dry-Fit Training Tee",
    brand: "Adidas · $45",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  },
  {
    id: "2",
    name: "Power Grip Gloves",
    brand: "Reebok · $30",
    image: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642",
  },
  {
    id: "3",
    name: "Smart Fitness Band",
    brand: "Fitbit · $129",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf",
  },
];

/* ================= SCREEN ================= */

export default function BuyScreen() {
  const isDark = useColorScheme() === "dark";
  const router = useRouter();
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";
  const [search, setSearch] = React.useState("");

  return (
    <ScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ================= HEADER ================= */}
        <View className="flex-row items-center justify-between px-4 py-4">
          <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
            Buy
          </Text>

          <View className="flex-row gap-4">
            <TouchableOpacity onPress={() => router.push("/buy/orders")}>
              <MaterialIcons name="receipt-long" size={24} color={iconColor} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/buy/cart")}>
              <Ionicons name="cart-outline" size={24} color={iconColor} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= SEARCH ================= */}
        <View className="px-4">
          <View className="flex-row items-center h-12 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border px-4">
            <Ionicons name="search" size={20} color={iconColor} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              onSubmitEditing={() => {
                if (search.trim()) {
                  router.push({
                    pathname: "/buy/products/search",
                    params: { query: search },
                  });
                }
              }}
              placeholder="Search for gear, brands..."
              placeholderTextColor={iconColor}
              className="flex-1 ml-2 text-base text-light-text dark:text-dark-text"
            />
          </View>
        </View>

        {/* ================= CAROUSEL ================= */}
        <View className="py-3">
          <Carousel
            width={width}
            height={width / 2}
            data={BANNERS}
            autoPlay
            loop
            scrollAnimationDuration={1200}
            renderItem={({ item }) => (
              <View className="px-4">
                <View className="rounded-xl overflow-hidden">
                  <Image
                    source={{ uri: item.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                  <View className="absolute inset-0 bg-black/40 justify-end p-5">
                    <Text className="text-white text-2xl font-bold">
                      {item.title}
                    </Text>
                    <Text className="text-white/80 text-sm mt-1">
                      {item.subtitle}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>

        {/* ================= FEATURED ================= */}
        <SectionHeader title="Featured Products" />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="pl-4"
        >
          {FEATURED_PRODUCTS.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => router.push(`/buy/products/${item.id}`)}
            >
              <ProductCard
                image={item.image}
                name={item.name}
                brand={item.brand}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ================= RECOMMENDED ================= */}
        <SectionHeader title="Recommended for You" />

        <View className="px-4">
          {RECOMMENDED.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => router.push(`/buy/products/${item.id}`)}
              className="flex-row mb-4 rounded-xl bg-light-card dark:bg-dark-card p-3 border border-light-border dark:border-dark-border"
            >
              <Image
                source={{ uri: item.image }}
                className="w-24 h-24 rounded-lg"
              />
              <View className="flex-1 ml-3 justify-center">
                <Text className="text-base font-semibold text-light-text dark:text-dark-text">
                  {item.name}
                </Text>
                <Text className="text-sm text-light-muted dark:text-dark-muted mt-1">
                  {item.brand}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ================= CATEGORIES ================= */}
        <SectionHeader title="Shop by Category" />

        <View className="flex-row flex-wrap justify-between px-4 pb-10">
          <CategoryCard title="Running" icon="walk-outline" />
          <CategoryCard title="Tennis" icon="tennisball-outline" />
          <CategoryCard title="Apparel" icon="shirt-outline" />
          <CategoryCard title="Accessories" icon="barbell-outline" />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

/* ================= COMPONENTS ================= */

function SectionHeader({ title }: { title: string }) {
  return (
    <View className="px-4 pt-6 pb-3">
      <Text className="text-[22px] font-bold text-light-text dark:text-dark-text">
        {title}
      </Text>
    </View>
  );
}

function ProductCard({
  image,
  name,
  brand,
}: {
  image: string;
  name: string;
  brand: string;
}) {
  return (
    <View className="mr-4 w-60">
      <Image
        source={{ uri: image }}
        className="w-full aspect-square rounded-xl"
      />
      <Text className="mt-2 text-base font-medium text-light-text dark:text-dark-text">
        {name}
      </Text>
      <Text className="text-sm text-light-muted dark:text-dark-muted">
        {brand}
      </Text>
    </View>
  );
}

function CategoryCard({
  title,
  icon,
}: {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}) {
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  return (
    <TouchableOpacity
      className="
        w-[48%] aspect-square mb-4 rounded-xl
        bg-light-card dark:bg-dark-card
        border border-light-border dark:border-dark-border
        items-center justify-center
      "
    >
      <Ionicons name={icon} size={36} color={iconColor} />
      <Text className="mt-2 text-base font-medium text-light-text dark:text-dark-text">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
