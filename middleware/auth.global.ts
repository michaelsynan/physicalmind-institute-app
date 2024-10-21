export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();
  console.log("middleware wokring!");
  if (!user.value && to.path !== "/login") {
    return navigateTo("/login");
  }
});
