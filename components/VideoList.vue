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
      <ion-infinite-scroll @ionInfinite="ionInfinite" :disabled="!infiniteScrollEnabled" threshold="20px"
        class="-mt-20">
        <ion-infinite-scroll-content loading-spinner="bubbles">
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-grid>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { videoData } from '~/data/videoData.js';

const props = defineProps({
  tag: String,
  instructor: String
});

const allVideos = ref(videoData);
const visibleVideos = ref([]);
const infiniteScrollEnabled = ref(true);

const filteredVideos = computed(() => {
  return allVideos.value.filter(video =>
    (!props.tag || props.tag === 'all videos' || video.tags.includes(props.tag)) &&
    (!props.instructor || props.instructor === 'All' || video.instructor === props.instructor)
  );
});

const addVideos = (count = 4) => {
  const startIndex = visibleVideos.value.length;
  const endIndex = Math.min(startIndex + count, filteredVideos.value.length);
  while (visibleVideos.value.length < endIndex) {
    visibleVideos.value.push(filteredVideos.value[visibleVideos.value.length]);
  }

  if (visibleVideos.value.length >= filteredVideos.value.length) {
    infiniteScrollEnabled.value = false;
  }
};

onMounted(() => {
  addVideos(6);
});

watch(filteredVideos, () => {
  visibleVideos.value = []; // Reset visibleVideos when the filter changes
  addVideos(8); // Add initial set of videos again after resetting
  infiniteScrollEnabled.value = true; // Re-enable infinite scroll
});

const ionInfinite = async (event) => {
  addVideos();
  setTimeout(() => {
    event.target.complete();
    event.target.disabled = !infiniteScrollEnabled.value;
  }, 500);
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
