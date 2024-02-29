// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true }, 
  ssr: false,
modules: ["@nuxtjs/ionic", '@nuxt/image-edge', "@nuxt/image", '@nuxt/ui', 'nuxt-swiper'],
  css: ["/theme/variables.css", "/assets/css/main.css"],
  ionic: {
    integrations: { },
    css: {
      utilities: true,
    },
  },
  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/duv1h2kk3/image/upload/',
    },
  },
})