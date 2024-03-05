export default defineNuxtRouteMiddleware((to, from) => {
    console.log(to, from, "this is the middleware")
})
