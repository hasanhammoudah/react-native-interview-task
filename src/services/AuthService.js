import loginData from "../data/login.json";

export class AuthService {
  static login(username, password) {
    if (!username || !password) {
      return { ok: false, error: "Both username and password are required." };
    }
    const user = loginData.users.find(
      (u) => u.username === username && u.password === password
    );
    if (!user) {
      return { ok: false, error: "Invalid credentials." };
    }
    return { ok: true, user };
  }
}
