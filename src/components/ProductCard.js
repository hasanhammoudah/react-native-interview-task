import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProductCard({
  item,
  onPress,
  onToggleFavorite,
  isFavorite,
  onAddToCart,
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.item_image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.item_name}
        </Text>
        <Text style={styles.category}>{item.item_category}</Text>
        <Text style={styles.price}>${item.item_price}</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onToggleFavorite}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={22}
              color={isFavorite ? "#dc2626" : "#9ca3af"}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={onAddToCart}>
            <Ionicons name="cart-outline" size={22} color="#2563eb" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 20,
  },
  image: {
    width: 90,
    height: 90,
  },
  info: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  category: {
    fontSize: 12,
    color: "#6b7280",
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#16a34a",
  },
  actions: {
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    justifyContent: "space-between",
    right: 12,
    top: 12,
    bottom: 12,
  },
  iconButton: {
    marginVertical: 6,
  },
});
