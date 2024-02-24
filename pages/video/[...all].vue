<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/" text=""></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div id="container" class="my-10 max-w-5xl mx-auto">

      <ion-card>
        <div class="video-responsive">
          <iframe
            :src="videoUrl"
            title="Video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <!-- Display video details if available -->
        <ion-card-header v-if="video">
          <ion-card-title>{{ video.name }}</ion-card-title>
          <ion-card-subtitle>Instructor: {{ video.instructor }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content v-if="video">
          {{ video.description }}
          ;lkj;lkj
        </ion-card-content>
      </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { videoData } from '/data/videoData.js'; // Adjust the import path as necessary

const route = useRoute();

// Extract the last part of the path as the video ID
const videoId = computed(() => {
  const pathArray = route.params.all || [];
  return pathArray[pathArray.length - 1];
});

// Find the video by vimeoId, not id
const video = computed(() => videoData.find((v) => v.vimeoId === videoId.value));

// Construct video URL
const videoUrl = computed(() => `https://player.vimeo.com/video/${videoId.value}`);
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
}

</style>
