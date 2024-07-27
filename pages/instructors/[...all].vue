<template>
  <ion-page>
    <ion-header :translucent="true" class="ion-no-border transparent">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/" text=""></ion-back-button>
        </ion-buttons>
        <!-- <ion-title class="justify-center text-center">{{ instructor?.fullName }}</ion-title> -->
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div id="container" class="my-10 max-w-2xl mx-auto">
        <ion-card type="medium" v-if="instructor" class="p-3 relative overflow-hidden">
          <!-- Gradient Background -->
          <!-- <div class="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-br from-purple-600 to-[#6095d8]"></div> -->

          <!-- Instructor Photo -->
          <img :src="instructor.photo ? instructor.photo : '/images/default/image.jpg'" alt="Instructor's Photo" class="mt-2 border border-opacity-50 border-stone-400 max-w-xs max-h-60 mx-auto block rounded-full relative z-10">

          <ion-card-header class="relative z-10">
            <ion-card-title class="font-bold">{{ instructor.fullName }}</ion-card-title>
            <div class="flex flex-row mx-auto gap-2 mt-1.5">
              <div>
                <a :href="instructor.website" target="_blank"> <ion-icon :md="ioniconsGlobeOutline" :ios="ioniconsGlobeOutline" slot="end" class="text-xl"></ion-icon></a>
              </div>
              <div>
                <a :href="instructor.ig" target="_blank"> <ion-icon :md="ioniconsLogoInstagram" :ios="ioniconsLogoInstagram" slot="end" class="text-xl"></ion-icon></a>
              </div>
            </div>
          </ion-card-header>
          <ion-card-content class="relative z-10">
            <div class="text-base">
              {{ instructor.bio }}
            </div>
            <!-- Watch Videos Link (assuming a route to videos exists) -->
            <div class="my-4"></div>
          </ion-card-content>
          <NuxtLink :to="`/?instructor=${instructor.name}`">
            <ion-button expand="block" color="primary" class="font-bold">Watch Videos</ion-button>
          </NuxtLink>
        </ion-card>
        <p v-else class="text-center">Instructor not found.</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { instructorData } from '/data/instructorData.js'; // Adjust if necessary

const route = useRoute();

const instructorSlug = computed(() => {
  const pathArray = route.params.all || [];
  return pathArray.length > 0 ? pathArray[pathArray.length - 1] : undefined;
});

const instructor = computed(() => {
  return instructorData.find(i => i.slug === instructorSlug.value);
});
</script>

<style scoped>
/* Add any additional styles for your instructor detail page here */
</style>
