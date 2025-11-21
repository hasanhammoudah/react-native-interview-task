import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ProductCard from "../components/ProductCard";
import { ITEMS } from "../data/items";
import { MarketplaceService } from "../services/MarketplaceService";
import { PAGE_SIZE } from "../constants/pagination";

export default function MarketplaceScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const routeUsername = route.params?.username;
  const username = routeUsername || "Guest";
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);

  const categories = useMemo(() => {
   return MarketplaceService.getCategories(ITEMS);
  }, []);

  const filteredItems = useMemo(
    () => MarketplaceService.filterItems(ITEMS, selectedCategory),
    [selectedCategory]
  );

  const visibleItems = useMemo(
    () => MarketplaceService.paginate(filteredItems, page, PAGE_SIZE),
    [filteredItems, page]
  );

  const canLoadMore = visibleItems.length < filteredItems.length;

  const handleChangeCategory = (category) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handleLoadMore = () => {
    if (canLoadMore) {
      setPage((prev) => prev + 1);
    }
  };

  const renderItem = ({ item }) => {
    return <ProductCard item={item} onPress={() => {}} />;
  };

  const renderCategory = (category) => {
    const isActive = category === selectedCategory;
    return (
      <TouchableOpacity
        key={category}
        style={[styles.chip, isActive && styles.chipActive]}
        onPress={() => handleChangeCategory(category)}
      >
        <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
          {category}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    if (!filteredItems.length) {
      return (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>No items found.</Text>
        </View>
      );
    }

    if (!canLoadMore) {
      return (
        <View style={styles.footerBox}>
          <Text style={styles.footerInfoText}>No more items to load</Text>
        </View>
      );
    }

    return (
      <View style={styles.footerBox}>
        <TouchableOpacity
          style={styles.loadMoreButton}
          onPress={handleLoadMore}
        >
          <Text style={styles.loadMoreText}>Load more</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {username}</Text>
          <Text style={styles.subtitle}>Browse items in the marketplace</Text>
        </View>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() =>
            navigation.navigate("Profile", {
              username,
            })
          }
        >
          <Text style={styles.profileButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterBar}>
        <FlatList
          data={categories}
          horizontal
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipList}
          renderItem={({ item }) => renderCategory(item)}
        />
      </View>

      <FlatList
        data={visibleItems}
        keyExtractor={(item) => item.item_id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
  profileButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  profileButtonText: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
  },
  filterBar: {
    paddingHorizontal: 12,
    paddingBottom: 4,
  },
  chipList: {
    paddingVertical: 4,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginRight: 8,
    backgroundColor: "white",
  },
  chipActive: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },
  chipText: {
    fontSize: 13,
    color: "#4b5563",
  },
  chipTextActive: {
    color: "white",
    fontWeight: "600",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  footerBox: {
    paddingVertical: 12,
    alignItems: "center",
  },
  loadMoreButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#2563eb",
  },
  loadMoreText: {
    color: "#2563eb",
    fontWeight: "600",
    fontSize: 14,
  },
  footerInfoText: {
    fontSize: 13,
    color: "#6b7280",
  },
  emptyBox: {
    paddingVertical: 32,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#6b7280",
  },
});
