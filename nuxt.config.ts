export default defineNuxtConfig({
  head: {
    title: "PhysicalMind Institute",
    ui: {
      colorMode: false,
    },
    link: [
      {
        rel: "icon",
        type: "image/png",
        href: "/logo.png",
      },
      {
        rel: "apple-touch-icon",
        type: "image/png",
        href: "/logo.png",
      },
    ],
  },
  colorMode: {
    preference: "system",
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || "http://localhost:3000",
    },
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
    "@nuxtjs/supabase",
    // "@vueuse/nuxt",
    "@pinia/nuxt",
    "nuxt-swiper",
  ],
  css: ["/theme/variables.css", "/assets/css/main.css"],

  redirectOptions: {
    login: "/login",
    callback: "/confirm",
  },

  ionic: {
    integrations: {},
    css: {
      utilities: true,
    },
  },

  compatibilityDate: "2024-07-30",
});