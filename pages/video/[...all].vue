<template>
  <ion-page>
    <ion-header :translucent="true" class="ion-no-border transparent">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/" text=""></ion-back-button>
        </ion-buttons>
        <ion-progress-bar v-if="isLoading" type="indeterminate" class="top-0"></ion-progress-bar>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div id="container" class="max-w-5xl mx-auto">
        <ion-card type="medium">

          <div class="video-responsive bg-stone-300">
            <!-- Custom Play Button Overlay -->
            <div v-if="!isVideoPlaying" class="custom-play-button" @click="playVideo">
              <img v-if="video && video.placeholder" :src="video.placeholder" alt="Placeholder" class="placeholder-img">
              <ion-icon :md="ioniconsPlayCircleOutline" :ios="ioniconsPlayCircleOutline" name="play-circle" class="play-icon text-lg"></ion-icon>
            </div>
            <!-- Video Element -->
            <video ref="videoElement" v-if="videoUrl" @loadeddata="videoLoaded" @playing="videoPlaying" @pause="videoPaused" class="video-element" controlsList="nodownload" :controls="isVideoPlaying" preload="auto">
              <source :src="videoUrl" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
          <!-- Display video details if available -->
          <ion-card-header v-if="video" class="px-0 mx-0">
            <div class="flex flex-col items-start w-full gap-1">
              <div class="flex flex-wrap">
                <UBadge 
                  v-for="tag in video.tags" 
                  :key="tag" 
                  class="px-3 rounded-full border !border-opacity-80 border-primary !text-stone-100 mr-2 mb-2">
                  {{ tag }}
                </UBadge>

              </div>
              <ion-card-title class="">{{ video.name }}</ion-card-title>
              <ion-card-subtitle class="text-left">{{ video.instructor }}</ion-card-subtitle>

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
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { videoData } from '/data/videoData.js'; // Adjust the import path as necessary

const route = useRoute();
const isLoading = ref(true);
const isVideoPlaying = ref(false);
const videoElement = ref(null);

// Extract the last part of the path as the video ID
const videoId = computed(() => {
  const pathArray = route.params.all || [];
  console.log('Path Array:', pathArray); // Debug statement
  return pathArray[pathArray.length - 1];
});

console.log('Computed Video ID:', videoId.value); // Debug statement

// Find the video by vimeoId, not id
const video = computed(() => {
  const foundVideo = videoData.find((v) => v.vimeoId === videoId.value);
  console.log('Found Video:', foundVideo); // Debug statement
  return foundVideo;
});

// Construct video URL
const videoUrl = computed(() => {
  return video.value ? video.value.s3Url : '';
});

console.log('Video URL:', videoUrl.value); // Debug statement

// Function to call when the video is loaded
const videoLoaded = () => {
  isLoading.value = false;
  console.log('Video Loaded'); // Debug statement
};

// Function to call when the video starts playing
const videoPlaying = () => {
  isVideoPlaying.value = true;
  console.log('Video Playing'); // Debug statement
};

// Function to call when the video is paused
const videoPaused = () => {
  isVideoPlaying.value = false;
  console.log('Video Paused'); // Debug statement
};

// Function to play the video
const playVideo = () => {
  if (videoElement.value) {
    videoElement.value.play();
    console.log('Play Video'); // Debug statement
  }
};

// Ensure the video element is referenced correctly after the component is mounted
onMounted(() => {
  videoElement.value = document.querySelector('.video-element');
});
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

.custom-play-button {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  cursor: pointer;
  z-index: 10;
}

.placeholder-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
}

.play-icon {
  color: white;
  font-size: 120px; /* Increased size */
  z-index: 20;
  position: absolute;
}

.hidden {
  display: none;
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
  border: 1px solid #ccc; /* Add a light grey border */
}
</style>
