<script lang="ts" setup>
import { onMounted } from 'vue';
const myVideos = useState('myVideos', () => []);

onMounted(() => {
  console.log("From my videos list:", JSON.stringify(myVideos.value));
  // Or, to log the array directly:
  console.log("From my videos list:", myVideos.value);
});

</script>

<template>
  <ion-page>
    <ion-header>
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
              My videos
            </ion-text>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<style scoped></style>
