export default defineNuxtConfig({
  head: {
    title: 'PhysicalMind Institute',
  },

  devtools: {
    enabled: true
  },
  ssr: false,
  modules: ["@nuxtjs/ionic", '@nuxt/image-edge', "@nuxt/image", '@nuxt/ui', 'nuxt-swiper'],
  css: ["/theme/variables.css", "/assets/css/main.css"],

  ionic: {
    integrations: {},
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
      routes.splice(0, routes.length); // Clear existing auto-generated routes
      // Define more specific route first
      routes.push({
        name: 'instructor-videos',
        path: '/instructors/:slug/videos',
        component: resolve(__dirname, 'pages/instructors/videos/[...all].vue'), // Adjusted to the correct relative path
        priority: 100
      });
      // Define more general route later
      routes.push({
        name: 'instructor',
        path: '/instructors/:slug?',
        component: resolve(__dirname, 'pages/instructors/[...all].vue'), // Adjusted to the correct relative path
        priority: 1
      });
    }
  },

  compatibilityDate: '2024-07-30',
});
