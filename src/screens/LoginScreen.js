import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthService } from "../services/AuthService";


export default function LoginScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  const handleChangeUsername = (text) => {
    setUsername(text);
    if (usernameError) setUsernameError("");
    if (formError) setFormError("");
  };

  const handleChangePassword = (text) => {
    setPassword(text);
    if (passwordError) setPasswordError("");
    if (formError) setFormError("");
  };

  const handleLogin = () => {    
    setUsernameError("");
    setPasswordError("");
    setFormError("");

    let isValid = true;

    if (!username.trim()) {
      setUsernameError("Username is required");
      isValid = false;
    }
    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (!isValid) return;

    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    const result = AuthService.login(username,password);
      if (!result.ok) {
      alert(result.error);
      return;
    }
    const user = result.user;
    if (result) {
      navigation.replace("Marketplace", { username:user.username });
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Please log in to continue</Text>

      <TextInput
        style={[styles.input, usernameError ? styles.inputErrorBorder : null]}
        placeholder="Enter your username"
        value={username}
        onChangeText={handleChangeUsername}
        autoCapitalize="none"
      />
      {usernameError ? (
        <Text style={styles.errorText}>{usernameError}</Text>
      ) : null}
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, passwordError ? styles.inputErrorBorder : null]}
          placeholder="Enter your password"
          value={password}
          onChangeText={handleChangePassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color="#6b7280"
          />
        </TouchableOpacity>
      </View>
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      {formError ? <Text style={styles.formErrorText}>{formError}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forget Password?</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Dont have an account?</Text>
        <TouchableOpacity>
          <Text style={styles.footerLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 200,
    backgroundColor: "#f4f4f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 12,
  },
  passwordContainer: {
    position: "relative",
    justifyContent: "center",
  },

  eyeButton: {
    position: "absolute",
    right: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "right",
    paddingBottom: 6,
  },
  inputErrorBorder: {
    borderColor: "#dc2626",
  },
  errorText: {
    color: "#dc2626",
    marginBottom: 8,
    fontSize: 13,
  },
  formErrorText: {
    color: "#dc2626",
    marginBottom: 12,
    fontSize: 14,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },

  forgotPassword: {
    color: "#2563eb",
    textAlign: "right",
    marginTop: 16,
    fontSize: 13,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },

  footerText: {
    color: "#6b7280",
    marginRight: 4,
  },
  footerLink: {
    color: "#2563eb",
    fontWeight: "600",
  },
});
