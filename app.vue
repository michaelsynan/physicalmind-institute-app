<template>
  <ion-menu content-id="main-content">
    <ion-header :translucent="true" class="ion-no-border transparent">
      <ion-toolbar>
        <div class="flex justify-center items-center mt-8 mb-4">
          <NuxtLink to="/">
            <nuxt-img provider="cloudinary" src="/v1708006480/physicalmind-logo-french-blue_hoitel.png" height="40" />
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
          <ion-item @click="closeMenu" href="https://google.com" class="cursor-pointer" target="_blank">
            <ion-icon :md="ioniconsGlobeOutline" :ios="ioniconsGlobeOutline" slot="end"></ion-icon> Shop
          </ion-item>
        </ion-list>
        <div>
          <ion-list lines="full" class="border-t">
            <ion-item>
              <ion-icon v-if="themeToggle" :md="ioniconsMoon" :ios="ioniconsMoon" slot="start"></ion-icon>
              <ion-icon v-else :md="ioniconsSunnyOutline" :ios="ioniconsSunnyOutline" slot="start"></ion-icon>
              <ion-toggle :checked="themeToggle" @ionChange="toggleChange($event)">
                {{ themeToggle ? 'Dark Mode' : 'Light Mode' }}
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
     <NuxtLink to="/"> <ion-icon :md="ioniconsHomeOutline" :ios="ioniconsHomeOutline" class="text-2xl"></ion-icon></NuxtLink>
     <NuxtLink to="/instructors"> <ion-icon :md="ioniconsPeopleOutline" :ios="ioniconsPeopleOutline" class="text-2xl"></ion-icon></NuxtLink>
     <NuxtLink to="/help"> <ion-icon :md="ioniconsHelpCircleOutline" :ios="ioniconsHelpCircleOutline" class="text-2xl"></ion-icon></NuxtLink>
    </div>
  </ion-toolbar>
</ion-footer>
</ion-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const themeToggle = ref(false);

const currentIcon = 'ioniconsGlobeOutline';

const toggleChange = (event) => {
  toggleDarkTheme(event.detail.checked);
  themeToggle.value = event.detail.checked;
};

const toggleDarkTheme = (shouldAdd) => {
  document.body.classList.toggle('dark', shouldAdd);
};

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
ion-header,
ion-toolbar {
  --background: transparent !important;
  --ion-background-color: transparent !important; 
  --border-color: transparent !important; 
  --box-shadow: none !important; 
}

.toolbar-background {
  background: transparent !important;
}
</style>
