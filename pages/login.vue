<script setup>
import { useAuthStore } from '~/stores/auth.js'

const client = useSupabaseClient()
const user = useSupabaseUser()
const { isLoggedIn, logIn, logOut, checkUser } = useAuthStore()
const loading = ref(false)
const email = ref('')
const password = ref('')
const isSignUp = ref(false)
const errorMessage = ref('')

const signUp = async () => {
  loading.value = true
  console.log("signUp function called")
  errorMessage.value = ''
  const { data, error } = await client.auth.signUp(
    {
      email: email.value,
      password: password.value
    }
  )
  console.log(data.user, error)
  if (error) {

    errorMessage.value = error.message

  } else if (data.user) {
    navigateTo('/login')
  }
  loading.value = false
}


const login = async () => {
  loading.value = true
  console.log("login function called")
  errorMessage.value = ''  // Clear previous errors
  const { data, error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value
  }
  )
  console.log(data.user, error)
  if (error) {
    if (error.message === "Invalid login credentials") {
      errorMessage.value = "Your email or password is incorrect. Please try again."
    } else {
      errorMessage.value = error.message  // Display other error messages as is
    }
  } else if (data.user) {
    logIn() // Call Pinia action to update login state
    //  navigateTo('/')  // Redirect to home page temporarily removed
  }
  loading.value = false
}

const logout = async () => {
  console.log("logout function called")
  const { error } = await client.auth.signOut()
  console.log(user.value, error.value)
  if (!error) {
    logOut() // Call Pinia action to update logout state
  }
}

// onMounted(() => {
watchEffect(() => {
  if (user.value) {
    navigateTo('/')
  }
})
// })

</script>

<template>
  <ion-page>
    <ion-header class="ion-no-border border-b bg-white">
      <ion-toolbar>
        <ion-buttons slot="start" class="absolute">
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
        <ion-title class="justify-center text-center"></ion-title>

      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid class="ion-justify-content-center">
        <ion-row class="ion-justify-content-center">
          <ion-col size-md="8" size-lg="6" size-xs="12">
            <ion-card class="max-w-lg mx-auto !border-2 !border-stone-950 bg-stone-100 p-4">
              <ion-card-header class="text-center flex flex-col justify-between">
                <ion-card-title class="flex flex-col justify-center">PhysicalMind Institute</ion-card-title>
                <ion-card-subtitle v-if="user" class="w-full justify-end">
                  <ion-button @click="logout" size="small" fill="clear">Logout</ion-button>

                </ion-card-subtitle>
              </ion-card-header>
              <ion-card-content>
                <form @submit.prevent="() => (isSignUp ? signUp() : login())" class="w-full max-w-lg mx-auto">
                  <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" v-model="email" required
                      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  </div>
                  <div class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" placeholder="Enter your password" v-model="password" required
                      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  </div>
                  <button v-if="!isSignUp" type="submit" :disabled="loading"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300">
                    {{ loading ? 'Loading...' : 'login' }}
                  </button>
                  <button v-else type="submit" :disabled="loading"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300">
                    {{ loading ? 'Loading...' : 'sign up' }}
                  </button>
                  <div class="mt-4">
                    {{ isSignUp ? 'Already have an account?' : 'Need an account?' }}
                    <NuxtLink @click="isSignUp = !isSignUp" to="/login" class="text-indigo-600">
                      {{ isSignUp ? 'Login' : 'Sign up' }}
                    </NuxtLink>
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
