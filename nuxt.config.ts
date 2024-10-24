export default defineNuxtConfig({
  head: {
    title: "PhysicalMind Institute",
  },
  serverMiddleware: ["~/middleware/auth.ts"],
  colorMode: {
    preference: "light",
  },

  devtools: {
    enabled: true,
  },
  ssr: false,
  modules: [
    "@nuxtjs/ionic",
    "@nuxt/image-edge",
    "@nuxt/image",
    "@nuxt/ui",
    "nuxt-swiper",
    "@nuxtjs/supabase",
  ],
  css: ["/theme/variables.css", "/assets/css/main.css"],

  redirectOptions: {
    login: "/login",
    callback: "/confirm",
    include: undefined,
    exclude: [],
    cookieRedirect: false,
  },

  ionic: {
    integrations: {},
    css: {
      utilities: true,
    },
  },

  compatibilityDate: "2024-07-30",
});
