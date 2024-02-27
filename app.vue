<template>

  <ion-menu content-id="main-content">
    <ion-header class="ion-no-border transparent">
      <ion-toolbar></ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="flex flex-col h-full justify-between">
        <ion-list>
          <ion-item @click="closeMenu" router-link="/" class="cursor-pointer">Video Library</ion-item>
          <ion-item @click="closeMenu" router-link="/instructors" class="cursor-pointer">Instructors</ion-item>
          <ion-item @click="closeMenu" router-link="/myvideos" class="cursor-pointer">My Videos</ion-item>
          <ion-item @click="closeMenu" router-link="/help" class="cursor-pointer">FAQ</ion-item>
          <ion-item @click="closeMenu" router-link="/certification" class="cursor-pointer">Certification</ion-item>
          <ion-item @click="closeMenu" href="https://google.com" class="cursor-pointer" target="_blank">
            <ion-icon :md="ioniconsGlobeOutline" :ios="ioniconsGlobeOutline" slot="end"></ion-icon> Shop
          </ion-item>
        </ion-list>
        <div>
          <ion-list>
            <ion-item @click="closeMenu" router-link="/about" class="cursor-pointer">About</ion-item>

            <ion-item>
              <ion-icon :md="currentIcon" :ios="currentIcon" slot="start"></ion-icon>              <ion-toggle :checked="themeToggle" @ionChange="toggleChange($event)">
                {{ themeToggle ? 'Light Mode' : 'Dark Mode' }}
              </ion-toggle>
            </ion-item>
          </ion-list>
        </div>
      </div>
    </ion-content>
  </ion-menu>
  <ion-app>
    <ion-router-outlet id="main-content"></ion-router-outlet>
  </ion-app>

</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const themeToggle = ref(false);

// Use a computed property to dynamically change the icon
const currentIcon = computed(() => themeToggle.value ? 'ioniconsMoon' : 'ioniconsBulb');

const toggleChange = (event) => {
  toggleDarkTheme(event.detail.checked);
  themeToggle.value = event.detail.checked;
};

const toggleDarkTheme = (shouldAdd) => {
  document.body.classList.toggle('dark', shouldAdd);
};

const closeMenu = async () => {
  const menu = await useIonMenu();
  menu.close();
};
</script>
nan


<style scoped>
ion-item {
  --background: transparent;
  --ion-item-background: transparent;
  --border-color: transparent;
}

ion-item::part(native) {
  border-bottom: none;
}


ion-item:hover {
  background-color: rgba(var(--background-hover), 0.4);
}


a {
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
}

</style>
