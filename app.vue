<template>
  <ion-menu content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu Content</ion-title>
      </ion-toolbar>
    </ion-header>
    <!-- Apply flex and flex-col to ion-content through class override if possible -->
    <ion-content class="ion-padding flex flex-col h-full">
      <!-- Flex container with flex-grow to ensure it fills the space -->
      <div class="flex flex-col flex-grow">
        <ion-list inset="true">
          <ion-item>Video Library</ion-item>
          <ion-item>About</ion-item>
          <ion-item>Contact</ion-item>
        </ion-list>
        <!-- Push to bottom with mt-auto -->
        <div class="mt-auto">
          <ion-list inset="true">
            <ion-item>
              <ion-toggle :checked="themeToggle" @ionChange="toggleChange($event)">Dark Mode</ion-toggle>
            </ion-item>
          </ion-list>
        </div>
      </div>
    </ion-content>
  </ion-menu>
  <ion-app>
    <ion-router-outlet id="main-content" />
  </ion-app>
</template>


<script setup lang="ts">

import { onMounted, ref } from 'vue';
// Declare themeToggle as a reactive reference
const themeToggle = ref(false);

// Function to toggle dark theme
const toggleDarkTheme = (shouldAdd) => {
  document.body.classList.toggle('dark', shouldAdd);
};

// Function to handle the change event of the toggle
const toggleChange = (event) => {
  toggleDarkTheme(event.detail.checked);
  themeToggle.value = event.detail.checked;
};

// Detect user's preference for dark mode
// const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// // Use onMounted to ensure this code runs after the component has been mounted
// onMounted(() => {
//   // Initial theme check
//   themeToggle.value = prefersDark.matches;
//   toggleDarkTheme(prefersDark.matches);

//   // Listen for changes in the preference
//   prefersDark.addEventListener('change', (e) => {
//     themeToggle.value = e.matches;
//     toggleDarkTheme(e.matches);
//   });
// });


</script>