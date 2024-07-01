<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/" text=""></ion-back-button>
        </ion-buttons>
        <ion-title class="justify-center text-center">{{ instructor?.name }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div id="container" class="my-10 max-w-3xl mx-auto">
        <ion-card type="medium" v-if="instructor" class="p-3">
          <!-- Display instructor photo -->
          <img :src="instructor.photo ? instructor.photo : '/images/default/image.jpg'" alt="Instructor's Photo" class="max-w-xs max-h-60 mx-auto block rounded-full">
          <ion-card-header>
            <ion-card-title>{{ instructor.name }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="my-4">
            <p class="text-left">Visit the website: <a :href="instructor.website" target="_blank">{{ instructor.website }}</a></p>
            </div>
            <!-- Watch Videos Link (assuming a route to videos exists) -->
            <div class="my-4">
                     </div>
          </ion-card-content>
          <NuxtLink :to="`/?instructor=${instructor.name}`">
                <ion-button expand="block" color="primary">Watch Videos</ion-button>
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
