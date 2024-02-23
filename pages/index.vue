<template>
  <ion-page>
    <ion-header :translucent="true" class="ion-no-border transparent">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Nuxt Ionic</ion-title>
        </ion-toolbar>
      </ion-header>
      <div id="container" class="my-10 max-w-full mx-auto">
        <div class="flex justify-center items-center">
          <nuxt-img provider="cloudinary" src="/v1708006480/physicalmind-logo-french-blue_hoitel.png" height="60" />
        </div>
        <div class="flex flex-col md:flex-row gap-4 md:gap-20 justify-center items-center my-8 w-full max-w-8xl">
  <div class="flex flex-row gap-4 items-center">
    <UBadge @click="updateSelectedBadge('New')" :class="badgeClass('New')" class="cursor-pointer py-1 px-3 rounded-full">New</UBadge>
    <UBadge @click="updateSelectedBadge('all videos')" :class="badgeClass('all videos')" class="cursor-pointer  py-1 px-3 rounded-full">All Videos</UBadge>
    <UBadge @click="updateSelectedBadge('dance')" :class="badgeClass('dance')" class="cursor-pointer  py-1 px-3 rounded-full">Dance</UBadge>
    <UBadge @click="updateSelectedBadge('golf')" :class="badgeClass('golf')" class="cursor-pointer  py-1 px-3 rounded-full">Golf</UBadge>
  </div>
  <ion-list class="flex items-center">
    <ion-item>
      <ion-select label="Instructor" placeholder="All" v-model="selectedInstructor">
        <ion-select-option v-for="instructor in instructorData" :key="instructor.value" :value="instructor.value">
          {{ instructor.name }}
        </ion-select-option>
      </ion-select>
    </ion-item>
  </ion-list>
</div>

<VideoList :tag="selectedBadge" :instructor="selectedInstructor" class="max-w-5xl mx-auto" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { instructorData } from '@/data/instructorData.js' // Adjust the path as necessary

definePageMeta({
  middleware: ["logger"]
})

const selectedBadge = ref('all videos') // Default selection
const selectedInstructor = ref('All') // Default instructor selection

// Method to update selectedBadge
const updateSelectedBadge = (badgeLabel: string) => {
  selectedBadge.value = badgeLabel
}

// Method to return the class based on badge selection
const badgeClass = (badgeLabel: string) => {
  return selectedBadge.value === badgeLabel ? 'badge-selected' : 'badge-default'
}
</script>

<style>
/* Styles for badges */
.badge-default {
  /* Dim color for non-selected badges */
  opacity: 0.5;
}

.badge-selected {
  /* Bright color for the selected badge */
  opacity: 1;
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}


#container {
  text-align: center;

}

#container {
  position: relative;
  /* Ensure pseudo-element is positioned relative to this container */
  text-align: center;
}
</style>

