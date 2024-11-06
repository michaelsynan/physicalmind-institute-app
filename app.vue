<template>
  <ion-menu content-id="main-content">
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <div class="flex justify-center items-center mt-8 mb-4">
          <NuxtLink v-if="isDarkMode" to="/">
            <img src="/pmi_logo_white.png" class="w-28" />
          </NuxtLink>
          <NuxtLink v-else to="/">
            <img src="/physicalmind-logo-french-blue-transparent.png" class="w-28" />
          </NuxtLink>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="flex flex-col h-full justify-between border-t">
        <ion-list class="mt-2">
          <ion-item @click="closeMenu" router-link="/" class="cursor-pointer">Video Library</ion-item>
          <ion-item @click="closeMenu" router-link="/instructors" class="cursor-pointer">Instructors</ion-item>
          <ion-item @click="closeMenu" router-link="/certification" class="cursor-pointer">Certification</ion-item>
          <ion-item @click="closeMenu" router-link="/help" class="cursor-pointer">FAQ</ion-item>
          <ion-item @click="closeMenu" router-link="/account" class="cursor-pointer">Account</ion-item>
          <ion-item @click="closeMenu" href="https://google.com" class="cursor-pointer" target="_blank">
            <ion-icon :md="ioniconsGlobeOutline" :ios="ioniconsGlobeOutline" slot="end"></ion-icon> Shop
          </ion-item>
          <ion-item @click="logout" router-link="/login" class="cursor-pointer">Logout</ion-item>

        </ion-list>
        <div>
          <ion-list lines="full" class="border-t">
            <ion-item>
              <ion-icon v-if="isDarkMode" :md="ioniconsMoon" :ios="ioniconsMoon" slot="start"></ion-icon>
              <ion-icon v-else :md="ioniconsSunnyOutline" :ios="ioniconsSunnyOutline" slot="start"></ion-icon>
              <ion-toggle :checked="isDarkMode" @ionChange="toggleChange($event)">
                {{ isDarkMode ? 'Dark Mode' : 'Light Mode' }}
              </ion-toggle>
            </ion-item>
          </ion-list>
        </div>
      </div>
    </ion-content>
  </ion-menu>
  <ion-app class="relative flex flex-col min-h-screen">
    <ion-router-outlet id="main-content" class="flex-grow"></ion-router-outlet>
    <ion-footer :translucent="true" class="mt-auto bg-teal-50 bg-opacity-30 backdrop-blur">
      <ion-toolbar class="flex justify-center items-center w-full">
        <div class="flex justify-center items-center w-full gap-14">
          <NuxtLink to="/">
            <ion-icon :md="ioniconsHomeOutline" :ios="ioniconsHomeOutline" :style="iconStyle('/')"
              class="text-2xl"></ion-icon>
          </NuxtLink>
          <NuxtLink to="/instructors">
            <ion-icon :md="ioniconsPeopleOutline" :ios="ioniconsPeopleOutline" :style="iconStyle('/instructors')"
              class="text-2xl"></ion-icon>
          </NuxtLink>
          <NuxtLink to="/help">
            <ion-icon :md="ioniconsHelpCircleOutline" :ios="ioniconsHelpCircleOutline" :style="iconStyle('/help')"
              class="text-2xl"></ion-icon>
          </NuxtLink>
        </div>
      </ion-toolbar>
    </ion-footer>
  </ion-app>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth.js'
const { isLoggedIn, logIn, logOut, checkUser } = useAuthStore()

import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const client = useSupabaseClient()
const user = useSupabaseUser()

const isDarkMode = ref(false);
const route = useRoute();

const logout = async () => {
  console.log("Logout function called");
  const { error } = await client.auth.signOut();
  if (!error) {
    closeMenu();
    logOut() // Call Pinia action to update logout state
    navigateTo('/login');  // Redirect to login page
  } else {
    console.error('Logout Failed:', error);
  }
}

onMounted(() => {
  // Check if the 'dark' class is present on the body when the component mounts
  isDarkMode.value = document.body.classList.contains('dark');
});

const toggleChange = (event) => {
  // Toggle the dark mode class on the body element
  const shouldAdd = event.detail.checked;
  document.body.classList.toggle('dark', shouldAdd);
  isDarkMode.value = shouldAdd; // Update the reactive state
};

const iconStyle = (path) => ({
  color: route.path === path ? 'var(--ion-color-primary)' : 'var(--ion-text-color)',
});

const closeMenu = async () => {
  try {
    await menuController.close();
  } catch (error) {
    console.error('Failed to close the menu:', error);
  }
};
</script>

<style>
ion-item::part(native) {
  border-bottom: none;
}

ion-footer {
  border-top: 1px solid;
}

ion-header,
ion-toolbar {
  /* --background: transparent !important;
  --ion-background-color: transparent !important; 
  --border-color: transparent !important;  */
  --box-shadow: none !important;
}

/* .toolbar-background {
  background: transparent !important;
} */

ion-icon {
  color: var(--ion-text-color);
  /* Set the icon color to the default Ionic text color */
}

.button-native::after {
  background: currentColor !important;
  /* opacity: var(--background-hover-opacity, 0); */
}

.video-container {
  overscroll-behavior-y: contain;
  /* Maintain current behavior settings */
  padding-bottom: 50px;
  /* Increase this value if your bottom navbar is taller */
  overflow: hidden;
  /* Keeps the layout neat */
  min-height: 100vh;
  /* Ensures there is enough height to enable scrolling */
}

.video-list {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  /* Maintains aspect ratio for thumbnails */
}

.video-list .video-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

ion-card {
  background: transparent;
  border: none;
  box-shadow: none;
}

ion-card:hover {
  box-shadow: none;
  transform: none;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

ion-card-header,
ion-card-content {
  padding-inline: 0px;
}
</style>
