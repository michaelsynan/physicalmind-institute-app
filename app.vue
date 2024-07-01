<template>

  <ion-menu content-id="main-content">
    <ion-header :translucent="true" class="ion-no-border transparent">
      <ion-toolbar>
        <div class="flex justify-center items-center mt-8 mb-4">
          <NuxtLink to="/">
            <nuxt-img provider="cloudinary" src="/v1708006480/physicalmind-logo-french-blue_hoitel.png" height="40" />
          </NuxtLink>        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="flex flex-col h-full justify-between">
        <ion-list>
          <ion-item @click="closeMenu" router-link="/" class="cursor-pointer">Video Library</ion-item>
          <ion-item @click="closeMenu" router-link="/instructors" class="cursor-pointer">Instructors</ion-item>
          <!-- <ion-item @click="closeMenu" router-link="/myvideos" class="cursor-pointer">My Videos</ion-item> -->
          <ion-item @click="closeMenu" router-link="/certification" class="cursor-pointer">Certification</ion-item>

          <ion-item @click="closeMenu" router-link="/help" class="cursor-pointer">FAQ</ion-item>
          <!-- <ion-item @click="closeMenu" router-link="/about" class="cursor-pointer">About</ion-item> -->

          <ion-item @click="closeMenu" href="https://google.com" class="cursor-pointer" target="_blank">
            <ion-icon :md="ioniconsGlobeOutline" :ios="ioniconsGlobeOutline" slot="end"></ion-icon> Shop
          </ion-item>
        </ion-list>
        <div>
          <ion-list>
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
  <ion-app>
    <ion-router-outlet id="main-content"></ion-router-outlet>
    <MainFooter />
  </ion-app>

</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const themeToggle = ref(false);

// Use a computed property to dynamically change the icon
const currentIcon = 'ioniconsGlobeOutline';

const toggleChange = (event) => {
  toggleDarkTheme(event.detail.checked);
  themeToggle.value = event.detail.checked;
};

const toggleDarkTheme = (shouldAdd) => {
  document.body.classList.toggle('dark', shouldAdd);
};

const closeMenu = (event) => { console.log('event')}
</script>

<style scoped>

ion-item::part(native) {
  border-bottom: none;
}
ion-header,
ion-toolbar {
  --background: transparent !important; /* Makes the background transparent */
  --ion-background-color: transparent !important; /* Additional override for background color */
  --border-color: transparent !important; /* Removes any border */
  --box-shadow: none !important; /* Removes shadow */
}

</style>
