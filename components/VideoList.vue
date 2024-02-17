<template>
  <div>
    <div>
    <p>Selected Tag: {{ tag }}</p>
    <!-- Your template content -->
  </div>
  </div>
  <ion-grid>
    <ion-row>
      <ion-col size="12" size-md="6" v-for="video in videoData" :key="index">
        <ion-card>
          <div class="video-responsive">
            <iframe
              :src="`https://player.vimeo.com/video/${video.vimeoId}`"
              title="Video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <ion-card-header>
            <ion-card-title>{{ video.name }}</ion-card-title>
            <ion-card-subtitle>Instructor: {{ video.instructor }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            {{ video.description }}
          </ion-card-content>
        </ion-card>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script setup>
import { defineProps, computed } from 'vue'

// Accept the `tag` prop
const props = defineProps({
  tag: String
})

// Example: Importing videoData (You would adjust the path as necessary)
import { videoData } from '/data/videoData.js'

</script>

<style>
.video-responsive {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
}
.video-responsive iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
