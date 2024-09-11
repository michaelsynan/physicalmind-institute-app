<template>
  <ion-page>
    <ion-header class="ion-no-border border-b bg-white">
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
          <!-- Instructor Photo -->
          <img :src="instructor.photo ? instructor.photo : '/images/default/image.jpg'" alt="Instructor's Photo"
            class="mt-2 border border-opacity-50 border-stone-400 w-40 h-40 mx-auto block rounded-full object-cover relative z-10">
          <ion-card-header class="relative z-10">
            <ion-card-title class="font-bold">{{ instructor.fullName }}</ion-card-title>
            <div class="flex flex-row mx-auto gap-2 mt-1.5">
              <div>
                <a :href="instructor.website" target="_blank"> <ion-icon :md="ioniconsGlobeOutline"
                    :ios="ioniconsGlobeOutline" slot="end" class="text-xl"></ion-icon></a>
              </div>
              <div>
                <a :href="instructor.ig" target="_blank"> <ion-icon :md="ioniconsLogoInstagram"
                    :ios="ioniconsLogoInstagram" slot="end" class="text-xl"></ion-icon></a>
              </div>
            </div>
          </ion-card-header>
          <ion-card-content class="relative z-10">
            <div class="text-base">
              {{ instructor.bio }}
            </div>
            <div class="my-4"></div>
          </ion-card-content>
          <NuxtLink :to="`/instructors/videos?instructor=${instructor.slug}`">
            <ion-button expand="block" color="primary" class="font-bold">Watch Videos</ion-button>
          </NuxtLink>
        </ion-card>
        <p v-else class="text-center">Instructor not found.</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { instructorData } from '/data/instructorData.js';

const route = useRoute();

onMounted(() => {
  console.log("Route accessed:", route.fullPath);
  console.log("Params:", route.params);
  console.log("Current component:", route.path);
});

// Use a computed property to extract the last parameter as the instructor slug
const instructorSlug = computed(() => {
  const pathArray = route.params.all || [];
  // Ensure that you are getting the first part of the path array assuming [slug] is the first parameter
  return pathArray.length > 0 ? pathArray[0] : undefined;
});

// Find the instructor in the provided data array
const instructor = computed(() => {
  return instructorData.find(i => i.slug === instructorSlug.value);
});

// Optionally, add error handling or a reactive property to indicate if the instructor was not found
// const instructorFound = computed(() => !!instructor.value);

onMounted(() => {
  if (!instructorFound.value) {
    console.error("Instructor not found for slug:", instructorSlug.value);
  }
});
</script>

<style scoped></style>
