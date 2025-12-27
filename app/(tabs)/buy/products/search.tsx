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
import { SafeAreaView } from "react-native-safe-area-context";

/* ================= DATA ================= */

const PRODUCTS = [
  {
    id: "1",
    name: "Vaporfly 3",
    price: 260,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    name: "Alphafly 3",
    price: 285,
    image:
      "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    name: "Pegasus 41",
    price: 140,
    image:
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    name: "Invincible 3",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "5",
    name: "Zoom Fly 5",
    price: 170,
    image:
      "https://images.unsplash.com/photo-1528701800489-20be3c54a28a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "6",
    name: "InfinityRN 4",
    price: 160,
    image:
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=800&q=80",
  },
];

/* ================= TYPES ================= */

type SortType = "NONE" | "PRICE_LOW" | "PRICE_HIGH";
type PriceFilter = "UNDER_150" | "BETWEEN_150_200" | "ABOVE_200";

/* ================= SCREEN ================= */

export default function SearchResultsScreen() {
  const { query } = useLocalSearchParams<{ query: string }>();
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const iconColor = isDark ? "#9ca3af" : "#6c757d";

  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState<SortType>("NONE");

  const [priceFilters, setPriceFilters] = useState<PriceFilter[]>([]);
  const [tempFilters, setTempFilters] = useState<PriceFilter[]>([]);

  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  /* ================= FAKE API ================= */

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [query]);

  /* ================= FILTER + SORT ================= */

  const data = useMemo(() => {
    let list = [...PRODUCTS];

    if (priceFilters.length > 0) {
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
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      {/* ================= HEADER ================= */}
      <View className="flex-row items-center justify-between px-4 py-4">
        <View className="flex-row items-center gap-2">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="arrow-back"
              size={24}
              color={isDark ? "#9ca3af" : "#6c757d"}
            />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-text-primary dark:text-white">
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
        <View className="flex-row items-center h-12 rounded-xl bg-white dark:bg-slate-800 px-4 border border-slate-200 dark:border-slate-700">
          <Ionicons name="search" size={20} color={iconColor} />
          <TextInput
            defaultValue={query}
            placeholder="Search in products"
            placeholderTextColor={iconColor}
            className="flex-1 ml-2 text-base text-text-primary dark:text-white"
          />
        </View>
      </View>

      {/* ================= CHIPS ================= */}
      <View className="flex-row gap-3 px-4 pb-3">
        <ActionChip
          icon="swap-vert"
          label="Sort By"
          onPress={() => setShowSort(true)}
        />
        <ActionChip
          icon="tune"
          label={`Filters${priceFilters.length ? ` (${priceFilters.length})` : ""}`}
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
              onPress={() =>
                router.push({
                  pathname: "/buy/products/[productId]",
                  params: { productId: item.id },
                })
              }
              className="flex-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-4"
            >
              <Image
                source={{ uri: item.image }}
                className="w-full aspect-square"
              />
              <View className="p-3">
                <Text
                  numberOfLines={1}
                  className="text-base font-medium text-text-primary dark:text-white"
                >
                  {item.name}
                </Text>
                <Text className="text-sm text-text-secondary">
                  ${item.price}
                </Text>
              </View>
              <View className="px-3 pb-3">
                <View className="h-10 rounded-lg bg-primary items-center justify-center">
                  <Text className="text-white font-bold text-sm">
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
        <Text className="text-lg font-bold mb-4 text-text-primary dark:text-white">
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
            <Text className="text-slate-500">Clear</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setPriceFilters(tempFilters);
              setShowFilter(false);
            }}
          >
            <Text className="text-primary font-bold">Apply</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}

/* ================= HELPERS ================= */

function toggle<T>(arr: T[], setArr: (v: T[]) => void, item: T) {
  setArr(arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]);
}

/* ================= UI COMPONENTS ================= */

function ActionChip({ label, icon, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center gap-2 h-10 px-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
    >
      <MaterialIcons name={icon} size={18} color="#6c757d" />
      <Text className="text-sm font-medium text-text-primary dark:text-white">
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
        color={checked ? "#0d59f2" : "#6c757d"}
      />
      <Text className="ml-3 text-base text-text-primary dark:text-white">
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
        <View className="bg-white dark:bg-slate-900 rounded-t-2xl p-4">
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

function SheetOption({ label, onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress} className="py-4">
      <Text className="text-base font-medium text-text-primary dark:text-white">
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function SkeletonGrid() {
  return (
    <View className="px-4">
      {[1, 2, 3, 4].map((i) => (
        <View key={i} className="flex-row gap-4 mb-4">
          <View className="flex-1 h-64 rounded-xl bg-slate-200 dark:bg-slate-700" />
          <View className="flex-1 h-64 rounded-xl bg-slate-200 dark:bg-slate-700" />
        </View>
      ))}
    </View>
  );
}
