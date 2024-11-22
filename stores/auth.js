// // stores/auth.js
// import { defineStore } from "pinia";

// console.log("auth store loaded");

// export const useAuthStore = defineStore("auth", {
//   state: () => ({
//     isLoggedIn: false, // Boolean to track if user is logged in
//   }),
//   actions: {
//     logIn() {
//       this.isLoggedIn = true; // Set login state to true
//       console.log("User logged in FROM PINIA");
//     },
//     logOut() {
//       this.isLoggedIn = false; // Set login state to false
//       console.log("User logged out FROM PINIA");
//     },
//     checkUser(user) {
//       this.isLoggedIn = !!user; // Update login state based on user presence
//     },
//   },
// });

// stores/auth.js
import { defineStore } from "pinia";

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
      if (data.user) {
        this.isLoggedIn = true;
        console.log("Sign in successful, state updated in Pinia Store.");
      }
      if (error) {
        console.log("Sign in error:", error.message);
      }
      return { data, error };
    },
    // Inside your Pinia store
    async signOut() {
      try {
        const client = useSupabaseClient();
        await client.auth.signOut();
        this.isLoggedIn = false;
        console.log("Sign out successful, state updated in Pinia Store.");
        return { error: null };
      } catch (error) {
        console.error("Sign out error:", error.message);
        return { error: error.message }; // Make sure to return an error message
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
  },
});
