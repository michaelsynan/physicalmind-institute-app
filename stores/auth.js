// stores/auth.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false, // Boolean to track if user is logged in
  }),
  actions: {
    logIn() {
      this.isLoggedIn = true; // Set login state to true
      console.log("User logged in FROM PINIA");
    },
    logOut() {
      this.isLoggedIn = false; // Set login state to false
      console.log("User logged out FROM PINIA");
    },
    checkUser(user) {
      this.isLoggedIn = !!user; // Update login state based on user presence
    },
  },
});
