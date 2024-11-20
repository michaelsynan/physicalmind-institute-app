export default defineNuxtConfig({
  head: {
    title: "PhysicalMind Institute",
    link: [
      {
        rel: "icon",
        type: "image/png",
        href: "/logo.png", // path to your logo image in the public folder
      },
      {
        rel: "apple-touch-icon",
        type: "image/png",
        href: "/logo.png", // for iOS and other devices
      },
    ],
  },
  // colorMode: {
  //   preference: "light",
  // },
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
  ],
  css: ["/theme/variables.css", "/assets/css/main.css"],

  redirectOptions: {
    login: "/login",
    callback: "/confirm",
    // include: undefined,
    // exclude: [],
    // cookieRedirect: false,
  },

  ionic: {
    integrations: {},
    css: {
      utilities: true,
    },
  },

  compatibilityDate: "2024-07-30",
});
