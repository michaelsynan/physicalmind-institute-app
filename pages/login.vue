<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth.js';

const { signIn, signOut } = useAuthStore();
const user = useSupabaseUser(); // This still auto-imported via Nuxt's module
const loading = ref(false);
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const isSignUp = ref(false);
const errorMessage = ref('');
const isDarkMode = ref(false);
const passwordMatch = ref(false);

const checkDarkMode = () => {
  isDarkMode.value = document.body.classList.contains('dark');
};

onMounted(() => {
  checkDarkMode();

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "class") {
        checkDarkMode();
      }
    });
  });

  observer.observe(document.body, {
    attributes: true
  });

  onBeforeUnmount(() => {
    observer.disconnect();
  });

  if (user.value) {
    navigateTo('/');
  }
});

const signUp = async () => {
  loading.value = true;
  console.log("signUp function called from login.vue");
  errorMessage.value = '';
  const { error } = await useSupabaseClient().auth.signUp({
    email: email.value,
    password: password.value
  });
  if (error) {
    errorMessage.value = error.message;
  } else {
    navigateTo('/login');
  }
  loading.value = false;
};


watch([password, confirmPassword], () => {
  passwordMatch.value = password.value === confirmPassword.value;
}, { immediate: true });

const login = async () => {
  loading.value = true;
  console.log("login function called from login.vue");
  errorMessage.value = '';
  const { error } = await signIn(email.value, password.value);
  if (error) {
    if (error.message === "Invalid login credentials") {
      errorMessage.value = "Your email or password is incorrect. Please try again.";
    } else {
      errorMessage.value = error.message;
    }
  } else {
    navigateTo('/');
  }
  loading.value = false;
};
</script>

<template>
  <ion-page>
    <ion-header class="ion-no-border border-b bg-white">
      <ion-toolbar>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding ">
      <ion-grid class="ion-justify-content-center">
        <ion-row class="ion-justify-content-center">
          <ion-col size-md="8" size-lg="6" size-xs="12">
            <ion-card class="max-w-lg mx-auto !border-2 p-4">
              <ion-card-header class="text-center flex flex-col justify-between">
                <ion-card-title class="flex flex-col justify-center">
                  <div class="flex justify-center items-center mb-4 mt-2 mx-4">
                    <div v-if="isDarkMode">
                      <img src="/pmi_logo_white.png" class="max-w-xs w-2/3 mx-auto" />
                    </div>
                    <div v-else>
                      <img src="/physicalmind-logo-french-blue-transparent.png" class="max-w-xs w-2/3 mx-auto" />
                    </div>
                  </div>
                </ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <form @submit.prevent="isSignUp ? signUp() : login()" class="w-full max-w-sm mx-auto">
                  <div v-if="!isSignUp" class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <UInput color="primary" type="email" id="email" placeholder="Enter your email" v-model="email"
                      required
                      class="placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div v-if="isSignUp" class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">Enter your email address</label>
                    <UInput color="primary" type="email" id="email" placeholder="Enter your email" v-model="email"
                      required
                      class="placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div v-if="!isSignUp" class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <UInput color="primary" variant="outline" type="password" id="password"
                      placeholder="Enter your password" v-model="password" required
                      class="shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div v-if="isSignUp" class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-700">Choose a password</label>
                    <UInput color="primary" variant="outline" type="password" id="password"
                      placeholder="Enter your password" v-model="password" required
                      class="shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div v-if="isSignUp" class="mb-4">
                    <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm your
                      password</label>
                    <UInput color="primary" variant="outline" type="password" id="confirmPassword"
                      placeholder="Enter your password" v-model="confirmPassword" required
                      class="shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <UButton v-if="!isSignUp" type="submit" :disabled="loading" color="primary"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium !text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-300">
                    {{ loading ? 'Loading...' : 'Login' }}
                  </UButton>
                  <UButton v-else type="submit" :disabled="loading || !passwordMatch"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium !text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-300"
                    color="primary">
                    {{ loading ? 'Loading...' : 'Sign Up' }}
                  </UButton>
                  <div class="mt-4">
                    {{ isSignUp ? 'Already have an account?' : 'Need an account?' }}
                    <span @click="isSignUp = !isSignUp" class="text-indigo-600 cursor-pointer">
                      {{ isSignUp ? 'Login' : 'Sign up' }}
                    </span>
                  </div>
                  <div v-if="errorMessage" class="mt-4 text-red-500">{{ errorMessage }}</div>
                </form>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<style scoped>
input {
  color: #333 !important;
}

body.dark input {
  color: white !important;
}
</style>
