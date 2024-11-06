// stores/auth.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false, // Boolean to track if user is logged in
  }),
  actions: {
    logIn() {
      this.isLoggedIn = true; // Set login state to true
    },
    logOut() {
      this.isLoggedIn = false; // Set login state to false
    },
    checkUser(user) {
      this.isLoggedIn = !!user; // Update login state based on user presence
    },
  },
});
