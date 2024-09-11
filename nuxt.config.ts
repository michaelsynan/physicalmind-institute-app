export default defineNuxtConfig({
  head: {
    title: "PhysicalMind Institute",
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
  ],
  css: ["/theme/variables.css", "/assets/css/main.css"],

  ionic: {
    integrations: {},
    css: {
      utilities: true,
    },
  },

  compatibilityDate: "2024-07-30",
});
