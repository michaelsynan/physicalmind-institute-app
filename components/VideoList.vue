<template>
  <div>
    <ion-grid>
      <div v-if="filteredVideos.length > 0">
        <transition-group name="fade" tag="ion-row">
          <ion-col size="12" size-md="6" v-for="(video, index) in filteredVideos" :key="index">
            <ion-card>
              <div class="video-list cursor-pointer">
                <!-- Placeholder Image -->
                <NuxtLink :to="`/video/${video.vimeoId}`"> <img v-if="video.placeholder" :src="video.placeholder" :alt="video.name" class="video-placeholder"></NuxtLink>
                <!-- Video iframe is commented out in this example -->
                <!-- <iframe
                  v-else
                  :src="`https://player.vimeo.com/video/${video.vimeoId}`"
                  title="Video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe> -->
                <!-- Save button -->
                <!-- <button class="save-btn" @click="saveVideo(video.vimeoId)"> 
                  <ion-icon :md="ioniconsStarOutline"
                    :ios="ioniconsStar" slot="end"></ion-icon></button> -->
              </div>
              <ion-card-header class="pt-3 pb-2">
  <div class="flex flex-col w-full h-full items-start">
    <div>
      <ion-card-title>
        <NuxtLink :to="`/video/${video.vimeoId}`">{{ video.name }}</NuxtLink>
      </ion-card-title>
    </div>

  </div>
</ion-card-header>

              <ion-card-content class="text-left">
               <div class="text-base"> {{ video.description }}</div>
               <!-- <div class="flex flex-col justify-end h-full">
      <ion-card-subtitle>Instructor: {{ video.instructor }}</ion-card-subtitle>
    </div> -->
              </ion-card-content>
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
import { defineProps, computed } from 'vue'
import { videoData } from '/data/videoData.js' // Adjust the import path as necessary
import { useState } from '#imports';

// Assume videoData is an array of video objects
const props = defineProps({
  tag: String,
  instructor: String
});

// Access or initialize 'myVideos' state at the top level if you need it elsewhere in your component
const myVideos = useState('myVideos', () => []);

const filteredVideos = computed(() => {
  let filteredByTag = videoData;
  if (props.tag && props.tag !== 'all videos') {
    filteredByTag = videoData.filter(video => video.tags.includes(props.tag));
  }

  let filteredByInstructor = filteredByTag;
  if (props.instructor && props.instructor !== 'All') {
    filteredByInstructor = filteredByTag.filter(video => video.instructor === props.instructor);
  }

  return filteredByInstructor;
});

function saveVideo(vimeoId) {
  // Check if the vimeoId already exists in myVideos
  if (!myVideos.value.includes(vimeoId)) {
    myVideos.value.push(vimeoId);
    console.log("Video saved:", vimeoId);
  } else {
    console.log("Video already saved:", vimeoId);
  }
}

</script>

<style scoped>
.video-responsive {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  /* 16:9 Aspect Ratio */
  overflow: hidden;
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
  /* Make button transparent by default */
  position: absolute;
  top: 5px;
  /* Adjust starting position for vertical move */
  right: 0;
  margin: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  /* Adjust the color as needed */
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  z-index: 10;
  transition: opacity 0.2s ease, top 0.2s ease;
  /* Transition for opacity and vertical move */
}

.video-list:hover .save-btn {
  opacity: 1;
  /* Make button fully visible on hover */
  top: 0;
  /* Target position for vertical move */
}


/* Define enter and leave transitions for fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
  {
  opacity: 0;
}

ion-card {
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
  /* Smooth transition for shadow and transform effects */
}

ion-card:hover {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  /* Add shadow to lift card */
  transform: translateY(-3px);
  /* Slightly raise the card */
}

</style>

