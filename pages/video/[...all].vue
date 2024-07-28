<template>
  <ion-page>
    <ion-header :translucent="true" class="ion-no-border transparent">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/" text=""></ion-back-button>
        </ion-buttons>
        <!-- Show loading bar only when isLoading is true -->
        <ion-progress-bar v-if="isLoading" type="indeterminate" class="top-0"></ion-progress-bar>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div id="container" class="my-10 max-w-5xl mx-auto">
        <ion-card type="medium">
          <div class="video-responsive bg-stone-300">
            <!-- Loading Overlay -->
            <div v-if="isLoading" class="loading-overlay text-opacity-50">Loading...</div>
            <video v-if="videoUrl" controls @loadeddata="videoLoaded" class="video-element">
              <source :src="videoUrl" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
          <!-- Display video details if available -->
          <ion-card-header v-if="video" class="px-0 mx-0">
            <div class="flex flex- justify-between items-start w-full gap-1">
              <div>
              <ion-card-title class="font-bold">{{ video.name }}</ion-card-title>
              <ion-card-subtitle class="text-left">{{ video.instructor }}</ion-card-subtitle>
              </div>
              <div class="flex flex-wrap">
                <div class="flex flex-wrap">
  <UBadge 
    v-for="(tag, index) in video.tags" 
    :key="tag" 
    :class="['px-3', 'rounded-full', 'border', '!border-opacity-80', 'border-primary', '!text-stone-100', {'mr-2': index !== video.tags.length - 1}]">
    {{ tag }}
  </UBadge>
</div>
            </div>
            </div>
          </ion-card-header>
          <ion-card-content class="text-left text-base mx-0 px-0" v-if="video">
            <div>
              {{ video.description }}
            </div>
          
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { videoData } from '/data/videoData.js'; // Adjust the import path as necessary

const route = useRoute();
const isLoading = ref(true);

// Extract the last part of the path as the video ID
const videoId = computed(() => {
  const pathArray = route.params.all || [];
  return pathArray[pathArray.length - 1];
});

// Find the video by vimeoId, not id
const video = computed(() => videoData.find((v) => v.vimeoId === videoId.value));

// Construct video URL
const videoUrl = computed(() => video.value ? video.value.s3Url : '');

// Function to call when the video is loaded
const videoLoaded = () => {
  isLoading.value = false;
};
</script>

<style scoped>
.video-responsive {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  overflow: hidden;
}

.video-responsive .video-element {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Maintain aspect ratio */
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  color: #000;
  font-size: 20px;
}

ion-card {
  background: transparent; /* Remove default background */
  border: none; /* Remove borders if any */
  box-shadow: none; /* Remove shadows */
}

/* Ensure the text and other elements within the card are styled appropriately */
ion-card-header, ion-card-content {
  background: transparent; /* Ensure headers and content don't have different background */
}

.video-element {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Maintain aspect ratio */
  border: 2px solid #ccc; /* Add a light grey border */
}

</style>
