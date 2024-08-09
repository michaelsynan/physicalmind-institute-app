<template>
  <ion-page>
    <ion-header class="ion-no-border border-b-2 bg-white">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
        <ion-title class="justify-center text-center">{{ instructor ? instructor.fullName : 'Instructor' }} Videos</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid class="ion-justify-content-center">
        <ion-row class="ion-justify-content-center">
          <ion-col size-md="8" size-lg="6" size-xs="12">
            <ion-text>
              <h2>{{ instructor ? instructor.fullName : 'Instructor' }}</h2>
              <p v-if="instructor">
                Here you can watch all videos from {{ instructor.fullName }}.
              </p>
              <p v-else>
                Sorry, we could not find the instructor you're looking for.
              </p>
            </ion-text>
          </ion-col>
        </ion-row>
      </ion-grid> <!-- Closing tag for ion-grid -->
    </ion-content>
  </ion-page>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { instructorData } from '/data/instructorData.js';
const route = useRoute();
onMounted(() => {
  console.log("Route accessed:", route.fullPath);
  console.log("Params:", route.params);
});



// Extract the instructor's slug from the URL
const instructorSlug = computed(() => {
  const params = route.params.all || [];
  return params.length ? params[0] : undefined;
});

// Find the instructor by slug
const instructor = computed(() => {
  return instructorData.find(i => i.slug === instructorSlug.value);
});
</script>

<style scoped>
/* Your styles here */
</style>
