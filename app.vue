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
          <ion-item @click="closeMenu" router-link="/about" class="cursor-pointer">About</ion-item>
          <ion-item @click="closeMenu" router-link="/help" class="cursor-pointer">Help</ion-item>
          <ion-item @click="closeMenu" href="https://google.com" class="cursor-pointer" target="_blank">
            <ion-icon :md="ioniconsGlobeOutline" :ios="ioniconsGlobeOutline" slot="end"></ion-icon> Shop
          </ion-item>
        </ion-list>
        <div>
          <ion-list>
            <ion-item>
              <ion-toggle :checked="themeToggle" @ionChange="toggleChange($event)">
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
const themeToggle = ref(false);

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

<style scoped>
ion-item {
  --background: transparent;
  --ion-item-background: transparent;
  --border-color: transparent;
}

ion-item::part(native) {
  border-bottom: none;
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
