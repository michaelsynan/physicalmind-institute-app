<template>
  <div class="video-container">
    <ion-grid>
      <div v-if="videosForInstructor.length > 0" class="">
        <transition-group name="fade" tag="ion-row">
          <ion-col size="12" size-md="6" v-for="(video, index) in videosForInstructor" :key="video.videoid">
            <ion-card>
              <NuxtLink :to="`/video/${video.videoid}`">
                <div class="video-list cursor-pointer border-2 rounded-lg">
                  <img v-if="video.placeholder" :src="video.placeholder" :alt="video.name"
                    class="video-placeholder rounded-lg">
                </div>
                <ion-card-header class="pt-3 pb-0">
                  <ion-card-title class="text-lg md:text-xl text-left">{{ video.name }}</ion-card-title>
                </ion-card-header>
                <ion-card-content class="text-left pb-1">
                  <p class="text-base truncate text-left">{{ video.description }}</p>
                </ion-card-content>
              </NuxtLink>
            </ion-card>
          </ion-col>
        </transition-group>
      </div>
      <div v-else class="ion-padding">
        <p>Sorry, no videos exist for this query.</p>
      </div>
    </ion-grid>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { videoData } from '~/data/videoData.js'; // Ensure this import path is correct

const route = useRoute();
const debugInfo = ref('');

// Extract the instructor slug from the URL query parameters
const instructorSlug = computed(() => route.query.instructor);

// Debugging to trace the value of instructorSlug
watch(instructorSlug, (newVal, oldVal) => {
  debugInfo.value += `Instructor Slug Changed: ${oldVal} -> ${newVal}\n`;
});

// Filter videos by the instructor slug
const videosForInstructor = computed(() => {
  return videoData.filter(video => video.slug === instructorSlug.value);
});

// Debugging to trace the filtered videos count
watch(videosForInstructor, (newVal) => {
  debugInfo.value += `Videos Found: ${newVal.length}\n`;
});

// Optional: Find the instructor's full name for display
const instructorFullName = computed(() => {
  const video = videosForInstructor.value.find(v => v.slug === instructorSlug.value);
  return video ? video.instructor : 'Instructor not found';
});

onMounted(() => {
  if (videosForInstructor.value.length === 0) {
    console.error("No videos found for slug:", instructorSlug.value);
    debugInfo.value += 'Error: No videos found for this instructor.\n';
  }
});
</script>



<style scoped>
/* Your styles here */
</style>
