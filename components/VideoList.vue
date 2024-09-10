<template>
  <div class="video-container">
    <ion-grid>
      <div v-if="visibleVideos.length > 0" class="">
        <transition-group name="fade" tag="ion-row">
          <ion-col size="12" size-md="6" v-for="(video, index) in visibleVideos" :key="video.videoid">
            <ion-card>
              <NuxtLink :to="`/video/${video.videoid}`">
                <div class="video-list cursor-pointer border-2 rounded-lg">
                  <img v-if="video.placeholder" :src="video.placeholder" :alt="video.name"
                    class="video-placeholder rounded-lg">
                </div>
                <ion-card-header class="pt-3 pb-0">
                  <ion-card-title class="text-lg md:text-xl text-left">{{ video.name }}</ion-card-title>
                </ion-card-header>
                <ion-card-content class="text-left pb-1">
                  <p class="text-base truncate text-left">{{ video.description }}</p>
                </ion-card-content>
              </NuxtLink>
            </ion-card>
          </ion-col>
        </transition-group>
      </div>
      <div v-else class="ion-padding">
        <p>Sorry, no videos exist for this query.</p>
      </div>
      <ion-infinite-scroll @ionInfinite="ionInfinite" :disabled="!infiniteScrollEnabled" threshold="20px" class="mt-10">
        <ion-infinite-scroll-content loading-spinner="bubbles">
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-grid>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { videoData } from '~/data/videoData.js';

const props = defineProps({
  tag: String,
});

const allVideos = ref(videoData);
const visibleVideos = ref([]);
const infiniteScrollEnabled = ref(true);
const filteredVideos = ref([]);

const addVideos = (count = 1) => {
  const currentCount = visibleVideos.value.length;

  // Check if the tag is not "all" to decide which video list to use
  if (props.tag && props.tag !== 'all') {
    console.log("inside add filtered videos");
    const videosToAdd = filteredVideos.value.slice(currentCount, currentCount + count);
    visibleVideos.value.push(...videosToAdd);
    // Disable infinite scroll if all videos are displayed
    if (visibleVideos.value.length === filteredVideos.value.length) {
      infiniteScrollEnabled.value = false;
    }
  } else {
    console.log("inside show all videos");
    const videosToAdd = allVideos.value.slice(currentCount, currentCount + count);
    visibleVideos.value.push(...videosToAdd);
    // Disable infinite scroll if all videos are displayed
    if (visibleVideos.value.length === allVideos.value.length) {
      infiniteScrollEnabled.value = false;
    }
  }
};

watch(() => props.tag, (newVal, oldVal) => {
  // visibleVideos.value = [];
  // filteredVideos.value = [];
  // Log on tag change and filter videos based on the new tag value
  if (newVal && newVal !== 'all') {
    infiniteScrollEnabled.value = true;
    visibleVideos.value = [];
    const filtered = allVideos.value.filter(video => video.tags.includes(newVal));
    filteredVideos.value = filtered;
    console.log("THESE ARE THE FILTERED VIDEOS:", filteredVideos.value);
    console.log(`Tag changed from ${oldVal} to ${newVal}`);
    addVideos(6);
  } else {
    infiniteScrollEnabled.value = true;
    addVideos(6);
    console.log(`Tag changed from ${oldVal} to ${newVal}: Showing all videos.`);
  }
}, { immediate: true });

onMounted(() => {
  addVideos(2); // Load initial 6 videos
});



const ionInfinite = async (event) => {
  addVideos(); // Add more videos upon reaching the scroll threshold
  console.log("infinite scroll enabled and videos added", infiniteScrollEnabled.value)
  setTimeout(() => {
    event.target.complete();
  }, 2000);
};
</script>



<style scoped>
.video-container {
  overscroll-behavior-y: contain;
  /* Can be 'auto', 'contain', or 'none' */
}

.video-container {
  min-height: 100vh;
  /* Ensures there is enough height to enable scrolling */
}

.infinite-scroll-base {
  margin-top: 10px;
  margin-bottom: 60px;
  /* Adds extra space at the bottom for easier triggering */
}

.video-list {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
}

.video-list .video-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

ion-card {
  background: transparent;
  border: none;
  box-shadow: none;
}

ion-card:hover {
  box-shadow: none;
  transform: none;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

ion-card-header,
ion-card-content {
  padding-inline: 0px;
}
</style>
