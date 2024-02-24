<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/" text=""></ion-back-button>
        </ion-buttons>
        <ion-title>Toolbar</ion-title>
        <!-- Show loading bar only when isLoading is true -->
        <ion-progress-bar v-if="isLoading" type="indeterminate"></ion-progress-bar>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div id="container" class="my-10 max-w-5xl mx-auto">
        <ion-card>
          <div class="video-responsive">
            <!-- Loading Overlay -->
            <div v-if="isLoading" class="loading-overlay">Loading...</div>
            <iframe
              :src="videoUrl"
              title="Video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              @load="videoLoaded"
            ></iframe>
          </div>
          <!-- Display video details if available -->
          <ion-card-header v-if="video">
            <ion-card-title>{{ video.name }}</ion-card-title>
            <ion-card-subtitle>Instructor: {{ video.instructor }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content v-if="video">
            {{ video.description }}
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
const videoUrl = computed(() => `https://player.vimeo.com/video/${videoId.value}`);

// Function to call when the video is loaded
const videoLoaded = () => {
  isLoading.value = false;
};
</script>



<style scoped>

.video-responsive {
  position: relative;
  width: 100%;
  /* Use padding-top to create an aspect ratio */
  padding-top: 56.25%; /* Example for 16:9 aspect ratio */
  overflow: hidden;
  
}

.video-responsive iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: rgba(0, 0, 0, .1) 1px solid;
  
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

</style>
