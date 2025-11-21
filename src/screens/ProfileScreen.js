import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import loginData from "../data/login.json";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    username = "quest",
    favoritesCount = 0,
    cartCount = 0,
  } = route.params || {};

  const displayName = username.charAt(0).toUpperCase() + username.slice(1);

  const loggedUser = loginData.users.find((u) => u.username === username) || {};

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{displayName.charAt(0)}</Text>
          </View>
          <View>
            <Text style={styles.name}>{loggedUser.name || displayName}</Text>
            <Text style={styles.role}>Marketplace User</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account information</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Username</Text>
            <Text style={styles.value}>{username}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{username}@demo.com</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.value}>Active</Text>
          </View>
        </View>

        {/* Activity summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Activity</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Favorite items</Text>
            <Text style={styles.value}>{favoritesCount}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Cart items</Text>
            <Text style={styles.value}>{cartCount}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.replace("Login")}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
  },
  role: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    color: "#6b7280",
  },
  value: {
    fontSize: 13,
    fontWeight: "500",
    color: "#111827",
  },
  footer: {
    marginTop: 16,
  },
  footerText: {
    fontSize: 12,
    color: "#9ca3af",
    textAlign: "center",
  },
  logoutButton:{
    marginTop:24,
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  }
});
