import { defineStore } from "pinia";
import { Preferences } from "@capacitor/preferences";

/* checking if preferences is importned */
if (Preferences && typeof Preferences === "object") {
  console.log("Preferences is imported!");
} else {
  console.log("Preferences is not imported!");
}

// Helper functions for storage with platform detection
async function saveAuthData(key, value) {
  try {
    // Try Capacitor Preferences first (for native platforms)
    await Preferences.set({
      key,
      value: JSON.stringify(value),
    });
  } catch (e) {
    // Fallback to localStorage for web
    localStorage.setItem(key, JSON.stringify(value));
  }
}

async function getAuthData(key) {
  try {
    // Try Capacitor Preferences first
    const { value } = await Preferences.get({ key });
    return value ? JSON.parse(value) : null;
  } catch (e) {
    // Fallback to localStorage
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
}

async function removeAuthData(key) {
  try {
    // Try Capacitor Preferences first
    await Preferences.remove({ key });
  } catch (e) {
    // Fallback to localStorage
    localStorage.removeItem(key);
  }
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    async signIn(email, password) {
      console.log("Attempting to sign in from Pinia Store...");
      const client = useSupabaseClient();
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      });

      if (data?.user) {
        this.isLoggedIn = true;

        // Store auth data using our helper
        await saveAuthData("auth-user", data.user);
        await saveAuthData("auth-session", data.session);

        console.log("Sign in successful, state updated in Pinia Store.");
      }
      if (error) {
        console.log("Sign in error:", error.message);
      }
      return { data, error };
    },

    async signOut() {
      try {
        const client = useSupabaseClient();
        await client.auth.signOut();
        this.isLoggedIn = false;

        // Clear stored auth data
        await removeAuthData("auth-user");
        await removeAuthData("auth-session");

        console.log("Sign out successful, state updated in Pinia Store.");
        return { error: null };
      } catch (error) {
        console.error("Sign out error:", error.message);
        return { error: error.message };
      }
    },

    checkUser(user) {
      console.log("Checking user from Pinia Store...");
      this.isLoggedIn = !!user;
      console.log(
        "User check completed: Logged in status is now",
        this.isLoggedIn
      );
    },

    // Add method to restore session on app startup
    async restoreSession() {
      try {
        const sessionData = await getAuthData("auth-session");

        if (!sessionData) {
          console.log("No saved session found");
          return false;
        }

        const client = useSupabaseClient();

        // Set the session in Supabase client
        const { data, error } = await client.auth.setSession({
          access_token: sessionData.access_token,
          refresh_token: sessionData.refresh_token,
        });

        if (error) {
          console.error("Error restoring session:", error.message);
          await this.signOut();
          return false;
        }

        this.isLoggedIn = true;
        console.log("Session restored successfully");
        return true;
      } catch (e) {
        console.error("Error parsing saved session:", e);
        return false;
      }
    },
  },
});
