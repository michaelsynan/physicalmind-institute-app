<script lang="ts" setup>
import { onMounted } from 'vue';

const myVideos = useState('myVideos', () => []);

onMounted(() => {
  console.log("From my videos list:", JSON.stringify(myVideos.value));
});

function clearVideos() {
  myVideos.value = []; // Clears the array
}
</script>

<template>
  <ion-page>
    <ion-header  class="ion-no-border border-b-2 bg-white">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
        <ion-title class="justify-center text-center">My Videos</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid class="ion-justify-content-center">
        <ion-row class="ion-justify-content-center">
          <ion-col size-md="8" size-lg="6" size-xs="12">
            <ion-text>
              <div v-for="(video, index) in myVideos" :key="index"> {{ video }} </div>
            </ion-text>
          </ion-col>
        </ion-row>
        <!-- Clear Videos Button -->
        <ion-row class="ion-justify-content-center">
          <ion-col size-md="8" size-lg="6" size-xs="12" class="ion-text-center">
            <ion-button @click="clearVideos">Clear Videos</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

