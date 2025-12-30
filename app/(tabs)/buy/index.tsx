import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

/* ================= DATA ================= */

const PRODUCTS = [
  {
    id: "1",
    name: "Vaporfly 3",
    price: 260,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: "2",
    name: "Alphafly 3",
    price: 285,
    image: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
  },
  {
    id: "3",
    name: "Pegasus 41",
    price: 140,
    image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111",
  },
  {
    id: "4",
    name: "Invincible 3",
    price: 180,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
  },
  {
    id: "5",
    name: "Zoom Fly 5",
    price: 170,
    image: "https://images.unsplash.com/photo-1528701800489-20be3c54a28a",
  },
  {
    id: "6",
    name: "InfinityRN 4",
    price: 160,
    image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f",
  },
];

type SortType = "NONE" | "PRICE_LOW" | "PRICE_HIGH";
type PriceFilter = "UNDER_150" | "BETWEEN_150_200" | "ABOVE_200";

/* ================= SCREEN ================= */

export default function SearchResultsScreen() {
  const { query } = useLocalSearchParams<{ query: string }>();
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState<SortType>("NONE");
  const [priceFilters, setPriceFilters] = useState<PriceFilter[]>([]);
  const [tempFilters, setTempFilters] = useState<PriceFilter[]>([]);
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, [query]);

  const data = useMemo(() => {
    let list = [...PRODUCTS];

    if (priceFilters.length) {
      list = list.filter(
        (p) =>
          (priceFilters.includes("UNDER_150") && p.price < 150) ||
          (priceFilters.includes("BETWEEN_150_200") &&
            p.price >= 150 &&
            p.price <= 200) ||
          (priceFilters.includes("ABOVE_200") && p.price > 200)
      );
    }

    if (sortType === "PRICE_LOW") list.sort((a, b) => a.price - b.price);
    if (sortType === "PRICE_HIGH") list.sort((a, b) => b.price - a.price);

    return list;
  }, [sortType, priceFilters]);

  return (
    <ScreenWrapper>
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center justify-between px-4 py-4">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={iconColor} />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
            Buy
          </Text>
        </View>

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
      <View className="px-4 py-3">
        <View className="flex-row items-center h-12 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border px-4">
          <Ionicons name="search" size={20} color={iconColor} />
          <TextInput
            defaultValue={query}
            placeholder="Search in products"
            placeholderTextColor={iconColor}
            className="flex-1 ml-2 text-base text-light-text dark:text-dark-text"
          />
        </View>
      </View>

      {/* ================= CHIPS ================= */}
      <View className="flex-row gap-3 px-4 pb-3">
        <ActionChip
          label="Sort By"
          icon="swap-vert"
          onPress={() => setShowSort(true)}
        />
        <ActionChip
          label={`Filters${priceFilters.length ? ` (${priceFilters.length})` : ""}`}
          icon="tune"
          onPress={() => {
            setTempFilters(priceFilters);
            setShowFilter(true);
          }}
        />
      </View>

      {/* ================= GRID ================= */}
      {loading ? (
        <SkeletonGrid />
      ) : (
        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          columnWrapperStyle={{ gap: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push(`/buy/products/${item.id}`)}
              className="flex-1 bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border overflow-hidden mb-4"
            >
              <Image
                source={{ uri: item.image }}
                className="w-full aspect-square"
              />
              <View className="p-3">
                <Text
                  numberOfLines={1}
                  className="text-base font-medium text-light-text dark:text-dark-text"
                >
                  {item.name}
                </Text>
                <Text className="text-sm text-light-muted dark:text-dark-muted">
                  ${item.price}
                </Text>
              </View>
              <View className="px-3 pb-3">
                <View className="h-10 rounded-lg bg-primary items-center justify-center">
                  <Text className="text-black font-bold text-sm">
                    Add to Cart
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* ================= SORT ================= */}
      <BottomSheet visible={showSort} onClose={() => setShowSort(false)}>
        <SheetOption
          label="Price: Low to High"
          onPress={() => {
            setSortType("PRICE_LOW");
            setShowSort(false);
          }}
        />
        <SheetOption
          label="Price: High to Low"
          onPress={() => {
            setSortType("PRICE_HIGH");
            setShowSort(false);
          }}
        />
      </BottomSheet>

      {/* ================= FILTER ================= */}
      <BottomSheet visible={showFilter} onClose={() => setShowFilter(false)}>
        <Text className="text-lg font-bold mb-4 text-light-text dark:text-dark-text">
          Price
        </Text>

        <Checkbox
          label="Under $150"
          checked={tempFilters.includes("UNDER_150")}
          onPress={() => toggle(tempFilters, setTempFilters, "UNDER_150")}
        />
        <Checkbox
          label="$150 – $200"
          checked={tempFilters.includes("BETWEEN_150_200")}
          onPress={() => toggle(tempFilters, setTempFilters, "BETWEEN_150_200")}
        />
        <Checkbox
          label="Above $200"
          checked={tempFilters.includes("ABOVE_200")}
          onPress={() => toggle(tempFilters, setTempFilters, "ABOVE_200")}
        />

        <View className="flex-row justify-between mt-6">
          <TouchableOpacity
            onPress={() => {
              setTempFilters([]);
              setPriceFilters([]);
              setShowFilter(false);
            }}
          >
            <Text className="text-light-muted dark:text-dark-muted">Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPriceFilters(tempFilters);
              setShowFilter(false);
            }}
          >
            <Text className="text-primary font-medium">Apply</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </ScreenWrapper>
  );
}

/* ================= HELPERS ================= */

function toggle<T>(arr: T[], setArr: (v: T[]) => void, item: T) {
  setArr(arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]);
}

/* ================= UI COMPONENTS ================= */

function ActionChip({ label, icon, onPress }: any) {
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9CA3AF" : "#6B7280";

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center gap-2 h-10 px-4 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border"
    >
      <MaterialIcons name={icon} size={18} color={iconColor} />
      <Text className="text-sm font-medium text-light-text dark:text-dark-text">
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function Checkbox({ label, checked, onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center py-3">
      <Ionicons
        name={checked ? "checkbox" : "square-outline"}
        size={22}
        color={checked ? "#8AFF1A" : "#6B7280"}
      />
      <Text className="ml-3 text-base text-light-text dark:text-dark-text">
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function BottomSheet({ visible, children, onClose }: any) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableOpacity
        onPress={onClose}
        className="flex-1 bg-black/40 justify-end"
      >
        <View className="bg-light-bg dark:bg-dark-bg rounded-t-2xl p-4">
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

function SheetOption({ label, onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress} className="py-4">
      <Text className="text-base font-medium text-light-text dark:text-dark-text">
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function SkeletonGrid() {
  return (
    <View className="px-4">
      {[1, 2].map((i) => (
        <View key={i} className="flex-row gap-4 mb-4">
          <View className="flex-1 h-64 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border" />
          <View className="flex-1 h-64 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border" />
        </View>
      ))}
    </View>
  );
}
