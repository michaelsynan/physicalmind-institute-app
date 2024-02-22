<template>
  <div>
    <p>Selected Tag: {{ tag }}</p>
    <ion-grid>
      <!-- Conditional rendering based on filteredVideos length -->
      <div v-if="filteredVideos.length > 0">
        <transition-group name="fade" tag="ion-row">
          <ion-col size="12" size-md="6" v-for="(video, index) in filteredVideos" :key="index">
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
                <!-- Wrap video name with NuxtLink -->
                <div class="flex flex-row w-full justify-between h-full">
  <div>
    <ion-card-title>
      <NuxtLink :to="`/video/${video.vimeoId}`">{{ video.name }}</NuxtLink>
    </ion-card-title>
  </div>
  <div class="flex flex-col justify-end h-full">
    <ion-card-subtitle>Instructor: {{ video.instructor }}</ion-card-subtitle>
  </div>
</div>

              </ion-card-header>
              <ion-card-content class="text-left">
                {{ video.description }}
              </ion-card-content>
            </ion-card>
          </ion-col>
        </transition-group>
      </div>
      <!-- Display message if no videos are available -->
      <div v-else class="ion-padding">
        <p>Sorry, no videos exist for this query.</p>
      </div>
    </ion-grid>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { videoData } from '/data/videoData.js' // Adjust the import path as necessary

// Accept the `tag` and `instructor` props
const props = defineProps({
  tag: String,
  instructor: String
});


const filteredVideos = computed(() => {
  // Filter by tag
  let filteredByTag = videoData;
  if (props.tag && props.tag !== 'all videos') {
    filteredByTag = videoData.filter(video => video.tags.includes(props.tag));
  }

  // Further filter by instructor
  let filteredByInstructor = filteredByTag;
  if (props.instructor && props.instructor !== 'All') {
    filteredByInstructor = filteredByTag.filter(video => video.instructor === props.instructor);
  }

  return filteredByInstructor;
});

</script>

<style scoped>
.video-responsive {
  position: relative;
  width: 100%;
  /* This padding-top maintains a 16:9 aspect ratio */
  padding-top: 56.25%;
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