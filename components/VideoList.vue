<template>
  <div>
    <ion-grid>
      <div v-if="filteredVideos.length > 0">
        <transition-group name="fade" tag="ion-row">
          <ion-col size="12" size-md="6" v-for="(video, index) in filteredVideos" :key="index">
            <ion-card>
              <NuxtLink :to="`/video/${video.vimeoId}`">
                <div class="video-list cursor-pointer">
                  <img v-if="video.placeholder" :src="video.placeholder" :alt="video.name" class="video-placeholder">
                </div>
                <ion-card-header class="pt-3 pb-2">
                  <div class="flex flex-col w-full h-full items-start">
                    <ion-card-title class="font-bold">{{ video.name }}</ion-card-title>
                  </div>
                </ion-card-header>
                <ion-card-content class="text-left">
                  <div class="text-base truncate">
                    <p>{{ video.description }}</p>
                  </div>
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
import { defineProps, computed } from 'vue';
import { videoData } from '/data/videoData.js';
import { useState } from '#imports';

const props = defineProps({
  tag: String,
  instructor: String
});

const myVideos = useState('myVideos', () => []);

const filteredVideos = computed(() => {
  let filteredByTag = videoData.filter(video => !props.tag || props.tag === 'all videos' || video.tags.includes(props.tag));
  return filteredByTag.filter(video => !props.instructor || props.instructor === 'All' || video.instructor === props.instructor);
});
</script>

<style scoped>
.video-responsive {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
}

.video-responsive iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.save-btn {
  opacity: 0;
  position: absolute;
  top: 5px;
  right: 0;
  margin: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  z-index: 10;
  transition: opacity 0.2s ease, top 0.2s ease;
}

.video-list:hover .save-btn {
  opacity: 1;
  top: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

ion-card {
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
}

ion-card:hover {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  transform: translateY(-3px);
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
