<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth.js';

const authStore = useAuthStore(); // Get the full store
const { signIn, signOut, restoreSession } = useAuthStore(); // Destructure needed methods
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

onMounted(async () => {
  // First try to restore the session
  console.log("Login page mounted, attempting to restore session...");
  const sessionRestored = await restoreSession();
  console.log("Session restored:", sessionRestored);

  // Only if session restoration failed, continue with normal login flow
  if (sessionRestored) {
    console.log("Session was restored, redirecting to home");
    navigateTo('/');
    return;
  }

  // Rest of your existing onMounted code
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

  // This check is still useful as a fallback
  if (user.value) {
    navigateTo('/');
  }
});

// const signUp = async () => {
//   loading.value = true;
//   console.log("signUp function called from login.vue");
//   errorMessage.value = '';
//   const { error } = await useSupabaseClient().auth.signUp({
//     email: email.value,
//     password: password.value
//   });
//   if (error) {
//     errorMessage.value = error.message;
//   } else {
//     isSignUp.value = false;
//     navigateTo('/login');
//   }
//   loading.value = false;
// };

const CHECK_EMAIL_CONFIRMATION = "Check your email to confirm your account.";
const successMessage = ref(null);

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
    isSignUp.value = false;
    successMessage.value = CHECK_EMAIL_CONFIRMATION;
    navigateTo('/login');  // After successful signup, navigate to login
  }

  loading.value = false;
};



watch([password, confirmPassword], () => {
  passwordMatch.value = password.value === confirmPassword.value;
}, { immediate: true });

const login = async () => {
  successMessage.value = null;
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
                  <!-- Login email field -->
                  <div v-if="!isSignUp" class="mb-4">
                    <ion-item>
                      <ion-input label-placement="floating" type="email" placeholder="Enter your email" v-model="email"
                        required>
                        <div slot="label">Email</div>
                      </ion-input>
                    </ion-item>
                  </div>

                  <!-- Signup email field -->
                  <div v-if="isSignUp" class="mb-4">
                    <ion-item>
                      <ion-input label-placement="floating" type="email" placeholder="Enter your email" v-model="email"
                        required>
                        <div slot="label">Enter your email address</div>
                      </ion-input>
                    </ion-item>
                  </div>

                  <!-- Login password field -->
                  <div v-if="!isSignUp" class="mb-4">
                    <ion-item>
                      <ion-input label-placement="floating" type="password" placeholder="Enter your password"
                        v-model="password" required>
                        <div slot="label">Password</div>
                      </ion-input>
                    </ion-item>
                  </div>

                  <!-- Signup password fields -->
                  <div v-if="isSignUp" class="mb-4">
                    <ion-item>
                      <ion-input label-placement="floating" type="password" placeholder="Enter your password"
                        v-model="password" required>
                        <div slot="label">Choose a password</div>
                      </ion-input>
                    </ion-item>
                  </div>

                  <div v-if="isSignUp" class="mb-4">
                    <ion-item>
                      <ion-input label-placement="floating" type="password" placeholder="Enter your password again"
                        v-model="confirmPassword" required>
                        <div slot="label">Confirm your password</div>
                      </ion-input>
                    </ion-item>
                  </div>

                  <!-- Rest of your form remains unchanged -->
                  <UButton v-if="!isSignUp" type="submit" :disabled="loading" color="primary"
                    @click="successMessage = null"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium !text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-300">
                    {{ loading ? 'Loading...' : 'Login' }}
                  </UButton>
                  <UButton v-else type="submit" :disabled="loading || !passwordMatch"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium !text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-300"
                    color="primary">
                    {{ loading ? 'Loading...' : 'Sign Up' }}
                  </UButton>
                  <div class="mt-4" @click="errorMessage = null">
                    {{ isSignUp ? 'Already have an account?' : 'Need an account?' }}
                    <span @click="isSignUp = !isSignUp" class="text-indigo-600 cursor-pointer">
                      {{ isSignUp ? 'Login' : 'Sign up' }}
                    </span>
                  </div>
                  <div v-if="errorMessage" class="mt-4 text-red-500">{{ errorMessage }}</div>
                  <div v-if="successMessage" class="mt-4 text-red-500">
                    {{ successMessage }}
                  </div>
                </form>
                <ion-button v-if="!isLoggingIn" @click="isLoggingIn = true" expand="block"
                  class="mt-4 mb-10 ls">Next</ion-button>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<style scoped>
/* Update styles for ion-input */
ion-input {
  --color: black !important;
  --background: white !important;
  --placeholder-color: #9ca3af !important;
  --padding-start: 0.75rem !important;
  --padding-end: 0.75rem !important;
  --padding-top: 0.5rem !important;
  --padding-bottom: 0.5rem !important;
  margin-top: 0.25rem !important;
}

/* Make sure stacked position works properly */
ion-item {
  --background: transparent !important;
  --border-color: #d1d5db !important;
  /* Make border visible */
  --border-width: 0 0 1px 0 !important;
  /* Only bottom border */
  --inner-border-width: 0 0 1px 0 !important;
  /* Inner border as well */
  --padding-start: 0 !important;
  --padding-end: 0 !important;
  margin-bottom: 1rem !important;
  --min-height: auto !important;
}

ion-item::part(native) {
  padding: 0 !important;
  min-height: auto !important;
}

ion-label {
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  color: #374151 !important;
  margin-bottom: 0.25rem !important;
  transform: none !important;
}

/* Make sure label is stacked properly */
ion-label[position="stacked"] {
  margin-bottom: 0.25rem !important;
  transform: none !important;
  position: relative !important;
  max-width: 100% !important;
}

/* Ensure inputs take full width */
ion-input::part(input) {
  width: 100% !important;
}
</style>
