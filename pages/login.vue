<script setup lang="ts">
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
const resetting = ref(false);
import { OverlayEventDetail } from '@ionic/core/components';

const checkDarkMode = () => {
  const isDarkMode = document.body.classList.contains('dark');
  if (isDarkMode) {
    document.body.classList.remove('dark');
    console.log('Dark mode was active; \'dark\' class removed.');
  } else {
    console.log('Dark mode was not active; no class removed.');
  }
};

/* modal logic */

const modal = ref();
const input = ref();
const isLoggingIn = ref(false);

const cancel = () => modal.value.$el.dismiss(null, 'cancel');

const confirm = () => {
  const name = input.value.$el.value;
  modal.value.$el.dismiss(name, 'confirm');
};

const onWillDismiss = (event: CustomEvent<OverlayEventDetail>) => {
  if (event.detail.role === 'confirm') {
    message.value = `Hello, ${event.detail.data}!`;
  }
};

/* end modal logic */

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

const resetPassword = function () {
  resetting.value = true;
  console.log("resetting value is " + resetting.value)
  console.log("resetting password!")
  resetting.value = false;
  console.log("resetting value is " + resetting.value)

}
</script>

<template>
  <ion-page>
    <ion-header class="ion-no-border border-b bg-white">
      <ion-toolbar>
      </ion-toolbar>
    </ion-header>
    <ion-content class="">
      <ion-grid class="ion-justify-content-center">
        <ion-row class="ion-justify-content-center">
          <ion-col size-md="8" size-lg="6" size-xs="12">
            <ion-card class="max-w-lg mx-auto !border-2 p-4">
              <ion-card-header class="text-center flex flex-col justify-between">
                <ion-card-title class="flex flex-col justify-center">
                  <div class="flex justify-center items-center mb-4 mt-2 mx-4">
                    <img src="/logo-pmi-studio.png" class="max-w-xs w-[200px] mx-auto" />
                  </div>
                </ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <LoginAbout v-if="!isLoggingIn" />
                <form v-if="isLoggingIn" @submit.prevent="isSignUp ? signUp() : login()"
                  class="w-full max-w-sm mx-auto">
                  <div v-if="!isSignUp" class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <UInput color="primary" type="email" id="email" placeholder="Enter your email" v-model="email"
                      required
                      class="placeholder-gray-400 !text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm " />
                  </div>
                  <div v-if="isSignUp" class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">Enter your email address</label>
                    <UInput color="primary" type="email" id="email" placeholder="Enter your email" v-model="email"
                      required
                      class="placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm !text-black" />
                  </div>
                  <div v-if="!isSignUp" class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <UInput color="primary" variant="outline" type="password" id="password"
                      placeholder="Enter your password" v-model="password" required
                      class="shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  !text-black" />
                    <div class="w-full text-right pt-1 cursor-pointer" id="open-modal">Forgot your password?
                    </div>

                    <!-- Modal area -->
                    <ion-modal ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
                      <ion-header>
                        <ion-toolbar>
                          <ion-buttons slot="start">
                            <ion-button @click="cancel()">Cancel</ion-button>
                          </ion-buttons>
                          <ion-title>Reset your password</ion-title>
                          <ion-buttons slot="end">
                            <ion-button :strong="true" @click="confirm()">Confirm</ion-button>
                          </ion-buttons>
                        </ion-toolbar>
                      </ion-header>
                      <ion-content class="ion-padding">
                        <ion-item>
                          <ion-input label="Enter your name" label-placement="stacked" ref="input" type="text"
                            placeholder="Your name"></ion-input>
                        </ion-item>
                      </ion-content>
                    </ion-modal>
                    <!-- end Modal area -->
                  </div>
                  <div v-if="isSignUp" class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-700">Choose a password</label>
                    <UInput color="primary" variant="outline" type="password" id="password"
                      placeholder="Enter your password" v-model="password" required
                      class="shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-white text-black" />
                  </div>
                  <div v-if="isSignUp" class="mb-4">
                    <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm your
                      password</label>
                    <UInput color="primary" variant="outline" type="password" id="confirmPassword"
                      placeholder="Enter your password again" v-model="confirmPassword" required
                      class="shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-white text-black" />
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
                <ion-button v-if="!isLoggingIn" @click="isLoggingIn = true" expand="block" class="mt-4 mb-10 ls">Login /
                  Signup</ion-button>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<style scoped>
/* input {
  color: #333 !important;
}

body.dark input {
  color: white !important;
} */
</style>
