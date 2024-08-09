// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  head: {
    title: 'PhysicalMind Institute',},

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
router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'instructor-videos',
        path: '/instructors/:slug/videos',
        component: resolve(__dirname, 'pages/instructors/videos/[...all].vue'),
        priority: 100 // A higher priority to ensure it matches before the less specific route
      });
      routes.push({
        name: 'instructor',
        path: '/instructors/:slug',
        component: resolve(__dirname, 'pages/instructors/[...all].vue'),
        priority: 10
      });
    }
  },router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'instructor-videos',
        path: '/instructors/:slug/videos',
        component: resolve(__dirname, 'pages/instructors/videos/[...all].vue'),
        priority: 100 // A higher priority to ensure it matches before the less specific route
      });
      routes.push({
        name: 'instructor',
        path: '/instructors/:slug',
        component: resolve(__dirname, 'pages/instructors/[...all].vue'),
        priority: 10
      });
    }
  },
  compatibilityDate: '2024-07-30',
})